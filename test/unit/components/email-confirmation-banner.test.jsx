const React = require('react');
const {mountWithIntl} = require('../../helpers/intl-helpers.jsx');
const EmailConfirmationBanner = require('../../../src/components/dropdown-banner/email-confirmation/banner.jsx');


describe('EmailConfirmationBanner', () => {
    test('Clicking "Confirm your email" opens the email confirmation modal', () => {
        const component = mountWithIntl(
            <EmailConfirmationBanner />
        );

        component.find('a.showEmailConfirmationModalLink').simulate('click');
        
        expect(component.find('div.modal-content').exists()).toBe(true);
    });

    test('Clicking X calls onRequestDismiss', () => {

        const requestDismissMock = jest.fn();

        const component = mountWithIntl(
            <EmailConfirmationBanner onRequestDismiss={requestDismissMock} />
        );

        component.find('a.close').simulate('click', {preventDefault () {}});
        
        expect(requestDismissMock).toHaveBeenCalled();
    });
});
