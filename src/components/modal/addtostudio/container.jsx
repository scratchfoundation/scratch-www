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
const AddToStudioModalPresentation = require('presentation.jsx');
const RequestStatus = require('').intlShape;

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
            studioState: {},
        };
    }

    componentDidMount() {
        this.updateStudioState(this.props.projectStudios, this.props.curatedStudios);
    }

    componentWillReceiveProps(nextProps) {
        this.updateStudioState(nextProps.projectStudios, nextProps.curatedStudios);
    }

    updateStudioState(projectStudios, curatedStudios) {
        // can't just use the spread operator here, because we may have
        // project studios removed from the list.
        // NOTE: This isn't handling the removal of a studio from the list well.

        // can't build it from scratch, because needs transitional state
        let studioState = Object.assign({}, this.state.studioState);

        // remove all states that are not in transition
        for (let id in studioState) {
          if (studioState[id] === AddToStudioModalPresentation.State.IN
              || studioState[id] === AddToStudioModalPresentation.State.OUT) {
                  delete studioState[id];
              }
        }
        // for all studios with no state, either because they weren't transitional
        // or they're new, start them with state OUT
        curatedStudios.forEach((curatedStudio) => {
            if (!(curatedStudio.id in studioState)) {
                studioState[curatedStudio.id] = AddToStudioModalPresentation.State.OUT
            }
        });
        // nests which all states to in for studios this project is in
        projectStudios.forEach((joinedStudio) => {
            studioState[joinedStudio.id] = AddToStudioModalPresentation.State.IN
        });
        // NOTE: do I really need this assign? I took it out
        this.setState({studioState: studioState});
    }

    handleToggle(studioId) {
        if (studioId in this.state.studioState) {
            const studioState = this.state.studioState[studioId];
            // ignore clicks on studio buttons that are still waiting for response
            if (studioState === AddToStudioModalPresentation.State.IN) {
                this.props.onToggleStudio(studioId, false)
            } elseif (studioState === AddToStudioModalPresentation.State.OUT) {
                this.props.onToggleStudio(studioId, true)
            }
        } else {
            // NOTE: error
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
            curatedStudios,
            isOpen,
            onRequestClose
        } = this.props;

        return (
          <AddToStudioModalPresentation
              studios={curatedStudios}
              studioState={this.state.studioState}
              isOpen={isOpen}
              onToggleStudio={handleToggle}
          />
        );
    }
}

AddToStudioModal.propTypes = {
    projectStudios: PropTypes.arrayOf(PropTypes.object),
    curatedStudios: PropTypes.arrayOf(PropTypes.object),
    studioRequests: PropTypes.object,
    onToggleStudio: PropTypes.func,
    onRequestClose: PropTypes.func
};
