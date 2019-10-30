const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');

const mockedValidateUsernameRemotely = jest.fn(() => (
    /* eslint-disable no-undef */
    Promise.resolve({valid: false, errMsgId: 'registration.validationUsernameNotAllowed'})
    /* eslint-enable no-undef */
));

jest.mock('../../../src/lib/validate.js', () => (
    {
        ...(jest.requireActual('../../../src/lib/validate.js')),
        validateUsernameRemotely: mockedValidateUsernameRemotely
    }
));

// must come after validation mocks, so validate.js will be mocked before it is required
const UsernameStep = require('../../../src/components/join-flow/username-step.jsx');

describe('UsernameStep test', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('send correct props to formik', () => {
        const wrapper = shallowWithIntl(<UsernameStep />);
        const formikWrapper = wrapper.dive();
        expect(formikWrapper.props().initialValues.username).toBe('');
        expect(formikWrapper.props().initialValues.password).toBe('');
        expect(formikWrapper.props().initialValues.passwordConfirm).toBe('');
        expect(formikWrapper.props().initialValues.showPassword).toBe(true);
        expect(formikWrapper.props().validateOnBlur).toBe(false);
        expect(formikWrapper.props().validateOnChange).toBe(false);
        expect(formikWrapper.props().validate).toBe(formikWrapper.instance().validateForm);
        expect(formikWrapper.props().onSubmit).toBe(formikWrapper.instance().handleValidSubmit);
    });

    test('handleValidSubmit passes formData to next step', () => {
        const formikBag = {
            setSubmitting: jest.fn()
        };
        const formData = {item1: 'thing', item2: 'otherthing'};
        const mockedOnNextStep = jest.fn();
        const wrapper = shallowWithIntl(
            <UsernameStep
                onNextStep={mockedOnNextStep}
            />
        );
        const instance = wrapper.dive().instance();

        instance.handleValidSubmit(formData, formikBag);
        expect(formikBag.setSubmitting).toHaveBeenCalledWith(false);
        expect(mockedOnNextStep).toHaveBeenCalledWith(formData);
    });

    test('validateUsernameRemotelyWithCache calls validate.validateUsernameRemotely', done => {
        const wrapper = shallowWithIntl(
            <UsernameStep />);
        const instance = wrapper.dive().instance();

        instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
            .then(response => {
                expect(mockedValidateUsernameRemotely).toHaveBeenCalled();
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
                done();
            });
    });

    test('validateUsernameRemotelyWithCache, called twice with different data, makes two remote requests', done => {
        const wrapper = shallowWithIntl(
            <UsernameStep />
        );
        const instance = wrapper.dive().instance();

        instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
            .then(response => {
                expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(1);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
            })
            .then(() => {
                // make the same request a second time
                instance.validateUsernameRemotelyWithCache('secondDifferent66')
                    .then(response => {
                        expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(2);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
                        done();
                    });
            });
    });

    test('validateUsernameRemotelyWithCache, called twice with same data, only makes one remote request', done => {
        const wrapper = shallowWithIntl(
            <UsernameStep />
        );
        const instance = wrapper.dive().instance();

        instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
            .then(response => {
                expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(1);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
            })
            .then(() => {
                // make the same request a second time
                instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
                    .then(response => {
                        expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(1);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
                        done();
                    });
            });
    });
});
