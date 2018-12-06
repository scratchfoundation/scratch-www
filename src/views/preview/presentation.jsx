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

const AdminPanel = require('../../components/adminpanel/adminpanel.jsx');
const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const Banner = require('./banner.jsx');
const ModInfo = require('./mod-info.jsx');
const RemixCredit = require('./remix-credit.jsx');
const RemixList = require('./remix-list.jsx');
const Stats = require('./stats.jsx');
const StudioList = require('./studio-list.jsx');
const Subactions = require('./subactions.jsx');
const InplaceInput = require('../../components/forms/inplace-input.jsx');
const TopLevelComment = require('./comment/top-level-comment.jsx');
const ComposeComment = require('./comment/compose-comment.jsx');
const ExtensionChip = require('./extension-chip.jsx');
const thumbnailUrl = require('../../lib/user-thumbnail');

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
    addToStudioOpen,
    adminModalOpen,
    assetHost,
    backpackHost,
    canAddToStudio,
    canDeleteComments,
    canRemix,
    canReport,
    canRestoreComments,
    canSave,
    canShare,
    canUseBackpack,
    cloudHost,
    comments,
    editable,
    extensions,
    faved,
    favoriteCount,
    intl,
    isFullScreen,
    isLoggedIn,
    isNewScratcher,
    isScratcher,
    isShared,
    justShared,
    loveCount,
    loved,
    modInfo,
    moreCommentsToLoad,
    onAddComment,
    onAddToStudioClicked,
    onAddToStudioClosed,
    onCopyProjectLink,
    onDeleteComment,
    onFavoriteClicked,
    onLoadMore,
    onLoveClicked,
    onRemix,
    onReportClicked,
    onReportClose,
    onReportComment,
    onReportSubmit,
    onRestoreComment,
    onSeeAllComments,
    onSeeInside,
    onShare,
    onToggleComments,
    onToggleStudio,
    onUpdate,
    onUpdateProjectId,
    originalInfo,
    parentInfo,
    projectHost,
    projectId,
    projectInfo,
    projectStudios,
    remixes,
    replies,
    reportOpen,
    showModInfo,
    singleCommentId,
    userOwnsProject,
    visibilityInfo
}) => {
    const shareDate = ((projectInfo.history && projectInfo.history.shared)) ? projectInfo.history.shared : '';
    const revisedDate = ((projectInfo.history && projectInfo.history.modified)) ? projectInfo.history.modified : '';

    // Allow embedding html in banner messages coming from the server
    const embedCensorMessage = message => (
        // eslint-disable-next-line react/no-danger
        <span dangerouslySetInnerHTML={{__html: message}} />
    );

    let banner;
    if (visibilityInfo.deleted) { // If both censored and deleted, prioritize deleted banner
        banner = (<Banner
            className="banner-danger"
            message={<FormattedMessage id="project.deletedBanner" />}
        />);
    } else if (visibilityInfo.censored) {
        if (visibilityInfo.reshareable) {
            banner = (<Banner
                actionMessage={<FormattedMessage id="project.share.shareButton" />}
                className="banner-danger"
                message={embedCensorMessage(visibilityInfo.message)}
                onAction={onShare}
            />);
        } else {
            banner = (<Banner
                className="banner-danger"
                message={embedCensorMessage(visibilityInfo.message)}
            />);
        }
    } else if (canShare) {
        if (isShared && justShared) { // if was shared a while ago, don't show any share banner
            if (isNewScratcher) {
                banner = (<Banner
                    className="banner-success"
                    message={<FormattedMessage id="project.share.sharedLong" />}
                />);
            } else {
                banner = (<Banner
                    className="banner-success"
                    message={<FormattedMessage id="project.share.sharedShort" />}
                />);
            }
        } else if (!isShared) {
            banner = (<Banner
                actionMessage={<FormattedMessage id="project.share.shareButton" />}
                message={<FormattedMessage id="project.share.notShared" />}
                onAction={onShare}
            />);
        }
    }

    return (
        <div className="preview">
            <AdminPanel
                className={classNames('project-admin-panel', {
                    'modal-open': adminModalOpen
                })}
            >
                <iframe
                    className={classNames('admin-iframe', {
                        'modal-open': adminModalOpen
                    })}
                    src={`/scratch2/${projectId}/adminpanel/`}
                />
            </AdminPanel>
            { projectInfo && projectInfo.author && projectInfo.author.id && (
                <React.Fragment>
                    {banner}
                    <div className="inner">
                        <FlexRow className="preview-row force-row">
                            <FlexRow className="project-header">
                                <a href={`/users/${projectInfo.author.username}`}>
                                    <Avatar
                                        alt={projectInfo.author.username}
                                        src={thumbnailUrl(projectInfo.author.id, 48)}
                                    />
                                </a>
                                <div className="title">
                                    {editable ?
                                        <Formsy onKeyPress={onKeyPress}>
                                            <InplaceInput
                                                className="project-title"
                                                handleUpdate={onUpdate}
                                                name="title"
                                                validationErrors={{
                                                    maxLength: intl.formatMessage({
                                                        id: 'project.titleMaxLength'
                                                    })
                                                }}
                                                validations={{
                                                    maxLength: 100
                                                }}
                                                value={projectInfo.title}
                                            />
                                        </Formsy> :
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
                                    {canRemix &&
                                        <Button
                                            className="button remix-button"
                                            onClick={onRemix}
                                        >
                                            <FormattedMessage id="project.remixButton" />
                                        </Button>
                                    }
                                    <Button
                                        className="button see-inside-button"
                                        onClick={onSeeInside}
                                    >
                                        <FormattedMessage id="project.seeInsideButton" />
                                    </Button>
                                </div>
                            </MediaQuery>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <div className="guiPlayer">
                                <IntlGUI
                                    isPlayerOnly
                                    assetHost={assetHost}
                                    backpackHost={backpackHost}
                                    backpackVisible={canUseBackpack}
                                    basePath="/"
                                    canRemix={canRemix}
                                    canSave={canSave}
                                    className="guiPlayer"
                                    cloudHost={cloudHost}
                                    hasCloudPermission={isScratcher}
                                    isFullScreen={isFullScreen}
                                    previewInfoVisible="false"
                                    projectHost={projectHost}
                                    projectId={projectId}
                                    onUpdateProjectId={onUpdateProjectId}
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
                                        onCopyProjectLink={onCopyProjectLink}
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
                                        <FormattedMessage id="project.instructionsLabel" />
                                    </div>
                                    {editable ?
                                        <Formsy
                                            className="project-description-form"
                                            onKeyPress={onKeyPress}
                                        >
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
                                            />
                                        </Formsy> :
                                        <div className="project-description">
                                            {decorateText(projectInfo.instructions, {
                                                usernames: true,
                                                hashtags: true,
                                                scratchLinks: false
                                            })}
                                        </div>
                                    }
                                </FlexRow>
                                <FlexRow className="description-block">
                                    <div className="project-textlabel">
                                        <FormattedMessage id="project.notesAndCreditsLabel" />
                                    </div>
                                    {editable ?
                                        <Formsy
                                            className="project-description-form"
                                            onKeyPress={onKeyPress}
                                        >
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
                                            />
                                        </Formsy> :
                                        <div className="project-description last">
                                            {decorateText(projectInfo.description, {
                                                usernames: true,
                                                hashtags: true,
                                                scratchLinks: false
                                            })}
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
                                    onCopyProjectLink={onCopyProjectLink}
                                    onReportClicked={onReportClicked}
                                    onReportClose={onReportClose}
                                    onReportSubmit={onReportSubmit}
                                    onToggleStudio={onToggleStudio}
                                />
                            </FlexRow>
                        </MediaQuery>
                        {showModInfo &&
                            <React.Fragment>
                                <div className="project-textlabel">
                                    <FormattedMessage id="project.moderationInfoLabel" />
                                </div>
                                <ModInfo
                                    revisedDate={revisedDate}
                                    scripts={modInfo.scripts}
                                    sprites={modInfo.sprites}
                                />

                            </React.Fragment>
                        }


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
                                        <h4><FormattedMessage id="project.comments.header" /></h4>
                                        {userOwnsProject ? (
                                            <div>
                                                <label>
                                                    <input
                                                        checked={!projectInfo.comments_allowed}
                                                        className="comments-allowed-input"
                                                        type="checkbox"
                                                        onChange={onToggleComments}
                                                    />
                                                    <FormattedMessage id="project.comments.turnOff" />
                                                </label>
                                            </div>
                                        ) : null}
                                    </FlexRow>

                                    {/* Do not show the top-level comment form in single comment mode */}
                                    {!singleCommentId && (
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
                                                    <FormattedMessage id="project.comments.turnedOff" />
                                                </div>
                                            )}
                                        </FlexRow>
                                    )}

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
                                                defaultExpanded={!!singleCommentId}
                                                highlightedCommentId={singleCommentId}
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
                                        {moreCommentsToLoad &&
                                        <Button
                                            className="button load-more-button"
                                            onClick={onLoadMore}
                                        >
                                            <FormattedMessage id="general.loadMore" />
                                        </Button>
                                        }
                                        {!!singleCommentId &&
                                            <Button
                                                className="button load-more-button"
                                                onClick={onSeeAllComments}
                                            >
                                                <FormattedMessage id="general.seeAllComments" />
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
                </React.Fragment>
            )}
        </div>
    );
};

PreviewPresentation.propTypes = {
    addToStudioOpen: PropTypes.bool,
    adminModalOpen: PropTypes.bool,
    assetHost: PropTypes.string,
    backpackHost: PropTypes.string,
    canAddToStudio: PropTypes.bool,
    canDeleteComments: PropTypes.bool,
    canRemix: PropTypes.bool,
    canReport: PropTypes.bool,
    canRestoreComments: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    canUseBackpack: PropTypes.bool,
    cloudHost: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    editable: PropTypes.bool,
    extensions: PropTypes.arrayOf(PropTypes.object),
    faved: PropTypes.bool,
    favoriteCount: PropTypes.number,
    intl: intlShape,
    isFullScreen: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isNewScratcher: PropTypes.bool,
    isScratcher: PropTypes.bool,
    isShared: PropTypes.bool,
    justShared: PropTypes.bool,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    modInfo: PropTypes.shape({
        scripts: PropTypes.number,
        sprites: PropTypes.number
    }),
    moreCommentsToLoad: PropTypes.bool,
    onAddComment: PropTypes.func,
    onAddToStudioClicked: PropTypes.func,
    onAddToStudioClosed: PropTypes.func,
    onCopyProjectLink: PropTypes.func,
    onDeleteComment: PropTypes.func,
    onFavoriteClicked: PropTypes.func,
    onLoadMore: PropTypes.func,
    onLoveClicked: PropTypes.func,
    onRemix: PropTypes.func,
    onReportClicked: PropTypes.func.isRequired,
    onReportClose: PropTypes.func.isRequired,
    onReportComment: PropTypes.func.isRequired,
    onReportSubmit: PropTypes.func.isRequired,
    onRestoreComment: PropTypes.func,
    onSeeAllComments: PropTypes.func,
    onSeeInside: PropTypes.func,
    onShare: PropTypes.func,
    onToggleComments: PropTypes.func,
    onToggleStudio: PropTypes.func,
    onUpdate: PropTypes.func,
    onUpdateProjectId: PropTypes.func,
    originalInfo: projectShape,
    parentInfo: projectShape,
    projectHost: PropTypes.string,
    projectId: PropTypes.string,
    projectInfo: projectShape,
    projectStudios: PropTypes.arrayOf(PropTypes.object),
    remixes: PropTypes.arrayOf(PropTypes.object),
    replies: PropTypes.objectOf(PropTypes.array),
    reportOpen: PropTypes.bool,
    showModInfo: PropTypes.bool,
    singleCommentId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    userOwnsProject: PropTypes.bool,
    visibilityInfo: PropTypes.shape({
        censored: PropTypes.bool,
        message: PropTypes.string,
        deleted: PropTypes.bool,
        reshareable: PropTypes.bool
    })
};

module.exports = injectIntl(PreviewPresentation);
