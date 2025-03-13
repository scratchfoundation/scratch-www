const React = require('react');
const {renderWithIntl} = require('../../helpers/intl-helpers.jsx');
const EmailConfirmationBanner = require('../../../src/components/dropdown-banner/email-confirmation/banner.jsx');
const {fireEvent} = require('@testing-library/react');
require('@testing-library/jest-dom');

jest.mock('../../../src/components/modal/email-confirmation/modal.jsx', () => () => 'MockEmailConfirmationModal');


describe('EmailConfirmationBanner', () => {
    test('Clicking "Confirm your email" opens the email confirmation modal', () => {
        const {container} = renderWithIntl(
            <EmailConfirmationBanner />
        );

        expect(container).not.toHaveTextContent('MockEmailConfirmationModal');

        const confirmLink = container.querySelector('a.showEmailConfirmationModalLink');
        fireEvent.click(confirmLink);

        expect(container).toHaveTextContent('MockEmailConfirmationModal');
    });

    test('Clicking X calls onRequestDismiss', () => {

        const requestDismissMock = jest.fn();

        const {container} = renderWithIntl(
            <EmailConfirmationBanner onRequestDismiss={requestDismissMock} />
        );

        const closeButton = container.querySelector('a.close');
        fireEvent.click(closeButton);

        expect(requestDismissMock).toHaveBeenCalled();
    });
});
