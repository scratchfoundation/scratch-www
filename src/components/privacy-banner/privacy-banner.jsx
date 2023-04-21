const bindAll = require('lodash.bindall');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const TitleBanner = require('../title-banner/title-banner.jsx');
const Button = require('../forms/button.jsx');
const jar = require('../../lib/jar.js');

require('./privacy-banner.scss');

const PRIVACY_UPDATE_START_TIME = 1681826142976; // TODO: coordinate this later
const PRIVACY_UPDATE_END_TIME = 1713434255000; // TODO: see above

class PrivacyBanner extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'shouldShowBanner',
            'handleCloseBanner'
        ]);
    }

    shouldShowBanner () {
        const seen = jar.get('scratchpolicyseen');
        return (
            Date.now() >= PRIVACY_UPDATE_START_TIME &&
            Date.now() < PRIVACY_UPDATE_END_TIME &&
            typeof seen === 'undefined' &&
            typeof this.props.user !== 'undefined'
        );
    }

    handleCloseBanner () {
        const opts = {};
        this.setState({dismissedPrivacyBanner: true});
        jar.set('scratchpolicyseen', true, opts);
    }
    render () {
        const showBanner = this.shouldShowBanner();
        const privacyPolicyLink = chunks => <a href="/privacy_policy">{chunks}</a>
        if (showBanner) {
            return (
                <aside>
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
                                    <FormattedMessage
                                        id="privacyBanner.update"
                                        values={{
                                            a: privacyPolicyLink
                                        }}
                                    />
                                </p>
                            </div>
                            <Button
                                isCloseType
                                className="privacy-close-button"
                                key="closeButton"
                                name="closeButton"
                                type="button"
                                onClick={this.handleCloseBanner}
                            >
                                <div className="action-button-text">
                                    <FormattedMessage id="general.close" />
                                </div>
                            </Button>
                        </div>
                    </TitleBanner>
                </aside>
            );
        }

        // if we're not showing the banner, return null to not render anything
        return null;
    }
}

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
