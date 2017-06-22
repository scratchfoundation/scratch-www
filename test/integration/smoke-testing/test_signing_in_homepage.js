var path = require('path');
var fs = require('fs');

var dirPath = path.resolve(__dirname, '../not-tracked/');
var filePath = dirPath + '/credentials.js';
var credentials = fs.readFileSync(filePath,'utf8');

var window = {};
var credentials = eval(credentials);

var tap = require('tap');
const test = tap.test;
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const findByXpath = (xpath) => {
    return driver.wait(until.elementLocated(By.xpath(xpath), 5 * 1000));
};

const findByCss = (css) => {
    return driver.wait(until.elementLocated(By.css(css), 1000 * 5));
};

const clickXpath = (xpath) => {
    return findByXpath(xpath).then(el => el.click());
};

const clickText = (text) => {
    return clickXpath(`//*[contains(text(), '${text}')]`);
};

const clickButton = (text) => {
    return clickXpath(`//button[contains(text(), '${text}')]`);
};

var rootUrl = process.env.ROOT_URL || 'https://scratch.mit.edu/users/anyuser';

tap.plan(5);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(rootUrl);
});

test('Sign in to Scratch using scratch-www navbar', t => {
    clickText('Sign in')
    .then(() => findByXpath('//input[@id="login_dropdown_username"]'))
    .then((element) => element.sendKeys(username))
    .then(() => findByXpath('//input[@name="password"]'))
    .then((element) => element.sendKeys(password))
    .then(() => clickButton('Sign in'))
    .then(() => findByXpath('//li[contains(@class, "logged-in-user")'
        + 'and contains(@class, "dropdown")]/span'))
    .then((element) => element.getText('span'))
    .then((text) => t.match(text.toLowerCase(), username.substring(0,10).toLowerCase(),
            'first part of username should be displayed in navbar'))
    .then(() => t.end());
});
