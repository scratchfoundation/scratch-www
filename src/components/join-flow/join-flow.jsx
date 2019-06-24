const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;

/*
eslint-disable react/prefer-stateless-function, react/no-unused-prop-types, no-useless-constructor
*/
class JoinFlow extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <React.Fragment />
        );
    }
}

JoinFlow.propTypes = {
    intl: intlShape,
    onCompleteRegistration: PropTypes.func
};

module.exports = injectIntl(JoinFlow);

/*
eslint-enable
*/
