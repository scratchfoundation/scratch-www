/*
 * Checks that the links in the footer on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

var tap=require('tap');
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
tap.test('checkForCreditsLink', function (t) {
    var checkForCreditsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[5]/a'));
    checkForCreditsLink.getAttribute('href').then( function (url) {
        //expected value of the href
        var expectedHref = '/info/credits';
        //the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// JOBS
tap.test('checkForJobsLink', function (t) {
    var checkForJobsLink = driver.findElement(seleniumWebdriver.By.xpath(xPathFooterLink + '/dl/dd[6]/a'));
    checkForJobsLink.getAttribute('href').then( function (url) {
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
