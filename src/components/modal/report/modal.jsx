const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');
const log = require('../../../lib/log.js');

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
            'handleReasonSelect',
            'handleSubmit'
        ]);
        this.state = {
            prompt: props.intl.formatMessage({id: 'report.promptPlaceholder'}),
            reason: '',
            waiting: false
        };
    }
    handleReasonSelect (name, value) {
        const prompts = [
            this.props.intl.formatMessage({id: 'report.promptCopy'}),
            this.props.intl.formatMessage({id: 'report.promptUncredited'}),
            this.props.intl.formatMessage({id: 'report.promptScary'}),
            this.props.intl.formatMessage({id: 'report.promptLanguage'}),
            this.props.intl.formatMessage({id: 'report.promptMusic'}),
            this.props.intl.formatMessage({id: 'report.promptPersonal'}),
            this.props.intl.formatMessage({id: 'report.promptGuidelines'}),
            'not used',
            this.props.intl.formatMessage({id: 'report.promptImage'})
        ];
        this.setState({prompt: prompts[value], reason: value});
    }
    handleSubmit (formData) {
        this.setState({waiting: true});
        this.props.onReport(formData, err => {
            if (err) log.error(err);
            this.setState({
                prompt: this.props.intl.formatMessage({id: 'report.promptPlaceholder'}),
                reason: '',
                waiting: false
            });
        });
    }
    render () {
        const {
            intl,
            onReport, // eslint-disable-line no-unused-vars
            type,
            ...modalProps
        } = this.props;
        const contentLabel = intl.formatMessage({id: `report.${type}`});
        return (
            <Modal
                className="mod-report"
                contentLabel={contentLabel}
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
                            onSubmit={this.handleSubmit}
                        >
                            <Select
                                required
                                name="reason"
                                options={[
                                    {
                                        value: '',
                                        label: this.props.intl.formatMessage({id: 'report.reasonPlaceHolder'})
                                    },
                                    {
                                        value: '0',
                                        label: this.props.intl.formatMessage({id: 'report.reasonCopy'})
                                    },
                                    {
                                        value: '1',
                                        label: this.props.intl.formatMessage({id: 'report.reasonUncredited'})
                                    },
                                    {
                                        value: '2',
                                        label: this.props.intl.formatMessage({id: 'report.reasonScary'})
                                    },
                                    {
                                        value: '3',
                                        label: this.props.intl.formatMessage({id: 'report.reasonLanguage'})
                                    },
                                    {
                                        value: '4',
                                        label: this.props.intl.formatMessage({id: 'report.reasonMusic'})
                                    },
                                    {
                                        value: '8',
                                        label: this.props.intl.formatMessage({id: 'report.reasonImage'})
                                    },
                                    {
                                        value: '5',
                                        label: this.props.intl.formatMessage({id: 'report.reasonPersonal'})
                                    },
                                    {
                                        value: '6',
                                        label: this.props.intl.formatMessage({id: 'report.reasonOther'})
                                    }
                                ]}
                                value={this.state.reason}
                                onChange={this.handleReasonSelect}
                            />
                            <TextArea
                                required
                                className="report-text"
                                name="reportText"
                                placeholder={this.state.prompt}
                                validationErrors={{
                                    maxLength: this.props.intl.formatMessage({id: 'report.tooLongError'}),
                                    minLength: this.props.intl.formatMessage({id: 'report.tooShortError'})
                                }}
                                validations={{
                                    // TODO find out max and min characters
                                    maxLength: 500,
                                    minLength: 30
                                }}
                            />
                            {this.state.reportWaiting ? [
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
    type: PropTypes.string
};

module.exports = injectIntl(ReportModal);
