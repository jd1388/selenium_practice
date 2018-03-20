const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let driver;

const determineSearchPlatform = platform => {
    switch (platform.toLowerCase().trim()) {
        case 'wikipedia':
            return 'Wikipedia';
        case 'google':
            return 'Google';
        case 'youtube':
            return 'YouTube';
        default:
            return 'Default';
    }
};

const search = (url, searchBar, query, next) => {
    driver.get(url).then(() => {
        driver.findElement(searchBar).sendKeys(query, webdriver.Key.ENTER, webdriver.Key.ENTER).then(() => next());
    });
};

reader.question('Where do you want to search?\n', searchPlatformAnswer => {
    let searchPlatform = determineSearchPlatform(searchPlatformAnswer);

    if (searchPlatform === 'Default') {
        console.log(`I don't know how to search with "${searchPlatformAnswer}", so I'll use Google!`);
        searchPlatform = 'Google';
    } else
        console.log(`Okay, I'll search on ${searchPlatform}!\n`);

    reader.question('What would you like to search?\n', searchQuery => {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

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
