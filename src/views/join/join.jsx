const React = require('react');
const render = require('../../lib/render.jsx');
const JoinModal = require('../../components/modal/join/modal.jsx');
const ErrorBoundary = require('../../components/errorboundary/errorboundary.jsx');

const openModal = true;
const Register = () => (
    <ErrorBoundary>
        <JoinModal
            isOpen={openModal}
            key="scratch3registration"
        />
    </ErrorBoundary>
);
render(<Register />, document.getElementById('app'));
