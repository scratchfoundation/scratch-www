/*
 * Checks the behavior of the name step in the educators registration process
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
    var usernamePromise = usernameInput.sendKeys('ladybug');
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
        ' and @type="radio"]')).click();
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

tap.plan(1);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get('https://scratch.mit.edu/educators/register');
    return fillUsernameSlide().then(fillDemographicsSlide);
});

//attempts to advance the slide without inputting either name, checks that both give the correct error
tap.test('checkBothNamesRequired', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath('//button[span[contains(text(),'
        + '"Next Step")]]'));
    var errorMessage = 'This field is required';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"'
    + errorMessage + '")]';
    nextStepButton.click().then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 2);
                t.end();
            });
    });
});

