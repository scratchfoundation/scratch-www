import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import JoinFlowStep from '../../../src/components/join-flow/join-flow-step';

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
        const component = mountWithIntl(
            <JoinFlowStep
                {...props}
            />
        );
        expect(component.find('div.join-flow-header-image').exists()).toEqual(true);
        expect(component.find({src: props.headerImgSrc}).exists()).toEqual(true);

        expect(component.find('.join-flow-inner-content').exists()).toEqual(true);
        expect(component.find('.join-flow-title').exists()).toEqual(true);

        expect(component.find('.join-flow-title').first()
            .prop('title')).toEqual(props.title);

        expect(component.find('div.join-flow-description').exists()).toEqual(true);
        expect(component.find('div.join-flow-description').text()).toEqual(props.description);


        expect(component.find('NextStepButton').prop('waiting')).toEqual(true);
        expect(component.find('NextStepButton').prop('content')).toEqual(props.nextButton);

        component.unmount();
    });

    test('components do not exist when props not present', () => {
        const component = mountWithIntl(
            <JoinFlowStep />
        );

        expect(component.find('div.join-flow-header-image').exists()).toEqual(false);
        expect(component.find('.join-flow-inner-content').exists()).toEqual(true);
        expect(component.find('.join-flow-title').exists()).toEqual(false);
        expect(component.find('div.join-flow-description').exists()).toEqual(false);
        expect(component.find('NextStepButton').prop('waiting')).toEqual(false);

        component.unmount();
    });

    test('clicking submit calls passed in function', () => {
        const props = {
            onSubmit: jest.fn()
        };
        const component = mountWithIntl(
            <JoinFlowStep
                {...props}
            />
        );
        component.find('button[type="submit"]').simulate('submit');
        expect(props.onSubmit).toHaveBeenCalled();
        component.unmount();
    });
});
