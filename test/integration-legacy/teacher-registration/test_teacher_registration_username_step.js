/*
* Checks the behavior of first step in the educators registration process
*
* Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
*/

require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

// Set test url through environment variable
var rootUrl = process.env.ROOT_URL || 'http://localhost:8333';

// chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome())
    .build();

tap.plan(5);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(rootUrl + '/educators/register');
});

// an error message should appear for a username less than 3 characters long
// input a username less than 3 characters and look for the validation message
tap.test('checkAtLeastThreeCharacters', function (t) {
    // open scratch in a new instance of the browser
    driver.get('https://scratch.mit.edu/educators/register');
    var usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    var errorMessage = 'Usernames must be at least 3 characters';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"' +
      errorMessage + '")]';
    usernameInput.sendKeys('hi').then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(function (validationMessages) {
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});

// usernames have to be unique
// input a username that exists and check that an error message appears
tap.test('checkUsernameExistsError', function (t) {
    var usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    var passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    var inputUsername = usernameInput.sendKeys('mres');
    var passwordClick = passwordInput.click();
    var errorMessage = 'Sorry, that username already exists';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"' +
      errorMessage + '")]';
    Promise.all([inputUsername, passwordClick]).then(function () { // eslint-disable-line no-undef
        var errorBubble = driver.wait(seleniumWebdriver.until
            .elementLocated(seleniumWebdriver.By.xpath(errorMessageXPath)), 10000);
        t.notEqual(errorBubble, undefined); // eslint-disable-line no-undefined
        t.end();
    });
});

// passwords must be at least 6 characters
// find the validation message if the input password is less than 6 characters
tap.test('checkPasswordAtLeastSixCharacters', function (t) {
    var passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    var errorMessage = 'Passwords must be at least six characters';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"' +
      errorMessage + '")]';
    passwordInput.sendKeys('hello').then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(function (validationMessages) {
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});

// password cannot be "password"
// find the validation message if the user inputs "password"
tap.test('checkPasswordNotPassword', function (t) {
    driver.get('https://scratch.mit.edu/educators/register');
    var passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    // keeping "password" in messed with the xPath, may need to find a better way
    var errorMessage = 'Your password may not be';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"' +
      errorMessage + '")]';
    passwordInput.sendKeys('password').then(function () {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(function (validationMessages) {
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});

// the username and password cannot be the same
// find the validation message if the username and password match
tap.test('checkPasswordNotUsername', function (t) {
    driver.get('https://scratch.mit.edu/educators/register');
    var passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    var usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    var errorMessage = 'Your password may not be your username';
    var errorMessageXPath = '//span[@class="help-block validation-message" and contains(text(),"' +
      errorMessage + '")]';
    var usernamePromise = usernameInput.sendKeys('educator');
    var passwordPromise = passwordInput.sendKeys('educator');
    // wait for both inputs to have the same text, and check for validation message
    Promise.all([usernamePromise, passwordPromise]).then(function () { // eslint-disable-line no-undef
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(function (validationMessages) {
            // there should be only one validation message
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});
