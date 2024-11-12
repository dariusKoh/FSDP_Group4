const webdriver = require('selenium-webdriver');
const { Builder, Capabilities } = webdriver
let capabilities = Capabilities.chrome();

describe("Test if Wikipedia's home page's title is correct", () => {
    let driver;
    
    beforeAll(async () => {
        driver = new Builder()
            .usingServer('http://localhost:4444')
            .withCapabilities(capabilities)
            .build();
        await driver.get("https://www.wikipedia.org/");
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 40000);

    it('test', async () => {
        try {
            await driver.takeScreenshot().then(
                function (image) {
                    require('fs').writeFileSync('screenshot.png', image, 'base64');
                }
            );
            let title = (await driver.getTitle()).trim()
            expect(title).toEqual("Wikipedia");
        } catch (err) {
            throw err;
        }
    }, 35000);
});