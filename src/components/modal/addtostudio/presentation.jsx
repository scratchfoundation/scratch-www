const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');

const Form = require('../../forms/form.jsx');
const Button = require('../../forms/button.jsx');
const Spinner = require('../../spinner/spinner.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
const StudioButton = require('./studio-button.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const AddToStudioModalPresentation = ({
    intl,
    isOpen,
    studios,
    waitingToClose,
    onToggleStudio,
    onRequestClose,
    onSubmit
}) => {
    const contentLabel = intl.formatMessage({id: 'addToStudio.title'});
    const studioButtons = studios.map(studio => (
        <StudioButton
            canAdd={studio.canAdd}
            canRemove={studio.canRemove}
            hasRequestOutstanding={studio.hasRequestOutstanding}
            id={studio.id}
            includesProject={studio.includesProject}
            key={studio.id}
            title={studio.title}
            onClick={onToggleStudio}
        />
    ));

    return (
        <Modal
            useStandardSizes
            className="mod-addToStudio"
            contentLabel={contentLabel}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="addToStudio-modal-header modal-header">
                <div className="addToStudio-content-label content-label">
                    {contentLabel}
                </div>
            </div>
            <div className="addToStudio-modal-content modal-content">
                <div className="studio-list-outer-scrollbox">
                    <div className="studio-list-inner-scrollbox">
                        <div className="studio-list-container">
                            {studioButtons}
                        </div>
                        <div className="studio-list-bottom-gradient" />
                    </div>
                </div>


                <Form
                    className="add-to-studio"
                    onSubmit={onSubmit}
                >
                    <FlexRow className="action-buttons">
                        <Button
                            className="action-button close-button white"
                            key="closeButton"
                            name="closeButton"
                            type="button"
                            onClick={onRequestClose}
                        >
                            <div className="action-button-text">
                                <FormattedMessage id="general.close" />
                            </div>
                        </Button>
                        {waitingToClose ? [
                            <Button
                                className="action-button submit-button submit-button-waiting"
                                disabled="disabled"
                                key="submitButton"
                                type="submit"
                            >
                                <div className="action-button-text">
                                    <Spinner />
                                    <FormattedMessage id="addToStudio.finishing" />
                                </div>
                            </Button>
                        ] : [
                            <Button
                                className="action-button submit-button"
                                key="submitButton"
                                type="submit"
                            >
                                <div className="action-button-text">
                                    <FormattedMessage id="general.okay" />
                                </div>
                            </Button>
                        ]}
                    </FlexRow>
                </Form>
            </div>
        </Modal>
    );
};

AddToStudioModalPresentation.propTypes = {
    intl: intlShape,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onSubmit: PropTypes.func,
    onToggleStudio: PropTypes.func,
    studios: PropTypes.arrayOf(PropTypes.object),
    waitingToClose: PropTypes.bool
};

module.exports = injectIntl(AddToStudioModalPresentation);
