// These tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickXpath,
    findByXpath,
    buildDriver
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

jest.setTimeout(60000);

let driver;

describe('www-integration navbar links', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration navbar links');
    });

    beforeEach(async () => {
        await driver.get(rootUrl);
    });

    afterAll(() => driver.quit());

    test('Check text of navbar items', async () => {
        const create = await findByXpath('//li[@class="link create"]');
        const createText = await create.getText();
        expect(createText).toEqual('Create');

        const explore = await findByXpath('//li[@class="link explore"]');
        const exploreText = await explore.getText();
        expect(exploreText).toEqual('Explore');

        const ideas = await findByXpath('//li[@class="link ideas"]');
        const ideasText = await ideas.getText();
        expect(ideasText).toEqual('Ideas');

        const about = await findByXpath('//li[@class="link about"]');
        const aboutText = await about.getText();
        expect(aboutText).toEqual('About');

        const join = await findByXpath('//a[@class="registrationLink"]');
        const joinText = await join.getText();
        expect(joinText).toEqual('Join Scratch');

        const signIn = await findByXpath('//li[@class="link right login-item"]/a');
        const signInText = await signIn.getText();
        expect(signInText).toEqual('Sign in');
    });

    test('create when signed out', async () => {
        await clickXpath('//li[@class="link create"]');
        const gui = await findByXpath('//div[contains(@class, "gui")]');
        const guiVisible = await gui.isDisplayed();
        expect(guiVisible).toBe(true);
    });

    test('Explore link when signed out', async () => {
        await clickXpath('//li[@class="link explore"]');
        const banner = await findByXpath('//h1[@class="title-banner-h1"]');
        const bannerText = await banner.getText();
        expect(bannerText).toEqual('Explore');
    });

    test('Ideas link when signed out', async () => {
        await clickXpath('//li[@class="link ideas"]');
        const banner = await findByXpath('//div[contains(@class, "ideas-banner")]');
        const bannerVisible = await banner.isDisplayed();
        expect(bannerVisible).toBe(true);
    });

    test('About link when signed out', async () => {
        await clickXpath('//li[@class="link about"]');
        const aboutPage = await findByXpath('//div[@class="inner about"]');
        const aboutPageVisible = await aboutPage.isDisplayed();
        expect(aboutPageVisible).toBe(true);
    });

    test('Search Bar', async () => {
        const searchBar = await findByXpath('//div[contains(@class, "search-wrapper")]/div/input');
        await searchBar.sendKeys('cat');
        await driver.sleep(500); // without it sends an empty string on submit
        await searchBar.submit();
        const banner = await findByXpath('//h1[@class="title-banner-h1"]');
        const bannerText = await banner.getText();
        expect(bannerText).toEqual('Search');
    });

    test('Scratch Logo', async () => {
        await clickXpath('//li[@class="link explore"]');
        await findByXpath('//h1[@class="title-banner-h1"]');
        await clickXpath('//li[@class="logo"]');
        const splash = await findByXpath('//div[@class="splash"]');
        const splashVisible = await splash.isDisplayed();
        expect(splashVisible).toBe(true);
    });

    // Sign In is tested in sign-in-and-out tests
    // Create Account is tested in Join tests
});
