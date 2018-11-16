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

const DeleteModal = ({
    intl,
    onDelete,
    onReport,
    onRequestClose,
    ...modalProps
}) => (
    <Modal
        useStandardSizes
        className="mod-report"
        contentLabel={intl.formatMessage({id: 'comments.deleteModal.title'})}
        onRequestClose={onRequestClose}
        {...modalProps}
    >
        <div>
            <div className="report-modal-header">
                <div className="report-content-label">
                    <FormattedMessage id="comments.deleteModal.title" />
                </div>
            </div>

            <div className="report-modal-content">
                <div>
                    <div className="instructions">
                        <FormattedMessage id="comments.deleteModal.body" />
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
                    <Button
                        className="action-button submit-button"
                        type="button"
                        onClick={onReport}
                    >
                        <FormattedMessage id="general.report" />
                    </Button>
                    <Button
                        className="action-button submit-button"
                        type="button"
                        onClick={onDelete}
                    >
                        <FormattedMessage id="comments.delete" />
                    </Button>
                </div>
            </FlexRow>
        </div>
    </Modal>
);


DeleteModal.propTypes = {
    intl: intlShape,
    onDelete: PropTypes.func,
    onReport: PropTypes.func,
    onRequestClose: PropTypes.func
};

module.exports = injectIntl(DeleteModal);
