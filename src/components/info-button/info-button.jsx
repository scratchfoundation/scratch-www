const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

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
        return (
            <div
                className="info-button"
                onClick={this.handleShowMessage}
                onMouseOut={this.handleHideMessage}
                onMouseOver={this.handleShowMessage}
            >
                {this.state.visible && (
                    <div className="info-button-message">
                        {this.props.message}
                    </div>
                )}
            </div>
        );
    }
}

InfoButton.propTypes = {
    message: PropTypes.string
};

module.exports = InfoButton;
