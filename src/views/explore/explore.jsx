const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const render = require('../../lib/render.jsx');
const {connect} = require('react-redux');

const api = require('../../lib/api');
const PropTypes = require('prop-types');
const {getLocale} = require('../../lib/locales.js');

const Page = require('../../components/page/www/page.jsx');
const Tabs = require('../../components/tabs/tabs.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const Button = require('../../components/forms/button.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const Grid = require('../../components/grid/grid.jsx');

require('./explore.scss');

class Explore extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getExploreState',
            'handleGetExploreMore',
            'handleToggleRemoveButton',
            'handleRemove',
            'getBubble'
        ]);

        this.state = this.getExploreState();
        this.state.loaded = [];
        this.state.offset = 0;
        this.state.showRemoveButton = false;
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
            music: 'music'
        };
        const typeOptions = ['projects', 'studios'];

        let pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }

        const options = pathname.split('/');
        const type = options[2];
        const currentCategory = options[3];
        if (Object.keys(categoryOptions).indexOf(currentCategory) === -1 ||
            typeOptions.indexOf(type) === -1 ||
            currentCategory === categoryOptions.all) {
            window.location = `${window.location.origin}/explore/projects/all/`;
        }

        return {
            category: currentCategory,
            acceptableTabs: categoryOptions,
            acceptableTypes: typeOptions,
            itemType: type,
            loadNumber: 16
        };
    }
    handleGetExploreMore () {
        const qText = `&q=${this.state.acceptableTabs[this.state.category]}` || '*';
        const locale = getLocale();
        const queryString =
            `limit=${this.state.loadNumber}&offset=${this.state.offset}&language=${locale}${qText}`;

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

    handleToggleRemoveButton (e) {
        this.setState({showRemoveButton: e.target.checked});
    }

    handleRemove (item) {
        // TODO: don't slice the itemType (this was a hacky way to turn 'projects' --> 'project')
        api({
            uri: `/admin/search/${this.state.itemType.slice(0, -1)}/${item.id}`,
            method: 'DELETE'
        }, err => {
            if (err) {
                alert('Error removing project.'); // eslint-disable-line no-alert
                console.error(err);
            } else {
                const updated = this.state.loaded.filter(p => p.id !== item.id);
                this.setState({loaded: updated});
            }
        });
    }

    getBubble (type) {
        const classes = classNames({
            active: (this.state.category === type)
        });
        return (
            <a href={`/explore/${this.state.itemType}/${type}`}>
                <li className={classes}>
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
                    <Tabs
                        items={[
                            {
                                name: 'projects',
                                onTrigger: () => {
                                    window.location = `${window.location.origin}/explore/projects/` +
                                        `${this.state.category}/`;
                                },
                                getContent: isActive => (
                                    <div>
                                        {isActive ? (
                                            <img
                                                className="tab-icon projects"
                                                src="/svgs/tabs/projects-active.svg"
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="tab-icon projects"
                                                src="/svgs/tabs/projects-inactive.svg"
                                                alt=""
                                            />
                                        )
                                        }
                                        <FormattedMessage id="general.projects" />
                                    </div>
                                )
                            },
                            {
                                name: 'studios',
                                onTrigger: () => {
                                    window.location = `${window.location.origin}/explore/studios/all`;
                                },
                                getContent: isActive => (
                                    <div>
                                        {isActive ? (
                                            <img
                                                className="tab-icon studios"
                                                src="/svgs/tabs/studios-active.svg"
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="tab-icon studios"
                                                src="/svgs/tabs/studios-inactive.svg"
                                                alt=""
                                            />
                                        )
                                        }
                                        <FormattedMessage id="general.studios" />
                                    </div>
                                )
                            }
                        ]}
                        activeTabName={this.state.itemType}
                    />
                    {this.state.itemType === 'projects' && (
                        <div className="sort-controls">
                            <SubNavigation className="categories">
                                {this.getBubble('all')}
                                {this.getBubble('animations')}
                                {this.getBubble('art')}
                                {this.getBubble('games')}
                                {this.getBubble('music')}
                            </SubNavigation>
                        </div>)}
                    {this.props.session?.session?.permissions?.admin && (
                        <div className="sort-controls">
                            <label>
                                <span>Removal mode: </span>
                                <input
                                    type="checkbox"
                                    checked={this.state.showRemoveButton}
                                    onChange={this.handleToggleRemoveButton}
                                />
                            </label>
                        </div>
                    )}
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
                            showRemoveButton={this.state.showRemoveButton}
                            onRemove={this.handleRemove}
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
    session: PropTypes.object
};

const mapStateToProps = state => ({
    session: state.session
});

const ConnectedExplore = connect(mapStateToProps)(injectIntl(Explore));
render(<Page><ConnectedExplore /></Page>, document.getElementById('app'));
