/*
 * Checks the behavior of the name step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

var utils = require('./teacher_registration_utils.js');
var constants = utils.constants;

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

var fillUsernameSlide = function () {
    return utils.fillUsernameSlide(driver, seleniumWebdriver);
};

var fillDemographicsSlide = function () {
    return utils.fillDemographicsSlide(driver, seleniumWebdriver);
};

tap.plan(2);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get('https://scratch.mit.edu/educators/register');
    return fillUsernameSlide()
        .then(fillDemographicsSlide);
});

//attempts to advance the slide without inputting either name, checks that both give the correct error
tap.test('checkFirstNameRequired', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var errorMessageXPath = '//input[@name="user.name.first"]/following-sibling::'
        + 'span[@class="help-block validation-message" and contains(text(),'
        + '"This field is required")]';
    nextStepButton.click().then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});

//attempts to advance the slide without inputting either name, checks that both give the correct error
tap.test('checkLastNameRequired', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var errorMessageXPath = '//input[@name="user.name.last"]/following-sibling::'
        + 'span[@class="help-block validation-message" and contains(text(),'
        + '"This field is required")]';
    nextStepButton.click().then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});

