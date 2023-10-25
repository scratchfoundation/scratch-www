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

const username = process.env.SMOKE_USERNAME;
const password = process.env.SMOKE_PASSWORD;
const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
const scratchr2url = `${rootUrl}/users/${username}`;
const wwwURL = rootUrl;

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
            const name = await findByXpath('//input[@id="frc-username-1088"]');
            await name.sendKeys(username);
            const word = await findByXpath('//input[@id="frc-password-1088"]');
            await word.sendKeys(password);
            await driver.sleep(500);
            await clickXpath('//button[contains(@class, "button") and ' +
                'contains(@class, "submit-button") and contains(@class, "white")]');
            await driver.sleep(500);
            const element = await findByXpath('//span[contains(@class, "profile-name")]');
            const text = await element.getText();
            expect(text.toLowerCase()).toEqual(username.toLowerCase());
        });

        test('sign in on scratchr2', async () => {
            await driver.get(scratchr2url);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            const name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(username);
            const word = await findByXpath('//input[@name="password"]');
            await word.sendKeys(password);
            await clickButton('Sign in');
            const element = await findByXpath('//span[@class="user-name dropdown-toggle"]');
            const text = await element.getText();
            expect(text.toLowerCase()).toEqual(username.toLowerCase());
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
            const element = await findByXpath('//li[@class="link right login-item"]/a/span');
            const text = await element.getText();
            expect(text.toLowerCase()).toEqual('Sign In'.toLowerCase());
        });

        test('sign out on scratchr2', async () => {
            await driver.get(scratchr2url);
            await clickXpath('//span[@class="user-name dropdown-toggle"]');
            await clickXpath('//li[@id="logout"]');
            const element = await findByXpath('//li[@class="link right login-item"]/a/span');
            const text = await element.getText();
            expect(text.toLowerCase()).toEqual('Sign In'.toLowerCase());
        });

    });

    describe('login failures', () => {
        test('sign in with no password in Scratchr2', async () => {
            const nonsenseUsername = Math.random().toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5);
            await driver.get(scratchr2url);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            const name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(nonsenseUsername + getKey('ENTER'));

            // find error
            const error = await findByXpath('//form[@id="login"]//div[@class="error"]');
            await waitUntilVisible(error, driver);
            const errorText = await error.getText();
            expect(errorText).toEqual('This field is required.');
        });

        test('sign in with wrong username', async () => {
            const nonsenseUsername = Math.random().toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5);
            await driver.get(scratchr2url);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            const name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(nonsenseUsername);
            const word = await findByXpath('//input[@name="password"]');
            await word.sendKeys(password + getKey('ENTER'));

            // find error
            const error = await findByXpath('//form[@id="login"]//div[@class="error"]');
            await waitUntilVisible(error, driver);
            const errorText = await error.getText();
            expect(errorText).toEqual('Incorrect username or password.');
        });

        test('sign in with wrong password', async () => {
            const nonsensePassword = Math.random().toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5);
            await driver.get(scratchr2url);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            const name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(username);
            const word = await findByXpath('//input[@name="password"]');
            await word.sendKeys(nonsensePassword + getKey('ENTER'));

            // find error
            const error = await findByXpath('//form[@id="login"]//div[@class="error"]');
            await waitUntilVisible(error, driver);
            const errorText = await error.getText();
            expect(errorText).toEqual('Incorrect username or password.');
        });

    });

});
