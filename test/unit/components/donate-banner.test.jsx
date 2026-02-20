/* eslint-disable max-len */
import React from 'react';
import {renderWithIntl} from '../../helpers/intl-helpers.jsx';
import DonateTopBanner from '../../../src/views/splash/donate/donate-banner';
import '@testing-library/jest-dom';

describe('DonateBannerTest', () => {
    let realDateNow;

    beforeEach(() => {
        realDateNow = Date.now.bind(global.Date);
    });
    afterEach(() => {
        global.Date.now = realDateNow;
    });
    test('testing default message', () => {
    // Date after Scratch week
        global.Date.now = () => new Date(2025, 0, 10).getTime();
        const {container} = renderWithIntl(<DonateTopBanner />);
        expect(container.querySelector('div.donate-banner')).toBeInTheDocument();
        expect(container.querySelector('p.donate-text')).toBeInTheDocument();

        expect(container.firstChild).toMatchSnapshot();
    });
});
