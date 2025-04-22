const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./extension-landing.scss');

const ExtensionRequirements = ({
    hideAndroid = false,
    hideBluetooth = false,
    hideChromeOS = false,
    hideMac = false,
    hideScratchLink = false,
    hideWindows = false
}) => (
    <FlexRow className="column extension-requirements-container">
        <span className="requirements-header">
            <FormattedMessage id="extensionHeader.requirements" />
        </span>
        <FlexRow className="extension-requirements">
            {!hideWindows && (
                <span>
                    <img
                        alt=""
                        src="/svgs/extensions/windows.svg"
                    />
                    Windows 10 version 1709+
                </span>
            )}
            {!hideMac && (
                <span>
                    <img
                        alt=""
                        src="/svgs/extensions/mac.svg"
                    />
                    macOS 10.15+
                </span>
            )}
            {!hideChromeOS && (
                <span>
                    <img
                        alt=""
                        src="/svgs/extensions/chromeos.svg"
                    />
                    ChromeOS
                </span>
            )}
            {!hideAndroid && (
                <span>
                    <img
                        alt=""
                        src="/svgs/extensions/android.svg"
                    />
                    Android 6.0+
                </span>
            )}
            {!hideBluetooth && (
                <span>
                    <img src="/svgs/extensions/bluetooth.svg" />
                    Bluetooth
                </span>
            )}
            {!hideScratchLink && (
                <span>
                    <img
                        alt=""
                        src="/svgs/extensions/scratch-link.svg"
                    />
                    Scratch Link
                </span>
            )}
        </FlexRow>
    </FlexRow>
);

ExtensionRequirements.propTypes = {
    hideAndroid: PropTypes.bool,
    hideBluetooth: PropTypes.bool,
    hideChromeOS: PropTypes.bool,
    hideMac: PropTypes.bool,
    hideScratchLink: PropTypes.bool,
    hideWindows: PropTypes.bool
};

module.exports = ExtensionRequirements;
