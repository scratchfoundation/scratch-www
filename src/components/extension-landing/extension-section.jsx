const PropTypes = require('prop-types');
const classNames = require('classnames');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./extension-landing.scss');

const ExtensionSection = props => (
    <div className={classNames('extension-section', props.className)}>
        <FlexRow className="inner column">
            {props.children}
        </FlexRow>
    </div>
);

ExtensionSection.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = ExtensionSection;
