const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');

const TitleBanner = require('../../../components/title-banner/title-banner.jsx');
const Button = require('../../../components/forms/button.jsx');

require('./become-member-banner.scss');

const getBecomeMemberInfo = () => ({
    bannerText: <FormattedMessage id="becomeMemberBanner.askSupport" />,
    buttonLink: '/membership'
});

const navigateToBecomeMemberPage = () => {
    window.location = getBecomeMemberInfo().buttonLink;
};

const BecomeMemberTopBanner = ({
    onRequestClose
}) => (
    <TitleBanner className="become-member-banner">
        <div className="become-member-container">
            <img
                aria-hidden="true"
                className="become-member-icon"
                src="/images/membership/tiny-member-badge.svg"
            />
            <div className="become-member-central-items">
                <p className="become-member-text">
                    {getBecomeMemberInfo().bannerText}
                </p>
                <Button
                    className="become-member-button"
                    onClick={navigateToBecomeMemberPage}
                >
                    <FormattedMessage id="general.becomeMember" />
                </Button>
            </div>
        </div>
        <Button
            isCloseType
            className="become-member-close-button"
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

BecomeMemberTopBanner.propTypes = {
    onRequestClose: PropTypes.func
};

module.exports = injectIntl(BecomeMemberTopBanner);
