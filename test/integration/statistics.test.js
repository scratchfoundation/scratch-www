// these tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickText,
    containsClass,
    findByXpath
} = new SeleniumHelper();

let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let statisticsPage = rootUrl + '/statistics';

jest.setTimeout(60000);

let driver;

describe('www-integration statistics page', async () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration statistics page');
    });

    beforeEach(async () => {
        await driver.get(statisticsPage);
    });

    afterAll(async () => await driver.quit());

    test('check Monthly Activity Trends title', async () => {
        let chartTitle = await findByXpath('//div[contains(@class, "box0")]//h3');
        let chartTitleText = await chartTitle.getText();
        await expect(chartTitleText).toBe('Monthly Activity Trends');
    });

    test('New Projects label on first chart defaults to selected', async () => {
        let toggleXpath = `(//div[@id="activity_chart"]/*[name()='svg']/*[name()='g']/*[name()='g']/*` +
            `[name()='g'])[4]/*[name()='g']/*[name()='g']/*[name()='g']`;
        let newProjectsToggle = await findByXpath(toggleXpath);
        let toggleState = await containsClass(newProjectsToggle, 'nv-disabled');
        await expect(toggleState).toBe(false);


    });

    test('New Projects label on first chart can be toggled', async () => {
        let toggleXpath = `(//div[@id="activity_chart"]/*[name()='svg']/*[name()='g']/*[name()='g']/*` +
            `[name()='g'])[4]/*[name()='g']/*[name()='g']/*[name()='g']`;
        let newProjectsToggle = await findByXpath(toggleXpath);

        // toggle off New Projects
        await clickText('New Projects');
        let toggleState = await containsClass(newProjectsToggle, 'nv-disabled');
        await expect(toggleState).toBe(true);

        // toggle New Projects on again
        await clickText('New Projects');
        toggleState = await containsClass(newProjectsToggle, 'nv-disabled');
        await expect(toggleState).toBe(false);
    });
});
