const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./banner.scss');

const Banner = props => (
    <div className={classNames('banner', props.className)}>
        <div className="inner">
            {props.children}
            {props.onRequestDismiss ? [
                <a
                    className="close"
                    href="#"
                    key="close"
                    onClick={props.onRequestDismiss}
                >x</a>
            ] : []}
        </div>
    </div>
);

Banner.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onRequestDismiss: PropTypes.func
};

module.exports = Banner;
