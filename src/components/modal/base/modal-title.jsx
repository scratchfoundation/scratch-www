const PropTypes = require('prop-types');
const React = require('react');

require('./modal-title.scss');

const ModalTitle = ({
    title
}) => (
    <div className="modal-title">
        {title}
    </div>
);

ModalTitle.propTypes = {
    title: PropTypes.string
};

module.exports = ModalTitle;
