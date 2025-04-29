const React = require('react');

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
const mockedValidateUsernameRemotely = jest.fn(() => (
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
const {renderWithIntl} = require('../../helpers/react-testing-library-wrapper.jsx');


describe('UsernameStep tests', () => {
    const defaultProps = () => ({
        sendAnalytics: jest.fn()
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('send correct props to formik', () => {
        const {instance, findByComponentName} = renderWithIntl(<UsernameStep
            {...defaultProps()}
        />,
        'UsernameStep');
        const formikComponent = findByComponentName('Formik');
        const usernameStepInstance = instance();
        expect(formikComponent.memoizedProps.initialValues.username).toBe('');
        expect(formikComponent.memoizedProps.initialValues.password).toBe('');
        expect(formikComponent.memoizedProps.initialValues.passwordConfirm).toBe('');
        expect(formikComponent.memoizedProps.initialValues.showPassword).toBe(true);
        expect(formikComponent.memoizedProps.validateOnBlur).toBe(false);
        expect(formikComponent.memoizedProps.validateOnChange).toBe(false);
        expect(formikComponent.memoizedProps.validate).toBe(usernameStepInstance.validateForm);
        expect(formikComponent.memoizedProps.onSubmit).toBe(usernameStepInstance.handleValidSubmit);
    });

    test('Component does not log if path is /join', () => {
        const sendAnalyticsFn = jest.fn();

        global.window.history.pushState({}, '', '/join');
        renderWithIntl(
            <UsernameStep
                sendAnalytics={sendAnalyticsFn}
            />);
        expect(sendAnalyticsFn).not.toHaveBeenCalled();
    });

    test('Component logs analytics', () => {
        // Make sure '/join' is NOT in the path
        global.window.history.pushState({}, '', '/');
        const sendAnalyticsFn = jest.fn();
        renderWithIntl(
            <UsernameStep
                sendAnalytics={sendAnalyticsFn}
            />);
        expect(sendAnalyticsFn).toHaveBeenCalledWith('join-username-modal');
    });

    test('handleValidSubmit passes formData to next step', () => {
        const formikBag = {
            setSubmitting: jest.fn()
        };
        const formData = {item1: 'thing', item2: 'otherthing'};
        const mockedOnNextStep = jest.fn();
        const wrapper = renderWithIntl(
            <UsernameStep
                {...defaultProps()}
                onNextStep={mockedOnNextStep}
            />,
            'UsernameStep'
        );
        const instance = wrapper.instance();

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
        const wrapper = renderWithIntl(<UsernameStep />, 'UsernameStep');
        const instance = wrapper.instance();

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
        const wrapper = renderWithIntl(
            <UsernameStep />,
            'UsernameStep'
        );
        const instance = wrapper.instance();

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
        const wrapper = renderWithIntl(
            <UsernameStep />,
            'UsernameStep'
        );
        const instance = wrapper.instance();

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
        const wrapper = renderWithIntl(<UsernameStep />, 'UsernameStep');
        const instance = wrapper.instance();

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
        const wrapper = renderWithIntl(
            <UsernameStep />,
            'UsernameStep'
        );
        const instance = wrapper.instance();

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
        const wrapper = renderWithIntl(
            <UsernameStep />,
            'UsernameStep'
        );
        const instance = wrapper.instance();

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
