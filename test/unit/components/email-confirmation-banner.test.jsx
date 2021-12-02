const React = require('react');
const {mountWithIntl} = require('../../helpers/intl-helpers.jsx');
const EmailConfirmationBanner = require('../../../src/components/dropdown-banner/email-confirmation/banner.jsx');
jest.mock('../../../src/components/modal/email-confirmation/modal.jsx', () => () => 'MockEmailConfirmationModal');


describe('EmailConfirmationBanner', () => {
    test('Clicking "Confirm your email" opens the email confirmation modal', () => {
        const component = mountWithIntl(
            <EmailConfirmationBanner />
        );

        expect(component.text()).not.toContain('MockEmailConfirmationModal');
        component.find('a.showEmailConfirmationModalLink').simulate('click');
        expect(component.text()).toContain('MockEmailConfirmationModal');
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
