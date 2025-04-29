const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./flex-row.scss');

const FlexRow = ({
    as: Component = 'div',
    className,
    children
}) => (
    <Component className={classNames('flex-row', className)}>
        {children}
    </Component>
);

FlexRow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    as: PropTypes.elementType
};

module.exports = FlexRow;
