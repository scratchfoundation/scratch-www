var classNames = require('classnames');
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
        var classes = classNames(
            'hoc-event',
            this.props.className
        );
        return (
            <div
                className={classes}
                style={{
                    minHeight: this.props.minHeight
                }}
            >
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
                    <h1 className="hoc-event-studio-h1">
                        <FormattedMessage id="hocevent.title" />
                    </h1>
                    <a href="/studios/3910789/" className="button mod-aqua mod-hoc-event">
                        <FormattedMessage id="hocevent.studioLink" />
                    </a>
                </FlexRow>
            </div>
        );
    }
});

module.exports = HocEventRow;
