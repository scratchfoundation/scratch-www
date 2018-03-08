const bindAll = require('lodash.bindall');
const FormattedMessage = require('react-intl').FormattedMessage;
const FormattedNumber = require('react-intl').FormattedNumber;
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

require('./preview.scss');

const PreviewPresentation = props => {
    const {
        intl,
        projectInfo,
        ...otherProps
    } = props;
    const formatMessage = intl.formatMessage;
    const messages = {
        'general.viewAll': formatMessage({id: 'general.viewAll'}),
    };
    const shareDate = (projectInfo.history && projectInfo.history.shared) ? projectInfo.history.shared : '';
    
    return (
        <div className="preview">
            <ShareBanner>
                <FlexRow className="previewRow">
                    <span className="shareText">
                        This project is not shared — so only you can see it.Click share to let everyone see it!
                    </span>
                    <button className="button shareButton">
                        Share
                    </button>
                </FlexRow>
            </ShareBanner>
            { projectInfo && projectInfo.author && projectInfo.author.id ? [
                <div className="inner">
                    <FlexRow className="previewRow">
                        <FlexRow className="projectTitle">
                            <Avatar
                                src={`https://cdn2.scratch.mit.edu/get_image/user/${projectInfo.author.id}_44x48.png`}
                            />
                            <div className="title">
                                <h1>{projectInfo.title}</h1>
                                by{' '}
                                <a href={`/users/${projectInfo.author.username}`}>
                                    {projectInfo.author.username}
                                </a>
                            </div>
                        </FlexRow>
                        <div className="projectButtons">
                            <button className="button remixButton">
                                Remix
                            </button>
                            <button className="button seeInsideButton">
                                See Inside
                            </button>
                        </div>
                    </FlexRow>
                    <FlexRow className="previewRow">
                        <div className="placeholder">
                            <img src={placeholder} alt="" />
                        </div>
                        <FlexRow className="projectNotes">
                            {shareDate !== '' ? [
                                <div className="shareDate">
                                    <div className="copyleft">&copy;</div>
                                    {' '}
                                    <FormattedDate 
                                        value={Date.parse(shareDate)}
                                        year="numeric"
                                        month="short"
                                        day="2-digit"
                                    />
                                </div>
                            ] : ''}
                            <div className="remixCredit">
                                Remix info here
                            </div>
                            <div className="projectDescription">
                                {projectInfo.description}
                            </div>
                        </FlexRow>
                    </FlexRow>
                    <FlexRow className="previewRow">
                        <FlexRow className="stats">
                            <div key="loves" className="project-loves">
                                <CappedNumber value={projectInfo.stats.loves} />
                            </div>
                            <div key="favorites" className="project-favorites favorited">
                                <CappedNumber value={projectInfo.stats.favorites} />
                            </div>
                            <div key="remixes" className="project-remixes">
                                <CappedNumber value={projectInfo.remix.count} />
                            </div>
                            <div key="views" className="project-views">
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
                </div>
            ] : []    
            }
        </div>
        
    );
}

PreviewPresentation.propTyps = {
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
    sessionStatus: PropTypes.string
}

module.exports = injectIntl(PreviewPresentation);