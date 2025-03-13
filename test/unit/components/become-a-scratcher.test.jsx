/* eslint-disable max-len */
const React = require('react');
const {renderWithIntl} = require('../../helpers/intl-helpers.jsx');
import {ConnectedBecomeAScratcher as BecomeAScratcherPage} from '../../../src/views/become-a-scratcher/become-a-scratcher.jsx';
import sessionActions from '../../../src/redux/session.js';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

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
        const {container} = renderWithIntl(
            <BecomeAScratcherPage />, {context: {store: NotLoggedInUserStore}}
        );
        expect(container.querySelector('div.not-available-outer')).toBeInTheDocument();
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
        const {container} = renderWithIntl(
            <BecomeAScratcherPage />, {context: {store: NotInvitedUserStore}}
        );
        expect(container.querySelector('div.no-invitation').exists()).toBeInTheDocument();
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
        const {container} = renderWithIntl(
            <BecomeAScratcherPage />, {context: {store: InvitedUserStore}}
        );
        expect(container.querySelector('div.congratulations-page').exists()).toBeInTheDocument();
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
        const {container} = renderWithIntl(
            <BecomeAScratcherPage />, {context: {store: AlreadyScratcherStore}}
        );
        expect(container.querySelector('div.hooray-screen').exists()).toBeInTheDocument();
    });
});
