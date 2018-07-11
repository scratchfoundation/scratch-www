const keyMirror = require('keymirror');
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
const TextArea = require('../../forms/textarea.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');

require('../../forms/button.scss');
require('./modal.scss');

module.exports.State = keyMirror({
    IN: null,
    OUT: null,
    JOINING: null,
    LEAVING: null
});

class AddToStudioModalPresentation extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [ // NOTE: will need to add and bind callback fn to handle addind and removing studios
            'handleRequestClose',
            'handleSubmit'
        ]);

        // NOTE: need to:
        // construct hash of inclusion status by id, populate it.
        // replace curatedStudios with list of studios ordered by
        // membership/stats/name. use that for rendering.
        this.state = {
            waitingToClose: false,
            studios: props.studios
        };
    }

    handleRequestClose () {
        this.baseModal.handleRequestClose();
    }
    handleSubmit (formData) {
        this.props.handleSubmit(formData);
    }
    render () {
        // NOTE: how does intl get injected?
        const {
            intl,
            studios,
            onToggleStudio,
            isOpen
        } = this.props;
        const contentLabel = intl.formatMessage({id: "addToStudio.title"});
        const checkmark = <img alt="checkmark-icon"
                           className="studio-status-icon-checkmark-img"
                           src="/svgs/modal/confirm.svg"
                          />
        const plus = <img alt="plus-icon"
                      className="studio-status-icon-plus-img"
                      src="/svgs/modal/add.svg"
                     />
        const studioButtons = studios.map((studio, index) => {
            const thisStudioState = studioState[studio.id];
            return (
                <div className={"studio-selector-button " +
                    (thisStudioState === module.exports.State.JOINING ||
                    thisStudioState === module.exports.State.LEAVING) ?
                    "studio-selector-button-waiting" :
                    (thisStudioState === module.exports.State.IN ? "studio-selector-button-selected" : ""))}
                    key={studio.id}
                    onClick={() => this.props.onToggleStudio(studio.id)}
                >
                    <div className={"studio-selector-button-text " +
                        (thisStudioState === module.exports.State.OUT ?
                        "studio-selector-button-text-unselected" :
                        ".studio-selector-button-text-selected")}>
                        {truncate(studio.title, {'length': 20, 'separator': /[,:\.;]*\s+/})}
                    </div>
                    <div className={"studio-status-icon " +
                        (thisStudioState === module.exports.State.OUT ? "studio-status-icon-unselected" : "")}
                    >
                        {(thisStudioState === module.exports.State.JOINING ||
                        thisStudioState === module.exports.State.LEAVING) ?
                        (<Spinner type="smooth" />) :
                        (thisStudioState === module.exports.State.IN ? checkmark : plus)}
                    </div>
                </div>
            );
        });

        return (
            <Modal
                className="mod-addToStudio"
                contentLabel={contentLabel}
                ref={component => { // bind to base modal, to pass handleRequestClose through
                    this.baseModal = component;
                }}
                onRequestClose={this.props.onRequestClose}
                isOpen={isOpen}
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
                            onSubmit={this.handleSubmit}
                        >
                            <FlexRow className="action-buttons">
                                <Button
                                    className="action-button close-button white"
                                    onClick={this.handleRequestClose}
                                    key="closeButton"
                                    name="closeButton"
                                    type="button"
                                >
                                    <div className="action-button-text">
                                        <FormattedMessage id="general.close" />
                                    </div>
                                </Button>
                                {this.state.waitingToClose ? [
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
}

AddToStudioModalPresentation.propTypes = {
    intl: intlShape,
    studios: PropTypes.arrayOf(PropTypes.object),
    onAddToStudio: PropTypes.func,
    onRequestClose: PropTypes.func
};

module.exports = injectIntl(AddToStudioModalPresentation);
