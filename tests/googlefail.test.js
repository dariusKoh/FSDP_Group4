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

		test("should load the page and fail to check title", async () => {
			try {
				await driver.get("https://google.com", 10000);
				const title = await driver.getTitle();
				expect(title).toBe("Bing");
			} catch (err) {
				throw err;
			}
		});
	});
});