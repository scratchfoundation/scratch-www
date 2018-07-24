const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./steps.scss');

const Steps = props => (
    <FlexRow className={classNames('steps', props.className)}>
        {/* TODO: Should this component do something with automatically numbering individual steps? */}
        {props.children}
    </FlexRow>
);

Steps.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = Steps;
