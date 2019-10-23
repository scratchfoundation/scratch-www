import React from 'react';
import {shallowWithIntl} from '../../helpers/intl-helpers.jsx';
import JoinFlowStep from '../../../src/components/join-flow/join-flow-step';
import RegistrationErrorStep from '../../../src/components/join-flow/registration-error-step';

describe('RegistrationErrorStep', () => {
    const onSubmit = jest.fn();

    const getRegistrationErrorStepWrapper = props => {
        const wrapper = shallowWithIntl(
            <RegistrationErrorStep
                errorMsg={'error message'}
                onSubmit={onSubmit}
                {...props}
            />
        );
        return wrapper
            .dive(); // unwrap injectIntl()
    };

    test('when canTryAgain is true, show tryAgain message', () => {
        const props = {canTryAgain: true};
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper.props().description).toBe('error message');
        expect(joinFlowStepWrapper.props().nextButton).toBe('general.tryAgain');
    });

    test('when canTryAgain is false, show startOver message', () => {
        const props = {canTryAgain: false};
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper(props).find(JoinFlowStep);
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper.props().description).toBe('error message');
        expect(joinFlowStepWrapper.props().nextButton).toBe('general.startOver');
    });

    test('when canTryAgain is missing, show startOver message', () => {
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper().find(JoinFlowStep);
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper.props().description).toBe('error message');
        expect(joinFlowStepWrapper.props().nextButton).toBe('general.startOver');
    });

    test('when submitted, onSubmit is called', () => {
        const joinFlowStepWrapper = getRegistrationErrorStepWrapper().find(JoinFlowStep);
        joinFlowStepWrapper.props().onSubmit(new Event('event')); // eslint-disable-line no-undef
        expect(onSubmit).toHaveBeenCalled();
    });
});
