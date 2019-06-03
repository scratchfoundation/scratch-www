/*
 * Checks the behavior of the search interface
 */
require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();
const {
    urlMatches
} = helper;

const tap = require('tap');
const test = tap.test;

// Set test url through environment variable
const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
const searchBaseUrl = `${rootUrl}/search/`;

// chrome driver
const driver = helper.buildDriver('www-search test_search');

tap.plan(3);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(searchBaseUrl);
});

test('Search escapes spaces', function (t) {
    const searchInput = driver.findElement(seleniumWebdriver.By.name('q'));
    searchInput.sendKeys('Test search string', helper.getKey('ENTER')).then(function () {
        urlMatches(/^.*\?q=Test%20search%20string$/)
            .then(() => t.end());
    });
});

test('Search escapes symbols', function (t) {
    const searchInput = driver.findElement(seleniumWebdriver.By.name('q'));
    searchInput.sendKeys('100% pen', helper.getKey('ENTER')).then(function () {
        urlMatches(/^.*\?q=100%25%20pen$/)
            .then(() => t.end());
    });
});

test('Switching to studios maintains search string', function (t) {
    const searchInput = driver.findElement(seleniumWebdriver.By.name('q'));
    searchInput.sendKeys('100% pen', helper.getKey('ENTER')).then(function () {
        const studiosTab = driver.findElement(seleniumWebdriver.By.xpath(
            '//a/li/span[contains(text(),"Studios")]'));
        studiosTab.click().then(function () {
            urlMatches(/^.*\?q=100%25%20pen$/)
                .then(() => t.end());
        });
    });
});
