const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

/**
 * Higher-order component for building an input field
 * @param  {React.Component} Component an input component
 * @return {React.Component}           a wrapped input component
 */
module.exports = Component => {
    const InputComponent = props => (
        <Component
            help={props.required ? null : props.messages['general.notRequired']}
            {...omit(props, ['messages'])}
        />
    );

    InputComponent.propTypes = {
        messages: PropTypes.shape({
            'general.notRequired': PropTypes.string
        }),
        required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    };

    InputComponent.defaultProps = {
        messages: {
            'general.notRequired': 'Not Required'
        }
    };

    return InputComponent;
};
