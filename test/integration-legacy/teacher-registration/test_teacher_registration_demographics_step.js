/*
 * Checks the behavior of demographics step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const tap = require('tap');

const utils = require('./teacher_registration_utils.js');
const constants = utils.constants;

// Set test url through environment variable
const rootUrl = process.env.ROOT_URL || 'http://localhost:8333';

// chrome driver
const driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome())
    .build();

tap.plan(2);

tap.tearDown(() => {
    driver.quit();
});

tap.beforeEach(() => {
    driver.get(`${rootUrl}/educators/register`);
    return utils.fillUsernameSlide(driver, seleniumWebdriver);
});

// if the user selects the other gender option, they must input a gender
// selects the other gender option and attempt to advance the slide
tap.test('checkOtherGenderInput', t => {
    const otherGenderRadio = driver.findElement(seleniumWebdriver.By.xpath('//input[@value="other"' +
        'and @type="radio"]'));
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]/option[2]')).click();
    otherGenderRadio.click().then(() => {
        nextStepButton.click().then(() => {
            driver.findElements(seleniumWebdriver.By.xpath(constants.generalErrorMessageXpath))
                .then(validationMessages => {
                    t.equal(validationMessages.length, 1);
                    t.end();
                });
        });
    });
});

// the user must select a gender
// tries to advance the slide without selecting a gender
tap.test('checkNoGenderInput', t => {
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]/option[2]')).click();
    nextStepButton.click().then(() => {
        driver.findElements(seleniumWebdriver.By.xpath(constants.generalErrorMessageXpath))
            .then(validationMessages => {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});
