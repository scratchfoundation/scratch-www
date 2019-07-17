# Requirements

* Selenium
  * See this directory's package.json
* TAP
  * In the scratch-www repo's package.json
* [Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/)

# Running the tests

* By default, tests run against our Staging instance, but you can pass in a different location if you want to run the tests against e.g. your local build
* Tests can be run using Saucelabs, an online service that can test browser/os combinations remotely. Currently all tests are written for use for chrome on mac.

## Using tap
* Run all tests in the smoke-testing directory from the command-line: `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu npm run test:smoke`
* To run a single file from the command-line: `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu node_modules/.bin/tap ./test/integration/smoke-testing/filename.js --timeout=3600`
  * The timeout var is for the length of the entire tap test-suite; if you are getting a timeout error, you may need to adjust this value (some of the Selenium tests take a while to run)
* To run tests using saucelabs run this command `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password SAUCE_USERNAME=saucelabsUsername SAUCE_ACCESS_KEY=saucelabsAccessKey ROOT_URL=https://scratch.mit.edu npm run test:smoke:sauce`


### Configuration

| Variable      		| Default               | Description                                 			    |
| ---------------------	| --------------------- | --------------------------------------------------------- |
| `ROOT_URL`			| `scratch.ly`			| Location you want to run the tests against                |
| `SMOKE_USERNAME`    	| `None` 				| Username for Scratch user you're signing in with to test 	|
| `SMOKE_PASSWORD`  	| `None`                | Password for Scratch user you're signing in with to test  |
| `SMOKE_REMOTE`        | `false`               | Tests with Sauce Labs or not. True if running test:smoke:sauce |
| `SMOKE_HEADLESS`      | `false`               | Run browser in headless mode. Flaky at the moment         |
| `SAUCE_USERNAME`      | `None`                | Username for your Sauce Labs account                      |
| `SAUCE_ACCESS_KEY`    | `None`                | Access Key for Sauce Labs found under User Settings       |


## Using Saucelabs
* You will need a Saucelabs account in order to use it for testing. To find the Access Key, click your username and select User Settings from the dropdown menu.  Near the bottom of the page is your access key that you can copy and use in the command line.
