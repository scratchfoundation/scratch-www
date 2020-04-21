const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const MediaQuery = require('react-responsive').default;

const frameless = require('../../lib/frameless');

require('./info-button.scss');

class InfoButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleMouseLeave',
            'handleShowMessage',
            'setButtonRef'
        ]);
        this.state = {
            requireClickToClose: false, // default to closing on mouseout
            visible: false
        };
    }
    componentWillMount () {
        window.addEventListener('mousedown', this.handleClick, false);
    }
    componentWillUnmount () {
        window.removeEventListener('mousedown', this.handleClick, false);
    }
    handleClick (e) {
        if (this.buttonRef) { // only handle click if we can tell whether it happened in this component
            let newVisibleState = false; // for most clicks, hide the info message
            if (this.buttonRef.contains(e.target)) { // if the click was inside the info icon...
                newVisibleState = !this.state.requireClickToClose; // toggle it
            }
            this.setState({
                requireClickToClose: newVisibleState,
                visible: newVisibleState
            });
        }
    }
    handleMouseLeave () {
        if (this.state.visible && !this.state.requireClickToClose) {
            this.setState({visible: false});
        }
    }
    handleShowMessage () {
        this.setState({visible: true});
    }
    setButtonRef (element) {
        this.buttonRef = element;
    }
    render () {
        const messageJsx = this.state.visible && (
            <div className="info-button-message">
                {this.props.message}
            </div>
        );
        return (
            <React.Fragment>
                <div
                    className="info-button"
                    ref={this.setButtonRef}
                    onMouseLeave={this.handleMouseLeave}
                    onMouseOver={this.handleShowMessage}
                >
                    <MediaQuery minWidth={frameless.desktop}>
                        {messageJsx}
                    </MediaQuery>
                </div>
                {/* for small screens, add additional position: relative element,
                    so info message can position itself relative to the width which
                    encloses info-button -- rather than relative to info-button itself */}
                <MediaQuery maxWidth={frameless.desktop - 1}>
                    <div style={{position: 'relative'}}>
                        {messageJsx}
                    </div>
                </MediaQuery>
            </React.Fragment>
        );
    }
}

InfoButton.propTypes = {
    message: PropTypes.string.isRequired
};

module.exports = InfoButton;
