const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./title-banner.scss');

const TitleBanner = props => (
    <div className={classNames('title-banner', props.className)}>
        {props.children}
    </div>
);

TitleBanner.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = TitleBanner;
