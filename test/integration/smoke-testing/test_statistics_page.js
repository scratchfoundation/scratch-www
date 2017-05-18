require('chromedriver');
var tap = require('tap');
var seleniumWebdriver = require('selenium-webdriver');

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

seleniumWebdriver.SELENIUM_PROMISE_MANAGER=0;

//number of tests in the plan
tap.plan(1);

tap.tearDown(function () {
    //quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    //load the page with the driver
    return driver.get(rootUrl + '/statistics');
});

// to verify the Activity Chart's presence, checks the title,
// a label on the X axis, and a label on the Y axis
tap.test('activityChartShouldExist', function (t) {
    var chartTitle = 'Monthly Activity Trends';
    var chartLegendLabel = 'New Projects';
    var chartXLabel = '01/2008';
    driver.wait(seleniumWebdriver.until.elementLocated(seleniumWebdriver.By
        .css('div.box-head h3')))
        .then( function (element) {
            return element.getText('h3');})
        .then( function (text) {
            t.equal(text, chartTitle);})
        .then( function () {
            driver.findElement(seleniumWebdriver.By.css('g.nv-series'))
                .then( function (element) {
                    return element.getText('text');})
                .then( function (text) {
                    t.equal(text, chartLegendLabel);})
                .then( function () {
                    driver.findElement(seleniumWebdriver.By.xpath('//div[@id="activity_chart"]/*[name()="svg"]' +
                    '/*[name()="g"]/*[name()="g"]/*[name()="g"]/*[name()="g"]/*[name()="g"]' +
                    '/*[name()="g"]'))
                        .then( function (element) {
                            return element.getText('text');})
                        .then( function (text) {
                            t.equal(text, chartXLabel);
                            t.end();
                        });
                });
        });
});
