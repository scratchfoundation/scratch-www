module.exports.constants = {
    'nextStepXpath': '//button[span[contains(text(), "Next Step")]]',
    'generalErrorMessageXpath': '//span[@class="help-block validation-message" and contains(text(),'
        + '"This field is required")]'
};

module.exports.fillUsernameSlide = function (driver, seleniumWebdriver) {
    var passwordInput = driver.findElement(seleniumWebdriver.By.name('user.password'));
    var usernameInput = driver.findElement(seleniumWebdriver.By.name('user.username'));
    var usernamePromise = usernameInput.sendKeys('clipspringer');
    var passwordPromise = passwordInput.sendKeys('educators');
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath('//button[span[contains(text(),'
        + '"Next Step")]]'));
    return Promise.all([usernamePromise, passwordPromise]).then(function () {
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
        '/option[2]')).click();
    var nextStepButton = driver.findElement(seleniumWebdriver.By.xpath(module.exports.constants.nextStepXpath));
    return Promise.all([clickMaleInput, selectCountry]).then(function () {
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
    return Promise.all([firstNamePromise, lastNamePromise]).then(function () {
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
    var consentPromise =  consentCheckbox.click();
    return Promise.all([phoneNumberPromise, consentPromise]).then(function () {
        nextStepButton.click().then(function () {
            driver.wait(seleniumWebdriver.until
                .elementLocated(seleniumWebdriver.By.className('organization-step')));
        });
    });
};
