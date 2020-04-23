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
            {props.bluetoothStandard ? (
                <React.Fragment>
                    <span>
                        <img
                            alt=""
                            src="/svgs/extensions/windows.svg"
                        />
                        Windows 10 version 1709+
                    </span>
                    <span>
                        <img
                            alt=""
                            src="/svgs/extensions/mac.svg"
                        />
                        macOS 10.13+
                    </span>
                    <React.Fragment>
                        <span>
                            <img
                                alt=""
                                src="/svgs/extensions/chromeos.svg"
                            />
                            ChromeOS
                        </span>
                        <span>
                            <img
                                alt=""
                                src="/svgs/extensions/android.svg"
                            />
                            Android 6.0+
                        </span>
                    </React.Fragment>
                    <span>
                        <img src="/svgs/extensions/bluetooth.svg" />
                        Bluetooth
                    </span>
                    <span>
                        <img
                            alt=""
                            src="/svgs/extensions/scratch-link.svg"
                        />
                        Scratch Link
                    </span>
                </React.Fragment>
            ) : props.children}
        </FlexRow>
    </FlexRow>
);

ExtensionRequirements.propTypes = {
    bluetoothStandard: PropTypes.bool,
    children: PropTypes.node
};

ExtensionRequirements.defaultProps = {
    bluetoothStandard: false
};

module.exports = ExtensionRequirements;
