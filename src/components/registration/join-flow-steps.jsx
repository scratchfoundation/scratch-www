/* eslint-disable react/no-multi-comp */
const React = require('react');
const injectIntl = require('react-intl').injectIntl;
import {Formik, Form} from 'formik';

/*
 * Username step
 */
/* eslint-disable react/prefer-stateless-function, no-useless-constructor */
class UsernameStep extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Formik
                initialValues={{
                }}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form className="join-modal-form" />
            </Formik>
        );
    }
}
/* eslint-enable */

UsernameStep.propTypes = {
};

UsernameStep.defaultProps = {
};

const IntlUsernameStep = injectIntl(UsernameStep);

module.exports.UsernameStep = IntlUsernameStep;
