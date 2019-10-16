const React = require('react');
const ErrorBoundary = require('../../components/errorboundary/errorboundary.jsx');
const render = require('../../lib/render.jsx');

// Require this even though we don't use it because, without it, webpack runs out of memory...
const Page = require('../../components/page/www/page.jsx'); // eslint-disable-line no-unused-vars

const previewActions = require('../../redux/preview.js');

const isSupportedBrowser = require('../../lib/supported-browser').default;
const UnsupportedBrowser = require('./unsupported-browser.jsx');

if (isSupportedBrowser()) {
    const EmbedView = require('./embed-view.jsx');
    render(
        <ErrorBoundary componentName="EmbedView">
            <EmbedView.View />
        </ErrorBoundary>,
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
    render(
        <ErrorBoundary componentName="UnsupportedBrowser"><UnsupportedBrowser /></ErrorBoundary>,
        document.getElementById('app')
    );
}
