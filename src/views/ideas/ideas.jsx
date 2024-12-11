const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const {useState, useCallback} = require('react');

const Button = require('../../components/forms/button.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const {useIntl} = require('react-intl');
const {
    YoutubeVideoModal
} = require('../../components/youtube-video-modal/youtube-video-modal.jsx');
const {YoutubePlaylistItem} = require('../../components/youtube-playlist-item/youtube-playlist-item.jsx');
const {CardsModal} = require('../../components/cards-modal/cards-modal.jsx');

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

const Ideas = () => {
    const intl = useIntl();
    const [youtubeVideoId, setYoutubeVideoId] = useState('');
    const [isCardsModalOpen, setCardsModalOpen] = useState(false);

    const onCloseVideoModal = useCallback(() => setYoutubeVideoId(''), [setYoutubeVideoId]);
    const onSelectedVideo = useCallback(
        videoId => setYoutubeVideoId(videoId),
        [setYoutubeVideoId]
    );

    const onCardsModalOpen = useCallback(() => setCardsModalOpen(true), [isCardsModalOpen]);
    const onCardsModalClose = useCallback(() => setCardsModalOpen(false), [isCardsModalOpen]);

    return (
        <div>
            <div className="banner-wrapper">
                <iframe
                    src="https://scratch.mit.edu/projects/1108790117/embed"
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
                            values={{a: chunks => <a href="https://scratch.mit.edu/projects/1108790117/">{chunks}</a>}}
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
                    <div
                        className="download-cards"
                    >
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
                                                id={
                                                    physicalIdea.physicalIdeasDescription.buttonTextId
                                                }
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

render(
    <Page>
        <Ideas />
    </Page>,
    document.getElementById('app')
);
