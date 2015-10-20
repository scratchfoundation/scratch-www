var React = require('react');
var ReactIntl = require('react-intl');
var defineMessages = ReactIntl.defineMessages;
var injectIntl = ReactIntl.injectIntl;

var Box = require('../box/box.jsx');

require('./news.scss');

var defaultMessages = defineMessages({
    scratchNews: {
        id: 'news.scratchNews',
        defaultMessage: 'Scratch News'
    },
    viewAll: {
        id: 'general.viewAll',
        defaultMessage: 'View All'
    }
});

var News = React.createClass({
    type: 'News',
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./news.json')
        };
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        return (
            <Box
                className="news"
                title={formatMessage(defaultMessages.scratchNews)}
                moreTitle={formatMessage(defaultMessages.viewAll)}
                moreHref="/news">

                <ul>
                    {this.props.items.map(function (item) {
                        return (
                            <li key={item.id}>
                                <a href={item.url}>
                                    <img src={item.image} width="53" height="53" />
                                    <h4>{item.headline}</h4>
                                    <p>{item.copy}</p>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </Box>
        );
    }
});

module.exports = injectIntl(News);
