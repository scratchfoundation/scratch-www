const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');

const Form = require('../../forms/form.jsx');
const Button = require('../../forms/button.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
const Input = require('../../components/forms/input.jsx');
const TextArea = require('../../components/forms/textarea.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const ExternalShareModalPresentation = ({
    intl,
    isOpen,
    studios,
    waitingToClose,
    onToggleStudio,
    onRequestClose,
    onSubmit
}) => {
    const contentLabel = intl.formatMessage({id: 'externalshare.title'});

    return (
        <Modal
            useStandardSizes
            className="mod-externalShare"
            contentLabel={contentLabel}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="externalShare-modal-header modal-header">
                <div className="externalShare-content-label content-label">
                    {contentLabel}
                </div>
            </div>
            <div className="externalShare-modal-content modal-content">
                <div className="external-target-outer-scrollbox">
                    <div className="external-target-inner-scrollbox">
                        <div className="external-target-container">
                            <Form
                                ref={form => {
                                    this.form = form;
                                }}
                                onValidSubmit={this.handleValidSubmit}
                            >
                                <div>
                                    <div className="username-label">
                                        <b>
                                            {this.props.intl.formatMessage({id: 'registration.createUsername'})}
                                        </b>
                                        {this.props.usernameHelp ? (
                                            <p className="help-text">{this.props.usernameHelp}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                    <Input
                                        name="user.username"
                                        type="text"
                                        onBlur={this.handleUsernameBlur}
                                    />
                                    <TextArea
                                        required
                                        className="report-text"
                                        elementWrapperClassName="report-modal-field"
                                        label={null}
                                        name="notes"
                                        placeholder={this.lookupPrompt(this.state.category)}
                                        value={this.state.notes}
                                    />
                                </div>
                            </Form>

                        </div>
                        <div className="external-target-bottom-gradient" />
                    </div>
                </div>


                <Form
                    // className="external-share"
                    onSubmit={onSubmit}
                >
                    <FlexRow className="action-buttons">
                        <Button
                            className="action-button submit-button"
                            key="submitButton"
                            type="submit"
                        >
                            <div className="action-button-text">
                                <FormattedMessage id="general.done" />
                            </div>
                        </Button>
                    </FlexRow>
                </Form>
            </div>
        </Modal>
    );
};

ExternalShareModalPresentation.propTypes = {
    intl: intlShape,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onSubmit: PropTypes.func
};

module.exports = injectIntl(ExternalShareModalPresentation);
