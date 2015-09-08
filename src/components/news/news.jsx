var React = require('react');

var Box = require('../box/box.jsx');

require('./news.scss');

module.exports = React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./news.json')
        };
    },
    render: function () {
        return (
            <Box 
                className="news" 
                title="Scratch News" 
                more="View All" 
                moreUrl="/news">
                
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
