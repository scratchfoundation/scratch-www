// NOTE: next questions:
// * what is the lifecycle of the getStudios etc. requests? Are they guaranteed to be there
//   on page load? Are they ever updated, e.g. after you join one?
// * should we treat "waiting" to mean, user has requested the modal to be closed;
//   that is, if you click ok and it's waiting for responses, then you click x,
//   it closes and sets waiting to false?
//   then in the checkForOutstandingUpdates function, we close the window
//   iff waiting is true.
//   that avoids the situation where you close the window while a request is
//   outstanding, then reopen it only to have it instantly close on you.
// * should the button to submit instantly? By clicking away shouldn't effectively undo what you thought you did.
// * should it really be pinned on the page? Isn't that something you're trying to move away from?
// * is it ok for me to make the spinner bigger and higher-radius-as-percent? (just for modal)
// *
// *
// plan:
// * change joined to updateQueued = {[id]: {updateType: ['join':'leave']}, ...}
// * also maintain second hash, joined = {[id]: true, ...}
// in render, use joined to set color, and if queued, use spinner for icon.
//

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

        // NOTE: need to:
        // construct hash of inclusion status by id, populate it.
        // replace mystudios with list of studios ordered by
        // membership/stats/name. use that for rendering.
        // returning: provide the hash to handlesubmit. or
        // maybe i should calculate delta here? if studio was
        // left elsewhere and that status was not changed here,
        // prolly didn't want to be changed!

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
        // NOTE: in theory, myStudios could have dropped some studios in
        // joined, so we should check all existing joined and drop
        // them too; otherwise we might retain a dirty change for a studio
        // we no longer have permission for. In theory.

        let joined = Object.assign({}, this.state.joined);
        projectStudios.forEach((studio) => {
            joined[studio.id] = true;
        });
        console.log(projectStudios);
        console.log(joined);
        if (!this.deepCompare(joined, this.state.joined)) {
            this.setState({joined: Object.assign({}, joined)});
        }
    }

    deepCompare(obj1, obj2) {
        //Loop through properties in object 1
        for (var p in obj1) {
            //Check property exists on both objects
            if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

            switch (typeof (obj1[p])) {
                //Deep compare objects
                case 'object':
                    if (!this.deepCompare(obj1[p], obj2[p])) return false;
                    break;
                //Compare values
                default:
                    if (obj1[p] != obj2[p]) return false;
            }
        }

        //Check object 2 for any extra properties
        for (var p in obj2) {
            if (typeof (obj1[p]) == 'undefined') return false;
        }
        return true;
    };

    handleToggle(studioId) {
        const joined = this.state.joined;
        let updateQueued = this.state.updateQueued;
        if (studioId in joined) { // so we want to leave the studio...
            if (studioId in updateQueued) {
                // we've already requested it... should we request again??
            } else { // need to request it...
                console.log("queueing leave request from studio: " + studioId);
                updateQueued[studioId] = {updateType: 'leave'};
                // NOTE: this should work with regular updateQueued, not object.assign, right?
                // test it...
                this.setState({updateQueued: Object.assign({}, updateQueued)});
            }
        } else { // we want to join
            if (studioId in updateQueued) {
                // we've already requested it... should we request again??
            } else { // need to request it...
                console.log("queueing join request to studio: " + studioId);
                updateQueued[studioId] = {updateType: 'join'};
                this.setState({updateQueued: Object.assign({}, updateQueued)});
            }
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
            myStudios,
            onAddToStudio, // eslint-disable-line no-unused-vars
            type,
            ...modalProps
        } = this.props;
        const joined = this.state.joined;
        const updateQueued = this.state.updateQueued;
        const contentLabel = intl.formatMessage({id: `addToStudio.${type}`});
        const studioButtons = myStudios.map((studio, index) => {
            const isAdded = (studio.id in joined);
            const isWaiting = (studio.id in updateQueued);
            return (
                <div className={"studio-selector-button" +
                    (isAdded ? " studio-selector-button-selected" : "")}
                    key={studio.id}
                    onClick={() => this.handleToggle(studio.id)}
                >
                    <div className="studio-selector-button-text">
                        {truncate(studio.title, {'length': 20, 'separator': /[,:\.;]*\s+/})}
                    </div>
                    <div className={"studio-status-icon" +
                        (isAdded ? " studio-status-icon-selected" : "")}
                    >
                        {isWaiting ? (<Spinner />) : (isAdded ? "✓" : "+")}
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
    myStudios: PropTypes.arrayOf(PropTypes.object),
    onAddToStudio: PropTypes.func,
    onRequestClose: PropTypes.func,
    type: PropTypes.string
};

module.exports = injectIntl(AddToStudioModal);
