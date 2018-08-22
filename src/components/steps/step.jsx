const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./steps.scss');

const Step = props => (
    <div className="step">
        {(props.compact || props.number) &&
            <FlexRow className="step-number-row">
                {props.number && <div className="step-number">{props.number}</div>}
                {props.compact && <FlexRow className="step-content">{props.children}</FlexRow>}
            </FlexRow>
        }
        {!props.compact &&
            <div className="step-content">
                {props.children}
            </div>
        }
    </div>
);

Step.propTypes = {
    children: PropTypes.node,
    compact: PropTypes.bool,
    number: PropTypes.number
};

module.exports = Step;
