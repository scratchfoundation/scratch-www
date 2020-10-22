const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
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
                            bottomImg="/images/bottom_placeholder.png"
                            bottomImgClass="bottom-img"
                            header="The Scratch comment filter thinks your comment was unconstructive."
                        >
                            <p>
                            If you think something could be better, you can say something you like about the project,
                            and make a suggestion about how to improve it. For example, you could say:
                            </p>
                        </MuteStep>
                        <MuteStep
                            header="For the next X minutes you won't be able to post comments"
                            sideImg="/images/side_placeholder.png"
                            sideImgClass="side-img"
                        >
                            <p>
                            Once X minutes have passed, you will be able to comment again.
                            </p>
                            <p>
                            If you would like more information, you can read the Scratch community guidelines.
                            </p>
                        </MuteStep>
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
                                    Back
                                </div>
                            </Button>
                        ) : null }
                        {this.state.step >= 1 ? (
                            <Button
                                className={classNames('close-button')}
                                onClick={this.props.onRequestClose}
                            >
                                <div className="action-button-text">
                                    Close
                                </div>
                            </Button>
                        ) : (
                            <Button
                                className={classNames('next-button')}
                                onClick={this.handleNext}
                            >
                                <div className="action-button-text">
                                    Next
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
    onRequestClose: PropTypes.func
};

module.exports = MuteModal;
