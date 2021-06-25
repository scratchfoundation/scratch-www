import SeleniumHelper from './selenium-helpers.js';

const {
    findByXpath,
    clickXpath,
    buildDriver
} = new SeleniumHelper();

let remote = process.env.SMOKE_REMOTE || false;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let studioId = process.env.TEST_STUDIO_ID || 10004360;
let studioUrl = rootUrl + '/studios/' + studioId;

if (remote){
    jest.setTimeout(60000);
} else {
    jest.setTimeout(20000);
}

let driver;

describe('studio page while signed out', () => {
    beforeAll(async () => {
        // expect(projectUrl).toBe(defined);
        driver = await buildDriver('www-integration studio-page signed out');
        await driver.get(rootUrl);
    });

    beforeEach(async () => {
        await driver.get(studioUrl);
        let studioNav = await findByXpath('//div[@class="studio-tabs"]');
        await studioNav.isDisplayed();
    });

    afterAll(async () => await driver.quit());

    test('land on projects tab', async () => {
        await driver.get(studioUrl);
        let projectGrid = await findByXpath('//div[@class="studio-projects-grid"]');
        let projectGridDisplayed = await projectGrid.isDisplayed();
        await expect(projectGridDisplayed).toBe(true);
    });

    test('studio title', async () => {
        let studioTitle = await findByXpath('//div[@class="studio-title"]');
        let titleText = await studioTitle.getText();
        await expect(titleText).toEqual('studio for automated testing');
    });

    test('studio description', async () => {
        let xpath = '//div[contains(@class, "studio-description")]';
        let studioDescription = await findByXpath(xpath);
        let descriptionText = await studioDescription.getText();
        await expect(descriptionText).toEqual('a description');
    });

});
