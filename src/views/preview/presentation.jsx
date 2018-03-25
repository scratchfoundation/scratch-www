const FormattedDate = require('react-intl').FormattedDate;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const sessionActions = require('../../redux/session.js');
const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const CappedNumber = require('../../components/cappednumber/cappednumber.jsx');
const placeholder = require('./gui-placeholder.png');
const ShareBanner = require('../../components/share-banner/share-banner.jsx');
const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');

require('./preview.scss');

const PreviewPresentation = props => {
    const {
        intl,
        projectInfo,
        creditInfo,
        faved,
        loved,
        remixes,
        sessionStatus,
        studios,
        user
        // ...otherProps TBD
    } = props;
    const shareDate = (projectInfo.history && projectInfo.history.shared) ? projectInfo.history.shared : '';
    const lovesClass = loved ? 'project-loves loved' : 'project-loves';
    const favesClass = faved ? 'project-favorites favorited' : 'project-favorites';
    return (
        <div className="preview">
            <ShareBanner>
                <FlexRow className="preview-row">
                    <span className="share-text">
                        This project is not shared — so only you can see it. Click share to let everyone see it!
                    </span>
                    <button className="button share-button">
                        Share
                    </button>
                </FlexRow>
            </ShareBanner>
            { projectInfo && projectInfo.author && projectInfo.author.id && (
                <div className="inner">
                    <FlexRow className="preview-row">
                        <FlexRow className="project-title">
                            <Avatar
                                src={`https://cdn2.scratch.mit.edu/get_image/user/${projectInfo.author.id}_48x48.png`}
                            />
                            <div className="title">
                                <div className="preview-header">{projectInfo.title}</div>
                                {`${intl.formatMessage({id: 'thumbnail.by'})} `}
                                <a href={`/users/${projectInfo.author.username}`}>
                                    {projectInfo.author.username}
                                </a>
                            </div>
                        </FlexRow>
                        <div className="project-buttons">
                            {sessionStatus === sessionActions.Status.FETCHED &&
                                Object.keys(user).length > 0 &&
                                user.id !== projectInfo.author.id &&
                                <button className="button remix-button">
                                    Remix
                                </button>
                            }
                            <button className="button see-inside-button">
                                See Inside
                            </button>
                        </div>
                    </FlexRow>
                    <FlexRow className="preview-row">
                        <div className="placeholder">
                            <img src={placeholder} />
                        </div>
                        <FlexRow className="project-notes">
                            {shareDate && (
                                <div className="share-date">
                                    <div className="copyleft">&copy;</div>
                                    {' '}
                                    {/*  eslint-disable react/jsx-sort-props */}
                                    <FormattedDate
                                        value={Date.parse(shareDate)}
                                        day="2-digit"
                                        month="short"
                                        year="numeric"
                                    />
                                    {/*  eslint-enable react/jsx-sort-props */}
                                </div>
                            )}
                            {creditInfo && creditInfo.author && creditInfo.id && (
                                <FlexRow className="remix-credit">
                                    <Avatar
                                        className="remix"
                                        src={`https://cdn2.scratch.mit.edu/get_image/user/${creditInfo.author.id}_48x48.png`}
                                    />
                                    <div className="credit-text">
                                        Thanks to <a
                                            href={`/users/${creditInfo.author.username}`}
                                        >
                                            {creditInfo.author.username}
                                        </a> for the original project <a
                                            href={`/preview/${creditInfo.id}`}
                                        >
                                            {creditInfo.title}
                                        </a>.
                                    </div>
                                </FlexRow>
                            )}
                            <div className="project-description">
                                {decorateText(projectInfo.description)}
                            </div>
                        </FlexRow>
                    </FlexRow>
                    <FlexRow className="preview-row">
                        <FlexRow className="stats">
                            <div
                                className={lovesClass}
                                key="loves"
                            >
                                {projectInfo.stats.loves}
                            </div>
                            <div
                                className={favesClass}
                                key="favorites"
                            >
                                {projectInfo.stats.favorites}
                            </div>
                            <div
                                className="project-remixes"
                                key="remixes"
                            >
                                {projectInfo.remix.count}
                            </div>
                            <div
                                className="project-views"
                                key="views"
                            >
                                <CappedNumber value={projectInfo.stats.views} />
                            </div>
                        </FlexRow>
                        <FlexRow className="action-buttons">
                            <a href="#">
                                <li>
                                    Add to Studio
                                </li>
                            </a>
                            <a href="#">
                                <li>
                                    Social
                                </li>
                            </a>
                            <a href="#">
                                <li className="report">
                                    Report
                                </li>
                            </a>
                        </FlexRow>
                    </FlexRow>
                    <FlexRow className="preview-row">
                        <div className="comments-container">
                            <div className="preview-header">
                                Comments go here
                            </div>
                        </div>
                        <FlexRow className="column">
                            <FlexRow className="remix-list">
                                <div className="preview-header">
                                    Remixes
                                </div>
                                {remixes === 0 ? (
                                    <span>No remixes</span>
                                ) : (
                                    <ThumbnailColumn
                                        cards
                                        showAvatar
                                        itemType="preview"
                                        items={remixes.slice(0, 5)}
                                        showFavorites={false}
                                        showLoves={false}
                                        showViews={false}
                                    />
                                )}
                            </FlexRow>
                            <FlexRow className="studio-list">
                                <div className="preview-header">
                                    Studios
                                </div>
                                {remixes === 0 ? (
                                    <span>No studios</span>
                                ) : (
                                    <ThumbnailColumn
                                        cards
                                        showAvatar
                                        itemType="gallery"
                                        items={studios.slice(0, 5)}
                                        showFavorites={false}
                                        showLoves={false}
                                        showViews={false}
                                    />
                                )}
                            </FlexRow>
                        </FlexRow>
                    </FlexRow>
                    
                </div>
            )}
        </div>
        
    );
};

PreviewPresentation.propTypes = {
    creditInfo: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.shape({id: PropTypes.number}),
        history: PropTypes.shape({
            created: PropTypes.string,
            modified: PropTypes.string,
            shared: PropTypes.string
        }),
        stats: PropTypes.shape({
            views: PropTypes.number,
            loves: PropTypes.number,
            favorites: PropTypes.number
        }),
        remix: PropTypes.shape({
            parent: PropTypes.number,
            root: PropTypes.number
        })
    }),
    intl: intlShape,
    projectInfo: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.shape({id: PropTypes.number}),
        history: PropTypes.shape({
            created: PropTypes.string,
            modified: PropTypes.string,
            shared: PropTypes.string
        }),
        stats: PropTypes.shape({
            views: PropTypes.number,
            loves: PropTypes.number,
            favorites: PropTypes.number
        }),
        remix: PropTypes.shape({
            parent: PropTypes.number,
            root: PropTypes.number
        })
    }),
    remixes: PropTypes.arrayOf(PropTypes.object),
    sessionStatus: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        banned: PropTypes.bool,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        dateJoined: PropTypes.string,
        email: PropTypes.string,
        classroomId: PropTypes.string
    }).isRequired
};

module.exports = injectIntl(PreviewPresentation);
