const bindAll = require('lodash.bindall');
const React = require('react');

const detectOS = require('../../lib/detect-os.js').default;

class ExtensionLanding extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onSetOS'
        ]);

        this.state = {
            OS: detectOS()
        };
    }

    onSetOS (os) {
        this.setState({
            OS: os
        });
    }
}

module.exports = ExtensionLanding;
