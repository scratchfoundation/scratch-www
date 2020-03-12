const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');

const ModalTitle = require('../base/modal-title.jsx');
const ModalInnerContent = require('../base/modal-inner-content.jsx');
const Select = require('../../forms/select.jsx');
const TextArea = require('../../forms/textarea.jsx');
const previewActions = require('../../../redux/preview.js');
const Progression = require('../../progression/progression.jsx');
const FormStep = require('./form-step.jsx');
const {reportOptionsShape, REPORT_OPTIONS} = require('./report-options.js');

require('../../forms/button.scss');
require('./modal.scss');

// Progression component only addresses steps by number, but this flow
// may skip steps so the code is easier to read with a map.
const STEPS = {
    category: 0,
    textInput: 1,
    confirmation: 2
};

class ReportModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSetCategory',
            'handleSubmit'
        ]);
        this.state = {
            step: STEPS.category,
            categoryValue: ''
        };
    }
    handleSetCategory (formData) {
        return this.setState({
            categoryValue: formData.category,
            step: STEPS.textInput
        });
    }
    handleSubmit (formData) {
        this.props.onReport({
            report_category: this.state.categoryValue,
            notes: formData.notes
        });
    }
    render () {
        const {
            intl,
            isConfirmed,
            isError,
            isOpen,
            isWaiting,
            onRequestClose,
            type,
            reportOptions,
            ...modalProps
        } = this.props;
        const contentLabel = intl.formatMessage({id: `report.${type}`});
        const categoryRequiredMessage = intl.formatMessage({id: 'report.reasonMissing'});
        const category = reportOptions.find(o => o.value === this.state.categoryValue) || reportOptions[0];
        return (
            <Modal
                useStandardSizes
                className="mod-report"
                contentLabel={contentLabel}
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                {...modalProps}
            >
                <div>
                    <div className="report-modal-header modal-header">
                        <ModalTitle title={contentLabel} />
                    </div>
                    <ModalInnerContent className="report-modal-content">
                        {isError && (
                            <div className="error-text">
                                <FormattedMessage id="report.error" />
                            </div>
                        )}
                        <Progression step={isConfirmed ? STEPS.confirmation : this.state.step}>
                            <FormStep
                                nextLabel={{id: 'general.next'}}
                                onNext={this.handleSetCategory}
                            >
                                <div className="instructions">
                                    <FormattedMessage
                                        id={`report.${type}Instructions`}
                                        key={`report.${type}Instructions`}
                                        values={{
                                            CommunityGuidelinesLink: (
                                                <a href="/community_guidelines">
                                                    <FormattedMessage id="report.CommunityGuidelinesLinkText" />
                                                </a>
                                            )
                                        }}
                                    />
                                </div>
                                <Select
                                    required
                                    elementWrapperClassName="report-modal-field"
                                    label={null}
                                    name="category"
                                    options={reportOptions.map(option => ({
                                        value: option.value,
                                        label: intl.formatMessage(option.label),
                                        key: option.value
                                    }))}
                                    validationErrors={{
                                        isDefaultRequiredValue: categoryRequiredMessage
                                    }}
                                />
                            </FormStep>
                            <FormStep
                                isWaiting={isWaiting}
                                nextLabel={{id: 'report.send'}}
                                onNext={this.handleSubmit}
                            >
                                <div className="instructions">
                                    <div className="instructions-header">
                                        <FormattedMessage {...category.label} />
                                    </div>
                                    <FormattedMessage {...category.prompt} />
                                </div>
                                <TextArea
                                    autoFocus
                                    required
                                    className="report-text"
                                    elementWrapperClassName="report-modal-field"
                                    label={null}
                                    name="notes"
                                    validationErrors={{
                                        isDefaultRequiredValue: intl.formatMessage({id: 'report.textMissing'}),
                                        maxLength: intl.formatMessage({id: 'report.tooLongError'}),
                                        minLength: intl.formatMessage({id: 'report.tooShortError'})
                                    }}
                                    validations={{
                                        maxLength: 500,
                                        minLength: 20
                                    }}
                                />
                            </FormStep>
                            <FormStep
                                submitEnabled
                                nextLabel={{id: 'general.close'}}
                                onNext={onRequestClose}
                            >
                                <div className="instructions">
                                    <div className="instructions-header">
                                        <FormattedMessage id="report.receivedHeader" />
                                    </div>
                                    <FormattedMessage id="report.receivedBody" />
                                </div>
                            </FormStep>
                        </Progression>
                    </ModalInnerContent>
                </div>
            </Modal>
        );
    }
}

ReportModal.propTypes = {
    intl: intlShape,
    isConfirmed: PropTypes.bool,
    isError: PropTypes.bool,
    isOpen: PropTypes.bool,
    isWaiting: PropTypes.bool,
    onReport: PropTypes.func,
    onRequestClose: PropTypes.func,
    reportOptions: reportOptionsShape,
    type: PropTypes.string
};

ReportModal.defaultProps = {
    reportOptions: REPORT_OPTIONS
};

const mapStateToProps = state => ({
    isConfirmed: state.preview.status.report === previewActions.Status.FETCHED,
    isError: state.preview.status.report === previewActions.Status.ERROR,
    isWaiting: state.preview.status.report === previewActions.Status.FETCHING
});

const mapDispatchToProps = () => ({});

const ConnectedReportModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportModal);

module.exports = injectIntl(ConnectedReportModal);
