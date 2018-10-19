const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');
const classNames = require('classnames');

const Form = require('../../forms/form.jsx');
const Button = require('../../forms/button.jsx');
const Select = require('../../forms/select.jsx');
const Spinner = require('../../spinner/spinner.jsx');
const TextArea = require('../../forms/textarea.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
const previewActions = require('../../../redux/preview.js');

require('../../forms/button.scss');
require('./modal.scss');

const REPORT_OPTIONS = [
    {
        value: '',
        label: {id: 'report.reasonPlaceHolder'},
        prompt: {id: 'report.promptPlaceholder'}
    },
    {
        value: '0',
        label: {id: 'report.reasonCopy'},
        prompt: {id: 'report.promptCopy'}
    },
    {
        value: '1',
        label: {id: 'report.reasonUncredited'},
        prompt: {id: 'report.promptUncredited'}
    },
    {
        value: '2',
        label: {id: 'report.reasonScary'},
        prompt: {id: 'report.promptScary'}
    },
    {
        value: '3',
        label: {id: 'report.reasonLanguage'},
        prompt: {id: 'report.promptLanguage'}
    },
    {
        value: '4',
        label: {id: 'report.reasonMusic'},
        prompt: {id: 'report.promptMusic'}
    },
    {
        value: '8',
        label: {id: 'report.reasonImage'},
        prompt: {id: 'report.promptImage'}
    },
    {
        value: '5',
        label: {id: 'report.reasonPersonal'},
        prompt: {id: 'report.promptPersonal'}
    },
    {
        value: '6',
        label: {id: 'general.other'},
        prompt: {id: 'report.promptGuidelines'}
    }
];

class ReportModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCategorySelect',
            'handleValid',
            'handleInvalid'
        ]);
        this.state = {
            category: '',
            notes: '',
            valid: false
        };
    }
    handleCategorySelect (name, value) {
        this.setState({category: value});
    }
    handleValid () {
        this.setState({valid: true});
    }
    handleInvalid () {
        this.setState({valid: false});
    }
    lookupPrompt (value) {
        const prompt = REPORT_OPTIONS.find(item => item.value === value).prompt;
        return this.props.intl.formatMessage(prompt);
    }
    render () {
        const {
            intl,
            isConfirmed,
            isError,
            isOpen,
            isWaiting,
            onReport, // eslint-disable-line no-unused-vars
            onRequestClose,
            type,
            ...modalProps
        } = this.props;
        const submitEnabled = this.state.valid && !isWaiting;
        const submitDisabledParam = submitEnabled ? {} : {disabled: 'disabled'};
        const contentLabel = intl.formatMessage({id: `report.${type}`});
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
                        <div className="report-content-label content-label">
                            {contentLabel}
                        </div>
                    </div>

                    <Form
                        className="report"
                        onInvalid={this.handleInvalid}
                        onValid={this.handleValid}
                        onValidSubmit={onReport}
                    >
                        <div className="report-modal-content modal-content">
                            {isConfirmed ? (
                                <div className="received">
                                    <div className="received-header">
                                        <FormattedMessage id="report.receivedHeader" />
                                    </div>
                                    <FormattedMessage id="report.receivedBody" />
                                </div>
                            ) : (
                                <div>
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
                                        name="report_category"
                                        options={REPORT_OPTIONS.map(option => ({
                                            value: option.value,
                                            label: this.props.intl.formatMessage(option.label),
                                            key: option.value
                                        }))}
                                        validationErrors={{
                                            isDefaultRequiredValue: this.props.intl.formatMessage({
                                                id: 'report.reasonMissing'
                                            })
                                        }}
                                        value={this.state.category}
                                        onChange={this.handleCategorySelect}
                                    />
                                    <TextArea
                                        required
                                        className="report-text"
                                        elementWrapperClassName="report-modal-field"
                                        label={null}
                                        name="notes"
                                        placeholder={this.lookupPrompt(this.state.category)}
                                        validationErrors={{
                                            isDefaultRequiredValue: this.props.intl.formatMessage({
                                                id: 'report.textMissing'
                                            }),
                                            maxLength: this.props.intl.formatMessage({id: 'report.tooLongError'}),
                                            minLength: this.props.intl.formatMessage({id: 'report.tooShortError'})
                                        }}
                                        validations={{
                                            maxLength: 500,
                                            minLength: 20
                                        }}
                                        value={this.state.notes}
                                    />
                                </div>
                            )}
                            {isError && (
                                <div className="error-text">
                                    <FormattedMessage id="report.error" />
                                </div>
                            )}
                        </div>
                        <FlexRow className="action-buttons">
                            <div className="action-buttons-overflow-fix">
                                {isConfirmed ? (
                                    <Button
                                        className="action-button submit-button"
                                        type="button"
                                        onClick={onRequestClose}
                                    >
                                        <div className="action-button-text">
                                            <FormattedMessage id="general.close" />
                                        </div>
                                    </Button>
                                ) : (
                                    <Button
                                        className={classNames(
                                            'action-button',
                                            'submit-button',
                                            {disabled: !submitEnabled}
                                        )}
                                        {...submitDisabledParam}
                                        key="submitButton"
                                        type="submit"
                                    >
                                        {isWaiting ? (
                                            <div className="action-button-text">
                                                <Spinner />
                                                <FormattedMessage id="report.sending" />
                                            </div>
                                        ) : (
                                            <div className="action-button-text">
                                                <FormattedMessage id="report.send" />
                                            </div>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </FlexRow>
                    </Form>
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
    type: PropTypes.string
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
