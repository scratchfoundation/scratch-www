const classNames = require('classnames');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');

const OS_ENUM = require('../../lib/os-enum.js');

require('./os-chooser.scss');

const OSChooser = ({
    currentOS,
    handleSetOS,
    hideAndroid = false,
    hideChromeOS = false,
    hideMac = false,
    hideWindows = false
}) => (
    <div className="os-chooser">
        <FlexRow className="inner">
            <FormattedMessage id="oschooser.choose" />
            {!hideWindows && (
                <Button
                    className={classNames({active: currentOS === OS_ENUM.WINDOWS})}
                    onClick={() => handleSetOS(OS_ENUM.WINDOWS)} // eslint-disable-line react/jsx-no-bind
                >
                    <img
                        src="/svgs/extensions/windows.svg"
                        alt=""
                    />
                    Windows
                </Button>
            )}
            {!hideMac && (
                <Button
                    className={classNames({active: currentOS === OS_ENUM.MACOS})}
                    onClick={() => handleSetOS(OS_ENUM.MACOS)} // eslint-disable-line react/jsx-no-bind
                >
                    <img
                        src="/svgs/extensions/mac.svg"
                        alt=""
                    />
                    macOS
                </Button>
            )}
            {!hideChromeOS && (
                <Button
                    className={classNames({active: currentOS === OS_ENUM.CHROMEOS})}
                    onClick={() => handleSetOS(OS_ENUM.CHROMEOS)} // eslint-disable-line react/jsx-no-bind
                >
                    <img
                        src="/svgs/extensions/chromeos.svg"
                        alt=""
                    />
                    ChromeOS
                </Button>
            )}
            {!hideAndroid && (
                <Button
                    className={classNames({active: currentOS === OS_ENUM.ANDROID})}
                    onClick={() => handleSetOS(OS_ENUM.ANDROID)} // eslint-disable-line react/jsx-no-bind
                >
                    <img
                        src="/svgs/extensions/android.svg"
                        alt=""
                    />
                    Android
                </Button>
            )}
        </FlexRow>
    </div>
);

OSChooser.propTypes = {
    currentOS: PropTypes.string,
    handleSetOS: PropTypes.func,
    hideAndroid: PropTypes.bool,
    hideChromeOS: PropTypes.bool,
    hideMac: PropTypes.bool,
    hideWindows: PropTypes.bool
};

const wrappedOSChooser = injectIntl(OSChooser);

module.exports = wrappedOSChooser;
