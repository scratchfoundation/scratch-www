## scratch-www
#### Standalone web client for Scratch

[![Build Status](https://travis-ci.org/LLK/scratch-www.svg)](https://travis-ci.org/LLK/scratch-www)
[![Coverage Status](https://coveralls.io/repos/github/LLK/scratch-www/badge.svg?branch=develop)](https://coveralls.io/github/LLK/scratch-www?branch=develop)
[![dependencies Status](https://david-dm.org/llk/scratch-www/status.svg)](https://david-dm.org/llk/scratch-www)
[![devDependencies Status](https://david-dm.org/llk/scratch-www/dev-status.svg)](https://david-dm.org/llk/scratch-www?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/LLK/scratch-www.svg)](https://greenkeeper.io/)

### Where am I?
Physically? No idea.

Digitally? You’re at Scratch’s open source web client!

We’re working to update the [Scratch website](https://scratch.mit.edu) to use a new codebase, contained in this repository.

We’re currently building Scratch using [React](https://facebook.github.io/react/) and [SCSS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html). Here are some resources to help you get acquainted with how we’re working on the Scratch codebase:

* [Style Guide](https://github.com/LLK/scratch-www/wiki/Style-Guide)
* [Testing Guide](https://github.com/LLK/scratch-www/wiki/Testing-Guide-for-Bugfixes)
* [Localization Guide](https://github.com/LLK/scratch-www/wiki/Localization-Guide)
* [Map of the repository](https://github.com/LLK/scratch-www/wiki/Repo-Map)


### Before Getting Started
* Make sure you have node (v4.2 or higher) and npm [installed](https://docs.npmjs.com/getting-started/installing-node)
We use npm (Node Package Manager) to maintain and update packages required to build the site.

### Update Packages
It's important to make sure that all of the dependencies are up to date because the scratch-www code only works with specific versions of the dependencies. You can update the packages by running this command:

```bash
npm install
```

### To Build
To compile the source code into HTML and JavaScript bundles browsers can read, run this command:

```bash
npm run build
```
If you want to run a server that rebuilds the files as you edit them, skip to the To Run section below.

#### Warnings during npm install

These warnings can be safely ignored:

```bash
npm WARN react-modal@0.6.1 requires a peer of react@^0.14.0 but none was installed.
npm WARN react-redux@4.4.0 requires a peer of react@^0.14.0 but none was installed.
npm WARN react-redux@4.4.0 requires a peer of redux@^2.0.0 || ^3.0.0 but none was installed.
npm WARN react-addons-test-utils@0.14.7 requires a peer of react@^0.14.7 but none was installed.
npm WARN react-dom@0.14.8 requires a peer of react@^0.14.8 but none was installed.
```

These currently exist in static/js/lib

### To Run
If you would like to create a temporary version of the site on your machine that you can access through your web browser run the command below.  Building (see To Build above) is not necessary for this step and the temporary server can be turned off (see To Stop below).

The intl directory must be built separately with the `make translations` line below in order for the text to appear properly.

```bash
make translations
npm start
```

The site hosted on your local machine can now be accessed by a web browser by entering localhost:8333 into your web browser.

During development, `npm start` watches any update you make to files in either `./static` or `./src` and triggers a rebuild of the project.  In development, the build is stored in memory, and not served from the `./build` directory.

When running `npm start`, here are some important log messages to keep an eye out for:
* `webpack: bundle is now VALID.` – The bundle has been loaded into memory and is now viewable in the browser. This will show up both once `npm start` has completed its setup, and also once updates you make to files have been re-compiled for viewing in the browser.
* `webpack: bundle is now INVALID.` – If you see this, then it means you have made updates to files that are still being compiled for browser viewing. Pages will still be viewable, but they will not see any updates you made yet.

Once running, open `http://localhost:8333` in your browser. If you wish to have the server reload automatically, you can install either [nodemon](https://github.com/remy/nodemon) or [forever](https://github.com/foreverjs/forever).

### To stop
To stop the process that is making the site available to your web browser (created above in To Start) use `^C`.

#### Configuration

`npm start` can be configured with the following environment variables

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

**NOTE:** Because by default `API_HOST=https://api.scratch.mit.edu`, please be aware that, by default, you will be seeing and interacting with real data on the Scratch website.

### To Test
```bash
npm test
```

### To Deploy

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


### Current issues with the development
We're currently in the process of transitioning into this web client from Scratch's existing structure. As we transition, there are going to be some issues along the way that relate to how this client needs to interact with the existing infrastructure to work properly in production.

#### FALLBACK
On top of migrating to using this as our web client, Scratch is also transitioning into using a new API backend, Scratch REST API. As that is also currently in development and incomplete, we are set up to fall back to using existing Scratch endpoints if an API endpoint does not exist – which is where the `FALLBACK` comes in.

Most of the issues we have currently revolve around the use of `FALLBACK`. This variable is used to specify what URL to fall back onto should a request fail within the context of this web client, or when using the `API_HOST`. If not specified in the process, it will not be used, and any request that is not made through the web client or the API will be unreachable.

Setting `FALLBACK=https://scratch.mit.edu` allows the web client to retrieve data from the Scratch website in your development environment. However, because of security concerns, trying to send data to Scratch through your development environment won't work. This means the following things will be broken for the time being:
* Login on the splash page (*In the process of being fixed*)
* Some update attempts to production data made through a development version of the web client

Additionally, if you set `FALLBACK=https://scratch.mit.edu`, be aware that clicking on links to parts of the website not yet migrated over (currently such as `Explore`, `Discuss`, `Profile`, etc.) will take you to the Scratch website itself.

#### Windows
Some users have experienced difficulties when trying to get our web client to work on Windows. One solution could be to use [Cygwin](https://www.cygwin.com/). If that doesn't work, you might want to use [Wubi](https://wiki.ubuntu.com/WubiGuide) (Windows XP, Vista, 7) or [Wubiuefi](https://github.com/hakuna-m/wubiuefi) (Windows 8 or higher). Wubi(uefi) is a Windows Installer for Ubuntu that allows you to have Ubuntu and Windows on one disk, without the need of an extra partition.
