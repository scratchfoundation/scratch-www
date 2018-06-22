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
const ExtensionChip = require('./extension-chip.jsx');

const projectShape = require('./projectshape.jsx').projectShape;
require('./preview.scss');

const PreviewPresentation = ({
    editable,
    extensions,
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
    return (
        <div className="preview">
            <ShareBanner shared={isShared} />
            
            { projectInfo && projectInfo.author && projectInfo.author.id && (
                <div className="inner">
                    <Formsy>
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
                        <FlexRow className="preview-row">
                            <div className="comments-container">
                                <div className="project-title" />
                            </div>
                            <FlexRow className="column">
                                <RemixList remixes={remixes} />
                                <StudioList studios={studios} />
                            </FlexRow>
                        </FlexRow>
                    </Formsy>
                </div>
            )}
        </div>
    );
};

PreviewPresentation.propTypes = {
    editable: PropTypes.bool,
    extensions: PropTypes.arrayOf(PropTypes.object),
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
