// NOTE: next questions:
// * what is the lifecycle of the getStudios etc. requests? Are they guaranteed to be there
//   on page load? Are they ever updated, e.g. after you join one?

// design decisions:
// * we should treat "waiting" to mean, user has requested the modal to be closed;
//   that is, if you click ok and it's waiting for responses, then you click x,
//   it closes and sets waiting to false?
//   then in the checkForOutstandingUpdates function, we close the window
//   iff waiting is true.
//   that avoids the situation where you close the window while a request is
//   outstanding, then reopen it only to have it instantly close on you.
// * keep the okay button, it sets up an overall spinner until everything is resolved
// * but you can totally close the window regardless

// sample data:
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
            'handleToggle',
            'handleRequestClose',
            'handleSubmit'
        ]);

        // NOTE: need to:
        // construct hash of inclusion status by id, populate it.
        // replace curatedStudios with list of studios ordered by
        // membership/stats/name. use that for rendering.
        this.state = {
            waitingToClose: false,
            joined: {},
            updateQueued: {}
        };
    }

    componentDidMount() {
        this.updateJoined(this.props.projectStudios);
    }

    componentWillReceiveProps(nextProps) {
        this.updateJoined(nextProps.projectStudios);
    }

    updateJoined(projectStudios) {
        // projectStudios could have dropped some studios since the last time
        // we traveresd it, so we should build the joined state object
        // from scratch.

        // can't just use the spread operator here, because we may have
        // project studios removed from the list.
        let joined = Object.assign({}, this.state.joined);
        projectStudios.forEach((studio) => {
            joined[studio.id] = true;
        });
        this.setState({joined: Object.assign({}, joined)});
    }

    requestJoinStudio(studioId) {
        // submit here? or through presentation?
    }
    requestLeaveStudio(studioId) {
        // submit here? or through presentation?
    }

    handleToggle(studioId) {
        const joined = this.state.joined;
        const updateQueued = this.state.updateQueued;
        console.log(updateQueued)
        if (!(studioId in updateQueued)) { // we haven't requested it yet...
            const updateType = (studioId in joined) ? 'leave' : 'join';
            console.log("queueing " + updateType + " request for studio: " + studioId);
            this.setState(prevState => ({
                updateQueued: {
                    ...prevState.updateQueued,
                    [studioId]: {updateType: updateType}
                }
            }), () => { // callback
                // submit request to server

                if (updateType === 'join') {
                    this.requestJoinStudio(studioId);
                } else {
                    this.requestLeaveStudio(studioId);
                }
            });
        }
    }

    // we need to separately handle
    // server responses to our update requests,
    // and after each one, check to see if there are no outstanding updates
    // queued.
    checkForOutstandingUpdates () {
        const updateQueued = this.state.updateQueued;
        if (Object.keys(updateQueued).length == 0) {
            setTimeout(function() {
                this.setState({waitingToClose: false}, () => {
                    this.handleRequestClose();
                });
            }.bind(this), 3000);
        }
    }

    handleRequestClose () {
        // NOTE that we do NOT clear joined, so we don't lose
        // user's work from a stray click outside the modal...
        // but maybe this should be different?
        this.baseModal.handleRequestClose();
    }
    handleSubmit (formData) {
        // NOTE:For this approach to work, we need to separately handle
        // server responses to our update requests,
        // and after each one, check to see if there are no outstanding updates
        // queued.
        this.setState({waitingToClose: true}, () => {
            this.checkForOutstandingUpdates();
        });
    }
    render () {
        const {
            intl,
            projectStudios,
            curatedStudios,
            onAddToStudio, // eslint-disable-line no-unused-vars
            type,
            isOpen,
            onRequestClose
        } = this.props;
        const joined = this.state.joined;
        const updateQueued = this.state.updateQueued;
        const contentLabel = intl.formatMessage({id: `addToStudio.${type}`});
        const checkmark = <img alt="checkmark-icon"
                           className="studio-status-icon-checkmark-img"
                           src="/svgs/modal/confirm.svg"
                          />
        const plus = <img alt="plus-icon"
                      className="studio-status-icon-plus-img"
                      src="/svgs/modal/add.svg"
                     />
        const studioButtons = curatedStudios.map((studio, index) => {
            const isAdded = (studio.id in joined);
            const isWaiting = (studio.id in updateQueued);
            return (
                <div className={"studio-selector-button " +
                    (isWaiting ? "studio-selector-button-waiting" :
                    (isAdded ? "studio-selector-button-selected" : ""))}
                    key={studio.id}
                    onClick={() => this.handleToggle(studio.id)}
                >
                    <div className={"studio-selector-button-text " +
                        ((isWaiting || isAdded) ? "studio-selector-button-text-selected" :
                        ".studio-selector-button-text-unselected")}>
                        {truncate(studio.title, {'length': 20, 'separator': /[,:\.;]*\s+/})}
                    </div>
                    <div className={"studio-status-icon" +
                        ((isWaiting || isAdded) ? "" : " studio-status-icon-unselected")}
                    >
                        {isWaiting ? (<Spinner type="smooth" />) : (isAdded ? checkmark : plus)}
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
                onRequestClose={onRequestClose}
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
                                        className="action-button submit-button"
                                        disabled="disabled"
                                        key="submitButton"
                                        type="submit"
                                    >
                                        <div className="action-button-text">
                                            <Spinner />
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

AddToStudioModal.propTypes = {
    intl: intlShape,
    projectStudios: PropTypes.arrayOf(PropTypes.object),
    curatedStudios: PropTypes.arrayOf(PropTypes.object),
    onAddToStudio: PropTypes.func,
    onRequestClose: PropTypes.func,
    type: PropTypes.string
};

module.exports = injectIntl(AddToStudioModal);
