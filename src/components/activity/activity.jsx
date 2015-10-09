var React = require('react');

var Box = require('../box/box.jsx');
var Format = require('../../lib/format.js');

require('./activity.scss');

var Activity = React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./activity.json')
        };
    },
    render: function () {
        return (
            <Box
                className="activity"
                title="What's Happening?">

                <ul>
                    {this.props.items.map(function (item) {
                        return (
                            <li key={item.id}>
                                <a href={item.url}>
                                    <img src={item.author.avatar} width="34" height="34" />
                                    <p>{item.author.username} {item.message}</p>
                                    <p><span className="stamp">{Format.date(item.stamp)}</span></p>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </Box>
        );
    }
});

module.exports = Activity;
