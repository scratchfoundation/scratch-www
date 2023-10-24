// these tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    buildDriver,
    clickText,
    containsClass,
    findByXpath
} = new SeleniumHelper();

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
const statisticsPage = `${rootUrl}/statistics`;

jest.setTimeout(60000);

let driver;

describe('www-integration statistics page', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration statistics page');
    });

    beforeEach(async () => {
        await driver.get(statisticsPage);
    });

    afterAll(() => driver.quit());

    test('check Monthly Activity Trends title', async () => {
        const chartTitle = await findByXpath('//div[contains(@class, "box0")]//h3');
        const chartTitleText = await chartTitle.getText();
        expect(chartTitleText).toBe('Monthly Activity Trends');
    });

    test('New Projects label on first chart defaults to selected', async () => {
        const toggleXpath = `(//div[@id="activity_chart"]/*[name()='svg']/*[name()='g']/*[name()='g']/*` +
            `[name()='g'])[4]/*[name()='g']/*[name()='g']/*[name()='g']`;
        const newProjectsToggle = await findByXpath(toggleXpath);
        const toggleState = await containsClass(newProjectsToggle, 'nv-disabled');
        expect(toggleState).toBe(false);


    });

    test('New Projects label on first chart can be toggled', async () => {
        const toggleXpath = `(//div[@id="activity_chart"]/*[name()='svg']/*[name()='g']/*[name()='g']/*` +
            `[name()='g'])[4]/*[name()='g']/*[name()='g']/*[name()='g']`;
        const newProjectsToggle = await findByXpath(toggleXpath);

        // toggle off New Projects
        await clickText('New Projects');
        let toggleState = await containsClass(newProjectsToggle, 'nv-disabled');
        expect(toggleState).toBe(true);

        // toggle New Projects on again
        await clickText('New Projects');
        toggleState = await containsClass(newProjectsToggle, 'nv-disabled');
        expect(toggleState).toBe(false);
    });
});
