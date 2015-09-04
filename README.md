## scratch-www
#### Standalone web client for Scratch

[![Build Status](https://magnum.travis-ci.com/LLK/scratch-www.svg?token=xzzHj4ct3SyBTpeqxnx1)](https://magnum.travis-ci.com/LLK/scratch-www)

### To Build
```bash
npm install
npm run build
```

During development, you can use `npm run watch` to cause any update you make to files in either `./static` or `./src` to trigger a rebuild of the project.

### To Run
```bash
npm start
```

Once running, open `http://localhost:8888` in your browser. If you wish to have the server reload automatically, you can install either [nodemon](https://github.com/remy/nodemon) or [forever](https://github.com/foreverjs/forever).

### To Test
```bash
npm test
```
