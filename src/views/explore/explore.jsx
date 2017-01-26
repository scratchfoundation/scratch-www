var classNames = require('classnames');
var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var render = require('../../lib/render.jsx');

var api = require('../../lib/api');

var Page = require('../../components/page/www/page.jsx');
var Tabs = require('../../components/tabs/tabs.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');
var Button = require('../../components/forms/button.jsx');
var Form = require('../../components/forms/form.jsx');
var Select = require('../../components/forms/select.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var Grid = require('../../components/grid/grid.jsx');

require('./explore.scss');

// @todo migrate to React-Router once available
var Explore = injectIntl(React.createClass({
    type: 'Explore',
    getDefaultProps: function () {
        var categoryOptions = {
            all: '*',
            animations: 'animations',
            art: 'art',
            games: 'games',
            music: 'music',
            stories: 'stories',
            tutorials: 'tutorial'
        };
        var typeOptions = ['projects','studios'];
        var modeOptions = ['trending', 'popular', 'recent', ''];

        var pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        var options = pathname.split('/');
        var type = options[2];
        var currentCategory = options[3];
        var currentMode = options.length > 4 ? options[4] : '';
        if (Object.keys(categoryOptions).indexOf(currentCategory) === -1 ||
        typeOptions.indexOf(type) === -1 ||
        modeOptions.indexOf(currentMode) === -1){
            window.location = window.location.origin + '/explore/projects/all/';
        }

        return {
            category: currentCategory,
            acceptableTabs: categoryOptions,
            acceptableTypes: typeOptions,
            acceptableModes: modeOptions,
            itemType: type,
            mode: currentMode,
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
        var qText = '&q=' + this.props.acceptableTabs[this.props.category] || '*';

        api({
            uri: '/search/' + this.props.itemType +
                 '?limit=' + this.props.loadNumber +
                 '&offset=' + this.state.offset +
                 '&language=' + this.props.intl.locale +
                 '&mode=' + (this.props.mode ? this.props.mode : 'trending') +
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
        window.location = window.location.origin + '/explore/' + newType + '/' + this.props.tab + '/' + this.props.mode;
    },
    changeSortMode: function (name, value) {
        if (this.props.acceptableModes.indexOf(value) !== -1) {
            window.location = window.location.origin + '/explore/' +
            this.props.itemType + '/' + this.props.category + '/' + value;
        }
    },
    getBubble: function (type) {
        var classes = classNames({
            active: (this.props.category === type)
        });
        return (
            <a href={'/explore/' + this.props.itemType + '/' + type + '/' + this.props.mode}>
                <li className={classes}>
                    <FormattedMessage id={'general.' + type} />
                </li>
            </a>
        );
    },
    getTab: function (type) {
        var classes = classNames({
            active: (this.props.itemType === type)
        });
        return (
            <a href={'/explore/' + type + '/' + this.props.category + '/' + this.props.mode}>
                <li className={classes}>
                    {this.props.itemType === type ? [
                        <img src={'/svgs/tabs/' + type + '-active.svg'} className={'tab-icon ' + type} />
                    ] : [
                        <img src={'/svgs/tabs/' + type + '-inactive.svg'} className={'tab-icon ' + type} />
                    ]}
                    <FormattedMessage id={'general.' + type} />
                </li>
            </a>
        );
    },
    render: function () {

        return (
            <div>
                <div className='outer'>
                    <TitleBanner className="masthead">
                        <div className="inner">
                            <h1>Explore</h1>
                        </div>
                    </TitleBanner>
                    <Tabs>
                        {this.getTab('projects')}
                        {this.getTab('studios')}
                    </Tabs>
                    <div className="sort-controls">
                        <SubNavigation className='categories'>
                            {this.getBubble('all')}
                            {this.getBubble('animations')}
                            {this.getBubble('art')}
                            {this.getBubble('games')}
                            {this.getBubble('music')}
                            {this.getBubble('stories')}
                            {this.getBubble('tutorials')}
                        </SubNavigation>
                        <Form className='sort-mode'>
                            <Select name="sort"
                                    options={[
                                        {value: 'trending', label: 'Trending'},
                                        {value: 'popular', label: 'Popular'},
                                        {value: 'recent', label: 'Recent'}
                                    ]}
                                    value={this.props.mode}
                                    onChange={this.changeSortMode}/>
                        </Form>
                    </div>
                    <div id='projectBox' key='projectBox'>
                        <Grid items={this.state.loaded}
                              itemType={this.props.itemType}
                              cards={true}
                              showLoves={false}
                              showFavorites={false}
                              showViews={false}
                              showAvatar={true}/>
                          <Button onClick={this.getExploreMore} className="white">
                            <FormattedMessage id='general.loadMore' />
                        </Button>
                    </div>
                </div>
            </div>

        );
    }
}));

render(<Page><Explore /></Page>, document.getElementById('app'));
