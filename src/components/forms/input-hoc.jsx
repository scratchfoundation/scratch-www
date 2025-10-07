const PropTypes = require('prop-types');
const React = require('react');

/**
 * Higher-order component for building an input field
 * @param  {React.Component} Component an input component
 * @return {React.Component}           a wrapped input component
 */
module.exports = Component => {
    const InputComponent = ({
        messages = {'general.notRequired': 'Not Required'},
        required,
        ...props
    }) => (
        <Component
            help={required ? null : messages['general.notRequired']}
            required={required}
            {...props}
        />
    );

    InputComponent.propTypes = {
        messages: PropTypes.shape({
            'general.notRequired': PropTypes.string
        }),
        required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    };

    return InputComponent;
};
