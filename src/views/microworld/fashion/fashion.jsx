var React = require('react'); // eslint-disable-line
var render = require('../../../lib/render.jsx');
var Microworld = require('../../../components/microworld/microworld.jsx');
var Page = require('../../../components/page/www/page.jsx');

var microworldData = require('./fashion.json');

render(<Page><Microworld microworldData={microworldData} /></Page>, document.getElementById('app'));
