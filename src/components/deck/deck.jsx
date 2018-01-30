const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./deck.scss');

const Deck = props => (
    <div className={classNames(['deck', props.className])}>
        <div className="inner">
            <a
                aria-label="Scratch"
                href="/"
            >
                <img
                    className="logo"
                    src="/images/logo_sm.png"
                />
            </a>
            {props.children}
        </div>
    </div>
);

Deck.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = Deck;
