// These tests do not sign in with a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickXpath,
    findByXpath,
    getKey,
    navigate
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

jest.setTimeout(60000);

let driver;

describe('www-integration search', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration search');
    });

    beforeEach(async () => {
        await navigate(rootUrl);
    });

    afterAll(() => driver.quit());

    test('search converts spaces', async () => {
        const searchBar = await findByXpath('//div[contains(@class, "search-wrapper")]/div/input');
        await searchBar.sendKeys(`Test search string${getKey('ENTER')}`);

        // check url
        const url = await driver.getCurrentUrl();
        expect(url).toMatch(/^.*\?q=Test%20search%20string$/);
    });

    test('Search escapes symbols', async () => {
        const searchBar = await findByXpath('//div[contains(@class, "search-wrapper")]/div/input');
        await searchBar.sendKeys(`100% pen${getKey('ENTER')}`);

        // check url
        const url = await driver.getCurrentUrl();
        expect(url).toMatch(/^.*\?q=100%25%20pen$/);
    });

    test('Switching to studios maintains search string', async () => {
        const searchBar = await findByXpath('//div[contains(@class, "search-wrapper")]/div/input');
        await searchBar.sendKeys(`100% pen${getKey('ENTER')}`);

        // switch to studios tab
        await clickXpath('//button//*[contains(text(),"Studios")]');

        // check url
        const url = await driver.getCurrentUrl();
        expect(url).toMatch(/^.*\?q=100%25%20pen$/);
    });
});
