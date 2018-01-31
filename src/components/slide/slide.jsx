const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./slide.scss');

const Slide = props => (
    <div className={classNames(['slide', props.className])}>
        {props.children}
    </div>
);

Slide.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = Slide;
