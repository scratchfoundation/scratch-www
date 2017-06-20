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
    .then( function (element) {
        return element.getText('h3');
    })
    .then( function (text) {
        t.equal(text, chartTitle);
    })
    .then(() => t.end());
});

test('check that Monthly Activity Trends chart > New Projects label is toggleable', t => {
    var classXpath = `(//div[@id="activity_chart"]/*[name()='svg']/*[name()='g']/*[name()='g']/*`
        + `[name()='g'])[4]/*[name()='g']/*[name()='g']/*[name()='g']`;
    findByXpath(classXpath)
    .then( function (element) {
        return element.getAttribute('class');
    })
    .then( function (classtext) {
        t.equal(classtext, 'nv-series');
    })
    .then(() => clickText('New Projects'))
    .then(() => findByXpath(classXpath))
    .then( function (element) {
        return element.getAttribute('class');
    })
    .then( function (classtext) {
        t.equal(classtext, 'nv-series nv-disabled');
    })
    .then(() => clickText('New Projects'))
    .then(() => findByXpath(classXpath))
    .then( function (element) {
        return element.getAttribute('class');
    })
    .then( function (classtext) {
        t.equal(classtext, 'nv-series');
    })
    .then(() => t.end());
});

