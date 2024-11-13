const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');

async function getDriver(browser) {
    let driver;
    switch (browser) {
        case 'chrome':
            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
            break;

        case 'firefox':
            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options()).build();
            break;

        case 'edge':
            driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(new edge.Options()).build();
            break;

        default:
            throw new Error('Unsupported browser!');
    }
    return driver;
}

module.exports = { getDriver };