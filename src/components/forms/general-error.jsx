import Formsy from 'formsy-react';
import React from 'react';

require('./general-error.scss');

/*
 * A special formsy-react component that only outputs
 * error messages. If you want to display errors that
 * don't apply to a specific field, insert one of these,
 * give it a name, and apply your validation error to
 * the name of the GeneralError component.
 */
export default Formsy.HOC(React.createClass({
    render: function () {
        if (!this.props.showError()) return null;
        return (
            <p className="general-error">
                {this.props.getErrorMessage()}
            </p>
        );
    }
}));
