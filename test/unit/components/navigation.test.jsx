const React = require('react');
const {shallowWithIntl, mountWithIntl} = require('../../helpers/intl-helpers.jsx');
import configureStore from 'redux-mock-store';
const Navigation = require('../../../src/components/navigation/www/navigation.jsx');
const Registration = require('../../../src/components/registration/registration.jsx');
const sessionActions = require('../../../src/redux/session.js');

describe('Navigation', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = null;
        jest.useFakeTimers();
    });

    const getNavigationWrapper = props => {
        const wrapper = shallowWithIntl(
            <Navigation
                {...props}
            />
            , {context: {store}}
        );
        return wrapper
            .dive() // unwrap redux connect(injectIntl(JoinFlow))
            .dive(); // unwrap injectIntl(JoinFlow)
    };

    test('when using old join flow, when registrationOpen is true, iframe shows', () => {
        store = mockStore({
            navigation: {
                registrationOpen: true,
                useScratch3Registration: false
            },
            session: {
                status: sessionActions.Status.FETCHED
            },
            messageCount: {
                messageCount: 0
            }
        });
        const navWrapper = getNavigationWrapper();
        expect(navWrapper.contains(<Registration />)).toEqual(true);
    });

    test('when using new join flow, when registrationOpen is true, iframe does not show', () => {
        store = mockStore({
            navigation: {
                registrationOpen: true,
                useScratch3Registration: true
            },
            session: {
                status: sessionActions.Status.FETCHED
            },
            messageCount: {
                messageCount: 0
            }
        });
        const navWrapper = getNavigationWrapper();
        expect(navWrapper.contains(<Registration />)).toEqual(false);
    });

    test('when using old join flow, clicking Join Scratch calls handleRegistrationRequested', () => {
        store = mockStore({
            navigation: {
                useScratch3Registration: false
            },
            session: {
                status: sessionActions.Status.FETCHED
            },
            messageCount: {
                messageCount: 0
            }
        });
        const props = {
            handleClickRegistration: jest.fn()
        };
        const navWrapper = getNavigationWrapper(props);
        const navInstance = navWrapper.instance();

        // simulate click, with mocked event
        navWrapper.find('a.registrationLink').simulate('click', {preventDefault () {}});
        expect(navInstance.props.handleClickRegistration).toHaveBeenCalled();
    });

    test('when using new join flow, clicking Join Scratch calls handleRegistrationRequested', () => {
        store = mockStore({
            navigation: {
                useScratch3Registration: true
            },
            session: {
                status: sessionActions.Status.FETCHED
            },
            messageCount: {
                messageCount: 0
            }
        });
        const props = {
            handleClickRegistration: jest.fn()
        };
        const navWrapper = getNavigationWrapper(props);
        const navInstance = navWrapper.instance();

        navWrapper.find('a.registrationLink').simulate('click', {preventDefault () {}});
        expect(navInstance.props.handleClickRegistration).toHaveBeenCalled();
    });

    test('Component sets up message polling when it mounts', () => {
        store = mockStore({
            navigation: {
                registrationOpen: false
            },
            messageCount: {
                messageCount: 5
            }
        });
        const props = {
            user: {
                thumbnailUrl: 'scratch.mit.edu',
                username: 'auser'
            },
            getMessageCount: jest.fn()
        };
        const intlWrapper = mountWithIntl(
            <Navigation
                {...props}
            />, {context: {store},
                childContextTypes: {store}
            });

        intlWrapper.children().find('Navigation')
            .instance();
        const twoMin = 2 * 60 * 1000;
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), twoMin);
        // Advance timers passed the intial two minutes.
        jest.advanceTimersByTime(twoMin + 1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), twoMin * 2);
        expect(props.getMessageCount).toHaveBeenCalled();
    });

    test('SetupMessagePolling polls for messages 5 times', () => {
        store = mockStore({
            navigation: {
                registrationOpen: false
            },
            messageCount: {
                messageCount: 5
            }
        });
        const props = {
            user: {
                thumbnailUrl: 'scratch.mit.edu',
                username: 'auser'
            },
            getMessageCount: jest.fn()
        };
        const intlWrapper = mountWithIntl(
            <Navigation
                {...props}
            />, {context: {store},
                childContextTypes: {store}
            });

        const navInstance = intlWrapper.children().find('Navigation')
            .instance();
        // Clear the timers and mocks because componentDidMount
        // has already called setupMessagePolling.
        jest.clearAllTimers();
        jest.clearAllMocks();

        navInstance.setupMessagePolling(2);

        // Check that we set the timeout to backoff exponentially
        let minutes = 2 * 60 * 1000;
        for (let count = 1; count < 5; ++count) {
            jest.advanceTimersByTime(minutes + 1);
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), minutes * 2);
            expect(props.getMessageCount).toHaveBeenCalledTimes(count);
            minutes = minutes * 2;
        }

        // Exhaust all timers (there shouldn't be any left)
        jest.runAllTimers();
        // We exponentially back off checking for messages, starting at 2 min
        // and stop after 32 minutes so it should happen 5 times total.
        expect(props.getMessageCount).toHaveBeenCalledTimes(5);
        // setTimeout happens 1 fewer since the original call to
        // setupMessagePolling isn't counted here.
        expect(setTimeout).toHaveBeenCalledTimes(4);
    });
});
