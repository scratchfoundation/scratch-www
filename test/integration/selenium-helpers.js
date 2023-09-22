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

// This removes confusing `regenerator-runtime` noise from stack traces.
// This is V8-specific code. Please don't use it in a browser or any production code.
const oldPrepareStackTrace = Error.prepareStackTrace;
Error.prepareStackTrace = function (error, stack) {
    stack = stack.filter(callsite => {
        const filename = callsite.getFileName();
        return filename && !filename.includes('regenerator-runtime');
    });
    if (oldPrepareStackTrace) {
        return oldPrepareStackTrace(error, stack);
    }
    return [
        `${error.constructor.name}: ${error.message}`,
        ...stack.map(callsite => `    at ${callsite.toString()}`)
    ].join('\n');
};

/**
 * An error thrown by SeleniumHelper.
 * @extends Error
 */
class SeleniumHelperError extends Error {
    /**
     * Instantiate a new SeleniumHelperError.
     * @param {string} message The error message for this layer.
     * @param {Array} [kvList] Optional keys & values to add to the error message, for example to capture arguments.
     * @example
     * const e = new SeleniumHelperError('something failed', [{xpath}, {somethingElse}])
     * try {
     *   doThings();
     * } catch (inner) {
     *   throw await e.chain(inner, driver);
     * }
     */
    constructor (message, kvList = []) {
        const baseMessage = [
            message,
            ...kvList.map(kv => `    ${Object.keys(kv)[0]}: ${Object.values(kv)[0]}`)
        ].join('\n');
        super(baseMessage);
        Object.setPrototypeOf(this, SeleniumHelperError.prototype); // see https://stackoverflow.com/a/41102306
        this.name = 'SeleniumHelperError';
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Add a new layer to the error chain.
     * Collects context from the webdriver if it is present AND this is the innermost `SeleniumHelperError`.
     * @param {Error|SeleniumHelperError} innerError The error to add to the chain.
     * @param {webdriver.ThenableWebDriver} [driver] Optional webdriver instance to collect context from.
     * @returns {Promise<SeleniumHelperError>} This error, with the new layer added.
     */
    async chain (innerError, driver) {
        const messageLines = [
            this.message,
            innerError.message
        ];
        // If the inner error has already collected context, don't collect it again.
        if (driver && !(innerError && innerError.collectContext)) {
            await this.collectContext(messageLines, driver);
        }
        this.message = messageLines.join('\n');
        return this;
    }

    /**
     * Collect error context from the webdriver.
     * @param {Array<string>} messageLines Add context lines to this array.
     * @param {webdriver.ThenableWebDriver} driver The webdriver instance to collect context from.
     * @returns {Promise} A promise that resolves when the context is collected.
     */
    async collectContext (messageLines, driver) {
        // It would be really nice to wait until `message` time to collect all this information,
        // but that's not an option because of all these async calls.
        const [
            url,
            title,
            // pageSource,
            logEntries
        ] = await Promise.all([
            driver.getCurrentUrl(),
            driver.getTitle(),
            // driver.getPageSource(),
            driver.manage()
                .logs()
                .get('browser')
        ]);
        messageLines.push(
            `Browser URL: ${url}`,
            `Browser title: ${title}`,
            'Browser logs:',
            '*****',
            ...logEntries.map(entry => entry.message),
            '*****'
            // 'Browser page source:', '*****', pageSource, '*****'
        );
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
            'isSignedIn',
            'navigate',
            'signIn',
            'urlMatches',
            'waitUntilDocumentReady',
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
            .usingServer(`http://${username}:${accessKey}@ondemand.saucelabs.com:80/wd/hub`)
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
     * Wait until the document is ready (i.e. the document.readyState is 'complete')
     * @returns {Promise} A promise that resolves when the document is ready
     */
    async waitUntilDocumentReady () {
        const outerError = new SeleniumHelperError('waitUntilDocumentReady failed');
        try {
            await this.driver.wait(
                async () => await this.driver.executeScript('return document.readyState;') === 'complete',
                DEFAULT_TIMEOUT_MILLISECONDS
            );
        } catch (cause) {
            throw await outerError.chain(cause, this.driver);
        }
    }

    /**
     * Navigate to the given URL and wait until the document is ready
     * @param {string} url The URL to navigate to.
     * @returns {Promise} A promise that resolves when the document is ready
     */
    async navigate (url) {
        const outerError = new SeleniumHelperError('navigate failed', [{url}]);
        try {
            await this.driver.get(url);
            await this.waitUntilDocumentReady();
        } catch (cause) {
            throw await outerError.chain(cause, this.driver);
        }
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
            throw await outerError.chain(cause, this.driver);
        }
    }

    /**
     * @param {webdriver.WebElement} element Wait until this element is gone (stale).
     * @returns {Promise} A promise that resolves when the element is gone.
     */
    async waitUntilGone (element) {
        const outerError = new SeleniumHelperError('waitUntilGone failed', [{element}]);
        try {
            await this.driver.wait(until.stalenessOf(element), DEFAULT_TIMEOUT_MILLISECONDS);
        } catch (cause) {
            throw await outerError.chain(cause, this.driver);
        }
    }

    /**
     * @param {string} xpath Wait until an element at the provided xpath is clickable.
     * @param {boolean} [allowScrolling] Whether or not to allow page scrolling to reach the element.
     * @returns {Promise<webdriver.WebElement>} A promise that resolves to the clickable element.
     */
    waitUntilClickable (xpath, allowScrolling = true) {
        return this.driver.wait(new webdriver.WebElementCondition(
            'for element to be clickable',
            async () => {
                const elementAtPath = await this.findByXpath(xpath);
                if (!elementAtPath) {
                    return null;
                }

                if (allowScrolling) {
                    await this.driver.actions()
                        .move({origin: elementAtPath})
                        .perform();
                }

                const elementAtPoint = await this.driver.executeScript(
                    `
                    const rect = arguments[0].getBoundingClientRect();
                    return document.elementFromPoint(
                        rect.x + rect.width / 2,
                        rect.y + rect.height / 2
                    );
                    `,
                    elementAtPath
                );
                if (!elementAtPoint) {
                    return null;
                }
                // If we ask to click on a button and Selenium finds an image on the button, or vice versa, that's OK.
                // It doesn't have to be an exact match.
                const match = await this.driver.executeScript(
                    'return arguments[0].contains(arguments[1]) || arguments[1].contains(arguments[0])',
                    elementAtPath,
                    elementAtPoint
                );
                if (!match) {
                    return null;
                }
                if (!await elementAtPath.isDisplayed()) {
                    return null;
                }
                if (!await elementAtPath.isEnabled()) {
                    return null;
                }
                return elementAtPath;
            }
        ), DEFAULT_TIMEOUT_MILLISECONDS);
    }

    /**
     * Wait until an element can be found by the provided xpath, then click on it.
     * @param {string} xpath The xpath to click.
     * @param {boolean} [allowScrolling] Whether or not to allow page scrolling to reach the element.
     * @returns {Promise} A promise that resolves when the element is clicked.
     */
    async clickXpath (xpath, allowScrolling = true) {
        const outerError = new SeleniumHelperError('clickXpath failed', [{xpath}]);
        try {
            const element = await this.waitUntilClickable(xpath, allowScrolling);
            element.click();
            return element;
        } catch (cause) {
            throw await outerError.chain(cause, this.driver);
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
            throw await outerError.chain(cause, this.driver);
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
            throw await outerError.chain(cause, this.driver);
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
            throw await outerError.chain(cause, this.driver);
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
            throw await outerError.chain(cause, this.driver);
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
            throw await outerError.chain(cause, this.driver);
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
            throw await outerError.chain(cause, this.driver);
        }
    }

    /**
     * @returns {string} The xpath to the login button, which is present only if signed out.
     */
    getPathForLogin () {
        return '//li[@class="link right login-item"]/a';
    }

    /**
     * @returns {string} The xpath to the profile name, which is present only if signed in.
     */
    getPathForProfileName () {
        return '//span[contains(@class, "profile-name")]';
    }

    /**
     * @returns {Promise<boolean>} True if the user is signed in, false otherwise.
     * @throws {SeleniumHelperError} If the user's sign-in state cannot be determined.
     */
    async isSignedIn () {
        const outerError = new SeleniumHelperError('isSignedIn failed');
        try {
            const state = await this.driver.wait(
                () => this.driver.executeScript(
                    `
                    if (document.evaluate(arguments[0], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                        .singleNodeValue) {
                        return 'signed in';
                    }
                    if (document.evaluate(arguments[1], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                        .singleNodeValue) {
                        return 'signed out';
                    }
                    `,
                    this.getPathForProfileName(),
                    this.getPathForLogin()
                ),
                DEFAULT_TIMEOUT_MILLISECONDS
            );
            switch (state) {
            case 'signed in':
                return true;
            case 'signed out':
                return false;
            default:
                throw new Error('Could not determine whether or not user is signed in');
            }
        } catch (cause) {
            throw await outerError.chain(cause, this.driver);
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
            await this.clickXpath(this.getPathForLogin());
            const name = await this.findByXpath('//input[@id="frc-username-1088"]');
            await name.sendKeys(username);
            const word = await this.findByXpath('//input[@id="frc-password-1088"]');
            await word.sendKeys(password + this.getKey('ENTER'));
            await this.findByXpath(this.getPathForProfileName());
        } catch (cause) {
            throw await outerError.chain(cause, this.driver);
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
            await this.driver.wait(until.urlMatches(regex), DEFAULT_TIMEOUT_MILLISECONDS);
        } catch (cause) {
            throw await outerError.chain(cause, this.driver);
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
            throw await outerError.chain(cause, this.driver);
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
            throw await outerError.chain(cause, this.driver);
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
            await driver.wait(until.elementIsVisible(element), DEFAULT_TIMEOUT_MILLISECONDS);
        } catch (cause) {
            throw await outerError.chain(cause, driver);
        }
    }
}

module.exports = SeleniumHelper;
