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
			await driver.get("https://google.com", 10000); // Replace with your URL
			const title = await driver.getTitle();
			expect(title).toBe("Google"); // Replace with the expected title
		});

		test("should find and click a link", async () => {
			const link = await driver.findElement(By.css("a"));
			await driver.wait(until.elementIsVisible(link), 10000);
			await link.click();
			// Add assertions based on the expected page after clicking
		});
	});
});