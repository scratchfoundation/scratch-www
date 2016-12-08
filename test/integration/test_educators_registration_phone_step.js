/*
 * Checks the behavior of the phone number step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

var fillUsernameSlide = function () {
    var passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    var usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    var usernamePromise = usernameInput.sendKeys('clipspringer');
    var passwordPromise = passwordInput.sendKeys('educators');
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath('//button[span[contains(text(),'
        + '"Next Step")]]'));
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
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath('//button[span[contains(text(),'
        + '"Next Step")]]'));
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
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath('//button[span[contains(text(),'
        + '"Next Step")]]'));
    return Promise.all([firstNamePromise, lastNamePromise]).then(function () {
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('phone-step')));
        });
    });
};

tap.plan(1);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get('https://scratch.mit.edu/educators/register');
    return fillUsernameSlide()
        .then(fillDemographicsSlide)
        .then(fillNameSlide);
});

//inputs an invalid phone number and checks that the correct error message appears
tap.test('validatePhoneNumber', function (t) {
    var phoneInput = driver.findElement(seleniumWebdriver.By.xpath('//input[@type="tel"]'));
    var errorMessage = 'Please enter a valid phone number';
    var errorMessageXPath = '//span[@class="help-block validation-message"]/span[contains(text(),"'
    + errorMessage + '")]';
    phoneInput.sendKeys(1234567890).then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});

