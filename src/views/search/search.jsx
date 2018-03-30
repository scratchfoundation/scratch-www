const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const Button = require('../../components/forms/button.jsx');
const Grid = require('../../components/grid/grid.jsx');
const navigationActions = require('../../redux/navigation.js');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const Tabs = require('../../components/tabs/tabs.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const Confetti = require('react-confetti').default;

const Scroll = require('react-scroll');
const scroll = Scroll.animateScroll;

require('./search.scss');

class Search extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getSearchState',
            'handleGetSearchMore',
            'getTab',
            'tick'
        ]);
        this.state = this.getSearchState();
        this.state.loaded = [];
        this.state.loadNumber = 16;
        this.state.offset = 0;
        this.state.loadMore = false;

        this.state.isCat = false;
        this.state.isUpsideDown = false;
        this.state.isRainbow = false;
        this.state.elapsed = 0;
        this.state.isGravity = false;
        this.state.isSecretSurprise = false;
    }
    componentDidMount () {
        const query = window.location.search;
        const q = query.lastIndexOf('q=');
        let term = '';

        if (query.substring(q + 2, query.length) === '%3D%5E..%5E%3D') {
            this.makeSurprise('isCat');
        }
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

        if (term === 'upside down' || term === 'upsidedown') {
            this.makeSurprise('isUpsideDown');
        }

        if (term === 'rainbow' || term === 'rainbows') {
            this.makeSurprise('isRainbow');
            setInterval(this.tick, 200);
        }

        if (term === 'gravity') {
            this.makeSurprise('isGravity');
        }

        if (term === 'secret surprise' || term === 'secret surprises' ||
            term === 'secretsurprises' || term === 'secretsurprise') {
            this.makeSurprise('isSecretSurprise');
        }

        this.props.dispatch(navigationActions.setSearchTerm(term));
    }

    componentDidUpdate (prevProps) {
        if (this.props.searchTerm !== prevProps.searchTerm) {
            this.handleGetSearchMore();
        }
    }

    gravity () {
        scroll.scrollToBottom({
            duration: 1500,
            delay: 100,
            smooth: 'easeInQuart'
        });
    }

    tick () {
        this.setState(prevState => (
            {elapsed: (prevState.elapsed + 10) % 360}
        ));
    }

    makeSurprise (surprise) {
        this.setState({[surprise]: true});
    }

    getSearchState () {
        let pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        const start = pathname.lastIndexOf('/');
        const type = pathname.substring(start + 1, pathname.length);
        return {
            tab: type,
            loadNumber: 16
        };
    }
    handleGetSearchMore () {
        let termText = '';
        if (this.props.searchTerm !== '') {
            termText = `&q=${encodeURIComponent(this.props.searchTerm.split(' ').join('+'))}`;
        }
        const locale = this.props.intl.locale;
        const loadNumber = this.state.loadNumber;
        const offset = this.state.offset;
        const queryString = `limit=${loadNumber}&offset=${offset}&language=${locale}&mode=popular${termText}`;

        api({
            uri: `/search/${this.state.tab}?${queryString}`
        }, (err, body) => {
            const loadedSoFar = this.state.loaded;
            Array.prototype.push.apply(loadedSoFar, body);
            const currentOffset = this.state.offset + this.state.loadNumber;
            const willLoadMore = body.length === this.state.loadNumber;

            this.setState({
                loaded: loadedSoFar,
                offset: currentOffset,
                loadMore: willLoadMore
            });

            if (this.state.isGravity) this.gravity();
        });
    }
    getTab (type) {
        const term = this.props.searchTerm.split(' ').join('+');
        let allTab = (
            <a href={`/search/${type}?q=${term}/`}>
                <li>
                    <img
                        className={`tab-icon ${type}`}
                        src={`/svgs/tabs/${type}-inactive.svg`}
                    />
                    <FormattedMessage id={`general.${type}`} />
                </li>
            </a>
        );
        if (this.state.tab === type) {
            allTab = (
                <a href={`/search/${type}?q=${term}/`}>
                    <li className="active">
                        <img
                            className={`tab-icon ${type}`}
                            src={`/svgs/tabs/${type}-active.svg`}
                        />
                        <FormattedMessage id={`general.${type}`} />
                    </li>
                </a>
            );
        }
        return allTab;
    }

    getProjectBox () {
        const results = (
            <Grid
                cards
                showAvatar
                isUpsideDown={this.state.isUpsideDown}
                itemType={this.state.tab}
                items={this.state.loaded}
                showFavorites={false}
                showLoves={false}
                showViews={false}
            />
        );
        let searchAction = null;
        if (this.state.isCat) {
            searchAction = <h2 className="search-prompt">*boop*<br />=^..^=</h2>;

            return (
                <div
                    id="projectBox"
                    key="projectBox"
                >
                    {searchAction}
                </div>
            );
        }
        if (this.state.loaded.length === 0 && this.state.offset !== 0) {
            searchAction = <h2 className="search-prompt"><FormattedMessage id="general.searchEmpty" /></h2>;
        } else if (this.state.loadMore) {
            searchAction = (
                <Button
                    className="white"
                    onClick={this.handleGetSearchMore}
                >
                    <FormattedMessage id="general.loadMore" />
                </Button>
            );
        }
        return (
            <div
                id="projectBox"
                key="projectBox"
            >
                {results}
                {searchAction}
            </div>
        );
    }

    fancyStyle () {
        if (this.state.isRainbow) {
            return {
                filter: `hue-rotate(${this.state.elapsed}deg) saturate(400%)`
            };
        }
        
        return {};
    }

    render () {
        const confetti = (
            <Confetti
                colors={[
                    '#f44336',
                    '#e91e63',
                    '#9c27b0',
                    '#673ab7',
                    '#3f51b5',
                    '#2196f3',
                    '#03a9f4',
                    '#00bcd4',
                    '#009688',
                    '#4CAF50',
                    '#8BC34A',
                    '#CDDC39',
                    '#FFEB3B',
                    '#FFC107',
                    '#FF9800',
                    '#FF5722'
                ]}
                height={window.innerHeight}
                numberOfPieces={500}
                recycle={false}
                width={window.innerWidth}
            />
        );
        return (
            <div style={this.fancyStyle()}>
                <div className="outer">
                    <TitleBanner className="masthead">
                        <div className="inner">
                            <h1 className="title-banner-h1">
                                <FormattedMessage id="general.search" />
                            </h1>
                        </div>
                    </TitleBanner>
                    <Tabs>
                        {this.getTab('projects')}
                        {this.getTab('studios')}
                    </Tabs>
                    <div>
                        {this.state.isSecretSurprise ? confetti : ''}
                        {this.getProjectBox()}
                    </div>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    dispatch: PropTypes.func,
    intl: intlShape,
    searchTerm: PropTypes.string
};

const mapStateToProps = state => ({
    searchTerm: state.navigation
});

const WrappedSearch = injectIntl(Search);
const ConnectedSearch = connect(mapStateToProps)(WrappedSearch);

render(
    <Page><ConnectedSearch /></Page>,
    document.getElementById('app'),
    {navigation: navigationActions.navigationReducer}
);
