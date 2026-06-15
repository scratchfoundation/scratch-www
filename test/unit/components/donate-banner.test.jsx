/* eslint-disable max-len */
import React from 'react';
import {renderWithIntl} from '../../helpers/intl-helpers.jsx';
import DonateBanner from '../../../src/views/splash/donate/donate-banner.jsx';
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
        global.Date.now = () => new Date(2025, 0, 10).getTime();
        const {container} = renderWithIntl(<DonateBanner />);
        expect(container.querySelector('div.donate-banner')).toBeInTheDocument();
        expect(container.querySelector('p.donate-text')).toBeInTheDocument();

        expect(container.firstChild).toMatchSnapshot();
    });
});
