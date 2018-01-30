const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./flex-row.scss');

const FlexRow = props => (
    <props.as className={classNames('flex-row', props.className)}>
        {props.children}
    </props.as>
);

FlexRow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

FlexRow.defaultProps = {
    as: 'div'
};

module.exports = FlexRow;
