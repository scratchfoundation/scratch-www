const React = require('react');
const PropTypes = require('prop-types');

/**
 * Higher-order component for building an animated studio button
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
            if (this.state.wasClicked) {
                this.props.onClick(this.props.id);
            } else {
                this.setState({
                    wasClicked: true
                }, () => this.props.onClick(this.props.id));
            }
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
