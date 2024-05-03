module.exports.constants = {
    nextStepXpath: '//button[span[contains(text(), "Next Step")]]',
    generalErrorMessageXpath: '//span[@class="help-block validation-message"]/span[contains(text(),' +
        '"This field is required")]',
    loremIpsumTextLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra' +
     'nec mauris efficitur tincidunt. Vestibulum ut diam odio. Cum sociis natoque penatibus et magnis dis' +
     'parturient montes, nascetur ridiculus mus. Morbi non enim dolor. Vestibulum at enim vestibulum, ullamcorper' +
     'Duis eget quam pharetra, ultricies est eu, pharetra nisi. In tempor cursus nisi, non sagittis quam gravida.'
};

module.exports.fillUsernameSlide = function (driver, seleniumWebdriver) {
    const passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    const usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    const usernamePromise = usernameInput.sendKeys('clipspringer');
    const passwordPromise = passwordInput.sendKeys('educators');
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    return Promise.all([usernamePromise, passwordPromise]).then(() => { // eslint-disable-line no-undef
        nextStepButton.click().then(() => {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('demographics-step')));
        });
    });
};

module.exports.fillDemographicsSlide = function (driver, seleniumWebdriver) {
    const clickMaleInput = driver.findElement(seleniumWebdriver.By.xpath('//input[@value="male"' +
        'and @type="radio"]')).click();
    const selectCountry = driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]' +
        '/option[@value="us"]')).click();
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    return Promise.all([clickMaleInput, selectCountry]).then(() => { // eslint-disable-line no-undef
        nextStepButton.click().then(() => {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('name-step')));
        });
    });
};

module.exports.fillNameSlide = function (driver, seleniumWebdriver) {
    const firstNamePromise = driver.findElement(seleniumWebdriver.By.name('user.name.first')).sendKeys('first');
    const lastNamePromise = driver.findElement(seleniumWebdriver.By.name('user.name.last')).sendKeys('surname');
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    return Promise.all([firstNamePromise, lastNamePromise]).then(() => { // eslint-disable-line no-undef
        nextStepButton.click().then(() => {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('phone-step')));
        });
    });
};

module.exports.fillPhoneSlide = function (driver, seleniumWebdriver) {
    const phoneInput = driver.findElement(seleniumWebdriver.By.xpath('//input[@type="tel"]'));
    const consentCheckbox = driver.findElement(seleniumWebdriver.By.name('phoneConsent'));
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    const phoneNumberPromise = phoneInput.sendKeys('6172535960');
    const consentPromise = consentCheckbox.click();
    return Promise.all([phoneNumberPromise, consentPromise]).then(() => { // eslint-disable-line no-undef
        nextStepButton.click().then(() => {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('organization-step')));
        });
    });
};

module.exports.fillOrganizationSlide = function (driver, seleniumWebdriver) {
    const organizationInput = driver.findElement(seleniumWebdriver.By.name('organization.name'));
    const titleInput = driver.findElement(seleniumWebdriver.By.name('organization.title'));
    const typeCheckbox = driver.findElement(seleniumWebdriver.By.xpath('//input[@type="checkbox" and @value="3"]'));
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    const organizationPromise = organizationInput.sendKeys('MIT Media Lab');
    const titlePromise = titleInput.sendKeys('Software Developer');
    const typePromise = typeCheckbox.click();
    return Promise.all([organizationPromise, titlePromise, typePromise]) // eslint-disable-line no-undef
        .then(() => {
            nextStepButton.click().then(() => {
                driver.wait(seleniumWebdriver.until
                    .elementLocated(seleniumWebdriver.By.className('address-step')));
            });
        });
};

module.exports.fillAddressSlide = function (driver, seleniumWebdriver) {
    const addressInput = driver.findElement(seleniumWebdriver.By.name('address.line1'));
    const cityInput = driver.findElement(seleniumWebdriver.By.name('address.city'));
    const zipCodeInput = driver.findElement(seleniumWebdriver.By.name('address.zip'));
    const nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    const addressPromise = addressInput.sendKeys('77 Massachusetts Avenue, E14/E15');
    const cityPromise = cityInput.sendKeys('Cambridge');
    const statePromise = driver.findElement(seleniumWebdriver.By.xpath('//select[@name="address.state"]' +
        '/option[@value="us-ma"]')).click();
    const zipPromise = zipCodeInput.sendKeys('02139');
    return Promise.all([addressPromise, cityPromise, statePromise, zipPromise]) // eslint-disable-line no-undef
        .then(() => {
            nextStepButton.click().then(() => {
                driver.wait(seleniumWebdriver.until
                    .elementLocated(seleniumWebdriver.By.className('usescratch-step')));
            });
        });
};
