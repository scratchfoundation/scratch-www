const React = require('react');
const Page = require('../../../src/components/page/www/page.jsx');
const {renderWithIntl} = require('../../helpers/react-testing-library-wrapper.jsx');
const {default: configureStore} = require('redux-mock-store');
const {Provider} = require('react-redux');
const sessionActions = require('../../../src/redux/session.js');

describe('Page', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
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
    });

    test('Do not show donor recognition', () => {
        const {findAllByComponentName} = renderWithIntl(
            <Provider store={store}>
                <Page />
            </Provider>,
            'Page'
        );
        expect(findAllByComponentName('DonorRecognition')).toHaveLength(0);
    });

    test('Show donor recognition', () => {
        const {findAllByComponentName} = renderWithIntl(
            <Provider store={store}>
                <Page
                    showDonorRecognition
                />
            </Provider>,
            'Page'
        );
        expect(findAllByComponentName('DonorRecognition')).toHaveLength(1);
    });
});
