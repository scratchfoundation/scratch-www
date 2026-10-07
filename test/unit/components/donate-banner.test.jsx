/* eslint-disable max-len */
import React from 'react';
import {fireEvent} from '@testing-library/react';
import {renderWithIntl} from '../../helpers/intl-helpers.jsx';
import DonateBanner from '../../../src/views/splash/donate/donate-banner.jsx';
import '@testing-library/jest-dom';

describe('DonateBannerTest', () => {
    afterEach(() => {
        const script = global.document.getElementById('givebutter-widgets');
        if (script) {
            script.remove();
        }
        delete global.window.dataLayer;
    });
    test('testing default message', () => {
        const {container} = renderWithIntl(<DonateBanner />);
        expect(container.querySelector('div.donate-banner')).toBeInTheDocument();
        expect(container.querySelector('p.donate-text')).toBeInTheDocument();
        expect(container.querySelector('givebutter-widget')).toHaveAttribute('id', 'pA7Pb9');

        expect(container.firstChild).toMatchSnapshot();
    });
    test('loads the Givebutter widgets library once', () => {
        renderWithIntl(<DonateBanner />);
        const script = global.document.getElementById('givebutter-widgets');
        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'src',
            'https://widgets.givebutter.com/latest.umd.cjs?acct=6VvCiMGqhgZgliyY&p=other'
        );
        expect(script.async).toBe(true);

        renderWithIntl(<DonateBanner />);
        expect(global.document.querySelectorAll('#givebutter-widgets')).toHaveLength(1);
    });
    test('sends donate_banner_click to dataLayer when the Givebutter button is clicked', () => {
        global.window.dataLayer = {push: jest.fn()};
        const {container} = renderWithIntl(<DonateBanner />);
        fireEvent.click(container.querySelector('givebutter-widget'));
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'donate_banner_click'
        });
    });
    test('forwards Givebutter donation funnel messages to dataLayer', () => {
        global.window.dataLayer = {push: jest.fn()};
        renderWithIntl(<DonateBanner />);
        global.window.dispatchEvent(new MessageEvent('message', {
            origin: 'https://givebutter.com',
            data: {
                givebutter: true,
                event: 'donation.complete',
                total: 40,
                currency: 'USD',
                transactionId: 'txn_abc'
            }
        }));
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'checkout_completed',
            event_category: 'givebutter',
            event_label: 'givebutter',
            value: 40,
            currency: 'USD',
            transaction_id: 'txn_abc'
        });
    });
});
