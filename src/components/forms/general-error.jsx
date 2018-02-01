const Formsy = require('formsy-react');
const PropTypes = require('prop-types');
const React = require('react');

require('./general-error.scss');

/*
 * A special formsy-react component that only outputs
 * error messages. If you want to display errors that
 * don't apply to a specific field, insert one of these,
 * give it a name, and apply your validation error to
 * the name of the GeneralError component.
 */
const GeneralError = props => {
    if (!props.showError()) return null;
    return (
        <p className="general-error">
            {props.getErrorMessage()}
        </p>
    );
};

GeneralError.propTypes = {
    getErrorMessage: PropTypes.func,
    showError: PropTypes.func
};

module.exports = Formsy.HOC(GeneralError);
