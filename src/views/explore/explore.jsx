const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const render = require('../../lib/render.jsx');

const api = require('../../lib/api');

const Page = require('../../components/page/www/page.jsx');
const Tabs = require('../../components/tabs/tabs.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const Button = require('../../components/forms/button.jsx');
const Form = require('../../components/forms/form.jsx');
const Select = require('../../components/forms/select.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const Grid = require('../../components/grid/grid.jsx');

require('./explore.scss');

class Explore extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getExploreState',
            'handleGetExploreMore',
            'changeItemType',
            'handleChangeSortMode',
            'getBubble',
            'getTab'
        ]);

        this.state = this.getExploreState();
        this.state.loaded = [];
        this.state.offset = 0;
    }
    componentDidMount () {
        this.handleGetExploreMore();
    }
    getExploreState () {
        const categoryOptions = {
            all: '*',
            animations: 'animations',
            art: 'art',
            games: 'games',
            music: 'music',
            stories: 'stories',
            tutorials: 'tutorial'
        };
        const typeOptions = ['projects', 'studios'];
        const modeOptions = ['trending', 'popular', 'recent', ''];

        let pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }

        const options = pathname.split('/');
        const type = options[2];
        const currentCategory = options[3];
        const currentMode = options.length > 4 ? options[4] : '';
        if (Object.keys(categoryOptions).indexOf(currentCategory) === -1 ||
        typeOptions.indexOf(type) === -1 ||
        modeOptions.indexOf(currentMode) === -1){
            window.location = `${window.location.origin}/explore/projects/all/`;
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
    }
    handleGetExploreMore () {
        const qText = `&q=${this.state.acceptableTabs[this.state.category]}` || '*';
        const mode = `&mode=${(this.state.mode ? this.state.mode : 'trending')}`;
        const locale = this.props.intl.locale;
        const queryString =
            `limit=${this.state.loadNumber}&offset=${this.state.offset}&language=${locale}${mode}${qText}`;

        api({
            uri: `/explore/${this.state.itemType}?${queryString}`
        }, (err, body) => {
            if (!err) {
                const loadedSoFar = this.state.loaded;
                Array.prototype.push.apply(loadedSoFar, body);
                this.setState({loaded: loadedSoFar});
                const currentOffset = this.state.offset + this.state.loadNumber;
                this.setState({offset: currentOffset});
            }
        });
    }
    changeItemType () {
        let newType;
        for (const t of this.state.acceptableTypes) {
            if (this.state.itemType !== t) {
                newType = t;
                break;
            }
        }
        window.location = `${window.location.origin}/explore/${newType}/${this.state.tab}/${this.state.mode}`;
    }
    handleChangeSortMode (name, value) {
        if (this.state.acceptableModes.indexOf(value) !== -1) {
            window.location =
                `${window.location.origin}/explore/${this.state.itemType}/${this.state.category}/${value}`;
        }
    }
    getBubble (type) {
        const classes = classNames({
            active: (this.state.category === type)
        });
        return (
            <a href={`/explore/${this.state.itemType}/${type}/${this.state.mode}`}>
                <li className={classes}>
                    <FormattedMessage id={`general.${type}`} />
                </li>
            </a>
        );
    }
    getTab (type) {
        const classes = classNames({
            active: (this.state.itemType === type)
        });
        return (
            <a href={`/explore/${type}/${this.state.category}/${this.state.mode}`}>
                <li className={classes}>
                    {this.state.itemType === type ? [
                        <img
                            className={`tab-icon ${type}`}
                            key={`tab-${type}`}
                            src={`/svgs/tabs/${type}-active.svg`}
                        />
                    ] : [
                        <img
                            className={`tab-icon ${type}`}
                            key={`tab-${type}`}
                            src={`/svgs/tabs/${type}-inactive.svg`}
                        />
                    ]}
                    <FormattedMessage id={`general.${type}`} />
                </li>
            </a>
        );
    }
    render () {
        return (
            <div>
                <div className="outer">
                    <TitleBanner className="masthead">
                        <div className="inner">
                            <h1 className="title-banner-h1">
                                <FormattedMessage id="general.explore" />
                            </h1>
                        </div>
                    </TitleBanner>
                    <Tabs>
                        {this.getTab('projects')}
                        {this.getTab('studios')}
                    </Tabs>
                    <div className="sort-controls">
                        <SubNavigation className="categories">
                            {this.getBubble('all')}
                            {this.getBubble('animations')}
                            {this.getBubble('art')}
                            {this.getBubble('games')}
                            {this.getBubble('music')}
                            {this.getBubble('stories')}
                            {this.getBubble('tutorials')}
                        </SubNavigation>
                        <Form className="sort-mode">
                            <Select
                                name="sort"
                                options={[
                                    {
                                        value: 'trending',
                                        label: this.props.intl.formatMessage({id: 'explore.trending'})
                                    },
                                    {
                                        value: 'popular',
                                        label: this.props.intl.formatMessage({id: 'explore.popular'})
                                    },
                                    {
                                        value: 'recent',
                                        label: this.props.intl.formatMessage({id: 'explore.recent'})
                                    }
                                ]}
                                value={this.state.mode}
                                onChange={this.handleChangeSortMode}
                            />
                        </Form>
                    </div>
                    <div
                        id="projectBox"
                        key="projectBox"
                    >
                        <Grid
                            cards
                            showAvatar
                            itemType={this.state.itemType}
                            items={this.state.loaded}
                            showFavorites={false}
                            showLoves={false}
                            showViews={false}
                        />
                        <Button
                            onClick={this.handleGetExploreMore}
                        >
                            <FormattedMessage id="general.loadMore" />
                        </Button>
                    </div>
                </div>
            </div>

        );
    }
}

Explore.propTypes = {
    intl: intlShape
};

const WrappedExplore = injectIntl(Explore);

render(<Page><WrappedExplore /></Page>, document.getElementById('app'));
