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

	driver.wait(seleniumWebdriver.until.elementLocated(seleniumWebdriver.By.className('nv-legend-symbol')));


    var newCommentsData = driver.findElements(seleniumWebdriver.By.className('nv-legend-symbol'));
    newCommentsData.then(function(elements){
    	console.log('========');
    	console.log('========');    	
    	console.log(elements[0].click());
    	console.log('========')    	
    });

    //stroke-width: 2; fill: rgb(255, 127, 14); stroke: rgb(255, 127, 14);
    //class for g element goes between class="nv-series nv-disabled" and class="nv-series"
    //var visibleCommentsData = driver.findElement(By.cssSelector(".nv-series"));
    //var disableCommentsData = driver.findElement(By.cssSelector(".nv-series.nv-disabled"));

    
    // newCommentsData.click().then( function () {
    //     driver.wait(seleniumWebdriver.until
    //         .elementLocated(seleniumWebdriver.By.cssSelector('.nv-series.nv-disabled')));
    //     t.end();
    // });
});

driver.quit();

