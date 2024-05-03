// these tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickXpath,
    findByXpath,
    navigate,
    waitUntilDocumentReady
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
const takenUsername = process.env.SMOKE_USERNAME;

jest.setTimeout(60000);

let driver;

describe('www-integration join flow', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration join flow');
    });

    afterAll(() => driver.quit());

    beforeEach(async () => {
        await navigate(rootUrl); // navigate to home page
        await clickXpath('//a[@class="registrationLink"]'); // navigate to join page
        await waitUntilDocumentReady();
    });

    test('click Join opens join modal', async () => {
        const joinModal = await findByXpath('//div[@class = "join-flow-outer-content"]');
        const modalVisible = await joinModal.isDisplayed();
        expect(modalVisible).toBe(true);
    });

    test('username validation message appears', async () => {
        const clickedInput = await clickXpath('//input[contains(@name, "username")]');
        await driver.wait(() => driver.executeScript('return document.activeElement == arguments[0]', clickedInput));
        const message = await findByXpath('//div[contains(@class, "validation-message")]');
        const messageText = await message.getText();
        expect(messageText).toEqual('Don\'t use your real name');
    });

    test('password validation message appears', async () => {
        const clickedInput = await clickXpath('//input[contains(@name, "password")]');
        await driver.wait(() => driver.executeScript('return document.activeElement == arguments[0]', clickedInput));
        const message = await findByXpath('//div[contains(@class, "validation-message")]');
        const messageText = await message.getText();
        expect(messageText).toContain('Write it down so you remember.');
    });

    test('password confirmation validation message appears', async () => {
        const clickedInput = await clickXpath('//input[contains(@name, "passwordConfirm")]');
        await driver.wait(() => driver.executeScript('return document.activeElement == arguments[0]', clickedInput));
        const message = await findByXpath('//div[contains(@class, "validation-message")]');
        const messageText = await message.getText();
        expect(messageText).toEqual('Type password again');
    });

    test('username validation: too short', async () => {
        const textInput = await findByXpath('//input[contains(@name, "username")]');
        await textInput.click();
        await driver.wait(() => driver.executeScript('return document.activeElement == arguments[0]', textInput));
        await textInput.sendKeys('ab');
        await clickXpath('//div[@class = "join-flow-outer-content"]');
        const message = await findByXpath('//div[contains(@class, "validation-error")]');
        const messageText = await message.getText();
        expect(messageText).toContain('Must be 3 letters or longer');
    });

    test('username validation: username taken', async () => {
        const textInput = await findByXpath('//input[contains(@name, "username")]');
        await textInput.click();
        await driver.wait(() => driver.executeScript('return document.activeElement == arguments[0]', textInput));
        await textInput.sendKeys(takenUsername);
        await clickXpath('//div[@class = "join-flow-outer-content"]');
        const message = await findByXpath('//div[contains(@class, "validation-error")]');
        const messageText = await message.getText();
        expect(messageText).toContain('Username taken.');
    });

    test('username validation: bad word', async () => {
        const textInput = await findByXpath('//input[contains(@name, "username")]');
        await textInput.click();
        await driver.wait(() => driver.executeScript('return document.activeElement == arguments[0]', textInput));
        // Should be caught by the filter
        await textInput.sendKeys('xxxxxxxxx');
        await clickXpath('//div[@class = "join-flow-outer-content"]');
        const message = await findByXpath('//div[contains(@class, "validation-error")]');
        const messageText = await message.getText();
        expect(messageText).toContain('Username not allowed');
    });
});
