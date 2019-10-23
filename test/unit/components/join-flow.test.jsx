import React from 'react';
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
const defaults = require('lodash.defaultsdeep');
import configureStore from 'redux-mock-store';
import JoinFlow from '../../../src/components/join-flow/join-flow';
import Progression from '../../../src/components/progression/progression.jsx';
import RegistrationErrorStep from '../../../src/components/join-flow/registration-error-step';

describe('JoinFlow', () => {
    const mockStore = configureStore();
    let store;
    const responseBodyMultipleErrs = [
        {
            msg: 'This field is required.',
            errors: {
                username: ['This field is required.'],
                recaptcha: ['Incorrect, please try again.']
            },
            success: false
        }
    ];
    const responseBodySingleErr = [
        {
            msg: 'This field is required.',
            errors: {
                recaptcha: ['Incorrect, please try again.']
            },
            success: false
        }
    ];
    const responseBodySuccess = [
        {
            msg: 'This field is required.',
            errors: {
                recaptcha: ['Incorrect, please try again.']
            },
            success: true
        }
    ];


    beforeEach(() => {
        store = mockStore({sessionActions: {
            refreshSession: jest.fn()
        }});
    });

    const getJoinFlowWrapper = props => {
        const wrapper = shallowWithIntl(
            <JoinFlow
                {...props}
            />
            , {context: {store}}
        );
        return wrapper
            .dive() // unwrap redux connect(injectIntl(JoinFlow))
            .dive(); // unwrap injectIntl(JoinFlow)
    };

    test('handleRegistrationResponse with successful response', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        const responseErr = null;
        const responseBody = [
            {
                success: true
            }
        ];
        const responseObj = {
            statusCode: 200
        };
        joinFlowInstance.handleRegistrationResponse(responseErr, responseBody, responseObj);
        expect(joinFlowInstance.props.refreshSession).toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toBe(null);
    });

    test('handleRegistrationResponse with healthy response, indicating failure', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        const responseErr = null;
        const responseBody = [
            {
                msg: 'This field is required.',
                errors: {
                    username: ['This field is required.']
                },
                success: false
            }
        ];
        const responseObj = {
            statusCode: 200
        };
        joinFlowInstance.handleRegistrationResponse(responseErr, responseBody, responseObj);
        expect(joinFlowInstance.props.refreshSession).not.toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: false,
            errorMsg: 'registration.problemsAre "username: This field is required."'
        });
    });

    test('handleRegistrationResponse with failure response, with error fields missing', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        const responseErr = null;
        const responseBody = [
            {
                msg: 'This field is required.',
                success: false
            }
        ];
        const responseObj = {
            statusCode: 200
        };
        joinFlowInstance.handleRegistrationResponse(responseErr, responseBody, responseObj);
        expect(joinFlowInstance.props.refreshSession).not.toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: false,
            errorMsg: null
        });
    });

    test('handleRegistrationResponse with failure response, with no text explanation', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        const responseErr = null;
        const responseBody = [
            {
                success: false
            }
        ];
        const responseObj = {
            statusCode: 200
        };
        joinFlowInstance.handleRegistrationResponse(responseErr, responseBody, responseObj);
        expect(joinFlowInstance.props.refreshSession).not.toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: false,
            errorMsg: null
        });
    });

    test('handleRegistrationResponse with failure status code', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        const responseErr = null;
        const responseBody = [
            {
                success: false
            }
        ];
        const responseObj = {
            statusCode: 400
        };
        joinFlowInstance.handleRegistrationResponse(responseErr, responseBody, responseObj);
        expect(joinFlowInstance.props.refreshSession).not.toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: true
        });
    });

    test('handleCaptchaError gives state with captcha message', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.setState({});
        joinFlowInstance.handleCaptchaError();
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: false,
            errorMsg: 'registration.errorCaptcha'
        });
    });

    test('handleAdvanceStep', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.setState({formData: {username: 'ScratchCat123'}, step: 2});
        joinFlowInstance.handleAdvanceStep({email: 'scratchcat123@scratch.mit.edu'});
        expect(joinFlowInstance.state.formData.username).toBe('ScratchCat123');
        expect(joinFlowInstance.state.formData.email).toBe('scratchcat123@scratch.mit.edu');
        expect(joinFlowInstance.state.step).toBe(3);
    });

    test('when state.registrationError has error message, we show RegistrationErrorStep', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({registrationError: 'halp there is a errors!!'});
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        const progressionWrapper = joinFlowWrapper.find(Progression);
        expect(registrationErrorWrapper).toHaveLength(1);
        expect(progressionWrapper).toHaveLength(0);
    });

    test('when state.registrationError has null error message, we show Progression', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({registrationError: null});
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        const progressionWrapper = joinFlowWrapper.find(Progression);
        expect(registrationErrorWrapper).toHaveLength(0);
        expect(progressionWrapper).toHaveLength(1);
    });

    test('when state.registrationError has empty error message, we show Progression', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({registrationError: ''});
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        const progressionWrapper = joinFlowWrapper.find(Progression);
        expect(registrationErrorWrapper).toHaveLength(0);
        expect(progressionWrapper).toHaveLength(1);
    });

    test('when numAttempts is 0 and registrationError canTryAgain is true, ' +
        'RegistrationErrorStep receives canTryAgain prop with value true', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({
            numAttempts: 0,
            registrationError: {
                canTryAgain: true,
                errorMsg: 'halp there is a errors!!'
            }
        });
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        expect(registrationErrorWrapper.first().props().canTryAgain).toEqual(true);
    });

    test('when numAttempts is 1 and registrationError canTryAgain is true, ' +
        'RegistrationErrorStep receives canTryAgain prop with value true', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({
            numAttempts: 1,
            registrationError: {
                canTryAgain: true,
                errorMsg: 'halp there is a errors!!'
            }
        });
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        expect(registrationErrorWrapper.first().props().canTryAgain).toEqual(true);
    });

    test('when numAttempts is 2 and registrationError canTryAgain is true, ' +
        'RegistrationErrorStep receives canTryAgain prop with value false', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({
            numAttempts: 2,
            registrationError: {
                canTryAgain: true,
                errorMsg: 'halp there is a errors!!'
            }
        });
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        expect(registrationErrorWrapper.first().props().canTryAgain).toEqual(false);
    });

    test('when numAttempts is 0 and registrationError canTryAgain is false, ' +
        'RegistrationErrorStep receives canTryAgain prop with value false', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({
            numAttempts: 0,
            registrationError: {
                canTryAgain: false,
                errorMsg: 'halp there is a errors!!'
            }
        });
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        expect(registrationErrorWrapper.first().props().canTryAgain).toEqual(false);
    });

    test('resetState resets entire state, does not leave any state keys out', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        Object.keys(joinFlowInstance.state).forEach(key => {
            joinFlowInstance.setState({[key]: 'Different than the initial value'});
        });
        joinFlowInstance.resetState();
        Object.keys(joinFlowInstance.state).forEach(key => {
            expect(joinFlowInstance.state[key]).not.toEqual('Different than the initial value');
        });
    });

    test('resetState makes each state field match initial state', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const stateSnapshot = {};
        Object.keys(joinFlowInstance.state).forEach(key => {
            stateSnapshot[key] = joinFlowInstance.state[key];
        });
        joinFlowInstance.resetState();
        Object.keys(joinFlowInstance.state).forEach(key => {
            expect(stateSnapshot[key]).toEqual(joinFlowInstance.state[key]);
        });
    });

    test('calling resetState results in state.formData which is not same reference as before', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.setState({
            formData: defaults({}, {username: 'abcdef'})
        });
        const formDataReference = joinFlowInstance.state.formData;
        joinFlowInstance.resetState();
        expect(formDataReference).not.toBe(joinFlowInstance.state.formData);
        expect(formDataReference).not.toEqual(joinFlowInstance.state.formData);
    });

    test('getBodyErrors returns object of errors', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const bodyErrors = joinFlowInstance.getBodyErrors(null, responseBodyMultipleErrs, {statusCode: 200});
        expect(bodyErrors).toEqual({
            username: ['This field is required.'],
            recaptcha: ['Incorrect, please try again.']
        });
    });

    test('getBodyErrors called with non-null err returns falsy', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const bodyErrors = joinFlowInstance.getBodyErrors({}, responseBodyMultipleErrs, {statusCode: 200});
        expect(bodyErrors).toBeFalsy();
    });

    test('getBodyErrors called with non-200 status code returns falsy', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const bodyErrors = joinFlowInstance.getBodyErrors({}, responseBodyMultipleErrs, {statusCode: 400});
        expect(bodyErrors).toBeFalsy();
    });

    test('getSingleError returns single error, when given response body with only one error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const bodyErrors = joinFlowInstance.getBodyErrors(null, responseBodySingleErr, {statusCode: 200});
        const singleError = joinFlowInstance.getSingleError(bodyErrors);
        expect(singleError).toEqual({
            fieldName: 'recaptcha',
            errorStr: 'Incorrect, please try again.'
        });
    });

    test('getSingleError returns falsy, when given response body with multiple errors', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const bodyErrors = joinFlowInstance.getBodyErrors(null, responseBodyMultipleErrs, {statusCode: 200});
        const singleError = joinFlowInstance.getSingleError(bodyErrors);
        expect(singleError).toBeFalsy();
    });

    test('getCustomErrMsg string when given response body with multiple errors', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const bodyErrors = joinFlowInstance.getBodyErrors(null, responseBodyMultipleErrs, {statusCode: 200});
        const customErrMsg = joinFlowInstance.getCustomErrMsg(bodyErrors);
        expect(customErrMsg).toEqual('registration.problemsAre "username: This field is required.; ' +
            'recaptcha: Incorrect, please try again."');
    });

    test('getCustomErrMsg string when given response body with single error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const bodyErrors = joinFlowInstance.getBodyErrors(null, responseBodySingleErr, {statusCode: 200});
        const customErrMsg = joinFlowInstance.getCustomErrMsg(bodyErrors);
        expect(customErrMsg).toEqual('registration.problemsAre "recaptcha: Incorrect, please try again."');
    });

    test('getRegistrationSuccess returns true when given response body with single error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const success = joinFlowInstance.getRegistrationSuccess(null, responseBodySuccess, {statusCode: 200});
        expect(success).toEqual(true);
    });

    test('getRegistrationSuccess returns false when given status code not 200', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const success = joinFlowInstance.getRegistrationSuccess(null, responseBodySuccess, {statusCode: 500});
        expect(success).toEqual(false);
    });

    test('getRegistrationSuccess returns false when given body with success field false', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const success = joinFlowInstance.getRegistrationSuccess(null, responseBodySingleErr, {statusCode: 200});
        expect(success).toEqual(false);
    });

    test('getRegistrationSuccess returns false when given non null err', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const success = joinFlowInstance.getRegistrationSuccess({}, responseBodySuccess, {statusCode: 200});
        expect(success).toEqual(false);
    });

    test('handleRegistrationResponse when passed body with success', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodySuccess, {statusCode: 200});
        expect(joinFlowInstance.state.registrationError).toEqual(null);
        expect(joinFlowInstance.state.step).toEqual(1);
        expect(joinFlowInstance.state.waiting).toBeFalsy();
    });

    test('handleRegistrationResponse when passed body with preset server error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodySingleErr, {statusCode: 200});
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: false,
            errorMsg: 'registration.errorCaptcha'
        });
    });

    test('handleRegistrationResponse when passed body with unfamiliar server error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodyMultipleErrs, {statusCode: 200});
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: false,
            errorMsg: 'registration.problemsAre "username: This field is required.; ' +
                'recaptcha: Incorrect, please try again."'
        });
    });

    test('handleRegistrationResponse when passed non null outgoing request error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse({}, responseBodyMultipleErrs, {statusCode: 200});
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: true
        });
    });

    test('handleRegistrationResponse when passed status 400', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse({}, responseBodyMultipleErrs, {statusCode: 400});
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: true
        });
    });

    test('handleRegistrationResponse when passed status 500', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodyMultipleErrs, {statusCode: 500});
        expect(joinFlowInstance.state.registrationError).toEqual({
            canTryAgain: false,
            errorMsg: null
        });
    });

    test('handleErrorNext', () => {
    });
});
