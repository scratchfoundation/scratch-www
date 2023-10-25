// These tests sign in with user #2 and user #3

import SeleniumHelper from './selenium-helpers.js';

const {
    findByXpath,
    buildDriver,
    clickXpath,
    clickText,
    signIn
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
const studioId = process.env.TEST_STUDIO_ID || 10004360;
const studioUrl = `${rootUrl}/studios/${studioId}`;
const myStuffURL = `${rootUrl}/mystuff`;
const rateLimitCheck = process.env.RATE_LIMIT_CHECK || rootUrl;

// since the usernames end in 2 and 3 we're using username2 and username3
// username 1 is used in other tests.  Hopefully this is not confusing.
const username2 = `${process.env.SMOKE_USERNAME}2`;
const username3 = `${process.env.SMOKE_USERNAME}3`;
const password = process.env.SMOKE_PASSWORD;

let promoteStudioURL;
let curatorTab;

jest.setTimeout(70000);

let driver;

describe('studio page while signed out', () => {
    beforeAll(async () => {
        // expect(projectUrl).toBe(defined);
        driver = await buildDriver('www-integration studio-page signed out');
        await driver.get(rootUrl);
    });

    beforeEach(async () => {
        await driver.get(studioUrl);
        const studioNav = await findByXpath('//div[@class="studio-tabs"]');
        await studioNav.isDisplayed();
    });

    afterAll(() => driver.quit());

    test('land on projects tab', async () => {
        await driver.get(studioUrl);
        const projectGrid = await findByXpath('//div[@class="studio-projects-grid"]');
        const projectGridDisplayed = await projectGrid.isDisplayed();
        expect(projectGridDisplayed).toBe(true);
    });

    test('studio title', async () => {
        const studioTitle = await findByXpath('//div[@class="studio-title"]');
        const titleText = await studioTitle.getText();
        expect(titleText).toEqual('studio for automated testing');
    });

    test('studio description', async () => {
        const xpath = '//div[contains(@class, "studio-description")]';
        const studioDescription = await findByXpath(xpath);
        const descriptionText = await studioDescription.getText();
        expect(descriptionText).toEqual('a description');
    });
});

describe('studio management', () => {
    // These tests all start on the curators tab of a studio and signed out

    beforeAll(async () => {
        driver = await buildDriver('www-integration studio management');
        await driver.get(rootUrl);

        // create a studio for tests
        await signIn(username2, password);
        await findByXpath('//span[contains(@class, "profile-name")]');
        await driver.get(rateLimitCheck);
        await driver.get(myStuffURL);
        await clickXpath('//form[@id="new_studio"]/button[@type="submit"]');
        await findByXpath('//div[@class="studio-tabs"]');
        promoteStudioURL = await driver.getCurrentUrl();
        curatorTab = `${promoteStudioURL}curators`;
    });

    beforeEach(async () => {
        await clickXpath('//a[contains(@class, "user-info")]');
        await clickText('Sign out');
        await driver.get(curatorTab);
        await findByXpath('//div[@class="studio-tabs"]');
    });

    afterAll(() => driver.quit());

    test('invite a curator', async () => {
        // sign in as user2
        await signIn(username2, password);
        await findByXpath('//span[contains(@class, "profile-name")]');

        // invite user3 to curate
        const inviteBox = await findByXpath('//div[@class="studio-adder-row"]/input');
        await inviteBox.sendKeys(username3);
        await clickXpath('//div[@class="studio-adder-row"]/button');
        const inviteAlert = await findByXpath('//div[@class="alert-msg"]'); // the confirm alert
        const alertText = await inviteAlert.getText();
        const successText = `Curator invite sent to "${username3}"`;
        expect(alertText).toMatch(successText);
    });

    test('accept curator invite', async () => {
        // Sign in user3
        await signIn(username3, password);
        await findByXpath('//span[contains(@class, "profile-name")]');

        // accept the curator invite
        await clickXpath('//button[@class="studio-invitation-button button"]');
        const acceptSuccess = await findByXpath('//div[contains(@class,"studio-info-box-success")]');
        const acceptSuccessVisible = await acceptSuccess.isDisplayed();
        expect(acceptSuccessVisible).toBe(true);
    });

    test('promote to manager', async () => {
        // sign in as user2
        await signIn(username2, password);
        await findByXpath('//span[contains(@class, "profile-name")]');
        // for some reason the user isn't showing up without waiting and reloading the page
        await driver.sleep(2000);
        await driver.get(curatorTab);

        // promote user3
        const user3href = `/users/${username3}`;
        // click kebab menu on the user tile
        const kebabMenuXpath = `//a[@href = "${user3href}"]/following-sibling::div[@class="overflow-menu-container"]`;
        await clickXpath(`${kebabMenuXpath}/button[@class="overflow-menu-trigger"]`);
        // click promote
        // await clickXpath('//button[@class="promote-menu-button"]'); //<-- I think this will do it
        await clickXpath(`${kebabMenuXpath}/ul/li/button/span[contains(text(), "Promote")]/..`);
        await findByXpath('//div[@class="promote-content"]');
        // await clickXpath(//button[contains(@class="promote-button")]) <-- add this selector to the button
        await clickXpath('//div[@class="promote-button-row"]/button/span[contains(text(),"Promote")]/..');
        const promoteSuccess = await findByXpath('//div[contains(@class, "alert-success")]');
        const promoteSuccessVisible = await promoteSuccess.isDisplayed();
        expect(promoteSuccessVisible).toBe(true);
    });

    test('transfer studio host', async () => {
        // sign in as user2
        await signIn(username2, password);
        await findByXpath('//span[contains(@class, "profile-name")]');
        // for some reason the user isn't showing up without reloading the page
        await driver.get(curatorTab);

        // open kebab menu
        const user2href = `/users/${username2}`;
        // click kebab menu on the user tile
        const kebabMenuXpath = `//a[@href = "${user2href}"]/following-sibling::div[@class="overflow-menu-container"]`;
        await clickXpath(`${kebabMenuXpath}/button[@class="overflow-menu-trigger"]`);

        // click transfer in dropdown
        await clickXpath('//button[@class="studio-member-tile-menu-wide"]');
        await findByXpath('//div[contains(@class, "transfer-info-title")]');

        // click next button
        await clickXpath('//button[contains(@class, "next-button")]');
        await findByXpath('//div[@class="transfer-selection-heading"]');

        // click user tile
        await clickXpath(`//div[contains(text(), "${username3}")]`);
        await findByXpath('//div[contains(@class, "transfer-host-name-selected")]');

        // click next button
        await clickXpath('//button[contains(@class, "next-button")]');
        await findByXpath('//div[@class="transfer-outcome"]');

        // enter password
        const passwordInput = await findByXpath('//input[@class="transfer-password-input"]');
        await passwordInput.sendKeys(password);
        await findByXpath(`//input[@value="${password}"]`);

        // click confirm
        // await clickXpath('//button[contains(@class, "confirm-transfer-button")]')
        await clickXpath('//span[contains(text(), "Confirm")]/..');
        const transferSuccess = await findByXpath('//div[contains(@class, "alert-success")]');
        const successVisible = await transferSuccess.isDisplayed();
        expect(successVisible).toBe(true);
    });
});
