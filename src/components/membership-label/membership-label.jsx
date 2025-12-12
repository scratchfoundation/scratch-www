const React = require('react');
const PropTypes = require('prop-types');
const {FormattedMessage} = require('react-intl');
const classNames = require('classnames');

require('./membership-label.scss');

/**
 * @enum {number}
 */
const LABEL_TYPE = {
    NONE: 0,
    MEMBER: 1
};

// Expand with other labels if we starting supporting multiple types
const LABEL_BY_TYPE = {
    [LABEL_TYPE.MEMBER]: 'membership.labels.member'
};

const MembershipLabel = ({
    labelType,
    containerClassName,
    textClassName
}) => {
    const label = LABEL_BY_TYPE[labelType];

    if (!label) {
        return null;
    }

    return (
        <div className={classNames('membership-label-container', containerClassName)}>
            <span className={classNames('membership-label-text', textClassName)}>
                <FormattedMessage id={label} />
            </span>
        </div>
    );
};

MembershipLabel.propTypes = {
    labelType: PropTypes.oneOf(Object.values(LABEL_TYPE)).isRequired,
    containerClassName: PropTypes.string,
    textClassName: PropTypes.string
};

MembershipLabel.LABEL_TYPE = LABEL_TYPE;

module.exports = MembershipLabel;
