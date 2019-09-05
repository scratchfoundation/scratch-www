import React from 'react';
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
import configureStore from 'redux-mock-store';
import JoinFlow from '../../../src/components/join-flow/join-flow';

describe('JoinFlow', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore({sessionActions: {
            refreshSession: jest.fn()
        }});
    });

    const getJoinFlowInstance = props => {
        const wrapper = shallowWithIntl(
            <JoinFlow
                {...props}
            />
            , {context: {store}});
        return wrapper
            .dive() // unwrap redux connect(injectIntl(JoinFlow))
            .dive() // unwrap injectIntl(JoinFlow)
            .instance(); // JoinFlow
    }

    test('handleRegistrationResponse with successful response', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowInstance(props);
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
        const joinFlowInstance = getJoinFlowInstance(props);
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
        expect(joinFlowInstance.state.registrationError).toBe('username: This field is required.');
    });

    test('handleRegistrationResponse with failure response, with error fields missing', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowInstance(props);
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
        expect(joinFlowInstance.state.registrationError).toBe('This field is required.');
    });

    test('handleRegistrationResponse with failure response, with no text explanation', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowInstance(props);
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
        expect(joinFlowInstance.state.registrationError).toBe('registration.generalError (200)');
    });

    test('handleRegistrationResponse with failure status code', () => {
        const props = {
            refreshSession: jest.fn()
        };
        const joinFlowInstance = getJoinFlowInstance(props);
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
        expect(joinFlowInstance.state.registrationError).toBe('registration.generalError (400)');
    });

    test('handleAdvanceStep', () => {
        const joinFlowInstance = getJoinFlowInstance();
        joinFlowInstance.setState({formData: {username: 'ScratchCat123'}, step: 2});
        joinFlowInstance.handleAdvanceStep({email: 'scratchcat123@scratch.mit.edu'});
        expect(joinFlowInstance.state.formData.username).toBe('ScratchCat123');
        expect(joinFlowInstance.state.formData.email).toBe('scratchcat123@scratch.mit.edu');
        expect(joinFlowInstance.state.step).toBe(3);
    });
});
