// these tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickText,
    buildDriver,
    findText,
    navigate,
    waitUntilDocumentReady
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

jest.setTimeout(60000);

let driver;

describe('www-integration footer links', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration footer links');
    });

    beforeEach(async () => {
        await navigate(rootUrl);
        await findText('Create stories, games, and animations');
    });

    afterAll(() => driver.quit());

    // ==== About Scratch column ====

    test('click About Scratch link', async () => {
        await clickText('About Scratch');
        await waitUntilDocumentReady();
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/about\/?$/);
    });

    // ==== COMMUNITY column ====

    test('click Community Guidelines link', async () => {
        await clickText('Community Guidelines');
        await waitUntilDocumentReady();
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/community_guidelines\/?$/);
    });

    test('click Discussion Forums link', async () => {
        await clickText('Discussion Forums');
        await waitUntilDocumentReady();
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/discuss\/?$/);
    });

    // ==== SUPPORT column ====

    test('click Ideas link', async () => {
        await clickText('Ideas');
        await waitUntilDocumentReady();
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/ideas\/?$/);
    });

    test('click Help Center link', async () => {
        await clickText('Help Center');
        await waitUntilDocumentReady();
        const url = await driver.getCurrentUrl();
        const pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/contact-us\/?$/);
    });

    // ==== LEGAL column ====

    test('click MIT Accessibility link', async () => {
        await clickText('MIT Accessibility');
        await waitUntilDocumentReady();
        const url = await driver.getCurrentUrl();
        expect(url).toBe('https://accessibility.mit.edu/');
    });
});

// The following links in the footer are skipped because they are not part of scratch-www

// Jobs
// Press
// SCRATCH STORE
// DONATE
// SCRATCH WIKI
// SCRATCH ED (SCRATCHED)
// SCRATCH JR (SCRATCHJR)
// SCRATCH DAY
// SCRATCH FOUNDATION
// Scratch Conference
