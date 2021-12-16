const React = require('react');
const {mountWithIntl} = require('../../helpers/intl-helpers.jsx');
const EmailConfirmationModal = require('../../../src/components/modal/email-confirmation/modal.jsx');
import configureStore from 'redux-mock-store';


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
        const component = mountWithIntl(
            <EmailConfirmationModal
                isOpen
            />, {context: {store: defaultStore}}
        );
        expect(component.find('div.modal-right-content').text()).toContain(testEmail);
    });

    test('Clicking on Text changes to tips page', () => {
        const component = mountWithIntl(
            <EmailConfirmationModal
                isOpen
            />, {email: testEmail, context: {store: defaultStore}}
        );

        const tipsLinkWrapper = component.find({id: 'emailConfirmationModal.havingTrouble'});
        const tipsLink = mountWithIntl(tipsLinkWrapper.instance().props.values.tipsLink);
        tipsLink.simulate('click');
        expect(component.text()).toContain('emailConfirmationModal.confirmingTips');
    });

    test('Close button shows correctly', () => {
        const component = mountWithIntl(
            <EmailConfirmationModal isOpen />, {context: {store: defaultStore}}
        );

        expect(component.find('div.modal-content-close').exists()).toBe(true);
        expect(component.find('img.modal-content-close-img').exists()).toBe(true);
    });
});
