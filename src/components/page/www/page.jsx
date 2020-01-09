const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Navigation = require('../../navigation/www/navigation.jsx');
const Footer = require('../../footer/www/footer.jsx');
const DonorRecognition = require('./donor-recognition.jsx');
const ErrorBoundary = require('../../errorboundary/errorboundary.jsx');
const WarningBanner = require('../../title-banner/warning-banner.jsx');

// Mandrill outage banner
const MANDRILL_OUTAGE_START_TIME = 1578718800000; // 2020-01-11 12:00:00
const MANDRILL_OUTAGE_END_TIME = 1578747600000; // 2020-01-11 08:00:00

const Page = ({
    children,
    className,
    showDonorRecognition
}) => (
    <ErrorBoundary componentName="Page">
        <div className={classNames('page', className)}>
            <div
                className={classNames({
                    staging: process.env.SCRATCH_ENV === 'staging'
                })}
                id="navigation"
            >
                <Navigation />
            </div>
            <div id="view">
                {(Date.now() >= MANDRILL_OUTAGE_START_TIME && Date.now() < MANDRILL_OUTAGE_END_TIME) && (
                    <WarningBanner>
                        We are experiencing a disruption with email delivery.
                        If you are not receiving emails from us, please try after 8am EST.
                    </WarningBanner>
                )}
                {children}
            </div>
            <div id="footer">
                <Footer />
            </div>
            {showDonorRecognition &&
                <div id="donor">
                    <DonorRecognition />
                </div>
            }
        </div>
    </ErrorBoundary>
);

Page.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    showDonorRecognition: PropTypes.bool
};

module.exports = Page;
