// preview view can show either project page or editor page;
// idea is that we shouldn't require a page reload to switch back and forth
const React = require('react');
const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const previewActions = require('../../redux/preview.js');
const commentActions = require('../../redux/comments.js');

const isSupportedBrowser = require('../../lib/supported-browser').default;
const UnsupportedBrowser = require('./unsupported-browser.jsx');
const {feedbackReducer} = require('../../redux/qualitative-feedback.js');

if (isSupportedBrowser()) {
    const ProjectView = require('./project-view.jsx');
    render(
        <ProjectView.View />,
        document.getElementById('app'),
        {
            preview: previewActions.previewReducer,
            comments: commentActions.commentsReducer,
            feedback: feedbackReducer,
            ...ProjectView.guiReducers
        },
        {
            locales: ProjectView.initLocale(ProjectView.localesInitialState, window._locale),
            scratchGui: ProjectView.initGuiState(ProjectView.guiInitialState)
        },
        ProjectView.guiMiddleware
    );
} else {
    render(<Page><UnsupportedBrowser /></Page>, document.getElementById('app'));
}
