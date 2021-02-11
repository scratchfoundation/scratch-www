const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');
const ModalInnerContent = require('../base/modal-inner-content.jsx');
const Button = require('../../forms/button.jsx');
const Progression = require('../../progression/progression.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
const MuteStep = require('./mute-step.jsx');
const FeedbackForm = require('./feedback-form.jsx');
const classNames = require('classnames');
require('./modal.scss');

const api = require('../../../lib/api');

const steps = {
    COMMENT_ISSUE: 0,
    MUTE_INFO: 1,
    BAN_WARNING: 2,
    USER_FEEDBACK: 3,
    FEEDBACK_SENT: 4
};

const MAX_FEEDBACK_LENGTH = 500;

class MuteModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleNext',
            'handlePrevious',
            'handleGoToFeedback',
            'handleFeedbackSubmit'
        ]);

        this.numSteps = this.props.showWarning ? steps.BAN_WARNING : steps.MUTE_INFO;

        this.state = {
            step: this.props.startStep ? this.props.startStep : steps.COMMENT_ISSUE
        };
    }
    handleNext () {
        this.setState({
            step: this.state.step + 1
        });
    }
    handlePrevious () {
        // This shouldn't get called when we're on the first step, but
        // the Math.max is here as a safeguard so state doesn't go negative.
        this.setState({
            step: Math.max(0, this.state.step - 1)
        });
    }
    handleGoToFeedback () {
        this.setState({
            step: steps.USER_FEEDBACK
        });
    }

    handleFeedbackSubmit (feedback) {
        api({
            uri: `/comments/feedback`,
            authentication: this.props.user.token,
            withCredentials: true,
            method: 'POST',
            useCsrf: true,
            json: {
                timestamp: Date.now(),
                feedback: feedback,
                comment: this.props.commentContent,
                userId: this.props.user.id,
                username: this.props.user.username,
                language: window._locale,
                typeOfMessage: this.props.muteModalMessages.name
            }
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                body = {rejected: 'error'};
            }
        });

        this.setState({
            step: steps.FEEDBACK_SENT
        });
    }

    render () {
        const feedbackPrompt = (
            <p className="feedback-prompt">
                <FormattedMessage
                    id="comments.muted.mistake"
                    values={{feedbackLink: (
                        <a onClick={this.handleGoToFeedback}>
                            <FormattedMessage id="comments.muted.feedbackLinkText" />
                        </a>
                    )}}
                />
            </p>
        );

        return (
            <Modal
                isOpen
                useStandardSizes
                className="modal-mute"
                showCloseButton={false}
                onRequestClose={this.props.onRequestClose}
            >
                <div className="mute-modal-header modal-header" />
                <ModalInnerContent className="mute-inner-content">
                    <Progression step={this.state.step}>
                        <MuteStep
                            bottomImg="/svgs/commenting/comment_feedback.svg"
                            bottomImgClass="bottom-img"
                            header={this.props.intl.formatMessage({id: this.props.muteModalMessages.muteStepHeader})}
                        >
                            {this.props.muteModalMessages.muteStepContent.map(message => (
                                <p key={message}>
                                    <FormattedMessage id={message} />
                                </p>
                            ))}

                        </MuteStep>
                        <MuteStep
                            header={this.props.intl.formatMessage(
                                {id: 'comments.muted.duration'},
                                {inDuration: this.props.timeMuted}
                            )}
                            sideImg="/svgs/commenting/mute_time.svg"
                            sideImgClass="side-img"
                        >
                            <p>
                                <FormattedMessage id="comments.muted.commentingPaused" />
                            </p>
                            <p>
                                <FormattedMessage
                                    id="comments.muted.moreInfoGuidelines"
                                    values={{CommunityGuidelinesLink: (
                                        <a href="/community_guidelines">
                                            <FormattedMessage id="report.CommunityGuidelinesLinkText" />
                                        </a>
                                    )}}
                                />
                            </p>
                            {this.state.step === this.numSteps && this.props.showFeedback ? feedbackPrompt : null}
                        </MuteStep>
                        <MuteStep
                            bottomImg="/svgs/commenting/warning.svg"
                            bottomImgClass="bottom-img"
                            header={this.props.intl.formatMessage({id: 'comments.muted.warningBlocked'})}
                        >
                            <p>
                                <FormattedMessage
                                    id="comments.muted.warningCareful"
                                    values={{CommunityGuidelinesLink: (
                                        <a href="/community_guidelines">
                                            <FormattedMessage id="report.CommunityGuidelinesLinkText" />
                                        </a>
                                    )}}
                                />
                            </p>
                            {this.state.step === this.numSteps ? feedbackPrompt : null}
                        </MuteStep>
                        <MuteStep
                            header={this.props.intl.formatMessage({id: 'comments.muted.mistakeHeader'})}
                        >
                            <p className="feedback-text">
                                <FormattedMessage id="comments.muted.mistakeInstructions" />
                            </p>
                            <FeedbackForm
                                emptyErrorMessage={this.props.intl.formatMessage({id: 'comments.muted.feedbackEmpty'})}
                                maxLength={MAX_FEEDBACK_LENGTH}
                                onSubmit={this.handleFeedbackSubmit}
                            />
                            <div className="character-limit">
                                <FormattedMessage id="comments.muted.characterLimit" />
                            </div>
                        </MuteStep>
                        <MuteStep
                            header={this.props.intl.formatMessage({id: 'comments.muted.thanksFeedback'})}
                            sideImg="/svgs/commenting/thank_you_envelope.svg"
                            sideImgClass="side-img"
                        >
                            <p>
                                <FormattedMessage id="comments.muted.thanksInfo" />
                            </p>
                        </MuteStep>
                    </Progression>
                    <FlexRow className={classNames('nav-divider')} />
                    <FlexRow
                        className={classNames(
                            this.state.step === steps.USER_FEEDBACK ? 'feedback-nav' : 'mute-nav'
                        )}
                    >
                        {this.state.step >= this.numSteps ? (
                            <Button
                                className={classNames('close-button')}
                                onClick={this.props.onRequestClose}
                            >
                                <div className="action-button-text">
                                    {this.state.step === steps.USER_FEEDBACK ? (
                                        <FormattedMessage id="general.cancel" />
                                    ) : (
                                        <FormattedMessage id="general.close" />
                                    )}
                                </div>
                            </Button>
                        ) : (
                            <Button
                                className={classNames('next-button')}
                                onClick={this.handleNext}
                            >
                                <div className="action-button-text">
                                    <FormattedMessage id="general.next" />
                                </div>
                            </Button>
                        )}
                        {this.state.step > 0 && this.state.step < steps.USER_FEEDBACK ? (
                            <Button
                                className={classNames(
                                    'back-button',
                                )}
                                onClick={this.handlePrevious}
                            >
                                <div className="action-button-text">
                                    <FormattedMessage id="general.back" />
                                </div>
                            </Button>
                        ) : this.state.step === steps.USER_FEEDBACK ? (
                            <Button
                                className={classNames(
                                    'send-button',
                                )}
                                form="feedback-form"
                                type="submit"
                            >
                                <div className="action-button-text">
                                    <FormattedMessage id="general.send" />
                                </div>
                            </Button>
                        ) : null}
                        
                    </FlexRow>
                </ModalInnerContent>
            </Modal>
        );
    }
}

MuteModal.propTypes = {
    commentContent: PropTypes.string,
    intl: intlShape,
    muteModalMessages: PropTypes.shape({
        name: PropTypes.string,
        commentType: PropTypes.string,
        muteStepHeader: PropTypes.string,
        muteStepContent: PropTypes.array
    }),
    onRequestClose: PropTypes.func,
    showFeedback: PropTypes.bool,
    showWarning: PropTypes.bool,
    startStep: PropTypes.number,
    timeMuted: PropTypes.string,
    user: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string
    })
};
MuteModal.steps = steps;
module.exports = injectIntl(MuteModal);
