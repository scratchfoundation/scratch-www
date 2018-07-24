const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

const Step = props => (
    <div className="step" />
);

Step.propTypes = {
    caption: PropTypes.string,
    children: PropTypes.node,
    number: PropTypes.number
};

module.exports = Step;
