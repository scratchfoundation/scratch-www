const React = require('react');
const PropTypes = require('prop-types');

/**
 * Higher-order component for building an animated studio button
 * it is used to decorate the onToggleStudio function with noticing
 * when the button has first been clicked.
 * This is needed so the buttons don't play the animation when they are
 * first rendered but when they are first clicked.
 * @param  {React.Component} Component a studio button component
 * @return {React.Component}           a wrapped studio button component
 */

const AnimateHOC = Component => {
    class WrappedComponent extends React.Component {
        constructor (props) {
            super(props);

            this.state = {
                wasClicked: false
            };

            this.handleClick = this.handleClick.bind(this);
        }
        handleClick () {
            this.setState({ // else tell the state that the button has been clicked
                wasClicked: true
            }, () => this.props.onClick(this.props.id)); // callback after state has been updated
        }
        render () {
            const {wasClicked} = this.state;
            return (<Component
                {...this.props}
                wasClicked={wasClicked}
                onClick={this.handleClick}
            />);
        }
    }

    WrappedComponent.propTypes = {
        id: PropTypes.number,
        onClick: PropTypes.func
    };

    return WrappedComponent;
};

module.exports = AnimateHOC;
