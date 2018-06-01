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

class ReportModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleReportCategorySelect'
        ]);
        this.state = {
            reportCategory: this.props.report.category,
            options: [
                {
                    value: '',
                    label: this.props.intl.formatMessage({id: 'report.reasonPlaceHolder'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptPlaceholder'})
                },
                {
                    value: '0',
                    label: this.props.intl.formatMessage({id: 'report.reasonCopy'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptCopy'})
                },
                {
                    value: '1',
                    label: this.props.intl.formatMessage({id: 'report.reasonUncredited'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptUncredited'})
                },
                {
                    value: '2',
                    label: this.props.intl.formatMessage({id: 'report.reasonScary'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptScary'})
                },
                {
                    value: '3',
                    label: this.props.intl.formatMessage({id: 'report.reasonLanguage'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptLanguage'})
                },
                {
                    value: '4',
                    label: this.props.intl.formatMessage({id: 'report.reasonMusic'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptMusic'})
                },
                {
                    value: '8',
                    label: this.props.intl.formatMessage({id: 'report.reasonImage'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptImage'})
                },
                {
                    value: '5',
                    label: this.props.intl.formatMessage({id: 'report.reasonPersonal'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptPersonal'})
                },
                {
                    value: '6',
                    label: this.props.intl.formatMessage({id: 'general.other'}),
                    prompt: this.props.intl.formatMessage({id: 'report.promptGuidelines'})
                }
            ]
        };
    }
    handleReportCategorySelect (name, value) {
        this.setState({reportCategory: value});
    }
    lookupPrompt (value) {
        return this.state.options.find(item => item.value === value).prompt;
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
                                options={this.state.options}
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
