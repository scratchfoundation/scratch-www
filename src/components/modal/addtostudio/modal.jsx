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

class AddToStudioModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [ // NOTE: will need to add and bind callback fn to handle addind and removing studios
            'handleRequestClose',
            'handleSubmit'
        ]);
        // NOTE: get real data
        // this.studios = [{name: 'Funny games', id: 1}, {name: 'Silly ideas', id: 2}];
        // studios data is like:
        // [{
        //   id: 1702295,
        //   description: "...",
        //   history: {created: "2015-11-15T00:24:35.000Z",
        //   modified: "2018-05-01T00:14:48.000Z"},
        //   image: "http....png",
        //   owner: 10689298,
        //   stats: {followers: 0},
        //   title: "Studio title"
        // }, {...}]
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
            projectStudios,
            myStudios,
            onAddToStudio, // eslint-disable-line no-unused-vars
            type,
            ...modalProps
        } = this.props;
        const contentLabel = intl.formatMessage({id: `addToStudio.${type}`});
        const projectStudioButtons = projectStudios.map((studio, index) => (
            <div className="studio-selector-button" key={studio.id}>
                {truncate(studio.title, {'length': 20, 'separator': /[,:\.;]*\s+/})}
            </div>
        ));
        const myStudioButtons = myStudios.map((studio, index) => (
            <div className="studio-selector-button" key={studio.id}>
                {truncate(studio.title, {'length': 20, 'separator': /[,:\.;]*\s+/})}
            </div>
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
                                    {[...projectStudioButtons,
                                    ...myStudioButtons]}
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
    projectStudios: PropTypes.arrayOf(PropTypes.object),
    myStudios: PropTypes.arrayOf(PropTypes.object),
    onAddToStudio: PropTypes.func,
    onRequestClose: PropTypes.func,
    type: PropTypes.string
};

module.exports = injectIntl(AddToStudioModal);
