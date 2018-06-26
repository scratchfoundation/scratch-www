const React = require('react');

class ConsoleWarning extends React.Component {
    constructor (reactIntl) {
        super();
        console.log(
            '%c' + reactIntl.formatMessage({id: 'general.consoleWarningTitle'}),
            'color: #F00; font-size: 30px; -webkit-text-stroke: 1px black; font-weight:bold'
        );
        console.log(reactIntl.formatMessage({id: 'general.consoleWarningDescription'}));
    }

    render () {
        return false;
    }
}
