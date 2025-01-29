const { Builder, By, until } = require("selenium-webdriver");
const fs = require('fs');
const path = require('path');

// Set the base URL for the Selenium Grid or local driver
const GRID_URL = "http://localhost:4444/";
const browsers = ["chrome", "firefox", "MicrosoftEdge"];

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
    describe(`Manager function tests on ${browserName}`, () => {
        let driver;

        beforeAll(async () => {
            driver = await new Builder()
                .usingServer(GRID_URL)
                .forBrowser(browserName)
                .build();
            await driver.get('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
        }, 30000); // Set timeout to 30 seconds

        afterAll(async () => {
            if (driver) {
                await driver.quit();
            }
        }, 30000); // Set timeout to 30 seconds

        test('should navigate to the login page and click the manager login button', async () => {
        
                    // Wait for Angular to be fully loaded and stable
                    await waitForAngular(driver);
        
                    // Wait for the login button to be clickable and click it
                    const managerLoginButton = await driver.wait(
                        until.elementLocated(By.xpath("//button[@ng-click='manager()']")),
                        10000
                    );
                    await managerLoginButton.click();
                    
        });

        test('should add a customer', async () => { 
            // Wait for Angular to be fully loaded and stable
            await waitForAngular(driver);
            
            // Wait for the add customer button to be clickable and click it
            const addCustomerButton = await driver.wait(
                until.elementLocated(By.xpath("//button[@ng-click='addCust()']")),
                10000
            );
            await addCustomerButton.click();
            
            // Wait for the first name field to be visible and enter a value
            const firstNameField = await driver.wait(
                until.elementLocated(By.xpath("//input[@ng-model='fName']")),
                10000
            );
            await firstNameField.sendKeys("John");
            
            // Wait for the last name field to be visible and enter a value
            const lastNameField = await driver.wait(
                until.elementLocated(By.xpath("//input[@ng-model='lName']")),
                10000
            );
            await lastNameField.sendKeys("Doe");
            
            // Wait for the post code field to be visible and enter a value
            const postCodeField = await driver.wait(
                until.elementLocated(By.xpath("//input[@ng-model='postCd']")),
                10000
            );
            await postCodeField.sendKeys("12345");
            
            // Wait for the add customer button to be clickable and click it
            const submitCustomerButton = await driver.wait(
                until.elementLocated(By.xpath("//button[@type='submit']")),
                10000
            );
            await submitCustomerButton.click();
            
            // Wait for the alert to be visible
            await driver.wait(until.alertIsPresent());
            
            // Get the alert text and verify it
            const alert = await driver.switchTo().alert();
            expect(await alert.getText()).toBe("Customer added successfully with customer id :6");
            await alert.accept();
        });
        
        test('should open an account for a customer', async () => {
            // Wait for Angular to be fully loaded and stable
            await waitForAngular(driver);
            
            // Wait for the open account button to be clickable and click it
            const openAccountButton = await driver.wait(
                until.elementLocated(By.xpath("//button[@ng-click='openAccount()']")),
                10000
            );
            await openAccountButton.click();    
            await openAccountButton.click(); 

            let screenshot = await driver.takeScreenshot();
            
            driver.sleep(500);        

            // Wait for the customer dropdown to be visible using XPath
            const customerDropdown = await driver.wait(
                until.elementIsVisible(driver.findElement(By.id('userSelect'))),
                10000
            );
            await customerDropdown.click();
            
            // Wait for the specific customer option to be visible and select it
            const firstCustomerOption = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//option[@value='6' and text()='John Doe']"))),
                10000
            );
            await firstCustomerOption.click();
            
            // Wait for the currency dropdown to be visible and select it
            const currencyDropdown = await driver.wait(
                until.elementIsVisible(driver.findElement(By.id('currency'))),
                10000
            );
            await currencyDropdown.click();
            
            // Wait for the specific currency option to be visible and select it
            const dollarOption = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//option[@value='Dollar']"))),
                10000
            );
            await dollarOption.click();
            
            // Wait for the process button to be visible and click it
            const processButton = await driver.wait(
                until.elementIsVisible(driver.findElement(By.xpath("//button[@type='submit']"))),
                10000
            );
            await processButton.click();
            
            // Wait for the alert to be visible
            await driver.wait(until.alertIsPresent());
            
            // Get the alert text and verify it
            const alert = await driver.switchTo().alert();
            expect(await alert.getText()).toBe("Account created successfully with account Number :1016");
            await alert.accept();
        });

        test('should search for a customer by name', async () => {
            // Wait for Angular to be fully loaded and stable
            await waitForAngular(driver);
            
            // Wait for the search customer button to be clickable and click it
            const searchCustomerButton = await driver.wait(
                until.elementLocated(By.xpath("//button[@ng-click='showCust()']")),
                10000
            );
            await searchCustomerButton.click();

            // Wait for the search customer field to be visible and enter a value
            const searchCustomerField = await driver.wait(
                until.elementLocated(By.xpath("//input[@ng-model='searchCustomer']")),
                10000
            );
            await searchCustomerField.sendKeys("John");
            
            // Wait for the customer name to be visible and verify the search was successful
            const customerName = await driver.wait(
                until.elementLocated(By.xpath("//td[text()='John']")),
                10000 // Wait for up to 10 seconds
            );
            expect(await customerName.getText()).toBe('John');
        });

        test('should delete a customer', async () => { 
            // Wait for Angular to be fully loaded and stable
            await waitForAngular(driver);
            // Wait for the delete button to be visible and click it
            const deleteButton = await driver.wait(
                until.elementLocated(By.xpath("//button[@ng-click='deleteCust(cust)']")),
                10000
            );
            await deleteButton.click();
            
            const tableRows = await driver.findElements(By.xpath("//tbody/tr"));
    
            // Assert that the table is empty (no rows)
            expect(tableRows.length).toBe(0); // The table should have no rows
        });
    }); 
});