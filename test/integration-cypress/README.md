## Cypress tests

### What is this?
Cypress is an end to end testing tool that we are using to do integration tests on Scratch.

It behaves in some ways like the selenium tests that we had, but it is simpler to implement and easier to read and includes features that make debugging easier.  Another advantage is that it is easier to install and get working.

### Install cypress
To install in the command line you'll need npm installed.  From this folder run:

`npm install`

If you would like to install it outside of this project run this:

`npm install cypress --save-dev`

Cypress also has a gui client.  To get the gui you can download it from cypress.io

### Run tests
To run all of the tests in chrome from the command line, enter `npm run test-all`.  To run headless enter `npm run test-all-headless`.  This will run through all of the tests in the smoke-tests folder.

To run tests directly, without using npm, enter `./node_modules/.bin/cypress run`.

### Run a single test file
Append `-s ./path/to/test/file` (or `-spec ./path/to/test/file`) to the command to run just that one suite of tests.  If using `npm run` you must add an add an additional `--` before the arguments in order to pass them in:

`npm run test-all -- -s ./cypress/smoke-tests/the-test-I-want-to-run``

### Supported Browsers
Currently it defaults to running headless in Electron but it also supports Chrome.

Add `--browser chrome` to the command line when running the tests to run in chrome.  

Firefox is not yet supported as of March 2018 but they are working on it.

### Environment variables
To pass in environment variables, such as USERNAME and PASSWORD for a test user you add them before calling cypress run by adding CYPRESS_ before the variable name.

It will look like this: `CYPRESS_USERNAME=madeUpName`

Alternatively you can add to the command `--env USERNAME=madeUpName`, but this is not preferred.  If following `npm run` you must add an aditional `--` before adding arguments similar to how it is described in Run a single test (above).

### configuration (cypress.json)
Cypress uses a configuration file `./cypress.json` which contains environment variables and other information.

To access any variable you put in the configuration file from within your test code type `Cypress.config('property_you_want')`.

There is a special case for accessing environment variables stored in the `env : {}` object:  `Cypress.env('environment_variable_you_want')` This is also how you access any environment variables passed in from the command line.

### more configuration (cypress.env.json)
You can add configuration or environment variables in the same way listed above to another json file called `cypress.env.json`.  This file will overwrite whatever is in `cypress.json`.  This file is untracked in git, so is useful for information that you don't want shared, such as username and password environment variables.

### Base URL
Cypress hates it when you use a base url as an environment variable.  If you try it gives strange results.  The base URL is set in `cypress.json` as its own variable `"baseUrl" : "https://scratch.ly"`.  

This is automatically appended to `visit()` command arguments which are used to load webpages.  It appends it, so you need to include a string as an argument so you would have to write it as `visit("")` or `visit("/")`.

To overwrite the baseUrl variable from the command line you need to change it just like it is an environment variable (above):  `CYPRESS_baseUrl=https://scratch.mit.ed`.

Alternatively you could change it like this after calling cypress : `--config baseUrl=https://scratch.mit.edu`

### .only
If you would like to only run one test in a file you can change `it(...)` to `it.only(...)` and it will run just that one test.

Similarly you can run a collection of tests from a file by adding `.only` to a `describe(...)` function so it looks like this: `describe.only(...)`.  This will run all tests in that collection and no others.

ONLY USE ONE ONLY

If you use more than one `.only` anywhere in the file it will give you unpredictable results.  This includes if you put one on a collection and one on an individual test.

### .skip
If you would like to skip a test in a file you can cahnge the `it(...)` to `it.skip(...)` similarly to how you use only (above).

Skip can be used on individual tests and on suites:

`describe.skip(...)`

### Cookies
By default Cypress deletes all cookies between tests.  This means that if you want to remain signed in  you must manually keep the session data cookie by including this code in a beforeEach() function:

`Cypress.Cookies.preserveOnce('scratchsessionsid')`

### The GUI
The gui, which can be downloaded at cypress.io, is useful especially if you want to look back through the state of tests after they have been run.  If you run in chrome from the command line the browser closes at the end of the tests.

The gui captures the state of the DOM at each step of each test.  You can mouse over a step and it will show you want was happening at that time.  If you click on the step you can even inspect elements, which is useful for debugging.
