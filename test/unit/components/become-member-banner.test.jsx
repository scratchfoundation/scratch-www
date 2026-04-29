/* eslint-disable max-len */
import React from 'react';
import {renderWithIntl} from '../../helpers/intl-helpers.jsx';
import BecomeMemberBanner from '../../../src/views/splash/become-member/become-member-banner.jsx';
import '@testing-library/jest-dom';

describe('BecomeMemberBannerTest', () => {
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
        const {container} = renderWithIntl(<BecomeMemberBanner />);
        expect(container.querySelector('div.become-member-banner')).toBeInTheDocument();
        expect(container.querySelector('p.become-member-text')).toBeInTheDocument();

        expect(container.firstChild).toMatchSnapshot();
    });
});
