var render = require('../../lib/render.jsx');
var Microworld = require('../../components/microworld/microworld.jsx');

render(<Microworld microworldData={require("./microworld_fashion.json")} />, document.getElementById('view'));
