var render = require('../../../lib/render.jsx');
var Microworld = require('../../../components/microworld/microworld.jsx');

var microworldData = require('./microworld_fashion.json');

render(<Microworld microworldData={microworldData} />, document.getElementById('view'));
