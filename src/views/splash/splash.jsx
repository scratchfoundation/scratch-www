var React = require('react');

var Api = require('../../mixins/api.jsx');
var Session = require('../../mixins/session.jsx');

var Box = require('../../components/box/box.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Intro = require('../../components/intro/intro.jsx');
var News = require('../../components/news/news.jsx');

require('./splash.scss');

var View = React.createClass({
    mixins: [
        Api,
        Session
    ],
    getInitialState: function () {
        return {
            projectCount: 10569070,
            activity: [],
            news: [],
            featured: require('./featured.json')
        };
    },
    componentDidMount: function () {
        // @todo API request for News
        // @todo API request for Activity
        // @todo API request for Featured
    },
    render: function () {
        return (
            <div className="inner">
                <Intro projectCount={this.state.projectCount} />
                <div className="activity"></div>
                <News />
                {this.state.featured.map(function (set) {
                    return (
                        <Box
                            className="featured"
                            title={set.title}>
                            <Carousel items={set.items} />
                        </Box>
                    );
                })}
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
