var username = process.env.USERNAME;
var password = process.env.PASSWORD;

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

const clickXpath = (xpath) => {
    return findByXpath(xpath).then(el => el.click());
};

const clickText = (text) => {
    return clickXpath(`//*[contains(text(), '${text}')]`);
};

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
