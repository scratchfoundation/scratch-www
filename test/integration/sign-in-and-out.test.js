// These tests sign in with user #0 (no number for the username)

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickButton,
    clickText,
    clickXpath,
    findByXpath,
    getKey,
    signIn,
    waitUntilVisible
} = new SeleniumHelper();

let username = process.env.SMOKE_USERNAME;
let password = process.env.SMOKE_PASSWORD;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let scratchr2url = rootUrl + '/users/' + username;
let wwwURL = rootUrl;

jest.setTimeout(60000);

let driver;

describe('www-integration sign-in-and-out', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration sign-in-out');
    });

    afterAll(async () => {
        await driver.quit();
    });

    describe('sign in', () => {
        afterEach(async () => {
            await driver.get(wwwURL);
            await clickXpath('//div[@class="account-nav"]');
            await clickText('Sign out');
        });

        test('sign in on www', async () => {
            await driver.get(wwwURL);
            await driver.sleep(1000);
            await clickXpath('//li[@class="link right login-item"]/a');
            let name = await findByXpath('//input[@id="frc-username-1088"]');
            await name.sendKeys(username);
            let word = await findByXpath('//input[@id="frc-password-1088"]');
            await word.sendKeys(password);
            await driver.sleep(500);
            await clickXpath('//button[contains(@class, "button") and ' +
                'contains(@class, "submit-button") and contains(@class, "white")]');
            await driver.sleep(500);
            let element = await findByXpath('//span[contains(@class, "profile-name")]');
            let text = await element.getText();
            await expect(text.toLowerCase()).toEqual(username.toLowerCase());
        });

        test('sign in on scratchr2', async () => {
            await driver.get(scratchr2url);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            let name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(username);
            let word = await findByXpath('//input[@name="password"]');
            await word.sendKeys(password);
            await clickButton('Sign in');
            let element = await findByXpath('//span[@class="user-name dropdown-toggle"]');
            let text = await element.getText();
            await expect(text.toLowerCase()).toEqual(username.toLowerCase());
        });
    });

    describe('sign out', () => {
        beforeEach(async () => {
            await driver.get(wwwURL);
            await signIn(username, password);
            await driver.sleep(500);
        });

        test('sign out on www', async () => {
            await clickXpath('//a[contains(@class, "user-info")]');
            await clickText('Sign out');
            let element = await findByXpath('//li[@class="link right login-item"]/a');
            let text = await element.getText();
            await expect(text.toLowerCase()).toEqual('Sign In'.toLowerCase());
        });

        test('sign out on scratchr2', async () => {
            await driver.get(scratchr2url);
            await clickXpath('//span[@class="user-name dropdown-toggle"]');
            await clickXpath('//li[@id="logout"]');
            let element = await findByXpath('//li[@class="link right login-item"]/a');
            let text = await element.getText();
            await expect(text.toLowerCase()).toEqual('Sign In'.toLowerCase());
        });

    });

    describe('login failures', async () => {
        test('sign in with no password in Scratchr2', async () => {
            let nonsenseUsername = Math.random().toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5);
            await driver.get(scratchr2url);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            let name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(nonsenseUsername + getKey('ENTER'));

            // find error
            let error = await findByXpath('//form[@id="login"]//div[@class="error"]');
            await waitUntilVisible(error, driver);
            let errorText = await error.getText();
            await expect(errorText).toEqual('This field is required.');
        });

        test('sign in with wrong username', async () => {
            let nonsenseUsername = Math.random().toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5);
            await driver.get(scratchr2url);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            let name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(nonsenseUsername);
            let word = await findByXpath('//input[@name="password"]');
            await word.sendKeys(password + getKey('ENTER'));

            // find error
            let error = await findByXpath('//form[@id="login"]//div[@class="error"]');
            await waitUntilVisible(error, driver);
            let errorText = await error.getText();
            await expect(errorText).toEqual('Incorrect username or password.');
        });

        test('sign in with wrong password', async () => {
            let nonsensePassword = Math.random().toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5);
            await driver.get(scratchr2url);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            let name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(username);
            let word = await findByXpath('//input[@name="password"]');
            await word.sendKeys(nonsensePassword + getKey('ENTER'));

            // find error
            let error = await findByXpath('//form[@id="login"]//div[@class="error"]');
            await waitUntilVisible(error, driver);
            let errorText = await error.getText();
            await expect(errorText).toEqual('Incorrect username or password.');
        });

    });

});
