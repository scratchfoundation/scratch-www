// preview view can show either project page or editor page;
// idea is that we shouldn't require a page reload to switch back and forth
const React = require('react');
const Page = require('../../components/page/www/page.jsx');
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
    render(<Page><UnsupportedBrowser /></Page>, document.getElementById('app'));
}
