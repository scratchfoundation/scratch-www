const bindAll = require('lodash.bindall');
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

class AddToStudioModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [ // NOTE: will need to add and bind callback fn to handle addind and removing studios
            'handleRequestClose',
            'handleSubmit'
        ]);
        // NOTE: get real data
        this.studios = [{name: 'Funny games', id: 1}, {name: 'Silly ideas', id: 2}];
        this.state = {
            waiting: false
        };
    }
    handleRequestClose () {
        this.baseModal.handleRequestClose();
    }
    handleSubmit (formData) {
        this.setState({waiting: true});
        this.props.onAddToStudio(formData, err => {
            if (err) log.error(err);
            this.setState({
                waiting: false
            });
        });
    }
    render () {
        const {
            intl,
            onAddToStudio, // eslint-disable-line no-unused-vars
            type,
            ...modalProps
        } = this.props;
        const contentLabel = intl.formatMessage({id: `addToStudio.${type}`});
        const studioButtons = this.studios.map((item, key) => (
            <div className="studio-selector-button">
              item here
            </div>
            // const href = `/studio/${item.id}/`;
            // <div className="studio-selector-button">
            // {item.name}
            // href: {href}
            // </div>
        ));

        return (
            <Modal
                className="mod-addToStudio"
                contentLabel={contentLabel}
                ref={component => { // bind to base modal, to pass handleRequestClose through
                    this.baseModal = component;
                }}
                {...modalProps}
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
                                    <FormattedMessage id="general.close" />
                                </Button>
                                {this.state.addToStudioWaiting ? [
                                    <Button
                                        className="action-button submit-button"
                                        disabled="disabled"
                                        key="submitButton"
                                        type="submit"
                                    >
                                        <Spinner />
                                    </Button>
                                ] : [
                                    <Button
                                        className="action-button submit-button"
                                        key="submitButton"
                                        type="submit"
                                    >
                                        <FormattedMessage id="general.okay" />
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

AddToStudioModal.propTypes = {
    intl: intlShape,
    onAddToStudio: PropTypes.func,
    onRequestClose: PropTypes.func,
    type: PropTypes.string
};

module.exports = injectIntl(AddToStudioModal);
