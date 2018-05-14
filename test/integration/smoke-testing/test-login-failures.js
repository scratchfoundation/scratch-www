const {
    clickText,
    findByXpath,
    clickButton,
    driver,
    until,
    By
} = require('../selenium-helpers.js');

var username = process.env.SMOKE_USERNAME;
var password = process.env.SMOKE_PASSWORD;


var tap = require('tap');
const test = tap.test;

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
var url = rootUrl + '/users/' + username;

tap.plan(5);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(url);
});

/*
 * This test fails sometimes because blank username eventually
 * triggers the captcha page, which is a bug:
 * https://github.com/LLK/scratchr2/issues/4762
 */
test('Trying to sign in with no username and no password using scratchr2 navbar', t => {
    clickText('Sign in')
        .then(() => clickButton('Sign in'))
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/button[@type="submit"]')))
        )
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/div[@class="error"]')))
        )
        .then(() => findByXpath('//form/div[@class="error"]'))
        .then(element => element.getText())
        .then(text => t.match(text, 'This field is required.',
            '"This field is required" error should be displayed'))
        .then(() => t.end());
});

/*
 * This test fails sometimes because blank username eventually
 * triggers the captcha page, which is a bug:
 * https://github.com/LLK/scratchr2/issues/4762
 */
test('Trying to sign in with no username using scratchr2 navbar', t => {
    clickText('Sign in')
        .then(() => findByXpath('//input[@name="password"]'))
        .then((element) => element.sendKeys(password))
        .then(() => clickButton('Sign in'))
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/button[@type="submit"]')))
        )
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/div[@class="error"]')))
        )
        .then(() => findByXpath('//form/div[@class="error"]'))
        .then((element) => element.getText())
        .then((text) => t.match(text, 'This field is required.',
            '"This field is required" error should be displayed'))
        .then(() => t.end());
});

test('Trying to sign in with no password using scratchr2 navbar', t => {
    var nonsenseusername = Math.random().toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
    clickText('Sign in')
        .then(() => findByXpath('//input[@id="login_dropdown_username"]'))
        .then((element) => element.sendKeys(nonsenseusername))
        .then(() => clickButton('Sign in'))
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/button[@type="submit"]'))))
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/div[@class="error"]'))))
        .then(() => findByXpath('//form/div[@class="error"]'))
        .then((element) => element.getText())
        .then((text) => t.match(text, 'This field is required.',
            '"This field is required" error should be displayed'))
        .then(() => t.end());
});

test('Trying to sign in with the wrong username using scratchr2 navbar', t => {
    var nonsenseusername = Math.random().toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
    clickText('Sign in')
        .then(() => findByXpath('//input[@id="login_dropdown_username"]'))
        .then((element) => element.sendKeys(nonsenseusername))
        .then(() => findByXpath('//input[@name="password"]'))
        .then((element) => element.sendKeys(password))
        .then(() => clickButton('Sign in'))
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/button[@type="submit"]'))))
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/div[@class="error"]'))))
        .then(() => findByXpath('//form/div[@class="error"]'))
        .then((element) => element.getText())
        .then((text) => t.match(text, 'Incorrect username or password.',
            '"Incorrect username or password" error should be displayed'))
        .then(() => t.end());
});

test('Trying to sign in with the wrong password using scratchr2 navbar', t => {
    clickText('Sign in')
        .then(() => findByXpath('//input[@id="login_dropdown_username"]'))
        .then((element) => element.sendKeys(username))
        .then(() => findByXpath('//input[@name="password"]'))
        .then((element) => element.sendKeys('nonsensepassword'))
        .then(() => clickButton('Sign in'))
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/button[@type="submit"]'))))
        .then(() => driver.wait(until
            .elementLocated(By.xpath('//form[@id="login"]/div[@class="error"]'))))
        .then(() => findByXpath('//form/div[@class="error"]'))
        .then((element) => element.getText())
        .then((text) => t.match(text, 'Incorrect username or password.',
            '"Incorrect username or password" error should be displayed'))
        .then(() => t.end());
});
