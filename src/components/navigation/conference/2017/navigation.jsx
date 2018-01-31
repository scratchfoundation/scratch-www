const React = require('react');

const NavigationBox = require('../../base/navigation.jsx');

require('./navigation.scss');

const Navigation = () => (
    <NavigationBox>
        <ul className="ul mod-2017">
            <li className="li-left mod-logo mod-2017">
                <a
                    className="logo-a"
                    href="/conference"
                >
                    <img
                        alt="Scratch Logo"
                        className="logo-a-image"
                        src="/images/logo_sm.png"
                    />
                    <p className="logo-a-title">Conferences</p>
                </a>
            </li>
        </ul>
    </NavigationBox>
);

module.exports = Navigation;
