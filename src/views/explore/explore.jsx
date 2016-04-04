var injectIntl = require('react-intl').injectIntl;
var classNames = require('classnames');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var render = require('../../lib/render.jsx');

var Api = require('../../mixins/api.jsx');

var Page = require('../../components/page/page.jsx');
var Button = require('../../components/forms/button.jsx');
var Box = require('../../components/box/box.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Select = require('../../components/forms/select.jsx');
var offset = 0;
var more = [];
var tab = "all";
var acceptableTabs = ["all","animations","art","games","music","stories"];

require('./explore.scss');

var Explore = injectIntl(React.createClass({
    type: 'Explore',
    mixins: [
        Api
    ],
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var pathname = window.location.pathname
        if (pathname.substring(pathname.length-1,pathname.length)=="/") {
            pathname = pathname.substring(0,pathname.length-1);
        };
        var slash = pathname.lastIndexOf("/");
        tab = pathname.substring(slash+1,pathname.length).toLowerCase();
        if (acceptableTabs.indexOf(tab)==-1) {
            window.location=window.location.origin+"/explore/projects/all/";
        }
        this.getExploreAll(0);
    },
    getExploreAll: function () {
        var tabText = '';
        if (tab!="all") {
            tabText = "&q="+tab;
        };
        this.api({
            uri: '/search/projects?limit=16'+tabText
        }, function (err, body) {
            if (!err) this.setState({exploreAll: body});
        }.bind(this));
    },
    getExploreMore: function () {
        var tabText = '';
        if (tab!="all") {
            tabText = "&q="+tab;
        };
        offset+=16;
        this.api({
            uri: '/search/projects?limit=16&offset='+offset+tabText
        }, function (err, body) {
            if (!err) this.setState({exploreMore: body});
        }.bind(this));
    },
    renderRows: function () {
        var row2 = this.state.exploreAll;
        var row3 = this.state.exploreAll;
        var row4 = this.state.exploreAll;
        if (row2!=undefined) {
            row2 = row2.slice(4,8);
            row3 = row3.slice(8,12);
            row4 = row4.slice(12,16);
        }
        var rows = [
                    <Carousel items={this.state.exploreAll} 
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={row2} 
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={row3} 
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={row4} 
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
        ]
        if (this.state.exploreMore!=undefined && more.length<offset) more = more.concat(this.state.exploreMore);
        if (more.length>0) {
            for (var i = 0; i<more.length; i+=4) {
                var rowNext = more.slice(i,i+4);
                rows.push(<Carousel items={rowNext} settings={{slidesToShow: 4, slidesToScroll: 0}} />);
            }
        }
        return rows;
    },
    getTab: function(type) {
        var allTab = <a href={"/explore/projects/"+type+"/"}>
                        <li>
                            <FormattedMessage
                                id={'explore.'+type}
                                defaultMessage={type.charAt(0).toUpperCase()+type.slice(1)} />
                        </li>
                    </a>;
        if (tab==type) {
            allTab = <a href={"/explore/projects/"+type+"/"}>
                        <li className="active">
                            <FormattedMessage
                                id={'explore.'+type}
                                defaultMessage={type.charAt(0).toUpperCase()+type.slice(1)} />
                        </li>
                    </a>;
        }
        return allTab
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
                        <SubNavigation className="tabs">
                            {this.getTab("all")}
                            {this.getTab("animations")}
                            {this.getTab("art")}
                            {this.getTab("games")}
                            {this.getTab("music")}
                            {this.getTab("stories")}
                            {/*<div id="sorter">
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
                            </div> \\can be reused in the future if different sorts are added*/}
                        </SubNavigation>
                        <div id="projectBox" key="projectBox">
                            {projects}
                            <SubNavigation className="load">
                                <button onClick={this.getExploreMore}>
                                    <li>
                                        <FormattedMessage
                                            id='load'
                                            defaultMessage={'Load More'} />
                                    </li>
                                </button>
                            </SubNavigation>
                        </div>
                    </Box>
                </div>
            </div>

        );
    }
}));

render(<Page><Explore /></Page>, document.getElementById('app'));
