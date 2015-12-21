## scratch-www
#### Standalone web client for Scratch

[![Build Status](https://magnum.travis-ci.com/LLK/scratch-www.svg?token=xzzHj4ct3SyBTpeqxnx1)](https://magnum.travis-ci.com/LLK/scratch-www)

### To Build
```bash
npm install
npm run build
```

### To Run
```bash
npm start
```

During development, `npm start` watches any update you make to files in either `./static` or `./src` and triggers a rebuild of the project.  In development the build is stored in memory, and not served from the `./build` directory.

Once running, open `http://localhost:8333` in your browser. If you wish to have the server reload automatically, you can install either [nodemon](https://github.com/remy/nodemon) or [forever](https://github.com/foreverjs/forever).

### To stop
Use `^C` to stop the node process `npm start` starts. 

#### Configuration

`npm start` can be configured with the following environment variables

| Variable      | Default                               | Description                                    |
| ------------- | ------------------------------------- | ---------------------------------------------- |
| `API_HOST`    | `https://api.scratch.mit.edu`         | Hostname for API requests                      |
| `NODE_ENV`    | `null`                                | If not `production`, app acts like development |
| `PORT`        | `8333`                                | Port for devserver (http://localhost:XXXX)     |
| `FALLBACK`  | `''`             | Pass-through location for scratchr2            |

### To Test
```bash
npm test
```

### Current issues with the development
We're currently in the process of transitioning into this web client from Scratch's existing structure. As we transition, there are going to be some issues along the way that relate to how this client needs to interact with the existing infrastructure to work properly in production.

On top of migrating to using this as our web client, Scratch is also transitioning into using a new API backend, Scratch REST API. As that is also currently in development and incomplete, we are set up to fall back to using existing Scratch endpoints if an API endpoint does not exist – which is where the `FALLBACK` comes in.

Most of the issues we have currently revolve around the use of `FALLBACK`. This variable is used to specify what url to fall back onto should a request fail within the context of this webclient, or when using the `API_HOST`. If not specified in the process, it will not be used, and any request that is not made through the web client or the API will be unreachable.

Setting `FALLBACK=https://scratch.mit.edu` allows the web client to retrieve data from the Scratch website in your development environment. However, because of security concerns, trying to send data to Scratch through your development environment won't work. This means the following things will be broken for the time being:
* Login on the splash page (*In the process of being fixed*)
* Some update attempts to production data made through a development version of the web client
