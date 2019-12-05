# scratch-www
#### Standalone web client for Scratch

[![Build Status](https://travis-ci.org/LLK/scratch-www.svg)](https://travis-ci.org/LLK/scratch-www)
[![Coverage Status](https://coveralls.io/repos/github/LLK/scratch-www/badge.svg?branch=develop)](https://coveralls.io/github/LLK/scratch-www?branch=develop)
[![Greenkeeper badge](https://badges.greenkeeper.io/LLK/scratch-www.svg)](https://greenkeeper.io/)

## Overview

This is Scratch’s open source web client! This is the code for much of the [Scratch website](https://scratch.mit.edu).

In particular, this codebase includes code for:
* the "project page", which shows a playable version of the project, along with the project's title, description, comments, remixes and studios; this page operates in the background when you "See inside" a project
* the site's home page
* the Ideas page
* landing pages for various Scratch extensions, such as LEGO MINDSTORMS and micro:bit
* the info page for Scratch Desktop
* and other pages such as Credits and FAQ.

### How this fits in with other Scratch repos

The scratch-www project has lots of aspects of its design that are particular to our backend systems.
To use it for your own project, you would have to look at all the places it makes backend calls, and
create your own backend systems to perform those functions.

The [scratch-gui](https://github.com/LLK/scratch-gui) project, on the other hand, is designed to be
able to be used by anyone, without needing to create backend systems, though it also can support
backend systems for project and asset saving.

### Contributing

We welcome your contributions to this codebase! You may want to start by browsing [the current
list of open issues labeled "help wanted"](https://github.com/LLK/scratch-www/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).

Contributing to scratch-www can be more difficult than contributing to
[scratch-gui](https://github.com/LLK/scratch-gui). This is because scratch-gui can be run on its
own, without needing any other services to be running, while scratch-www needs to communicate
with several backend systems that the Scratch team runs (see "How this fits in with other Scratch
repos" above). If you are new to contributing to Scratch's source code, we suggest you start
by becoming familiar with scratch-gui and its [list of open issues labeled "help
wanted"](https://github.com/LLK/scratch-gui/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).

To contribute, please follow the [standard steps for contributing to a project on
GitHub](https://github.com/firstcontributions/first-contributions).

### License

See the [LICENSE](https://github.com/LLK/scratch-www/blob/master/LICENSE) file in this repo.

## Understanding this codebase

### Guides

Here are some resources to help you get acquainted with how we’re working on the Scratch codebase:

* [Style Guide](https://github.com/LLK/scratch-www/wiki/Style-Guide)
* [Testing Guide](https://github.com/LLK/scratch-www/wiki/Testing-Guide-for-Bugfixes)
* [Localization Guide](https://github.com/LLK/scratch-www/wiki/Localization-Guide)
* [Map of the repository](https://github.com/LLK/scratch-www/wiki/Repo-Map)

### Core technologies

Significant core technologies this codebase uses include:

#### Development technologies

* [Node](https://nodejs.org/)
* [Webpack](https://webpack.js.org/)
* [React](https://facebook.github.io/react/)
* [Redux](https://redux.js.org/)
* [Sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)

#### Testing technologies

Our tests use:

* [Jest](https://jestjs.io/) (we are writing most new tests in Jest)
* [Tap](https://node-tap.org/) (we are moving away from using Tap, but many tests still use it)
* [Enzyme](https://airbnb.io/enzyme/)
* [Selenium](https://selenium.dev/)

## Developing scratch-www

### Before Getting Started

Make sure you have installed:
* [node](https://docs.npmjs.com/getting-started/installing-node): version 8 or higher
* npm (Node Package Manager): used to maintain and update packages required to build the site

### Update Packages

It's important to make sure that all of the dependencies are up to date because the
scratch-www code only works with specific versions of the dependencies.
You can update the packages by using the command:

```bash
npm install
```

#### Warnings during npm install

These warnings can be safely ignored:

```bash
npm WARN react-modal@0.6.1 requires a peer of react@^0.14.0 but none was installed.
npm WARN react-redux@4.4.0 requires a peer of react@^0.14.0 but none was installed.
npm WARN react-redux@4.4.0 requires a peer of redux@^2.0.0 || ^3.0.0 but none was installed.
npm WARN react-addons-test-utils@0.14.7 requires a peer of react@^0.14.7 but none was installed.
npm WARN react-dom@0.14.8 requires a peer of react@^0.14.8 but none was installed.
```

These currently exist in static/js/lib .

### To Build

To compile the source code into HTML and JavaScript bundles browsers can read, you can create
a temporary version of the site on your machine that you can access through your web browser.

You can either "build" the site a single time, by running:

```bash
npm run build
```

Or, you can run a server that rebuilds the files as you edit them, by running the commands:

```bash
npm run translate
npm start
```

*NOTE: `npm run translate` builds the intl directory. The site will build fine without it,
but translatable text strings will not show up correctly until you have built intl.*

During development, `npm start` watches any update you make to files in either
`./static` or `./src` and triggers a rebuild of the project.  In development,
the build is stored in memory, and not served from the `./build` directory.

### Viewing the local site

Once you have built the local site, using either `npm run build` or `npm start`,
the site hosted on your local machine can be accessed by a web browser by entering
`localhost:8333` into your browser's address bar.

### Troubleshooting

When running `npm start`, here are some important log messages to keep an eye out for:
* `webpack: bundle is now VALID.` – The bundle has been loaded into memory and is now viewable in the browser. This will show up both once `npm start` has completed its setup, and also once updates you make to files have been re-compiled for viewing in the browser.
* `webpack: bundle is now INVALID.` – If you see this, then it means you have made updates to files that are still being compiled for browser viewing. Pages will still be viewable, but they will not see any updates you made yet.

### To stop npm

To stop the `npm start` process which is making the site available to your web browser
(created above in "To Build"), use `^C` (control-c) in the terminal.

#### Configuration

`npm start` can be configured with the following environment variables, by setting them in
the beginning of the command, before `npm start`:

| Variable        | Default                            | Description                                    |
| --------------- | ---------------------------------- | ---------------------------------------------- |
| `API_HOST`      | `https://api.scratch.mit.edu`      | Hostname for API requests                      |
| `ASSET_HOST`    | `https://assets.scratch.mit.edu`   | Hostname for asset requests                    |
| `BACKPACK_HOST` | `https://backpack.scratch.mit.edu` | Hostname for backpack requests                 |
| `PROJECT_HOST`  | `https://projects.scratch.mit.edu` | Hostname for project requests                  |
| `SENTRY_DSN`    | `''`                               | DSN for Sentry                                 |
| `FALLBACK`      | `''`                               | Pass-through location for old site             |
| `GA_TRACKER`    | `''`                               | Where to log Google Analytics data             |
| `NODE_ENV`      | `null`                             | If not `production`, app acts like development |
| `PORT`          | `8333`                             | Port for devserver (http://localhost:XXXX)     |

*NOTE: Because by default `API_HOST=https://api.scratch.mit.edu`, please be aware that, by default, you will be seeing and interacting with real data on the Scratch website.*

## Tests

### Unit tests

Most of our unit tests run using Jest, but older unit tests use the TAP framework.

#### Run all tests

To build the application and run all unit and localization tests, use the command:

```bash
npm test
```

#### Run one test

To run a single unit test file from the command-line using Jest, use the command:

```bash
node_modules/.bin/jest ./test/unit/PATH/TO/FILENAME.test.js
```

*NOTE: replace `PATH/TO/FILENAME` with the actual path to the file you wish to run.*

### Integration tests

Our integration tests assume that a larger environment is running than just scratch-www
on its own; for instance, many require that a test user be able to log in to the site,
which requires backend and database support.

By default, tests run against our Staging instance, but you can pass in a different
location with the ROOT_URL environment variable (see below) if you want to run the
tests against another location--for instance, your local build.

We are transitioning from using TAP to using Jest as our testing framework,
so for the time being our tests run using both.  

#### Running the tests

To run all integration tests from the command-line:

```bash
SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu npm run test:integration
```

To run a single file from the command-line using Jest:

```bash
SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu node_modules/.bin/jest ./test/integration/filename.test.js
```

To run a single file from the command-line using TAP:

```bash
SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu node_modules/.bin/tap ./test/integration-legacy/smoke-testing/filename.js -R classic --no-coverage --timeout=3600
```

* the `-R classic` makes tap use the old reporting style, which avoids an error with the "nyc" package
* `--no-coverage` is because we do not use the coverage-tracking feature of tap
* the `timeout` argument is for the length of the entire tap test-suite; if you are getting a timeout error, you may need to adjust this value (some of the Selenium tests take a while to run)

#### Running Remote tests

Integration tests can be run using Saucelabs, an online service that can test multiple
browser/OS combinations remotely. (Currently, all tests are written for use for Chrome on Mac).

You will need a Saucelabs account in order to use it for testing. If you have one, you can
find your Access Key:
1. click your username
1. select "User Settings" from the dropdown menu
1. near the bottom of the page is your access key

To run tests using Saucelabs, run the command:

```bash
SMOKE_USERNAME=username SMOKE_PASSWORD=password SAUCE_USERNAME=saucelabsUsername SAUCE_ACCESS_KEY=saucelabsAccessKey ROOT_URL=https://scratch.mit.edu npm run test:integration:remote
```

*NOTE: Currently Jest tests will not run with Saucelabs.*

#### Configuration

| Variable      		| Default               | Description                                 			    |
| ---------------------	| --------------------- | --------------------------------------------------------- |
| `ROOT_URL`			| `scratch.ly`			| Location you want to run the tests against                |
| `SMOKE_USERNAME`    	| `None` 				| Username for Scratch user you're signing in with to test 	|
| `SMOKE_PASSWORD`  	| `None`                | Password for Scratch user you're signing in with to test  |
| `SMOKE_REMOTE`        | `false`               | Tests with Sauce Labs or not. True if running test:smoke:sauce |
| `SMOKE_HEADLESS`      | `false`               | Run browser in headless mode. Flaky at the moment         |
| `SAUCE_USERNAME`      | `None`                | Username for your Sauce Labs account                      |
| `SAUCE_ACCESS_KEY`    | `None`                | Access Key for Sauce Labs found under User Settings       |

## To Deploy

Deploying to staging or production will upload code to S3 and configure Fastly.

```bash
npm install
virtualenv ENV
. ENV/bin/activate
pip install -r requirements.txt
npm run build && npm run deploy
```

| Variable                 | Default | Description                                      |
| ------------------------ | ------- | ------------------------------------------------ |
| `FASTLY_SERVICE_ID`      | `''`    | Fastly service ID for `bin/configure-fastly.js`  |
| `FASTLY_API_KEY`         | `''`    | Fastly API key for `bin/configure-fastly.js`     |
| `FASTLY_ACTIVATE_CHANGES`| `false` | Activate changes and purge all after configuring |
| `AWS_ACCESS_KEY_ID`      | `''`    | AWS access key id for S3                         |
| `AWS_SECRET_ACCESS_KEY`  | `''`    | AWS secret access key for S3                     |
| `S3_BUCKET_NAME`         | `''`    | S3 bucket name to deploy into                    |

## Windows

For development on Windows, you will probably need to use a program that provides you a Unix interface.

There are several options for doing this:

* Use the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run Linux inside Windows
* Use [Cygwin](https://www.cygwin.com/)
* Use Wubi, a Windows Installer for Ubuntu that allows you to have Ubuntu and Windows on one disk, without the need of an extra partition. There is a [version for Windows XP, Vista, or 7](https://wiki.ubuntu.com/WubiGuide) and a [version for Windows 8 or higher](https://github.com/hakuna-m/wubiuefi).

In addition, you will need to install Node; [here are instructions for installing Node on WSL](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2#install-nvm-nodejs-and-npm).

## Current issues with developing scratch-www

We're currently in the process of transitioning into this web client from Scratch's existing structure. As we transition, there are going to be some issues along the way that relate to how this client needs to interact with the existing infrastructure to work properly in production.

### FALLBACK

On top of migrating to using this as our web client, Scratch is also transitioning into using a new API backend, Scratch REST API (closed-source). As that is also currently in development and incomplete, we are set up to fall back to using existing Scratch endpoints if an API endpoint does not exist – which is where the `FALLBACK` comes in.

Most of the issues we have currently revolve around the use of `FALLBACK`. This variable is used to specify what URL to fall back onto should a request fail within the context of this web client, or when using the `API_HOST`. If not specified in the process, it will not be used, and any request that is not made through the web client or the API will be unreachable.

Setting `FALLBACK=https://scratch.mit.edu` allows the web client to retrieve data from the Scratch website in your development environment. However, because of security concerns, trying to send data to Scratch through your development environment won't work. This means the following things will be broken for the time being:

* Login on the splash page (*In the process of being fixed*)
* Some update attempts to production data made through a development version of the web client

Additionally, if you set `FALLBACK=https://scratch.mit.edu`, be aware that clicking on links to parts of the website not yet migrated over (currently such as `Discuss`, `Profile`, `My Stuff`, etc.) will take you to the Scratch website itself.
