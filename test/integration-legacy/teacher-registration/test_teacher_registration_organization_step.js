/*
 * Checks the behavior of the organization step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

var utils = require('./teacher_registration_utils.js');
var constants = utils.constants;

// Set test url through environment variable
var rootUrl = process.env.ROOT_URL || 'http://localhost:8333';

// chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome())
    .build();

tap.plan(4);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get(rootUrl + '/educators/register');
    return utils.fillUsernameSlide(driver, seleniumWebdriver)
        .then(utils.fillDemographicsSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillNameSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillPhoneSlide.bind(this, driver, seleniumWebdriver)); // eslint-disable-line no-invalid-this
});

tap.test('otherFieldRequiredIfChecked', function (t) {
    var otherCheckbox = driver.findElement(seleniumWebdriver.By.xpath('//input[@type="checkbox" and @value="8"]'));
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var errorMessageXPath = '//div[@class="other-input"]' + constants.generalErrorMessageXpath;
    otherCheckbox.click().then(function () {
        nextStepButton.click().then(function () {
            driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
                .then(function (validationMessages) {
                    t.equal(validationMessages.length, 1);
                    t.end();
                });
        });
    });
});

tap.test('checkOrganizationFieldRequired', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var errorMessageXPath = '//input[@name="organization.name"]/following-sibling::' +
        'span[@class="help-block validation-message"]/span[contains(text(),' +
        '"This field is required")]';
    nextStepButton.click().then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});

tap.test('checkRoleFieldRequired', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var errorMessageXPath = '//input[@name="organization.title"]/following-sibling::' +
        'span[@class="help-block validation-message"]/span[contains(text(),' +
        '"This field is required")]';
    nextStepButton.click().then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});

tap.test('checkOrganizationTypeRequired', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var errorMessageXPath = '//div[@class="checkbox"]/following-sibling::' +
        'span[@class="help-block validation-message" and contains(text(),' +
        '"This field is required")]';
    nextStepButton.click().then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});
