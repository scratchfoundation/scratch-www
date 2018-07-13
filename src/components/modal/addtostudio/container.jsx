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
const log = require('../../../lib/log.js');

const Form = require('../../forms/form.jsx');
const Button = require('../../forms/button.jsx');
const Select = require('../../forms/select.jsx');
const Spinner = require('../../spinner/spinner.jsx');
const TextArea = require('../../forms/textarea.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
const AddToStudioModalPresentation = require('./presentation.jsx');
const previewActions = require('../../../redux/preview.js');

require('../../forms/button.scss');
require('./modal.scss');

class AddToStudioModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSubmit'
        ]);

        this.state = {
            waitingToClose: false
        };
    }

    componentWillUpdate (prevProps) {
        checkIfFinishedUpdating();
    }

    hasOutstandingUpdates () {
        return (studios.some(studio => (studio.hasRequestOutstanding === true)));
    }

    checkIfFinishedUpdating () {
        if (waitingToClose === true && hasOutstandingUpdates() === false) {
            this.setState({waitingToClose: false}, () => {
                this.props.onRequestClose();
            });
        }
    }

    handleSubmit (formData) {
        this.setState({waitingToClose: true}, () => {
            this.checkIfFinishedUpdating();
        });
    }

    render () {
        const {
            isOpen,
            studios,
            onToggleStudio,
            onRequestClose
        } = this.props;

        return (
          <AddToStudioModalPresentation
              studios={studios}
              isOpen={isOpen}
              onToggleStudio={onToggleStudio}
              onSubmit={handleSubmit}
          />
        );
    }
}

AddToStudioModal.propTypes = {
    isOpen: PropTypes.bool,
    studios: PropTypes.arrayOf(PropTypes.object),
    onToggleStudio: PropTypes.func,
    onRequestClose: PropTypes.func
};

module.exports = AddToStudioModalPresentation;
