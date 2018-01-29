const React = require('react'); // eslint-disable-line

const Microworld = require('../../../components/microworld/microworld.jsx');

const Page = require('../../../components/page/www/page.jsx');
const render = require('../../../lib/render.jsx');

const microworldData = require('./soccer.json');

render(<Page><Microworld microworldData={microworldData} /></Page>, document.getElementById('app'));
