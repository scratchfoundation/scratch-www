const range = require('lodash.range');
const React = require('react');

require('./spinner.scss');

// Adapted from http://tobiasahlin.com/spinkit/
const Spinner = (props) => {
    const spinnerClassName = (props.type === "smooth" ? "spinner-smooth" : "spinner");
    const spinnerDivCount = (props.type === "smooth" ? 24 : 12)
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

module.exports = Spinner;
