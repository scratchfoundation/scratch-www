var defaults = require('lodash.defaults');
var omit = require('lodash.omit');
var React = require('react');
var ReactModal = require('react-modal');

require('./modal.scss');

var Modal = React.createClass({
    type: 'Modal',
    statics: {
        setAppElement: ReactModal.setAppElement,
        defaultFrameSettings: {
            width: 500,
            height: 250,
            padding: 0
        }
    },
    getDefaultProps: function () {
        return {
            frameSettings: null
        };
    },
    requestClose: function () {
        return this.refs.modal.portal.requestClose();
    },
    render: function () {
        var frameSettings = this.props.frameSettings;
        var style = this.props.style || {};
        defaults(style, {
            overlay: {
                zIndex: 100,
                backgroundColor: 'rgba(0, 0, 0, .75)'
            },
            content: {
                overflow: 'visible',
                borderRadius: '6px'
            }
        });
        var modalProps = omit(this.props, ['frameSettings', 'style']);
        if (frameSettings) {
            defaults(frameSettings, Modal.defaultFrameSettings);
            defaults(style.content, {
                top: '50%',
                right: 'auto',
                bottom: 'auto',
                left: '50%',
                marginTop: (frameSettings.height + 2*frameSettings.padding) / -2,
                marginLeft: (frameSettings.width + 2*frameSettings.padding) / -2,
                height: frameSettings.height,
                width: frameSettings.width,
                padding: frameSettings.padding
            });
        }
        return (
            <ReactModal ref="modal" style={style} {...modalProps}>
                <div className="modal-close" onClick={this.requestClose}></div>
                {this.props.children}
            </ReactModal>
        );
    }
});

module.exports = Modal;
