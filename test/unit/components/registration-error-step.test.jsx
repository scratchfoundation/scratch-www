import React from 'react';
import {shallowWithIntl} from '../../helpers/intl-helpers.jsx';
import JoinFlowStep from '../../../src/components/join-flow/join-flow-step';
import RegistrationErrorStep from '../../../src/components/join-flow/registration-error-step';

describe('RegistrationErrorStep', () => {
    const onTryAgain = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = shallowWithIntl(
            <RegistrationErrorStep
                errorMsg={'error message'}
                onTryAgain={onTryAgain}
            />
        );
    });

    test('shows JoinFlowStep with props', () => {
        // Dive to get past the anonymous component.
        const joinFlowStepWrapper = wrapper.dive().find(JoinFlowStep);
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper.props().description).toBe('error message');
        expect(joinFlowStepWrapper.props().nextButton).toBe('general.tryAgain');
    });

    test('when submitted, onTryAgain is called', () => {
        // Dive to get past the anonymous component.
        const joinFlowStepWrapper = wrapper.dive().find(JoinFlowStep);
        joinFlowStepWrapper.props().onSubmit(new Event('event')); // eslint-disable-line no-undef
        expect(onTryAgain).toHaveBeenCalled();
    });
});
