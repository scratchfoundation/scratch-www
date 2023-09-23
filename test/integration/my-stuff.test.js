// These tests sign in as user #1

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickText,
    clickXpath,
    findByXpath,
    signIn,
    waitUntilDocumentReady,
    urlMatches
} = new SeleniumHelper();

let username = process.env.SMOKE_USERNAME + '1';
let password = process.env.SMOKE_PASSWORD;

let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let myStuffURL = rootUrl + '/mystuff';
let rateLimitCheck = process.env.RATE_LIMIT_CHECK || rootUrl;

jest.setTimeout(60000);

let driver;

describe('www-integration my_stuff', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration my_stuff');
        await driver.get(rootUrl);
        await signIn(username, password);
        await findByXpath('//span[contains(@class, "profile-name")]');
    });

    afterAll(async () => await driver.quit());

    test('verify My Stuff structure (tabs, title)', async () => {
        await driver.get(myStuffURL);
        let header = await findByXpath('//div[@class="box-head"]/h2');
        let headerVisible = await header.isDisplayed();
        expect(headerVisible).toBe(true);
        let allTab = await findByXpath('//li[@data-tab="projects"]/a');
        let allTabVisible = await allTab.isDisplayed();
        expect(allTabVisible).toBe(true);
        let sharedTab = await findByXpath('//li[@data-tab="shared"]/a');
        let sharedTabVisible = await sharedTab.isDisplayed();
        expect(sharedTabVisible).toBe(true);
        let unsharedTab = await findByXpath('//li[@data-tab="unshared"]/a');
        let unsharedTabVisible = await unsharedTab.isDisplayed();
        expect(unsharedTabVisible).toBe(true);
        let studios = await findByXpath('//li[@data-tab="galleries"]/a');
        let studiosVisible = await studios.isDisplayed();
        expect(studiosVisible).toBe(true);
        let trash = await findByXpath('//li[@data-tab="trash"]/a');
        let trashVisible = await trash.isDisplayed();
        expect(trashVisible).toBe(true);
    });

    test('clicking a project title should take you to the project page', async () => {
        await driver.get(myStuffURL);
        await clickXpath('//span[@class="media-info-item title"]');
        await waitUntilDocumentReady();
        let gui = await findByXpath('//div[@class="guiPlayer"]');
        let guiVisible = await gui.isDisplayed();
        expect(guiVisible).toBe(true);
    });

    test('clicking "see inside" should take you to the editor', async () =>{
        await driver.get(myStuffURL);
        await clickXpath('//a[@data-control="edit"]');
        await waitUntilDocumentReady();
        let gf = await findByXpath('//img[@class="green-flag_green-flag_1kiAo"]');
        let gfVisible = await gf.isDisplayed();
        expect(gfVisible).toBe(true);
    });

    test('Add To button should bring up a list of studios', async () =>{
        await driver.get(myStuffURL);
        await clickXpath('//div[@id="sidebar"]/ul/li[@data-tab="shared"]');
        await clickXpath('//div[@data-control="add-to"]');
        let dropDown = await findByXpath('//div[@class="dropdown-menu"]/ul/li');
        let dropDownVisible = await dropDown.isDisplayed();
        expect(dropDownVisible).toBe(true);
    });

    test('+ New Project button should open the editor', async () =>{
        await driver.get(myStuffURL);
        await clickText('+ New Project');
        await waitUntilDocumentReady();
        let gf = await findByXpath('//img[@class="green-flag_green-flag_1kiAo"]');
        let gfVisible = await gf.isDisplayed();
        expect(gfVisible).toBe(true);
    });

    test('+ New Studio button should take you to the studio page', async ()=>{
        await driver.get(rateLimitCheck);
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        await waitUntilDocumentReady();
        let tabs = await findByXpath('//div[@class="studio-tabs"]');
        let tabsVisible = await tabs.isDisplayed();
        expect(tabsVisible).toBe(true);
    });

    test('New studio rate limited to five', async () =>{
        await driver.get(rateLimitCheck);
        // 1st studio
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        await urlMatches(/\/studios\//);
        // 2nd studio
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        await urlMatches(/\/studios\//);
        // 3rd studio
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        await urlMatches(/\/studios\//);
        // 4th studio
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        await urlMatches(/\/studios\//);
        // 5th studio
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        await urlMatches(/\/studios\//);
        // 6th studio should fail
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        let alertMessage = await findByXpath('//div[contains(@class, "alert-error")]');
        let errVisible = await alertMessage.isDisplayed();
        expect(errVisible).toBe(true);

        await driver.get(rateLimitCheck);
    });
});
