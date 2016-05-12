var classNames = require('classnames');
var FRCSelect = require('formsy-react-components').Select;
var React = require('react');

require('./select.scss');

var Select = React.createClass({
    type: 'Select',
    propTypes: {
        
    },
    render: function () {
        var classes = classNames(
            'select',
            this.props.className
        );
        return (
            <FRCSelect {... this.props} className={classes} />
        );
    }
});

module.exports = Select;
