const React = require('react');
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';
import sessionActions from '../../../src/redux/session.js';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

jest.mock('../../../src/lib/render.jsx', () => jest.fn());
jest.mock('../../../src/lib/api', () => jest.fn());

const render = require('../../../src/lib/render.jsx');
const api = require('../../../src/lib/api');

// The page module renders itself on import; the mocked render captures the
// element it would mount.
require('../../../src/views/studentcompleteregistration/studentcompleteregistration.jsx');
const StudentCompleteRegistrationPage = render.mock.calls[0][0];

describe('StudentCompleteRegistration', () => {
    const mockStore = configureStore();

    beforeEach(() => {
        api.mockClear();
    });

    const sessionStore = user => mockStore({
        session: {
            status: user ? sessionActions.Status.FETCHED : sessionActions.Status.NOT_FETCHED,
            session: {
                user: user,
                permissions: {student: true},
                flags: {must_complete_registration: true, must_reset_password: false}
            }
        }
    });

    test('sends the student\'s login token when loading their classroom', () => {
        const {rerenderWithIntl} = renderWithIntl(
            <Provider store={sessionStore(null)}>
                {StudentCompleteRegistrationPage}
            </Provider>
        );

        rerenderWithIntl(
            <Provider
                store={sessionStore({
                    classroomId: 123,
                    token: 'student-token',
                    username: 'student1'
                })}
            >
                {StudentCompleteRegistrationPage}
            </Provider>
        );

        expect(api).toHaveBeenCalledTimes(1);
        expect(api.mock.calls[0][0]).toEqual({
            uri: '/classrooms/123',
            authentication: 'student-token'
        });
    });
});
