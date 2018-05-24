const bindAll = require('lodash.bindall');
const FormattedDate = require('react-intl').FormattedDate;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');
const Formsy = require('formsy-react').default;
const classNames = require('classnames');

const GUI = require('scratch-gui').default;
const IntlGUI = injectIntl(GUI);

const sessionActions = require('../../redux/session.js');
const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');
const Form = require('../../components/forms/form.jsx');
const Input = require('../../components/forms/input.jsx');
const Select = require('../../components/forms/select.jsx');
const Spinner = require('../../components/spinner/spinner.jsx');
const TextArea = require('../../components/forms/textarea.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const CappedNumber = require('../../components/cappednumber/cappednumber.jsx');
const ShareBanner = require('../../components/share-banner/share-banner.jsx');
const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');
const InplaceInput = require('../../components/forms/inplace-input.jsx');
const ReportModal = require('../../components/modal/report/modal.jsx');


require('./preview.scss');

class PreviewPresentation extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleReportClick',
            'handleReportClose',
            'handleReportReasonSelect',
            'handleReportSubmit'
        ]);
        this.state = {
            reportOpen: false,
            reportPrompt: 'Select a reason why above.',
            reportReason: ''
        };
    }
    handleReportClick (e) {
        e.preventDefault();
        this.setState({reportOpen: true});
    }
    handleReportClose () {
        this.setState({reportOpen: false});
    }
    handleReportReasonSelect (name, value) {
        const prompts = [
            'Please provide a link to the original project',
            'Please provide links to the uncredited content',
            'Please say why the project is too violent or scary',
            'Please say where the inappropriate language occurs in the project (For example: Notes & Credits, sprite name, project text, etc.)',
            'Please say the name of the audio file with the inappropriate music',
            'Please say where the personal contact information is shared (For example: Notes & Credits, sprite name, project text, etc.)',
            'Please be specific about why this project does not follow our Community Guidelines',
            'not used',
            'Please say the name of the sprite or the backdrop with the inappropriate image'
        ];
        this.setState({reportPrompt: prompts[value]});
    }
    handleReportSubmit (formData) {
        console.log('submit report data', formData);
        this.setState({reportOpen: false});
    }
    render () {
        const {
            editable,
            faved,
            favoriteCount,
            intl,
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
                                This project is not shared — so only you can see it. Click share to     let everyone see it!
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
                                    <Avatar
                                        src={`https://cdn2.scratch.mit.edu/get_image/user/${projectInfo. author.id}_48x48.png`}
                                    />
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
                                                    // TODO: actual 100
                                                    maxLength: 40
                                                }}
                                                value={projectInfo.title}
                                            /> :
                                            <div className="project-title">{projectInfo.title}</div>
                                        }
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
                                                    {remixes: parentInfo && parentInfo.author}
                                                )}
                                                handleUpdate={onUpdate}
                                                name="description"
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
                                </FlexRow>
                            </FlexRow>
                            <FlexRow className="preview-row">
                                <FlexRow className="stats">
                                    <div
                                        className={classNames('project-loves', {loved: loved})}
                                        key="loves"
                                        onClick={onLoveClicked}
                                    >
                                        {loveCount}
                                    </div>
                                    <div
                                        className={classNames('project-favorites', {favorited: faved})}
                                        key="favorites"
                                        onClick={onFavoriteClicked}
                                    >
                                        {favoriteCount}
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
                                                    contentLabel="Report Project"
                                                    isOpen={this.state.reportOpen}
                                                    key="report-modal"
                                                    onRequestClose={this.handleReportClose}
                                                    onSubmit={this.handleReportSubmit}
                                                >
                                                    From the dropdown below, please select the reason why you feel this project is disrespectful or inappropriate or otherwise breaks the Scratch Community Guidelines.
                                                    <Form
                                                        className="report"
                                                        onSubmit={this.handleReportSubmit}
                                                    >
                                                        <Input
                                                            name="projectId"
                                                            type="hidden"
                                                            value={projectId}
                                                        />
                                                        <Input
                                                            name="username"
                                                            type="hidden"
                                                            value={user.username}
                                                        />
                                                        <Select
                                                            required
                                                            name="reason"
                                                            options={[
                                                                {
                                                                    value: '',
                                                                    label: 'Select a reason'
                                                                },
                                                                {
                                                                    value: '0',
                                                                    label: 'Exact Copy of Project'
                                                                },
                                                                {
                                                                    value: '1',
                                                                    label: 'Uses Image/Music Without Credit'
                                                                },
                                                                {
                                                                    value: '2',
                                                                    label: 'Too Violent or Scary'
                                                                },
                                                                {
                                                                    value: '3',
                                                                    label: 'Inappropriate Language'
                                                                },
                                                                {
                                                                    value: '4',
                                                                    label: 'Inappropriate Music'
                                                                },
                                                                {
                                                                    value: '8',
                                                                    label: 'Inappropriate Images'
                                                                },
                                                                {
                                                                    value: '5',
                                                                    label: 'Sharing Personal Contact Information'
                                                                },
                                                                {
                                                                    value: '6',
                                                                    label: 'Other'
                                                                }
                                                            ]}
                                                            value={this.state.reportReason}
                                                            onChange={this.handleReportReasonSelect}
                                                        />
                                                        <TextArea
                                                            required
                                                            className="report-text"
                                                            name="reportText"
                                                            placeholder={this.state.reportPrompt}
                                                            validationErrors={{
                                                                maxLength: 'That\'s too long! Please find a way to shorten your text.',
                                                                minLength: 'That\'s too short. Please describe in detail what\'s inappropriate or disrespectful about the project.'
                                                            }}
                                                            validations={{
                                                                // TODO find out max and min characters
                                                                maxLength: 500,
                                                                minLength: 30
                                                            }}
                                                        />
                                                        {this.state.reportWaiting ? [
                                                            <Button
                                                                className="submit-button white"
                                                                disabled="disabled"
                                                                key="submitButton"
                                                                type="submit"
                                                            >
                                                                <Spinner />
                                                            </Button>
                                                        ] : [
                                                            <Button
                                                                className="submit-button white"
                                                                key="submitButton"
                                                                type="submit"
                                                            >
                                                                Send
                                                            </Button>
                                                        ]}
                                                    </Form>
                                                </ReportModal>
                                                
                                            ]
                                        }
                                        
                                        
                                    </FlexRow>
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
    intl: intlShape,
    isFullScreen: PropTypes.bool,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    onFavoriteClicked: PropTypes.func,
    onLoveClicked: PropTypes.func,
    onSeeInside: PropTypes.func,
    onUpdate: PropTypes.func,
    originalInfo: PropTypes.shape({
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
    parentInfo: PropTypes.shape({
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
    projectId: PropTypes.string,
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
