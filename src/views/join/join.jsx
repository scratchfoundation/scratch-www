const React = require('react');
const render = require('../../lib/render.jsx');
const JoinModal = require('../../components/modal/join/modal.jsx');
const ErrorBoundary = require('../../components/errorboundary/errorboundary.jsx');
// Require this even though we don't use it because, without it, webpack runs out of memory...
const Page = require('../../components/page/www/page.jsx'); // eslint-disable-line no-unused-vars

require('./join.scss');
const Register = () => (
    <ErrorBoundary>
        <div className="join">
            <a
                aria-label="Scratch"
                href="/"
            >
                <img
                    className="logo"
                    src="/images/logo_sm.png"
                />
            </a>

        </div>
        <JoinModal
            isOpen
            key="scratch3registration"
            showCloseButton={false}
        />
    </ErrorBoundary>
);
render(<Register />, document.getElementById('app'));
