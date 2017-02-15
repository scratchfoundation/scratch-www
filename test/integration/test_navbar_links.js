/*
 * Checks that the links in the navbar on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

//Set test url through environment variable
//var rootUrl = process.env.ROOT_URL || 'http://localhost:8333';
var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

//number of tests in the plan
tap.plan(8);

//load the page with the driver
driver.get(rootUrl);

// ==== Links in navbar ====

/*
 * Test case: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows#Create_should_take_you_to_the_editor
 */
//find the create link within the navbar
//the create link depends on whether the user is signed in or not (tips window opens)
tap.test('checkCreateLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "create")]/a';
    var checkCreateLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkCreateLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/projects/editor/?tip_bar=home';
        //the create href should match `/projects/editor/?tip_bar=home`
        //the create href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

tap.test('checkExploreLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "explore")]/a';
    var checkExploreLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkExploreLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/explore/projects/all';
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

tap.test('checkDiscussLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "discuss")]/a';
    var checkDiscussLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkDiscussLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/discuss';
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

tap.test('checkAboutLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "about")]/a';
    var checkAboutLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkAboutLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/about';
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

tap.test('checkHelpLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "help")]/a';
    var checkHelpLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkHelpLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/help';
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== Search bar ====

tap.test('checkSearchBar', function (t) {
    var xPathLink = '//input[@id="frc-q-1088"]';
    // search bar should exist
    // if it isn't found, it will throw an error, which tap will treat as a failure
    var checkSearchBar = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    t.end();
});


// ==== Join Scratch & Sign In ====

tap.test('checkJoinScratchLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "right") and contains(@class, "join")]/a';
    var checkJoinScratchLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkJoinScratchLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '#';
        //the href should match
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        checkJoinScratchLinkWhenSignedOut.getText('a').then( function (text) {
            var expectedText = 'Join Scratch';
            //the text should match
            t.equal(text, expectedText);
            t.end();
        });
    });
});

tap.test('checkSignInLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "right") and contains(@class, "login-item")]/a';
    var checkSignInLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkSignInLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '#';
        //the href should match
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        checkSignInLinkWhenSignedOut.getText('a').then( function (text) {
            var expectedText = 'Sign in';
            //the text should match
            t.equal(text, expectedText);
            t.end();
        });
    });
});

//quit the instance of the driver
driver.quit();

