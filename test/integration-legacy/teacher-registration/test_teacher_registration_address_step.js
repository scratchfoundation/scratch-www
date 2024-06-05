/*
 * Checks the behavior of the address step in the educators registration process
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Testing-Scratch-www#All_Test_Cases_Teacher_Join_Flow
 */
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

tap.beforeEach(function () {
    driver.get(`${rootUrl}/educators/register`);
    return utils.fillUsernameSlide(driver, seleniumWebdriver)
        .then(utils.fillDemographicsSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillNameSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillPhoneSlide.bind(this, driver, seleniumWebdriver)) // eslint-disable-line no-invalid-this
        .then(utils.fillOrganizationSlide.bind(this, driver, seleniumWebdriver)); // eslint-disable-line no-invalid-this
});

// Selects Vatican City as the country, and checks that the state dropdown disappears
tap.test('checkStateDropdownOnlyPresentWhenNeeded', t => {
    driver.findElement(seleniumWebdriver.By.xpath('//select[@name="address.country"]' +
        '/option[@value="va"]')).click() // select Vatican City as the country
        .then(() => {
            driver.findElements(seleniumWebdriver.By.name('address.state'))
                .then(stateDropdown => {
                    t.equal(stateDropdown.length, 0);
                    t.end();
                });
        });
});

tap.test('checkZipCodeRequired', t => {
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(constants.nextStepXpath));
    const errorMessageXPath = '//input[@name="address.zip"]/following-sibling::' +
        'span[@class="help-block validation-message"]/span[contains(text(),' +
        '"This field is required")]';
    nextStepButton.click().then(() => {
        driver.findElements(seleniumWebdriver.By.xpath(errorMessageXPath))
            .then(validationMessages => {
                t.equal(validationMessages.length, 1);
                t.end();
            });
    });
});
