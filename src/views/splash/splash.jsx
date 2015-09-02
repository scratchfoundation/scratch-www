var React = require('react');

var Api = require('../../mixins/api.jsx');
var News = require('../../components/news/news.jsx');

require('./splash.scss');

var View = React.createClass({
    mixins: [
        Api
    ],
    getInitialState: function () {
        return {
            news: []  
        };
    },
    componentDidMount: function () {
        // @todo API request for News
        // @todo API request for Activity
        // @todo API request for Featured
    },
    render: function () {
        return (
            <div>
                <h1>I am the splash page!</h1>
                <News />
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
