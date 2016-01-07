var React = require('react');

var Box = require('../box/box.jsx');

require('./news.scss');

var News = React.createClass({
    type: 'News',
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./news.json'),
            messages: {
                'general.viewAll': 'View All',
                'news.scratchNews': 'Scratch News'
            }
        };
    },
    render: function () {
        return (
            <Box
                className="news"
                title={this.props.messages['news.scratchNews']}
                moreTitle={this.props.messages['general.viewAll']}
                moreHref="/discuss/5/">

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

module.exports = News;
