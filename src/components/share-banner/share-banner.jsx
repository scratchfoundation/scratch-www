const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./share-banner.scss');

const ShareBanner = props => (
    <div className={classNames('shareBanner', props.className)}>
        <div className="inner">
            {props.children}
        </div>
    </div>
);

ShareBanner.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = ShareBanner;
