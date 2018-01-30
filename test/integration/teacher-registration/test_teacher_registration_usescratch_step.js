/*
 * Checks the behavior of the 'use scratch' step in the educators registration process
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

tap.plan(3);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get(rootUrl + '/educators/register');
    return utils.fillUsernameSlide(driver, seleniumWebdriver)
        .then(utils.fillDemographicsSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillNameSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillPhoneSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillOrganizationSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillAddressSlide.bind(this, driver, seleniumWebdriver)); // eslint-disable-line no-invalid-this
});

tap.test('checkCharacterCountIsCorrect', function (t) {
    var textarea = driver.findElement(seleniumWebdriver.By.name('useScratch'));
    var charCount = driver.findElement(seleniumWebdriver.By.xpath('//p[@class="char-count"]'));
    textarea.sendKeys('hello').then(function () {
        charCount.getText().then(function (charCountText) {
            t.equal(charCountText, '5/300');
            t.end();
        });
    });
});

// Inputs more than 300 characters and checks that the char count gets the class 'overmax'
// which turns the text orange
tap.test('checkCharacterCountTurnsOrangeWhenTooLong', function (t) {
    var textarea = driver.findElement(seleniumWebdriver.By.name('useScratch'));
    var charCount = driver.findElement(seleniumWebdriver.By.xpath('//p[@class="char-count"]'));
    textarea.sendKeys(constants.loremIpsumTextLong).then(function () {
        charCount.getAttribute('class').then(function (charCountClasses) {
            t.ok(charCountClasses.includes('overmax'));
            t.end();
        });
    });
});

tap.test('checkCharacterCountErrorAppersWhenTooLong', function (t) {
    var textarea = driver.findElement(seleniumWebdriver.By.name('useScratch'));
    var errorMessage = 'Description must be at most 300 characters';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"' +
        errorMessage + '")]';
    textarea.sendKeys(constants.loremIpsumTextLong).then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(function (validationMessages) {
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});
