const FormattedDate = require('react-intl').FormattedDate;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const CappedNumber = require('../../components/cappednumber/cappednumber.jsx');
const placeholder = require('./gui-placeholder.png');
const ShareBanner = require('../../components/share-banner/share-banner.jsx');
const RemixList = require('../../components/remixlist/remixlist.jsx');

require('./preview.scss');

const PreviewPresentation = props => {
    const {
        intl,
        projectInfo,
        creditInfo,
        remixes
        // ...otherProps TBD
    } = props;
    const shareDate = (projectInfo.history && projectInfo.history.shared) ? projectInfo.history.shared : '';
    
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
                                <div className="title-text">{projectInfo.title}</div>
                                {`${intl.formatMessage({id: 'thumbnail.by'})} `}
                                <a href={`/users/${projectInfo.author.username}`}>
                                    {projectInfo.author.username}
                                </a>
                            </div>
                        </FlexRow>
                        <div className="project-buttons">
                            <button className="button remix-button">
                                Remix
                            </button>
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
                                {projectInfo.description}
                            </div>
                        </FlexRow>
                    </FlexRow>
                    <FlexRow className="preview-row">
                        <FlexRow className="stats">
                            <div
                                className="project-loves"
                                key="loves"
                            >
                                {projectInfo.stats.loves}
                            </div>
                            <div
                                className="project-favorites favorited"
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
                            <h1>Comments go here</h1>
                        </div>
                        <RemixList items={remixes} />
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
    remixes: PropTypes.arrayOf(PropTypes.object)
    // sessionStatus: PropTypes.string //will probably need this later
};

module.exports = injectIntl(PreviewPresentation);
