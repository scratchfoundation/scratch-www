/* eslint-disable max-len */
const React = require('react');
const {mountWithIntl} = require('../../helpers/intl-helpers.jsx');
import {ConnectedBecomeAScratcher as BecomeAScratcherPage} from '../../../src/views/become-a-scratcher/become-a-scratcher.jsx';
import sessionActions from '../../../src/redux/session.js';
import configureStore from 'redux-mock-store';

jest.mock('react-dom', () => ({
    render: jest.fn()
}));

jest.mock('../../../src/components/modal/base/modal.jsx', () => () => 'MockModal');

describe('BecomeAScratcherPage', () => {
    const mockStore = configureStore();

    test('Display 404 when no user', () => {
        const NotLoggedInUserStore = mockStore({
            session: {
                status: sessionActions.Status.FETCHED,
                session: {
                    user: null,
                    permissions: {}
                }
            }
        });
        const component = mountWithIntl(
            <BecomeAScratcherPage />, {context: {store: NotLoggedInUserStore}}
        );
        expect(component.find('div.not-available-outer').exists()).toBeTruthy();
    });

    test('Display No Invitation when user is not invited', () => {

        const NotInvitedUserStore = mockStore({
            session: {
                status: sessionActions.Status.FETCHED,
                session: {
                    user: {
                        id: 123,
                        thumbnailUrl: 'test',
                        username: 'test123'
                    },
                    permissions: {}
                }
            }
        });
        const component = mountWithIntl(
            <BecomeAScratcherPage />, {context: {store: NotInvitedUserStore}}
        );
        expect(component.find('div.no-invitation').exists()).toBeTruthy();
    });

    test('Display Onboarding when user is invited', () => {
        const InvitedUserStore = mockStore({
            session: {
                status: sessionActions.Status.FETCHED,
                session: {
                    user: {
                        id: 123,
                        thumbnailUrl: 'test',
                        username: 'test123'
                    },
                    permissions: {
                        invited_scratcher: true
                    }
                }
            }
        });
        const component = mountWithIntl(
            <BecomeAScratcherPage />, {context: {store: InvitedUserStore}}
        );
        expect(component.find('div.congratulations-page').exists()).toBeTruthy();
    });

    test('Display celebration page when user is already a scratcher', () => {
        const AlreadyScratcherStore = mockStore({
            session: {
                status: sessionActions.Status.FETCHED,
                session: {
                    user: {
                        id: 123,
                        thumbnailUrl: 'test',
                        username: 'test123'
                    },
                    permissions: {
                        scratcher: true
                    }
                }
            }
        });
        const component = mountWithIntl(
            <BecomeAScratcherPage />, {context: {store: AlreadyScratcherStore}}
        );
        expect(component.find('div.hooray-screen').exists()).toBeTruthy();
    });
});
