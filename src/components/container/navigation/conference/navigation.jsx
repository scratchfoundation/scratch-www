var React = require('react');

var NavigationBox = require('../../../presentation/navigation/navigation.jsx');

require('./navigation.scss');

var Navigation = React.createClass({
    type: 'Navigation',
    render: function () {
        return (
            <NavigationBox>
                <ul>
                    <li className="left logo">
                        <a href="/conference">
                            <img src="/images/logo_sm.png" alt="Scratch Logo" />
                            <p>Conference</p>
                        </a>
                    </li>
                    <li className="right">
                        <ul>
                            <li className="link expect">
                                <a href="/conference/expect">What to Expect</a>
                            </li>
                            <li className="link plan">
                                <a href="/conference/plan">Plan Your Visit</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </NavigationBox>
        );
    }
});

module.exports = Navigation;
