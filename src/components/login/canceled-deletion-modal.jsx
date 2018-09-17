const React = require('react');
const connect = require('react-redux').connect;
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const navigationActions = require('../../redux/navigation.js');
const Modal = require('../modal/base/modal.jsx');

const CanceledDeletionModal = ({
    canceledDeletionOpen,
    handleCloseCanceledDeletion,
    intl
}) => (
    <Modal
        isOpen={canceledDeletionOpen}
        style={{
            content: {
                padding: 15
            }
        }}
        onRequestClose={handleCloseCanceledDeletion}
    >
        <h4><FormattedMessage id="general.noDeletionTitle" /></h4>
        <p>
            <FormattedMessage
                id="general.noDeletionDescription"
                values={{
                    resetLink: <a href="/accounts/password_reset/">
                        {intl.formatMessage({id: 'general.noDeletionLink'})}
                    </a>
                }}
            />
        </p>
    </Modal>
);

CanceledDeletionModal.propTypes = {
    canceledDeletionOpen: PropTypes.bool,
    handleCloseCanceledDeletion: PropTypes.func,
    intl: intlShape
};

const mapStateToProps = state => ({
    canceledDeletionOpen: state.navigation && state.navigation.canceledDeletionOpen
});

const mapDispatchToProps = dispatch => ({
    handleCloseCanceledDeletion: () => {
        dispatch(navigationActions.setCanceledDeletionOpen(false));
    }
});

const ConnectedCanceledDeletionModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(CanceledDeletionModal);

module.exports = injectIntl(ConnectedCanceledDeletionModal);
