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
/* eslint-disable react/prefer-stateless-function */
class GeneralError extends React.Component {
    render () {
        if (!this.props.showError()) return null;
        return (
            <p className="general-error">
                {this.props.getErrorMessage()}
            </p>
        );
    }
}

GeneralError.propTypes = {
    getErrorMessage: PropTypes.func,
    showError: PropTypes.func
};

module.exports = Formsy.withFormsy(GeneralError);
