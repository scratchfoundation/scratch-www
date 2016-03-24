var React = require('react');
var classNames = require('classnames');

require('./formcard.scss');


var CounterIndicator = React.createClass({
    type: 'CounterIndicator',
    propTypes: {
        selected: false,
        active: false
    },
    render: function () {
        var classes = classNames(
            'counterIndicator',
            {
                'selected': this.props.selected,
                'active': this.props.selected
            },
            this.props.className
        );
        return (
            <div {... this.props} className={classes} />
        );
    }
})

var FormCard = React.createClass({
    type: 'FormCard',
    propTypes: {
        
    },
    render: function () {
        var classes = classNames(
            'formcard',
            this.props.className
        );
        return (
            <div {... this.props} className={classes} >
                <img className="icon" src={this.props.icon} />
                <p className="description">
                    {this.props.description}
                </p>
                <div className="counter">
                    {for (var i = 0; i < this.props.counterMax; i++) {
                        <CounterIndicator selected={i === this.props.step} active={i < this.props.step} />
                    }}
                </div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = FormCard;
