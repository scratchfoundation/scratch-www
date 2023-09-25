// These tests do not sign in with a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickXpath,
    findByXpath,
    getKey,
    navigate
} = new SeleniumHelper();

let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

jest.setTimeout(60000);

let driver;

describe('www-integration search', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration search');
    });

    beforeEach(async () => {
        await navigate(rootUrl);
    });

    afterAll(async () => await driver.quit());

    test('search converts spaces', async () => {
        let searchBar = await findByXpath('//div[contains(@class, "search-wrapper")]/div/input');
        await searchBar.sendKeys('Test search string' + getKey('ENTER'));

        // check url
        let url = await driver.getCurrentUrl();
        await expect(url).toMatch(/^.*\?q=Test%20search%20string$/);
    });

    test('Search escapes symbols', async () => {
        let searchBar = await findByXpath('//div[contains(@class, "search-wrapper")]/div/input');
        await searchBar.sendKeys('100% pen' + getKey('ENTER'));

        // check url
        let url = await driver.getCurrentUrl();
        await expect(url).toMatch(/^.*\?q=100%25%20pen$/);
    });

    test('Switching to studios maintains search string', async () => {
        let searchBar = await findByXpath('//div[contains(@class, "search-wrapper")]/div/input');
        await searchBar.sendKeys('100% pen' + getKey('ENTER'));

        // switch to studios tab
        clickXpath('//a/li/span[contains(text(),"Studios")]');

        // check url
        let url = await driver.getCurrentUrl();
        await expect(url).toMatch(/^.*\?q=100%25%20pen$/);
    });
});
