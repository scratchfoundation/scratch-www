var clone = require('lodash.clone');
var defaultsDeep = require('lodash.defaultsdeep');
var React = require('react');
var ReactModal = require('react-modal');

require('./modal.scss');

var defaultStyle = {
    overlay: {
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, .75)'
    },
    content: {
        overflow: 'visible',
        borderRadius: '6px',
        width: 500,
        height: 250,
        padding: 0,
        top: '50%',
        right: 'auto',
        bottom: 'auto',
        left: '50%',
        marginTop: -125,
        marginLeft: -250
    }
};

var Modal = React.createClass({
    type: 'Modal',
    statics: {
        setAppElement: ReactModal.setAppElement
    },
    getDefaultProps: function () {
        return {
            style: defaultStyle
        };
    },
    calculateStyle: function () {
        var style = clone(this.props.style, true);
        defaultsDeep(style, defaultStyle);
        style.content.marginTop = (style.content.height + style.content.padding*2) / -2;
        style.content.marginLeft = (style.content.width + style.content.padding*2) / -2;
        return style;
    },
    requestClose: function () {
        return this.refs.modal.portal.requestClose();
    },
    render: function () {
        return (
            <ReactModal ref="modal"
                        {...this.props}
                        style={this.calculateStyle()}>
                <div className="modal-close" onClick={this.requestClose}></div>
                {this.props.children}
            </ReactModal>
        );
    }
});

module.exports = Modal;
