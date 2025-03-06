const React = require('react');
const render = require('../../lib/render.jsx');
const Scratch3Registration = require('../../components/registration/scratch3-registration.jsx');
const ErrorBoundary = require('../../components/errorboundary/errorboundary.jsx');

require('./join.scss');
const Register = () => (
    <ErrorBoundary componentName="Join">
        <nav className="join">
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
        <Scratch3Registration
            createProjectOnComplete
            isOpen
            key="scratch3registration"
            showCloseButton={false}
        />
    </ErrorBoundary>
);
render(<Register />, document.getElementById('app'));
