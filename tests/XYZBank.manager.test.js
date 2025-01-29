const { Builder, By, until } = require("selenium-webdriver");

// Set the base URL for the Selenium Grid or local driver
const GRID_URL = "http://localhost:4444/";
const browsers = ["chrome", "firefox", "MicrosoftEdge"];

browsers.forEach((browserName) => {
    describe(`Manager function tests on ${browserName}`, () => {
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

        test("should navigate to the banking login page", async () => {
            await driver.get("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login", 10000);
            const title = await driver.getTitle();
            expect(title).toBe("XYZ Bank");
        });


        test("should navigate to the manager portal page by clicking a button", async () => {
            const managerLogin = await driver.findElement(By.css('button.btn.btn-primary.btn-lg[ng-click="manager()"]'));
            let login = await driver.findElement(By.xpath("//*[text()='Login']"));
            await login.click();
        });
        
    });
});