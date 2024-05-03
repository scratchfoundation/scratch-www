const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Navigation = require('../../navigation/www/navigation.jsx');
const Footer = require('../../footer/www/footer.jsx');
const DonorRecognition = require('./donor-recognition.jsx');
const ErrorBoundary = require('../../errorboundary/errorboundary.jsx');
const PrivacyBanner = require('../../privacy-banner/privacy-banner.jsx');

const today = new Date();
const semi = today.getDate() === 1 && today.getMonth() === 3;

const Page = ({
    children,
    className,
    showDonorRecognition
}) => (
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
                {children}
            </main>
            <footer id="footer">
                <Footer />
            </footer>
            {showDonorRecognition &&
                <aside id="donor">
                    <DonorRecognition />
                </aside>
            }
        </div>
        {semi && <div style={{color: '#fff'}}>{';'}</div>}
    </ErrorBoundary>
);

Page.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    showDonorRecognition: PropTypes.bool
};

module.exports = Page;
