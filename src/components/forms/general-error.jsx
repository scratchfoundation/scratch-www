var Formsy = require('formsy-react');
var React = require('react');

/*
 * A special formsy-react component that only outputs
 * error messages. If you want to display errors that
 * don't apply to a specific field, insert one of these,
 * give it a name, and apply your validation error to
 * the name of the GeneralError component.
 */
module.exports = Formsy.HOC(React.createClass({
    render: function () {
        if (!this.props.showError()) return null;
        return (
            <p className="error">
                {this.props.getErrorMessage()}
            </p>
        );
    }
}));
