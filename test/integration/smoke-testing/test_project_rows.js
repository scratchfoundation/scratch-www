/*
 * Checks that the some of the homepage rows on the homepage are displayed and
 * contents have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

var tap = require('tap');

const webdriver = require('selenium-webdriver');
const driver = helper.buildDriver('www-smoke test_project_rows');

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

// number of tests in the plan
tap.plan(4);

tap.tearDown(function () {
    // quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    // load the page with the driver
    return driver.get(rootUrl);
});

// checks that the title of the first row is Featured Projects
tap.test('checkFeaturedProjectsRowTitleWhenSignedOut', function (t) {
    var xPathLink = '//div[@class="box"]/div[@class="box-header"]/h4';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            element.getText('h4')
                .then(function (text) {
                    // expected value of the title text
                    var expectedText = 'Featured Projects';
                    t.equal(text, expectedText);
                    t.end();
                });
        });
});

// checks that the link for a project makes sense
tap.test('checkFeaturedProjectsRowLinkWhenSignedOut', function (t) {
    var xPathLink = '//div[contains(@class, "thumbnail") ' +
        'and contains(@class, "project") and contains(@class, "slick-slide") ' +
        'and contains(@class, "slick-active")]/a[@class="thumbnail-image"]';
    driver.wait(webdriver.until
        .elementLocated(webdriver.By.xpath(xPathLink)))
        .then(function (element) {
            element.getAttribute('href')
                .then(function (url) {
                    // expected pattern for the project URL
                    // since I don't know the length of the project ID number
                    var expectedUrlRegExp = new RegExp('/projects/.*[0-9].*/?');
                    t.match(url, expectedUrlRegExp);
                    t.end();
                });
        });
});

// checks that the title of the 2nd row is Featured Studios
tap.test('checkFeaturedStudiosRowWhenSignedOut', function (t) {
    var xPathLink = '//div[@class="box"][2]/div[@class="box-header"]/h4';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            element.getText('h4')
                .then(function (text) {
                    var expectedText = 'Featured Studios';
                    t.equal(text, expectedText);
                    t.end();
                });
        });
});

// checks that the link for a studio makes sense
tap.test('checkFeaturedStudiosRowLinkWhenSignedOut', function (t) {
    var xPathLink = '//div[contains(@class, "thumbnail") and contains(@class, "gallery") ' +
        'and contains(@class, "slick-slide") ' +
        'and contains(@class, "slick-active")]/a[@class="thumbnail-image"]';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            element.getAttribute('href')
                .then(function (url) {
                    var expectedUrlRegExp = new RegExp('/studios/.*[0-9].*/?');
                    t.match(url, expectedUrlRegExp);
                    t.end();
                });
        });
});
