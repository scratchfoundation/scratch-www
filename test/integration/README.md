# Requirements

* Selenium
  * See this directory's package.json
* TAP
  * In the scratch-www repo's package.json
* Currently, we also require that you download [Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/), but this will be replaced by Saucelabs eventually

# Running the tests

* By default, tests run against our Staging instance, but you can pass in a different location if you want to run the tests against e.g. your local build

## Using tap
* Run all tests in the smoke-testing directory from the command-line: `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu make smoke`
* To run a single file from the command-line: `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu node_modules/.bin/tap ./test/integration/smoke-testing/filename.js --timeout=3600`
  * The timeout var is for the length of the entire tap test-suite; if you are getting a timeout error, you may need to adjust this value (some of the Selenium tests take a while to run)

### Configuration

| Variable      		| Default               | Description                                 			    |
| ---------------------	| --------------------- | --------------------------------------------------------- |
| `ROOT_URL`			| `scratch.ly`			| Location you want to run the tests against
| `SMOKE_USERNAME`    	| `None` 				| Username for Scratch user you're signing in with to test 	|
| `SMOKE_PASSWORD`  	| `None`                | Password for Scratch user you're signing in with to test  |

## Using sauce
* Not yet set up