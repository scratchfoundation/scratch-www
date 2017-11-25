import React from 'react';

import NavigationBox from '../../base/navigation.jsx';

require('./navigation.scss');

var Navigation = React.createClass({
    type: 'Navigation',
    render: function () {
        return (
            <NavigationBox>
                <ul className="ul mod-2017">
                    <li className="li-left mod-logo mod-2017">
                        <a href="/conference" className="logo-a">
                            <img
                                src="/images/logo_sm.png"
                                alt="Scratch Logo"
                                className="logo-a-image"
                            />
                            <p className="logo-a-title">Conferences</p>
                        </a>
                    </li>
                </ul>
            </NavigationBox>
        );
    }
});

export default Navigation;
