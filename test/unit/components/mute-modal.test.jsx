import React, {act} from 'react';
import MuteModal from '../../../src/components/modal/mute/modal';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';
import {fireEvent} from '@testing-library/react';


describe('MuteModalTest', () => {
    const defaultMessages = {
        commentType: 'comment.type.general',
        muteStepHeader: 'comment.general.header',
        muteStepContent: ['comment.general.content1']
    };


    test('Mute Modal rendering', () => {
        renderWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />
        );
        expect(global.document.querySelector('div.mute-modal-header')).toBeTruthy();

    });

    test('Mute Modal only shows next button on initial step', () => {
        const {findAllByComponentName, instance} = renderWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />,
            'MuteModal'
        );

        expect(global.document.querySelector('div.mute-nav')).toBeTruthy();
        expect(global.document.querySelector('button.next-button')).toBeTruthy();
        expect(findAllByComponentName('Button')[0].memoizedProps.onClick)
            .toEqual(instance().handleNext);
        expect(global.document.querySelector('button.close-button')).toBeFalsy();
        expect(global.document.querySelector('button.back-button')).toBeFalsy();
    });

    test('Mute Modal shows extra showWarning step', () => {
        const {findAllByComponentName, instance} = renderWithIntl(
            <MuteModal
                showWarning
                muteModalMessages={defaultMessages}
            />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        const nextButton = findAllByComponentName('Button')[0];
        act(() => {
            muteModalInstance.setState({step: 1});
        });
        expect(global.document.querySelector('button.next-button')).toBeTruthy();
        expect(nextButton.memoizedProps.onClick)
            .toEqual(muteModalInstance.handleNext);
        fireEvent.click(global.document.querySelector('button.next-button'));
        expect(muteModalInstance.state.step).toEqual(2);
    });

    test('Mute Modal shows back & close button on last step', () => {
        const {findAllByComponentName, instance} = renderWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.setState({step: 1});
        });
        const buttons = findAllByComponentName('Button');
        const closeButton = buttons[0];
        const backButton = buttons[1];

        expect(global.document.querySelector('div.mute-nav')).toBeTruthy();
        expect(global.document.querySelector('button.next-button')).toBeFalsy();
        expect(global.document.querySelector('button.back-button')).toBeTruthy();
        expect(backButton.memoizedProps.onClick)
            .toEqual(muteModalInstance.handlePrevious);
        expect(global.document.querySelector('button.close-button')).toBeTruthy();
        expect(closeButton.memoizedProps.onClick)
            .toEqual(muteModalInstance.onRequestClose);
    });

    test('Mute modal sends correct props to Modal', () => {
        const closeFn = jest.fn();
        const {findByComponentName} = renderWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
                onRequestClose={closeFn}
            />,
            'MuteModal'
        );
        const modal = findByComponentName('Modal');
        expect(modal.props.showCloseButton).toBe(false);
        expect(modal.props.isOpen).toBe(true);
        expect(modal.props.className).toBe('modal-mute');
        expect(modal.props.onRequestClose).toBe(closeFn);
    });

    test('Mute modal handle next step', () => {
        const closeFn = jest.fn();
        const {instance} = renderWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
                onRequestClose={closeFn}
            />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        expect(muteModalInstance.state.step).toBe(0);
        fireEvent.click(global.document.querySelector('button.next-button'));
        expect(muteModalInstance.state.step).toBe(1);
    });

    test('Mute modal handle previous step', () => {
        const {instance} = renderWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.setState({step: 1});
        });

        fireEvent.click(global.document.querySelector('button.back-button'));
        expect(muteModalInstance.state.step).toBe(0);
    });

    test('Mute modal handle previous step stops at 0', () => {
        const {instance} = renderWithIntl(
            <MuteModal muteModalMessages={defaultMessages} />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.setState({step: 0});
        });
        muteModalInstance.handlePrevious();
        expect(muteModalInstance.state.step).toBe(0);
    });

    test('Mute modal asks for feedback if showFeedback', () => {
        const {instance} = renderWithIntl(
            <MuteModal
                showFeedback
                muteModalMessages={defaultMessages}
            />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.setState({step: 1});
        });
        expect(global.document.querySelector('p.feedback-prompt')).toBeTruthy();
    });

    test('Mute modal do not ask for feedback if not showFeedback', () => {
        const {instance} = renderWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
            />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.setState({step: 1});
        });
        expect(global.document.querySelector('p.feedback-prompt')).toBeFalsy();
    });

    test('Mute modal asks for feedback on extra showWarning step if showFeedback', () => {
        const {instance} = renderWithIntl(
            <MuteModal
                showFeedback
                showWarning
                muteModalMessages={defaultMessages}
            />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.setState({step: 1});
        });
        expect(global.document.querySelector('p.feedback-prompt')).toBeFalsy();
        act(() => {
            muteModalInstance.setState({step: 2});
        });
        expect(global.document.querySelector('p.feedback-prompt')).toBeTruthy();
    });

    test('Mute modal does not for feedback on extra showWarning step if not showFeedback', () => {
        const {instance} = renderWithIntl(
            <MuteModal
                showWarning
                muteModalMessages={defaultMessages}
            />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.setState({step: 1});
        });
        expect(global.document.querySelector('p.feedback-prompt')).toBeFalsy();
        act(() => {
            muteModalInstance.setState({step: 2});
        });
        expect(global.document.querySelector('p.feedback-prompt')).toBeFalsy();
    });

    test('Mute modal handle go to feedback', () => {
        const {instance} = renderWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
            />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.handleGoToFeedback();
        });
        expect(muteModalInstance.state.step).toBe(3);
    });

    test('Mute modal submit feedback gives thank you step', () => {
        const {instance} = renderWithIntl(
            <MuteModal
                muteModalMessages={defaultMessages}
                user={{
                    id: 12345,
                    username: 'myusername',
                    token: 'mytoken',
                    thumbnailUrl: 'mythumbnail'
                }}
            />,
            'MuteModal'
        );
        const muteModalInstance = instance();
        act(() => {
            muteModalInstance.handleFeedbackSubmit('something');
        });
        expect(muteModalInstance.state.step).toBe(4);
    });
});
