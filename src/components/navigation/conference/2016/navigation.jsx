import React from 'react';

import NavigationBox from '../../base/navigation.jsx';

require('./navigation.scss');

var Navigation = React.createClass({
    type: 'Navigation',
    render: function () {
        return (
            <NavigationBox>
                <ul className="ul mod-2016">
                    <li className="li-left mod-logo mod-2016">
                        <a href="/conference/2016" className="logo-a">
                            <img
                                src="/images/logo_sm.png"
                                alt="Scratch Logo"
                                className="logo-a-image"
                            />
                            <p className="logo-a-title">Conference</p>
                        </a>
                    </li>
                    <li className="li-right mod-2016">
                        <ul className="li-right-ul mod-2016">
                            <li className="link expect">
                                <a href="/conference/2016/expect" className="link-a">What to Expect</a>
                            </li>
                            <li className="link plan">
                                <a href="/conference/2016/plan" className="link-a">Plan Your Visit</a>
                            </li>
                            <li className="link schedule">
                                <a href="/conference/2016/schedule" className="link-a">Schedule</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </NavigationBox>
        );
    }
});

export default Navigation;
