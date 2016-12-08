/*
 * Checks the behavior of demographics step in the educators registration process
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

tap.plan(2);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get('https://scratch.mit.edu/educators/register');
    return fillUsernameSlide();
});

//if the user selects the other gender option, they must input a gender
//selects the other gender option and attempt to advance the slide
tap.test('checkOtherGenderInput', function (t) {
    var otherGenderRadio = driver.findElement(seleniumWebdriver.By.xpath('//input[@value="other"' +
        'and @type="radio"]'));
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath('//button[span[contains(text(),'
        + '"Next Step")]]'));
    var errorMessage = 'This field is required';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"'
    + errorMessage + '")]';
    driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]/option[2]')).click();
    otherGenderRadio.click().then(function () {
        nextStepButton.click().then(function () {
            driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
        });
    });
});

//the user must select a gender
//tries to advance the slide without selecting a gender
tap.test('checkNoGenderInput', function (t) {
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath('//button[span[contains(text(),'
        + '"Next Step")]]'));
    var errorMessage = 'This field is required';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"'
    + errorMessage + '")]';
    driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]/option[2]')).click();
    nextStepButton.click().then(function () {
            driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(function (validationMessages) {
                t.equal(validationMessages.length, 1);
                t.end();
            });
        });
});

