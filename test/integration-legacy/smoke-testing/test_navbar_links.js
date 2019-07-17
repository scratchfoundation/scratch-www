/*
 * Checks that the links in the navbar on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

var tap = require('tap');

const webdriver = require('selenium-webdriver');
const driver = helper.buildDriver('www-smoke test_navbar_links');

// Set test url through environment variable
var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

// number of tests in the plan
tap.plan(7);

tap.tearDown(function () {
    // quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    // load the page with the driver
    return driver.get(rootUrl);
});

// ==== Links in navbar ====

// the create link changes depending on whether the user is signed in or not (tips window opens)
tap.test('checkCreateLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "create")]/a';
    var expectedHref = '/projects/editor/?tutorial=getStarted';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            return element.getAttribute('href');
        })
        .then(function (url) {
            t.equal(url.substr(-expectedHref.length), expectedHref);
            t.end();
        });
});

tap.test('checkExploreLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "explore")]/a';
    var expectedHref = '/explore/projects/all';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            return element.getAttribute('href');
        })
        .then(function (url) {
            t.equal(url.substr(-expectedHref.length), expectedHref);
            t.end();
        });
});

tap.test('checkIdeasLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "ideas")]/a';
    var expectedHref = '/ideas';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            return element.getAttribute('href');
        })
        .then(function (url) {
            t.equal(url.substr(-expectedHref.length), expectedHref);
            t.end();
        });
});

tap.test('checkAboutLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "about")]/a';
    var expectedHref = '/about';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            return element.getAttribute('href');
        })
        .then(function (url) {
            t.equal(url.substr(-expectedHref.length), expectedHref);
            t.end();
        });
});

// ==== Search bar ====

tap.test('checkSearchBar', function (t) {
    var xPathLink = '//input[@id="frc-q-1088"]';
    // search bar should exist
    driver.findElement(webdriver.By.xpath(xPathLink)).then(function (element) {
        t.ok(element);
        t.end();
    });
});

// ==== Join Scratch & Sign In ====

tap.test('checkJoinScratchLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "right") and contains(@class, "join")]/a';
    var expectedText = 'Join Scratch';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            return element.getText('a');
        })
        .then(function (text) {
            t.equal(text, expectedText);
            t.end();
        });
});

tap.test('checkSignInLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "right") and contains(@class, "login-item")]/a';
    var expectedText = 'Sign in';
    driver.findElement(webdriver.By.xpath(xPathLink))
        .then(function (element) {
            return element.getText('a');
        })
        .then(function (text) {
            t.equal(text, expectedText);
            t.end();
        });
});
