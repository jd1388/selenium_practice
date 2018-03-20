const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

reader.question('What would you like to search?\n', searchQuery => {
    const driver = new webdriver.Builder()
        .forBrowser('firefox')
        .build();
    
    // driver.manage().setTimeouts({ implicit: 5000 });
    
    driver.get('https://www.wikipedia.org/').then(() => {
        driver.findElement(webdriver.By.id('searchInput')).sendKeys(searchQuery, webdriver.Key.ENTER, webdriver.Key.ENTER).then(() => {
            process.exit(0);
        });
    });
});
