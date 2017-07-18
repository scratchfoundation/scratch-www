/*
 * Tests signing in & My Stuff according to smoke-tests at:
 *
 * https://github.com/LLK/scratchr2/wiki/Smoke-Testing-Test-Cases
 *
 * Note that I am using a user with at least 1 project and at least 1 studio
 *  - I'm not sure how to handle this more elegantly... b/c I don't want to commit a password?
 *  - I could supply a password for a Staging user I guess... but then people may want to test
 *  - on a variety of instances (local, staging, prod)?
 */

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

const clickButton = (text) => {
    return clickXpath(`//button[contains(text(), '${text}')]`);
};

var rootUrl = process.env.ROOT_URL || 'https://scratch.mit.edu';
var url = rootUrl + '/users/anyuser';

tap.plan(5);

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
    .then(() => findByXpath('//li[contains(@class, "logged-in-user")'
        + 'and contains(@class, "dropdown")]/span'))
    .then((element) => element.getText('span'))
    .then((text) => t.match(text.toLowerCase(), username.substring(0,10).toLowerCase(),
            'first part of username should be displayed in navbar'))
    .then(() => t.end());
});

test('Sign in to Scratch & verify My Stuff structure (tabs, title)', t => {
    clickXpath('//a[@class="mystuff-icon"]')
    .then(() => findByXpath('//div[@class="box-head"]/h2'))
    .then((element) => element.getText('h2'))
    .then((text) => t.equal('My Stuff', text, 'title should be My Stuff'))
    .then(() => findByXpath('//li[@data-tab="projects"]/a'))
    .then((element) => element.getText('a'))
    .then((text) => t.match(text, 'All Projects', 'All Projects tab should be present'))
    .then(() => findByXpath('//li[@data-tab="shared"]/a'))
    .then((element) => element.getText('a'))
    .then((text) => t.match(text, 'Shared Projects', 'Shared Projects tab should be present'))
    .then(() => findByXpath('//li[@data-tab="unshared"]/a'))
    .then((element) => element.getText('a'))
    .then((text) => t.match(text, 'Unshared Projects', 'Unshared Projects tab should be present'))
    .then(() => findByXpath('//li[@data-tab="galleries"]/a'))
    .then((element) => element.getText('a'))
    .then((text) => t.match(text, 'My Studios', 'My Studios tab should be present'))
    .then(() => findByXpath('//li[@data-tab="trash"]/a'))
    .then((element) => element.getText('a'))
    .then((text) => t.match(text, 'Trash', 'Trash tab should be present'))
    .then(() => t.end());
});

test('clicking See Inside should take you to the editor', t => {
    clickXpath('//a[@class="mystuff-icon"]')
    .then(() => findByXpath('//a[@data-control="edit"]'))
    .then((element) => element.getText('span'))
    .then((text) => t.equal(text, 'See inside', 'there should be a "See inside" button'))
    .then(() => clickXpath('//a[@data-control="edit"]'))
    .then(() => driver.getCurrentUrl())
    .then( function (url) {
        var expectedUrl = '/#editor';
        t.equal(url.substr(-expectedUrl.length), expectedUrl, 'after clicking, the URL should end in #editor');
    })
    .then(() => t.end());
});

test('clicking a project title should take you to the project page', t => {
    clickXpath('//a[@class="mystuff-icon"]')
    .then(() => clickXpath('//a[@data-control="edit"]'))
    .then(() => driver.getCurrentUrl())
    .then( function (url) {
        var expectedUrlRegExp = new RegExp('/projects/.*[0-9].*/?');
        t.match(url, expectedUrlRegExp, 'after clicking, the URL should end in projects/PROJECT_ID/');
    })
    .then(() => t.end());
});

test('Add To button should bring up a list of studios', t => {
    clickXpath('//a[@class="mystuff-icon"]')
    .then(() => findByXpath('//div[@data-control="add-to"]'))
    .then((element) => element.getText('span'))
    .then((text) => t.equal(text, 'Add to', 'there should be an "Add to" button'))
    .then(() => clickXpath('//div[@data-control="add-to"]'))
    .then(() => findByXpath('//div[@class="dropdown-menu"]/ul/li'))
    .then((element) => element.getText('span'))
    .then( function (text) {
        var expectedRegExp = new RegExp('.+');
        t.match(text, expectedRegExp, 'the dropdown menu should have at least 1 text item in it');
    })
    .then(() => t.end());
});
