var webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const {By, until} = webdriver;

const findByXpath = (xpath) => {
    return driver.wait(until.elementLocated(By.xpath(xpath), 5 * 1000));
};

const clickXpath = (xpath) => {
    return findByXpath(xpath).then(el => el.click());
};

const clickText = (text) => {
    return clickXpath(`//*[contains(text(), '${text}')]`);
};

const findText = (text) => {
    return driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${text}')]`), 5 * 1000));
};

const clickButton = (text) => {
    return clickXpath(`//button[contains(text(), '${text}')]`);
};

const findByCss = (css) => {
    return driver.wait(until.elementLocated(By.css(css), 1000 * 5));
};

const clickCss = (css) => {
    return findByCss(css).then(el => el.click());
};

const getLogs = (whitelist) => {
    return driver.manage()
        .logs()
        .get('browser')
        .then((entries) => {
            return entries.filter((entry) => {
                const message = entry.message;
                for (let i = 0; i < whitelist.length; i++) {
                    if (message.indexOf(whitelist[i]) !== -1) {
                        // eslint-disable-next-line no-console
                        // console.warn('Ignoring whitelisted error: ' + whitelist[i]);
                        return false;
                    } else if (entry.level !== 'SEVERE') {
                        // eslint-disable-next-line no-console
                        // console.warn('Ignoring non-SEVERE entry: ' + message);
                        return false;
                    }
                    return true;
                }
                return true;
            });
        });
};

module.exports = {
    webdriver,
    By,
    until,
    driver,
    clickXpath,
    findByXpath,
    clickText,
    findText,
    clickButton,
    findByCss,
    clickCss,
    getLogs
};
