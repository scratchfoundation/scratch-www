import React from 'react';
import RegistrationErrorStep from '../../../src/components/join-flow/registration-error-step';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper';

describe('RegistrationErrorStep', () => {
    const onSubmit = jest.fn();

    const getRegistrationErrorStepWrapper = props => {
        const wrapper = renderWithIntl(
            <RegistrationErrorStep
                sendAnalytics={jest.fn()}
                {...props}
            />,
            'RegistrationErrorStep'
        );
        return wrapper;
    };

    test('registrationError has JoinFlowStep', () => {
        const props = {
            canTryAgain: true,
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper =
      getRegistrationErrorStepWrapper(props).findAllByComponentName(
          'JoinFlowStep'
      );
        expect(joinFlowStepWrapper).toHaveLength(1);
    });

    test('when errorMsg provided, registrationError shows it', () => {
        const props = {
            canTryAgain: true,
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const errMsgElement = getRegistrationErrorStepWrapper(
            props
        ).container.querySelector('.registration-error-msg');
        expect(errMsgElement).toBeTruthy();
        expect(errMsgElement.textContent).toEqual('halp there is a errors!!');
    });

    test('when errorMsg is null, registrationError does not show it', () => {
        const props = {
            canTryAgain: true,
            errorMsg: null,
            onSubmit: onSubmit
        };
        const errMsgElement = getRegistrationErrorStepWrapper(
            props
        ).container.querySelector('.registration-error-msg');
        expect(errMsgElement).toBeFalsy();
    });

    test('when no errorMsg provided, registrationError does not show it', () => {
        const props = {
            canTryAgain: true,
            onSubmit: onSubmit
        };
        const errMsgElement = getRegistrationErrorStepWrapper(
            props
        ).container.querySelector('.registration-error-msg');
        expect(errMsgElement).toBeFalsy();
    });

    test('logs to analytics', () => {
        const analyticsFn = jest.fn();
        renderWithIntl(<RegistrationErrorStep sendAnalytics={analyticsFn} />);
        expect(analyticsFn).toHaveBeenCalledWith('join-error');
    });
    test('when canTryAgain is true, show tryAgain message', () => {
        const props = {
            canTryAgain: true,
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper =
      getRegistrationErrorStepWrapper(props).findAllByComponentName(
          'JoinFlowStep'
      );
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper[0].memoizedProps.nextButton).toBe('Try again');
    });

    test('when canTryAgain is false, show startOver message', () => {
        const props = {
            canTryAgain: false,
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper =
      getRegistrationErrorStepWrapper(props).findAllByComponentName(
          'JoinFlowStep'
      );
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper[0].memoizedProps.nextButton).toBe('Start over');
    });

    test('when canTryAgain is missing, show startOver message', () => {
        const props = {
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper =
      getRegistrationErrorStepWrapper(props).findAllByComponentName(
          'JoinFlowStep'
      );
        expect(joinFlowStepWrapper).toHaveLength(1);
        expect(joinFlowStepWrapper[0].memoizedProps.nextButton).toBe('Start over');
    });

    test('when submitted, onSubmit is called', () => {
        const props = {
            canTryAgain: true,
            errorMsg: 'halp there is a errors!!',
            onSubmit: onSubmit
        };
        const joinFlowStepWrapper =
      getRegistrationErrorStepWrapper(props).findByComponentName(
          'JoinFlowStep'
      );
        joinFlowStepWrapper.memoizedProps.onSubmit(new Event('event')); // eslint-disable-line no-undef
        expect(onSubmit).toHaveBeenCalled();
    });
});
