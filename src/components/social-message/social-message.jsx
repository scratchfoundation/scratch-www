const classNames = require('classnames');
const FormattedRelative = require('react-intl').FormattedRelative;
const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../flex-row/flex-row.jsx');

require('./social-message.scss');

const SocialMessage = props => (
    <props.as className={classNames('social-message', props.className)}>
        <FlexRow className="mod-social-message">
            <div className="social-message-content">
                {typeof props.iconSrc === 'undefined' ? [] : [
                    <img
                        alt={props.iconAlt}
                        className={classNames('social-message-icon', props.imgClassName)}
                        key="social-message-icon"
                        src={props.iconSrc}
                    />
                ]}
                <div>
                    {props.children}
                </div>
            </div>
            <span className="social-message-date">
                <FormattedRelative value={new Date(props.datetime)} />
            </span>
        </FlexRow>
    </props.as>
);

SocialMessage.propTypes = {
    as: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    children: PropTypes.node,
    className: PropTypes.string,
    datetime: PropTypes.string.isRequired,
    iconAlt: PropTypes.string,
    iconSrc: PropTypes.string,
    imgClassName: PropTypes.string
};

SocialMessage.defaultProps = {
    as: 'li'
};

module.exports = SocialMessage;
