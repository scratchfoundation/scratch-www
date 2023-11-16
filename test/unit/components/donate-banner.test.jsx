import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import DonateTopBanner from '../../../src/views/splash/donate/donate-banner';

describe('DonateBannerTest', () => {
    let realDateNow;

    beforeEach(() => {
        realDateNow = Date.now.bind(global.Date);
    });
    afterEach(() => {
        global.Date.now = realDateNow;
    });
    test('Testing Scratch week banner message', () => {
        global.Date.now = () => new Date(2022, 3, 16).getTime();
        const component = mountWithIntl(
            <DonateTopBanner />
        );

        expect(component.find('div.donate-banner').exists()).toEqual(true);
        expect(component.find('p.donate-text').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.scratchWeek"]').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.askSupport"]').exists()).toEqual(false);

    });
    test('testing default message comes back after May 21', () => {
        // Date after Scratch week
        global.Date.now = () => new Date(2022, 4, 22).getTime();
        const component = mountWithIntl(
            <DonateTopBanner />
        );
        expect(component.find('div.donate-banner').exists()).toEqual(true);
        expect(component.find('p.donate-text').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.askSupport"]').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.scratchWeek"]').exists()).toEqual(false);
    });
});
