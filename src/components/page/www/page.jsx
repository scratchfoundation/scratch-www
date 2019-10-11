const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Navigation = require('../../navigation/www/navigation.jsx');
const Footer = require('../../footer/www/footer.jsx');
const ErrorBoundary = require('../../errorboundary/errorboundary.jsx');

const Page = ({
    children,
    className
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
                {children}
            </div>
            <div id="footer">
                <Footer />
            </div>
        </div>
    </ErrorBoundary>
);

Page.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = Page;
