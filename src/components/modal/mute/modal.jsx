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
const classNames = require('classnames');
require('./modal.scss');

class MuteModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleNext',
            'handlePrevious'
        ]);
        this.numSteps = 2;
        if (this.props.showWarning) {
            this.numSteps++;
        }
        this.state = {
            step: 0
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
    render () {
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
                        </MuteStep>
                        {this.props.showWarning ? (
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
                            </MuteStep>) : null}
                    </Progression>
                    <FlexRow className={classNames('nav-divider')} />
                    <FlexRow className={classNames('mute-nav')}>
                        {this.state.step > 0 ? (
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
                        ) : null }
                        {this.state.step >= this.numSteps - 1 ? (
                            <Button
                                className={classNames('close-button')}
                                onClick={this.props.onRequestClose}
                            >
                                <div className="action-button-text">
                                    <FormattedMessage id="general.close" />
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
                    </FlexRow>
                </ModalInnerContent>
            </Modal>
        );
    }
}

MuteModal.propTypes = {
    intl: intlShape,
    muteModalMessages: PropTypes.shape({
        commentType: PropTypes.string,
        muteStepHeader: PropTypes.string,
        muteStepContent: PropTypes.array
    }),
    onRequestClose: PropTypes.func,
    showWarning: PropTypes.bool,
    timeMuted: PropTypes.string
};

module.exports = injectIntl(MuteModal);
