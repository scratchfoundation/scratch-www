const React = require('react');
const PropTypes = require('prop-types');
const {FormattedMessage} = require('react-intl');
const classNames = require('classnames');

require('./membership-label.scss');

// Expand with other labels if we starting supporting multiple types
const LABEL_BY_TYPE = {
    1: 'membership.labels.member'
};

const MembershipLabel = ({
    labelType,
    outerClassName,
    innerClassName
}) => {
    const label = LABEL_BY_TYPE[labelType];

    if (!label) {
        return null;
    }

    return (
        <span className={classNames('membership-label-container', outerClassName)}>
            <span className={classNames('membership-label-text', innerClassName)}>
                <FormattedMessage id={label} />
            </span>
        </span>
    );
};

MembershipLabel.propTypes = {
    labelType: PropTypes.number,
    outerClassName: PropTypes.string,
    innerClassName: PropTypes.string
};

module.exports = MembershipLabel;
