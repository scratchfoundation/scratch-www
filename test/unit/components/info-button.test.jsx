import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import InfoButton from '../../../src/components/info-button/info-button';

describe('InfoButton', () => {
    test('Info button defaults to not visible', () => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        expect(component.find('div.info-button-message').exists()).toEqual(false);
    });
    test('clicking on info button makes info message visible', () => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        component.find('div.info-button').simulate('click');
        expect(component.find('div.info-button-message').exists()).toEqual(true);
    });
    test('after message is visible, mouseOut makes it vanish', () => {
        const component = mountWithIntl(
            <InfoButton
                message="Here is some info about something!"
            />
        );
        component.find('div.info-button').simulate('click');
        expect(component.find('div.info-button-message').exists()).toEqual(true);
        component.find('div.info-button').simulate('mouseOut');
        expect(component.find('div.info-button-message').exists()).toEqual(false);
    });
});
