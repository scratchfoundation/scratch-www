const bindAll = require('lodash.bindall');
const FormattedDate = require('react-intl').FormattedDate;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');
const Formsy = require('formsy-react').default;
const classNames = require('classnames');
const approx = require('approximate-number');

const GUI = require('scratch-gui').default;
const IntlGUI = injectIntl(GUI);

const sessionActions = require('../../redux/session.js');
const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const CappedNumber = require('../../components/cappednumber/cappednumber.jsx');
const ShareBanner = require('../../components/share-banner/share-banner.jsx');
const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');
const InplaceInput = require('../../components/forms/inplace-input.jsx');
const ReportModal = require('../../components/modal/report/modal.jsx');
const ExtensionChip = require('./extension-chip.jsx');

const projectShape = require('./projectshape.jsx').projectShape;
require('./preview.scss');

class PreviewPresentation extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleReportClick',
            'handleReportClose',
            'handleReportSubmit'
        ]);
        this.state = {
            reportOpen: false
        };
    }
    handleReportClick (e) {
        e.preventDefault();
        this.setState({reportOpen: true});
    }
    handleReportClose () {
        this.setState({reportOpen: false});
    }

    handleReportSubmit (formData, callback) {
        const data = {
            ...formData,
            id: this.props.projectId,
            username: this.props.user.username
        };
        console.log('submit report data', data); // eslint-disable-line no-console
        // TODO: pass error to modal via callback.
        callback();
        this.setState({reportOpen: false});
    }
    render () {
        const {
            editable,
            faved,
            favoriteCount,
            isFullScreen,
            loved,
            loveCount,
            originalInfo,
            parentInfo,
            projectId,
            projectInfo,
            remixes,
            sessionStatus,
            studios,
            user,
            onFavoriteClicked,
            onLoveClicked,
            onSeeInside,
            onUpdate
            // ...otherProps TBD
        } = this.props;
        const shareDate = (projectInfo.history && projectInfo.history.shared) ? projectInfo.history.shared : '';
        return (
            <div className="preview">
                {projectInfo.history && shareDate === '' &&
                    <ShareBanner>
                        <FlexRow className="preview-row">
                            <span className="share-text">
                                This project is not shared — so only you can see it. Click share to let everyone see it!
                            </span>
                            <Button className="button share-button">
                                Share
                            </Button>
                        </FlexRow>
                    </ShareBanner>
                }

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
                                            <div className="project-title">{projectInfo.title}</div>
                                        }
                                    </div>
                                </FlexRow>
                                <div className="project-buttons">
                                    {sessionStatus === sessionActions.Status.FETCHED &&
                                        Object.keys(user).length > 0 &&
                                        user.id !== projectInfo.author.id &&
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
                                    {parentInfo && parentInfo.author && parentInfo.id && (
                                        <FlexRow className="remix-credit">
                                            <Avatar
                                                className="remix"
                                                src={`https://cdn2.scratch.mit.edu/get_image/user/${parentInfo.author.id}_48x48.png`}
                                            />
                                            <div className="credit-text">
                                                Thanks to <a
                                                    href={`/users/${parentInfo.author.username}`}
                                                >
                                                    {parentInfo.author.username}
                                                </a> for the original project <a
                                                    href={`/preview/${parentInfo.id}`}
                                                >
                                                    {parentInfo.title}
                                                </a>.
                                            </div>
                                        </FlexRow>
                                    )}
                                    {originalInfo && originalInfo.author && originalInfo.id && (
                                        <FlexRow className="remix-credit">
                                            <Avatar
                                                className="remix"
                                                src={`https://cdn2.scratch.mit.edu/get_image/user/${originalInfo.author.id}_48x48.png`}
                                            />
                                            <div className="credit-text">
                                                Thanks to <a
                                                    href={`/users/${originalInfo.author.username}`}
                                                >
                                                    {originalInfo.author.username}
                                                </a> for the original project <a
                                                    href={`/preview/${originalInfo.id}`}
                                                >
                                                    {originalInfo.title}
                                                </a>.
                                            </div>
                                        </FlexRow>
                                    )}
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
                                        {
                                            sessionStatus === sessionActions.Status.FETCHED &&
                                            Object.keys(user).length > 0 &&
                                            user.id !== projectInfo.author.id && [
                                                <Button
                                                    className="action-button report-button"
                                                    key="report-button"
                                                    onClick={this.handleReportClick}
                                                >
                                                    Report
                                                </Button>,
                                                <ReportModal
                                                    isOpen={this.state.reportOpen}
                                                    key="report-modal"
                                                    type="project"
                                                    onReport={this.handleReportSubmit}
                                                    onRequestClose={this.handleReportClose}
                                                />
                                            ]
                                        }
                                    </FlexRow>
                                </FlexRow>
                            </FlexRow>
                            <FlexRow className="preview-row">
                                <FlexRow className="extension-list">
                                    <ExtensionChip
                                        hasStatus
                                        extensionName="LEGO WeDo 2.0"
                                        iconSrc="https://01.keybase.pub/extension-icon/wedo2.svg"
                                    />
                                    <ExtensionChip
                                        extensionName="Pen"
                                        iconSrc="https://01.keybase.pub/extension-icon/pen.svg"
                                    />
                                    <ExtensionChip
                                        extensionName="Google Translate"
                                        iconSrc="https://01.keybase.pub/extension-icon/translation.svg"
                                    />
                                </FlexRow>
                            </FlexRow>
                            <FlexRow className="preview-row">
                                <div className="comments-container">
                                    <div className="project-title">
                                        Comments go here
                                    </div>
                                </div>
                                <FlexRow className="column">
                                    {/* hide remixes if there aren't any */}
                                    {remixes && remixes.length !== 0 && (
                                        <FlexRow className="remix-list">
                                            <div className="project-title">
                                                Remixes
                                            </div>
                                            {remixes && remixes.length === 0 ? (
                                                // TODO: style remix invitation
                                                <span>Invite user to remix</span>
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
                                    )}
                                    {/* hide studios if there aren't any */}
                                    {studios && studios.length !== 0 && (
                                        <FlexRow className="studio-list">
                                            <div className="project-title">
                                                Studios
                                            </div>
                                            {studios && studios.length === 0 ? (
                                                // TODO: invite user to add to studio?
                                                <span>None </span>
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
                                    )}
                                </FlexRow>
                            </FlexRow>
                        </Formsy>
                    </div>
                )}
            </div>

        );
    }
}

PreviewPresentation.propTypes = {
    editable: PropTypes.bool,
    faved: PropTypes.bool,
    favoriteCount: PropTypes.number,
    isFullScreen: PropTypes.bool,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    onFavoriteClicked: PropTypes.func,
    onLoveClicked: PropTypes.func,
    onSeeInside: PropTypes.func,
    onUpdate: PropTypes.func,
    originalInfo: projectShape,
    parentInfo: projectShape,
    projectId: PropTypes.string,
    projectInfo: projectShape,
    remixes: PropTypes.arrayOf(PropTypes.object),
    sessionStatus: PropTypes.string.isRequired,
    studios: PropTypes.arrayOf(PropTypes.object),
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
