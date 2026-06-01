/**
 * @jest-environment jsdom
 */

/* eslint-env browser */
/* eslint-disable global-require, react/display-name, react/prop-types */

// Mock heavy dependencies so the module can load without scratch-gui, Blockly, etc.
jest.mock('query-string', () => ({
    default: {parse: () => ({}), stringify: () => ''},
    parse: () => ({}),
    stringify: () => ''
}));
jest.mock('@scratch/scratch-gui', () => {
    const React = require('react');
    const MockGUI = () => React.createElement('div');
    MockGUI.guiReducers = {};
    MockGUI.guiInitialState = {};
    MockGUI.guiMiddleware = f => f;
    MockGUI.initLocale = s => s;
    MockGUI.localesInitialState = {};
    MockGUI.setAppElement = () => {};
    MockGUI.initPlayer = s => s;
    MockGUI.initFullScreen = s => s;
    MockGUI.default = MockGUI;
    return MockGUI;
});
jest.mock('scratch-parser', () => () => {});
jest.mock('../../../src/lib/storage.js', () => ({
    default: {setProjectToken: () => {}, load: () => ({then: () => ({catch: () => {}})})},
    __esModule: true
}));
jest.mock('../../../src/lib/api', () => jest.fn());
jest.mock('xhr', () => jest.fn());
jest.mock('../../../src/components/page/www/page.jsx', () => {
    const React = require('react');
    return props => React.createElement('div', null, props.children);
});
jest.mock('../../../src/views/preview/presentation.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});
jest.mock('../../../src/components/not-available/not-available.jsx', () => {
    const React = require('react');
    return () => React.createElement('div', null, 'NotAvailable');
});
jest.mock('../../../src/components/registration/registration.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});
jest.mock('../../../src/components/registration/scratch3-registration.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});
jest.mock('../../../src/components/login/connected-login.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});
jest.mock('../../../src/components/login/canceled-deletion-modal.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});
jest.mock('../../../src/views/preview/meta.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});
jest.mock('../../../src/components/modal/share/modal.jsx', () => ({
    ShareModal: () => null
}));
jest.mock('../../../src/components/modal/tos/modal.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});
jest.mock('../../../src/components/journeys/editor-journey/editor-journey.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});
jest.mock('../../../src/components/journeys/tutorials-highlight/tutorials-highlight.jsx', () => {
    const React = require('react');
    return () => React.createElement('div');
});

const sessionActions = require('../../../src/redux/session.js');

describe('Preview componentDidMount', () => {
    let Preview;

    beforeAll(() => {
        // Preview reads window.location.pathname in its constructor to derive
        // projectId. Use window.history.pushState to set the URL without
        // replacing the Location object.
        window.history.pushState({}, '', '/projects/editor/?tutorial=getStarted');
        Preview = require('../../../src/views/preview/project-view.jsx')._Preview;
    });

    afterAll(() => {
        // Restore original URL
        window.history.pushState({}, '', '/');
    });

    const buildProps = overrides => ({
        hasActiveMembership: false,
        sessionStatus: sessionActions.Status.NOT_FETCHED,
        user: {},
        userPresent: false,
        projectInfo: {},
        projectHost: 'https://projects.scratch.mit.edu',
        isAdmin: false,
        fullScreen: false,
        playerMode: false,
        permissions: {},
        // dispatch-mapped functions
        getProjectInfo: jest.fn(),
        getRemixes: jest.fn(),
        getCuratedStudios: jest.fn(),
        getFavedStatus: jest.fn(),
        getLovedStatus: jest.fn(),
        refreshSession: jest.fn(),
        setPlayer: jest.fn(),
        setFullScreen: jest.fn(),
        ...overrides
    });

    test('does not fetch community data for new projects (projectId 0) when session is already FETCHED', () => {
        const props = buildProps({
            sessionStatus: sessionActions.Status.FETCHED
        });
        const instance = new Preview(props);
        instance.fetchCommunityData = jest.fn();
        // Stub out DOM side effects
        instance.addEventListeners = jest.fn();

        instance.componentDidMount();

        expect(instance.fetchCommunityData).not.toHaveBeenCalled();
    });

    test('fetches community data for existing projects when session is already FETCHED', () => {
        window.history.pushState({}, '', '/projects/12345/');

        try {
            const props = buildProps({
                sessionStatus: sessionActions.Status.FETCHED
            });
            const instance = new Preview(props);
            instance.fetchCommunityData = jest.fn();
            instance.addEventListeners = jest.fn();

            instance.componentDidMount();

            expect(instance.fetchCommunityData).toHaveBeenCalledTimes(1);
        } finally {
            // Restore editor URL for subsequent tests
            window.history.pushState({}, '', '/projects/editor/?tutorial=getStarted');
        }
    });

    test('does not fetch community data when session is not yet FETCHED', () => {
        const props = buildProps({
            sessionStatus: sessionActions.Status.NOT_FETCHED
        });
        const instance = new Preview(props);
        instance.fetchCommunityData = jest.fn();
        instance.addEventListeners = jest.fn();

        instance.componentDidMount();

        expect(instance.fetchCommunityData).not.toHaveBeenCalled();
    });
});
