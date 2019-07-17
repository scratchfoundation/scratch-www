/*
 * Checks the behavior of the address step in the educators registration process
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

tap.plan(2);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get(rootUrl + '/educators/register');
    return utils.fillUsernameSlide(driver, seleniumWebdriver)
        .then(utils.fillDemographicsSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillNameSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillPhoneSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillOrganizationSlide.bind(this, driver, seleniumWebdriver)); // eslint-disable-line no-invalid-this
});

// Selects Vatican City as the country, and checks that the state dropdown disappears
tap.test('checkStateDropdownOnlyPresentWhenNeeded', function (t) {
    driver.findElement(seleniumWebdriver.By.xpath('//select[@name="address.country"]' +
        '/option[@value="va"]')).click() // select Vatican City as the country
        .then(function () {
            driver.findElements(seleniumWebdriver.By.name('address.state'))
                .then(function (stateDropdown) {
                    t.equal(stateDropdown.length, 0);
                    t.end();
                });
        });
});

tap.test('checkZipCodeRequired', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var errorMessageXPath = '//input[@name="address.zip"]/following-sibling::' +
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
