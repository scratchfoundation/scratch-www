const injectIntl = require('react-intl').injectIntl;
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const NavigationBox = require('../../base/navigation.jsx');

require('./navigation.scss');

const Navigation = () => (
    <NavigationBox>
        <ul className="ul mod-2019">
            <li className="li-left mod-logo mod-2019">
                <a
                    className="logo-a"
                    href="https://scratch.mit.edu"
                >
                    <img
                        alt="Scratch Logo"
                        className="logo-a-image"
                        src="/images/logo_sm.png"
                    />
                </a>
            </li>
            <li className="li-left mod-logo mod-2019">
                <a
                    className="logo-a"
                    href="/conference/2019"
                >
                    <p className="logo-a-title">
                        <FormattedMessage id="general.conferences" />
                    </p>
                </a>
            </li>
        </ul>
    </NavigationBox>
);

module.exports = injectIntl(Navigation);
