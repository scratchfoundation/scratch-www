import React from 'react';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';
import SplashPresentation from '../../../src/views/splash/presentation.jsx';
import sessionActions from '../../../src/redux/session.js';
import '@testing-library/jest-dom';

/**
 * Values for the required props of the `SplashPresentation` component corresponding to a normal/common state.
 */
const basicProps = {
    isAdmin: false,
    isEducator: false,
    onCloseAdminPanel: () => {},
    onCloseDonateBanner: () => {},
    onDismiss: () => {},
    onOpenAdminPanel: () => {},
    onRefreshHomepageCache: () => {},
    refreshCacheStatus: {},
    sessionStatus: sessionActions.Status.NOT_FETCHED,
    shouldShowDonateBanner: false,
    shouldShowEmailConfirmation: false,
    shouldShowFeaturesBanner: false,
    shouldShowHOCMiddleBanner: false,
    shouldShowHOCTopBanner: false,
    shouldShowIntro: false,
    shouldShowWelcome: false,
    user: {}
};

// Lazy mock for react-slick so we don't have to mock or polyfill matchMedia
// See https://github.com/akiran/react-slick/issues/742#issuecomment-1934298590
jest.mock('react-slick', () => ({
    __esModule: true,
    default: ({children}) => <div data-testid="slick_mock">{children}</div>
}));

describe('SplashPresentation', () => {
    test('shouldShowCommunityRows property', () => {
        const props = Object.assign({}, basicProps, {
            shouldShowCommunityRows: false
        });
        const {container: withRows} = renderWithIntl(
            <SplashPresentation
                {...props}
                shouldShowCommunityRows
            />,
            'SplashPresentation'
        );
        const {container: withoutRows} = renderWithIntl(
            <SplashPresentation
                {...props}
                shouldShowCommunityRows={false}
            />,
            'SplashPresentation'
        );

        expect(withRows).toHaveTextContent('Featured Projects');
        expect(withRows).toHaveTextContent('Featured Studios');
        expect(withRows).toHaveTextContent('What the Community is Remixing');
        expect(withRows).toHaveTextContent('What the Community is Loving');

        expect(withoutRows).toHaveTextContent('Featured Projects');
        expect(withoutRows).toHaveTextContent('Featured Studios');
        expect(withoutRows).not.toHaveTextContent('What the Community is Remixing');
        expect(withoutRows).not.toHaveTextContent('What the Community is Loving');
    });
});
