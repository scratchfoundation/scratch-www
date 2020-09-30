const SeleniumHelper = require('./selenium-helpers.js');

const {
    findByXpath,
    clickXpath,
    buildDriver
} = new SeleniumHelper();

let remote = process.env.SMOKE_REMOTE || false;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let takenUsername = process.env.SMOKE_USERNAME;

if (remote){
    jest.setTimeout(60000);
} else {
    jest.setTimeout(10000);
}

let driver;

describe('www-integration join flow', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration join flow');
        await driver.get(rootUrl);
    });

    afterAll(async () => await driver.quit());

    beforeEach(async () => {
        driver.get(rootUrl);
        await clickXpath('//a[@class="registrationLink"]');
    });

    test('click Join opens join modal', async () => {
        let joinModal = await findByXpath('//div[@class = "join-flow-outer-content"]');
        let modalVisible = await joinModal.isDisplayed();
        await expect(modalVisible).toBe(true);
    });

    test('username validation message appears', async () => {
        await clickXpath('//input[contains(@name, "username")]');
        let message = await findByXpath('//div[contains(@class, "validation-message")]');
        let messageText = await message.getText();
        await expect(messageText).toEqual('Don\'t use your real name');

    });

    test('password validation message appears', async () => {
        await clickXpath('//input[contains(@name, "password")]');
        let message = await findByXpath('//div[contains(@class, "validation-message")]');
        let messageText = await message.getText();
        await expect(messageText).toContain('Write it down so you remember.');
    });

    test('password validation message appears', async () => {
        await clickXpath('//input[contains(@name, "passwordConfirm")]');
        let message = await findByXpath('//div[contains(@class, "validation-message")]');
        let messageText = await message.getText();
        await expect(messageText).toEqual('Type password again');
    });

    test('username validation: too short', async () => {
        let textInput = await findByXpath('//input[contains(@name, "username")]');
        await textInput.click();
        await textInput.sendKeys('ab');
        await clickXpath('//div[@class = "join-flow-outer-content"]');
        let message = await findByXpath('//div[contains(@class, "validation-error")]');
        let messageText = await message.getText();
        await expect(messageText).toContain('Must be 3 letters or longer');
    });

    test('username validation: username taken', async () => {
        let textInput = await findByXpath('//input[contains(@name, "username")]');
        await textInput.click();
        await textInput.sendKeys(takenUsername);
        await clickXpath('//div[@class = "join-flow-outer-content"]');
        let message = await findByXpath('//div[contains(@class, "validation-error")]');
        let messageText = await message.getText();
        await expect(messageText).toContain('Username taken.');
    });

    test('username validation: bad word', async () => {
        let textInput = await findByXpath('//input[contains(@name, "username")]');
        await textInput.click();
        await textInput.sendKeys('qnb02mclepghwic9');
        await clickXpath('//div[@class = "join-flow-outer-content"]');
        let message = await findByXpath('//div[contains(@class, "validation-error")]');
        let messageText = await message.getText();
        await expect(messageText).toContain('Username not allowed');
    });
});
