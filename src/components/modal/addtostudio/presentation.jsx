const bindAll = require('lodash.bindall');
const truncate = require('lodash.truncate');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const Modal = require('../base/modal.jsx');
const log = require('../../../lib/log.js');

const Form = require('../../forms/form.jsx');
const Button = require('../../forms/button.jsx');
const Select = require('../../forms/select.jsx');
const Spinner = require('../../spinner/spinner.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const AddToStudioModalPresentation = ({
    isOpen,
    studios,
    waitingToClose,
    onToggleStudio,
    onRequestClose,
    onSubmit
}) => {
    const contentLabel = this.props.intl.formatMessage({id: "addToStudio.title"});
    const checkmark = <img alt="checkmark-icon"
                       className="studio-status-icon-checkmark-img"
                       src="/svgs/modal/confirm.svg"
                      />
    const plus = <img alt="plus-icon"
                  className="studio-status-icon-plus-img"
                  src="/svgs/modal/add.svg"
                 />
    const studioButtons = this.props.studios.map((studio, index) => {
        return (
            <div className={"studio-selector-button " +
                (studio.hasRequestOutstanding ? "studio-selector-button-waiting" :
                (studio.includesProject ? "studio-selector-button-selected" : ""))}
                key={studio.id}
                onClick={() => this.props.onToggleStudio(studio.id)}
            >
                <div className={"studio-selector-button-text " +
                    (studio.includesProject ? "studio-selector-button-text-selected" :
                    "studio-selector-button-text-unselected")}>
                    {truncate(studio.title, {'length': 20, 'separator': /[,:\.;]*\s+/})}
                </div>
                <div className={"studio-status-icon " +
                    (studio.includesProject ? "" : "studio-status-icon-unselected")}
                >
                    {(studio.hasRequestOutstanding ?
                    (<Spinner type="smooth" />) :
                    (studio.includesProject ? checkmark : plus))}
                </div>
            </div>
        );
    });

    return (
        <Modal
            className="mod-addToStudio"
            contentLabel={contentLabel}
            onRequestClose={this.props.onRequestClose}
            isOpen={this.props.isOpen}
        >
            <div>
                <div className="addToStudio-modal-header">
                    <div className="addToStudio-content-label">
                        {contentLabel}
                    </div>
                </div>
                <div className="addToStudio-modal-content">
                    <div className="studio-list-outer-scrollbox">
                        <div className="studio-list-inner-scrollbox">
                            <div className="studio-list-container">
                                {studioButtons}
                            </div>
                        </div>
                        <div className="studio-list-bottom-gradient">
                        </div>
                    </div>


                    <Form
                        className="add-to-studio"
                        onSubmit={this.props.onSubmit}
                    >
                        <FlexRow className="action-buttons">
                            <Button
                                className="action-button close-button white"
                                onClick={this.props.onRequestClose}
                                key="closeButton"
                                name="closeButton"
                                type="button"
                            >
                                <div className="action-button-text">
                                    <FormattedMessage id="general.close" />
                                </div>
                            </Button>
                            {this.props.waitingToClose ? [
                                <Button
                                    className="action-button submit-button submit-button-waiting"
                                    disabled="disabled"
                                    key="submitButton"
                                    type="submit"
                                >
                                    <div className="action-button-text">
                                        <Spinner type="smooth" />
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
            </div>
        </Modal>
    );
}

AddToStudioModalPresentation.propTypes = {
    intl: intlShape,
    isOpen: PropTypes.bool,
    studios: PropTypes.arrayOf(PropTypes.object),
    waitingToClose: PropTypes.bool,
    onToggleStudio: PropTypes.func,
    onRequestClose: PropTypes.func,
    onSubmit: PropTypes.func
};

module.exports = injectIntl(AddToStudioModalPresentation);
