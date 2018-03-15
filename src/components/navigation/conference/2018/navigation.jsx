const React = require('react');

const NavigationBox = require('../../base/navigation.jsx');

require('./navigation.scss');

const Navigation = () => (
    <NavigationBox>
        <ul className="ul mod-2018">
            <li className="li-left mod-logo mod-2018">
                <ul className="li-left-ul mod-2018">
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
            <li className="li-right mod-2018">
                <ul className="li-right-ul mod-2018">
                    <li className="link questions">
                        <a
                            className="link-a"
                            href="#questions"
                        >
                            Questions
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </NavigationBox>
);

module.exports = Navigation;
