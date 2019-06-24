/* eslint-disable react/no-multi-comp */
const React = require('react');
const injectIntl = require('react-intl').injectIntl;
import {Formik, Form} from 'formik';

/*
 * Example step
 */
/* eslint-disable react/prefer-stateless-function, no-useless-constructor */
class ExampleStep extends React.Component {
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

ExampleStep.propTypes = {
};

ExampleStep.defaultProps = {
    showPassword: false,
    waiting: false
};

const IntlExampleStep = injectIntl(ExampleStep);

module.exports.ExampleStep = IntlExampleStep;
