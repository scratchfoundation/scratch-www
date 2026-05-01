// These tests do not sign in with a user
// Adding tests that sign in with user #6
// some tests use projects owned by user #2

const SeleniumHelper = require('./selenium-helpers.js');
const {By, until} = require('selenium-webdriver');
import path from 'path';

const {
    buildDriver,
    clickText,
    clickXpath,
    findText,
    findByXpath,
    isSignedIn,
    signIn,
    navigate,
    waitForScratchGuiLoadingState,
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

const FILE_MENU_XPATH = '//div[contains(@class, "menu-bar_menu-bar-item")]' +
    '[*[contains(@class, "menu-bar_collapsible-label")]//*[text()="File"]]';
const STAGE_WRAPPER_XPATH = '//section[contains(concat(" ", @class), " stage-wrapper_stage-wrapper")]';
const SPRITE_INFO_XPATH = '//div[contains(concat(" ", @class), " sprite-info_sprite-info")]';

jest.setTimeout(60000);

let driver;

describe('www-integration project-page signed out', () => {
    beforeAll(async () => {
        // expect(projectUrl).toBe(defined);
        driver = await buildDriver('www-integration project-page signed out');
        await navigate(rootUrl);
    });

    beforeEach(async () => {
        await navigate(unownedSharedUrl);
        const stageWrapper = await findByXpath(STAGE_WRAPPER_XPATH);
        await waitUntilVisible(stageWrapper, driver);
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

    test('Open Copy Link modal', async () => {
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
        const infoArea = await findByXpath(SPRITE_INFO_XPATH);
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
        await navigate(unownedUnsharedUrl);
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
    });

    beforeEach(async () => {
        // The browser may or may not retain cookies between tests, depending on configuration.
        await navigate(rootUrl);
        if (!await isSignedIn()) {
            await signIn(username, password);
        }
    });

    afterAll(() => driver.quit());

    // LOGGED in TESTS

    // Load a shared project you own
    test('Load a shared project you own', async () => {
        await navigate(ownedSharedUrl);
        const stageWrapper = await findByXpath(STAGE_WRAPPER_XPATH);
        await waitUntilVisible(stageWrapper, driver);
        const stageWrapperVisible = await stageWrapper.isDisplayed();
        expect(stageWrapperVisible).toBe(true);
    });

    // Load a shared project you don't own
    test('Load a shared project you do not own', async () => {
        await navigate(unownedSharedUrl);
        const stageWrapper = await findByXpath(STAGE_WRAPPER_XPATH);
        await waitUntilVisible(stageWrapper, driver);
        const stageWrapperVisible = await stageWrapper.isDisplayed();
        expect(stageWrapperVisible).toBe(true);
    });

    // Load an unshared project you own
    test('Load an unshared project you own', async () => {
        await navigate(ownedUnsharedUrl);
        const stageWrapper = await findByXpath(STAGE_WRAPPER_XPATH);
        await waitUntilVisible(stageWrapper, driver);
        const stageWrapperVisible = await stageWrapper.isDisplayed();
        expect(stageWrapperVisible).toBe(true);
    });

    // Load an unshared project you don't own, get error
    test('Load an ushared project you do not own (error)', async () => {
        await navigate(unownedUnsharedUrl);
        const unavailableImage = await findByXpath('//img[@class="not-available-image"]');
        await waitUntilVisible(unavailableImage, driver);
        const unavailableVisible = await unavailableImage.isDisplayed();
        expect(unavailableVisible).toBe(true);
    });

    // Load a shared scratch 2 project you don't own
    test('Load a shared scratch 2 project you do not own', async () => {
        await navigate(unownedSharedScratch2Url);
        const stageWrapper = await findByXpath(STAGE_WRAPPER_XPATH);
        await waitUntilVisible(stageWrapper, driver);
        const stageWrapperVisible = await stageWrapper.isDisplayed();
        expect(stageWrapperVisible).toBe(true);
    });

    // Load an unshared scratch 2 project you own
    test('Load an unshared scratch 2 project you own', async () => {
        await navigate(ownedUnsharedScratch2Url);
        const stageWrapper = await findByXpath(STAGE_WRAPPER_XPATH);
        await waitUntilVisible(stageWrapper, driver);
        const stageWrapperVisible = await stageWrapper.isDisplayed();
        expect(stageWrapperVisible).toBe(true);
    });
});

describe('www-integration project-creation signed in', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration project-creation signed in');
    });

    beforeEach(async () => {
        // The browser may or may not retain cookies between tests, depending on configuration.
        await navigate(rootUrl);
        if (!await isSignedIn()) {
            await signIn(username, password);
        }
    });

    afterAll(() => driver.quit());

    test('make a copy of a project', async () => {
        await navigate(`${ownedUnsharedUrl}/editor`);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Save as a copy');
        const successAlert = await findText('Project saved as a copy.');
        const alertVisible = await successAlert.isDisplayed();
        expect(alertVisible).toBe(true);
        await driver.sleep(1000);
        const infoArea = await findByXpath(SPRITE_INFO_XPATH);
        const areaVisible = await infoArea.isDisplayed();
        expect(areaVisible).toBe(true);
    });

    test('remix a project', async () => {
        await navigate(unownedSharedUrl);
        const stageWrapper = await findByXpath(STAGE_WRAPPER_XPATH);
        await waitUntilVisible(stageWrapper, driver);
        await clickXpath('//button[@class="button remix-button"]');
        const successAlert = await findText('Project saved as a remix.');
        const alertVisible = await successAlert.isDisplayed();
        expect(alertVisible).toBe(true);
        await driver.sleep(1000);
        const infoArea = await findByXpath(SPRITE_INFO_XPATH);
        const areaVisible = await infoArea.isDisplayed();
        expect(areaVisible).toBe(true);
    });

    test('load project from file', async () => {
        // selenium-helpers' buildDriver attaches a FileDetector for remote runs, so sendKeys
        // to a file input uploads the local fixture transparently regardless of where the
        // browser is running.
        const projectPath = path.resolve(__dirname, '../fixtures/project1.sb3');

        // create a new project so there's unsaved content to trigger an alert
        await clickXpath('//li[@class="link create"]');

        // The new-project flow drops us into the editor and eventually settles at
        // SHOWING_WITH_ID, but state can briefly transition (e.g. AUTO_UPDATING for the
        // initial title save) any time after that. If the change-event handler runs in
        // a transitional state, scratch-gui's requestProjectUpload action creator returns
        // undefined and the redux dispatch crashes, silently dropping the upload. We retry
        // the whole File → Load → sendKeys sequence until we observe loadingState advance
        // to LOADING_VM_FILE_UPLOAD. When the redux dev-tools shim is installed (CDP
        // available — the case on local chromedriver and on Sauce), that's positive proof
        // the dispatch succeeded. Without the shim, waitForScratchGuiLoadingState resolves
        // immediately, the loop degenerates to a single trust-the-flow pass, and the test
        // falls back to whatever pre-shim behavior held on that driver.
        // TODO: drop the retry loop once scratch-gui's requestProjectUpload always returns
        // a valid action regardless of loadingState (the reducer already gates).
        await waitForScratchGuiLoadingState(['SHOWING_WITH_ID', 'SHOWING_WITHOUT_ID']);

        let dispatched = false;
        for (let attempt = 0; attempt < 5 && !dispatched; attempt++) {
            await waitForScratchGuiLoadingState(['SHOWING_WITH_ID', 'SHOWING_WITHOUT_ID']);
            await clickXpath(FILE_MENU_XPATH);
            await clickText('Load from your computer');
            const input = await driver.wait(
                until.elementLocated(By.xpath('//input[@accept=".sb,.sb2,.sb3"]')),
                20000
            );
            await input.sendKeys(projectPath);

            // Accept the "Replace contents" alert if it appears. scratch-gui only shows
            // the confirm when userOwnsProject || (projectChanged && isShowingWithoutId);
            // when neither holds (e.g. just-created project's author info isn't fetched
            // yet) the upload proceeds without a confirm.
            try {
                await driver.wait(until.alertIsPresent(), 2000);
                const alert = await driver.switchTo().alert();
                await alert.accept();
            } catch (e) { /* no alert */ }

            // Did the dispatch actually move state into LOADING_VM_FILE_UPLOAD?
            try {
                await waitForScratchGuiLoadingState(['LOADING_VM_FILE_UPLOAD'], 2000);
                dispatched = true;
            } catch (e) {
                // dispatch silently dropped; loop and retry
            }
        }
        expect(dispatched).toBe(true);

        // check that project is loaded
        const spriteTile = await findText('project1-sprite');
        const spriteTileVisible = await spriteTile.isDisplayed();
        expect(spriteTileVisible).toBe(true);

        // check that gui is still there after some time has passed
        await driver.sleep(1000);
        const infoArea = await findByXpath(SPRITE_INFO_XPATH);
        const areaVisible = await infoArea.isDisplayed();
        expect(areaVisible).toBe(true);
    });
});
