// These tests do not sign in with a user
// Adding tests that sign in with user #6
// some tests use projects owned by user #2

const SeleniumHelper = require('./selenium-helpers.js');
const {until} = require('selenium-webdriver');
import path from 'path';

const {
    buildDriver,
    clickText,
    clickXpath,
    findText,
    findByXpath,
    isSignedIn,
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

let unownedSharedScratch2ID = process.env.UNOWNED_SHARED_SCRATCH2_PROJECT_ID || 1300009487;
let unownedSharedScratch2Url = rootUrl + '/projects/' + unownedSharedScratch2ID;

let ownedUnsharedScratch2ID = process.env.OWNED_UNSHARED_SCRATCH2_PROJECT_ID || 1300009488;
let ownedUnsharedScratch2Url = rootUrl + '/projects/' + ownedUnsharedScratch2ID;

let username = process.env.SMOKE_USERNAME + '6';
let password = process.env.SMOKE_PASSWORD;

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
    });

    beforeEach(async () => {
        // The browser may or may not retain cookies between tests, depending on configuration.
        await driver.get(rootUrl);
        if (!await isSignedIn()) {
            await signIn(username, password);
        }
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
    test('Load an unshared project you own', async () => {
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

    // Load a shared scratch 2 project you don't own
    test('Load a shared scratch 2 project you do not own', async () => {
        await driver.get(unownedSharedScratch2Url);
        let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        let gfVisible = await gfOverlay.isDisplayed();
        await expect(gfVisible).toBe(true);
    });

    // Load an unshared scratch 2 project you own
    test('Load an unshared scratch 2 project you own', async () => {
        await driver.get(ownedUnsharedScratch2Url);
        let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        let gfVisible = await gfOverlay.isDisplayed();
        await expect(gfVisible).toBe(true);
    });
});

describe('www-integration project-creation signed in', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration project-creation signed in');

        // SauceLabs doesn't have access to the sb3 used in 'load project from file' test
        // https://support.saucelabs.com/hc/en-us/articles/115003685593-Uploading-Files-to-a-Sauce-Labs-Virtual-Machine-during-a-Test
        if (remote) {
            await driver.get('https://github.com/scratchfoundation/scratch-www/blob/develop/test/fixtures/project1.sb3');
            await clickXpath('//button[@data-testid="download-raw-button"]');
            await driver.sleep(3000);
        }
    });

    beforeEach(async () => {
        // The browser may or may not retain cookies between tests, depending on configuration.
        await driver.get(rootUrl);
        if (!await isSignedIn()) {
            await signIn(username, password);
        }
    });

    afterAll(async () => await driver.quit());

    test('make a copy of a project', async () => {
        await driver.get(ownedUnsharedUrl + '/editor');
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Save as a copy');
        let successAlert = await findText('Project saved as a copy.');
        let alertVisible = await successAlert.isDisplayed();
        await expect(alertVisible).toBe(true);
        await driver.sleep(1000);
        let infoArea = await findByXpath('//div[@class="sprite-info_sprite-info_3EyZh box_box_2jjDp"]');
        let areaVisible = await infoArea.isDisplayed();
        await expect(areaVisible).toBe(true);
    });

    test('remix a project', async () => {
        await driver.get(unownedSharedUrl);
        let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await waitUntilVisible(gfOverlay, driver);
        await clickXpath('//button[@class="button remix-button"]');
        let successAlert = await findText('Project saved as a remix.');
        let alertVisible = await successAlert.isDisplayed();
        await expect(alertVisible).toBe(true);
        await driver.sleep(1000);
        let infoArea = await findByXpath('//div[@class="sprite-info_sprite-info_3EyZh box_box_2jjDp"]');
        let areaVisible = await infoArea.isDisplayed();
        await expect(areaVisible).toBe(true);
    });

    test('load project from file', async () => {
        // if remote, projectPath is Saucelabs path to downloaded file
        const projectPath = remote ?
            '/Users/chef/Downloads/project1.sb3' :
            path.resolve(__dirname, '../fixtures/project1.sb3');

        // create a new project so there's unsaved content to trigger an alert
        await clickXpath('//li[@class="link create"]');

        // upload file
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await driver.wait(() => findByXpath('//input[@accept=".sb,.sb2,.sb3"]'));
        await input.sendKeys(projectPath);

        // accept alert
        await driver.wait(until.alertIsPresent());
        let alert = await driver.switchTo().alert();
        await alert.accept();

        // check that project is loaded
        let spriteTile = await findText('project1-sprite');
        let spriteTileVisible = await spriteTile.isDisplayed();
        await expect(spriteTileVisible).toBe(true);

        // check that gui is still there after some time has passed
        await driver.sleep(1000);
        let infoArea = await findByXpath('//div[@class="sprite-info_sprite-info_3EyZh box_box_2jjDp"]');
        let areaVisible = await infoArea.isDisplayed();
        await expect(areaVisible).toBe(true);
    });
});
