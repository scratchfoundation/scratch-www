/*
 * Checks the behavior of demographics step in the educators registration process
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
    return utils.fillUsernameSlide(driver, seleniumWebdriver);
});

// if the user selects the other gender option, they must input a gender
// selects the other gender option and attempt to advance the slide
tap.test('checkOtherGenderInput', function (t) {
    var otherGenderRadio = driver.findElement(seleniumWebdriver.By.xpath('//input[@value="other"' +
        'and @type="radio"]'));
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]/option[2]')).click();
    otherGenderRadio.click().then(function () {
        nextStepButton.click().then(function () {
            driver.findElements(seleniumWebdriver.By.xpath(constants.generalErrorMessageXpath))
                .then(function (validationMessages) {
                    t.equal(validationMessages.length, 1);
                    t.end();
                });
        });
    });
});

// the user must select a gender
// tries to advance the slide without selecting a gender
tap.test('checkNoGenderInput', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]/option[2]')).click();
    nextStepButton.click().then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(constants.generalErrorMessageXpath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});
