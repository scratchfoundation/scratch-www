var React = require('react');

require('./news.scss');

module.exports = React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: [
                {
                    id: 1,
                    headline: 'Woo! Pizza party!',
                    copy: 'Lorem ipsum dolor sit amet.'
                }
            ]
        };
    },
    render: function () {
        return (
            <div className="news">
                <h1>News</h1>
                <ul>
                    {this.props.items.map(function (item) {
                        return (
                            <li key={item.id}>
                                <h4>{item.headline}</h4>
                                <p>{item.copy}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});
