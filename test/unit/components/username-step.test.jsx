const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
const {mountWithIntl} = require('../../helpers/intl-helpers.jsx');

const requestSuccessResponse = {
    requestSucceeded: true,
    valid: false,
    errMsgId: 'registration.validationUsernameNotAllowed'
};
const requestFailureResponse = {
    requestSucceeded: false,
    valid: false,
    errMsgId: 'general.error'
};
// mockedValidateUsernameRemotely will return a promise resolving with remoteRequestResponse.
// Using remoteRequestResponse, rather than using requestSuccessResponse directly,
// lets us change where remoteRequestResponse points later, without actually changing
// mockedValidateUsernameRemotely.
let remoteRequestResponse = requestSuccessResponse;
let mockedValidateUsernameRemotely = jest.fn(() => (
    /* eslint-disable no-undef */
    Promise.resolve(remoteRequestResponse)
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

<<<<<<< HEAD
describe('UsernameStep tests', () => {
=======
describe('UsernameStep test', () => {
    const defaultProps = () => ({
        sendAnalytics: jest.fn()
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
>>>>>>> Add analytics logging to join flow.  Adding page views for each step in the flow.

    test('send correct props to formik', () => {
        const wrapper = shallowWithIntl(<UsernameStep
            {...defaultProps()}
        />);
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

    test('Component does not log if path is /join', () => {
        const sendAnalyticsFn = jest.fn();

        global.window.history.pushState({}, '', '/join');
        mountWithIntl(
            <UsernameStep
                sendAnalytics={sendAnalyticsFn}
            />);
        expect(sendAnalyticsFn).not.toHaveBeenCalled();
    });

    test('Component logs analytics', () => {
        // Make sure '/join' is NOT in the path
        global.window.history.pushState({}, '', '/');
        const sendAnalyticsFn = jest.fn();
        mountWithIntl(
            <UsernameStep
                sendAnalytics={sendAnalyticsFn}
            />);
        expect(sendAnalyticsFn).toHaveBeenCalledWith('join-email');
    });

    test('handleValidSubmit passes formData to next step', () => {
        const formikBag = {
            setSubmitting: jest.fn()
        };
        const formData = {item1: 'thing', item2: 'otherthing'};
        const mockedOnNextStep = jest.fn();
        const wrapper = shallowWithIntl(
            <UsernameStep
                {...defaultProps()}
                onNextStep={mockedOnNextStep}
            />
        );
        const instance = wrapper.dive().instance();

        instance.handleValidSubmit(formData, formikBag);
        expect(formikBag.setSubmitting).toHaveBeenCalledWith(false);
        expect(mockedOnNextStep).toHaveBeenCalledWith(formData);
    });

});

describe('validateUsernameRemotelyWithCache test with successful requests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('validateUsernameRemotelyWithCache calls validate.validateUsernameRemotely', done => {
<<<<<<< HEAD
        const wrapper = shallowWithIntl(<UsernameStep />);
=======
        const wrapper = shallowWithIntl(
            <UsernameStep
                {...defaultProps()}
            />);
>>>>>>> Add analytics logging to join flow.  Adding page views for each step in the flow.
        const instance = wrapper.dive().instance();

        instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
            .then(response => {
                expect(mockedValidateUsernameRemotely).toHaveBeenCalled();
                expect(response.requestSucceeded).toBe(true);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
                done();
            });
    });

    test('validateUsernameRemotelyWithCache, called twice with different data, makes two remote requests', done => {
        const wrapper = shallowWithIntl(
            <UsernameStep
                {...defaultProps()}
            />
        );
        const instance = wrapper.dive().instance();

        instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
            .then(response => {
                expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(1);
                expect(response.requestSucceeded).toBe(true);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
            })
            .then(() => {
                // make the same request a second time
                instance.validateUsernameRemotelyWithCache('secondDifferent66')
                    .then(response => {
                        expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(2);
                        expect(response.requestSucceeded).toBe(true);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
                        done();
                    });
            });
    });

    test('validateUsernameRemotelyWithCache, called twice with same data, only makes one remote request', done => {
        const wrapper = shallowWithIntl(
            <UsernameStep
                {...defaultProps()}
            />
        );
        const instance = wrapper.dive().instance();

        instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
            .then(response => {
                expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(1);
                expect(response.requestSucceeded).toBe(true);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
            })
            .then(() => {
                // make the same request a second time
                instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
                    .then(response => {
                        expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(1);
                        expect(response.requestSucceeded).toBe(true);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('registration.validationUsernameNotAllowed');
                        done();
                    });
            });
    });
});

describe('validateUsernameRemotelyWithCache test with failing requests', () => {

    beforeEach(() => {
        // needs to be wrapped inside beforeEach, because if not, it gets run as this
        // test file is loaded, and goes into effect before any of the earlier tests run!
        remoteRequestResponse = requestFailureResponse;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('validateUsernameRemotelyWithCache calls validate.validateUsernameRemotely', done => {
        const wrapper = shallowWithIntl(<UsernameStep />);
        const instance = wrapper.dive().instance();

        instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
            .then(response => {
                expect(mockedValidateUsernameRemotely).toHaveBeenCalled();
                expect(response.requestSucceeded).toBe(false);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('general.error');
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
                expect(response.requestSucceeded).toBe(false);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('general.error');
            })
            .then(() => {
                // make the same request a second time
                instance.validateUsernameRemotelyWithCache('secondDifferent66')
                    .then(response => {
                        expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(2);
                        expect(response.requestSucceeded).toBe(false);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('general.error');
                        done();
                    });
            });
    });

    test('validateUsernameRemotelyWithCache, called 2x w/same data, makes 2 requests, since 1st not stored', done => {
        const wrapper = shallowWithIntl(
            <UsernameStep />
        );
        const instance = wrapper.dive().instance();

        instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
            .then(response => {
                expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(1);
                expect(response.requestSucceeded).toBe(false);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('general.error');
            })
            .then(() => {
                // make the same request a second time
                instance.validateUsernameRemotelyWithCache('newUniqueUsername55')
                    .then(response => {
                        expect(mockedValidateUsernameRemotely).toHaveBeenCalledTimes(2);
                        expect(response.requestSucceeded).toBe(false);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('general.error');
                        done();
                    });
            });
    });
});
