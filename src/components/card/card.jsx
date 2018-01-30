const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./card.scss');

const Card = props => (
    <div className={classNames(['card', props.className])}>
        {props.children}
    </div>
);

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = Card;
