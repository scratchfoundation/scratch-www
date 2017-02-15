var React = require('react');

var NavigationBox = require('../../base/navigation.jsx');

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
                            <p className="logo-a-title">Conference</p>
                        </a>
                    </li>
                </ul>
            </NavigationBox>
        );
    }
});

module.exports = Navigation;
