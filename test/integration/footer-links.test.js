// these tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickText,
    buildDriver,
    findText
} = new SeleniumHelper();

let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

jest.setTimeout(60000);

let driver;

describe('www-integration footer links', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration footer links');
    });

    beforeEach(async () => {
        await driver.get(rootUrl);
        await findText('Create stories, games, and animations');
    });

    afterAll(async () => await driver.quit());

    // ==== About Scratch column ====

    const pageLoadComplete = () =>
        driver.wait(async () => {
            return await driver.executeScript('return document.readyState;') === 'complete';
        });

    test('click About Scratch link', async () => {
        await clickText('About Scratch');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/about\/?$/);
    });

    test('click For Parents link', async () => {
        await clickText('For Parents');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/parents\/?$/);
    });

    test('click For Educators link', async () => {
        await clickText('For Educators');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/educators\/?$/);
    });

    test('click For Developers link', async () => {
        await clickText('For Developers');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/developers\/?$/);
    });

    // ==== COMMUNITY column ====

    test('click Community Guidelines link', async () => {
        await clickText('Community Guidelines');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/community_guidelines\/?$/);
    });

    test('click Discussion Forums link', async () => {
        await clickText('Discussion Forums');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/discuss\/?$/);
    });

    test('click Statistics link', async () => {
        await clickText('Statistics');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/statistics\/?$/);
    });

    // ==== SUPPORT column ====

    test('click Ideas link', async () => {
        await clickText('Ideas');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/ideas\/?$/);
    });

    test('click FAQ link', async () => {
        await clickText('FAQ');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/faq\/?$/);
    });

    test('click Download link', async () => {
        await clickText('Download');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/download\/?$/);
    });

    test('click Contact Us link', async () => {
        await clickText('Contact Us');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/contact-us\/?$/);
    });

    // ==== LEGAL column ====

    test('click Terms of Use link', async () => {
        await clickText('Terms of Use');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/terms_of_use\/?$/);
    });

    test('click Privacy Policy link', async () => {
        await clickText('Privacy Policy');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/privacy_policy\/?$/);
    });

    test('click Cookies link', async () => {
        await clickText('Cookies');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/cookies\/?$/);

        // Verify localization of last updated message
        let lastUpdated = await findText('The Scratch Cookie Policy was last updated ');
        let lastUpdatedVisible = await lastUpdated.isDisplayed();
        expect(lastUpdatedVisible).toBe(true);
    });

    test('click DMCA link', async () => {
        await clickText('DMCA');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/DMCA\/?$/);
    });

    // ==== SCRATCH FAMILY column ====

    test('click Scratch Conference link', async () => {
        await clickText('Scratch Conference');
        await pageLoadComplete();
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/scratch-conference\/?$/);
    });

});

// The following links in are skipped because they are not on scratch.mit.edu

// Jobs
// Press
// SCRATCH STORE
// DONATE
// SCRATCH WIKI
// SCRATCH ED (SCRATCHED)
// SCRATCH JR (SCRATCHJR)
// SCRATCH DAY
// SCRATCH FOUNDATION
