const bindAll = require('lodash.bindall');
const React = require('react');

const OS_ENUM = require('./os-enum.js');

class ExtensionLanding extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onSetOS'
        ]);

        this.state = {
            OS: OS_ENUM.WINDOWS
        };
    }

    onSetOS (os) {
        this.setState({
            OS: os
        });
    }
}

module.exports = ExtensionLanding;
