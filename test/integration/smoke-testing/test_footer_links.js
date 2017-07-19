/*
 * Checks that the links in the footer on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */
 
require('chromedriver');
var tap = require('tap');
var seleniumWebdriver = require('selenium-webdriver');

// Selenium's promise driver will be deprecated, so we should not rely on it
seleniumWebdriver.SELENIUM_PROMISE_MANAGER=0;

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

//timeout for each test; timeout for suite set at command line level
var options = { timeout: 20000 };

//number of tests in the plan
tap.plan(25);

tap.tearDown(function () {
    //quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    //load the page with the driver
    return driver.get(rootUrl);
});

// Function clicks the link and returns the url of the resulting page
function clickFooterLinks ( linkText ) {
    // Not sure if I need this first wait - maybe it solved intermittent initial failure problem?
    return driver.wait(seleniumWebdriver.until.elementLocated(seleniumWebdriver.By.id('view')))
        .then( function () {
            return driver.wait(seleniumWebdriver.until.elementLocated(seleniumWebdriver.By
                    .id('footer')))
                .then( function () {
                    return driver.findElement(seleniumWebdriver.By.linkText(linkText)); })
                .then( function (element) {
                    return element.click(); })
                .then(function () {
                    return driver.getCurrentUrl();
                });
        });
}

// ==== ABOUT SCRATCH column ====

// ABOUT SCRATCH
tap.test('clickAboutScratchLink', options, function (t) {
    var linkText = 'About Scratch';
    var expectedHref = '/about';
    clickFooterLinks(linkText).then( function (url) {
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR PARENTS
tap.test('clickForParentsLink', options, function (t) {
    var linkText = 'For Parents';
    var expectedHref = '/parents/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR EDUCATORS
tap.test('clickForEducatorsLink', options, function (t) {
    var linkText = 'For Educators';
    var expectedHref = '/educators';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR DEVELOPERS
tap.test('clickForDevelopersScratchLink', options, function (t) {
    var linkText = 'For Developers';
    var expectedHref = '/developers';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CREDITS
tap.test('clickCreditsLink', options, function (t) {
    var linkText = 'Credits';
    var expectedHref = '/info/credits';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// JOBS
tap.test('clickJobsLink', options, function (t) {
    var linkText = 'Jobs';
    var expectedHref = '/jobs';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// PRESS
tap.test('clickPressLink', options, function (t) {
    var linkText = 'Press';
    var expectedUrl = 'https://wiki.scratch.mit.edu/wiki/Scratch_Press';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// ==== COMMUNITY column ====

// COMMUNITY GUIDELINES
tap.test('clickCommunityGuidelinesLink', options, function (t) {
    var linkText = 'Community Guidelines';
    var expectedHref = '/community_guidelines';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DISCUSSION FORUMS
tap.test('clickDiscussionForumsLink', options, function (t) {
    var linkText = 'Discussion Forums';
    var expectedHref = '/discuss/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH WIKI
tap.test('clickScratchWikiLink', options, function (t) {
    var linkText = 'Scratch Wiki';
    var expectedUrl = 'https://wiki.scratch.mit.edu/wiki/Scratch_Wiki_Home';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// STATISTICS
tap.test('clickStatisticsLink', options, function (t) {
    var linkText = 'Statistics';
    var expectedHref = '/statistics/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SUPPORT column ====

// TIPS PAGE
tap.test('clickTipsPageLink', options, function (t) {
    var linkText = 'Tips';
    var expectedHref = '/tips';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FAQ
tap.test('clickFAQLink', options, function (t) {
    var linkText = 'FAQ';
    var expectedHref = '/info/faq';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// OFFLINE EDITOR
tap.test('clickOfflineEditorLink', options, function (t) {
    var linkText = 'Offline Editor';
    var expectedHref = '/download';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CONTACT US
tap.test('clickContactUsLink', options, function (t) {
    var linkText = 'Contact Us';
    var expectedHref = '/contact-us/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH STORE
tap.test('clickScratchStoreLink', options, function (t) {
    var linkText = 'Scratch Store';
    var expectedUrl = 'https://scratch-foundation.myshopify.com/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// DONATE
tap.test('clickDonateLink', options, function (t) {
    var linkText = 'Donate';
    var expectedUrl = 'https://secure.donationpay.org/scratchfoundation/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// ==== LEGAL column ====

// TERMS OF USE
tap.test('clickTermsOfUseLink', options, function (t) {
    var linkText = 'Terms of Use';
    var expectedHref = '/terms_of_use';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// PRIVACY POLICY
tap.test('clickPrivacyPolicyLink', options, function (t) {
    var linkText = 'Privacy Policy';
    var expectedHref = '/privacy_policy';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DMCA
tap.test('clickDMCALink', options, function (t) {
    var linkText = 'DMCA';
    var expectedHref = '/DMCA';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SCRATCH FAMILY column ====

// SCRATCH ED (SCRATCHED)
tap.test('clickScratchEdLink', options, function (t) {
    var linkText = 'ScratchEd';
    var expectedUrl = 'http://scratched.gse.harvard.edu/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// SCRATCH JR (SCRATCHJR)
tap.test('clickScratchJrLink', options, function (t) {
    var linkText = 'ScratchJr';
    var expectedUrl = 'http://www.scratchjr.org/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// SCRATCH DAY
tap.test('clickScratchDayLink', options, function (t) {
    var linkText = 'Scratch Day';
    var expectedUrl = 'https://day.scratch.mit.edu/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// SCRATCH CONFERENCE
tap.test('clickScratchConferenceLink', options, function (t) {
    var linkText = 'Scratch Conference';
    var expectedHref = '/conference';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH FOUNDATION
tap.test('clickScratchFoundationLink', options, function (t) {
    var linkText = 'Scratch Foundation';
    var expectedUrl = 'https://www.scratchfoundation.org/';
    clickFooterLinks(linkText).then( function (url) {
        t.equal(url, expectedUrl);
        t.end();
    });
});
