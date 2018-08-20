const PropTypes = require('prop-types');
const React = require('react');
const FlexRow = require('../../components/flex-row/flex-row.jsx');


const TipBox = props => (
    <div className="tip-box">
        <h4>{props.title}</h4>
        <FlexRow className="column tip-content">
            {props.children}
        </FlexRow>
    </div>
);

TipBox.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
};

module.exports = TipBox;
