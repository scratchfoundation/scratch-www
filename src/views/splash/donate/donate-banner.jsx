const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');

const TitleBanner = require('../../../components/title-banner/title-banner.jsx');
const Button = require('../../../components/forms/button.jsx');

require('./donate-banner.scss');

const donateURL = 'https://secure.donationpay.org/scratchfoundation';

const navigateToDonatePage = () => {
    window.location = donateURL;
};

// Following the example in the Google Analytics doc here to track
// clicks going out to the donate page from this banner:
// https://support.google.com/analytics/answer/1136920?hl=en
const captureOutboundLinkToDonate = () => {
    // `ga` is a global we have thanks to src/template.ejs
    // use this to send a tracking event for this outbound link
    // eslint-disable-next-line no-undef
    ga('send', 'event', 'outbound', 'click', donateURL, {
        transport: 'beacon',
        hitCallback: navigateToDonatePage
    });
};

const DonateTopBanner = ({
    onRequestClose
}) => (
    <TitleBanner className="donate-banner">
        <div className="donate-container">
            <img
                className="donate-icon"
                src="/images/ideas/try-it-icon.svg"
            />
            <div className="donate-central-items">
                <p className="donate-text">
                    <FormattedMessage id="donatebanner.askSupport" />
                </p>
                <Button
                    className="donate-button"
                    key="add-to-studio-button"
                    onClick={captureOutboundLinkToDonate}
                >
                    <FormattedMessage id="general.donate" />
                </Button>
            </div>
        </div>
        <Button
            isCloseType
            className="donate-close-button"
            key="closeButton"
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
