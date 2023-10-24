// these tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickText,
    buildDriver,
    findText
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

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

    afterAll(() => driver.quit());

    // ==== About Scratch column ====

    test('click About Scratch link', async () => {
        await clickText('About Scratch');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/about\/?$/);
    });

    test('click For Parents link', async () => {
        await clickText('For Parents');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/parents\/?$/);
    });

    test('click For Educators link', async () => {
        await clickText('For Educators');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/educators\/?$/);
    });

    test('click For Developers link', async () => {
        await clickText('For Developers');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/developers\/?$/);
    });

    // ==== COMMUNITY column ====

    test('click Community Guidelines link', async () => {
        await clickText('Community Guidelines');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/community_guidelines\/?$/);
    });

    test('click Discussion Forums link', async () => {
        await clickText('Discussion Forums');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/discuss\/?$/);
    });

    test('click Statistics link', async () => {
        await clickText('Statistics');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/statistics\/?$/);
    });

    // ==== SUPPORT column ====

    test('click Ideas link', async () => {
        await clickText('Ideas');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/ideas\/?$/);
    });

    test('click FAQ link', async () => {
        await clickText('FAQ');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/faq\/?$/);
    });

    test('click Download link', async () => {
        await clickText('Download');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/download\/?$/);
    });

    test('click Contact Us link', async () => {
        await clickText('Contact Us');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/contact-us\/?$/);
    });

    // ==== LEGAL column ====

    test('click Terms of Use link', async () => {
        await clickText('Terms of Use');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/terms_of_use\/?$/);
    });

    test('click Privacy Policy link', async () => {
        await clickText('Privacy Policy');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/privacy_policy\/?$/);
    });

    test('click Cookies link', async () => {
        await clickText('Cookies');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/cookies\/?$/);

        // Verify localization of last updated message
        const lastUpdated = await findText('The Scratch Cookie Policy was last updated June 28, 2023');
        const lastUpdatedVisible = await lastUpdated.isDisplayed();
        expect(lastUpdatedVisible).toBe(true);
    });

    test('click DMCA link', async () => {
        await clickText('DMCA');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/DMCA\/?$/);
    });

    // ==== SCRATCH FAMILY column ====

    test('click Scratch Conference link', async () => {
        await clickText('Scratch Conference');
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
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
