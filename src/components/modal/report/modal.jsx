const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');

const Form = require('../../forms/form.jsx');
const Button = require('../../forms/button.jsx');
const Select = require('../../forms/select.jsx');
const Spinner = require('../../spinner/spinner.jsx');
const TextArea = require('../../forms/textarea.jsx');

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
            'handleReportCategorySelect'
        ]);
        this.state = {reportCategory: this.props.report.category};
    }
    handleReportCategorySelect (name, value) {
        this.setState({reportCategory: value});
    }
    lookupPrompt (value) {
        const prompt = REPORT_OPTIONS.find(item => item.value === value).prompt;
        return this.props.intl.formatMessage(prompt);
    }
    render () {
        const {
            intl,
            onReport, // eslint-disable-line no-unused-vars
            report,
            type,
            ...modalProps
        } = this.props;
        const contentLabel = intl.formatMessage({id: `report.${type}`});
        return (
            <Modal
                className="mod-report"
                contentLabel={contentLabel}
                isOpen={report.open}
                {...modalProps}
            >
                <div>
                    <div className="report-modal-header">
                        <div className="report-content-label">
                            {contentLabel}
                        </div>
                    </div>

                    <div className="report-modal-content">
                        <FormattedMessage
                            id={`report.${type}Instructions`}
                            values={{
                                CommunityGuidelinesLink: (
                                    <a href="/community_guidelines">
                                        <FormattedMessage id="report.CommunityGuidelinesLinkText" />
                                    </a>
                                )
                            }}
                        />
                        <Form
                            className="report"
                            onSubmit={onReport}
                        >
                            <Select
                                required
                                elementWrapperClassName="report-modal-field"
                                label={null}
                                name="report_category"
                                options={REPORT_OPTIONS.map(option => ({
                                    value: option.value,
                                    label: this.props.intl.formatMessage(option.label)
                                }))}
                                value={this.state.reportCategory}
                                onChange={this.handleReportCategorySelect}
                            />
                            <TextArea
                                required
                                className="report-text"
                                elementWrapperClassName="report-modal-field"
                                label={null}
                                name="notes"
                                placeholder={this.lookupPrompt(this.state.reportCategory)}
                                validationErrors={{
                                    maxLength: this.props.intl.formatMessage({id: 'report.tooLongError'}),
                                    minLength: this.props.intl.formatMessage({id: 'report.tooShortError'})
                                }}
                                validations={{
                                    maxLength: 500,
                                    minLength: 20
                                }}
                                value={report.notes}
                            />
                            {report.waiting ? [
                                <Button
                                    className="submit-button white"
                                    disabled="disabled"
                                    key="submitButton"
                                    type="submit"
                                >
                                    <Spinner />
                                </Button>
                            ] : [
                                <Button
                                    className="submit-button white"
                                    key="submitButton"
                                    type="submit"
                                >
                                    <FormattedMessage id="report.send" />
                                </Button>
                            ]}
                        </Form>
                    </div>
                </div>
                
            </Modal>
        );
    }
}

ReportModal.propTypes = {
    intl: intlShape,
    onReport: PropTypes.func,
    onRequestClose: PropTypes.func,
    report: PropTypes.shape({
        category: PropTypes.string,
        notes: PropTypes.string,
        open: PropTypes.bool,
        waiting: PropTypes.bool
    }),
    type: PropTypes.string
};

module.exports = injectIntl(ReportModal);
