const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

var tap = require('tap');
const test = tap.test;

const driver = helper.buildDriver('www-smoke test-login-failures');

const {
    clickText,
    findByXpath
} = helper;

var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

tap.plan(1);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(rootUrl);
});

test('Clicking Join Scratch opens scratchr2 iframe', t => {
    clickText('Join Scratch')
        .then(() => findByXpath('//iframe[contains(@class, "mod-registration")]'))
        .then(() => t.end());
});
