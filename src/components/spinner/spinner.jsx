const React = require('react');
const PropTypes = require('prop-types');
const classNames = require('classnames');

require('./spinner.scss');

// Adapted from http://tobiasahlin.com/spinkit/
// Available colors right now are white, blue and transparent-gray
const Spinner = props => (
    <img
        alt="loading animation"
        className={classNames('studio-status-icon-spinner', props.className)}
        src={`/svgs/modal/spinner-${props.color}.svg`}
    />
);

Spinner.defaultProps = {
    color: 'white'
};

Spinner.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string
};

module.exports = Spinner;
