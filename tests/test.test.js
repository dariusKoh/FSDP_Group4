// __tests__/sampleTest.spec.js
const { getDriver } = require('../helpers/browserSetup');

// Get browser type from environment variable or default to Chrome
const browser = process.env.BROWSER || 'chrome';
let driver;

describe(`Running tests on ${browser}`, () => {
    beforeEach(async () => {
        driver = await getDriver(browser);
    });

    afterEach(async () => {
        await driver.quit();
    });

    test('should load Google homepage', async () => {
        await driver.get('https://www.google.com');
        
        const title = await driver.getTitle();
        expect(title).toBe('Google');
    });

    test('should search for a term on Google', async () => {
        await driver.get('https://www.google.com');

        const searchBox = await driver.findElement({ name: 'q' });
        await searchBox.sendKeys('Selenium WebDriver');
        await searchBox.submit();

        const title = await driver.getTitle();
        expect(title).toContain('Selenium WebDriver');
    });
});
