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
                                        // eslint-disable-next-line max-len
                                        iconURI="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+d2VkbzItYmxvY2staWNvbjwvdGl0bGU+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzUuMzEzIDEwLjQ2N0gzMi4wOVY4Ljg2NWMwLS4yMjMuMTgtLjQwNC40MDUtLjQwNGgyLjQxMmMuMjI0IDAgLjQwNi4xODIuNDA2LjQwNXYxLjYwMnpNMzAuNDc3IDEwLjQ2N2gtMy4yMjRWOC44NjVjMC0uMjIzLjE4My0uNDA0LjQwNy0uNDA0aDIuNDFjLjIyNiAwIC40MDcuMTgyLjQwNy40MDV2MS42MDJ6TTI1LjY0IDEwLjQ2N0gyMi40MlY4Ljg2NWMwLS4yMjMuMTgyLS40MDQuNDA2LS40MDRoMi40MWMuMjI2IDAgLjQwNy4xODIuNDA3LjQwNXYxLjYwMnpNMjAuODA2IDEwLjQ2N2gtMy4yMjRWOC44NjVjMC0uMjIzLjE4Mi0uNDA0LjQwNi0uNDA0SDIwLjRjLjIyNCAwIC40MDYuMTgyLjQwNi40MDV2MS42MDJ6TTE1Ljk3IDEwLjQ2N2gtMy4yMjRWOC44NjVjMC0uMjIzLjE4Mi0uNDA0LjQwNy0uNDA0aDIuNDFjLjIyNiAwIC40MDcuMTgyLjQwNy40MDV2MS42MDJ6TTExLjEzNSAxMC40NjdINy45MVY4Ljg2NWMwLS4yMjMuMTgzLS40MDQuNDA3LS40MDRoMi40MTJjLjIyMyAwIC40MDUuMTgyLjQwNS40MDV2MS42MDJ6IiBzdHJva2U9IiM2Rjc4OTMiIGZpbGw9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zNy43MyAxMC40NjdINi4zYy0yLjY3IDAtNC44MzYgMi4xNTMtNC44MzYgNC44MDh2My4yMDVoMzcuMDczdi03LjIxYzAtLjQ0NC0uMzYyLS44MDMtLjgwNy0uODAzeiIgc3Ryb2tlPSIjNkY3ODkzIiBmaWxsPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMzguMTM0IDMwLjk4SDEuODY3Yy0uMjI0IDAtLjQwMy0uMTgtLjQwMy0uNFYxNi4yMzZoMzIuNzFjLjczIDAgMS40My4yODcgMS45NDUuOC41MTUuNTE0IDEuMjE1LjgwMiAxLjk0NC44MDJoLjQ3M3YxMi43NGMwIC4yMi0uMTguNC0uNDAzLjR6IiBzdHJva2U9IiM2Rjc4OTMiIGZpbGw9IiNFNkU3RTgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIHN0cm9rZT0iIzZGNzg5MyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMzQuODMgMTYuMjM3bC40ODMtMi41NjVoMy4yMjMiLz48cGF0aCBkPSJNMzguNTM2IDExLjI2OFYzMC41OGMwIC4yMi0uMTguNC0uNDAzLjRIMS44NjZjLS4yMiAwLS40MDMtLjE4LS40MDMtLjR2LTEuMjAzaDM0LjI4MmMuNjUgMCAxLjE4LS41MjQgMS4xOC0xLjE3M1YxMC40NjdoLjgwNWMuNDQ2IDAgLjgwNi4zNi44MDYuOHoiIHN0cm9rZT0iIzZGNzg5MyIgZmlsbD0iIzZGNzg5MyIgb3BhY2l0eT0iLjE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTEuNTM4IDE2LjI4aDIwLjE0OGMuMjIyIDAgLjQwMy4xOC40MDMuNHY2LjUyN2MwIC4yMjItLjE4Mi40LS40MDQuNEgxMS41MzhjLS4yMjMgMC0uNDA0LS4xNzgtLjQwNC0uNFYxNi42OGMwLS4yMi4xOC0uNC40MDQtLjQiIGZpbGw9IiNFNkU3RTgiLz48cGF0aCBkPSJNMTEuNTM4IDE2LjI4aDIwLjE0OGMuMjIyIDAgLjQwMy4xOC40MDMuNHY2LjUyN2MwIC4yMjItLjE4Mi40LS40MDQuNEgxMS41MzhjLS4yMjMgMC0uNDA0LS4xNzgtLjQwNC0uNFYxNi42OGMwLS4yMi4xOC0uNC40MDQtLjR6IiBzdHJva2U9IiM2Rjc4OTMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMi4wOSAxNi4yOHY2LjkyN2MwIC4yMjItLjE4LjQtLjQwNC40aC0yMC4xNWMtLjIyIDAtLjQtLjE4LS40LS40di0xLjJoMTguMTZjLjY1MyAwIDEuMTgtLjUyNiAxLjE4LTEuMTc0VjE2LjI4aDEuNjEzeiIgc3Ryb2tlPSIjNkY3ODkzIiBmaWxsPSIjNkU3NzkyIiBvcGFjaXR5PSIuMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMC40NzcgMTYuMjhoLTMuMjI0di0xLjYwNGMwLS4yMjMuMTgzLS40MDQuNDA3LS40MDRoMi40MWMuMjI2IDAgLjQwNy4xOC40MDcuNDA0djEuNjAzek0xNS45NyAxNi4yOGgtMy4yMjR2LTEuNjA0YzAtLjIyMy4xODItLjQwNC40MDctLjQwNGgyLjQxYy4yMjYgMCAuNDA3LjE4LjQwNy40MDR2MS42MDN6TTI1LjY0IDE2LjI4SDIyLjQydi0xLjYwNGMwLS4yMjMuMTgyLS40MDQuNDA2LS40MDRoMi40MWMuMjI2IDAgLjQwNy4xOC40MDcuNDA0djEuNjAzek0yMC44MDYgMTYuMjhoLTMuMjI0di0xLjYwNGMwLS4yMjMuMTgyLS40MDQuNDA2LS40MDRIMjAuNGMuMjI0IDAgLjQwNi4xOC40MDYuNDA0djEuNjAzeiIgc3Ryb2tlPSIjNkY3ODkzIiBmaWxsPSIjRTZFN0U4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTguNTU3IDE5LjkxYzAgMS4wMjUtLjgzNyAxLjg1Ny0xLjg3IDEuODU3LTEuMDMgMC0xLjg2Ny0uODMyLTEuODY3LTEuODU4IDAtMS4wMjcuODM3LTEuODU4IDEuODY4LTEuODU4IDEuMDMyIDAgMS44Ny44MyAxLjg3IDEuODU3ek0yMy40OCAxOS45MWMwIDEuMDI1LS44MzYgMS44NTctMS44NjggMS44NTdzLTEuODctLjgzMi0xLjg3LTEuODU4YzAtMS4wMjcuODM4LTEuODU4IDEuODctMS44NThzMS44NjguODMgMS44NjggMS44NTd6TTI4LjQwNCAxOS45MWMwIDEuMDI1LS44MzcgMS44NTctMS44NjggMS44NTctMS4wMzIgMC0xLjg3LS44MzItMS44Ny0xLjg1OCAwLTEuMDI3LjgzOC0xLjg1OCAxLjg3LTEuODU4IDEuMDMgMCAxLjg2OC44MyAxLjg2OCAxLjg1N3oiIHN0cm9rZT0iIzZGNzg5MyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE4LjU1NyAxOS45MjJjMCAxLjAyNi0uODM3IDEuODU4LTEuODcgMS44NTgtMS4wMyAwLTEuODY3LS44MzItMS44NjctMS44NTggMC0xLjAyNS44MzctMS44NTcgMS44NjgtMS44NTcgMS4wMzIgMCAxLjg3LjgzMiAxLjg3IDEuODU3TTIzLjQ4IDE5LjkyMmMwIDEuMDI2LS44MzYgMS44NTgtMS44NjggMS44NThzLTEuODctLjgzMi0xLjg3LTEuODU4YzAtMS4wMjUuODM4LTEuODU3IDEuODctMS44NTdzMS44NjguODMyIDEuODY4IDEuODU3TTI4LjQwNCAxOS45MjJjMCAxLjAyNi0uODM3IDEuODU4LTEuODY4IDEuODU4LTEuMDMyIDAtMS44Ny0uODMyLTEuODctMS44NTggMC0xLjAyNS44MzgtMS44NTcgMS44Ny0xLjg1NyAxLjAzIDAgMS44NjguODMyIDEuODY4IDEuODU3IiBmaWxsPSIjNkY3ODkzIiBvcGFjaXR5PSIuNSIvPjwvZz48L3N2Zz4="
                                    />
                                    <ExtensionChip
                                        extensionName="Music"
                                        // eslint-disable-next-line max-len
                                        iconURI="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE2LjA5IDEyLjkzN2MuMjI4IDEuMTQxLS44MzMgMi4wNjMtMi4zNzMgMi4wNjMtMS41MzUgMC0yLjk2Mi0uOTIyLTMuMTg2LTIuMDYzLS4yMy0xLjE0Mi44MzMtMi4wNjggMi4zNzItMi4wNjguMzIzIDAgLjY0MS4wNDIuOTQ1LjExN2EzLjUgMy41IDAgMCAxIC40NjguMTUxYy40MzUtLjAxLS4wNTItMS4xNDctLjkxNy02LjExNC0xLjA2Ny02LjE1MiAxLjUzLS45MzUgNC4zODQtMS4zNzcgMi44NTQtLjQ0Mi4wMzggMi40MS0xLjgyNSAxLjkyMi0xLjg2Mi0uNDkzLTIuMzI1LTMuNTc3LjEzMiA3LjM3ek03LjQ2IDguNTYzYy0xLjg2Mi0uNDkzLTIuMzI1LTMuNTc2LjEzIDcuMzdDNy44MTYgMTcuMDczIDYuNzU0IDE4IDUuMjIgMThjLTEuNTM1IDAtMi45NjEtLjkyNi0zLjE5LTIuMDY4LS4yMjQtMS4xNDIuODM3LTIuMDY3IDIuMzc1LTIuMDY3LjUwMSAwIC45ODcuMDk4IDEuNDI3LjI3Mi40MTItLjAyOC0uMDc0LTEuMTg5LS45My02LjExNEMzLjgzNCAxLjg3IDYuNDMgNy4wODcgOS4yODIgNi42NDZjMi44NTQtLjQ0Ny4wMzggMi40MS0xLjgyMyAxLjkxN3oiIGZpbGw9IiM1NzVFNzUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
                                    />
                                    <ExtensionChip
                                        extensionName="Pen"
                                        // eslint-disable-next-line max-len
                                        iconURI="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg=="
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
