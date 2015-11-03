var classNames = require('classnames');
var React = require('react');

require('./box.scss');

var Box = React.createClass({
    type: 'Box',
    propTypes: {
        title: React.PropTypes.string.isRequired,
        moreTitle: React.PropTypes.string,
        moreHref: React.PropTypes.string,
        moreProps: React.PropTypes.object
    },
    render: function () {
        var classes = classNames(
            'box',
            this.props.className
        );
        return (
            <div className={classes}>
                <div className="box-header">
                    <h4>{this.props.title}</h4>
                    <p>
                        <a href={this.props.moreHref} {...this.props.moreProps}>
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

module.exports = Box;
