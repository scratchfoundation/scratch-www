const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./modal-inner-content.scss');

const ModalInnerContent = ({
    children,
    className
}) => (
    <div
        className={classNames(
            'modal-inner-content',
            className
        )}
    >
        {children}
    </div>
);

ModalInnerContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = ModalInnerContent;
