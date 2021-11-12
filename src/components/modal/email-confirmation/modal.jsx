const connect = require('react-redux').connect;
import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Modal from '../base/modal.jsx';
import ModalTitle from '../base/modal-title.jsx';
// import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

// import './manager-limit-modal.scss';
// import {STUDIO_MANAGER_LIMIT} from '../../../redux/studio.js';

const EmailConfirmationModal = props => (
    <Modal
        isOpen
    >
        <ModalTitle />
        <p>{props.email}</p>
    </Modal>
);

EmailConfirmationModal.propTypes = {
    email: PropTypes.string,
    handleClose: PropTypes.func
};
const mapStateToProps = state => ({
    email: state.session.session.user.email
});

module.exports = connect(mapStateToProps)(EmailConfirmationModal);
