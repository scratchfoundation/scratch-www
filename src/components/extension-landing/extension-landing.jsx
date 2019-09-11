const bindAll = require('lodash.bindall');
const React = require('react');

const OS_ENUM = require('./os-enum.js');

class ExtensionLanding extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onSetOS'
        ]);

        // @todo use bowser for browser detection
        let detectedOS = OS_ENUM.WINDOWS;
        if (window.navigator && window.navigator.platform) {
            if (window.navigator.platform === 'MacIntel') {
                detectedOS = OS_ENUM.MACOS;
            }
        }
        // ChromeOS reports platform as Linux, Android devices are inconsistent
        // need to use userAgent instead
        if (window.navigator && window.navigator.userAgent) {
            if (window.navigator.userAgent.indexOf('Android') > -1) {
                detectedOS = OS_ENUM.ANDROID;
            }
            if (window.navigator.userAgent.indexOf('CrOS') > -1) {
                detectedOS = OS_ENUM.CHROMEOS;
            }
        }

        this.state = {
            OS: detectedOS
        };
    }

    onSetOS (os) {
        this.setState({
            OS: os
        });
    }
}

module.exports = ExtensionLanding;
