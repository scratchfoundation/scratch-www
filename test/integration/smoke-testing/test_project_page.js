const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

var tap = require('tap');
const test = tap.test;

const driver = helper.buildDriver('www-smoke test_sign_in_out_homepage');

const {
    clickText,
    clickXpath,
    dragFromXpathToXpath
} = helper;

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
const projectId = 1;
const projectUrl = `${rootUrl}/projects/${projectId}`;

tap.plan(3);

tap.tearDown(function () {
    driver.quit();
});

tap.beforeEach(function () {
    return driver.get(projectUrl);
});

test('Find fullscreen button', t => {
    clickXpath('//div[starts-with(@class, "loader_background")]')
        .then(() => clickXpath('//div[starts-with(@class, "stage_green-flag-overlay")]'))
        .then(() => clickXpath('//img[contains(@alt, "Enter full screen mode")]'))
        .then(() => t.end());
});

test('Open and close Copy Link modal', t => {
    clickText('Copy Link')
        .then(() => clickXpath('//div[contains(@class, "social-label-title")]'))
        .then(() => clickXpath('//img[contains(@alt, "close-icon")]'))
        .then(() => clickXpath('//img[contains(@alt, "Enter full screen mode")]'))
        .then(() => t.end());
});

test('Dragging out of modal should not close modal', t => {
    clickXpath('//div[starts-with(@class, "loader_background")]')
        .then(() => clickXpath('//div[starts-with(@class, "stage_green-flag-overlay")]'))
        .then(() => clickText('Copy Link'))
        .then(() => clickXpath('//div[contains(@class, "social-label-title")]'))
        .then(() => dragFromXpathToXpath(
            '//div[contains(@class, "social-label-title")]',
            '//li[contains(@class, "logo")]'
        ))
        .then(() => clickXpath('//div[contains(@class, "social-label-title")]'))
        .then(() => t.end());
});
