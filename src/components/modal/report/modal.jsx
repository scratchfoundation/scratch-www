const PropTypes = require('prop-types');
const React = require('react');
const Modal = require('../base/modal.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const ReportModal = props => (
    <Modal
        className="mod-report"
        {...props}
    >
        <div>
            <div className="report-modal-header">
                <div className="report-content-label">
                    {props.contentLabel}
                </div>
            </div>

            <div className="report-modal-content">
                {props.children}
            </div>
        </div>
        
    </Modal>
);

ReportModal.propTypes = {
    children: PropTypes.node,
    contentLabel: PropTypes.string,
    onRequestClose: PropTypes.func
};

module.exports = ReportModal;
