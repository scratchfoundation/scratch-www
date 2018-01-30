var classNames = require('classnames');
var React = require('react');

require('./card.scss');

var Card = React.createClass({
    displayName: 'Card',
    render: function () {
        return (
            <div className={classNames(['card', this.props.className])}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Card;
