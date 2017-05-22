require('chromedriver');
var tap = require('tap');
var seleniumWebdriver = require('selenium-webdriver');

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

seleniumWebdriver.SELENIUM_PROMISE_MANAGER=0;

//number of tests in the plan
tap.plan(3);

tap.tearDown(function () {
    //quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    //load the page with the driver
    return driver.get(rootUrl + '/statistics');
});

// to verify the Monthly Activity Trends Chart's presence, checks the title,
// a label on the X axis, and a label in the legend
tap.test('activityTrendsChartShouldExist', function (t) {
    var chartTitle = 'Monthly Activity Trends';
    var chartLegendLabel = 'New Projects';
    var chartXLabel = '01/2008';
    driver.wait(seleniumWebdriver.until.elementLocated(seleniumWebdriver.By
        .css('div.box-head h3')))
        .then( function (element) {
            return element.getText('h3');
        })
        .then( function (text) {
            t.equal(text, chartTitle);
        })
        .then( function () {
            driver.findElement(seleniumWebdriver.By.css('g.nv-series'))
                .then( function (element) {
                    return element.getText('text');
                })
                .then( function (text) {
                    t.equal(text, chartLegendLabel);
                })
                .then( function () {
                    driver.findElement(seleniumWebdriver.By.xpath('//div[@id="activity_chart"]/*[name()="svg"]' +
                    '/*[name()="g"]/*[name()="g"]/*[name()="g"]/*[name()="g"]/*[name()="g"]' +
                    '/*[name()="g"]'))
                        .then( function (element) {
                            return element.getText('text');
                        })
                        .then( function (text) {
                            t.equal(text, chartXLabel);
                            t.end();
                        });
                });
        });
});

// to verify the Active Users Chart's presence, checks the title,
// a label on the X axis, and a label in the legend
tap.test('activeUsersChartShouldExist', function (t) {
    var chartTitle = 'Monthly Active Users';
    var chartLegendLabel = 'Project Creators';
    var chartXLabel = '01/2008';
    driver.findElements(seleniumWebdriver.By
        .css('div.box-head h3'))
        .then( function (elements) {
            var element = elements[1];
            return element.getText('h3');
        })
        .then( function (text) {
            t.equal(text, chartTitle);
        })
        .then( function () {
            driver.findElements(seleniumWebdriver.By.css('g.nv-series'))
                .then( function (elements) {
                    // the 3 labels in the first chart's legend are elements 0 - 2 in this list
                    var element = elements[3];
                    return element.getText('text');
                })
                .then( function (text) {
                    t.equal(text, chartLegendLabel);
                })
                .then( function () {
                    driver.findElement(seleniumWebdriver.By.xpath('//div[@id="active_user_chart"]/*[name()="svg"]' +
                    '/*[name()="g"]/*[name()="g"]/*[name()="g"]/*[name()="g"]/*[name()="g"]' +
                    '/*[name()="g"]'))
                        .then( function (element) {
                            return element.getText('text');
                        })
                        .then( function (text) {
                            t.equal(text, chartXLabel);
                            t.end();
                        });
                });
        });
});

// to verify the Comment Activity Chart's presence, checks the title,
// a label on the X axis, and a label in the legend
tap.test('commentActivityChartShouldExist', function (t) {
    var chartTitle = 'Monthly Comment Activity';
    var chartLegendLabel = 'Stacked';
    var chartXLabel = '01/2008';
    driver.findElements(seleniumWebdriver.By
        .css('div.box-head h3'))
        .then( function (elements) {
            var element = elements[5];
            return element.getText('h3');
        })
        .then( function (text) {
            t.equal(text, chartTitle);
        })
        .then( function () {
            driver.findElements(seleniumWebdriver.By.css('g.nv-series'))
                .then( function (elements) {
                    // the labels from previous charts are elements 0 - 6 in this list
                    var element = elements[7];
                    return element.getText('text');
                })
                .then( function (text) {
                    t.equal(text, chartLegendLabel);
                })
                .then( function () {
                    driver.findElement(seleniumWebdriver.By.xpath('//div[@id="comment_chart"]/*[name()="svg"]' +
                    '/*[name()="g"]/*[name()="g"]/*[name()="g"]/*[name()="g"]/*[name()="g"]' +
                    '/*[name()="g"]'))
                        .then( function (element) {
                            return element.getText('text');
                        })
                        .then( function (text) {
                            t.equal(text, chartXLabel);
                            t.end();
                        });
                });
        });
});
