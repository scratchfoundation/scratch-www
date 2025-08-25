const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../flex-row/flex-row.jsx');
const RelativeTime = require('../relative-time/relative-time.jsx');

require('./social-message.scss');

const SocialMessage = ({
    as: Tag = 'li',
    children,
    className,
    datetime,
    iconAlt,
    iconSrc,
    imgClassName
}) => (
    <Tag className={classNames('social-message', className)}>
        <FlexRow className="mod-social-message">
            <div className="social-message-content">
                {typeof iconSrc === 'undefined' ? [] : [
                    <img
                        alt={iconAlt}
                        className={classNames('social-message-icon', imgClassName)}
                        key="social-message-icon"
                        src={iconSrc}
                    />
                ]}
                <div>
                    {children}
                </div>
            </div>
            <span className="social-message-date">
                <RelativeTime value={new Date(datetime)} />
            </span>
        </FlexRow>
    </Tag>
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

module.exports = SocialMessage;
