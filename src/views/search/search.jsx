var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var connect = require('react-redux').connect;
var render = require('../../lib/render.jsx');

var api = require('../../lib/api');

var Page = require('../../components/page/www/page.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');
var Button = require('../../components/forms/button.jsx');
var Tabs = require('../../components/tabs/tabs.jsx');
var Grid = require('../../components/grid/grid.jsx');
var navigationActions = require('../../redux/navigation.js');

require('./search.scss');

// @todo migrate to React-Router once available
var Search = injectIntl(React.createClass({
    type: 'Search',
    getDefaultProps: function () {
        var pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        var start = pathname.lastIndexOf('/');
        var type = pathname.substring(start + 1, pathname.length);
        return {
            tab: type,
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
        var query = window.location.search;
        var q = query.lastIndexOf('q=');
        var term = '';
        if (q !== -1) {
            term = query.substring(q + 2, query.length).toLowerCase();
        }
        while (term.indexOf('/') > -1) {
            term = term.substring(0, term.indexOf('/'));
        }
        while (term.indexOf('&') > -1) {
            term = term.substring(0, term.indexOf('&'));
        }
        term = decodeURI(term.split('+').join(' '));
        this.props.dispatch(navigationActions.setSearchTerm(term));
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.searchTerm !== prevProps.searchTerm) this.getSearchMore();
    },
    getSearchMore: function () {
        var termText = '';
        if (this.props.searchTerm !== '') {
            termText = '&q=' + encodeURIComponent(this.props.searchTerm.split(' ').join('+'));
        }
        api({
            uri: '/search/' + this.props.tab +
                 '?limit=' + this.props.loadNumber +
                 '&offset=' + this.state.offset +
                 '&language=' + this.props.intl.locale +
                 '&mode=popular' +
                 termText
        }, function (err, body) {
            var loadedSoFar = this.state.loaded;
            Array.prototype.push.apply(loadedSoFar, body);
            this.setState({loaded: loadedSoFar});
            var currentOffset = this.state.offset + this.props.loadNumber;
            this.setState({offset: currentOffset});
        }.bind(this));
    },
    onSearchSubmit: function (formData) {
        window.location.href = '/search/projects?q=' + encodeURIComponent(formData.q);
    },
    getTab: function (type) {
        var term = this.props.searchTerm.split(' ').join('+');
        var allTab = <a href={'/search/' + type + '?q=' + term + '/'}>
                        <li>
                            <img src={'/svgs/tabs/' + type + '-inactive.svg'} className={'tab-icon ' + type} />
                            <FormattedMessage id={'general.' + type} />
                        </li>
                    </a>;
        if (this.props.tab == type) {
            allTab = <a href={'/search/' + type + '?q=' + term + '/'}>
                        <li className='active'>
                            <img src={'/svgs/tabs/' + type + '-active.svg'} className={'tab-icon ' + type} />
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
                        <TitleBanner className="masthead">
                            <div className="inner">
                                <h1 className="title-banner-h1"><FormattedMessage id="general.search" /></h1>
                            </div>
                        </TitleBanner>
                        <Tabs>
                            {this.getTab('projects')}
                            {this.getTab('studios')}
                        </Tabs>
                        <div id='projectBox' key='projectBox'>
                        <Grid items={this.state.loaded}
                              itemType={this.props.tab}
                              cards={true}
                              showAvatar={true}
                              showLoves={false}
                              showFavorites={false}
                              showViews={false} />
                         <Button onClick={this.getSearchMore} className="white">
                            <FormattedMessage id='general.loadMore' />
                        </Button>
                        </div>
                </div>
            </div>
        );
    }
}));

var mapStateToProps = function (state) {
    return {
        searchTerm: state.navigation
    };
};

var ConnectedSearch = connect(mapStateToProps)(Search);

render(<Page><ConnectedSearch /></Page>, document.getElementById('app'));
