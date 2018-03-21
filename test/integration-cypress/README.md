## Cypress tests

### What is this?
Cypress is an end to end testing tool that we are using to do integration tests on Scratch.

It behaves in some ways like selenium but does not use selenium at all.  It is simpler to implement, easier to read and includes features that make debugging easier.
### Install cypress
To install in the command line you'll need npm installed.  Navigate to this folder and run:

`npm install`

If you would like to install it in other projects run this:

`npm install cypress --save-dev`

Cypress also has a gui client.  To get the gui you can download it from cypress.io.

### Run tests
To run all of the tests in chrome from the command line, enter `npm run test-all`.  To run headless enter `npm run test-all-headless`.  This will run through all of the tests in the smoke-tests folder.

To run tests directly, without using npm, enter `./node_modules/.bin/cypress run`.

### Run a single test file
Append `-s ./path/to/test/file` (or `-spec ./path/to/test/file`) to the command to run just that one suite of tests.  If using `npm run` you must add an add an additional `--` before the arguments in order to pass them in:

`npm run test-all -- -s ./cypress/smoke-tests/the-test-I-want-to-run`

###Writing tests
Tests are held in functions that take the following form:

```
it('name of test', function(){
  ...
  ...
  });
```
Commands that you run in tests almost always start with a `cy` object which contains functions for going to urls, finding objects on the page, etc.  Any objects found are returned, so functions can be chained.  For preference chaining should be structured like this:

```
cy
  .visit("");
cy
  .get('.logo a')
  .click();
```

### get and visit
`cy.visit()` is the command used for loading web pages.  It takes a url string as an argument.

`cy.get()` is used to find elements on a page.  It uses jquery.

This is slightly different from how Selenium does it.  For more on how to write tests see the documentation on cypress.io.  It is pretty good for the most part.

### Promises
Cypress has a built in promise manager and basically already turns every line of code into a promise for you so you can write code like it was synchronous.

### Assertions
There are a few ways to put assertions into tests but mainly we use `should()` which can be put at the end of a chain and takes objects passed in from the chain as the first element to compare.  `should()` can take two arguments, a comparison type and what to compare it to, or one argument that is a chainer similar to how it is done using Chai.

For more information check out the Cypress documentation on these topics.

Assertions aren't strictly necessary since a test will fail if any step in it fails.  They are useful for making sure that you have gotten to the right page.

### Suites
Tests can be organized in suites using describe:

```
describe('name of suite', function(){
  it('test 1', function(){
    ...
  });

  it('test 2', function(){
    ...
  })

});
```

### Supported Browsers
Currently it defaults to running headless in Electron but it also supports Chrome.

Add `--browser chrome` to the command line when running the tests to run in chrome.  

Firefox is not yet supported as of March 2018 but they are working on it.

### Environment variables
To pass in environment variables, such as USERNAME and PASSWORD for a test user you add them before calling cypress run by adding CYPRESS_ before the variable name.

It will look like this: `CYPRESS_USERNAME=made-up-name`

Alternatively you can add to the command `--env USERNAME=made-up-name`, but this is not preferred.  If following `npm run` you must add an aditional `--` before adding arguments similar to how it is described in Run a single test (above).

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

Similarly you can run a suite of tests from a file by adding `.only` to a `describe(...)` function so it looks like this: `describe.only(...)`.  This will run all tests in that suite and no others.

ONLY USE ONE ONLY

If you use more than one `.only` anywhere in the file it will give you unpredictable results.  This includes if you put one on a collection and one on an individual test.

### .skip
If you would like to skip a test in a file you can cahnge the `it(...)` to `it.skip(...)` similarly to how you use only (above).

Skip can be used on individual tests and on suites:

`describe.skip(...)`

You can use any number of skips.  If you skip a suite it till skip all of the tests inside.

### Cookies
By default Cypress deletes all cookies between tests.  This means that if you want to remain signed in  you must manually keep the session data cookie by including this code in a beforeEach() function:

`Cypress.Cookies.preserveOnce('scratchsessionsid')`

### The GUI
The gui, which can be downloaded at cypress.io, is useful especially if you want to look back through the state of tests after they have been run.  If you run in chrome from the command line the browser closes at the end of the tests.

The gui captures the state of the DOM at each step of each test.  You can mouse over a step and it will show you want was happening at that time.  If you click on the step you can even inspect elements, which is useful for debugging.
