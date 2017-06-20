/*
 * Tests signing in & My Stuff according to smoke-tests at:
 *
 * https://github.com/LLK/scratchr2/wiki/Smoke-Testing-Test-Cases
 *
 */

var path = require('path');
var fs = require('fs');

var dirPath = path.resolve(__dirname, '../not-tracked/');
var filePath = dirPath + '/credentials.js';
var credentials = fs.readFileSync(filePath,'utf8');

var window = {};
var credentials = eval(credentials);

var tap = require('tap');
const test = tap.test;
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

/*
const clickScriptsTab = () => driver.findElement(By.id('react-tabs-0')).click();
const clickCostumeTab = () => driver.findElement(By.id('react-tabs-2')).click();
const clickSoundsTab = () => driver.findElement(By.id('react-tabs-4')).click();
*/

const findByXpath = (xpath) => {
    return driver.wait(until.elementLocated(By.xpath(xpath), 5 * 1000));
};

const findByCss = (css) => {
    return driver.wait(until.elementLocated(By.css(css), 1000 * 5));
};

const findByText = (text) => {
    return findByXpath(`//*[contains(text(), '${text}')]`);
};

const clickXpath = (xpath) => {
    return findByXpath(xpath).then(el => el.click());
};

const clickText = (text) => {
    return clickXpath(`//*[contains(text(), '${text}')]`);
};

const clickButton = (text) => {
    return clickXpath(`//button[contains(text(), '${text}')]`);
};

var rootUrl = process.env.ROOT_URL || 'https://scratch.mit.edu/users/anyuser/';

tap.plan(1);

tap.tearDown(function () {
    //quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    //load the page with the driver
    return driver.get(rootUrl);
});

test('Sign in to Scratch & verify My Stuff contents', t => {
    clickText('Sign in')
    .then(() => findByXpath('//input[@id="login_dropdown_username"]'))
    .then((element) => element.sendKeys(username))
    .then(() => findByXpath('//input[@name="password"]'))
    .then((element) => element.sendKeys(password))
    .then(() => clickButton('Sign in'))
    .then(() => findByXpath('//a[@class="mystuff-icon"]'))
    .then((element) => element.click())
    .then(() => findByXpath('//div[@class="box-head"]/h2'))
    .then( function (element) {
        return element.getText('h2');
    })
    .then( function (text) {
        t.equal('My Stuff', text, 'Title should be My Stuff');
    })
    /*
    //.then(() => clickText('Create'))
    .then( function () {
    	return clickText(username);
    })
    .then( function (element) {
        console.log(element);
    })
    .then(() => clickCostumeTab())
    .then(() => clickText('Add Costume'))
    .then(() => findByXpath("//input[@placeholder='what are you looking for?']"))
    .then((el) => el.sendKeys('abb'))
    .then(() => clickText('abby-a')) // Should close the modal, then click the costumes in the selector
    .then(() => clickText('costume1'))
    .then(() => clickText('abby-a'))

    .then(() => clickSoundsTab())
    .then(() => clickText('Add Sound'))
    .then(() => findByXpath("//input[@id='login_dropdown_username']"))
    .then((el) => el.sendKeys('chom'))
    .then(() => clickText('chomp')) // Should close the modal, then click the sounds in the selector
    .then(() => clickText('meow'))
    .then(() => clickText('chomp'))

    .then(() => clickScriptsTab())
    .then(() => clickText('Data'))
    .then(() => clickText('Create variable...'))
    .then(() => findByXpath("//input[@placeholder='']"))
    .then((el) => el.sendKeys('score'))
    .then(() => clickButton('OK'))
    */

    .then(() => t.end());
});