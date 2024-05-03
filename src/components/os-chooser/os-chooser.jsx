const classNames = require('classnames');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');

const OS_ENUM = require('../../lib/os-enum.js');

require('./os-chooser.scss');

const OSChooser = props => (
    <div className="os-chooser">
        <FlexRow className="inner">
            <FormattedMessage id="oschooser.choose" />
            {!props.hideWindows && (
                <Button
                    className={classNames({active: props.currentOS === OS_ENUM.WINDOWS})}
                    onClick={() => // eslint-disable-line react/jsx-no-bind
                        props.handleSetOS(OS_ENUM.WINDOWS)
                    }
                >
                    <img src="/svgs/extensions/windows.svg" />
                    Windows
                </Button>
            )}
            {!props.hideMac && (
                <Button
                    className={classNames({active: props.currentOS === OS_ENUM.MACOS})}
                    onClick={() => // eslint-disable-line react/jsx-no-bind
                        props.handleSetOS(OS_ENUM.MACOS)
                    }
                >
                    <img src="/svgs/extensions/mac.svg" />
                    macOS
                </Button>
            )}
            {!props.hideChromeOS && (
                <Button
                    className={classNames({active: props.currentOS === OS_ENUM.CHROMEOS})}
                    onClick={() => // eslint-disable-line react/jsx-no-bind
                        props.handleSetOS(OS_ENUM.CHROMEOS)
                    }
                >
                    <img src="/svgs/extensions/chromeos.svg" />
                    ChromeOS
                </Button>
            )}
            {!props.hideAndroid && (
                <Button
                    className={classNames({active: props.currentOS === OS_ENUM.ANDROID})}
                    onClick={() => // eslint-disable-line react/jsx-no-bind
                        props.handleSetOS(OS_ENUM.ANDROID)
                    }
                >
                    <img src="/svgs/extensions/android.svg" />
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

OSChooser.defaultProps = {
    hideAndroid: false,
    hideChromeOS: false,
    hideMac: false,
    hideWindows: false
};

const wrappedOSChooser = injectIntl(OSChooser);

module.exports = wrappedOSChooser;
