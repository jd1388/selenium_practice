const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let driver;

const determineSearchPlatform = platform => {
    const formattedPlatform = platform.toLowerCase().trim();
    const defaultMessage = platformToBeUsed => `Okay, I'll search on ${platformToBeUsed}\n`;

    switch (formattedPlatform) {
        case 'wikipedia':
            console.log(defaultMessage('Wikipedia'));
            return 'Wikipedia';
        case 'youtube':
            console.log(defaultMessage('YouTube'));
            return 'YouTube';
        case 'google':
            console.log(defaultMessage('Google'));
            return 'Google';
        case '':
            console.log('Since you didn\'t give a search method, I\'ll use Google!\n');
            return 'Google';
        default:
            console.log(`I don't know how to search with "${platform}", so I'll use Google!\n`);
            return 'Google';
    }
};

const search = (url, searchBar, query, next) => {
    driver.get(url).then(() => {
        driver.findElement(searchBar).sendKeys(query, webdriver.Key.ENTER, webdriver.Key.ENTER).then(() => next());
    });
};

const createDriver = () => {
    return new webdriver.Builder()
        .forBrowser('firefox')
        .build();
};

reader.question('Where do you want to search?\n', searchPlatformAnswer => {
    let searchPlatform = determineSearchPlatform(searchPlatformAnswer);

    reader.question('What would you like to search?\n', searchQuery => {
        driver = createDriver();

        switch (searchPlatform) {
            case 'Wikipedia':
                search('https://www.wikipedia.org', webdriver.By.id('searchInput'), searchQuery, process.exit);
                break;
            case 'Google':
                search('https://www.google.com', webdriver.By.id('lst-ib'), searchQuery, process.exit);
                break;
            case 'YouTube':
                search('https://www.youtube.com', webdriver.By.name('search_query'), searchQuery, process.exit)
                break;
        }
    });
});
