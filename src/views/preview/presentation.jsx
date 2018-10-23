const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;

const MediaQuery = require('react-responsive').default;
const React = require('react');
const Formsy = require('formsy-react').default;
const classNames = require('classnames');

const GUI = require('scratch-gui').default;
const IntlGUI = injectIntl(GUI);

const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const ShareBanner = require('./share-banner.jsx');
const RemixCredit = require('./remix-credit.jsx');
const RemixList = require('./remix-list.jsx');
const Stats = require('./stats.jsx');
const StudioList = require('./studio-list.jsx');
const Subactions = require('./subactions.jsx');
const InplaceInput = require('../../components/forms/inplace-input.jsx');
const TopLevelComment = require('./comment/top-level-comment.jsx');
const ComposeComment = require('./comment/compose-comment.jsx');
const ExtensionChip = require('./extension-chip.jsx');

const projectShape = require('./projectshape.jsx').projectShape;
require('./preview.scss');

const frameless = require('../../lib/frameless');

// disable enter key submission on formsy input fields; otherwise formsy thinks
// we meant to trigger the "See inside" button. Instead, treat these keypresses
// as a blur, which will trigger a save.
const onKeyPress = e => {
    if (e.target.type === 'text' && e.which === 13 /* Enter */) {
        e.preventDefault();
        e.target.blur();
    }
};

const PreviewPresentation = ({
    assetHost,
    backpackOptions,
    canAddToStudio,
    canDeleteComments,
    canReport,
    canRestoreComments,
    comments,
    editable,
    extensions,
    faved,
    favoriteCount,
    intl,
    isFullScreen,
    isLoggedIn,
    isShared,
    loved,
    loveCount,
    originalInfo,
    parentInfo,
    projectHost,
    projectId,
    projectInfo,
    remixes,
    reportOpen,
    replies,
    addToStudioOpen,
    projectStudios,
    userOwnsProject,
    onAddComment,
    onDeleteComment,
    onFavoriteClicked,
    onLoadMore,
    onLoveClicked,
    onReportClicked,
    onReportClose,
    onReportComment,
    onReportSubmit,
    onRestoreComment,
    onAddToStudioClicked,
    onAddToStudioClosed,
    onToggleStudio,
    onToggleComments,
    onSeeInside,
    onShare,
    onUpdate
}) => {
    const shareDate = ((projectInfo.history && projectInfo.history.shared)) ? projectInfo.history.shared : '';
    const loadedCommentCount = comments.length + Object.keys(replies).reduce((acc, id) => acc + replies[id].length, 0);
    return (
        <div className="preview">
            {!isShared && (
                <ShareBanner onShare={onShare} />
            )}
            { projectInfo && projectInfo.author && projectInfo.author.id && (
                <Formsy onKeyPress={onKeyPress}>
                    <div className="inner">
                        <FlexRow className="preview-row force-row">
                            <FlexRow className="project-header">
                                <a href={`/users/${projectInfo.author.username}`}>
                                    <Avatar
                                        alt={projectInfo.author.username}
                                        src={`https://cdn2.scratch.mit.edu/get_image/user/${projectInfo.author.id}_48x48.png`}
                                    />
                                </a>
                                <div className="title">
                                    {editable ?
                                        <InplaceInput
                                            className="project-title"
                                            handleUpdate={onUpdate}
                                            name="title"
                                            validationErrors={{
                                                maxLength: intl.formatMessage({
                                                    id: 'preview.titleMaxLength'
                                                })
                                            }}
                                            validations={{
                                                maxLength: 100
                                            }}
                                            value={projectInfo.title}
                                        /> :
                                        <React.Fragment>
                                            <div
                                                className="project-title no-edit"
                                                title={projectInfo.title}
                                            >{projectInfo.title}</div>
                                            {'by '}
                                            <a href={`/users/${projectInfo.author.username}`}>
                                                {projectInfo.author.username}
                                            </a>
                                        </React.Fragment>
                                    }
                                </div>
                            </FlexRow>
                            <MediaQuery minWidth={frameless.mobile}>
                                <div className="project-buttons">
                                    {/* TODO: Hide Remix button for now until implemented */}
                                    {(!userOwnsProject && false) &&
                                        <Button className="button remix-button">
                                            <FormattedMessage id="preview.remixButton" />
                                        </Button>
                                    }
                                    <Button
                                        className="button see-inside-button"
                                        onClick={onSeeInside}
                                    >
                                        <FormattedMessage id="preview.seeInsideButton" />
                                    </Button>
                                </div>
                            </MediaQuery>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <div className="guiPlayer">
                                <IntlGUI
                                    isPlayerOnly
                                    assetHost={assetHost}
                                    backpackOptions={backpackOptions}
                                    basePath="/"
                                    className="guiPlayer"
                                    isFullScreen={isFullScreen}
                                    previewInfoVisible="false"
                                    projectHost={projectHost}
                                    projectId={projectId}
                                />
                            </div>
                            <MediaQuery maxWidth={frameless.tablet - 1}>
                                <FlexRow className="preview-row force-center">
                                    <Stats
                                        faved={faved}
                                        favoriteCount={favoriteCount}
                                        loveCount={loveCount}
                                        loved={loved}
                                        projectInfo={projectInfo}
                                        onFavoriteClicked={onFavoriteClicked}
                                        onLoveClicked={onLoveClicked}
                                    />
                                    <Subactions
                                        addToStudioOpen={addToStudioOpen}
                                        canReport={canReport}
                                        projectInfo={projectInfo}
                                        reportOpen={reportOpen}
                                        shareDate={shareDate}
                                        onAddToStudioClicked={onAddToStudioClicked}
                                        onAddToStudioClosed={onAddToStudioClosed}
                                        onReportClicked={onReportClicked}
                                        onReportClose={onReportClose}
                                        onReportSubmit={onReportSubmit}
                                        onToggleStudio={onToggleStudio}
                                    />
                                </FlexRow>
                            </MediaQuery>
                            <FlexRow className="project-notes">
                                <RemixCredit projectInfo={parentInfo} />
                                <RemixCredit projectInfo={originalInfo} />
                                {/*  eslint-disable max-len */}
                                <MediaQuery maxWidth={frameless.tablet - 1}>
                                    <FlexRow className="preview-row">
                                        <FlexRow className="extension-list">
                                            {extensions && extensions.map(extension => (
                                                <ExtensionChip
                                                    extensionL10n={extension.l10nId}
                                                    extensionName={extension.name}
                                                    hasStatus={extension.hasStatus}
                                                    iconURI={extension.icon && `/svgs/project/${extension.icon}`}
                                                    key={extension.name || extension.l10nId}
                                                />
                                            ))}
                                        </FlexRow>
                                    </FlexRow>
                                </MediaQuery>
                                <FlexRow className="description-block">
                                    <div className="project-textlabel">
                                        <FormattedMessage id="preview.instructionsLabel" />
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
                                        <FormattedMessage id="preview.notesAndCreditsLabel" />
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
                        <MediaQuery minWidth={frameless.tablet}>
                            <FlexRow className="preview-row">
                                <Stats
                                    faved={faved}
                                    favoriteCount={favoriteCount}
                                    loveCount={loveCount}
                                    loved={loved}
                                    projectInfo={projectInfo}
                                    onFavoriteClicked={onFavoriteClicked}
                                    onLoveClicked={onLoveClicked}
                                />
                                <Subactions
                                    addToStudioOpen={addToStudioOpen}
                                    canAddToStudio={canAddToStudio}
                                    canReport={canReport}
                                    projectInfo={projectInfo}
                                    reportOpen={reportOpen}
                                    shareDate={shareDate}
                                    onAddToStudioClicked={onAddToStudioClicked}
                                    onAddToStudioClosed={onAddToStudioClosed}
                                    onReportClicked={onReportClicked}
                                    onReportClose={onReportClose}
                                    onReportSubmit={onReportSubmit}
                                    onToggleStudio={onToggleStudio}
                                />
                            </FlexRow>
                        </MediaQuery>
                        <MediaQuery minWidth={frameless.tablet}>
                            <FlexRow className="preview-row">
                                <FlexRow className="extension-list">
                                    {extensions && extensions.map(extension => (
                                        <ExtensionChip
                                            extensionL10n={extension.l10nId}
                                            extensionName={extension.name}
                                            hasStatus={extension.hasStatus}
                                            iconURI={extension.icon && `/svgs/project/${extension.icon}`}
                                            key={extension.name || extension.l10nId}
                                        />
                                    ))}
                                </FlexRow>
                            </FlexRow>
                        </MediaQuery>
                    </div>
                    <div className="project-lower-container">
                        <div className="inner">
                            <FlexRow className="preview-row">
                                <div className="comments-container">
                                    <FlexRow className="comments-header">
                                        <h4><FormattedMessage id="preview.comments.header" /></h4>
                                        {userOwnsProject ? (
                                            <div>
                                                <label>
                                                    <input
                                                        checked={!projectInfo.comments_allowed}
                                                        className="comments-allowed-input"
                                                        type="checkbox"
                                                        onChange={onToggleComments}
                                                    />
                                                    <FormattedMessage id="preview.comments.turnOff" />
                                                </label>
                                            </div>
                                        ) : null}
                                    </FlexRow>

                                    <FlexRow className="comments-root-reply">
                                        {projectInfo.comments_allowed ? (
                                            isLoggedIn ? (
                                                <ComposeComment
                                                    projectId={projectId}
                                                    onAddComment={onAddComment}
                                                />
                                            ) : (
                                                /* TODO add box for signing in to leave a comment */
                                                null
                                            )
                                        ) : (
                                            <div className="comments-turned-off">
                                                <FormattedMessage id="preview.comments.turnedOff" />
                                            </div>
                                        )}
                                    </FlexRow>

                                    <FlexRow className="comments-list">
                                        {comments.map(comment => (
                                            <TopLevelComment
                                                author={comment.author}
                                                canDelete={canDeleteComments}
                                                canReply={isLoggedIn && projectInfo.comments_allowed}
                                                canReport={isLoggedIn}
                                                canRestore={canRestoreComments}
                                                content={comment.content}
                                                datetimeCreated={comment.datetime_created}
                                                id={comment.id}
                                                key={comment.id}
                                                parentId={comment.parent_id}
                                                projectId={projectId}
                                                replies={replies && replies[comment.id] ? replies[comment.id] : []}
                                                visibility={comment.visibility}
                                                onAddComment={onAddComment}
                                                onDelete={onDeleteComment}
                                                onReport={onReportComment}
                                                onRestore={onRestoreComment}
                                            />
                                        ))}
                                        {loadedCommentCount < projectInfo.stats.comments &&
                                        <Button
                                            className="button load-more-button"
                                            onClick={onLoadMore}
                                        >
                                            <FormattedMessage id="general.loadMore" />
                                        </Button>
                                        }
                                    </FlexRow>
                                </div>
                                <FlexRow className="column">
                                    <RemixList remixes={remixes} />
                                    <StudioList studios={projectStudios} />
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
    addToStudioOpen: PropTypes.bool,
    assetHost: PropTypes.string,
    backpackOptions: PropTypes.shape({
        host: PropTypes.string,
        visible: PropTypes.bool
    }),
    canAddToStudio: PropTypes.bool,
    canDeleteComments: PropTypes.bool,
    canReport: PropTypes.bool,
    canRestoreComments: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.object),
    editable: PropTypes.bool,
    extensions: PropTypes.arrayOf(PropTypes.object),
    faved: PropTypes.bool,
    favoriteCount: PropTypes.number,
    intl: intlShape,
    isFullScreen: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isShared: PropTypes.bool,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    onAddComment: PropTypes.func,
    onAddToStudioClicked: PropTypes.func,
    onAddToStudioClosed: PropTypes.func,
    onDeleteComment: PropTypes.func,
    onFavoriteClicked: PropTypes.func,
    onLoadMore: PropTypes.func,
    onLoveClicked: PropTypes.func,
    onReportClicked: PropTypes.func.isRequired,
    onReportClose: PropTypes.func.isRequired,
    onReportComment: PropTypes.func.isRequired,
    onReportSubmit: PropTypes.func.isRequired,
    onRestoreComment: PropTypes.func,
    onSeeInside: PropTypes.func,
    onShare: PropTypes.func,
    onToggleComments: PropTypes.func,
    onToggleStudio: PropTypes.func,
    onUpdate: PropTypes.func,
    originalInfo: projectShape,
    parentInfo: projectShape,
    projectHost: PropTypes.string,
    projectId: PropTypes.string,
    projectInfo: projectShape,
    projectStudios: PropTypes.arrayOf(PropTypes.object),
    remixes: PropTypes.arrayOf(PropTypes.object),
    replies: PropTypes.objectOf(PropTypes.array),
    reportOpen: PropTypes.bool,
    userOwnsProject: PropTypes.bool
};

module.exports = injectIntl(PreviewPresentation);
