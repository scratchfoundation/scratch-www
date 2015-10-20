var React = require('react');
var ReactModal = require('react-modal');

require('./modal.scss');


var Modal = React.createClass({
    type: 'Modal',
    statics: {
        setAppElement: ReactModal.setAppElement
    },
    requestClose: function () {
        return this.refs.modal.portal.requestClose();
    },
    render: function () {
        return (
            <ReactModal ref="modal" {... this.props}>
                <div className="modal-close" onClick={this.requestClose}></div>
                {this.props.children}
            </ReactModal>
        );
    }
});

module.exports = Modal;
