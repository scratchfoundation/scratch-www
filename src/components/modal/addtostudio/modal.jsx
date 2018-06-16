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

require('../../forms/button.scss');
require('./modal.scss');

class AddToStudioModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [ // NOTE: will need to add and bind callback fn to handle addind and removing studios
            'handleSubmit'
        ]);
        this.state = {
            prompt: props.intl.formatMessage({id: 'addToStudio.promptPlaceholder'}),
            reason: '',
            waiting: false
        };
    }
    handleSubmit (formData) {
        this.setState({waiting: true});
        this.props.onAddToStudio(formData, err => {
            if (err) log.error(err);
            this.setState({
                prompt: this.props.intl.formatMessage({id: 'addToStudio.promptPlaceholder'}),
                reason: '',
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
        return (
            <Modal
                className="mod-addToStudio"
                contentLabel={contentLabel}
                {...modalProps}
            >
                <div>
                    <div className="addToStudio-modal-header">
                        <div className="addToStudio-content-label">
                            {contentLabel}
                        </div>
                    </div>

                    <div className="addToStudio-modal-content">
                        <FormattedMessage
                            id={`addToStudio.${type}Instructions`}
                            values={{
                                CommunityGuidelinesLink: (
                                    <a href="/community_guidelines">
                                        <FormattedMessage id="addToStudio.CommunityGuidelinesLinkText" />
                                    </a>
                                )
                            }}
                        />
                        <Form
                            className="add-to-studio"
                            onSubmit={this.handleSubmit}
                        >
                            <TextArea
                                required
                                className="add-to-studio-text"
                                name="addToStudioText"
                                placeholder={this.state.prompt}
                                validationErrors={{
                                    maxLength: this.props.intl.formatMessage({id: 'addToStudio.tooLongError'}),
                                    minLength: this.props.intl.formatMessage({id: 'addToStudio.tooShortError'})
                                }}
                                validations={{
                                    // TODO find out max and min characters
                                    maxLength: 500,
                                    minLength: 30
                                }}
                            />
                            {this.state.addToStudioWaiting ? [
                                <Button
                                    className="submit-button white"
                                    disabled="disabled"
                                    key="submitButton"
                                    type="submit"
                                >
                                    <Spinner />
                                </Button>
                            ] : [
                                <Button
                                    className="submit-button white"
                                    key="submitButton"
                                    type="submit"
                                >
                                    <FormattedMessage id="addtostudio.okay" />
                                </Button>
                            ]}
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
