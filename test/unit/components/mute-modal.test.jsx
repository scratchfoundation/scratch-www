import React from 'react';
import {mountWithIntl, shallowWithIntl} from '../../helpers/intl-helpers.jsx';
import MuteModal from '../../../src/components/modal/mute/modal';
import Modal from '../../../src/components/modal/base/modal';


describe('MuteModalTest', () => {
    const defaultMessages = {
        commentType: 'comment.type.general',
        muteStepHeader: 'comment.general.header',
        muteStepContent: ['comment.general.content1']
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
            .setState({step: 1});
        expect(component.find('button.next-button').exists()).toEqual(true);
        expect(component.find('button.next-button').getElements()[0].props.onClick)
            .toEqual(component.find('MuteModal').instance().handleNext);
        component.find('MuteModal').instance()
            .handleNext();
        expect(component.find('MuteModal').instance().state.step).toEqual(2);
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

    test('Mute modal asks for feedback if showFeedback', () => {
        const component = mountWithIntl(
            <MuteModal
                showFeedback
                muteModalMessages={defaultMessages}
            />
        );
        component.find('MuteModal').instance()
            .setState({step: 1});
        component.update();
        expect(component.find('p.feedback-prompt').exists()).toEqual(true);
    });

    test('Mute modal do not ask for feedback if not showFeedback', () => {
        const component = mountWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
            />
        );
        component.find('MuteModal').instance()
            .setState({step: 1});
        component.update();
        expect(component.find('p.feedback-prompt').exists()).toEqual(false);
    });

    test('Mute modal asks for feedback on extra showWarning step if showFeedback', () => {
        const component = mountWithIntl(
            <MuteModal
                showFeedback
                showWarning
                muteModalMessages={defaultMessages}
            />
        );
        component.find('MuteModal').instance()
            .setState({step: 1});
        component.update();
        expect(component.find('p.feedback-prompt').exists()).toEqual(false);
        component.find('MuteModal').instance()
            .setState({step: 2});
        component.update();
        expect(component.find('p.feedback-prompt').exists()).toEqual(true);
    });

    test('Mute modal does not for feedback on extra showWarning step if not showFeedback', () => {
        const component = mountWithIntl(
            <MuteModal
                showWarning
                muteModalMessages={defaultMessages}
            />
        );
        component.find('MuteModal').instance()
            .setState({step: 1});
        component.update();
        expect(component.find('p.feedback-prompt').exists()).toEqual(false);
        component.find('MuteModal').instance()
            .setState({step: 2});
        component.update();
        expect(component.find('p.feedback-prompt').exists()).toEqual(false);
    });

    test('Mute modal handle go to feedback', () => {
        const component = shallowWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
            />
        ).dive();
        component.instance().handleGoToFeedback();
        expect(component.instance().state.step).toBe(3);
    });

    test('Mute modal submit feedback gives thank you step', () => {
        const component = shallowWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
                user={{
                    id: 12345,
                    username: 'myusername',
                    token: 'mytoken',
                    thumbnailUrl: 'mythumbnail'
                }}
            />
        ).dive();
        component.instance().handleFeedbackSubmit('something');
        expect(component.instance().state.step).toBe(4);
    });
});
