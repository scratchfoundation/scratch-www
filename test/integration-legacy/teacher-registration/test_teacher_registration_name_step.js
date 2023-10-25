/*
 * Checks the behavior of the name step in the educators registration process
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

tap.plan(2);

tap.tearDown(() => {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get(`${rootUrl}/educators/register`);
    return utils.fillUsernameSlide(driver, seleniumWebdriver)
        .then(utils.fillDemographicsSlide.bind(this, driver, seleniumWebdriver)); // eslint-disable-line no-invalid-this
});

// attempts to advance the slide without inputting either name, checks that both give the correct error
tap.test('checkFirstNameRequired', t => {
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    const errorMessageXPath = '//input[@name="user.name.first"]/following-sibling::' +
        'span[@class="help-block validation-message"]/span[contains(text(),' +
        '"This field is required")]';
    nextStepButton.click().then(() => {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(validationMessages => {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});

// attempts to advance the slide without inputting either name, checks that both give the correct error
tap.test('checkLastNameRequired', t => {
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    const errorMessageXPath = '//input[@name="user.name.last"]/following-sibling::' +
        'span[@class="help-block validation-message"]/span[contains(text(),' +
        '"This field is required")]';
    nextStepButton.click().then(() => {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(validationMessages => {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});
