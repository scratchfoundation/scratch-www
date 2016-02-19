var render = require('../../lib/render.jsx');
var Microworld = require('../../components/microworld/microworld.jsx');

render(<Microworld microworldData={require("./microworld_hiphop.json")} />, document.getElementById('view'));
