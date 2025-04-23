import React from 'react';
const defaults = require('lodash.defaultsdeep');
import configureStore from 'redux-mock-store';
import JoinFlow from '../../../src/components/join-flow/join-flow';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';
import {Provider} from 'react-redux';
import {act} from '@testing-library/react';

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
            refreshSessionWithRetry: jest.fn()
        }});
    });

    const getJoinFlowWrapper = props => {
        const wrapper = renderWithIntl(
            <Provider store={store}>
                <JoinFlow
                    {...props}
                />
            </Provider>,
            'JoinFlow'
        );
        return wrapper;
    };

    test('handleCaptchaError gives state with captcha message', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        act(() => {
            joinFlowInstance.setState({});
        });
        act(() => {
            joinFlowInstance.handleCaptchaError();
        });

        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: false,
            errorMsg: 'There was a problem with the CAPTCHA test.'
        });
    });

    test('sendAnalytics calls GTM with correct params', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        global.window.dataLayer = {push: jest.fn()};
        global.window.GA_ID = '1234';
        act(() => {
            joinFlowInstance.sendAnalytics('page-path');
        });
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'join_flow',
            joinFlowStep: 'page-path'
        });
    });

    test('handleAdvanceStep', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        act(() => {
            joinFlowInstance.setState({formData: {username: 'ScratchCat123'}, step: 2});
        });
        act(() => {
            joinFlowInstance.handleAdvanceStep({email: 'scratchcat123@scratch.mit.edu'});
        });
        expect(joinFlowInstance.state.formData.username).toBe('ScratchCat123');
        expect(joinFlowInstance.state.formData.email).toBe('scratchcat123@scratch.mit.edu');
        expect(joinFlowInstance.state.step).toBe(3);
    });

    test('when state.registrationError has error message, we show RegistrationErrorStep', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        act(() => {
            joinFlowWrapper.instance().setState({registrationError: 'halp there is a errors!!'});
        });
        joinFlowWrapper.rerenderWithIntl();
        const registrationErrorWrapper = joinFlowWrapper.findAllByComponentName('RegistrationErrorStep');
        const progressionWrapper = joinFlowWrapper.findAllByComponentName('Progression');
        expect(registrationErrorWrapper).toHaveLength(1);
        expect(progressionWrapper).toHaveLength(0);
    });

    test('when state.registrationError has null error message, we show Progression', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        act(() => {
            joinFlowWrapper.instance().setState({registrationError: null});
        });
        joinFlowWrapper.rerenderWithIntl();
        const registrationErrorWrapper = joinFlowWrapper.findAllByComponentName('RegistrationErrorStep');
        const progressionWrapper = joinFlowWrapper.findAllByComponentName('Progression');
        expect(registrationErrorWrapper).toHaveLength(0);
        expect(progressionWrapper).toHaveLength(1);
    });

    test('when state.registrationError has empty error message, we show Progression', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        act(() => {
            joinFlowWrapper.instance().setState({registrationError: ''});
        });
        joinFlowWrapper.rerenderWithIntl();
        const registrationErrorWrapper = joinFlowWrapper.findAllByComponentName('RegistrationErrorStep');
        const progressionWrapper = joinFlowWrapper.findAllByComponentName('Progression');
        expect(registrationErrorWrapper).toHaveLength(0);
        expect(progressionWrapper).toHaveLength(1);
    });

    test('when numAttempts is 0 and registrationError errorAllowsTryAgain is true, ' +
        'RegistrationErrorStep receives errorAllowsTryAgain prop with value true', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        act(() => {
            joinFlowWrapper.instance().setState({
                numAttempts: 0,
                registrationError: {
                    errorAllowsTryAgain: true,
                    errorMsg: 'halp there is a errors!!'
                }
            });
        });
        joinFlowWrapper.rerenderWithIntl();
        const registrationErrorWrapper = joinFlowWrapper.findAllByComponentName('RegistrationErrorStep');
        expect(registrationErrorWrapper[0].stateNode.props.canTryAgain).toEqual(true);
    });

    test('when numAttempts is 1 and registrationError errorAllowsTryAgain is true, ' +
        'RegistrationErrorStep receives errorAllowsTryAgain prop with value true', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        act(() => {
            joinFlowWrapper.instance().setState({
                numAttempts: 1,
                registrationError: {
                    errorAllowsTryAgain: true,
                    errorMsg: 'halp there is a errors!!'
                }
            });
        });
        joinFlowWrapper.rerenderWithIntl();
        const registrationErrorWrapper = joinFlowWrapper.findAllByComponentName('RegistrationErrorStep');
        expect(registrationErrorWrapper[0].stateNode.props.canTryAgain).toEqual(true);
    });

    test('when numAttempts is 2 and registrationError errorAllowsTryAgain is true, ' +
        'RegistrationErrorStep receives errorAllowsTryAgain prop with value false', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        act(() => {
            joinFlowWrapper.instance().setState({
                numAttempts: 2,
                registrationError: {
                    errorAllowsTryAgain: true,
                    errorMsg: 'halp there is a errors!!'
                }
            });
        });
        joinFlowWrapper.rerenderWithIntl();
        const registrationErrorWrapper = joinFlowWrapper.findAllByComponentName('RegistrationErrorStep');
        expect(registrationErrorWrapper[0].memoizedProps.canTryAgain).toEqual(false);
    });

    test('when numAttempts is 0 and registrationError errorAllowsTryAgain is false, ' +
        'RegistrationErrorStep receives errorAllowsTryAgain prop with value false', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        act(() => {
            joinFlowWrapper.instance().setState({
                numAttempts: 0,
                registrationError: {
                    errorAllowsTryAgain: false,
                    errorMsg: 'halp there is a errors!!'
                }
            });
        });
        joinFlowWrapper.rerenderWithIntl();
        const registrationErrorWrapper = joinFlowWrapper.findAllByComponentName('RegistrationErrorStep');
        expect(registrationErrorWrapper[0].stateNode.props.canTryAgain).toEqual(false);
    });

    test('resetState resets entire state, does not leave any state keys out', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        act(() => {
            Object.keys(joinFlowInstance.state).forEach(key => {
                joinFlowInstance.setState({[key]: 'Different than the initial value'});
            });
            joinFlowInstance.resetState();
        });
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
        act(() => {
            joinFlowInstance.resetState();
        });
        Object.keys(joinFlowInstance.state).forEach(key => {
            expect(stateSnapshot[key]).toEqual(joinFlowInstance.state[key]);
        });
    });

    test('calling resetState results in state.formData which is not same reference as before', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        act(() => {
            joinFlowInstance.setState({
                formData: defaults({}, {username: 'abcdef'})
            });
        });
        const formDataReference = joinFlowInstance.state.formData;
        act(() => {
            joinFlowInstance.resetState();
        });
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
        expect(customErrMsg).toEqual('The problems are:: "username: This field is required.; ' +
            'recaptcha: Incorrect, please try again."');
    });

    test('getCustomErrMsg string when given response body with single error', () => {
        const joinFlowInstance = getJoinFlowWrapper().instance();
        const errorsFromResponse =
            joinFlowInstance.getErrorsFromResponse(null, responseBodySingleErr, {statusCode: 200});
        const customErrMsg = joinFlowInstance.getCustomErrMsg(errorsFromResponse);
        expect(customErrMsg).toEqual('The problems are:: "recaptcha: Incorrect, please try again."');
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

    test('handleRegistrationResponse calls refreshSessionWithRetry() when passed body with success', done => {
        const props = {
            refreshSessionWithRetry: () => (new Promise(() => { // eslint-disable-line no-undef
                done(); // ensures that joinFlowInstance.props.refreshSessionWithRetry() was called
            }))
        };
        const joinFlowInstance = getJoinFlowWrapper(props).instance();
        joinFlowInstance.handleRegistrationResponse(null, responseBodySuccess, {statusCode: 200});
    });

    test('handleRegistrationResponse advances to next step when passed body with success', async () => {
        const props = {
            refreshSessionWithRetry: () => (new Promise(resolve => { // eslint-disable-line no-undef
                resolve();
            }))
        };
        const joinFlowWrapper = getJoinFlowWrapper(props);
        const joinFlowInstance = joinFlowWrapper.instance();
        await act(() => {
            joinFlowInstance.handleRegistrationResponse(null, responseBodySuccess, {statusCode: 200});
        });
        joinFlowWrapper.rerenderWithIntl();
        process.nextTick(
            () => {
                expect(joinFlowInstance.state.registrationError).toEqual(null);
                expect(joinFlowInstance.state.step).toEqual(1);
                expect(joinFlowInstance.state.waiting).toBeFalsy();
            }
        );
    });

    test('handleRegistrationResponse when passed body with preset server error', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        const joinFlowInstance = joinFlowWrapper.instance();
        act(() => {
            joinFlowInstance.handleRegistrationResponse(null, responseBodySingleErr, {statusCode: 200});
        });
        joinFlowWrapper.rerenderWithIntl();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: false,
            errorMsg: 'There was a problem with the CAPTCHA test.'
        });
    });

    test('handleRegistrationResponse with failure response, with error fields missing', () => {
        const props = {
            refreshSessionWithRetry: jest.fn()
        };
        const joinFlowWrapper = getJoinFlowWrapper(props);
        const joinFlowInstance = joinFlowWrapper.instance();
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
        act(() => {
            joinFlowInstance.handleRegistrationResponse(responseErr, responseBody, responseObj);
        });
        joinFlowWrapper.rerenderWithIntl();
        expect(joinFlowInstance.props.refreshSessionWithRetry).not.toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: false,
            errorMsg: null
        });
    });

    test('handleRegistrationResponse when passed body with unfamiliar server error', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        const joinFlowInstance = joinFlowWrapper.instance();
        act(() => {
            joinFlowInstance.handleRegistrationResponse(null, responseBodyMultipleErrs, {statusCode: 200});
        });
        joinFlowWrapper.rerenderWithIntl();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: false,
            errorMsg: 'The problems are:: "username: This field is required.; ' +
                'recaptcha: Incorrect, please try again."'
        });
    });

    test('handleRegistrationResponse with failure response, with no text explanation', () => {
        const props = {
            refreshSessionWithRetry: jest.fn()
        };
        const joinFlowWrapper = getJoinFlowWrapper(props);
        const joinFlowInstance = joinFlowWrapper.instance();
        const responseErr = null;
        const responseBody = [
            {
                success: false
            }
        ];
        const responseObj = {
            statusCode: 200
        };
        act(() => {
            joinFlowInstance.handleRegistrationResponse(responseErr, responseBody, responseObj);
        });
        joinFlowWrapper.rerenderWithIntl();
        expect(joinFlowInstance.props.refreshSessionWithRetry).not.toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: false,
            errorMsg: null
        });
    });

    test('handleRegistrationResponse when passed non null outgoing request error', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        const joinFlowInstance = joinFlowWrapper.instance();
        act(() => {
            joinFlowInstance.handleRegistrationResponse({}, responseBodyMultipleErrs, {statusCode: 200});
        });
        joinFlowWrapper.rerenderWithIntl();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: true
        });
    });

    test('handleRegistrationResponse when passed status 400', () => {
        const props = {
            refreshSessionWithRetry: jest.fn()
        };
        const joinFlowWrapper = getJoinFlowWrapper(props);
        const joinFlowInstance = joinFlowWrapper.instance();
        act(() => {
            joinFlowInstance.handleRegistrationResponse({}, responseBodyMultipleErrs, {statusCode: 400});
        });
        joinFlowWrapper.rerenderWithIntl();
        expect(joinFlowInstance.props.refreshSessionWithRetry).not.toHaveBeenCalled();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: true
        });
    });

    test('handleRegistrationResponse when passed status 500', () => {
        const joinFlowWrapper = getJoinFlowWrapper();
        const joinFlowInstance = joinFlowWrapper.instance();
        act(() => {
            joinFlowInstance.handleRegistrationResponse(null, responseBodyMultipleErrs, {statusCode: 500});
        });
        joinFlowWrapper.rerenderWithIntl();
        expect(joinFlowInstance.state.registrationError).toEqual({
            errorAllowsTryAgain: true
        });
    });
});
