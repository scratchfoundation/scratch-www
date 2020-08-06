import Plot from 'react-plotly.js';
const React = require('react');
const PropTypes = require('prop-types');

require('./world-map.scss');

const WorldMap = props => (
    <Plot
        data={[
            {
                type: 'choropleth', // world map with gradient color data
                locationmode: 'country names',
                locations: props.countryNames,
                z: props.colorIndex,
                text: props.countryData,
                autocolorscale: false,
                colorscale: 'Blues',
                reversescale: true
            }
        ]}
        layout={
            {
                title: 'registered users',
                geo: {
                    projection: {
                        type: 'robinson'
                    }
                }
            }
        }
    />
);

WorldMap.propTypes = {
    colorIndex: PropTypes.arrayOf(PropTypes.string),
    countryData: PropTypes.arrayOf(PropTypes.string),
    countryNames: PropTypes.arrayOf(PropTypes.string)
};

module.exports = WorldMap;
