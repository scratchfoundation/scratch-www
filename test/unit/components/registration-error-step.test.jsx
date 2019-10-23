import React from 'react';
import {shallowWithIntl} from '../../helpers/intl-helpers.jsx';
import JoinFlowStep from '../../../src/components/join-flow/join-flow-step';
import RegistrationErrorStep from '../../../src/components/join-flow/registration-error-step';

describe('RegistrationErrorStep', () => {
    const onSubmit = jest.fn();

    const getRegistrationErrorStepWrapper = props => {
        const wrapper = shallowWithIntl(
            <RegistrationErrorStep
                {...props}
            />
        );
        return wrapper
            .dive(); // unwrap injectIntl()
    };

    test('registrationError has JoinFlowStep', () => {
        const props = {
            canTryAgain: true,
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        expect(joinFlowStepWrapper).toHaveLength(1);
    });

    test('when errorMsg provided, registrationError shows it', () => {
        const props = {
            canTryAgain: true,
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        const joinFlowStepInstance = joinFlowStepWrapper.dive();
        const errMsgElement = joinFlowStepInstance.find('.registration-error-msg');
        expect(errMsgElement).toHaveLength(1);
        expect(errMsgElement.text()).toEqual('halp there is a errors!!');
    });

    test('when no errorMsg provided, registrationError does not show it', () => {
        const props = {
            canTryAgain: true,
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        const joinFlowStepInstance = joinFlowStepWrapper.dive();
        const errMsgElement = joinFlowStepInstance.find('.registration-error-msg');
        expect(errMsgElement).toHaveLength(0);
    });

    test('when canTryAgain is true, show tryAgain message', () => {
        const props = {
            canTryAgain: true,
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper.props().nextButton).toBe('general.tryAgain');
    });

    test('when canTryAgain is false, show startOver message', () => {
        const props = {
            canTryAgain: false,
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper.props().nextButton).toBe('general.startOver');
    });

    test('when canTryAgain is missing, show startOver message', () => {
        const props = {
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper.props().nextButton).toBe('general.startOver');
    });

    test('when submitted, onSubmit is called', () => {
        const props = {
            canTryAgain: true,
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        joinFlowStepWrapper.props().onSubmit(new Event('event')); // eslint-disable-line no-undef
        expect(onSubmit).toHaveBeenCalled();
    });
});
