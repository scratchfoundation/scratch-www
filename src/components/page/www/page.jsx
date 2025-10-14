const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const Navigation = require('../../navigation/www/navigation.jsx');
const Footer = require('../../footer/www/footer.jsx');
const ErrorBoundary = require('../../errorboundary/errorboundary.jsx');
const PrivacyBanner = require('../../privacy-banner/privacy-banner.jsx');
const TouModal = require('../../modal/tou/modal.jsx');

const today = new Date();
const semi = today.getDate() === 1 && today.getMonth() === 3;

const Page = ({
    children,
    className,
    user
}) => {
    // TODO: Should be displayed when new TOU is not accepted, but we don't have that yet
    const shouldDisplayTouModal = user && !user.student && user.country === 'United States' && !user.state;

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
                    {children}
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
        state: PropTypes.string
    })
};

const mapStateToProps = state => ({
    user: state.session.session?.user
});

const ConnectedPage = connect(mapStateToProps)(Page);

module.exports = ConnectedPage;
