const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
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

// The Progression component uses numbers to track which step it's on, but that's
// hard to read. Make the code easier to read by giving each step number a label.
const STEPS = {
    category: 0,
    subcategory: 1,
    textInput: 2,
    confirmation: 3,
    deadend: 4
};

class ReportModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSetCategory',
            'handleSubmit',
            'handleSetSubcategory'
        ]);
        this.state = {
            step: STEPS.category,
            categoryValue: '',
            subcategoryValue: null
        };
    }
    handleSetCategory (formData) {
        const category = this.props.reportOptions.find(o => o.value === formData.category) || this.props.reportOptions[0];

        return this.setState({
            categoryValue: formData.category,
            step: category.subcategories ? STEPS.subcategory : STEPS.textInput
        });
    }
    handleSetSubcategory (formData) {
        const category = this.props.reportOptions.find(o => o.value === this.state.categoryValue) || this.props.reportOptions[0];

        const subcategory = category.subcategories.find(o => o.value === formData.subcategory) || category.subcategories[0];
        
        return this.setState({
            subcategoryValue: subcategory.value,
            step: subcategory.preventSubmission ? STEPS.deadend : STEPS.textInput
        });
    }
    handleSubmit (formData) {
        this.props.onReport({
            report_category: this.state.subcategoryValue ? this.state.subcategoryValue : this.state.categoryValue,
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
        let finalCategory = category;

        if (category.subcategories) {
           finalCategory = category.subcategories.find(o => o.value === this.state.subcategoryValue) || category.subcategories[0];
        }


        // Confirmation step is shown if a report has been submitted, even if state is reset by closing the modal.
        // This prevents multiple report submission within the same session because submission is stored in redux.
        const step = isConfirmed ? STEPS.confirmation : this.state.step;

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
                        <Progression step={step}>
                            {/* Category selection step */}
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

                            {/* Subcategory selection step */}
                            <FormStep
                                nextLabel={{id: 'general.next'}}
                                onNext={this.handleSetSubcategory}
                            >
                                <div className="instructions">
                                    <div className="instructions-header">
                                        <FormattedMessage {...category.label} />
                                    </div>
                                    <FormattedHTMLMessage {...category.prompt} />
                                </div>
                                <Select
                                    required
                                    elementWrapperClassName="report-modal-field"
                                    label={null}
                                    name="subcategory"
                                    options={category.subcategories ? category.subcategories.map(option => ({
                                        value: option.value,
                                        label: intl.formatMessage(option.label),
                                        key: option.value
                                    })) : []}
                                    validationErrors={{
                                        isDefaultRequiredValue: categoryRequiredMessage
                                    }}
                                />
                            </FormStep>

                            {/* Text input step */}
                            <FormStep
                                isWaiting={isWaiting}
                                nextLabel={{id: 'report.send'}}
                                onNext={this.handleSubmit}
                            >
                                <div className="instructions">
                                    <div className="instructions-header">
                                        <FormattedMessage {...finalCategory.label} />
                                    </div>
                                    <FormattedHTMLMessage {...finalCategory.prompt} />
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

                            {/* Confirmation step */}
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

                            {/* Deadend */}
                            <FormStep
                                submitEnabled
                                nextLabel={{id: 'general.close'}}
                                onNext={onRequestClose}
                            >   
                                <div className="instructions">
                                    <div className="instructions-header">
                                        <FormattedMessage {...finalCategory.label} />
                                    </div>
                                    <FormattedMessage {...finalCategory.prompt} />
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
