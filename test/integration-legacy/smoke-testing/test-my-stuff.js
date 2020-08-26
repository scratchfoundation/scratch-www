/*
 * Tests signing in & My Stuff according to smoke-tests at:
 *
 * https://github.com/LLK/scratchr2/wiki/Smoke-Testing-Test-Cases
 *
 */

const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

var tap = require('tap');
const test = tap.skip;

const driver = helper.buildDriver('www-smoke test-my-stuff');

const {
    clickText,
    findByXpath,
    clickXpath,
    clickButton
} = helper;

var username = process.env.SMOKE_USERNAME;
var password = process.env.SMOKE_PASSWORD;

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
var url = rootUrl + '/users/' + username;

tap.plan(7);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(url)
        .then(() => clickText('Sign in'))
        .then(() => findByXpath('//input[@id="login_dropdown_username"]'))
        .then((element) => element.sendKeys(username))
        .then(() => findByXpath('//input[@name="password"]'))
        .then((element) => element.sendKeys(password))
        .then(() => clickButton('Sign in'));
});

tap.afterEach(function () {
    return clickXpath('//span[@class="user-name dropdown-toggle"]')
        .then(() => clickXpath('//li[@id="logout"] '))
        .then(() => findByXpath('//div[@class="title-banner intro-banner"]'));
});

test('Sign in to Scratch using scratchr2 navbar', t => {
    findByXpath('//li[contains(@class, "logged-in-user")' +
        'and contains(@class, "dropdown")]/span')
        .then((element) => element.getText('span'))
        .then((text) => t.match(text.toLowerCase(), username.substring(0, 10).toLowerCase(),
            'first part of username should be displayed in navbar'))
        .then(() => t.end());
});

test('Sign in to Scratch & verify My Stuff structure (tabs, title)', t => {
    clickXpath('//a[contains(@class, "mystuff-icon")]')
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
    clickXpath('//a[contains(@class, "mystuff-icon")]')
        .then(() => findByXpath('//a[@data-control="edit"]'))
        .then((element) => element.getText('span'))
        .then((text) => t.equal(text, 'See inside', 'there should be a "See inside" button'))
        .then(() => clickXpath('//a[@data-control="edit"]'))
        .then(() => driver.getCurrentUrl())
        .then(function (u) {
            var expectedUrl = '/editor';
            t.equal(u.substr(-expectedUrl.length), expectedUrl, 'after clicking, the URL should end in #editor');
        })
        .then(() => driver.get(url))
        .then(() => t.end());
});

test('clicking a project title should take you to the project page', t => {
    clickXpath('//a[contains(@class, "mystuff-icon")]')
        .then(() => clickXpath('//a[@data-control="edit"]'))
        .then(() => driver.getCurrentUrl())
        .then(function (u) {
            var expectedUrlRegExp = new RegExp('/projects/.*[0-9].*/?');
            t.match(u, expectedUrlRegExp, 'after clicking, the URL should end in projects/PROJECT_ID/');
        })
        .then(() => driver.get(url))
        .then(() => t.end());
});

test('Add To button should bring up a list of studios', t => {
    clickXpath('//a[contains(@class, "mystuff-icon")]')
        .then(() => clickXpath('//div[@id="sidebar"]/ul/li[@data-tab="shared"]'))
        .then(() => findByXpath('//div[@data-control="add-to"]'))
        .then((element) => element.getText('span'))
        .then((text) => t.equal(text, 'Add to', 'there should be an "Add to" button'))
        .then(() => clickXpath('//div[@data-control="add-to"]'))
        .then(() => findByXpath('//div[@class="dropdown-menu"]/ul/li'))
        .then((element) => element.getText('span'))
        .then(function (text) {
            var expectedRegExp = new RegExp('.+');
            t.match(text, expectedRegExp, 'the dropdown menu should have at least 1 text item in it');
        })
        .then(() => t.end());
});

test('+ New Studio button should take you to the studio page', {skip: true}, t => {
    clickXpath('//a[contains(@class, "mystuff-icon")]')
        .then(() => clickXpath('//form[@id="new_studio"]/button[@type="submit"]'))
        .then(() => findByXpath('//div[@id="show-add-project"]'))
        .then((element) => element.getText('span'))
        .then((text) => t.equal(text, 'Add projects', 'there should be an "Add projects" button'))
        .then(() => driver.getCurrentUrl())
        .then(function (u) {
            var expectedUrlRegExp = new RegExp('/studios/.*[0-9].*/?');
            t.match(u, expectedUrlRegExp,
                'after clicking the + New Studio, the URL should end in studios/STUDIO_ID');
        })
        .then(() => t.end());
});

test('+ New Project button should open the editor', {skip: true}, t => {
    clickXpath('//a[contains(@class, "mystuff-icon")]')
        .then(() => clickText('+ New Project'))
        .then(() => driver.getCurrentUrl())
        .then(function (u) {
            var expectedUrlRegExp = new RegExp('/projects/editor');
            t.match(u, expectedUrlRegExp,
                'after clicking, the URL should end in projects/editor');
        })
        .then(() => t.end());
});
