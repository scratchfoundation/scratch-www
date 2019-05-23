const webdriver = require('selenium-webdriver');
const bindAll = require('lodash.bindall');
require('chromedriver');

const headless = process.env.SMOKE_HEADLESS || false;
const remote = process.env.SMOKE_REMOTE || false;
const ci = process.env.CI || false;
const buildID = process.env.TRAVIS_BUILD_NUMBER;
const {SAUCE_USERNAME, SAUCE_ACCESS_KEY} = process.env;
const {By, Key, until} = webdriver;

class SeleniumHelper {
    constructor () {
        bindAll(this, [
            'getDriver',
            'getSauceDriver',
            'getKey',
            'buildDriver',
            'clickXpath',
            'findByXpath',
            'clickText',
            'findText',
            'clickButton',
            'findByCss',
            'clickCss',
            'urlMatches',
            'getLogs'
        ]);
    }
    buildDriver (name) {
        if (remote === 'true'){
            let nameToUse;
            if (ci === 'true'){
                nameToUse = 'travis ' + buildID + ' : ' + name;
            } else {
                nameToUse = name;
            }
            this.driver = this.getSauceDriver(SAUCE_USERNAME, SAUCE_ACCESS_KEY, nameToUse);
        } else {
            this.driver = this.getDriver();
        }
        return this.driver;
    }

    getDriver () {
        const chromeCapabilities = webdriver.Capabilities.chrome();
        let args = [];
        if (headless) {
            args.push('--headless');
            args.push('window-size=1024,1680');
            args.push('--no-sandbox');
        }
        chromeCapabilities.set('chromeOptions', {args});
        let driver = new webdriver.Builder()
            .forBrowser('chrome')
            .withCapabilities(chromeCapabilities)
            .build();
        return driver;
    }

    getSauceDriver (username, accessKey, name) {
        // Driver configs can be generated with the Sauce Platform Configurator
        // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
        let driverConfig = {
            browserName: 'chrome',
            platform: 'macOS 10.13',
            version: '70.0'
        };
        var driver = new webdriver.Builder()
            .withCapabilities({
                browserName: driverConfig.browserName,
                platform: driverConfig.platform,
                version: driverConfig.version,
                username: username,
                accessKey: accessKey,
                name: name
            })
            .usingServer(`http://${username}:${accessKey
            }@ondemand.saucelabs.com:80/wd/hub`)
            .build();
        return driver;
    }

    getKey (keyName) {
        return Key[keyName];
    }

    findByXpath (xpath) {
        return this.driver.wait(until.elementLocated(By.xpath(xpath), 5 * 1000));
    }

    clickXpath (xpath) {
        return this.findByXpath(xpath).then(el => el.click());
    }

    clickText (text) {
        return this.clickXpath(`//*[contains(text(), '${text}')]`);
    }

    findText (text) {
        return this.driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${text}')]`), 5 * 1000));
    }

    clickButton (text) {
        return this.clickXpath(`//button[contains(text(), '${text}')]`);
    }

    findByCss (css) {
        return this.driver.wait(until.elementLocated(By.css(css), 1000 * 5));
    }

    clickCss (css) {
        return this.findByCss(css).then(el => el.click());
    }

    urlMatches (regex) {
        return this.driver.wait(until.urlMatches(regex), 1000 * 5);
    }

    getLogs (whitelist) {
        return this.driver.manage()
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
    }

}

module.exports = SeleniumHelper;
