const range = require('lodash.range');
const React = require('react');

require('./spinner.scss');

// Adapted from http://tobiasahlin.com/spinkit/
const Spinner = () => (
    <div className="spinner">
        {range(1, 13).map(id => (
            <div
                className={`circle${id} circle`}
                key={`circle${id}`}
            />
        ))}
    </div>
);

module.exports = Spinner;
