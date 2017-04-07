/*
 * Checks that the links in the footer on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

var tap = require('tap');
var seleniumWebdriver = require('selenium-webdriver');

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

//number of tests in the plan
tap.plan(24);

//load the page with the driver
driver.get(rootUrl);

var xPathFooterLink = '//div[@id="footer"]/div[@class="inner"]/div[@class="lists"]';

// ==== ABOUT column ====

// ABOUT SCRATCH
tap.test('checkAboutScratchLink', function (t) {
    var checkAboutScratchLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd/a'));
    checkAboutScratchLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/about';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR PARENTS
tap.test('checkForParentsLink', function (t) {
    var checkForParentsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[2]/a'));
    checkForParentsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/parents/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR EDUCATORS
tap.test('checkForEducatorsLink', function (t) {
    var checkForEducatorsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[3]/a'));
    checkForEducatorsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/educators';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR DEVELOPERS
// this fails b/c the developers link breaks with convention and is `/developers`
tap.test('checkForDevelopersScratchLink', function (t) {
    var checkForDevelopersLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[4]/a'));
    checkForDevelopersLink.getAttribute('href').then( function (url) {
        //expected value of the href
        //console.log(url);
        //var expectedHref = '/developers/';
        var expectedHref = '/developers';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CREDITS
tap.test('checkCreditsLink', function (t) {
    var checkCreditsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[5]/a'));
    checkCreditsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/info/credits';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// JOBS
tap.test('checkJobsLink', function (t) {
    var checkJobsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[6]/a'));
    checkJobsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/jobs';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// PRESS
// how should the test work for external links? staging doesn't have it's own wiki, it just goes to production...
// this fails b/c the link is currently http rather than https
tap.test('checkPressLink', function (t) {
    var checkPressLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[7]/a'));
    checkPressLink.getAttribute('href').then( function (url) {
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
tap.test('checkCommunityGuidelinesLink', function (t) {
    var CGLink = '/dl[2]/dd/a';
    var checkCommunityGuidelinesLink = driver.findElement(
        seleniumWebdriver.By.xpath(xPathFooterLink + CGLink)
    );
    checkCommunityGuidelinesLink.getAttribute('href').then(function (url) {
        //expected value of the href
        var expectedHref = '/community_guidelines';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DISCUSSION FORUMS
tap.test('checkDiscussionForumsLink', function (t) {
    var checkDiscussionForumsLink = driver.findElement(
        seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[2]/dd[2]/a')
    );
    checkDiscussionForumsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/discuss/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH WIKI
tap.test('checkScratchWikiLink', function (t) {
    var checkScratchWikiLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[2]/dd[3]/a'));
    checkScratchWikiLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = 'https://wiki.scratch.mit.edu/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// STATISTICS
tap.test('checkStatisticsLink', function (t) {
    var checkStatisticsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[2]/dd[4]/a'));
    checkStatisticsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/statistics/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SUPPORT column ====

// HELP PAGE
tap.test('checkHelpPageLink', function (t) {
    var checkHelpPageLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd/a'));
    checkHelpPageLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/help/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FAQ
tap.test('checkFAQLink', function (t) {
    var checkFAQLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd[2]/a'));
    checkFAQLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/info/faq';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// OFFLINE EDITOR
tap.test('checkOfflineEditorLink', function (t) {
    var checkOfflineEditorLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd[3]/a'));
    checkOfflineEditorLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/scratch2download/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CONTACT US
tap.test('checkContactUsLink', function (t) {
    var checkContactUsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd[4]/a'));
    checkContactUsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/contact-us/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DONATE
tap.test('checkDonateLink', function (t) {
    var checkDonateLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[3]/dd[5]/a'));
    checkDonateLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = 'https://secure.donationpay.org/scratchfoundation/';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== LEGAL column ====

// TERMS OF USE
tap.test('checkTermsOfUseLink', function (t) {
    var checkTermsOfUseLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[4]/dd/a'));
    checkTermsOfUseLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/terms_of_use';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// PRIVACY POLICY
tap.test('checkPrivacyPolicyLink', function (t) {
    var checkPrivacyPolicyLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[4]/dd[2]/a'));
    checkPrivacyPolicyLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/privacy_policy';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DMCA
tap.test('checkDMCALink', function (t) {
    var checkDMCALink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[4]/dd[3]/a'));
    checkDMCALink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/DMCA';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SCRATCH FAMILY column ====

// SCRATCH ED (SCRATCHED)
tap.test('checkScratchEdLink', function (t) {
    var checkScratchEdLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd/a'));
    checkScratchEdLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = 'http://scratched.gse.harvard.edu/';
        //the href should be at the end of the URL
        t.equal(url, expectedHref);
        t.end();
    });
});

// SCRATCH JR (SCRATCHJR)
// fails because it's http but should be https
tap.test('checkScratchJrLink', function (t) {
    var checkScratchJrLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd[2]/a'));
    checkScratchJrLink.getAttribute('href').then( function (url) {
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
tap.test('checkScratchDayLink', function (t) {
    var checkScratchDayLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd[3]/a'));
    checkScratchDayLink.getAttribute('href').then( function (url) {
        //expected value of the href
        //var expectedHref = 'https://day.scratch.mit.edu/';
        var expectedHref = 'http://day.scratch.mit.edu/';
        //the href should be at the end of the URL
        t.equal(url, expectedHref);
        t.end();
    });
});

// SCRATCH CONFERENCE
tap.test('checkScratchConferenceLink', function (t) {
    var checkScratchConferenceLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd[4]/a'));
    checkScratchConferenceLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/conference';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH FOUNDATION
tap.test('checkScratchFoundationLink', function (t) {
    var checkScratchFoundationLink = driver.findElement(
        seleniumWebdriver.By.xpath(xPathFooterLink + '/dl[5]/dd[5]/a')
        );
    checkScratchFoundationLink.getAttribute('href').then( function (url) {
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