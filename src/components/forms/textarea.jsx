var classNames = require('classnames');
var FRCTextarea = require('formsy-react-components').Textarea;
var React = require('react');
var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;

require('./textarea.scss');

var TextArea = React.createClass({
    type: 'TextArea',
    render: function () {
        var classes = classNames(
            'textarea',
            this.props.className
        );
        return (
            <FRCTextarea {... this.props} className={classes} />
        );
    }
});

module.exports = defaultValidationHOC(TextArea);
