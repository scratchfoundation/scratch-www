const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./steps.scss');

const Steps = props => (
    <FlexRow className="steps">
        {props.children}
    </FlexRow>
);

Steps.propTypes = {
    children: PropTypes.node
};

module.exports = Steps;
