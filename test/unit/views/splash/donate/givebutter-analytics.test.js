import {handleGivebutterMessage} from '../../../../../src/views/splash/donate/givebutter-analytics.js';

describe('handleGivebutterMessage', () => {
    beforeEach(() => {
        global.window.dataLayer = {push: jest.fn()};
    });
    afterEach(() => {
        delete global.window.dataLayer;
    });

    const givebutterEvent = (data, origin = 'https://givebutter.com') => {
        handleGivebutterMessage({
            origin,
            data
        });
    };

    test('maps donation.started to purchase_initiated', () => {
        givebutterEvent({
            givebutter: true,
            event: 'donation.started',
            total: 25,
            currency: 'USD'
        });
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'purchase_initiated',
            event_category: 'givebutter',
            event_label: 'givebutter',
            value: 25,
            currency: 'USD'
        });
    });

    test('maps donation.paying to checkout_started', () => {
        givebutterEvent({
            givebutter: true,
            event: 'donation.paying',
            total: 50,
            currency: 'USD'
        });
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'checkout_started',
            event_category: 'givebutter',
            event_label: 'givebutter',
            value: 50,
            currency: 'USD'
        });
    });

    test('maps donation.complete to checkout_completed', () => {
        givebutterEvent({
            givebutter: true,
            event: 'donation.complete',
            total: '100',
            currency: 'USD',
            transactionId: 'txn_123'
        });
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'checkout_completed',
            event_category: 'givebutter',
            event_label: 'givebutter',
            value: 100,
            currency: 'USD',
            transaction_id: 'txn_123'
        });
    });

    test('labels the event with campaign title and id', () => {
        givebutterEvent({
            givebutter: true,
            event: 'donation.started',
            campaign: {
                id: '123',
                title: 'Scratch Donate'
            }
        });
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'purchase_initiated',
            event_category: 'givebutter',
            event_label: 'Scratch Donate (123)'
        });
    });

    test('falls back to campaign code when id is missing', () => {
        givebutterEvent({
            givebutter: true,
            event: 'donation.paying',
            campaign: {
                code: 'abc',
                title: '  Annual Fund  '
            }
        });
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'checkout_started',
            event_category: 'givebutter',
            event_label: 'Annual Fund (abc)'
        });
    });

    test('accepts Givebutter subdomains', () => {
        givebutterEvent({
            givebutter: true,
            event: 'donation.started'
        }, 'https://widgets.givebutter.com');
        expect(global.window.dataLayer.push).toHaveBeenCalledWith({
            event: 'purchase_initiated',
            event_category: 'givebutter',
            event_label: 'givebutter'
        });
    });

    test('ignores messages from other origins', () => {
        givebutterEvent({
            givebutter: true,
            event: 'donation.complete',
            total: 10
        }, 'https://example.com');
        expect(global.window.dataLayer.push).not.toHaveBeenCalled();
    });

    test('ignores unrelated messages', () => {
        givebutterEvent('close-givebutter-modal');
        givebutterEvent({event: 'donation.complete'});
        givebutterEvent({
            givebutter: true,
            event: 'givebutter-form-loaded'
        });
        expect(global.window.dataLayer.push).not.toHaveBeenCalled();
    });
});
