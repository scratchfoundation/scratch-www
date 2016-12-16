/*
 * Checks the behavior of the phone number step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

var constants = require('./educator_registration_utils.js').constants;

//Set test url through environment variable
//var rootUrl = process.ENV.ROOT_URL || 'http://localhost:8333';

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
        'and @type="radio"]')).click();
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

var fillNameSlide = function () {
    var firstNamePromise = driver.findElement(seleniumWebdriver.By.name('user.name.first')).sendKeys('first');
    var lastNamePromise = driver.findElement(seleniumWebdriver.By.name('user.name.last')).sendKeys('surname');
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    return Promise.all([firstNamePromise, lastNamePromise]).then(function () {
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('phone-step')));
        });
    });
};

var fillPhoneSlide = function () {
    var phoneInput = driver.findElement(seleniumWebdriver.By.xpath('//input[@type="tel"]'));
    var consentCheckbox = driver.findElement(seleniumWebdriver.By.name('phoneConsent'));
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var phoneNumberPromise = phoneInput.sendKeys('6172535960');
    var consentPromise =  consentCheckbox.click();
    return Promise.all([phoneNumberPromise, consentPromise]).then(function () {
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('organization-step')));
        });
    });
};

tap.plan(3);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get('https://scratch.mit.edu/educators/register');
    return fillUsernameSlide()
        .then(fillDemographicsSlide)
        .then(fillNameSlide)
        .then(fillPhoneSlide);
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
    var errorMessageXPath = '//input[@name="organization.name"]/following-sibling::'
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

tap.test('checkRoleFieldRequired', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    var errorMessageXPath = '//input[@name="organization.title"]/following-sibling::'
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
