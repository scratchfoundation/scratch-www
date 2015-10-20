var React = require('react');
var render = require('../../lib/render.jsx');

var Api = require('../../mixins/api.jsx');
var Session = require('../../mixins/session.jsx');

var Activity = require('../../components/activity/activity.jsx');
var AdminPanel = require('../../components/adminpanel/adminpanel.jsx');
var Box = require('../../components/box/box.jsx');
var Button = require('../../components/forms/button.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Intro = require('../../components/intro/intro.jsx');
var News = require('../../components/news/news.jsx');

require('./splash.scss');

var Splash = React.createClass({
    type: 'Splash',
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
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.session.user != prevState.session.user && this.state.session.user) {
            this.getNews();
            this.getActivity();
        }
    },
    componentDidMount: function () {
        if (this.state.session.user) {
            this.getNews();
            this.getActivity();
        }
        // @todo API request for Featured
    },
    getNews: function () {
        this.api({
            uri: '/news?limit=3'
        }, function (err, body) {
            if (!err) this.setState({'news': body});
        }.bind(this));
    },
    getActivity: function () {
        this.api({
            uri: '/proxy/users/' + this.state.session.user.username + '/activity?max=5'
        }, function (err, body) {
            if (!err) this.setState({'activity': body});
        }.bind(this));
    },
    render: function () {
        return (
            <div className="inner">
                {this.state.session.user ? [
                    <div key="header" className="splash-header">
                        <Activity items={this.state.activity} />
                        <News items={this.state.news} />
                    </div>
                ] : [
                    <Intro projectCount={this.state.projectCount} key="intro"/>
                ]}
                {this.state.featured.map(function (set) {
                    return (
                        <Box
                                key={set.title}
                                className="featured"
                                title={set.title}
                                moreTitle={set.moreTitle}
                                moreHref={set.moreHref}>
                            <Carousel items={set.items} />
                        </Box>
                    );
                })}
                <AdminPanel>
                    <dt>Tools</dt>
                    <dd>
                        <ul>
                            <li>
                                <a href="/scratch_admin/tickets">Ticket Queue</a>
                            </li>
                            <li>
                                <a href="/scratch_admin/ip-search/">IP Search</a>
                            </li>
                            <li>
                                <a href="/scratch_admin/email-search/">Email Search</a>
                            </li>
                        </ul>
                    </dd>
                    <dt>Homepage Cache</dt>
                    <dd>
                        <ul className="cache-list">
                            <li>
                                <form
                                    id="homepage-refresh-form"
                                    method="post"
                                    action="/scratch_admin/homepage/clear-cache/">
                                    
                                    <div className="button-row">
                                        <span>Refresh row data:</span>
                                        <Button type="submit">
                                            <span>Refresh</span>
                                        </Button>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </dd>
                </AdminPanel>
            </div>
        );
    }
});

render(<Splash />, document.getElementById('view'));
