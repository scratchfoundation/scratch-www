var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var Button = require('../../../components/forms/button.jsx');
var FlexRow = require('../../../components/flex-row/flex-row.jsx');

require('./hoc-event-row.scss');

var HocEventRow = React.createClass({
    type: 'HocEventRow',
    propTypes: {
        onDismiss: React.PropTypes.func
    },
    render: function () {
        return (
            <div className="hoc-event">
                <Button
                    className="mod-hoc-event-dismiss"
                    onClick={this.props.onDismiss}
                >
                    <FormattedMessage id="hocevent.dismiss" />
                    <img
                        className="hoc-event-dismiss-icon"
                        src="/svgs/modal/close-x.svg"
                        alt="close-icon"
                    />
                </Button>
                <FlexRow className="mod-hoc-event">
                    <div className="hoc-event-studio">
                        <h1 className="hoc-event-studio-h1">
                            <FormattedMessage id="hocevent.title" />
                        </h1>
                        <a href="/" className="button white mod-hoc-event">
                            <FormattedMessage id="hocevent.studioLink" />
                        </a>
                    </div>
                    <div className="hoc-event-video">
                        <iframe
                            className="hoc-event-video-iframe"
                            title="Design a Character Studio"
                            src=""
                            frameborder="0"
                            webkitAllowFullScreen
                            mozallowfullscreen
                            allowFullScreen
                        />
                    </div>
                </FlexRow>
            </div>
        );
    }
});

module.exports = HocEventRow;
