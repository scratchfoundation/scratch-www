const React = require('react');
const render = require('../../lib/render.jsx');
const JoinModal = require('../../components/modal/join/modal.jsx');

const openModal = true;
const Register = () => (
    <div className="join">
        <JoinModal
            isOpen={openModal}
            key="scratch3registration"
        />
    </div>
);
render(<Register />, document.getElementById('app'));
