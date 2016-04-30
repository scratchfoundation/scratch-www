var injectIntl = require('react-intl').injectIntl;
var classNames = require('classnames');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var render = require('../../lib/render.jsx');

var Api = require('../../mixins/api.jsx');

var Page = require('../../components/page/www/page.jsx');
var Button = require('../../components/forms/button.jsx');
var Box = require('../../components/box/box.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var Tabs = require('../../components/tabs/tabs.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Select = require('../../components/forms/select.jsx');
var offset = 0;
var more = [];
var tab = "projects";
var searchTerm = "";

require('./search.scss');

var Search = injectIntl(React.createClass({
    type: 'Search',
    mixins: [
        Api
    ],
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var pathname = window.location.search;
        var q = pathname.lastIndexOf("q=");
        var and = pathname.indexOf("&");
        if (q!=-1 && and!=-1) {
            searchTerm = pathname.substring(q+2,and).toLowerCase();
        };
        searchTerm = searchTerm.split('+').join(' ');
        this.getSearchResults(0);
    },
    getSearchResults: function () {
        var termText = '';
        if (searchTerm!="") {
            termText = "&q="+searchTerm;
        };
        this.api({
            uri: '/search/projects?limit=16'+termText
        }, function (err, body) {
            if (!err) this.setState({searchResults: body});
        }.bind(this));
    },
    getSearchMore: function () {
        var termText = '';
        if (searchTerm!="") {
            termText = "&q="+searchTerm;
        };
        offset+=16;
        this.api({
            uri: '/search/projects?limit=16&offset='+offset+termText
        }, function (err, body) {
            if (!err) this.setState({searchMore: body});
        }.bind(this));
    },
    renderRows: function () {
        var row2 = this.state.searchResults;
        var row3 = this.state.searchResults;
        var row4 = this.state.searchResults;
        if (row2!=undefined) {
            row2 = row2.slice(4,8);
            row3 = row3.slice(8,12);
            row4 = row4.slice(12,16);
        }
        var rows = [
                    <Carousel items={this.state.searchResults} showLoves={true}
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={row2} showLoves={true}
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={row3} showLoves={true}
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
                    <Carousel items={row4} showLoves={true}
                              settings={{slidesToShow: 4, slidesToScroll: 0}} />,
        ]
        if (this.state.searchMore!=undefined && more.length<offset) more = more.concat(this.state.searchMore);
        if (more.length>0) {
            for (var i = 0; i<more.length; i+=4) {
                var rowNext = more.slice(i,i+4);
                rows.push(<Carousel items={rowNext} showLoves={true} settings={{slidesToShow: 4, slidesToScroll: 0}} />);
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
        return allTab;
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
                    <Box title={'Search Results:'} subtitle={searchTerm}
                         moreProps={{
                            className: 'subnavigation'
                         }}>
                        <Tabs>
                            {this.getTab("all")}
                            {this.getTab("projects")}
                            {this.getTab("studios")}
                            {this.getTab("forums")}
                            {this.getTab("users")}
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
                        </Tabs>
                        <div id="projectBox" key="projectBox">
                            {projects}
                            <SubNavigation className="load">
                                <button onClick={this.getSearchMore}>
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

render(<Page><Search /></Page>, document.getElementById('app'));
