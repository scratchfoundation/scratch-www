const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const Navigation = require('../../navigation/www/navigation.jsx');
const Footer = require('../../footer/www/footer.jsx');
const ErrorBoundary = require('../../errorboundary/errorboundary.jsx');
const PrivacyBanner = require('../../privacy-banner/privacy-banner.jsx');
const TosModal = require('../../modal/tos/modal.jsx');
const ParentalConsentView = require('../../../views/parental-consent/parental-consent-view.jsx');
const ALLOWED_PAGES = ['community_guidelines'];

const today = new Date();
const semi = today.getDate() === 1 && today.getMonth() === 3;

const Page = ({
    children,
    className,
    user
}) => {
    const path = window.location.pathname.split('/');
    const isAllowedPage = ALLOWED_PAGES.some(page => path.indexOf(page) >= 0);
    const userHasMissingInfo = user && (
        !user.country ||
        (user.country === 'United States' && !user.state) ||
        !user.birthMonth ||
        !user.birthYear
    );

    const shouldDisplayTosModal = user &&
        !user.isStudent &&
        !user.acceptedTermsOfService &&
        !isAllowedPage &&
        // If a user has missing information - we should always display the ToS modal in order to gather it,
        // regardless of the default jurisdiction rules
        // If all required info is gathered, it only makes sense to display
        // the ToS flow when no explicit parental consent is required.
        // Otherwise, the user should be put in a blocking flow
        (userHasMissingInfo || !user.parentalConsentRequired);

    const shouldDisplayBlockingPage = user &&
        !user.isStudent &&
        !user.acceptedTermsOfService &&
        !isAllowedPage &&
        !shouldDisplayTosModal;

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
                <main
                    id="view"
                    className={classNames({
                        'blocking-view': shouldDisplayBlockingPage
                    })}
                >
                    {shouldDisplayTosModal && <TosModal user={user} />}
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
        country: PropTypes.string,
        state: PropTypes.string,
        birthMonth: PropTypes.number,
        birthYear: PropTypes.number,
        email: PropTypes.string,
        isStudent: PropTypes.bool,
        isEducator: PropTypes.bool,
        underConsentAge: PropTypes.bool,
        parentalConsentRequired: PropTypes.bool,
        acceptedTermsOfService: PropTypes.bool,
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
        acceptedTermsOfService: state.session.session.flags?.accepted_terms_of_service,
        withParentEmail: state.session.session.flags?.with_parent_email
    } : null
});

const ConnectedPage = connect(mapStateToProps)(Page);

module.exports = ConnectedPage;
