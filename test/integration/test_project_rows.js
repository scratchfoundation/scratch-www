/*
 * Checks that the links in the homepage rows on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var tap = require('tap');

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

//number of tests in the plan
tap.plan(4);

//load the page with the driver
driver.get(rootUrl);

//checks that the title of the first row is Featured Projects
tap.test('checkFeaturedProjectsRowTitleWhenSignedOut', function (t) {
    var xPathLink = '//div[@class="box"]/div[@class="box-header"]/h4';
    var checkFeaturedProjectsRowTitleWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkFeaturedProjectsRowTitleWhenSignedOut.getText('h4').then( function (text) {
        //expected value of the title text
        var expectedText = 'Featured Projects';
        t.equal(text, expectedText);
        t.end();
    });
});

//checks that the link for a project makes sense
tap.test('checkFeaturedProjectsRowLinkWhenSignedOut', function (t) {
    var xPathLink = '//div[contains(@class, "thumbnail") ' +
        'and contains(@class, "project") and contains(@class, "slick-slide") ' +
        'and contains(@class, "slick-active") ' +
        'and contains(@class, "slick-center")]/a[@class="thumbnail-image"]';
    var checkFeaturedProjectsRowLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkFeaturedProjectsRowLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected pattern for the project URL
        //since I don't know the length of the project ID number,
        //I can't use url.substr(-expectedHref.length), expectedHref);
        var expectedUrlRegExp = new RegExp('/projects/.*[0-9].*/?');
        t.match(url, expectedUrlRegExp);
        t.end();
    });
});

//checks that the title of the 2nd row is Featured Studios
tap.test('checkFeaturedStudiosRowWhenSignedOut', function (t) {
    var xPathLink = '//div[@class="box"][2]/div[@class="box-header"]/h4';
    var checkFeaturedStudiosRowWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkFeaturedStudiosRowWhenSignedOut.getText('h4').then( function (text) {
        //expected value of the title text
        var expectedText = 'Featured Studios';
        t.equal(text, expectedText);
        t.end();
    });
});

//checks that the link for a studio makes sense
tap.test('checkFeaturedStudiosRowLinkWhenSignedOut', function (t) {
    var xPathLink = '//div[contains(@class, "thumbnail") and contains(@class, "gallery") ' +
        'and contains(@class, "slick-slide") and contains(@class, "slick-active")]/a[@class="thumbnail-image"]';
    var checkFeaturedStudiosRowLinkWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkFeaturedStudiosRowLinkWhenSignedOut.getAttribute('href').then( function (url) {
        //expected pattern for the project URL
        //since I don't know the length of the project ID number,
        // I can't use url.substr(-expectedHref.length), expectedHref);
        var expectedUrlRegExp = new RegExp('/studios/.*[0-9].*/?');
        t.match(url, expectedUrlRegExp);
        t.end();
    });
});

// We are not checking for any other homepage rows
// besides Featured Projects & Featured Studios, so we don't need these for now
// but we might want them if we have a fixture db
// or some other source of "user activity"
/*
//checks that the title of the 3rd row starts with Projects Curated by
tap.test('checkProjectsCuratedByRowWhenSignedOut', function (t) {
    var xPathLink = '//div[@class="box"][3]/div[@class="box-header"]/h4';
    var checkProjectsCuratedByRowWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkProjectsCuratedByRowWhenSignedOut.getText('h4').then( function (text) {
        //expected value of the title text
        var expectedTextRegExp = new RegExp('^Projects Curated by ');
        t.match(text, expectedTextRegExp);
        t.end();
    });
});

//checks that the title of the 4th row is What the Community is Remixing
tap.test('checkWhatTheCommunityIsRemixingRowWhenSignedOut', function (t) {
    var xPathLink = '//div[@class="box"][4]/div[@class="box-header"]/h4';
    var checkWhatTheCommunityIsRemixingRowWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkWhatTheCommunityIsRemixingRowWhenSignedOut.getText('h4').then( function (text) {
        //expected value of the title text
        var expectedText = 'What the Community is Remixing';
        t.equal(text, expectedText);
        t.end();
    });
});

//checks that the title of the 5th row is Scratch Design Studio
tap.test('checkScratchDesignStudioRowWhenSignedOut', function (t) {
    var xPathLink = '//div[@class="box"][5]/div[@class="box-header"]/h4';
    var checkScratchDesignStudioRowWhenSignedOut = driver.findElement(seleniumWebdriver.By.xpath(xPathLink));
    checkScratchDesignStudioRowWhenSignedOut.getText('h4').then( function (text) {
        //expected value of the title text
        console.log(text);
        var expectedTextRegExp = new RegExp('^Scratch Design Studio - ');
        t.match(text, expectedTextRegExp);
        t.end();
    });
});
*/

//quit the instance of the driver
driver.quit();
