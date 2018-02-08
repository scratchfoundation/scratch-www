const React = require('react');

const NavigationBox = require('../../base/navigation.jsx');

require('./navigation.scss');

const Navigation = () => (
    <NavigationBox>
        <ul className="ul mod-2016">
            <li className="li-left mod-logo mod-2016">
                <a
                    className="logo-a"
                    href="/conference/2016"
                >
                    <img
                        alt="Scratch Logo"
                        className="logo-a-image"
                        src="/images/logo_sm.png"
                    />
                    <p className="logo-a-title">Conference</p>
                </a>
            </li>
            <li className="li-right mod-2016">
                <ul className="li-right-ul mod-2016">
                    <li className="link expect">
                        <a
                            className="link-a"
                            href="/conference/2016/expect"
                        >
                            What to Expect
                        </a>
                    </li>
                    <li className="link plan">
                        <a
                            className="link-a"
                            href="/conference/2016/plan"
                        >
                            Plan Your Visit
                        </a>
                    </li>
                    <li className="link schedule">
                        <a
                            className="link-a"
                            href="/conference/2016/schedule"
                        >
                            Schedule
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </NavigationBox>
);

module.exports = Navigation;
