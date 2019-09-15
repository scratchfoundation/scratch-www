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
            'handleHideMessage',
            'handleShowMessage'
        ]);
        this.state = {
            visible: false
        };
    }
    handleHideMessage () {
        this.setState({visible: false});
    }
    handleShowMessage () {
        this.setState({visible: true});
    }
    render () {
        const messageJsx = this.state.visible && (
            <div className="info-button-message validation-info">
                {this.props.message}
            </div>
        );
        return (
            <React.Fragment>
                <div
                    className="info-button"
                    onClick={this.handleShowMessage}
                    onMouseOut={this.handleHideMessage}
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
