import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import InfoButton from '../../../src/components/info-button/info-button';

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
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        expect(component.find('div.info-button-message').exists()).toEqual(false);
    });

    test('mouseOver on info button makes info message visible', done => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );

        // mouseOver info button
        component.find('div.info-button').simulate('mouseOver');
        setTimeout(function () { // necessary because mouseover uses debounce
            // crucial: if we don't call update(), then find() below looks through an OLD
            // version of the DOM! see https://github.com/airbnb/enzyme/issues/1233#issuecomment-358915200
            component.update();
            expect(component.find('div.info-button-message').exists()).toEqual(true);
            done();
        }, 500);
    });

    test('clicking on info button makes info message visible', () => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        const buttonRef = component.instance().buttonRef;

        // click on info button
        mockedAddEventListener.mousedown({target: buttonRef});
        component.update();
        expect(component.find('div.info-button').exists()).toEqual(true);
        expect(component.find('div.info-button-message').exists()).toEqual(true);
    });

    test('clicking on info button, then mousing out makes info message still appear', done => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        const buttonRef = component.instance().buttonRef;

        // click on info button
        mockedAddEventListener.mousedown({target: buttonRef});
        component.update();
        expect(component.find('div.info-button').exists()).toEqual(true);
        expect(component.find('div.info-button-message').exists()).toEqual(true);

        // mouseLeave from info button
        component.find('div.info-button').simulate('mouseLeave');
        setTimeout(function () { // necessary because mouseover uses debounce
            component.update();
            expect(component.find('div.info-button-message').exists()).toEqual(true);
            done();
        }, 500);
    });

    test('clicking on info button, then clicking on it again makes info message go away', () => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        const buttonRef = component.instance().buttonRef;

        // click on info button
        mockedAddEventListener.mousedown({target: buttonRef});
        component.update();
        expect(component.find('div.info-button').exists()).toEqual(true);
        expect(component.find('div.info-button-message').exists()).toEqual(true);

        // click on info button again
        mockedAddEventListener.mousedown({target: buttonRef});
        component.update();
        expect(component.find('div.info-button-message').exists()).toEqual(false);
    });

    test('clicking on info button, then clicking somewhere else', () => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        const buttonRef = component.instance().buttonRef;

        // click on info button
        mockedAddEventListener.mousedown({target: buttonRef});
        component.update();
        expect(component.find('div.info-button').exists()).toEqual(true);
        expect(component.find('div.info-button-message').exists()).toEqual(true);

        // click on some other target
        mockedAddEventListener.mousedown({target: null});
        component.update();
        expect(component.find('div.info-button-message').exists()).toEqual(false);
    });

    test('after message is visible, mouseLeave makes it vanish', () => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );

        // mouseOver info button
        component.find('div.info-button').simulate('mouseOver');
        component.update();
        expect(component.find('div.info-button-message').exists()).toEqual(true);

        // mouseLeave away from info button
        component.find('div.info-button').simulate('mouseLeave');
        component.update();
        expect(component.find('div.info-button-message').exists()).toEqual(false);
    });
});
