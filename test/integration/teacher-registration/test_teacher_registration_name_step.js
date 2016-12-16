/*
 * Checks the behavior of the name step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

var constants = require('./teacher_registration_utils.js').constants;

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

var fillUsernameSlide = function () {
    var passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    var usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    var usernamePromise = usernameInput.sendKeys('clipspringer');
    var passwordPromise = passwordInput.sendKeys('educators');
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    return Promise.all([usernamePromise, passwordPromise]).then(function () {
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('demographics-step')));
        });
    });
};

var fillDemographicsSlide = function () {
    var clickMaleInput = driver.findElement(seleniumWebdriver.By.xpath('//input[@value="male"' +
        ' and @type="radio"]')).click();
    var selectCountry = driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]' +
        '/option[2]')).click();
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    return Promise.all([clickMaleInput, selectCountry]).then(function () {
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('name-step')));
        });
    });
};

tap.plan(2);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get('https://scratch.mit.edu/educators/register');
    return fillUsernameSlide().then(fillDemographicsSlide);
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

