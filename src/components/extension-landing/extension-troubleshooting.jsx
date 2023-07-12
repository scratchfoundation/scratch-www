const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const ExtensionSection = require('./extension-section.jsx');

// TODO: after the Scratch Conference 2022, migrate from the individual extension landing pages all the
// troubleshooting steps which are common to all extensions.
const ExtensionTroubleshooting = props => {
    const sharedValues = {
        deviceName: props.deviceName,
        deviceNameShort: props.deviceNameShort || props.deviceName
    };
    return (
        <ExtensionSection className="faq">
            <h2 id="troubleshooting"><FormattedMessage
                id="extensions.troubleshootingTitle"
                values={sharedValues}
            /></h2>
            <h3 className="faq-title"><FormattedMessage
                id="extensions.browserCompatibilityTitle"
                values={sharedValues}
            /></h3>
            <p><FormattedMessage
                id="extensions.browserCompatibilityText2"
                values={sharedValues}
            /></p>
            {props.children}
            {!props.scratchLinkOnly && (
                <React.Fragment>
                    <h3 className="faq-title"><FormattedMessage
                        id="bluetooth.enableLocationServicesTitle"
                        values={sharedValues}
                    /></h3>
                    <p><FormattedMessage
                        id="bluetooth.enableLocationServicesText"
                        values={sharedValues}
                    /></p>
                </React.Fragment>
            )}
        </ExtensionSection>
    );
};

ExtensionTroubleshooting.propTypes = {
    children: PropTypes.node,
    deviceName: PropTypes.string.isRequired,
    deviceNameShort: PropTypes.string,
    scratchLinkOnly: PropTypes.bool
};

module.exports = ExtensionTroubleshooting;
