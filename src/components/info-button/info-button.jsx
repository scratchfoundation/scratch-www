const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const MediaQuery = require('react-responsive').default;
const debounce = require('lodash.debounce');

const frameless = require('../../lib/frameless');

require('./info-button.scss');

class InfoButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleMouseOut',
            'handleShowMessage',
            'setButtonRef'
        ]);
        this.state = {
            requireClickToClose: false, // default to closing on mouseout
            visible: false
        };
        this.setVisibleWithDebounce = debounce(this.setVisible, 100);
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
    handleMouseOut () {
        if (this.state.visible && !this.state.requireClickToClose) {
            this.setVisibleWithDebounce(false);
        }
    }
    handleShowMessage () {
        this.setVisibleWithDebounce(true);
    }
    setButtonRef (element) {
        this.buttonRef = element;
    }
    setVisible (newVisibleState) {
        this.setState({visible: newVisibleState});
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
                    onMouseOut={this.handleMouseOut}
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
