const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

reader.question('Where do you want to search?\n', searchPlatformAnswer => {
    const searchPlatform = determineSearchPlatform(searchPlatformAnswer);

    if (searchPlatform === 'Default') {
        console.log(`I don't know how to search with ${searchPlatformAnswer}, so we will use Google!`);
        searchPlatform = 'Google';
    } else
        console.log(`Okay, I'll search on ${searchPlatform}!\n`);

    reader.question('What would you like to search?\n', searchQuery => {
        const driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

        switch (searchPlatform) {
            case 'Wikipedia':
                driver.get('https://www.wikipedia.org/').then(() => {
                    driver.findElement(webdriver.By.id('searchInput')).sendKeys(searchQuery, webdriver.Key.ENTER, webdriver.Key.ENTER).then(() => {
                        process.exit(0);
                    });
                });
                break;
            case 'Google':
                driver.get('https://www.google.com').then(() => {
                    driver.findElement(webdriver.By.id('lst-ib')).sendKeys(searchQuery, webdriver.Key.ENTER, webdriver.Key.ENTER).then(() => {
                        process.exit(0);
                    })
                });
                break;
            case 'YouTube':
                driver.get('https://www.youtube.com').then(() => {
                    driver.findElement(webdriver.By.name('search_query')).sendKeys(searchQuery, webdriver.Key.ENTER, webdriver.Key.ENTER).then(() => {
                        process.exit(0);
                    })
                });
                break;
        }
    });
});
