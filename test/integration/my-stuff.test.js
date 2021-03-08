const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickText,
    findByXpath,
    clickXpath,
    buildDriver
} = new SeleniumHelper();

let username = process.env.SMOKE_USERNAME + '1';
let password = process.env.SMOKE_PASSWORD;
let remote = process.env.SMOKE_REMOTE || false;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let myStuffURL = rootUrl + '/mystuff';

if (remote){
    jest.setTimeout(60000);
} else {
    jest.setTimeout(20000);
}

let driver;

describe('www-integration my_stuff', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration my_stuff');
        await driver.get(rootUrl);
        await driver.sleep(1000);
        await clickXpath('//li[@class="link right login-item"]/a');
        let name = await findByXpath('//input[@id="frc-username-1088"]');
        await name.sendKeys(username);
        let word = await findByXpath('//input[@id="frc-password-1088"]');
        await word.sendKeys(password);
        await driver.sleep(500);
        await clickXpath('//button[contains(@class, "button") and ' +
            'contains(@class, "submit-button") and contains(@class, "white")]');
        await findByXpath('//span[contains(@class, "profile-name")]');
    });

    afterAll(async () => await driver.quit());

    test('verify My Stuff structure (tabs, title)', async () => {
        await driver.get(myStuffURL);
        let header = await findByXpath('//div[@class="box-head"]/h2');
        let headerVisible = await header.isDisplayed();
        await expect(headerVisible).toBe(true);
        let allTab = await findByXpath('//li[@data-tab="projects"]/a');
        let allTabVisible = await allTab.isDisplayed();
        await expect(allTabVisible).toBe(true);
        let sharedTab = await findByXpath('//li[@data-tab="shared"]/a');
        let sharedTabVisible = await sharedTab.isDisplayed();
        await expect(sharedTabVisible).toBe(true);
        let unsharedTab = await findByXpath('//li[@data-tab="unshared"]/a');
        let unsharedTabVisible = await unsharedTab.isDisplayed();
        await expect(unsharedTabVisible).toBe(true);
        let studios = await findByXpath('//li[@data-tab="galleries"]/a');
        let studiosVisible = await studios.isDisplayed();
        await expect(studiosVisible).toBe(true);
        let trash = await findByXpath('//li[@data-tab="trash"]/a');
        let trashVisible = await trash.isDisplayed();
        await expect(trashVisible).toBe(true);
    });

    test('clicking a project title should take you to the project page', async () => {
        await driver.get(myStuffURL);
        await clickXpath('//span[@class="media-info-item title"]');
        await driver.sleep(6000);
        let gui = await findByXpath('//div[@class="guiPlayer"]');
        let guiVisible = await gui.isDisplayed();
        await expect(guiVisible).toBe(true);
    });

    test('clicking "see inside" should take you to the editor', async () =>{
        await driver.get(myStuffURL);
        await clickXpath('//a[@data-control="edit"]');
        let gf = await findByXpath('//img[@class="green-flag_green-flag_1kiAo"]');
        let gfVisible = await gf.isDisplayed();
        await expect(gfVisible).toBe(true);
    });

    test('Add To button should bring up a list of studios', async () =>{
        await driver.get(myStuffURL);
        await clickXpath('//div[@id="sidebar"]/ul/li[@data-tab="shared"]');
        await clickXpath('//div[@data-control="add-to"]');
        let dropDown = await findByXpath('//div[@class="dropdown-menu"]/ul/li');
        let dropDownVisible = await dropDown.isDisplayed();
        await expect(dropDownVisible).toBe(true);
    });

    test('+ New Studio button should take you to the studio page', async ()=>{
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        await driver.sleep(500);
        // my stuff also has an element with the id tabs
        let tabs = await findByXpath('//ul[@id="tabs" and @class="tabs-index box-h-tabs h-tabs"]');
        let tabsVisible = await tabs.isDisplayed();
        expect(tabsVisible).toBe(true);
    });

    test('+ New Project button should open the editor', async () =>{
        await driver.get(myStuffURL);
        await clickText('+ New Project');
        let gf = await findByXpath('//img[@class="green-flag_green-flag_1kiAo"]');
        let gfVisible = await gf.isDisplayed();
        await expect(gfVisible).toBe(true);
    });

});
