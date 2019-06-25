const bindAll = require('lodash.bindall');
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;

const JoinFlowSteps = require('../registration/join-flow-steps.jsx');

/*
eslint-disable react/prefer-stateless-function, react/no-unused-prop-types, no-useless-constructor
*/
class JoinFlow extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAdvanceStep'
        ]);
    }
    handleAdvanceStep (formData) {
        formData = formData || {};
        this.setState({
            step: this.state.step + 1,
            formData: defaults({}, formData, this.state.formData)
        });
    }
    render () {
        return (
            <React.Fragment>
                <JoinFlowSteps.UsernameStep />
            </React.Fragment>
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
