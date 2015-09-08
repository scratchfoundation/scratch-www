var React = require('react');

require('./box.scss');

module.exports = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        moreTitle: React.PropTypes.string,
        moreHref: React.PropTypes.string
    },
    render: function () {
        return (
            <div className={'box ' + this.props.className}>
                <div className="box-header">
                    <h4>{this.props.title}</h4>
                    <p>
                        <a href={this.props.moreHref}>
                            {this.props.moreTitle}
                        </a>
                    </p>
                </div>

                <div className="box-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
