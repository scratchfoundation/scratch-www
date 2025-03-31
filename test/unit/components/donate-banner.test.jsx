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
    test('testing default message', () => {
        const component = mountWithIntl(
            <DonateTopBanner />
        );
        expect(component.find('div.donate-banner').exists()).toEqual(true);
        expect(component.find('p.donate-text').exists()).toEqual(true);
        expect(component.find('FormattedMessage[id="donatebanner.askSupport"]').exists()).toEqual(true);
    });
});
