// These tests do not sign in with a user
// Adding tests that sign in with user #6

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickXpath,
    findByXpath,
    signIn,
    waitUntilVisible
} = new SeleniumHelper();

let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

// project IDs and URLs
let unownedSharedId = process.env.UNOWNED_SHARED_PROJECT_ID || 1300006196;
let unownedSharedUrl = rootUrl + '/projects/' + unownedSharedId;

let ownedSharedId = process.env.OWNED_SHARED_PROJECT_ID || 1300009464;
let ownedSharedUrl = rootUrl + '/projects/' + ownedSharedId;

let ownedUnsharedID = process.env.OWNED_UNSHARED_PROJECT_ID || 1300009465;
let ownedUnsharedUrl = rootUrl + '/projects/' + ownedUnsharedID;

let unownedUnsharedID = process.env.UNOWNED_UNSHARED_PROJECT_ID || 1300006306;
let unownedUnsharedUrl = rootUrl + '/projects/' + unownedUnsharedID;

let username = process.env.SMOKE_USERNAME + '6';
let password = process.env.SMOKE_PASSWORD;

jest.setTimeout(60000);

let driver;

describe('www-integration project-page signed out', () => {
    beforeAll(async () => {
        // expect(projectUrl).toBe(defined);
        driver = await buildDriver('www-integration project-page signed out');
        await driver.get(rootUrl);
    });

    beforeEach(async () => {
        await driver.get(unownedSharedUrl);
        let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
    });

    afterAll(async () => await driver.quit());

    // LOGGED OUT TESTS

    test('Find fullscreen button', async () => {
        await clickXpath('//div[starts-with(@class, "stage_green-flag-overlay")]');
        await clickXpath('//img[contains(@alt, "Enter full screen mode")]');
        let fullscreenGui = await findByXpath('//div[@class="guiPlayer fullscreen"]');
        let guiVisible = await fullscreenGui.isDisplayed();
        await expect(guiVisible).toBe(true);
    });

    test.skip('Open Copy Link modal', async () => {
        await clickXpath('//button[@class="button action-button copy-link-button"]');
        let projectLink = await findByXpath('//input[@name="link"]');
        let linkValue = await projectLink.getAttribute('value');
        await expect(linkValue).toEqual(unownedSharedUrl);
    });

    test('Click Username to go to profile page', async ()=> {
        await clickXpath('//div[@class="title"]/a');
        let userContent = await findByXpath('//div[@class="user-content"]');
        let contentVisible = await userContent.isDisplayed();
        await expect(contentVisible).toBe(true);
    });

    test('click See Inside to go to the editor', async ()=> {
        await clickXpath('//button[@class="button button see-inside-button"]');
        let infoArea = await findByXpath('//div[@class="sprite-info_sprite-info_3EyZh box_box_2jjDp"]');
        let areaVisible = await infoArea.isDisplayed();
        await expect(areaVisible).toBe(true);
    });

    test('click View All remixes takes you to remix page', async ()=> {
        await clickXpath('//div[@class="list-header-link"]');
        let originalLink = await findByXpath('//h2/a');
        let link = await originalLink.getAttribute('href');
        await expect(link).toEqual(rootUrl + '/projects/' + unownedSharedId + '/');
    });

    // Load an unshared project while signed out, get error
    test('Load an ushared project you do not own (error)', async () => {
        await driver.get(unownedUnsharedUrl);
        let unavailableImage = await findByXpath('//img[@class="not-available-image"]');
        await waitUntilVisible(unavailableImage, driver);
        let unavailableVisible = await unavailableImage.isDisplayed();
        await expect(unavailableVisible).toBe(true);
    });
});

// Logged in tests

describe('www-integration project-page signed in', () => {
    beforeAll(async () => {
        // expect(projectUrl).toBe(defined);
        driver = await buildDriver('www-integration project-page signed in');
        await driver.get(rootUrl);
        await driver.sleep(1000);
        await signIn(username, password);
        await findByXpath('//span[contains(@class, "profile-name")]');
    });

    beforeEach(async () => {
        await driver.get(rootUrl);
    });

    afterAll(async () => await driver.quit());

    // LOGGED in TESTS

    // Load a shared project you own
    test('Load a shared project you own', async () => {
        await driver.get(ownedSharedUrl);
        let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        let gfVisible = await gfOverlay.isDisplayed();
        await expect(gfVisible).toBe(true);
    });

    // Load a shared project you don't own
    test('Load a shared project you do not own', async () => {
        await driver.get(unownedSharedUrl);
        let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        let gfVisible = await gfOverlay.isDisplayed();
        await expect(gfVisible).toBe(true);
    });

    // Load an unshared project you own
    test('Load a shared project you own', async () => {
        await driver.get(ownedUnsharedUrl);
        let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        let gfVisible = await gfOverlay.isDisplayed();
        await expect(gfVisible).toBe(true);
    });

    // Load an unshared project you don't own, get error
    test('Load an ushared project you do not own (error)', async () => {
        await driver.get(unownedUnsharedUrl);
        let unavailableImage = await findByXpath('//img[@class="not-available-image"]');
        await waitUntilVisible(unavailableImage, driver);
        let unavailableVisible = await unavailableImage.isDisplayed();
        await expect(unavailableVisible).toBe(true);
    });
});
