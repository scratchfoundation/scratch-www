const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./extension-landing.scss');

const ExtensionHeader = props => (
    <div className="extension-header">
        <FlexRow className="inner">
            <FlexRow className="extension-info">
                {props.renderCopy}
                <div className="extension-image">
                    {props.renderImage}
                </div>
            </FlexRow>
            {props.renderRequirements}
        </FlexRow>
    </div>
);

ExtensionHeader.propTypes = {
    renderCopy: PropTypes.node,
    renderImage: PropTypes.node,
    renderRequirements: PropTypes.node
};

module.exports = ExtensionHeader;
