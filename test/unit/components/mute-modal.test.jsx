import React from 'react';
import {shallowWithIntl} from '../../helpers/intl-helpers.jsx';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import MuteModal from '../../../src/components/modal/mute/modal';
import Modal from '../../../src/components/modal/base/modal';


describe('MuteModalTest', () => {
    const defaultMessages = {
        commentType: 'comment.type.disrespectful',
        muteStepHeader: 'comment.disrespectful.header',
        muteStepContent: ['comment.disrespectful.content1', 'comment.disrespectful.content2']
    };

    test('Mute Modal rendering', () => {
        const component = shallowWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />
        ).dive();
        expect(component.find('div.mute-modal-header').exists()).toEqual(true);

    });

    test('Mute Modal only shows next button on initial step', () => {
        const component = mountWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />
        );

        expect(component.find('div.mute-nav').exists()).toEqual(true);
        expect(component.find('button.next-button').exists()).toEqual(true);
        expect(component.find('button.next-button').getElements()[0].props.onClick)
            .toEqual(component.find('MuteModal').instance().handleNext);
        expect(component.find('button.close-button').exists()).toEqual(false);
        expect(component.find('button.back-button').exists()).toEqual(false);
    });

    test('Mute Modal shows extra showWarning step', () => {
        const component = mountWithIntl(
            <MuteModal
                showWarning
                muteModalMessages={defaultMessages}
            />
        );
        component.find('MuteModal').instance()
            .setState({step: 2});
        component.update();
        expect(component.find('MuteStep').prop('bottomImg')).toEqual('/svgs/commenting/warning.svg');
        expect(component.find('MuteStep').prop('totalSteps')).toEqual(3);
    });

    test('Mute Modal shows back & close button on last step', () => {
        const component = mountWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />
        );
        // Step 1 is the last step.
        component.find('MuteModal').instance()
            .setState({step: 1});
        component.update();

        expect(component.find('div.mute-nav').exists()).toEqual(true);
        expect(component.find('button.next-button').exists()).toEqual(false);
        expect(component.find('button.back-button').exists()).toEqual(true);
        expect(component.find('button.back-button').getElements()[0].props.onClick)
            .toEqual(component.find('MuteModal').instance().handlePrevious);
        expect(component.find('button.close-button').exists()).toEqual(true);
        expect(component.find('button.close-button').getElements()[0].props.onClick)
            .toEqual(component.find('MuteModal').instance().props.onRequestClose);
    });

    test('Mute modal sends correct props to Modal', () => {
        const closeFn = jest.fn();
        const component = shallowWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
                onRequestClose={closeFn}
            />
        ).dive();
        const modal = component.find(Modal);
        expect(modal).toHaveLength(1);
        expect(modal.props().showCloseButton).toBe(false);
        expect(modal.props().isOpen).toBe(true);
        expect(modal.props().className).toBe('modal-mute');
        expect(modal.props().onRequestClose).toBe(closeFn);
    });

    test('Mute modal handle next step', () => {
        const closeFn = jest.fn();
        const component = shallowWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
                onRequestClose={closeFn}
            />
        ).dive();
        expect(component.instance().state.step).toBe(0);
        component.instance().handleNext();
        expect(component.instance().state.step).toBe(1);
    });

    test('Mute modal handle previous step', () => {
        const component = shallowWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />
        ).dive();
        component.instance().setState({step: 1});

        component.instance().handlePrevious();
        expect(component.instance().state.step).toBe(0);
    });

    test('Mute modal handle previous step stops at 0', () => {
        const component = shallowWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />
        ).dive();
        component.instance().setState({step: 0});
        component.instance().handlePrevious();
        expect(component.instance().state.step).toBe(0);
    });
});
