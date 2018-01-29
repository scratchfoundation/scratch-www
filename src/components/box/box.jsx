const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./box.scss');

const Box = props => (
    <div className={classNames('box', props.className)}>
        <div className="box-header">
            <h4>{props.title}</h4>
            <h5>{props.subtitle}</h5>
            <p>
                <a
                    href={props.moreHref}
                    {...props.moreProps}
                >
                    {props.moreTitle}
                </a>
            </p>
        </div>

        <div className="box-content">
            {props.children}
        </div>
    </div>
);

Box.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    moreHref: PropTypes.string,
    moreProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    moreTitle: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string.isRequired
};

module.exports = Box;
