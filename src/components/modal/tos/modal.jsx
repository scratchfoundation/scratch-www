const PropTypes = require('prop-types');
const React = require('react');
const {useState, useCallback} = React;
const Modal = require('../base/modal.jsx');
const TosFlow = require('../../tos-flow/tos-flow.jsx');

require('./modal.scss');

const TosModal = ({user}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

    return (
        <Modal
            isOpen={isOpen}
            showCloseButton={false}
            useStandardSizes
            className="tos-modal"
            shouldCloseOnOverlayClick={false}
        >
            <TosFlow
                user={user}
                onComplete={handleClose}
            />
        </Modal>
    );
};

TosModal.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        token: PropTypes.string.isRequired,
        country: PropTypes.string,
        state: PropTypes.string,
        birthYear: PropTypes.number,
        birthMonth: PropTypes.number,
        email: PropTypes.string,
        underConsentAge: PropTypes.bool,
        parentalConsentRequired: PropTypes.bool,
        withParentEmail: PropTypes.bool,
        isEducator: PropTypes.bool
    })
};

module.exports = TosModal;
