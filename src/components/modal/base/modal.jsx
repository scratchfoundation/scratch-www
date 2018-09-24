const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');
const ReactModal = require('react-modal');

require('./modal.scss');

ReactModal.setAppElement(document.getElementById('app'));

/**
 * Container for pop up windows (See: registration window)
 */
class Modal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleRequestClose'
        ]);
    }
    handleRequestClose () {
        return this.modal.portal.requestClose();
    }
    render () {
        return (
            <ReactModal
                appElement={document.getElementById('app')}
                className={{
                    base: classNames('modal-content', this.props.className),
                    afterOpen: classNames('modal-content', this.props.className),
                    beforeClose: classNames('modal-content', this.props.className)
                }}
                overlayClassName={{
                    base: classNames('modal-overlay', this.props.overlayClassName),
                    afterOpen: classNames('modal-overlay', this.props.overlayClassName),
                    beforeClose: classNames('modal-overlay', this.props.overlayClassName)
                }}
                ref={component => {
                    this.modal = component;
                }}
                {...omit(this.props, ['className', 'overlayClassName'])}
            >
                <div
                    className="modal-content-close"
                    onClick={this.handleRequestClose}
                >
                    <img
                        alt="close-icon"
                        className="modal-content-close-img"
                        src="/svgs/modal/close-x.svg"
                    />
                </div>
                {this.props.children}
            </ReactModal>
        );
    }
}

Modal.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    overlayClassName: PropTypes.string
};

module.exports = Modal;
