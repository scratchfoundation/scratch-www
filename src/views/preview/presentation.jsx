const FormattedDate = require('react-intl').FormattedDate;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');
const Formsy = require('formsy-react').default;
const classNames = require('classnames');
const approx = require('approximate-number');

const GUI = require('scratch-gui').default;
const IntlGUI = injectIntl(GUI);

const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const CappedNumber = require('../../components/cappednumber/cappednumber.jsx');
const ShareBanner = require('./share-banner.jsx');
const RemixCredit = require('./remix-credit.jsx');
const RemixList = require('./remix-list.jsx');
const StudioList = require('./studio-list.jsx');
const InplaceInput = require('../../components/forms/inplace-input.jsx');
const ReportModal = require('../../components/modal/report/modal.jsx');
const CommentContainer = require('./comment/comment-container.jsx');

const projectShape = require('./projectshape.jsx').projectShape;
require('./preview.scss');

const PreviewPresentation = ({
    editable,
    faved,
    favoriteCount,
    isFullScreen,
    isLoggedIn,
    isShared,
    loved,
    loveCount,
    originalInfo,
    parentInfo,
    projectId,
    projectInfo,
    remixes,
    report,
    studios,
    userOwnsProject,
    onFavoriteClicked,
    onLoveClicked,
    onReportClicked,
    onReportClose,
    onReportSubmit,
    onSeeInside,
    onUpdate
}) => {
    const shareDate = ((projectInfo.history && projectInfo.history.shared)) ? projectInfo.history.shared : '';
    const _TESTCOMMENTS = [{
        id: 56496790,
        parent_id: null,
        content: 'What a cool idea! Love this! :D',
        datetime_created: '2016-03-14T15:41:42.000Z',
        datetime_modified: '2016-03-14T15:41:42.000Z',
        author: {
            id: 9557330,
            username: 'Candycode',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/9557330_60x60.png'
        },
        reply_count: 1
    }, {
        id: 54719338,
        parent_id: null,
        content: 'Ha! This is so cool and well done, and thanks for the love.',
        datetime_created: '2016-02-06T08:20:00.000Z',
        datetime_modified: '2016-02-06T08:20:00.000Z',
        author: {
            id: 14420300,
            username: 'saltbrain',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/14420300_60x60.png'
        },
        reply_count: 2
    }, {
        id: 53187166,
        parent_id: null,
        content: 'Fantastic!',
        datetime_created: '2016-01-03T00:08:24.000Z',
        datetime_modified: '2016-01-03T00:08:24.000Z',
        author: {
            id: 2592116,
            username: 'The_Grits',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/2592116_60x60.png'
        },
        reply_count: 1
    }, {
        id: 53179188,
        parent_id: null,
        content: 'WOW!!! This is amazing, I mean everything! Especially the idea!',
        datetime_created: '2016-01-02T21:36:55.000Z',
        datetime_modified: '2016-01-02T21:36:55.000Z',
        author: {
            id: 2814281,
            username: 'Samrya',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/2814281_60x60.png'
        },
        reply_count: 2
    }, {
        id: 52866270,
        parent_id: null,
        content: 'This project is beyond me.',
        datetime_created: '2015-12-26T19:00:36.000Z',
        datetime_modified: '2015-12-26T19:00:36.000Z',
        author: {
            id: 3058431,
            username: 'RWawesome13',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/3058431_60x60.png'
        },
        reply_count: 0
    }, {
        id: 52823492,
        parent_id: null,
        content: 'This is AMAZING!!!!!!!!!!!!!!!!!!!!!!!!!!',
        datetime_created: '2015-12-25T07:49:41.000Z',
        datetime_modified: '2015-12-25T07:49:41.000Z',
        author: {
            id: 10571716,
            username: 'MouseGames123',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/10571716_60x60.png'
        },
        reply_count: 1
    }, {
        id: 50866065,
        parent_id: null,
        content: '<3',
        datetime_created: '2015-11-11T16:39:56.000Z',
        datetime_modified: '2015-11-11T16:39:56.000Z',
        author: {
            id: 3550327,
            username: 'ic6862',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/3550327_60x60.png'
        },
        reply_count: 1
    }, {
        id: 50782209,
        parent_id: null,
        content: "It's relaxing...",
        datetime_created: '2015-11-09T16:38:12.000Z',
        datetime_modified: '2015-11-09T16:38:12.000Z',
        author: {
            id: 10381664,
            username: '-Io-',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/10381664_60x60.png'
        },
        reply_count: 1
    }, {
        id: 50619702,
        parent_id: null,
        content: 'This is such a fun and creative way to display information!',
        datetime_created: '2015-11-06T00:18:52.000Z',
        datetime_modified: '2015-11-06T00:18:52.000Z',
        author: {
            id: 2755634,
            username: 'ceebee',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/2755634_60x60.png'
        },
        reply_count: 1
    }, {
        id: 49855470,
        parent_id: null,
        content: 'great job',
        datetime_created: '2015-10-24T22:42:27.000Z',
        datetime_modified: '2015-10-24T22:42:27.000Z',
        author: {
            id: 4351253,
            username: 'CreeperDudeEX',
            image: 'https://cdn2.scratch.mit.edu/get_image/user/4351253_60x60.png'
        },
        reply_count: 9
    }];
    return (
        <div className="preview">
            <ShareBanner shared={isShared} />
            
            { projectInfo && projectInfo.author && projectInfo.author.id && (
                <Formsy>
                    <div className="inner">
                        <FlexRow className="preview-row">
                            <FlexRow className="project-header">
                                <a href={`/users/${projectInfo.author.username}`}>
                                    <Avatar
                                        alt={projectInfo.author.username}
                                        src={`https://cdn2.scratch.mit.edu/get_image/user/${projectInfo. author.id}_48x48.png`}
                                    />
                                </a>
                                <div className="title">
                                    {editable ?
                                        
                                        <InplaceInput
                                            className="project-title"
                                            handleUpdate={onUpdate}
                                            name="title"
                                            validationErrors={{
                                                maxLength: 'Sorry title is too long'
                                                // maxLength: props.intl.formatMessage({
                                                //     id: 'project.titleMaxLength'
                                                // })
                                            }}
                                            validations={{
                                                maxLength: 100
                                            }}
                                            value={projectInfo.title}
                                        /> :
                                        <React.Fragment>
                                            <div className="project-title">{projectInfo.title}</div>
                                            {'by '}
                                            <a href={`/users/${projectInfo.author.username}`}>
                                                {projectInfo.author.username}
                                            </a>
                                        </React.Fragment>
                                    }
                                </div>
                            </FlexRow>
                            <div className="project-buttons">
                                {/* TODO: Hide Remix button for now until implemented */}
                                {(!userOwnsProject && false) &&
                                    <Button className="button remix-button">
                                        Remix
                                    </Button>
                                }
                                <Button
                                    className="button see-inside-button"
                                    onClick={onSeeInside}
                                >
                                    See Inside
                                </Button>
                            </div>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <div className="guiPlayer">
                                <IntlGUI
                                    isPlayerOnly
                                    basePath="/"
                                    className="guiPlayer"
                                    isFullScreen={isFullScreen}
                                    previewInfoVisible="false"
                                    projectId={projectId}
                                />
                            </div>
                            <FlexRow className="project-notes">
                                <RemixCredit projectInfo={parentInfo} />
                                <RemixCredit projectInfo={originalInfo} />
                                {/*  eslint-disable max-len */}
                                <FlexRow className="description-block">
                                    <div className="project-textlabel">
                                        Instructions
                                    </div>
                                    {editable ?
                                        <InplaceInput
                                            className={classNames(
                                                'project-description-edit',
                                                {remixes: parentInfo && parentInfo.author}
                                            )}
                                            handleUpdate={onUpdate}
                                            name="instructions"
                                            placeholder="Tell people how to use your project (such as which keys to press)."
                                            type="textarea"
                                            validationErrors={{
                                                maxLength: 'Sorry description is too long'
                                                // maxLength: props.intl.formatMessage({
                                                //     id: 'project.descriptionMaxLength'
                                                // })
                                            }}
                                            validations={{
                                                // TODO: actual 5000
                                                maxLength: 1000
                                            }}
                                            value={projectInfo.instructions}
                                        /> :
                                        <div className="project-description">
                                            {decorateText(projectInfo.instructions)}
                                        </div>
                                    }
                                </FlexRow>
                                <FlexRow className="description-block">
                                    <div className="project-textlabel">
                                        Notes and Credits
                                    </div>
                                    {editable ?
                                        <InplaceInput
                                            className={classNames(
                                                'project-description-edit',
                                                'last',
                                                {remixes: parentInfo && parentInfo.author}
                                            )}
                                            handleUpdate={onUpdate}
                                            name="description"
                                            placeholder="How did you make this project? Did you use ideas scripts or artwork from other people? Thank them here."
                                            type="textarea"
                                            validationErrors={{
                                                maxLength: 'Sorry description is too long'
                                                // maxLength: props.intl.formatMessage({
                                                //     id: 'project.descriptionMaxLength'
                                                // })
                                            }}
                                            validations={{
                                                // TODO: actual 5000
                                                maxLength: 1000
                                            }}
                                            value={projectInfo.description}
                                        /> :
                                        <div className="project-description last">
                                            {decorateText(projectInfo.description)}
                                        </div>
                                    }
                                </FlexRow>
                                {/*  eslint-enable max-len */}
                            </FlexRow>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <FlexRow className="stats">
                                <div
                                    className={classNames('project-loves', {loved: loved})}
                                    key="loves"
                                    onClick={onLoveClicked}
                                >
                                    {approx(loveCount, {decimal: false})}
                                </div>
                                <div
                                    className={classNames('project-favorites', {favorited: faved})}
                                    key="favorites"
                                    onClick={onFavoriteClicked}
                                >
                                    {approx(favoriteCount, {decimal: false})}
                                </div>
                                <div
                                    className="project-remixes"
                                    key="remixes"
                                >
                                    {approx(projectInfo.stats.remixes, {decimal: false})}
                                </div>
                                <div
                                    className="project-views"
                                    key="views"
                                >
                                    <CappedNumber value={projectInfo.stats.views} />
                                </div>
                            </FlexRow>
                            <FlexRow className="subactions">
                                <div className="share-date">
                                    <div className="copyleft">&copy;</div>
                                    {' '}
                                    {/*  eslint-disable react/jsx-sort-props */}
                                    {shareDate === null ?
                                        'Unshared' :
                                        <FormattedDate
                                            value={Date.parse(shareDate)}
                                            day="2-digit"
                                            month="short"
                                            year="numeric"
                                        />
                                    }
                                    {/*  eslint-enable react/jsx-sort-props */}
                                </div>
                                <FlexRow className="action-buttons">
                                    <Button className="action-button studio-button">
                                        Add to Studio
                                    </Button>
                                    <Button className="action-button copy-link-button">
                                        Copy Link
                                    </Button>
                                    {(isLoggedIn && !userOwnsProject) &&
                                        <React.Fragment>
                                            <Button
                                                className="action-button report-button"
                                                key="report-button"
                                                onClick={onReportClicked}
                                            >
                                                Report
                                            </Button>,
                                            <ReportModal
                                                key="report-modal"
                                                report={report}
                                                type="project"
                                                onReport={onReportSubmit}
                                                onRequestClose={onReportClose}
                                            />
                                        </React.Fragment>
                                    }
                                </FlexRow>
                            </FlexRow>
                        </FlexRow>
                    </div>
                    <div className="project-lower-container">
                        <div className="inner">
                            <FlexRow className="preview-row">
                                <div className="comments-container">
                                    <FlexRow className="comments-header">
                                        <h4>Comments</h4>
                                        <div>comments on/off</div>
                                    </FlexRow>
                                    <FlexRow className="create-comment" />
                                    <FlexRow className="comments-list">
                                        {_TESTCOMMENTS.map(comment => (
                                            <CommentContainer
                                                {...comment}
                                                key={comment.id}
                                            />
                                        ))}
                                    </FlexRow>
                                </div>
                                <FlexRow className="column">
                                    <RemixList remixes={remixes} />
                                    <StudioList studios={studios} />
                                </FlexRow>
                            </FlexRow>
                        </div>
                    </div>
                </Formsy>
            )}
        </div>
    );
};

PreviewPresentation.propTypes = {
    editable: PropTypes.bool,
    faved: PropTypes.bool,
    favoriteCount: PropTypes.number,
    isFullScreen: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isShared: PropTypes.bool,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    onFavoriteClicked: PropTypes.func,
    onLoveClicked: PropTypes.func,
    onReportClicked: PropTypes.func.isRequired,
    onReportClose: PropTypes.func.isRequired,
    onReportSubmit: PropTypes.func.isRequired,
    onSeeInside: PropTypes.func,
    onUpdate: PropTypes.func,
    originalInfo: projectShape,
    parentInfo: projectShape,
    projectId: PropTypes.string,
    projectInfo: projectShape,
    remixes: PropTypes.arrayOf(PropTypes.object),
    report: PropTypes.shape({
        category: PropTypes.string,
        notes: PropTypes.string,
        open: PropTypes.bool,
        waiting: PropTypes.bool
    }),
    studios: PropTypes.arrayOf(PropTypes.object),
    userOwnsProject: PropTypes.bool
};

module.exports = injectIntl(PreviewPresentation);
