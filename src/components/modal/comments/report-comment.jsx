const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');

const Button = require('../../forms/button.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const ReportModal = ({
    intl,
    isConfirmed,
    onReport,
    onRequestClose,
    ...modalProps
}) => (
    <Modal
        useStandardSizes
        className="mod-report"
        contentLabel={intl.formatMessage({id: 'comments.reportModal.title'})}
        onRequestClose={onRequestClose}
        {...modalProps}
    >
        <div>
            <div className="report-modal-header">
                <div className="report-content-label">
                    <FormattedMessage id="comments.reportModal.title" />
                </div>
            </div>

            <div className="report-modal-content">
                <div>
                    <div className="instructions">
                        {isConfirmed ? (
                            <FormattedMessage id="comments.reportModal.reported" />
                        ) : (
                            <FormattedMessage id="comments.reportModal.prompt" />
                        )}
                    </div>
                </div>
            </div>
            <FlexRow className="action-buttons">
                <div className="action-buttons-overflow-fix">
                    <Button
                        className="action-button submit-button"
                        type="button"
                        onClick={onRequestClose}
                    >
                        <div className="action-button-text">
                            <FormattedMessage id="general.close" />
                        </div>
                    </Button>
                    {isConfirmed ? null : (
                        <Button
                            className="action-button submit-button"
                            type="button"
                            onClick={onReport}
                        >
                            <div className="action-button-text">
                                <FormattedMessage id="general.report" />
                            </div>
                        </Button>
                    )}
                </div>
            </FlexRow>
        </div>
    </Modal>
);


ReportModal.propTypes = {
    intl: intlShape,
    isConfirmed: PropTypes.bool,
    isOwnSpace: PropTypes.bool,
    onReport: PropTypes.func,
    onRequestClose: PropTypes.func,
    type: PropTypes.string
};

module.exports = injectIntl(ReportModal);
