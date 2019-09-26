const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
import configureStore from 'redux-mock-store';
const Navigation = require('../../../src/components/navigation/www/navigation.jsx');
const sessionActions = require('../../../src/redux/session.js');

describe('Navigation', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
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

    test('when using old join flow, clicking Join Scratch attemps to open registration', () => {
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
            handleOpenRegistration: jest.fn()
        };
        const navWrapper = getNavigationWrapper(props);
        const navInstance = navWrapper.instance();

        navWrapper.find('a.registrationLink').simulate('click');
        expect(navInstance.props.handleOpenRegistration).toHaveBeenCalled();
    });

    test('when using new join flow, clicking Join Scratch attemps to navigate to registration', () => {
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
            navigateToRegistration: jest.fn()
        };
        const navWrapper = getNavigationWrapper(props);
        const navInstance = navWrapper.instance();

        navWrapper.find('a.registrationLink').simulate('click');
        expect(navInstance.props.navigateToRegistration).toHaveBeenCalled();
    });
});
