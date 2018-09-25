/*
 * Tests from:
 *
 * https://github.com/LLK/scratchr2/wiki/Smoke-Testing-Test-Cases
 *
 */

const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

var tap = require('tap');
const test = tap.test;

const driver = helper.buildDriver('www-smoke test_sign_in_out_discuss');

const {
    clickText,
    findByXpath,
    findText,
    clickXpath,
    clickButton
} = helper;

var username = process.env.SMOKE_USERNAME;
var password = process.env.SMOKE_PASSWORD;

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
var url = rootUrl + '/discuss';

tap.plan(2);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(url);
});

test('Sign in to Scratch using scratchr2 navbar', t => {
    clickText('Sign in')
        .then(() => findByXpath('//input[@id="login_dropdown_username"]'))
        .then((element) => element.sendKeys(username))
        .then(() => findByXpath('//input[@name="password"]'))
        .then((element) => element.sendKeys(password))
        .then(() => clickButton('Sign in'))
        .then(() => findByXpath('//li[contains(@class, "logged-in-user")' +
        'and contains(@class, "dropdown")]/span'))
        .then((element) => element.getText('span'))
        .then((text) => t.match(text.toLowerCase(), username.substring(0, 10).toLowerCase(),
            'first part of username should be displayed in navbar'))
        .then(() => t.end());
});

test('Sign out of Scratch using scratchr2 navbar', t => {
    clickXpath('//span[contains(@class, "user-name")' +
        ' and contains(@class, "dropdown-toggle")]/img[contains(@class, "user-icon")]')
        .then(() => clickXpath('//input[@value="Sign out"]'))
        .then(() => findText('Sign in'))
        .then((element) => t.ok(element, 'Sign in reappeared on the page after signing out'))
        .then(() => t.end());
});
