const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');

const TitleBanner = require('../../../components/title-banner/title-banner.jsx');
const Button = require('../../../components/forms/button.jsx');

require('./donate-banner.scss');

const getDonateInfo = () => ({
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
