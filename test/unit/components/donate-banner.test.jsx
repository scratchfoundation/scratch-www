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
    test('Testing 2024 EOY campaign message', () => {
        global.Date.now = () => new Date(2024, 11, 16).getTime();
        const component = mountWithIntl(
            <DonateTopBanner />
        );

        expect(component.find('div.donate-banner').exists()).toEqual(true);
        expect(component.find('p.donate-text').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.eoyCampaign"]').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.askSupport"]').exists()).toEqual(false);

    });
    test('testing default message comes back after January 9, 2025', () => {
        // Date after Scratch week
        global.Date.now = () => new Date(2025, 0, 10).getTime();
        const component = mountWithIntl(
            <DonateTopBanner />
        );
        expect(component.find('div.donate-banner').exists()).toEqual(true);
        expect(component.find('p.donate-text').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.askSupport"]').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.eoyCampaign"]').exists()).toEqual(false);
    });
});
