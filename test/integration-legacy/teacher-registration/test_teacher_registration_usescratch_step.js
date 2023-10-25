/*
 * Checks the behavior of the 'use scratch' step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const tap = require('tap');

const utils = require('./teacher_registration_utils.js');
const constants = utils.constants;

// Set test url through environment variable
const rootUrl = process.env.ROOT_URL || 'http://localhost:8333';

// chrome driver
const driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome())
    .build();

tap.plan(3);

tap.tearDown(() => {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get(`${rootUrl}/educators/register`);
    return utils.fillUsernameSlide(driver, seleniumWebdriver)
        .then(utils.fillDemographicsSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillNameSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillPhoneSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillOrganizationSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillAddressSlide.bind(this, driver, seleniumWebdriver)); // eslint-disable-line no-invalid-this
});

tap.test('checkCharacterCountIsCorrect', t => {
    const textarea = driver.findElement(seleniumWebdriver.By.name('useScratch'));
    const charCount = driver.findElement(seleniumWebdriver.By.xpath('//p[@class="char-count"]'));
    textarea.sendKeys('hello').then(() => {
        charCount.getText().then(charCountText => {
            t.equal(charCountText, '5/300');
            t.end();
        });
    });
});

// Inputs more than 300 characters and checks that the char count gets the class 'overmax'
// which turns the text orange
tap.test('checkCharacterCountTurnsOrangeWhenTooLong', t => {
    const textarea = driver.findElement(seleniumWebdriver.By.name('useScratch'));
    const charCount = driver.findElement(seleniumWebdriver.By.xpath('//p[@class="char-count"]'));
    textarea.sendKeys(constants.loremIpsumTextLong).then(() => {
        charCount.getAttribute('class').then(charCountClasses => {
            t.ok(charCountClasses.includes('overmax'));
            t.end();
        });
    });
});

tap.test('checkCharacterCountErrorAppersWhenTooLong', t => {
    const textarea = driver.findElement(seleniumWebdriver.By.name('useScratch'));
    const errorMessage = 'Description must be at most 300 characters';
    const errorMessageXPath = `//span[@class="help-block validation-message" and contains(text(),"${
        errorMessage}")]`;
    textarea.sendKeys(constants.loremIpsumTextLong).then(() => {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(validationMessages => {
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});
