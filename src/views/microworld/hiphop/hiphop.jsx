var React = require('react');
var render = require('../../../lib/render.jsx');
var Microworld = require('../../../components/microworld/microworld.jsx');
var Page = require('../../../components/page/www/page.jsx')

var microworldData = require('./hiphop.json');

render(<Page><Microworld microworldData={microworldData} /></Page>, document.getElementById('app'));
