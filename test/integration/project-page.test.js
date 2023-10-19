// These tests do not sign in with a user
// Adding tests that sign in with user #6
// some tests use projects owned by user #2

const SeleniumHelper = require('./selenium-helpers.js');
import path from 'path';

const {
    buildDriver,
    clickText,
    clickXpath,
    findText,
    findByXpath,
    signIn,
    waitUntilVisible
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

// project IDs and URLs
const unownedSharedId = process.env.UNOWNED_SHARED_PROJECT_ID || 1300006196;
const unownedSharedUrl = `${rootUrl}/projects/${unownedSharedId}`;

const ownedSharedId = process.env.OWNED_SHARED_PROJECT_ID || 1300009464;
const ownedSharedUrl = `${rootUrl}/projects/${ownedSharedId}`;

const ownedUnsharedID = process.env.OWNED_UNSHARED_PROJECT_ID || 1300009465;
const ownedUnsharedUrl = `${rootUrl}/projects/${ownedUnsharedID}`;

const unownedUnsharedID = process.env.UNOWNED_UNSHARED_PROJECT_ID || 1300006306;
const unownedUnsharedUrl = `${rootUrl}/projects/${unownedUnsharedID}`;

const unownedSharedScratch2ID = process.env.UNOWNED_SHARED_SCRATCH2_PROJECT_ID || 1300009487;
const unownedSharedScratch2Url = `${rootUrl}/projects/${unownedSharedScratch2ID}`;

const ownedUnsharedScratch2ID = process.env.OWNED_UNSHARED_SCRATCH2_PROJECT_ID || 1300009488;
const ownedUnsharedScratch2Url = `${rootUrl}/projects/${ownedUnsharedScratch2ID}`;

const username = `${process.env.SMOKE_USERNAME}6`;
const password = process.env.SMOKE_PASSWORD;

const remote = process.env.SMOKE_REMOTE || false;

const FILE_MENU_XPATH = '//div[contains(@class, "menu-bar_menu-bar-item")]' +
    '[*[contains(@class, "menu-bar_collapsible-label")]//*[text()="File"]]';

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
        const gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
    });

    afterAll(() => driver.quit());

    // LOGGED OUT TESTS

    test('Find fullscreen button', async () => {
        await clickXpath('//div[starts-with(@class, "stage_green-flag-overlay")]');
        await clickXpath('//img[contains(@alt, "Enter full screen mode")]');
        const fullscreenGui = await findByXpath('//div[@class="guiPlayer fullscreen"]');
        const guiVisible = await fullscreenGui.isDisplayed();
        expect(guiVisible).toBe(true);
    });

    test.skip('Open Copy Link modal', async () => {
        await clickXpath('//button[@class="button action-button copy-link-button"]');
        const projectLink = await findByXpath('//input[@name="link"]');
        const linkValue = await projectLink.getAttribute('value');
        expect(linkValue).toEqual(unownedSharedUrl);
    });

    test('Click Username to go to profile page', async () => {
        await clickXpath('//div[@class="title"]/a');
        const userContent = await findByXpath('//div[@class="user-content"]');
        const contentVisible = await userContent.isDisplayed();
        expect(contentVisible).toBe(true);
    });

    test('click See Inside to go to the editor', async () => {
        await clickXpath('//button[@class="button button see-inside-button"]');
        const infoArea = await findByXpath('//div[@class="sprite-info_sprite-info_3EyZh box_box_2jjDp"]');
        const areaVisible = await infoArea.isDisplayed();
        expect(areaVisible).toBe(true);
    });

    test('click View All remixes takes you to remix page', async () => {
        await clickXpath('//div[@class="list-header-link"]');
        const originalLink = await findByXpath('//h2/a');
        const link = await originalLink.getAttribute('href');
        expect(link).toEqual(`${rootUrl}/projects/${unownedSharedId}/`);
    });

    // Load an unshared project while signed out, get error
    test('Load an ushared project you do not own (error)', async () => {
        await driver.get(unownedUnsharedUrl);
        const unavailableImage = await findByXpath('//img[@class="not-available-image"]');
        await waitUntilVisible(unavailableImage, driver);
        const unavailableVisible = await unavailableImage.isDisplayed();
        expect(unavailableVisible).toBe(true);
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

    afterAll(() => driver.quit());

    // LOGGED in TESTS

    // Load a shared project you own
    test('Load a shared project you own', async () => {
        await driver.get(ownedSharedUrl);
        const gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        const gfVisible = await gfOverlay.isDisplayed();
        expect(gfVisible).toBe(true);
    });

    // Load a shared project you don't own
    test('Load a shared project you do not own', async () => {
        await driver.get(unownedSharedUrl);
        const gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        const gfVisible = await gfOverlay.isDisplayed();
        expect(gfVisible).toBe(true);
    });

    // Load an unshared project you own
    test('Load an unshared project you own', async () => {
        await driver.get(ownedUnsharedUrl);
        const gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        const gfVisible = await gfOverlay.isDisplayed();
        expect(gfVisible).toBe(true);
    });

    // Load an unshared project you don't own, get error
    test('Load an ushared project you do not own (error)', async () => {
        await driver.get(unownedUnsharedUrl);
        const unavailableImage = await findByXpath('//img[@class="not-available-image"]');
        await waitUntilVisible(unavailableImage, driver);
        const unavailableVisible = await unavailableImage.isDisplayed();
        expect(unavailableVisible).toBe(true);
    });

    // Load a shared scratch 2 project you don't own
    test('Load a shared scratch 2 project you do not own', async () => {
        await driver.get(unownedSharedScratch2Url);
        const gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        const gfVisible = await gfOverlay.isDisplayed();
        expect(gfVisible).toBe(true);
    });

    // Load an unshared scratch 2 project you own
    test('Load an unshared scratch 2 project you own', async () => {
        await driver.get(ownedUnsharedScratch2Url);
        const gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        const gfVisible = await gfOverlay.isDisplayed();
        expect(gfVisible).toBe(true);
    });
});

describe('www-integration project-creation signed in', () => {
    beforeAll(async () => {
        // expect(projectUrl).toBe(defined);
        driver = await buildDriver('www-integration project-creation signed in');
        await driver.get(rootUrl);
        await driver.sleep(1000);
        await signIn(username, password);
        await findByXpath('//span[contains(@class, "profile-name")]');

        // SauceLabs doesn't have access to the sb3 used in 'load project from file' test
        // https://support.saucelabs.com/hc/en-us/articles/115003685593-Uploading-Files-to-a-Sauce-Labs-Virtual-Machine-during-a-Test
        if (remote) {
            await driver.get('https://github.com/scratchfoundation/scratch-www/blob/develop/test/fixtures/project1.sb3');
            await clickXpath('//Button[@data-testid="download-raw-button"]');
            await driver.sleep(3000);
        }
    });

    beforeEach(async () => {
        await driver.get(rootUrl);
    });

    afterAll(() => driver.quit());

    test('make a copy of a project', async () => {
        await driver.get(`${ownedUnsharedUrl}/editor`);
        const gf = await findByXpath('//img[@class="green-flag_green-flag_1kiAo"]');
        await gf.isDisplayed();
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Save as a copy');
        const successAlert = await findText('Project saved as a copy.');
        const alertVisible = await successAlert.isDisplayed();
        expect(alertVisible).toBe(true);
        await driver.sleep(1000);
        const infoArea = await findByXpath('//div[@class="sprite-info_sprite-info_3EyZh box_box_2jjDp"]');
        const areaVisible = await infoArea.isDisplayed();
        expect(areaVisible).toBe(true);
    });

    test('remix a project', async () => {
        await driver.get(unownedSharedUrl);
        const gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        await clickXpath('//button[@class="button remix-button"]');
        const successAlert = await findText('Project saved as a remix.');
        const alertVisible = await successAlert.isDisplayed();
        expect(alertVisible).toBe(true);
        await driver.sleep(1000);
        const infoArea = await findByXpath('//div[@class="sprite-info_sprite-info_3EyZh box_box_2jjDp"]');
        const areaVisible = await infoArea.isDisplayed();
        expect(areaVisible).toBe(true);
    });

    test('load project from file', async () => {
        // if remote, projectPath is Saucelabs path to downloaded file
        const projectPath = remote ?
            '/Users/chef/Downloads/project1.sb3' :
            path.resolve(__dirname, '../fixtures/project1.sb3');

        // upload file
        await clickXpath('//li[@class="link create"]');
        const gf = await findByXpath('//img[@class="green-flag_green-flag_1kiAo"]');
        await gf.isDisplayed();
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        await driver.sleep(1000);
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(projectPath);

        // accept alert
        const alert = await driver.switchTo().alert();
        await alert.accept();

        // check that project is loaded
        const spriteTile = await findText('project1-sprite');
        const spriteTileVisible = await spriteTile.isDisplayed();
        expect(spriteTileVisible).toBe(true);

        // check that gui is still there after some time has passed
        await driver.sleep(1000);
        const infoArea = await findByXpath('//div[@class="sprite-info_sprite-info_3EyZh box_box_2jjDp"]');
        const areaVisible = await infoArea.isDisplayed();
        expect(areaVisible).toBe(true);
    });
});
