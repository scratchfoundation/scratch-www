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
        jest.useRealTimers();
    });

    test('variant A renders the original donate button', () => {
        const {container} = renderWithIntl(<DonateBanner variant="A" />);
        expect(container.querySelector('div.donate-banner')).toBeInTheDocument();
        expect(container.querySelector('p.donate-text')).toBeInTheDocument();
        expect(container.querySelector('.donate-button')).toBeInTheDocument();
        expect(container.querySelector('givebutter-widget')).not.toBeInTheDocument();
        expect(global.document.getElementById('givebutter-widgets')).toBeNull();

        expect(container.firstChild).toMatchSnapshot();
    });

    test('variant B renders the Givebutter widget and loads its library once', () => {
        const {container} = renderWithIntl(<DonateBanner variant="B" />);
        expect(container.querySelector('givebutter-widget')).toHaveAttribute('id', 'pA7Pb9');
        expect(container.querySelector('.donate-button')).not.toBeInTheDocument();

        const script = global.document.getElementById('givebutter-widgets');
        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'src',
            'https://widgets.givebutter.com/latest.umd.cjs?acct=6VvCiMGqhgZgliyY&p=other'
        );
        expect(script.async).toBe(true);

        renderWithIntl(<DonateBanner variant="B" />);
        expect(global.document.querySelectorAll('#givebutter-widgets')).toHaveLength(1);
    });

    test('sends donate_banner_view and click with the Fastly-assigned variant for A', () => {
        jest.useFakeTimers();
        global.window.dataLayer = {push: jest.fn()};
        const {container} = renderWithIntl(<DonateBanner variant="A" />);

        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'donate_banner_view',
            variant: 'A'
        });

        fireEvent.click(container.querySelector('.donate-button'));
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'donate_banner_click',
            variant: 'A'
        });
    });

    test('unassigned visitors see the original button and are reported as unassigned', () => {
        jest.useFakeTimers();
        global.window.dataLayer = {push: jest.fn()};
        const {container} = renderWithIntl(<DonateBanner variant={null} />);

        expect(container.querySelector('.donate-button')).toBeInTheDocument();
        expect(container.querySelector('givebutter-widget')).not.toBeInTheDocument();
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'donate_banner_view',
            variant: 'unassigned'
        });

        fireEvent.click(container.querySelector('.donate-button'));
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'donate_banner_click',
            variant: 'unassigned'
        });
    });

    test('sends donate_banner_click with variant B when the Givebutter button is clicked', () => {
        global.window.dataLayer = {push: jest.fn()};
        const {container} = renderWithIntl(<DonateBanner variant="B" />);
        fireEvent.click(container.querySelector('givebutter-widget'));
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'donate_banner_click',
            variant: 'B'
        });
    });

    test('forwards Givebutter donation funnel messages with the assigned variant', () => {
        global.window.dataLayer = {push: jest.fn()};
        renderWithIntl(<DonateBanner variant="B" />);
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
            variant: 'B',
            value: 40,
            currency: 'USD',
            transaction_id: 'txn_abc'
        });
    });
});
