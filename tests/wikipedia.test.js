const webdriver = require('selenium-webdriver');
const { By, until, Builder, Capabilities } = webdriver
let capabilities = Capabilities.chrome();

describe('Test if the search bar is working correctly', () => {
    let driver;

    beforeAll(async () => {
        driver = new Builder()
            .usingServer('http://localhost:4444/')
            .withCapabilities(capabilities)
            .build();
        await driver.get("https://www.wikipedia.org/");
        await driver.wait(until.titleMatches(/Wikipedia/i), 5000);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 40000);

    it('test', async () => {
        try {
            const searchBar = await driver.wait(until.elementLocated(By.id('searchInput')), 5000);
            await searchBar.click()
            await searchBar.sendKeys("Programming language")
            await searchBar.submit()

            let span = await driver.wait(until.elementLocated(By.className('mw-page-title-main')), 5000)
            let title = await span.getText()

            expect(title).toEqual("Programming language");
        } catch (err) {
            throw err;
        }
    }, 35000);
});