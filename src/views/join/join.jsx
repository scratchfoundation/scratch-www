const React = require('react');
const render = require('../../lib/render.jsx');
const JoinFlow = require('../../components/join-flow/join-flow.jsx');
const ErrorBoundary = require('../../components/errorboundary/errorboundary.jsx');
// Require this even though we don't use it because, without it, webpack runs out of memory...
const Page = require('../../components/page/www/page.jsx'); // eslint-disable-line no-unused-vars
require('./join.scss');

const openModal = true;
const Register = () => (
    <ErrorBoundary>
        <div
            className="join-standalone"
        >
            <JoinFlow
                isOpen={openModal}
                key="scratch3registration"
            />
        </div>
    </ErrorBoundary>
);
render(<Register />, document.getElementById('app'));
