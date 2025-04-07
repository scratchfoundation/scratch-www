const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const PropTypes = require('prop-types');
const {useState, useCallback} = require('react');

const Button = require('../../components/forms/button.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const {useIntl} = require('react-intl');
const {
    YoutubeVideoModal
} = require('../../components/youtube-video-modal/youtube-video-modal.jsx');
const {
    YoutubePlaylistItem
} = require('../../components/youtube-playlist-item/youtube-playlist-item.jsx');
const {CardsModal} = require('../../components/cards-modal/cards-modal.jsx');
const {useEffect} = require('react');
const {connect} = require('react-redux');
const {
    displayQualitativeFeedback,
    feedbackReducer
} = require('../../redux/qualitative-feedback.js');
const {
    IdeasGeneratorFeedback
} = require('../../components/modal/feedback/ideas-generator-feedback.jsx');
const {useRef} = require('react');
const {
    QUALITATIVE_FEEDBACK_QUESTION_ID
} = require('../../components/modal/feedback/qualitative-feedback-data.js');
const {shouldDisplayFeedbackWidget, sendUserPropertiesForFeedback} = require('../../lib/feedback.js');

require('./ideas.scss');

const tipsSectionData = [
    {
        tipImage: {
            altTextId: 'ideas.gettingStartedImageDescription',
            imageSrc: '/images/ideas/getting-started-illustration.svg'
        },
        button: {
            href: '/projects/editor/?tutorial=getStarted',
            buttonTextId: 'ideas.gettingStartedButtonText'
        }
    },
    {
        tipImage: {
            altTextId: 'ideas.seeTutorialsLibraryImageDescription',
            imageSrc: '/images/ideas/see-tutorials-library.png'
        },
        button: {
            href: '/projects/editor/?tutorial=all',
            buttonTextId: 'ideas.seeTutorialsLibraryButtonText'
        }
    },
    {
        tipImage: {
            altTextId: 'ideas.starterProjectsImageDescription',
            imageSrc: '/images/ideas/starter-projects-illustration.svg'
        },
        button: {
            href: '/starter_projects',
            buttonTextId: 'ideas.starterProjectsButton'
        }
    },
    {
        tipImage: {
            altTextId: 'ideas.cardsIllustrationDescription',
            imageSrc: '/images/ideas/cards-illustration.svg'
        },
        button: {
            hrefId: 'cards.scratch-cards-allLink',
            buttonImageSrc: '/images/ideas/download-icon.svg',
            buttonTextId: 'ideas.codingCards'
        }
    }
];

const physicalIdeasData = [
    {
        physicalIdeasImage: {
            imageSrc: '/images/ideas/micro-bit.png',
            imageClass: 'micro-bit'
        },
        physicalIdeasDescription: {
            headerId: 'ideas.microBitHeader',
            bodyId: 'ideas.microBitBody',
            hrefId: 'cards.microbit-cardsLink',
            buttonImageSrc: '/images/ideas/download-icon.svg',
            buttonTextId: 'ideas.codingCards'
        }
    },
    {
        physicalIdeasImage: {
            imageSrc: '/images/ideas/make-board.svg',
            imageClass: 'makey-makey-img'
        },
        physicalIdeasDescription: {
            headerId: 'ideas.makeyMakeyHeader',
            bodyId: 'ideas.makeyMakeyBody',
            hrefId: 'cards.makeymakey-cardsLink',
            buttonImageSrc: '/images/ideas/download-icon.svg',
            buttonTextId: 'ideas.codingCards'
        }
    }
];

const playlists = {
    'sprites-and-vectors': 'ideas.spritesAndVector',
    'tips-and-tricks': 'ideas.tipsAndTricks',
    'advanced-topics': 'ideas.advancedTopics'
};

const Ideas = ({
    displayFeedback,
    feedback,
    permissions,
    user
}) => {
    const intl = useIntl();
    const [youtubeVideoId, setYoutubeVideoId] = useState('');
    const [isCardsModalOpen, setCardsModalOpen] = useState(false);
    const iframeRef = useRef(null);

    const onCloseVideoModal = useCallback(
        () => setYoutubeVideoId(''),
        [setYoutubeVideoId]
    );
    const onSelectedVideo = useCallback(
        videoId => setYoutubeVideoId(videoId),
        [setYoutubeVideoId]
    );

    const onCardsModalOpen = useCallback(
        () => setCardsModalOpen(true),
        [isCardsModalOpen]
    );
    const onCardsModalClose = useCallback(
        () => setCardsModalOpen(false),
        [isCardsModalOpen]
    );

    useEffect(() => {
        const iframe = iframeRef.current;

        const onGreenFlagClick = () => {
            displayFeedback(QUALITATIVE_FEEDBACK_QUESTION_ID.ideasGenerator);
        };

        const addGreenFlagClickListeners = () => {
            const greenFlagElements = iframe.contentWindow.document.querySelectorAll(
                '[class*="green-flag"]'
            );

            greenFlagElements.forEach(element => {
                element.addEventListener('click', onGreenFlagClick);
            });
        };

        const onIframeLoad = () => {
            if (iframe && iframe.contentWindow.document) {
                addGreenFlagClickListeners(iframe);
            }
        };

        const shouldDisplayFeedback = shouldDisplayFeedbackWidget(
            user,
            permissions,
            QUALITATIVE_FEEDBACK_QUESTION_ID.ideasGenerator,
            process.env.QUALITATIVE_FEEDBACK_IDEAS_GENERATOR_USER_FREQUENCY,
            feedback
        );
        
        if (iframe && shouldDisplayFeedback) {
            sendUserPropertiesForFeedback(
                user,
                permissions,
                shouldDisplayFeedback
            );
            iframe.addEventListener('load', onIframeLoad);
        }

        return () => {
            if (iframe) {
                iframe.contentWindow.document
                    .querySelectorAll('[class*="green-flag"]')
                    .forEach(element =>
                        element.removeEventListener('click', onGreenFlagClick)
                    );
                iframe.removeEventListener('load', onIframeLoad);
            }
        };
    }, [displayFeedback, user, permissions, feedback]);

    return (
        <div>
            <IdeasGeneratorFeedback
                isOpen={feedback[QUALITATIVE_FEEDBACK_QUESTION_ID.ideasGenerator]}
            />
            <div className="banner-wrapper">
                <iframe
                    ref={iframeRef}
                    src={`${process.env.IDEAS_GENERATOR_SOURCE}/embed`}
                    width="485"
                    height="402"
                    allowfullscreen
                    className="ideas-project"
                />
                <div className="banner-description">
                    <div className="title">
                        <FormattedMessage id="ideas.headerTitle" />
                    </div>
                    <p>
                        <FormattedMessage
                            id="ideas.headerDescription"
                            values={{
                                a: chunks => (
                                    <a href={process.env.IDEAS_GENERATOR_SOURCE}>{chunks}</a>
                                )
                            }}
                        />
                    </p>
                </div>
            </div>
            <div className="tips">
                <div className="inner">
                    <div className="section-header">
                        <FormattedMessage id="ideas.startHereText" />
                    </div>
                    <section className="tips-section">
                        {tipsSectionData.map((tipData, index) => (
                            <div
                                key={index}
                                className="tip"
                            >
                                <img
                                    alt={intl.formatMessage({
                                        id: tipData.tipImage.altTextId
                                    })}
                                    src={tipData.tipImage.imageSrc}
                                    className="tips-img"
                                />
                                <a
                                    href={
                                        tipData.button.href ?
                                            tipData.button.href :
                                            intl.formatMessage({
                                                id: tipData.button.hrefId
                                            })
                                    }
                                    {...(tipData.button.hrefId ?
                                        {target: '_blank', rel: 'noopener noreferrer'} :
                                        {})}
                                >
                                    <Button className="tips-button">
                                        {tipData.button.buttonImageSrc && (
                                            <img src={tipData.button.buttonImageSrc} />
                                        )}
                                        <FormattedMessage id={tipData.button.buttonTextId} />
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
            <div className="youtube-videos">
                <div className="inner">
                    <div className="section-header">
                        <img src="/images/ideas/youtube-icon.svg" />
                        <div>
                            <div className="section-title">
                                <FormattedMessage id="ideas.scratchYouTubeChannel" />
                            </div>
                            <div className="section-description">
                                <FormattedMessage
                                    id="ideas.scratchYouTubeChannelDescription"
                                    values={{
                                        a: chunks => (
                                            <a href="https://www.youtube.com/@ScratchTeam">
                                                {chunks}
                                            </a>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <section className="playlists">
                        {Object.keys(playlists).map(playlistKey => (
                            <YoutubePlaylistItem
                                key={playlistKey}
                                playlistRequestUri={`/ideas/videos/${playlistKey}`}
                                playlistTitleId={playlists[playlistKey]}
                                onSelectedVideo={onSelectedVideo}
                            />
                        ))}
                        <YoutubeVideoModal
                            videoId={youtubeVideoId}
                            onClose={onCloseVideoModal}
                        />
                    </section>
                    <div className="download-cards">
                        <Button
                            className="pass"
                            onClick={onCardsModalOpen}
                        >
                            <img src="/images/ideas/download-icon.svg" />
                        </Button>
                        <FormattedMessage
                            id="ideas.downloadGuides"
                            values={{
                                strong: chunks => <strong>{chunks}</strong>,
                                a: chunks => <a onClick={onCardsModalOpen}>{chunks}</a>
                            }}
                        />
                        <CardsModal
                            isOpen={isCardsModalOpen}
                            onClose={onCardsModalClose}
                        />
                    </div>
                </div>
            </div>
            <div className="physical-ideas">
                <div className="inner">
                    <div className="section-header">
                        <FormattedMessage id="ideas.physicalPlayIdeas" />
                    </div>
                    <FlexRow
                        as="section"
                        className="physical-ideas-section"
                    >
                        {physicalIdeasData.map((physicalIdea, index) => (
                            <div
                                key={index}
                                className="physical-idea"
                            >
                                <img
                                    src={physicalIdea.physicalIdeasImage.imageSrc}
                                    className={physicalIdea.physicalIdeasImage.imageClass}
                                />
                                <div className="physical-idea-description">
                                    <h3>
                                        <FormattedMessage
                                            id={physicalIdea.physicalIdeasDescription.headerId}
                                        />
                                    </h3>
                                    <p>
                                        <FormattedMessage
                                            id={physicalIdea.physicalIdeasDescription.bodyId}
                                        />
                                    </p>
                                    <a
                                        href={intl.formatMessage({
                                            id: physicalIdea.physicalIdeasDescription.hrefId
                                        })}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="tips-button">
                                            <img
                                                src={
                                                    physicalIdea.physicalIdeasDescription.buttonImageSrc
                                                }
                                            />
                                            <FormattedMessage
                                                id={physicalIdea.physicalIdeasDescription.buttonTextId}
                                            />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </FlexRow>
                </div>
            </div>
            <div className="gray-area">
                <div className="inner">
                    <FlexRow
                        as="section"
                        className="tips-info-section"
                    >
                        <div className="tips-info-body mod-narrow">
                            <img
                                className="tips-icon"
                                alt=""
                                src="/images/tips/download-icon.svg"
                            />
                            <h3>
                                <FormattedMessage id="ideas.desktopEditorHeader" />
                            </h3>
                            <p>
                                <FormattedMessage
                                    id="ideas.desktopEditorBodyHTML"
                                    values={{a: chunks => <a href="/download">{chunks}</a>}}
                                />
                            </p>
                        </div>
                        <div className="tips-info-body mod-narrow">
                            <img
                                className="tips-icon"
                                alt=""
                                src="/images/tips/question-icon.svg"
                            />
                            <h3>
                                <FormattedMessage id="ideas.questionsHeader" />
                            </h3>
                            <p>
                                <FormattedMessage
                                    id="ideas.questionsBodyHTML"
                                    values={{
                                        faq: chunks => <a href="/info/faq">{chunks}</a>,
                                        forum: chunks => <a href="/discuss/7/">{chunks}</a>
                                    }}
                                />
                            </p>
                        </div>
                    </FlexRow>
                </div>
            </div>
        </div>
    );
};

Ideas.propTypes = {
    displayFeedback: PropTypes.func,
    feedback: PropTypes.object,
    permissions: PropTypes.object,
    user: PropTypes.shape({
        id: PropTypes.number,
        banned: PropTypes.bool,
        vpn_required: PropTypes.bool,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        dateJoined: PropTypes.string,
        email: PropTypes.string,
        classroomId: PropTypes.string
    })
};

Ideas.defaultProps = {
    permissions: {},
    user: {}
};

const mapStateToProps = state => ({
    feedback: state.feedback,
    permissions: state.permissions,
    user: state.session.session.user
});

const mapDispatchToProps = dispatch => ({
    displayFeedback: qualitativeFeedbackId => {
        dispatch(displayQualitativeFeedback(qualitativeFeedbackId));
    }
});

const ConnectedIdeas = connect(mapStateToProps, mapDispatchToProps)(Ideas);

render(
    <Page>
        <ConnectedIdeas />
    </Page>,
    document.getElementById('app'),
    {
        feedback: feedbackReducer
    }
);
