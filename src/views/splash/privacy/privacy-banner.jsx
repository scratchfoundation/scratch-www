const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');

const TitleBanner = require('../../../components/title-banner/title-banner.jsx');
const Button = require('../../../components/forms/button.jsx');

require('./privacy-banner.scss');

const PrivacyBanner = ({
    onRequestClose
}) => (
    <TitleBanner className="privacy-banner">
        <div className="privacy-banner-container">
            <p className="privacy-banner-text">
                The Scratch privacy policy has been updated, effective xx yy, 2023.
                You can see the new policy <a href="/privacy_policy">here</a>.
            </p>
            <Button
                isCloseType
                className="privacy-close-button"
                key="closeButton"
                name="closeButton"
                type="button"
                onClick={onRequestClose}
            >
                <div className="action-button-text">
                    <FormattedMessage id="general.close" />
                </div>
            </Button>
        </div>
    </TitleBanner>
);

PrivacyBanner.propTypes = {
    onRequestClose: PropTypes.func
};

module.exports = injectIntl(PrivacyBanner);
