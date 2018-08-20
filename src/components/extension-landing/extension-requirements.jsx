const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./extension-landing.scss');

const ExtensionRequirements = props => (
    <FlexRow className="column extension-requirements-container">
        <span className="requirements-header">
            <FormattedMessage id="extensionHeader.requirements" />
        </span>
        <FlexRow className="extension-requirements">
            {props.children}
        </FlexRow>
    </FlexRow>
);

ExtensionRequirements.propTypes = {
    children: PropTypes.node
};

module.exports = ExtensionRequirements;
