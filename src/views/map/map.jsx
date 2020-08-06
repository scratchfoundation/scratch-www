const React = require('react');
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');
const WorldMap = require('../../components/world-map/world-map.jsx');

const data = require('./user-data.json');

const countryNames = Object.keys(data);
const countryData = countryNames.map(key => data[key].count);
const colorIndex = countryNames.map(key => data[key]['log count']);

const Map = () => (
    <div>
        <WorldMap
            colorIndex={colorIndex}
            countryData={countryData}
            countryNames={countryNames}
        />
    </div>
);

render(<Page><Map /></Page>, document.getElementById('app'));
