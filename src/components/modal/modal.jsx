var React = require('react');
var Modal = require('react-modal');

require('./modal.scss');


module.exports = React.createClass({
    statics: {
        setAppElement: Modal.setAppElement
    },
    requestClose: function () {
        return this.refs.modal.portal.requestClose();
    },
    render: function () {
        return (
            <Modal ref='modal' {... this.props}>
                <div className='modal-close' onClick={this.requestClose}></div>
                {this.props.children}
            </Modal>
        );
    }
});
