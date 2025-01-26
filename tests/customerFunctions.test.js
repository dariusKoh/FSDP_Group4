const { Builder, By, until } = require("selenium-webdriver");

// Set the base URL for the Selenium Grid or local driver
const GRID_URL = "http://localhost:4444/";
const browsers = ["chrome", "firefox", "MicrosoftEdge"];

browsers.forEach((browserName) => {
    describe(`Customer function tests on ${browserName}`, () => {
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

        test("should navigate to the customer login page by clicking a button", async () => {
            const customerLogin = await driver.findElement(By.css('button.btn.btn-primary.btn-lg[ng-click="customer()"]'));
            await customerLogin.click();
        });
        
        test("should select a customer from the dropdown and login as that customer", async () => {
            const customer = await driver.findElement(By.css('select.form-control[ng-model="custId"]'));
            await customer.click();
            await driver.findElement(By.css('option[value="1"]')).click();
            let login = await driver.findElement(By.xpath("//*[text()='Login']"));
            await login.click();
            const customerName = await driver.findElement(By.css('span.fontBig.ng-binding'));
            expect(await customerName.getText()).toBe("Hermione Granger");
        });

        test("should make a deposit", async () => {
            const depositButton = await driver.findElement(By.css('button[ng-click="deposit()"]'));
            await depositButton.click();
            const amountInput = await driver.findElement(By.css('input[ng-model="amount"]'));
            await amountInput.clear();
            await amountInput.sendKeys(100);
            const deposit = await driver.findElement(By.css('button[type="submit"]'));
            await deposit.click();
            const successMessage = await driver.findElement(By.css('span[ng-show="message"]'));
            expect(await successMessage.getText()).toBe("Deposit Successful");
        });

        test("should make a withdrawal", async () => { 
            const withdrawalButton = await driver.findElement(By.css('button[ng-click="withdrawl()"]'));
            await withdrawalButton.click();
            const amountInput = await driver.findElement(By.css('input[ng-model="amount"]'));
            await amountInput.clear();
            await amountInput.sendKeys(50);
            const withdrawal = await driver.findElement(By.css('button[type="submit"]'));
            await withdrawal.click();
            const successMessage = await driver.findElement(By.css('span[ng-show="message"]'));
            expect(await successMessage.getText()).toBe("Transaction successful");
        });

        test("should view transactions", async () => { 
            const transactionsButton = await driver.findElement(By.css('button[ng-click="transactions()"]'));
            await transactionsButton.click();
            const transactions = await driver.findElement(By.css('table.table.table-bordered.table-striped'));
            expect(await transactions.isDisplayed()).toBe(true);
        });

        test("should log out", async () => {
            const logoutButton = await driver.findElement(By.css('button[ng-click="byebye()"]'));
            await logoutButton.click();
            const customerLogin = await driver.findElement(By.css('button.btn.btn-primary.btn-lg[ng-click="customer()"]'));
            expect(await customerLogin.isDisplayed()).toBe(true);
        });
    });
});