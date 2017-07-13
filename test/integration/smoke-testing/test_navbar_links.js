/*
 * Checks that the links in the navbar on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

// Selenium's promise driver will be deprecated, so we should not rely on it
seleniumWebdriver.SELENIUM_PROMISE_MANAGER=0;

//Set test url through environment variable
var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

//number of tests in the plan
tap.plan(7);

tap.tearDown(function () {
    //quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    //load the page with the driver
    return driver.get(rootUrl);
});

// ==== Links in navbar ====

//the create link changes depending on whether the user is signed in or not (tips window opens)
tap.test('checkCreateLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "create")]/a';
    var expectedHref = '/projects/editor/?tip_bar=home';
    driver.findElement(seleniumWebdriver.By.xpath(xPathLink))
        .then( function (element) {
            return element.getAttribute('href');})
        .then( function (url) {
            t.equal(url.substr(-expectedHref.length), expectedHref);
            t.end();
        });
});

tap.test('checkExploreLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "explore")]/a';
    var expectedHref = '/explore/projects/all';
    driver.findElement(seleniumWebdriver.By.xpath(xPathLink))
        .then( function (element) {
            return element.getAttribute('href');})
        .then( function (url) {
            t.equal(url.substr(-expectedHref.length), expectedHref);
            t.end();
        });
});

tap.test('checkTipsLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "tips")]/a';
    var expectedHref = '/tips';
    driver.findElement(seleniumWebdriver.By.xpath(xPathLink))
        .then( function (element) {
            return element.getAttribute('href');})
        .then( function (url) {
            t.equal(url.substr(-expectedHref.length), expectedHref);
            t.end();
        });
});

tap.test('checkAboutLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "about")]/a';
    var expectedHref = '/about';
    driver.findElement(seleniumWebdriver.By.xpath(xPathLink))
    .then( function (element) {
        return element.getAttribute('href');})
    .then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== Search bar ====

tap.test('checkSearchBar', function (t) {
    var xPathLink = '//input[@id="frc-q-1088"]';
    // search bar should exist
    driver.findElement(seleniumWebdriver.By.xpath(xPathLink)).then( function (element) {
        t.ok(element);
        t.end();
    });
});

// ==== Join Scratch & Sign In ====

tap.test('checkJoinScratchLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "right") and contains(@class, "join")]/a';
    var expectedText = 'Join Scratch';
    driver.findElement(seleniumWebdriver.By.xpath(xPathLink))
        .then( function (element) {
            return element.getText('a');})
        .then( function (text) {
            t.equal(text, expectedText);
            t.end();
        });
});

tap.test('checkSignInLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "right") and contains(@class, "login-item")]/a';
    var expectedText = 'Sign in';
    driver.findElement(seleniumWebdriver.By.xpath(xPathLink))
        .then( function (element) {
            return element.getText('a');})
        .then( function (text) {
            t.equal(text, expectedText);
            t.end();
        });
});
