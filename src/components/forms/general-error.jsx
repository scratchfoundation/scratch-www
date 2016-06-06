var Formsy = require('formsy-react');
var React = require('react');

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
