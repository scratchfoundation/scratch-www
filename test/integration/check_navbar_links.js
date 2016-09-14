/*
 * Checks that the links in the navbar on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows#Create_should_take_you_to_the_editor
 */

var tap=require('tap'),  
    seleniumWebdriver = require('selenium-webdriver');

//how to generalize for other browsers... how will this work in saucelabs? Do I need to iterate through the drivers for each browser here?
//chrome driver
var driver = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();
//open scratch.ly in a new instance of the browser
driver.get('https://scratch.ly')

/*
 * Remove later after resolving these questions
 */
//find the navbar
//var navbarElement = driver.findElement(seleniumWebdriver.By.id("navigation"))
//var createLinkSignedOut = navbarElement.findElement(seleniumWebdriver.By.xpath('//li[@class="link create"]/a')) <-- this doesn't work to force findElement to look in the scope of navbarElement

//find the create link within the navbar
//the create link depends on whether the user is signed in or not (tips window opens)

//this xpath is fragile, can i look up by successive attributes instead?
tap.test('checkCreateLinkWhenSignedOut', function (t) {
	var createLinkSignedOut = driver.findElement(seleniumWebdriver.By.xpath('//div[@id="navigation"]/div[@class="inner"]/ul/li[@class="link create"]/a'));
	createLinkSignedOut.getAttribute("href").then(function(href){
		t.equal('https://scratch.ly/projects/editor/?tip_bar=home', href);
		t.end();
	});
});
 

// close the instance of the browser
driver.quit();

