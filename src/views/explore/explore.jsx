var classNames = require('classnames');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var render = require('../../lib/render.jsx');

var Api = require('../../mixins/api.jsx');

var Button = require('../../components/forms/button.jsx');
var Box = require('../../components/box/box.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Select = require('../../components/forms/select.jsx');

require('./explore.scss');

var Explore = React.createClass({
    type: 'Explore',
    mixins: [
        Api
    ],
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        this.getExploreAll();
        window.map=this;
    },
    getExploreAll: function () {
        this.api({
            uri: '/search/projects'
        }, function (err, body) {
            if (!err) this.setState({exploreAll: body});
        }.bind(this));
    },
    renderRows: function () {
        var rows = [
                    <Carousel items={this.state.exploreAll} 
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={this.state.exploreAll} 
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={this.state.exploreAll} 
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={this.state.exploreAll} 
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
        ]
        return rows;
    },
    render: function () {
        var projects = this.renderRows();
        var classes = classNames(
            'top-banner',
            this.state.bgClass
        );
        return (
            <div>
                <div className="outer">
                    <Box title={'Explore'}
                         moreProps={{
                            className: 'subnavigation'
                         }}>
                        <SubNavigation>
                            <a href="/explore/projects/all/">
                                <li className="active">
                                    <FormattedMessage
                                        id='explore.all'
                                        defaultMessage={'All'} />
                                </li>
                            </a>
                            <a href="/explore/projects/animations/">
                                <li>
                                    <FormattedMessage
                                        id='explore.animations'
                                        defaultMessage={'Animations'} />
                                </li>
                            </a>
                            <a href="/explore/projects/art/">
                                <li>
                                    <FormattedMessage
                                        id='explore.art'
                                        defaultMessage={'Art'} />
                                </li>
                            </a>
                            <a href="/explore/projects/games/">
                                <li>
                                    <FormattedMessage
                                        id='explore.games'
                                        defaultMessage={'Games'} />
                                </li>
                            </a>
                            <a href="/explore/projects/music/">
                                <li>
                                    <FormattedMessage
                                        id='explore.music'
                                        defaultMessage={'Music'} />
                                </li>
                            </a>
                            <a href="/explore/projects/stories/">
                                <li>
                                    <FormattedMessage
                                        id='explore.stories'
                                        defaultMessage={'Stories'} />
                                </li>
                            </a>
                            <div id="sorter">
                                <div id="sortText">
                                    Sort by:
                                </div>
                                <Select name="sort" defaultValue="Magic">
                                    <option value="Magic" key="Magic">
                                        Magic
                                    </option>
                                    <option value="Top Loved" key="Top Loved">
                                        Top Loved
                                    </option>
                                    <option value="Top Viewed" key="Top Viewed">
                                        Top Viewed
                                    </option>
                                </Select>
                            </div>
                        </SubNavigation>
                        <div id="projectBox">
                            {projects}
                        </div>
                    </Box>
                </div>
            </div>

        );
    }
});

render(<Explore />, document.getElementById('view'));
