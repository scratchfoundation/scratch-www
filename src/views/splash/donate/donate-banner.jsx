const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');
const {useCallback, useEffect} = React;

const {DONATE_BANNER_AB_VARIANTS} = require('../../../lib/donate-banner-ab');
const externalLinks = require('../../../lib/external-links.js');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');
const Button = require('../../../components/forms/button.jsx');
const {triggerAnalyticsEvent} = require('../../../lib/google-analytics-utils.js');
const {handleGivebutterMessage} = require('./givebutter-analytics.js');

require('./donate-banner.scss');

const GIVEBUTTER_SCRIPT_ID = 'givebutter-widgets';
const GIVEBUTTER_SCRIPT_SRC = 'https://widgets.givebutter.com/latest.umd.cjs?acct=6VvCiMGqhgZgliyY&p=other';
const GIVEBUTTER_WIDGET_ID = 'pA7Pb9';
const UNASSIGNED_VARIANT = 'unassigned';

const navigateToDonatePage = () => {
    window.location = externalLinks.scratchFoundation.donateBanner;
};

const captureDonateBannerClick = variant => {
    triggerAnalyticsEvent({
        event: 'donate_banner_click',
        variant
    });
};

// track clicks going out to the donate page from the control banner
const captureOutboundLinkToDonate = variant => {
    captureDonateBannerClick(variant);
    // Defer navigation to ensure the event is sent before the page unloads
    setTimeout(navigateToDonatePage, 0);
};

const DonateTopBanner = ({
    onRequestClose,
    variant
}) => {
    const experimentVariant = variant ?? UNASSIGNED_VARIANT;
    const showGivebutter = variant === DONATE_BANNER_AB_VARIANTS.B;

    useEffect(() => {
        triggerAnalyticsEvent({
            event: 'donate_banner_view',
            variant: experimentVariant
        });
    }, [experimentVariant]);

    useEffect(() => {
        if (!showGivebutter || document.getElementById(GIVEBUTTER_SCRIPT_ID)) {
            return;
        }
        const script = document.createElement('script');
        script.id = GIVEBUTTER_SCRIPT_ID;
        script.async = true;
        script.src = GIVEBUTTER_SCRIPT_SRC;
        document.head.appendChild(script);
    }, [showGivebutter]);

    useEffect(() => {
        if (!showGivebutter) {
            return;
        }
        const onMessage = event => {
            handleGivebutterMessage(event, {variant: experimentVariant});
        };
        window.addEventListener('message', onMessage);
        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, [experimentVariant, showGivebutter]);

    const handleDonateClick = useCallback(() => {
        captureOutboundLinkToDonate(experimentVariant);
    }, [experimentVariant]);

    const handleGivebutterClick = useCallback(() => {
        captureDonateBannerClick(experimentVariant);
    }, [experimentVariant]);

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
                    {showGivebutter ? (
                        <div
                            className="donate-widget"
                            onClickCapture={handleGivebutterClick}
                        >
                            <givebutter-widget id={GIVEBUTTER_WIDGET_ID} />
                        </div>
                    ) : (
                        <Button
                            className="donate-button"
                            onClick={handleDonateClick}
                        >
                            <FormattedMessage id="general.donate" />
                        </Button>
                    )}
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
    onRequestClose: PropTypes.func,
    variant: PropTypes.oneOf(Object.values(DONATE_BANNER_AB_VARIANTS))
};

module.exports = injectIntl(DonateTopBanner);
