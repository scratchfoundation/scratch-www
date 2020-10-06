const SeleniumHelper = require('./selenium-helpers.js');

const {
    findByXpath,
    clickXpath,
    buildDriver
} = new SeleniumHelper();

let remote = process.env.SMOKE_REMOTE || false;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let projectId = process.env.TEST_PROJECT_ID || 1300006196;
let projectUrl = rootUrl + '/projects/' + projectId;

if (remote){
    jest.setTimeout(60000);
} else {
    jest.setTimeout(10000);
}

let driver;

describe('www-integration project-page signed out', () => {
    beforeAll(async () => {
        // expect(projectUrl).toBe(defined);
        driver = await buildDriver('www-integration project-page signed out');
        await driver.get(rootUrl);
    });

    beforeEach(async () => {
        await driver.get(projectUrl);
        let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
        await gfOverlay.isDisplayed();
    });

    afterAll(async () => await driver.quit());

    test('Find fullscreen button', async () => {
        await clickXpath('//div[starts-with(@class, "stage_green-flag-overlay")]');
        await clickXpath('//img[contains(@alt, "Enter full screen mode")]');
        let fullscreenGui = await findByXpath('//div[@class="guiPlayer fullscreen"]');
        let guiVisible = await fullscreenGui.isDisplayed();
        await expect(guiVisible).toBe(true);
    });

    test('Open Copy Link modal', async () => {
        await clickXpath('//button[@class="button action-button copy-link-button"]');
        let projectLink = await findByXpath('//input[@name="link"]');
        let linkValue = await projectLink.getAttribute('value');
        await expect(linkValue).toEqual(projectUrl);
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
        await expect(link).toEqual(rootUrl + '/projects/' + projectId + '/');
    });
});
