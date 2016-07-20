var classNames = require('classnames');
var React = require('react');

require('./deck.scss');

var Deck = React.createClass({
    displayName: 'Deck',
    render: function () {
        return (
            <div className={classNames(['deck', this.props.className])}>
                <div className="inner">
                    <a href="/" aria-label="Scratch">
                        <img className="logo" src="/images/logo_sm.png" />
                    </a>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Deck;
