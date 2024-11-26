const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');

const TitleBanner = require('../../../components/title-banner/title-banner.jsx');
const Button = require('../../../components/forms/button.jsx');

require('./donate-banner.scss');

const SCRATCH_CAMPAIGN_BANNER_END_TIME = new Date(2025, 0, 9).getTime(); // January 9, 2025 (months are zero indexed)

// This must be dynamic for our tests to work correctly
const isCampaignActive = () => Date.now() < SCRATCH_CAMPAIGN_BANNER_END_TIME;

const getDonateInfo = () => (isCampaignActive() ? {
    bannerText: <FormattedMessage
        id="donatebanner.eoyCampaign"
        // values={{
        // }}
    />,
    buttonLink: 'https://www.scratchfoundation.org/donate?utm_source=SCRATCH&utm_medium=BANNER&utm_campaign=EOY_GIVING'
} : {
    bannerText: <FormattedMessage id="donatebanner.askSupport" />,
    buttonLink: 'https://www.scratchfoundation.org/donate'
});

const navigateToDonatePage = () => {
    window.location = getDonateInfo().buttonLink;
};

// track clicks going out to the donate page from this banner
const captureOutboundLinkToDonate = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'donate_banner_click'
    });
    setTimeout(navigateToDonatePage, 0);
};

const DonateTopBanner = ({
    onRequestClose
}) => (
    <TitleBanner className="donate-banner">
        <div className="donate-container">
            <img
                aria-hidden="true"
                className="donate-icon"
                src="/images/ideas/try-it-icon.svg"
            />
            <div className="donate-central-items">
                <p className="donate-text">
                    {getDonateInfo().bannerText}
                </p>
                <Button
                    className="donate-button"
                    onClick={captureOutboundLinkToDonate}
                >
                    <FormattedMessage id="general.donate" />
                </Button>
            </div>
        </div>
        <Button
            isCloseType
            className="donate-close-button"
            name="closeButton"
            type="button"
            onClick={onRequestClose}
        >
            <div className="action-button-text">
                <FormattedMessage id="general.close" />
            </div>
        </Button>
    </TitleBanner>
);

DonateTopBanner.propTypes = {
    onRequestClose: PropTypes.func
};

module.exports = injectIntl(DonateTopBanner);
