const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./modal-title.scss');

const ModalTitle = ({
    className,
    title
}) => (
    <div
        className={classNames(
            'modal-title',
            className
        )}
    >
        {title}
    </div>
);

ModalTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
};

module.exports = ModalTitle;
