const PropTypes = require('prop-types');
const React = require('react');
const FormattedNumber = require('react-intl').FormattedNumber;

const CappedNumber = ({
    as: Component = 'span',
    className,
    value
}) => (
    <Component className={className}>
        <FormattedNumber value={Math.min(value, 100)} />
        {value > 100 ? '+' : ''}
    </Component>
);

CappedNumber.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    as: PropTypes.elementType
};

module.exports = CappedNumber;
