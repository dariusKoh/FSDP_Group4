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
            await driver.get("https://wikipedia.org", 10000);
            const title = await driver.getTitle();
            expect(title).toBe("Wikipedia"); 
		});

        test("should load the Wikipedia main page and verify content", async () => {
            // Navigate to Wikipedia
            await driver.get("https://www.wikipedia.org");
    
            // Locate and click on the English language link to go to the English Wikipedia
            const englishLink = await driver.wait(until.elementLocated(By.id("js-link-box-en")), 10000);
            await englishLink.click();

            // Wait for the main content element to load on the Wikipedia main page
            const mainContent = await driver.wait(until.elementLocated(By.id("mp-upper")), 10000);

            // Verify that the main content contains expected text
            const contentText = await mainContent.getText();
            expect(contentText.length).toBeGreaterThan(0);  // Ensure there's text in the content area

            // Optional: Verify a specific string is part of the main content, if you expect it
            expect(contentText).toContain("From today's featured article");  // Adjust the text as needed
        });

		test("should search for a topic 'Programming Languages'", async () => {
            const searchBar = await driver.wait(until.elementLocated(By.id('searchInput')), 10000);
            await driver.wait(until.elementIsVisible(searchBar), 10000);
            await searchBar.click()
            await searchBar.sendKeys("Programming language")
            await searchBar.submit()

            let span = await driver.wait(until.elementLocated(By.className('mw-page-title-main')), 10000)
            let title = await span.getText()

            expect(title).toEqual("Programming language");
		});
	});
});