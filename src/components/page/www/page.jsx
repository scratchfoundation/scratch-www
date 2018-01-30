const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Navigation = require('../../navigation/www/navigation.jsx');
const Footer = require('../../footer/www/footer.jsx');

const Page = props => (
    <div className="page">
        <div
            className={classNames({
                staging: process.env.SCRATCH_ENV === 'staging'
            })}
            id="navigation"
        >
            <Navigation />
        </div>
        <div id="view">
            {props.children}
        </div>
        <div id="footer">
            <Footer />
        </div>
    </div>
);

Page.propTypes = {
    children: PropTypes.node
};

module.exports = Page;
