const React = require('react');

const NavigationBox = require('../../base/navigation.jsx');

require('./navigation.scss');

const Navigation = () => (
    <NavigationBox>
        <ul className="ul mod-2020">
            <li className="li-left mod-logo mod-2020">
                <ul className="li-left-ul mod-2020">
                    <li>
                        <a
                            className="logo-a"
                            href="/"
                        >
                            <img
                                alt="Scratch Logo"
                                className="logo-a-image"
                                src="/images/logo_sm.png"
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            className="link-a"
                            href="/conference"
                        >
                            <span className="logo-a-title">Conference</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </NavigationBox>
);

module.exports = Navigation;
