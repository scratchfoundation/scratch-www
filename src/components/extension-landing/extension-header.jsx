const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./extension-landing.scss');

const ExtensionHeader = props => (
    <div className="extension-header">
        <FlexRow className="inner">
            <FlexRow className="column extension-info">
                {props.children}
            </FlexRow>
            <div className="extension-image">
                <img
                    alt={props.imageAlt}
                    src={props.imageSrc}
                />
            </div>
        </FlexRow>
    </div>
);

ExtensionHeader.propTypes = {
    children: PropTypes.node,
    imageAlt: PropTypes.string,
    imageSrc: PropTypes.string
};

module.exports = ExtensionHeader;
