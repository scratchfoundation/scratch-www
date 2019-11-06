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

    test('handleCaptchaError gives state with captcha message', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.setState({});
        joinFlowInstance.handleCaptchaError();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: false,
            errorMsg: 'registration.errorCaptcha'
        });
    });

    test('sendAnalytics calls google analytics with correct params', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        global.window.ga = jest.fn();
        global.window.GA_ID = '1234';
        joinFlowInstance.sendAnalytics('page-path');
        const obj = {
            hitType: 'pageview',
            page: 'page-path',
            tid: '1234'
        };
        expect(global.window.ga).toHaveBeenCalledWith('send', obj);
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

    test('when numAttempts is 0 and registrationError errorAllowsTryAgain is true, ' +
        'RegistrationErrorStep receives errorAllowsTryAgain prop with value true', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({
            numAttempts: 0,
            registrationError: {
                errorAllowsTryAgain: true,
                errorMsg: 'halp there is a errors!!'
            }
        });
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        expect(registrationErrorWrapper.first().props().canTryAgain).toEqual(true);
    });

    test('when numAttempts is 1 and registrationError errorAllowsTryAgain is true, ' +
        'RegistrationErrorStep receives errorAllowsTryAgain prop with value true', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({
            numAttempts: 1,
            registrationError: {
                errorAllowsTryAgain: true,
                errorMsg: 'halp there is a errors!!'
            }
        });
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        expect(registrationErrorWrapper.first().props().canTryAgain).toEqual(true);
    });

    test('when numAttempts is 2 and registrationError errorAllowsTryAgain is true, ' +
        'RegistrationErrorStep receives errorAllowsTryAgain prop with value false', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({
            numAttempts: 2,
            registrationError: {
                errorAllowsTryAgain: true,
                errorMsg: 'halp there is a errors!!'
            }
        });
        const registrationErrorWrapper = joinFlowWrapper.find(RegistrationErrorStep);
        expect(registrationErrorWrapper.first().props().canTryAgain).toEqual(false);
    });

    test('when numAttempts is 0 and registrationError errorAllowsTryAgain is false, ' +
        'RegistrationErrorStep receives errorAllowsTryAgain prop with value false', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        joinFlowWrapper.instance().setState({
            numAttempts: 0,
            registrationError: {
                errorAllowsTryAgain: false,
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

    test('getErrorsFromResponse returns object of errors', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const errorsFromResponse =
            joinFlowInstance.getErrorsFromResponse(null, responseBodyMultipleErrs, {statusCode: 200});
        expect(errorsFromResponse).toEqual([
            {
                fieldName: 'username',
                errorStr: 'This field is required.'
            }, {
                fieldName: 'recaptcha',
                errorStr: 'Incorrect, please try again.'
            }
        ]);
    });

    test('getErrorsFromResponse called with non-null err returns empty array', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const errorsFromResponse =
            joinFlowInstance.getErrorsFromResponse({}, responseBodyMultipleErrs, {statusCode: 200});
        expect(errorsFromResponse).toEqual([]);
    });

    test('getErrorsFromResponse called with non-200 status code returns empty array', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const errorsFromResponse =
            joinFlowInstance.getErrorsFromResponse({}, responseBodyMultipleErrs, {statusCode: 400});
        expect(errorsFromResponse).toEqual([]);
    });

    test('getErrorsFromResponse gets single error, when given response body with only one error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const errorsFromResponse =
            joinFlowInstance.getErrorsFromResponse(null, responseBodySingleErr, {statusCode: 200});
        expect(errorsFromResponse.length).toEqual(1);
    });

    test('getCustomErrMsg string when given response body with multiple errors', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const errorsFromResponse =
            joinFlowInstance.getErrorsFromResponse(null, responseBodyMultipleErrs, {statusCode: 200});
        const customErrMsg = joinFlowInstance.getCustomErrMsg(errorsFromResponse);
        expect(customErrMsg).toEqual('registration.problemsAre: "username: This field is required.; ' +
            'recaptcha: Incorrect, please try again."');
    });

    test('getCustomErrMsg string when given response body with single error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const errorsFromResponse =
            joinFlowInstance.getErrorsFromResponse(null, responseBodySingleErr, {statusCode: 200});
        const customErrMsg = joinFlowInstance.getCustomErrMsg(errorsFromResponse);
        expect(customErrMsg).toEqual('registration.problemsAre: "recaptcha: Incorrect, please try again."');
    });

    test('registrationIsSuccessful returns true when given response body with single error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const success = joinFlowInstance.registrationIsSuccessful(null, responseBodySuccess, {statusCode: 200});
        expect(success).toEqual(true);
    });

    test('registrationIsSuccessful returns false when given status code not 200', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const success = joinFlowInstance.registrationIsSuccessful(null, responseBodySuccess, {statusCode: 500});
        expect(success).toEqual(false);
    });

    test('registrationIsSuccessful returns false when given body with success field false', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const success = joinFlowInstance.registrationIsSuccessful(null, responseBodySingleErr, {statusCode: 200});
        expect(success).toEqual(false);
    });

    test('registrationIsSuccessful returns false when given non null err', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const success = joinFlowInstance.registrationIsSuccessful({}, responseBodySuccess, {statusCode: 200});
        expect(success).toEqual(false);
    });

    test('handleRegistrationResponse when passed body with success', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodySuccess, {statusCode: 200});
        expect(joinFlowInstance.state.registrationError).toEqual(null);
        expect(joinFlowInstance.props.refreshSession).toHaveBeenCalled();
        expect(joinFlowInstance.state.step).toEqual(1);
        expect(joinFlowInstance.state.waiting).toBeFalsy();
    });

    test('handleRegistrationResponse when passed body with preset server error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodySingleErr, {statusCode: 200});
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: false,
            errorMsg: 'registration.errorCaptcha'
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
            errorAllowsTryAgain: false,
            errorMsg: null
        });
    });

    test('handleRegistrationResponse when passed body with unfamiliar server error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodyMultipleErrs, {statusCode: 200});
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: false,
            errorMsg: 'registration.problemsAre: "username: This field is required.; ' +
                'recaptcha: Incorrect, please try again."'
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
            errorAllowsTryAgain: false,
            errorMsg: null
        });
    });

    test('handleRegistrationResponse when passed non null outgoing request error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse({}, responseBodyMultipleErrs, {statusCode: 200});
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: true
        });
    });

    test('handleRegistrationResponse when passed status 400', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        joinFlowInstance.handleRegistrationResponse({}, responseBodyMultipleErrs, {statusCode: 400});
        expect(joinFlowInstance.props.refreshSession).not.toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: true
        });
    });

    test('handleRegistrationResponse when passed status 500', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodyMultipleErrs, {statusCode: 500});
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: true
        });
    });
});
