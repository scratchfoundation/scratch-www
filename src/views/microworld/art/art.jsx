var render = require('../../../lib/render.jsx');
var Microworld = require('../../../components/container/microworld/microworld.jsx');

var microworldData = require('./microworld_art.json');

render(<Microworld microworldData={microworldData} />, document.getElementById('view'));
