import React, {act} from 'react';
import InfoButton from '../../../src/components/info-button/info-button';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';
import {fireEvent} from '@testing-library/react';

describe('InfoButton', () => {
    // mock window.addEventListener
    // for more on this technique, see discussion at https://github.com/airbnb/enzyme/issues/426#issuecomment-253515886
    const mockedAddEventListener = {};
    /* eslint-disable no-undef */
    window.addEventListener = jest.fn((event, cb) => {
        mockedAddEventListener[event] = cb;
    });
    /* eslint-enable no-undef */

    test('Info button defaults to not visible', () => {
        const {container} = renderWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        expect(container.querySelector('div.info-button-message')).toBeFalsy();
    });

    test('mouseOver on info button makes info message visible', async () => {
        const {container} = renderWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );

        await act(() => {
            fireEvent.mouseOver(container.querySelector(('div.info-button')));
        });

        expect(container.querySelector('div.info-button-message')).toBeTruthy();
    });

    test('clicking on info button makes info message visible', async () => {
        const {container, instance} = renderWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />,
            'InfoButton'
        );
        const buttonRef = instance().buttonRef;

        await act(() => {
            mockedAddEventListener.mousedown({target: buttonRef});
        });

        expect(container.querySelector('div.info-button')).toBeTruthy();
        expect(container.querySelector('div.info-button-message')).toBeTruthy();
    });

    test('clicking on info button, then mousing out makes info message still appear', async () => {
        const {container, instance} = renderWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />,
            'InfoButton'
        );
        const buttonRef = instance().buttonRef;
        await act(() => {
            mockedAddEventListener.mousedown({target: buttonRef});
        });

        expect(container.querySelector('div.info-button')).toBeTruthy();
        expect(container.querySelector('div.info-button-message')).toBeTruthy();

        // mouseLeave from info button
        await act(() => {
            fireEvent.mouseLeave(container.querySelector(('div.info-button')));
        });

        expect(container.querySelector('div.info-button-message')).toBeTruthy();
    });

    test('clicking on info button, then clicking on it again makes info message go away', async () => {
        const {container, instance} = renderWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />,
            'InfoButton'
        );
        const buttonRef = instance().buttonRef;

        // click on info button
        await act(() => {
            mockedAddEventListener.mousedown({target: buttonRef});
        });

        expect(container.querySelector('div.info-button')).toBeTruthy();
        expect(container.querySelector('div.info-button-message')).toBeTruthy();

        // click on info button again
        await act(() => {
            mockedAddEventListener.mousedown({target: buttonRef});
        });
        expect(container.querySelector('div.info-button-message')).toBeFalsy();
    });

    test('clicking on info button, then clicking somewhere else', async () => {
        const {container, instance} = renderWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />,
            'InfoButton'
        );
        const buttonRef = instance().buttonRef;

        // click on info button
        await act(() => {
            mockedAddEventListener.mousedown({target: buttonRef});
        });
        expect(container.querySelector('div.info-button')).toBeTruthy();
        expect(container.querySelector('div.info-button-message')).toBeTruthy();

        // click on some other target
        await act(() => {
            mockedAddEventListener.mousedown({target: null});
        });
        expect(container.querySelector('div.info-button-message')).toBeFalsy();
    });

    test('after message is visible, mouseLeave makes it vanish', async () => {
        const {container} = renderWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />,
            'InfoButton'
        );
        // mouseOver info button
        await act(() => {
            fireEvent.mouseOver(container.querySelector(('div.info-button')));
        });
        expect(container.querySelector('div.info-button-message')).toBeTruthy();

        // mouseLeave away from info button
        await act(() => {
            fireEvent.mouseLeave(container.querySelector(('div.info-button')));
        });
        expect(container.querySelector('div.info-button-message')).toBeFalsy();
    });
});
