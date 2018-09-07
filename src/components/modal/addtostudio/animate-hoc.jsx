const React = require('react');
const PropTypes = require('prop-types');

/**
 * Higher-order component for building an animated studio button
 * @param  {React.Component} Component a studio button component
 * @return {React.Component}           a wrapped studio button component
 */

const AnimateHOC = ({
    Component
}) => {
    class WrappedComponent extends React.Component {
        constructor(props) {
            super(props);
            let wasClicked = false;
        }
        onClick () {
            this.wasClicked = true; // BUT PROPS ARE READONLY?
        }
        render () {
            return (<Component
                wasClicked={this.wasClicked}
                {...this.props}
            />);
        }
    }

    return WrappedComponent;
};

AnimateHOC.propTypes = {
    Component: PropTypes.element
};
