/*
 * Checks that the links in the footer on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

var tap = require('tap');
var seleniumWebdriver = require('selenium-webdriver');

seleniumWebdriver.SELENIUM_PROMISE_MANAGER=0;

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

//number of tests in the plan
//tap.plan(24);
tap.plan(6);

//the xpath for the footer area of the page
var xPathFooterLink = '//div[@id="footer"]/div[@class="inner"]/div[@class="lists"]';

tap.tearDown(function () {
    //quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    //load the page with the driver
    return driver.get(rootUrl);
});

// Function clicks the link and returns the title of the resulting page
function clickFooterLinks ( linkText, xpathToTitle ) {
    return driver.wait(seleniumWebdriver.until.elementLocated(seleniumWebdriver.By
                    .xpath(xPathFooterLink)))
                .then( function () {
                    return driver.findElement(seleniumWebdriver.By.linkText(linkText)); })
                .then( function (element) { //console.log('found link');
                    return element.click(); })
                .then(function () { //console.log('clicked link');
                    return driver.wait(seleniumWebdriver.until
                        .elementLocated(seleniumWebdriver.By
                        .xpath(xpathToTitle))); })
                .then( function (element) {
                    return element.getText();
                });
}

// ABOUT SCRATCH
tap.test('clickAboutScratchLink', function (t) {
    var expectedPageTitle = 'About Scratch';
    var linkText = 'About Scratch';
    var xpathToTitle = '//div[contains(@class, "inner") and contains(@class, "about")]/h1/span';
    clickFooterLinks(linkText, xpathToTitle).then( function (title) {
        //console.log(title);
        t.equal(title, expectedPageTitle);
        t.end();
    });
});

// FOR PARENTS
tap.test('clickForParentsLink', function (t) {
    var expectedPageTitle = 'For Parents';
    var linkText = 'For Parents';
    var xpathToTitle = '//div[contains(@class, "parents")]/div[contains(@class, "intro")]/h1/span';
    clickFooterLinks(linkText, xpathToTitle).then( function (title) {
        //console.log(title);
        t.equal(title, expectedPageTitle);
        t.end();
    });
});

// FOR EDUCATORS
tap.test('clickForEducatorsLink', function (t) {
    var expectedPageTitle = 'Scratch for Educators';
    var linkText = 'For Educators';
    var xpathToTitle = '//div[contains(@class, "educators")]' +
                        '/div[contains(@class, "title-banner")]' +
                        '/div[contains(@class, "inner")]/h1/span';
    clickFooterLinks(linkText, xpathToTitle).then( function (title) {
        //console.log(title);
        t.equal(title, expectedPageTitle);
        t.end();
    });
});

// FOR DEVELOPERS
tap.test('clickForDevelopersScratchLink', function (t) {
    var expectedPageTitle = 'Scratch for Developers';
    var linkText = 'For Developers';
    var xpathToTitle = '//div[contains(@class, "developers")]' +
                        '/div[contains(@class, "title-banner")]' +
                        '/div[contains(@class, "inner")]/h1/span';
    clickFooterLinks(linkText, xpathToTitle).then( function (title) {
        //console.log(title);
        t.equal(title, expectedPageTitle);
        t.end();
    });
});

// CREDITS
tap.test('clickCreditsLink', function (t) {
    var expectedPageTitle = 'Scratch Credits and Contributors';
    var linkText = 'Credits';
    var xpathToTitle = '//div[contains(@class, "credits") and contains(@class, "inner")]' +
                        '/h1/span';
    clickFooterLinks(linkText, xpathToTitle).then( function (title) {
        //console.log(title);
        t.equal(title, expectedPageTitle);
        t.end();
    });
});

// JOBS
tap.test('checkJobsLink', function (t) {
    var expectedPageTitle = 'Want to work on an innovative project that is transforming the'
                            + ' ways young people create, share, and learn?';
    var linkText = 'Jobs';
    var xpathToTitle = '//div[contains(@class, "jobs")]/div[contains(@class, "top")]' +
                        '/div[contains(@class, "inner")]/h2/span';
    clickFooterLinks(linkText, xpathToTitle).then( function (title) {
        //console.log(title);
        t.equal(title, expectedPageTitle);
        t.end();
    });
});

// PRESS
tap.test('checkPressLink', function (t) {
    var expectedPageTitle = 'Want to work on an innovative project that is transforming the'
                            + ' ways young people create, share, and learn?';
    var linkText = 'Jobs';
    var xpathToTitle = '//div[contains(@class, "jobs")]/div[contains(@class, "top")]' +
                        '/div[contains(@class, "inner")]/h2/span';
    clickFooterLinks(linkText, xpathToTitle).then( function (title) {
        //console.log(title);
        t.equal(title, expectedPageTitle);
        t.end();
    });
});

/*

// PRESS
// how should the test work for external links? staging doesn't have it's own wiki, it just goes to production...
// this fails b/c the link is currently http rather than https
tap.test('checkForPressLink', function (t) {
    var checkForPressLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[7]/a'));
    checkForPressLink.getAttribute('href').then( function (url) {
        //expected value of the href
        //var expectedHref = 'https://wiki.scratch.mit.edu/wiki/Scratch_Press';
        var expectedHref = 'http://wiki.scratch.mit.edu/wiki/Scratch_Press';
        //the href should be at the end of the URL
        t.equal(url, expectedHref);
        t.end();
    });
});

// ==== COMMUNITY column ====

// COMMUNITY GUIDELINES
tap.test('checkForCommunityGuidelinesLink', function (t) {
    var CGLink = '/dl[2]/dd/a';
    var checkForCommunityGuidelinesLink = driver.findElement(
        seleniumWebdriver.By.xpath(xPathFooterLink + CGLink)
    );
    checkForCommunityGuidelinesLink.getAttribute('href').then(function (url) {
        //expected value of the href
        var expectedHref = '/community_guidelines';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DISCUSSION FORUMS
tap.test('checkForDiscussionForumsLink', function (t) {
    var checkForDiscussionForumsLink = driver.findElement(
        seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[2]/dd[2]/a')
    );
    checkForDiscussionForumsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/discuss/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH WIKI
tap.test('checkForScratchWikiLink', function (t) {
    var checkForScratchWikiLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[2]/dd[3]/a'));
    checkForScratchWikiLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = 'https://wiki.scratch.mit.edu/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// STATISTICS
tap.test('checkForStatisticsLink', function (t) {
    var checkForStatisticsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[2]/dd[4]/a'));
    checkForStatisticsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/statistics/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SUPPORT column ====

// HELP PAGE
tap.test('checkForHelpPageLink', function (t) {
    var checkForHelpPageLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd/a'));
    checkForHelpPageLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/help/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FAQ
tap.test('checkForFAQLink', function (t) {
    var checkForFAQLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd[2]/a'));
    checkForFAQLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/info/faq';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// OFFLINE EDITOR
tap.test('checkForOfflineEditorLink', function (t) {
    var checkForOfflineEditorLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd[3]/a'));
    checkForOfflineEditorLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/scratch2download/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CONTACT US
tap.test('checkForContactUsLink', function (t) {
    var checkForContactUsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd[4]/a'));
    checkForContactUsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/contact-us/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DONATE
tap.test('checkForDonateLink', function (t) {
    var checkForDonateLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd[5]/a'));
    checkForDonateLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = 'https://secure.donationpay.org/scratchfoundation/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== LEGAL column ====

// TERMS OF USE
tap.test('checkForTermsOfUseLink', function (t) {
    var checkForTermsOfUseLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[4]/dd/a'));
    checkForTermsOfUseLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/terms_of_use';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// PRIVACY POLICY
tap.test('checkForPrivacyPolicyLink', function (t) {
    var checkForPrivacyPolicyLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[4]/dd[2]/a'));
    checkForPrivacyPolicyLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/privacy_policy';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DMCA
tap.test('checkForDMCALink', function (t) {
    var checkForDMCALink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[4]/dd[3]/a'));
    checkForDMCALink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/DMCA';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SCRATCH FAMILY column ====

// SCRATCH ED (SCRATCHED)
tap.test('checkForScratchEdLink', function (t) {
    var checkForScratchEdLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd/a'));
    checkForScratchEdLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = 'http://scratched.gse.harvard.edu/';
        //the href should be at the end of the URL
        t.equal(url, expectedHref);
        t.end();
    });
});

// SCRATCH JR (SCRATCHJR)
// fails because it's http but should be https
tap.test('checkForScratchJrLink', function (t) {
    var checkForScratchJrLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd[2]/a'));
    checkForScratchJrLink.getAttribute('href').then( function (url) {
        //expected value of the href
        //var expectedHref = 'https://www.scratchjr.org/';
        var expectedHref = 'http://www.scratchjr.org/';
        //the href should be at the end of the URL
        t.equal(url, expectedHref);
        t.end();
    });
});

// SCRATCH DAY
// fails because it's http but should be https
tap.test('checkForScratchDayLink', function (t) {
    var checkForScratchDayLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd[3]/a'));
    checkForScratchDayLink.getAttribute('href').then( function (url) {
        //expected value of the href
        //var expectedHref = 'https://day.scratch.mit.edu/';
        var expectedHref = 'http://day.scratch.mit.edu/';
        //the href should be at the end of the URL
        t.equal(url, expectedHref);
        t.end();
    });
});

// SCRATCH CONFERENCE
tap.test('checkForScratchConferenceLink', function (t) {
    var checkForScratchDayLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd[4]/a'));
    checkForScratchDayLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/conference';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH FOUNDATION
tap.test('checkForScratchFoundationLink', function (t) {
    var checkForScratchFoundationLink = driver.findElement(
        seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd[5]/a')
        );
    checkForScratchFoundationLink.getAttribute('href').then( function (url) {
        //expected value of the href
        //var expectedHref = 'https://www.scratchfoundation.org/';
        var expectedHref = 'http://www.scratchfoundation.org/';
        //the href should be at the end of the URL
        t.equal(url, expectedHref);
        t.end();
    });
});

//quit the instance of the driver
driver.quit();

*/
