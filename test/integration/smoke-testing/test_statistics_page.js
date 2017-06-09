var tap = require('tap');
const test = tap.test;
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const findByXpath = (xpath) => {
    return driver.wait(until.elementLocated(By.xpath(xpath), 1000 * 5));
};

const findByCss = (css) => {
    return driver.wait(until.elementLocated(By.css(css), 1000 * 5));
};

const clickXpath = (xpath) => {
    return findByXpath(xpath).then(el => el.click());
};

const clickText = (text) => {
    return clickXpath(`//*[contains(text(), '${text}')]`);
};

tap.plan(2);

tap.tearDown(function () {
    //quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    //load the page with the driver
    return driver.get('https://scratch.mit.edu/statistics');
});

test('check that Monthly Activity Trends title is present & correct', t => {
    var chartTitle = 'Monthly Activity Trends';
    findByCss('div.box-head h3')
    .then( function (element) {
        return element.getText('h3');
    })
    .then( function (text) {
        t.equal(text, chartTitle);
    })
    .then(() => t.end());
});

test('check that Monthly Activity Trends chart > New Projects label is toggleable', t => {
    findByXpath(`//div[@id="activity_chart"]/*[contains(@class, nv-series)]`)
    .then( function (element) {
        t.ok(element);
    })
    .then(() => clickText('New Projects'))
    .then(() => findByXpath(`//div[@id="activity_chart"]/*[contains(@class, nv-series)`
        + `and contains(@class, nv-disabled)]`))
    .then( function (element) {
        t.ok(element);
    })
    .then(() => clickText('New Projects'))
    .then(() => findByXpath(`//div[@id="activity_chart"]/*[contains(@class, nv-series)]`))
    .then( function (element) {
        t.ok(element);
    })
    .then(() => t.end());
});

