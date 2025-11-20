const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const Navigation = require('../../navigation/www/navigation.jsx');
const Footer = require('../../footer/www/footer.jsx');
const ErrorBoundary = require('../../errorboundary/errorboundary.jsx');
const PrivacyBanner = require('../../privacy-banner/privacy-banner.jsx');
const TouModal = require('../../modal/tou/modal.jsx');
const ParentalConsentView = require('../../../views/parental-consent/parental-consent-view.jsx');
const ALLOWED_PAGES = ['privacy_policy', 'terms_of_use', 'community_guidelines'];

const today = new Date();
const semi = today.getDate() === 1 && today.getMonth() === 3;

const Page = ({
    children,
    className,
    user
}) => {
    const path = window.location.pathname.split('/');
    const isAllowedPage = ALLOWED_PAGES.some(page => path.indexOf(page) >= 0);

    const shouldDisplayTouModal = user &&
        !user.isStudent &&
        !user.acceptedTermsOfUse &&
        !isAllowedPage &&
        // If a user has no state - we should always display the ToU modal in order to gather the state,
        // regardless of the default jurisdiction rules
        // If a state exists, it only makes sense to display the ToU flow when no explicit parental consent is required.
        // Otherwise, the user should be put in a blocking flow
        (!user.state || !user.parentalConsentRequired);

    const shouldDisplayBlockingPage = user &&
        !user.isStudent &&
        !user.acceptedTermsOfUse &&
        !isAllowedPage &&
        !shouldDisplayTouModal;

    return (
        <ErrorBoundary componentName="Page">
            <div className={classNames('page', className)}>
                <nav
                    className={classNames({
                        staging: process.env.SCRATCH_ENV === 'staging'
                    })}
                    id="navigation"
                >
                    <Navigation />
                </nav>
                <PrivacyBanner />
                <main id="view">
                    {shouldDisplayTouModal && <TouModal user={user} />}
                    {shouldDisplayBlockingPage ? <ParentalConsentView /> : children}
                </main>
                <footer id="footer">
                    <Footer />
                </footer>
            </div>
            {semi && <div style={{color: '#fff'}}>{';'}</div>}
        </ErrorBoundary>
    );
};

Page.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        token: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        state: PropTypes.string,
        email: PropTypes.string,
        isStudent: PropTypes.bool,
        isEducator: PropTypes.bool,
        underConsentAge: PropTypes.bool,
        parentalConsentRequired: PropTypes.bool,
        acceptedTermsOfUse: PropTypes.bool,
        withParentEmail: PropTypes.bool
    })
};

const mapStateToProps = state => ({
    user: state.session.session?.user ? {
        ...state.session.session.user,
        isStudent: state.session.session.permissions?.student,
        isEducator: state.session.session.permissions?.educator,
        underConsentAge: state.session.session.flags?.under_consent_age,
        parentalConsentRequired: state.session.session.flags?.parental_consent_required,
        acceptedTermsOfUse: state.session.session.flags?.accepted_terms_of_use,
        withParentEmail: state.session.session.flags?.with_parent_email
    } : null
});

const ConnectedPage = connect(mapStateToProps)(Page);

module.exports = ConnectedPage;
