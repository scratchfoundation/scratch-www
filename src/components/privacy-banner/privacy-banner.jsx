const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const TitleBanner = require('../title-banner/title-banner.jsx');
const Button = require('../forms/button.jsx');

require('./privacy-banner.scss');

const PrivacyBanner = ({
    user
}) => {
    if (typeof user === 'undefined') {
        return null;
    }
    return (
        <TitleBanner className="privacy-banner">
            <div className="privacy-banner-container">
                <img
                    aria-hidden="true"
                    alt=""
                    className="lightbulb-icon"
                    src="/images/ideas/bulb-icon.svg"
                />
                <div className="privacy-banner-centered">
                    <p className="privacy-banner-text">
                        The Scratch privacy policy has been updated, effective xx yy, 2023.
                        You can see the new policy <a href="/privacy_policy">here</a>.
                    </p>
                </div>
                <Button
                    isCloseType
                    className="privacy-close-button"
                    key="closeButton"
                    name="closeButton"
                    type="button"
                >
                    <div className="action-button-text">
                        <FormattedMessage id="general.close" />
                    </div>
                </Button>
            </div>
        </TitleBanner>
    );
};

const mapStateToProps = state => ({
    user: state.session && state.session.session && state.session.session.user
});

PrivacyBanner.propTypes = {
    // onRequestClose: PropTypes.func
    user: PropTypes.shape({
        classroomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        thumbnailUrl: PropTypes.string,
        username: PropTypes.string
    })
};

const ConnectedPrivacyBanner = connect(
    mapStateToProps
)(PrivacyBanner);

module.exports = injectIntl(ConnectedPrivacyBanner);
