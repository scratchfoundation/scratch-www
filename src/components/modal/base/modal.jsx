var classNames = require('classnames');
var omit = require('lodash.omit');
var React = require('react');
var ReactModal = require('react-modal');

require('./modal.scss');

ReactModal.setAppElement(document.getElementById('view'));

/**
 * Container for pop up windows (See: registration window)
 */
var Modal = React.createClass({
    type: 'Modal',
    propTypes: {
        className: React.PropTypes.string,
        overlayClassName: React.PropTypes.string
    },
    requestClose: function () {
        return this.modal.portal.requestClose();
    },
    render: function () {
        var modalClasses = classNames(
            'modal-content',
            this.props.className
        );
        var overlayClasses = classNames(
            'modal-overlay',
            this.props.overlayClassName
        );
        ReactModal.setAppElement(document.getElementById(this.props.appElementId));
        
        return (
            <ReactModal
                ref={
                    function (component) {
                        this.modal = component;
                    }.bind(this)
                }
                className={modalClasses}
                overlayClassName={overlayClasses}
                {...omit(this.props, ['className', 'overlayClassName'])}
            >
                <div className="modal-content-close" onClick={this.requestClose}>
                    <img
                        className="modal-content-close-img"
                        src="/svgs/modal/close-x.svg"
                        alt="close-icon"
                    />
                </div>
                {this.props.children}
            </ReactModal>
        );
    }
});

module.exports = Modal;
