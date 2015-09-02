var React = require('react');

require('./box.scss');

module.exports = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
        more: React.React.PropTypes.string
    },
    render: function () {
        return (
            <div className="box">
                <div className="header">
                    <h4>{this.props.title}</h4>
                </div>

                <div className="content">
                    {children}
                </div>
            </div>
        );
    }
});
