var classNames = require('classnames');
var omit = require('lodash.omit');
var React = require('react');
var ReactModal = require('react-modal');

require('./modal.scss');

/**
 * Container for pop up windows (See: registration window)
 */
var Modal = React.createClass({
    type: 'Modal',
    statics: {
        setAppElement: ReactModal.setAppElement
    },
    propTypes: {
        className: React.PropTypes.string,
        overlayClassName: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            className: '',
            overlayClassName: ''
        };
    },
    requestClose: function () {
        return this.refs.modal.portal.requestClose();
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
        return (
            <ReactModal
                ref="modal"
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
