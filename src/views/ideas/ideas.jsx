const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const {useState, useCallback} = require('react');

const Button = require('../../components/forms/button.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const {useIntl} = require('react-intl');
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

const Ideas = () => {
    const intl = useIntl();
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
    const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

    return (
        <div>
            <div className="banner-wrapper">
                <TitleBanner className="masthead ideas-banner">
                    <div className="title-banner-p">
                        <img
                            alt={intl.formatMessage({id: 'ideas.headerImageDescription'})}
                            src="/images/ideas/masthead-illustration.svg"
                        />
                        <h1 className="title-banner-h1">
                            <FormattedMessage id="ideas.headerMessage" />
                        </h1>
                        <a href="/projects/editor/?tutorial=all">
                            <Button className="banner-button">
                                <img
                                    alt=""
                                    src="/images/ideas/bulb-yellow-icon.svg"
                                />
                                <FormattedMessage id="ideas.headerButtonMessage" />
                            </Button>
                        </a>
                    </div>
                </TitleBanner>
            </div>
            <div className="tips">
                <div className="inner">
                    <div className="section-header">
                        <FormattedMessage id="ideas.startHereText" />
                    </div>
                    <FlexRow
                        as="section"
                        className="tips-section"
                    >
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
                    </FlexRow>
                </div>
            </div>
            <div className="youtube-videos">
                <div className="inner">
                    <div
                        className="download-cards"
                    >
                        <Button
                            className="pass"
                            onClick={onOpen}
                        >
                            <img src="/images/ideas/download-icon.svg" />
                        </Button>
                        <FormattedMessage
                            id="ideas.downloadGuides"
                            values={{
                                strong: chunks => <strong>{chunks}</strong>,
                                a: chunks => <a onClick={onOpen}>{chunks}</a>
                            }}
                        />
                        <CardsModal
                            isOpen={isOpen}
                            onClose={onClose}
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

render(
    <Page>
        <Ideas />
    </Page>,
    document.getElementById('app')
);
