const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

var tap = require('tap');
const test = tap.test;

const webdriver = require('selenium-webdriver');
const driver = helper.buildDriver('www-smoke test-login-failures');

const {
    findByCss,
    clickCss
} = helper;

var until = webdriver.until;

var username = process.env.SMOKE_USERNAME;
var password = process.env.SMOKE_PASSWORD;

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
var url = rootUrl + '/users/' + username;

tap.plan(3);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(url);
});

test('Trying to sign in with no password using scratchr2 navbar', t => {
    var nonsenseusername = Math.random().toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
    clickCss('.dropdown-toggle')
        .then(() => findByCss('form#login input#login_dropdown_username'))
        .then((element) => element.sendKeys(nonsenseusername))
        .then(() => clickCss('form#login button'))
        .then(() => findByCss('form#login .error'))
        .then((element) => {
            driver.wait(until.elementIsVisible(element));
            return element;
        })
        .then((element) => element.getText())
        .then((text) => t.match(text, 'This field is required',
            '"This field is required" error should be displayed'))
        .then(() => t.end());
});

test('Trying to sign in with the wrong username using scratchr2 navbar', t => {
    var nonsenseusername = Math.random().toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
    clickCss('.dropdown-toggle')
        .then(() => findByCss('form#login input#login_dropdown_username'))
        .then((element) => element.sendKeys(nonsenseusername))
        .then(() => findByCss('form#login input.wide.password'))
        .then((element) => element.sendKeys(password))
        .then(() => clickCss('form#login button'))
        .then(() => findByCss('form#login .error'))
        .then((element) => {
            driver.wait(until.elementIsVisible(element));
            return element;
        })
        .then((element) => element.getText())
        .then((text) => t.match(text, 'Incorrect username or password.',
            '"Incorrect username or password" error should be displayed'))
        .then(() => t.end());
});

test('Trying to sign in with the wrong password using scratchr2 navbar', t => {
    clickCss('.dropdown-toggle')
        .then(() => findByCss('form#login input#login_dropdown_username'))
        .then((element) => element.sendKeys(username))
        .then(() => findByCss('form#login input.wide.password'))
        .then((element) => element.sendKeys('nonsensepassword'))
        .then(() => clickCss('form#login button'))
        .then(() => findByCss('form#login .error'))
        .then((element) => {
            driver.wait(until.elementIsVisible(element));
            return element;
        })
        .then((element) => element.getText())
        .then((text) => t.match(text, 'Incorrect username or password.',
            '"Incorrect username or password" error should be displayed'))
        .then(() => t.end());
});
