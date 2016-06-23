var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var render = require('../../lib/render.jsx');

var api = require('../../lib/api');

var Page = require('../../components/page/www/page.jsx');
var Box = require('../../components/box/box.jsx');
var Tabs = require('../../components/tabs/tabs.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var Grid = require('../../components/grid/grid.jsx');

require('./explore.scss');

// @todo migrate to React-Router once available
var Explore = injectIntl(React.createClass({
    type: 'Explore',
    getDefaultProps: function () {
        var categoryOptions = ['all','animations','art','games','music','stories'];
        var typeOptions = ['projects','studios'];

        var pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        var slash = pathname.lastIndexOf('/');
        var currentCategory = pathname.substring(slash + 1,pathname.length);
        var typeStart = pathname.indexOf('explore/');
        var type = pathname.substring(typeStart + 8,slash);
        if (categoryOptions.indexOf(currentCategory) === -1 || typeOptions.indexOf(type) === -1) {
            window.location = window.location.origin + '/explore/projects/all/';
        }

        return {
            category: currentCategory,
            acceptableTabs: categoryOptions,
            acceptableTypes: typeOptions,
            itemType: type,
            loadNumber: 16
        };
    },
    getInitialState: function () {
        return {
            loaded: [],
            offset: 0
        };
    },
    componentDidMount: function () {
        this.getExploreMore();
    },
    getExploreMore: function () {
        var qText = '';
        if (this.props.tab != 'all') {
            qText = '&q=' + this.props.category;
        }
        api({
            uri: '/search/' + this.props.itemType +
                 '?limit=' + this.props.loadNumber +
                 '&offset=' + this.state.offset +
                 qText
        }, function (err, body) {
            if (!err) {
                var loadedSoFar = this.state.loaded;
                Array.prototype.push.apply(loadedSoFar,body);
                this.setState({loaded: loadedSoFar});
                var currentOffset = this.state.offset + this.props.loadNumber;
                this.setState({offset: currentOffset});
            }
        }.bind(this));
    },
    changeItemType: function () {
        var newType;
        for (var t in this.props.acceptableTypes) {
            if (this.props.itemType !== t) {
                newType = t;
                break;
            }
        }
        window.location = window.location.origin + '/explore/' + newType + '/' + this.props.tab;
    },
    getBubble: function (type) {
        var allBubble = <a href={'/explore/' + this.props.itemType + '/' + type + '/'}>
                        <li>
                            <FormattedMessage id={'general.' + type} />
                        </li>
                    </a>;
        if (this.props.category === type) {
            allBubble = <a href={'/explore/' + this.props.itemType+'/' + type + '/'}>
                        <li className='active'>
                            <FormattedMessage id={'general.' + type} />
                        </li>
                    </a>;
        }
        return allBubble;
    },
    getTab: function (type) {
        var allTab = <a href={'/explore/' + type + '/' + this.props.category + '/'}>
                        <li>
                            <FormattedMessage id={'general.' + type} />
                        </li>
                    </a>;
        if (this.props.itemType === type) {
            allTab = <a href={'/explore/' + type +' /' + this.props.category + '/'}>
                        <li className='active'>
                            <FormattedMessage id={'general.' + type} />
                        </li>
                    </a>;
        }
        return allTab;
    },
    render: function () {
        return (
            <div>
                <div className='outer'>
                    <Box title={'Explore'}>
                        <SubNavigation className='categories'>
                            {this.getBubble('all')}
                            {this.getBubble('animations')}
                            {this.getBubble('art')}
                            {this.getBubble('games')}
                            {this.getBubble('music')}
                            {this.getBubble('stories')}
                        </SubNavigation>
                        <Tabs>
                            {this.getTab('projects')}
                            {this.getTab('studios')}
                        </Tabs>
                        <div id='projectBox' key='projectBox'>
                            <Grid items={this.state.loaded}
                                  itemType={this.props.itemType}
                                  showLoves={true}
                                  showFavorites={true}
                                  showViews={true} />
                            <SubNavigation className='load'>
                                <button onClick={this.getExploreMore}>
                                    <li>
                                        <FormattedMessage id='general.loadMore' />
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
