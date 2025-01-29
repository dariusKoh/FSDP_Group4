const { Builder, By, until } = require('selenium-webdriver');

// Set the base URL for the Selenium Grid or local driver
const GRID_URL = 'http://localhost:4444/'; 
const browsers = ['chrome', 'firefox', 'MicrosoftEdge']; 

// Helper function to wait for Angular to be ready
async function waitForAngular(driver) {
    await driver.executeAsyncScript(function (done) {
        if (window.angular) {
            try {
                var $rootScope = angular.element(document).injector().get('$rootScope');
                $rootScope.$apply(); // Trigger a digest cycle if Angular is ready
                done();
            } catch (e) {
                done(); // If $rootScope is not accessible, just proceed
            }
        } else {
            done(); // If Angular is not loaded, proceed
        }
    });
}

browsers.forEach((browserName) => {
    describe(`Customer function tests on ${browserName}`, () => {
        let driver;

        beforeAll(async () => {
            driver = await new Builder()
                .usingServer(GRID_URL)
                .forBrowser(browserName)
                .build();
            await driver.get('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
        }, 30000); // Timeout for browser setup (30 seconds)

        afterAll(async () => {
            if (driver) {
                await driver.quit();
            }
        }, 30000); // Timeout for browser teardown (30 seconds)

        test('should navigate to the login page and click the customer login button', async () => {

            // Wait for Angular to be fully loaded and stable
            await waitForAngular(driver);

            // Wait for the login button to be clickable and click it
            const customerLoginButton = await driver.wait(
                until.elementLocated(By.xpath("//button[@ng-click='customer()']")),
                10000
            );
            await customerLoginButton.click();

            // Wait for the "Your Name :" label to be visible and select it
            const yourNameLabel = await driver.wait(
                until.elementLocated(By.xpath("//label[text()='Your Name :']")),
                10000
            );
            expect(await yourNameLabel.getText()).toBe('Your Name :');
        });

        test('should select a customer from the dropdown and login as that customer', async () => {
            await waitForAngular(driver);
            
            // Wait for the customer dropdown to be visible using XPath
            const customerDropdown = await driver.wait(
                until.elementIsVisible(driver.findElement(By.id('userSelect'))),
                10000
            );
            await customerDropdown.click();

            // Wait for the specific customer option to be visible and select it
            const firstCustomerOption = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//option[@value='1' and text()='Hermoine Granger']"))),
                10000
            );
            await firstCustomerOption.click();

            // Wait for the login button to be visible and click it
            const loginButton = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//button[text()='Login']"))),
                10000
            );
            await loginButton.click();

            // Wait for the customer name to be displayed and verify the login was successful
            const customerName = await driver.wait(
                until.elementLocated(By.xpath("//span[contains(text(),'Hermoine Granger')]")),
                10000 // Wait for up to 10 seconds
            );
            expect(await customerName.getText()).toBe('Hermoine Granger');
        });

        test('should make a deposit', async () => {
            await waitForAngular(driver);
            // Wait for the deposit button to be clickable using XPath
            const depositButton = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//button[@ng-click='deposit()']"))),
                10000
            );
            await depositButton.click();

            // Wait for the amount input field and submit the deposit using CSS
            const amountInput = await driver.wait(
                until.elementLocated(By.css("input[ng-model='amount']")),
                10000
            );
            await amountInput.click();
            await amountInput.clear();
            await amountInput.sendKeys(100);

            const depositSubmit = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//button[@type='submit']"))),
                10000
            );
            await depositSubmit.click();

            // Verify the success message using XPath
            const successMessage = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//span[@ng-show='message']"))),
                10000
            );
            expect(await successMessage.getText()).toBe('Deposit Successful');
        });

        test('should make a withdrawal', async () => { 
            
            await waitForAngular(driver);
            const withdrawButton = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//button[@ng-click='withdrawl()']"))),
                10000
            );
            await withdrawButton.click();
            await withdrawButton.click();


            var amountInput = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//input[@ng-model='amount']"))),
                10000 // Wait for up to 10 seconds for the element to be visible
            );
        
            await amountInput.clear();  // Clear any existing value
            driver.sleep(500);
            amountInput = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//input[@ng-model='amount']"))),
                10000
            );
            await amountInput.sendKeys(50); // Send 50 as the input value
        
            // Wait for the "Withdraw" button to be clickable and click it
            const withdrawSubmit = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//button[@type='submit']"))),
                10000 // Wait for up to 10 seconds for the button to be visible
            );
            await withdrawSubmit.click(); // Click the withdraw button

            const successMessage = await driver.wait(
                until.elementIsVisible(driver.findElement(By.css("span.error.ng-binding[ng-show='message']"))),
                10000
            );
            expect(await successMessage.getText()).toBe('Transaction successful');
        });

        test('should log out the customer', async () => { 
            await waitForAngular(driver);
            const logoutButton = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//button[@ng-click='byebye()']"))),
                10000
            );
            await logoutButton.click();
            const yourNameLabel = await driver.wait(
                until.elementLocated(By.xpath("//label[text()='Your Name :']")),
                10000
            );
            expect(await yourNameLabel.getText()).toBe('Your Name :');
        });
    });
});
