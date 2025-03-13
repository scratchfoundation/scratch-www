const React = require('react');
const {renderWithIntl} = require('../../helpers/intl-helpers.jsx');
const EmailConfirmationModal = require('../../../src/components/modal/email-confirmation/modal.jsx');
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import {fireEvent, screen} from '@testing-library/react';


describe('Modal', () => {
    const mockStore = configureStore();
    let defaultStore;
    const testEmail = 'test123@email.com';

    beforeEach(() => {
        defaultStore = mockStore({
            session: {
                session: {
                    user: {
                        email: testEmail
                    },
                    permissions: {}
                }
            }
        });
    });

    test('Display email prop correctly', () => {
        renderWithIntl(
            <Provider store={defaultStore}>
                <EmailConfirmationModal
                    isOpen
                />
            </Provider>
        );

        expect(screen.getByText(testEmail)).toBeInTheDocument();
    });

    test('Clicking on Text changes to tips page', () => {
        renderWithIntl(
            <Provider
                store={defaultStore}
            >
                <EmailConfirmationModal
                    isOpen
                />
            </Provider>
        );

        const tipsLink = screen.getByText('Check out these tips');
        fireEvent.click(tipsLink);
        expect(screen.getByText('Tips for confirming your email address')).toBeInTheDocument();
    });

    test('Close button shows correctly', async () => {
        renderWithIntl(
            <Provider store={defaultStore}>
                <EmailConfirmationModal
                    isOpen
                />
            </Provider>
        );

        expect(await screen.findByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('img', {name: /close-icon/i})).toBeInTheDocument();
    });
});
