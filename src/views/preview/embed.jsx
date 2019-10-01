const React = require('react');
const ErrorBoundary = require('../../components/errorboundary/errorboundary.jsx');
const render = require('../../lib/render.jsx');

const previewActions = require('../../redux/preview.js');

const isSupportedBrowser = require('../../lib/supported-browser').default;
const UnsupportedBrowser = require('./unsupported-browser.jsx');

if (isSupportedBrowser()) {
    const EmbedView = require('./embed-view.jsx');
    render(
        <EmbedView.View />,
        document.getElementById('app'),
        {
            preview: previewActions.previewReducer,
            ...EmbedView.guiReducers
        },
        {
            locales: EmbedView.initLocale(EmbedView.localesInitialState, window._locale),
            scratchGui: EmbedView.initGuiState(EmbedView.guiInitialState)
        },
        EmbedView.guiMiddleware
    );
} else {
    render(<ErrorBoundary><UnsupportedBrowser /></ErrorBoundary>, document.getElementById('app'));
}
