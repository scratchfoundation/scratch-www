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
    var passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    var usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    var usernamePromise = usernameInput.sendKeys('clipspringer');
    var passwordPromise = passwordInput.sendKeys('educators');
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    return Promise.all([usernamePromise, passwordPromise]).then(function () { // eslint-disable-line no-undef
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('demographics-step')));
        });
    });
};

module.exports.fillDemographicsSlide = function (driver, seleniumWebdriver) {
    var clickMaleInput = driver.findElement(seleniumWebdriver.By.xpath('//input[@value="male"' +
        'and @type="radio"]')).click();
    var selectCountry = driver.findElement(seleniumWebdriver.By.xpath('//select[@name="user.country"]' +
        '/option[@value="us"]')).click();
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    return Promise.all([clickMaleInput, selectCountry]).then(function () { // eslint-disable-line no-undef
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('name-step')));
        });
    });
};

module.exports.fillNameSlide = function (driver, seleniumWebdriver) {
    var firstNamePromise = driver.findElement(seleniumWebdriver.By.name('user.name.first')).sendKeys('first');
    var lastNamePromise = driver.findElement(seleniumWebdriver.By.name('user.name.last')).sendKeys('surname');
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    return Promise.all([firstNamePromise, lastNamePromise]).then(function () { // eslint-disable-line no-undef
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('phone-step')));
        });
    });
};

module.exports.fillPhoneSlide = function (driver, seleniumWebdriver) {
    var phoneInput = driver.findElement(seleniumWebdriver.By.xpath('//input[@type="tel"]'));
    var consentCheckbox = driver.findElement(seleniumWebdriver.By.name('phoneConsent'));
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    var phoneNumberPromise = phoneInput.sendKeys('6172535960');
    var consentPromise = consentCheckbox.click();
    return Promise.all([phoneNumberPromise, consentPromise]).then(function () { // eslint-disable-line no-undef
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('organization-step')));
        });
    });
};

module.exports.fillOrganizationSlide = function (driver, seleniumWebdriver) {
    var organizationInput = driver.findElement(seleniumWebdriver.By.name('organization.name'));
    var titleInput = driver.findElement(seleniumWebdriver.By.name('organization.title'));
    var typeCheckbox = driver.findElement(seleniumWebdriver.By.xpath('//input[@type="checkbox" and @value="3"]'));
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    var organizationPromise = organizationInput.sendKeys('MIT Media Lab');
    var titlePromise = titleInput.sendKeys('Software Developer');
    var typePromise = typeCheckbox.click();
    return Promise.all([organizationPromise, titlePromise, typePromise]) // eslint-disable-line no-undef
        .then(function () {
            nextStepButton.click().then(function () {
                driver.wait(seleniumWebdriver.until
                    .elementLocated(seleniumWebdriver.By.className('address-step')));
            });
        });
};

module.exports.fillAddressSlide = function (driver, seleniumWebdriver) {
    var addressInput = driver.findElement(seleniumWebdriver.By.name('address.line1'));
    var cityInput = driver.findElement(seleniumWebdriver.By.name('address.city'));
    var zipCodeInput = driver.findElement(seleniumWebdriver.By.name('address.zip'));
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    var addressPromise = addressInput.sendKeys('77 Massachusetts Avenue, E14/E15');
    var cityPromise = cityInput.sendKeys('Cambridge');
    var statePromise = driver.findElement(seleniumWebdriver.By.xpath('//select[@name="address.state"]' +
        '/option[@value="us-ma"]')).click();
    var zipPromise = zipCodeInput.sendKeys('02139');
    return Promise.all([addressPromise, cityPromise, statePromise, zipPromise]) // eslint-disable-line no-undef
        .then(function () {
            nextStepButton.click().then(function () {
                driver.wait(seleniumWebdriver.until
                    .elementLocated(seleniumWebdriver.By.className('usescratch-step')));
            });
        });
};
