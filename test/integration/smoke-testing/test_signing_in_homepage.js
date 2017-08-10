/*
 * Tests signing in according to smoke-tests at:
 *
 * https://github.com/LLK/scratchr2/wiki/Smoke-Testing-Test-Cases
 *
 */

const {
    clickText,
    findByXpath,
    clickXpath,
    driver
} = require('../../helpers/selenium-helpers.js');

var username = process.env.SMOKE_USERNAME;
var password = process.env.SMOKE_PASSWORD;

var tap = require('tap');
const test = tap.test;

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

tap.plan(1);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(rootUrl);
});

test('Sign in to Scratch using scratch-www navbar', t => {
    clickText('Sign in')
    .then(() => findByXpath('//input[@id="frc-username-1088"]'))
    .then((element) => element.sendKeys(username))
    .then(() => findByXpath('//input[@id="frc-password-1088"]'))
    .then((element) => element.sendKeys(password))
    .then(() => clickXpath('//button[contains(@class, "button") and '
        + 'contains(@class, "submit-button") and contains(@class, "white")]'))
    .then(() => findByXpath('//span[@class="profile-name"]'))
    .then((element) => element.getText())
    .then((text) => t.match(text.toLowerCase(), username.substring(0,10).toLowerCase(),
            'first part of username should be displayed in navbar'))
    .then(() => t.end());
});
