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
        this.api({
            method: 'get',
            uri: 'https://gist.githubusercontent.com/thisandagain/4d62ac52b78f76e833bd/raw/a2f4a67ec16d980d2313f3645b30d22acc150d7a/news.json'
        }, function (err, body) {
            if (err) return;
            
            console.dir(JSON.parse(body));
            this.setState({
                news: JSON.parse(body)
            });
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <h1>I am the splash page!</h1>
                <News items={this.state.news} />
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
