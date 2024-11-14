const { Builder, By, until } = require("selenium-webdriver");

// Set the base URL for the Selenium Grid or local driver
const GRID_URL = "http://localhost:4444/";
const browsers = ["chrome", "firefox", "MicrosoftEdge"];

browsers.forEach((browserName) => {
	describe(`Cross-browser testing on ${browserName}`, () => {
		let driver;

		beforeAll(async () => {
			driver = await new Builder()
				.usingServer(GRID_URL)
				.forBrowser(browserName)
				.build();
		}, 30000); // Set timeout to 30 seconds

		afterAll(async () => {
			if (driver) {
				await driver.quit();
			}
		}, 30000); // Set timeout to 30 seconds

		test("should load the page and check title", async () => {
            try {
                await driver.get("https://wikipedia.com", 10000);
                const title = await driver.getTitle();
                expect(title).toBe("Wikipedia"); 
            } catch (err) {
                throw err;
            }
		});

		test("should search for a query", async () => {
            try {
                const searchBar = await driver.wait(until.elementLocated(By.id('searchInput')), 10000);
                await searchBar.click()
                await searchBar.sendKeys("Programming language")
                await searchBar.submit()

                let span = await driver.wait(until.elementLocated(By.className('mw-page-title-main')), 10000)
                let title = await span.getText()

                expect(title).toEqual("Programming language");
            } catch (err) {
                throw err;
            }
		});
	});
});