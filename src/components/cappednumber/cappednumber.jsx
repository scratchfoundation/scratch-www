const PropTypes = require('prop-types');
const React = require('react');
const FormattedNumber = require('react-intl').FormattedNumber;

const CappedNumber = props => (
    <props.as className={props.className}>
        <FormattedNumber value={Math.min(props.value, 100)} />
        {props.value > 100 ? '+' : ''}
    </props.as>
);

CappedNumber.propTypes = {
    value: PropTypes.number.isRequired,
    className: PropTypes.string
};

CappedNumber.defaultProps = {
    as: 'span'
};
module.exports = CappedNumber;
