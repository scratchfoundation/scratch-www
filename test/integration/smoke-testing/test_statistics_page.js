/*
 * Checks that the /statistics page includes charts
 *
 * Test cases: https://github.com/LLK/scratchr2/wiki/Smoke-Testing-Test-Cases
 */

//SELENIUM_PROMISE_MANAGER=0;

//const seleniumTest = require('selenium-webdriver/testing');
var tap = require('tap');
var seleniumWebdriver = require('selenium-webdriver');

//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

//var rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
var rootUrl = process.env.ROOT_URL || 'https://scratch.mit.edu';

//number of tests in the plan
//tap.plan(1);

//load the page with the driver
driver.get(rootUrl + '/statistics');

tap.test('activityChartShouldExist', function (t) {
    driver.wait(function () {
        return driver.findElements(seleniumWebdriver.By.className('nv-legend-text'))
            .filter(function (element){
                return element.getText().then(function (text) {
                        if (text == 'New Comments') {
                            return true;
                        }
                        return false;
                    });
                });
                
            }).then(function (elements) {
                return elements.length > 0;
            });
    });

driver.quit();

