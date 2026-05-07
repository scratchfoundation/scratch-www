const React = require('react');
const Alert = require('../../components/alert/alert.jsx').default;
const AlertProvider = require('../../components/alert/alert-provider.jsx').default;
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
render(
    <AlertProvider showReadOnlyAlert>
        <Alert />
        <Register />
    </AlertProvider>,
    document.getElementById('app')
);
