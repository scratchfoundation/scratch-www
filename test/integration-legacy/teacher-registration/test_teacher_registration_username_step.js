/*
* Checks the behavior of first step in the educators registration process
*
* Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
*/

const seleniumWebdriver = require('selenium-webdriver');
const tap = require('tap');

// Set test url through environment variable
const rootUrl = process.env.ROOT_URL || 'http://localhost:8333';

// chrome driver
const driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome())
    .build();

tap.plan(5);

tap.tearDown(() => {
    driver.quit();
});

tap.beforeEach(() => driver.get(`${rootUrl}/educators/register`));

// an error message should appear for a username less than 3 characters long
// input a username less than 3 characters and look for the validation message
tap.test('checkAtLeastThreeCharacters', t => {
    // open scratch in a new instance of the browser
    driver.get('https://scratch.mit.edu/educators/register');
    const usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    const errorMessage = 'Usernames must be at least 3 characters';
    const errorMessageXPath = `//span[@class="help-block validation-message" and contains(text(),"${
        errorMessage}")]`;
    usernameInput.sendKeys('hi').then(() => {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(validationMessages => {
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});

// usernames have to be unique
// input a username that exists and check that an error message appears
tap.test('checkUsernameExistsError', t => {
    const usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    const passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    const inputUsername = usernameInput.sendKeys('mres');
    const passwordClick = passwordInput.click();
    const errorMessage = 'Sorry, that username already exists';
    const errorMessageXPath = `//span[@class="help-block validation-message" and contains(text(),"${
        errorMessage}")]`;
    Promise.all([inputUsername, passwordClick]).then(() => { // eslint-disable-line no-undef
        const errorBubble = driver.wait(seleniumWebdriver.until
            .elementLocated(seleniumWebdriver.By.xpath(errorMessageXPath)), 10000);
        t.notEqual(errorBubble, undefined); // eslint-disable-line no-undefined
        t.end();
    });
});

// passwords must be at least 6 characters
// find the validation message if the input password is less than 6 characters
tap.test('checkPasswordAtLeastSixCharacters', t => {
    const passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    const errorMessage = 'Passwords must be at least six characters';
    const errorMessageXPath = `//span[@class="help-block validation-message" and contains(text(),"${
        errorMessage}")]`;
    passwordInput.sendKeys('hello').then(() => {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(validationMessages => {
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});

// password cannot be "password"
// find the validation message if the user inputs "password"
tap.test('checkPasswordNotPassword', t => {
    driver.get('https://scratch.mit.edu/educators/register');
    const passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    // keeping "password" in messed with the xPath, may need to find a better way
    const errorMessage = 'Your password may not be';
    const errorMessageXPath = `//span[@class="help-block validation-message" and contains(text(),"${
        errorMessage}")]`;
    passwordInput.sendKeys('password').then(() => {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(validationMessages => {
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});

// the username and password cannot be the same
// find the validation message if the username and password match
tap.test('checkPasswordNotUsername', t => {
    driver.get('https://scratch.mit.edu/educators/register');
    const passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    const usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    const errorMessage = 'Your password may not be your username';
    const errorMessageXPath = `//span[@class="help-block validation-message" and contains(text(),"${
        errorMessage}")]`;
    const usernamePromise = usernameInput.sendKeys('educator');
    const passwordPromise = passwordInput.sendKeys('educator');
    // wait for both inputs to have the same text, and check for validation message
    Promise.all([usernamePromise, passwordPromise]).then(() => { // eslint-disable-line no-undef
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath)).then(validationMessages => {
            // there should be only one validation message
            t.equal(validationMessages.length, 1);
            t.end();
        });
    });
});
