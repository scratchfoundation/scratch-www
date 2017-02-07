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

//tap.plan(2);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    driver.get(rootUrl);
});

/*
 * Test case: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows#Create_should_take_you_to_the_editor
 */
//find the create link within the navbar
//the create link depends on whether the user is signed in or not (tips window opens)
tap.test('checkCreateLinkWhenSignedOut', function (t) {
    var xPathLink = '//li[contains(@class, "link") and contains(@class, "create")]/a';
    var createLinkSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    createLinkSignedOut.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/projects/editor/?tip_bar=home';
        //the create href should match `/projects/editor/?tip_bar=home`
        //the create href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

