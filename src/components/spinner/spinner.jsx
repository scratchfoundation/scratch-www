const range = require('lodash.range');
const PropTypes = require('prop-types');
const React = require('react');

require('./spinner.scss');

// Adapted from http://tobiasahlin.com/spinkit/
const Spinner = ({
    mode
}) => {
    const spinnerClassName = (mode === 'smooth' ? 'spinner-smooth' : 'spinner');
    const spinnerDivCount = (mode === 'smooth' ? 24 : 12);
    return (
        <div className={spinnerClassName}>
            {range(1, spinnerDivCount + 1).map(id => (
                <div
                    className={`circle${id} circle`}
                    key={`circle${id}`}
                />
            ))}
        </div>
    );
};

Spinner.propTypes = {
    mode: PropTypes.string
};

module.exports = Spinner;
