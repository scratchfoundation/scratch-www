const React = require('react');
const PropTypes = require('prop-types');
const classNames = require('classnames');

require('./spinner.scss');

// Adapted from http://tobiasahlin.com/spinkit/
const Spinner = ({
    className,
    color
}) => (
    <img
        alt="loading animation"
        className={classNames('studio-status-icon-spinner', className)}
        src={`/svgs/modal/spinner-${color}.svg`}
    />
);

Spinner.defaultProps = {
    color: 'white'
};

Spinner.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['white', 'blue', 'transparent-gray'])
};

module.exports = Spinner;
