import React from 'react';
import JoinFlowStep from '../../../src/components/join-flow/join-flow-step';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';
import {fireEvent} from '@testing-library/react';

describe('JoinFlowStep', () => {

    test('components exist when props present', () => {
        const props = {
            children: null,
            className: 'join-flow-step-class',
            description: 'description text',
            headerImgSrc: '/image.png',
            onSubmit: jest.fn(),
            nextButton: 'some stuff',
            title: 'join flow step title',
            waiting: true
        };
        const {container, unmount, findByComponentName} = renderWithIntl(
            <JoinFlowStep
                {...props}
            />,
            'JoinFlowStep'
        );
        const img = container.querySelector('img.join-flow-header-image');
        expect(img).toBeTruthy();
        expect(img.src).toContain(props.headerImgSrc);

        expect(container.querySelector('.join-flow-inner-content')).toBeTruthy();

        const title = container.querySelector('.join-flow-title');
        expect(title).toBeTruthy();
        expect(title.textContent).toEqual(props.title);

        expect(container.querySelector('div.join-flow-description')).toBeTruthy();
        expect(container.querySelector('div.join-flow-description').textContent).toEqual(props.description);

        const nextStepButton = findByComponentName('NextStepButton');
        expect(nextStepButton).toBeTruthy();
        expect(nextStepButton.memoizedProps.waiting).toEqual(true);
        expect(nextStepButton.memoizedProps.content).toEqual(props.nextButton);

        unmount();
    });

    test('components do not exist when props not present', () => {
        const {container, unmount, findByComponentName} = renderWithIntl(
            <JoinFlowStep />,
            'JoinFlowStep'
        );

        expect(container.querySelector('img.join-flow-header-image')).toBeFalsy();
        expect(container.querySelector('.join-flow-inner-content')).toBeTruthy();
        expect(container.querySelector('.join-flow-title')).toBeFalsy();
        expect(container.querySelector('div.join-flow-description')).toBeFalsy();
        expect(findByComponentName('NextStepButton').memoizedProps.waiting).toEqual(false);

        unmount();
    });

    test('clicking submit calls passed in function', () => {
        const props = {
            onSubmit: jest.fn()
        };
        const {container, unmount} = renderWithIntl(
            <JoinFlowStep
                {...props}
            />
        );
        fireEvent.submit(container.querySelector('button[type="submit"]'));
        expect(props.onSubmit).toHaveBeenCalled();
        unmount();
    });
});
