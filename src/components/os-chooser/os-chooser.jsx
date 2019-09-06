const classNames = require('classnames');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');


const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');

const OS_ENUM = require('../../components/extension-landing/os-enum.js');

require('./os-chooser.scss');

const OSChooser = props => (
    <div className="os-chooser">
        <FlexRow className="inner">
            <FormattedMessage id="oschooser.choose" />
            <Button
                className={classNames({active: props.currentOS === OS_ENUM.WINDOWS})}
                onClick={() => // eslint-disable-line react/jsx-no-bind
                    props.handleSetOS(OS_ENUM.WINDOWS)
                }
            >
                <img src="/svgs/extensions/windows.svg" />
            Windows
            </Button>
            <Button
                className={classNames({active: props.currentOS === OS_ENUM.MACOS})}
                onClick={() => // eslint-disable-line react/jsx-no-bind
                    props.handleSetOS(OS_ENUM.MACOS)
                }
            >
                <img src="/svgs/extensions/mac.svg" />
            macOS
            </Button>
            <Button
                className={classNames({active: props.currentOS === OS_ENUM.CHROMEOS})}
                onClick={() => // eslint-disable-line react/jsx-no-bind
                    props.handleSetOS(OS_ENUM.CHROMEOS)
                }
            >
                <img src="/svgs/extensions/chromeos.svg" />
            ChromeOS
            </Button>
            <Button
                className={classNames({active: props.currentOS === OS_ENUM.ANDROID})}
                onClick={() => // eslint-disable-line react/jsx-no-bind
                    props.handleSetOS(OS_ENUM.ANDROID)
                }
            >
                <img src="/svgs/extensions/android.svg" />
            Android
            </Button>
        </FlexRow>
    </div>
);

OSChooser.propTypes = {
    currentOS: PropTypes.string,
    handleSetOS: PropTypes.func
};

const wrappedOSChooser = injectIntl(OSChooser);

module.exports = wrappedOSChooser;
