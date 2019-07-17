/*
 * Tests stats page according to smoke-tests at:
 *
 * https://github.com/LLK/scratchr2/wiki/Smoke-Testing-Test-Cases
 *
 */

const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

var tap = require('tap');
const test = tap.test;

const driver = helper.buildDriver('www-smoke test_statistics_page');

const {
    clickText,
    findByXpath,
    findByCss
} = helper;

tap.plan(2);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    /*
     * load the page with the driver
     * note that for now this is not testable on Staging,
     * so I left it pointing to Production -
     * we can at least use it post-deploy.
     *
     * var stagingURL = 'https://scratch.ly/statistics';
     */
    var productionURL = 'https://scratch.mit.edu/statistics';
    return driver.get(productionURL);
});

test('check that Monthly Activity Trends title is present & correct', t => {
    var chartTitle = 'Monthly Activity Trends';
    findByCss('div.box-head h3')
        .then((element) => element.getText('h3'))
        .then((text) => t.equal(text, chartTitle, 'chart title should be Monthly Activity Trends'))
        .then(() => t.end());
});

test('check that Monthly Activity Trends chart > New Projects label is toggleable', t => {
    var classXpath = `(//div[@id="activity_chart"]/*[name()='svg']/*[name()='g']/*[name()='g']/*` +
        `[name()='g'])[4]/*[name()='g']/*[name()='g']/*[name()='g']`;
    findByXpath(classXpath)
        .then((element) => element.getAttribute('class'))
        .then((classtext) => t.equal(classtext, 'nv-series', 'by default, New Projects should be enabled'))
        .then(() => clickText('New Projects'))
        .then(() => findByXpath(classXpath))
        .then((element) => element.getAttribute('class'))
        .then((classtext) => t.equal(
            classtext,
            'nv-series nv-disabled',
            'when clicked, New Projects should be disabled'
        ))
        .then(() => clickText('New Projects'))
        .then(() => findByXpath(classXpath))
        .then((element) => element.getAttribute('class'))
        .then((classtext) => t.equal(classtext, 'nv-series', 'when clicked again, New Projects should be enabled'))
        .then(() => t.end());
});
