const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickText,
    buildDriver
} = new SeleniumHelper();

let remote = process.env.SMOKE_REMOTE || false;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

if (remote) {
    jest.setTimeout(60000);
} else {
    jest.setTimeout(10000);
}

let driver;

describe('www-integration footer links', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration footer links');
    });

    beforeEach(async () => {
        await driver.get(rootUrl);
    });

    afterAll(async () => await driver.quit());

    // ==== About Scratch column ====

    test('click About Scratch link', async () => {
        await clickText('About Scratch');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/about\/?$/);
    });

    test('click For Parents link', async () => {
        await clickText('For Parents');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/parents\/?$/);
    });

    test('click For Educators link', async () => {
        await clickText('For Educators');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/educators\/?$/);
    });

    test('click For Developers link', async () => {
        await clickText('For Developers');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/developers\/?$/);
    });

    // ==== COMMUNITY column ====

    test('click Community Guidelines link', async () => {
        await clickText('Community Guidelines');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/community_guidelines\/?$/);
    });

    test('click Discussion Forums link', async () => {
        await clickText('Discussion Forums');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/discuss\/?$/);
    });

    test('click Statistics link', async () => {
        await clickText('Statistics');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/statistics\/?$/);
    });

    // ==== SUPPORT column ====

    test('click Ideas link', async () => {
        await clickText('Ideas');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/ideas\/?$/);
    });

    test('click FAQ link', async () => {
        await clickText('FAQ');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/info\/faq\/?$/);
    });

    test('click Download link', async () => {
        await clickText('Download');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/download\/?$/);
    });

    test('click Contact Us link', async () => {
        await clickText('Contact Us');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/contact-us\/?$/);
    });

    // ==== LEGAL column ====

    test('click Terms of Use link', async () => {
        await clickText('Terms of Use');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/terms_of_use\/?$/);
    });

    test('click Privacy Policy link', async () => {
        await clickText('Privacy Policy');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/privacy_policy\/?$/);
    });

    test('click DMCA link', async () => {
        await clickText('DMCA');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/DMCA\/?$/);
    });

    // ==== SCRATCH FAMILY column ====

    test('click Scratch Conference link', async () => {
        await clickText('Scratch Conference');
        let url = await driver.getCurrentUrl();
        let pathname = (new URL(url)).pathname;
        expect(pathname).toMatch(/^\/conference\/2020\/?$/);
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
