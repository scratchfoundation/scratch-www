/*
 * Checks the behavior of the phone number step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

var utils = require('./teacher_registration_utils.js');

// Set test url through environment variable
var rootUrl = process.env.ROOT_URL || 'http://localhost:8333';

// chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome())
    .build();

tap.plan(1);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get(rootUrl + '/educators/register');
    return utils.fillUsernameSlide(driver, seleniumWebdriver)
        .then(utils.fillDemographicsSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillNameSlide.bind(this, driver, seleniumWebdriver)); // eslint-disable-line no-invalid-this
});

// inputs an invalid phone number and checks that the correct error message appears
tap.test('validatePhoneNumber', function (t) {
    var phoneInput = driver.findElement(seleniumWebdriver.By.xpath('//input[@type="tel"]'));
    var errorMessage = 'Please enter a valid phone number';
    var errorMessageXPath = '//span[@class="help-block validation-message"]/span[contains(text(),"' +
    errorMessage + '")]';
    phoneInput.sendKeys(1234567890).then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});
