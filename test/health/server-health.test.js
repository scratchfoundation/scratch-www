/* eslint-disable no-console */

// this basic server health check is meant to be run before integration tests
// it should be run with the same environment variables as the integration tests
// and operate in the same way as the integration tests

const SeleniumHelper = require('../integration/selenium-helpers.js');

const rootUrl = process.env.ROOT_URL || (() => {
    const ROOT_URL_DEFAULT = 'https://scratch.ly';
    console.warn(`ROOT_URL not set, defaulting to ${ROOT_URL_DEFAULT}`);
    return ROOT_URL_DEFAULT;
})();

jest.setTimeout(60000);

describe('www server health check', () => {
    /** @type {import('selenium-webdriver').ThenableWebDriver} */
    let driver;

    /** @type {SeleniumHelper} */
    let seleniumHelper;

    beforeAll(() => {
        seleniumHelper = new SeleniumHelper();
        driver = seleniumHelper.buildDriver('www server health check');
    });

    afterAll(() => driver.quit());

    test('server is healthy', async () => {
        const healthUrl = new URL('health/', rootUrl);
        await driver.get(healthUrl.toString());

        // Note: driver.getPageSource() will return the pretty HTML form of the JSON
        const pageText = await driver.executeScript('return document.body.innerText');

        let healthObject;
        let serverReturnedValidJson = false;

        try {
            healthObject = JSON.parse(pageText);
            serverReturnedValidJson = true;
        } catch (_e) {
            // ignore
        }

        expect(serverReturnedValidJson).toBe(true);
        expect(healthObject).toHaveProperty('healthy', true);
    });
});
