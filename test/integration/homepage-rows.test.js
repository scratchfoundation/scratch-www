// these tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickXpath,
    findByXpath,
    navigate,
    waitUntilDocumentReady
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

jest.setTimeout(60000);

let driver;

describe('www-integration project rows', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration project rows');
        // navigate(rootUrl);
    });

    beforeEach(async () => {
        await navigate(rootUrl);
    });

    afterAll(() => driver.quit());

    test('Featured Projects row title', async () => {
        const projects = await findByXpath('//div[@class="box"]/div[@class="box-header"]/h4');
        const projectsText = await projects.getText();
        expect(projectsText).toEqual('Featured Projects');
    });

    test('Featured Project link', async () => {
        await clickXpath('//div[@class="box"][descendant::text()="Featured Projects"]' +
            '//div[contains(@class, "thumbnail")][1]/a[@class="thumbnail-image"]');
        const guiPlayer = await findByXpath('//div[@class="guiPlayer"]');
        const guiPlayerDisplayed = await guiPlayer.isDisplayed();
        expect(guiPlayerDisplayed).toBe(true);
    });

    test('Featured Studios row title', async () => {
        const studios = await findByXpath('//div[@class="box"][2]/div[@class="box-header"]/h4');
        const studiosText = await studios.getText();
        expect(studiosText).toEqual('Featured Studios');
    });

    test('Featured Studios link', async () => {
        await clickXpath('//div[@class="box"][descendant::text()="Featured Studios"]' +
        '//div[contains(@class, "thumbnail")][1]/a[@class="thumbnail-image"]');
        await waitUntilDocumentReady();
        const studioInfo = await findByXpath('//div[contains(@class, "studio-info")]');
        const studioInfoDisplayed = await studioInfo.isDisplayed();
        expect(studioInfoDisplayed).toBe(true);
    });
});
