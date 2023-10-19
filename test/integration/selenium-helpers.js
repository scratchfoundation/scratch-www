jest.setTimeout(30000); // eslint-disable-line no-undef

const webdriver = require('selenium-webdriver');
const {PageLoadStrategy} = require('selenium-webdriver/lib/capabilities');
const bindAll = require('lodash.bindall');
require('chromedriver');
const chromedriverVersion = require('chromedriver').version;

const headless = process.env.SMOKE_HEADLESS || false;
const remote = process.env.SMOKE_REMOTE || false;
const ci = process.env.CI || false;
const usingCircle = process.env.CIRCLECI || false;
const buildID = process.env.CIRCLE_BUILD_NUM || '0000';
const {SAUCE_USERNAME, SAUCE_ACCESS_KEY} = process.env;
const {By, Key, until} = webdriver;

// The main reason for this timeout is so that we can control the timeout message and report details;
// if we hit the Jasmine default timeout then we get a terse message that we can't control.
// The Jasmine default timeout is 30 seconds so make sure this is lower.
const DEFAULT_TIMEOUT_MILLISECONDS = 20 * 1000;

/**
 * An error that can be chained to another error.
 * @extends Error
 */
class ChainableError extends Error {
    /**
     * Instantiate a new ChainableError.
     * @param {string} message The error message for this layer.
     */
    constructor (message) {
        super(message);
        this.baseMessage = message;
        Object.setPrototypeOf(this, ChainableError.prototype); // see https://stackoverflow.com/a/41102306
        this.name = 'ChainableError';
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Add a new layer to the error chain.
     * @param {Error} innerError The error to add to the chain.
     * @returns {ChainableError} This error, with the new layer added.
     */
    chain (innerError) {
        this.innerError = innerError;

        const messages = [];
        this.collectMessages(messages);
        this.message = messages.join('\n');

        return this;
    }

    /**
     * Collect all the error messages in the chain.
     * @param {Array<string>} lines The array to collect the messages into.
     */
    collectMessages (lines) {
        lines.push(this.baseMessage);
        if (this.innerError) {
            if (this.innerError.collectMessages) {
                this.innerError.collectMessages(lines);
            } else {
                lines.push(this.innerError.baseMessage || this.innerError.message);
            }
        }
    }
}

/**
 * An error thrown by SeleniumHelper.
 * @extends ChainableError
 */
class SeleniumHelperError extends ChainableError {
    /**
     * Instantiate a new SeleniumHelperError.
     * @param {string} message The error message for this layer.
     * @param {Array} [kvList] Optional keys & values to add to the error message, for example to capture arguments.
     * @example
     * const e = new SeleniumHelperError('something failed', [{xpath}, {somethingElse}])
     * try {
     *   doThings();
     * } catch (inner) {
     *   await e.collectContext(driver);
     *   throw e.chain(inner);
     * }
     */
    constructor (message, kvList = []) {
        const baseMessage = [
            message,
            ...kvList.map(kv => `\t${Object.keys(kv)[0]}: ${Object.values(kv)[0]}`)
        ].join('\n');
        super(baseMessage);
        Object.setPrototypeOf(this, SeleniumHelperError.prototype); // see https://stackoverflow.com/a/41102306
        this.name = 'SeleniumHelperError';
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Collect error context from the webdriver.
     * @param {webdriver.ThenableWebDriver} driver The webdriver instance.
     * @returns {Promise} A promise that resolves when the context is collected.
     */
    async collectContext (driver) {
        // It would be really nice to wait until `message` time to collect all this information,
        // but that's not an option because of all these async calls.
        const url = await driver.getCurrentUrl();
        const title = await driver.getTitle();
        // const pageSource = await driver.getPageSource();
        const browserLogEntries = await driver.manage()
            .logs()
            .get('browser');
        const browserLogText = browserLogEntries.map(entry => entry.message).join('\n');
        this.contextLines = [
            `Browser URL: ${url}`,
            `Browser title: ${title}`,
            `Browser logs:\n*****\n${browserLogText}\n*****`
            // `Browser page source:\n*****\n${pageSource}\n*****`
        ];
    }

    chain (innerError) {
        super.chain(innerError); // rebuilds the message
        let messageLines = [
            this.message
        ];
        if (this.innerError && this.innerError.contextLines) {
            this.contextLines = this.innerError.contextLines;
        }
        if (this.contextLines) {
            messageLines = messageLines.concat(this.contextLines);
        } else {
            messageLines.push('(no webdriver context collected)');
        }
        this.message = messageLines.join('\n');
        return this;
    }
}

class SeleniumHelper {
    constructor () {
        bindAll(this, [
            'buildDriver',
            'clickButton',
            'clickCss',
            'clickText',
            'clickXpath',
            'containsClass',
            'dragFromXpathToXpath',
            'findByCss',
            'findByXpath',
            'findText',
            'getKey',
            'getDriver',
            'getLogs',
            'getSauceDriver',
            'signIn',
            'urlMatches',
            'waitUntilGone'
        ]);

        // Tests call this static function as if it were a method on an instance.
        this.waitUntilVisible = SeleniumHelper.waitUntilVisible;

        // this type declaration suppresses IDE type warnings throughout this file
        /** @type {webdriver.ThenableWebDriver} */
        this.driver = null;
    }

    /**
     * Build a new webdriver instance. This will use Sauce Labs if the SMOKE_REMOTE environment variable is 'true', or
     * `chromedriver` otherwise.
     * @param {string} name The name to give to Sauce Labs.
     * @returns {webdriver.ThenableWebDriver} The new webdriver instance.
     */
    buildDriver (name) {
        if (remote === 'true'){
            let nameToUse;
            if (ci === 'true'){
                const ciName = usingCircle ? 'circleCi ' : 'unknown ';
                nameToUse = `${ciName + buildID} : ${name}`;
            } else {
                nameToUse = name;
            }
            this.driver = this.getSauceDriver(SAUCE_USERNAME, SAUCE_ACCESS_KEY, nameToUse);
        } else {
            this.driver = this.getDriver();
        }
        return this.driver;
    }

    /**
     * Build a new webdriver instance using `chromedriver`.
     * You should probably use `buildDriver` instead.
     * @returns {webdriver.ThenableWebDriver} The new webdriver instance.
     */
    getDriver () {
        const chromeCapabilities = webdriver.Capabilities.chrome();
        const args = [];
        if (headless) {
            args.push('--headless');
            args.push('window-size=1024,1680');
            args.push('--no-sandbox');
        }
        chromeCapabilities.set('chromeOptions', {args});
        chromeCapabilities.setPageLoadStrategy(PageLoadStrategy.EAGER);
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .withCapabilities(chromeCapabilities)
            .build();
        return driver;
    }

    /**
     * @returns {string} The version of chromedriver being used.
     */
    getChromeVersionNumber () {
        const versionFinder = /\d+\.\d+/;
        const versionArray = versionFinder.exec(chromedriverVersion);
        if (versionArray === null) {
            throw new Error('couldn\'t find version of chromedriver');
        }
        return versionArray[0];
    }

    /**
     * Build a new webdriver instance using Sauce Labs.
     * You should probably use `buildDriver` instead.
     * @param {string} username The Sauce Labs username.
     * @param {string} accessKey The Sauce Labs access key.
     * @param {string} name The name to give to Sauce Labs.
     * @returns {webdriver.ThenableWebDriver} The new webdriver instance.
     */
    getSauceDriver (username, accessKey, name) {
        const chromeVersion = this.getChromeVersionNumber();
        // Driver configs can be generated with the Sauce Platform Configurator
        // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
        const driverConfig = {
            browserName: 'chrome',
            platform: 'macOS 10.15',
            version: chromeVersion
        };
        const driver = new webdriver.Builder()
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

    /**
     * Retrieves a key string by name.
     * @example
     * getKey('ENTER') // => '\uE007'
     * @param {string} keyName The name of the key to retrieve.
     * @returns {string} The key.
     */
    getKey (keyName) {
        return Key[keyName];
    }

    /**
     * Find an element by xpath.
     * @param {string} xpath The xpath to search for.
     * @returns {Promise<webdriver.WebElement>} A promise that resolves to the element.
     */
    async findByXpath (xpath) {
        const outerError = new SeleniumHelperError('findByXpath failed', [{xpath}]);
        try {
            const el = await this.driver.wait(until.elementLocated(By.xpath(xpath)), DEFAULT_TIMEOUT_MILLISECONDS);
            await this.driver.wait(el.isDisplayed(), DEFAULT_TIMEOUT_MILLISECONDS);
            return el;
        } catch (cause) {
            await outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * @param {webdriver.WebElement} element Wait until this element is gone (stale).
     * @returns {Promise} A promise that resolves when the element is gone.
     */
    async waitUntilGone (element) {
        const outerError = new SeleniumHelperError('waitUntilGone failed', [{element}]);
        try {
            await this.driver.wait(until.stalenessOf(element));
        } catch (cause) {
            await outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Wait until an element can be found by the provided xpath, then click on it.
     * @param {string} xpath The xpath to click.
     * @returns {Promise} A promise that resolves when the element is clicked.
     */
    async clickXpath (xpath) {
        const outerError = new SeleniumHelperError('clickXpath failed', [{xpath}]);
        try {
            const el = await this.findByXpath(xpath);
            await el.click();
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Wait until an element can be found by the provided text, then click on it.
     * @param {string} text The text to click.
     * @returns {Promise} A promise that resolves when the element is clicked.
     */
    async clickText (text) {
        const outerError = new SeleniumHelperError('clickText failed', [{text}]);
        try {
            await this.clickXpath(`//*[contains(text(), '${text}')]`);
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Wait until an element can be found by the provided text.
     * @param {string} text The text to find.
     * @returns {Promise<webdriver.WebElement>} The element containing the text.
     */
    async findText (text) {
        const outerError = new SeleniumHelperError('findText failed', [{text}]);
        try {
            return await this.driver.wait(
                until.elementLocated(By.xpath(`//*[contains(text(), '${text}')]`)),
                DEFAULT_TIMEOUT_MILLISECONDS
            );
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Wait until a button can be found by the provided text, then click on it.
     * @param {string} text The button text to find and click.
     * @returns {Promise} A promise that resolves when the button is clicked.
     */
    async clickButton (text) {
        const outerError = new SeleniumHelperError('clickButton failed', [{text}]);
        try {
            await this.clickXpath(`//button[contains(text(), '${text}')]`);
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Wait until an element can be found by the provided CSS selector.
     * @param {string} css The CSS selector to find.
     * @returns {Promise<webdriver.WebElement>} The element matching the CSS selector.
     */
    async findByCss (css) {
        const outerError = new SeleniumHelperError('findByCss failed', [{css}]);
        try {
            return await this.driver.wait(until.elementLocated(By.css(css)), DEFAULT_TIMEOUT_MILLISECONDS);
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Wait until an element can be found by the provided CSS selector, then click on it.
     * @param {string} css The CSS selector to find and click.
     * @returns {Promise} A promise that resolves when the element is clicked.
     */
    async clickCss (css) {
        const outerError = new SeleniumHelperError('clickCss failed', [{css}]);
        try {
            const el = await this.findByCss(css);
            await el.click();
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Wait until the two elements can be found, then drag from the first to the second.
     * @param {string} startXpath The xpath to drag from.
     * @param {string} endXpath The xpath to drag to.
     * @returns {Promise} A promise that resolves when the drag is complete.
     */
    async dragFromXpathToXpath (startXpath, endXpath) {
        const outerError = new SeleniumHelperError('dragFromXpathToXpath failed', [{startXpath}, {endXpath}]);
        try {
            const startEl = await this.findByXpath(startXpath);
            const endEl = await this.findByXpath(endXpath);
            await this.driver.actions()
                .dragAndDrop(startEl, endEl)
                .perform();
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Sign in on a `scratch-www` page.
     * @param {string} username The username to sign in with.
     * @param {string} password The password to sign in with.
     * @returns {Promise} A promise that resolves when the user is signed in.
     */
    async signIn (username, password) {
        const outerError = new SeleniumHelperError('signIn failed', [
            {username},
            {password: password ? 'provided' : 'absent'}
        ]);
        try {
            await this.clickXpath('//li[@class="link right login-item"]/a');
            const name = await this.findByXpath('//input[@id="frc-username-1088"]');
            await name.sendKeys(username);
            const word = await this.findByXpath('//input[@id="frc-password-1088"]');
            await word.sendKeys(password + this.getKey('ENTER'));
            await this.findByXpath('//span[contains(@class, "profile-name")]');
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Wait until the URL matches the provided regex.
     * @param {RegExp} regex The regex to match the url against.
     * @returns {Promise} A promise that resolves when the url matches the regex.
     */
    async urlMatches (regex) {
        const outerError = new SeleniumHelperError('urlMatches failed', [{regex}]);
        try {
            await this.driver.wait(until.urlMatches(regex), 1000 * 5);
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Get selected browser log entries.
     * @param {Array<string>} whitelist A list of log strings to allow.
     * @returns {Promise<Array<webdriver.logging.Entry>>} A promise that resolves to the log entries.
     */
    async getLogs (whitelist) {
        const outerError = new SeleniumHelperError('getLogs failed', [{whitelist}]);
        try {
            const entries = await this.driver.manage()
                .logs()
                .get('browser');
            return entries.filter(entry => {
                const message = entry.message;
                for (const element of whitelist) {
                    if (message.indexOf(element) !== -1) {
                        // eslint-disable-next-line no-console
                        // console.warn('Ignoring whitelisted error: ' + whitelist[i]);
                        return false;
                    } else if (entry.level !== 'SEVERE') { // WARNING: this doesn't do what it looks like it does!
                        // eslint-disable-next-line no-console
                        // console.warn('Ignoring non-SEVERE entry: ' + message);
                        return false;
                    }
                    return true;
                }
                return true;
            });
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * Check if an element's class attribute contains a given class.
     * @param {webdriver.WebElement} element The element to check.
     * @param {string} cl The class to check for.
     * @returns {Promise<boolean>} True if the element's class attribute contains the given class, false otherwise.
     */
    async containsClass (element, cl) {
        const outerError = new SeleniumHelperError('containsClass failed', [{element}, {cl}]);
        try {
            const classes = await element.getAttribute('class');
            const classList = classes.split(' ');
            return classList.includes(cl);
        } catch (cause) {
            outerError.collectContext(this.driver);
            throw outerError.chain(cause);
        }
    }

    /**
     * @param {webdriver.WebElement} element Wait until this element is visible.
     * @param {webdriver.ThenableWebDriver} driver The webdriver instance.
     * @returns {Promise} A promise that resolves when the element is visible.
     */
    static async waitUntilVisible (element, driver) {
        const outerError = new SeleniumHelperError('waitUntilVisible failed', [{element}]);
        try {
            await driver.wait(until.elementIsVisible(element));
        } catch (cause) {
            outerError.collectContext(driver);
            throw outerError.chain(cause);
        }
    }
}

module.exports = SeleniumHelper;
