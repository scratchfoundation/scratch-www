const React = require('react');
const render = require('../../lib/render.jsx');
const Scratch3Registration = require('../../components/registration/scratch3-registration.jsx');
const ErrorBoundary = require('../../components/errorboundary/errorboundary.jsx');
const ReadOnlyModeBanner = require('../../components/read-only-mode-banner/read-only-mode-banner.jsx');

require('./join.scss');
const Register = () => (
    <ErrorBoundary componentName="Join">
        <div className="join-page">
            <nav className="join-header">
                <a
                    aria-label="Scratch"
                    href="/"
                >
                    <img
                        className="logo"
                        src="/images/logo_sm.png"
                    />
                </a>
            </nav>
            <ReadOnlyModeBanner className="join-read-only-mode-banner" />
            <Scratch3Registration
                createProjectOnComplete
                isOpen
                key="scratch3registration"
                showCloseButton={false}
            />
        </div>
    </ErrorBoundary>
);
render(<Register />, document.getElementById('app'));
