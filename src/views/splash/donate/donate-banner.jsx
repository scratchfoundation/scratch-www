const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');
const {useEffect} = React;

const TitleBanner = require('../../../components/title-banner/title-banner.jsx');
const Button = require('../../../components/forms/button.jsx');
const {triggerAnalyticsEvent} = require('../../../lib/google-analytics-utils.js');

require('./donate-banner.scss');

const GIVEBUTTER_SCRIPT_ID = 'givebutter-widgets';
const GIVEBUTTER_SCRIPT_SRC = 'https://widgets.givebutter.com/latest.umd.cjs?acct=6VvCiMGqhgZgliyY&p=other';
const GIVEBUTTER_WIDGET_ID = 'pA7Pb9';

const captureDonateBannerClick = () => {
    triggerAnalyticsEvent({
        event: 'donate_banner_click'
    });
};

const DonateTopBanner = ({
    onRequestClose
}) => {
    useEffect(() => {
        if (document.getElementById(GIVEBUTTER_SCRIPT_ID)) {
            return;
        }
        const script = document.createElement('script');
        script.id = GIVEBUTTER_SCRIPT_ID;
        script.async = true;
        script.src = GIVEBUTTER_SCRIPT_SRC;
        document.head.appendChild(script);
    }, []);

    return (
        <TitleBanner className="donate-banner">
            <div className="donate-container">
                <img
                    aria-hidden="true"
                    className="donate-icon"
                    src="/images/ideas/try-it-icon.svg"
                />
                <div className="donate-central-items">
                    <p className="donate-text">
                        <FormattedMessage id="donateBanner.askSupport" />
                    </p>
                    <div
                        className="donate-widget"
                        onClickCapture={captureDonateBannerClick}
                    >
                        <givebutter-widget id={GIVEBUTTER_WIDGET_ID} />
                    </div>
                </div>
            </div>
            <Button
                isCloseType
                className="donate-close-button"
                name="closeButton"
                onClick={onRequestClose}
            >
                <div className="action-button-text">
                    <FormattedMessage id="general.close" />
                </div>
            </Button>
        </TitleBanner>
    );
};

DonateTopBanner.propTypes = {
    onRequestClose: PropTypes.func
};

module.exports = injectIntl(DonateTopBanner);
