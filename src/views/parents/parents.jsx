const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const externalLinks = require('../../lib/external-links.js');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./parents.scss');

// YouTube video ID for the embedded "What is Scratch?" video
const videoId = 'LjOfOQkpPnU';

const PAGE_TYPE = {
    PARENTS: 0,
    EMAIL_CONFIRMATION: 1,
    TERMS_ACCEPTANCE: 2
};

const titleByPageType = {
    [PAGE_TYPE.PARENTS]: 'parents.title',
    [PAGE_TYPE.EMAIL_CONFIRMATION]: 'parents.emailConfirmedTitle',
    [PAGE_TYPE.TERMS_ACCEPTANCE]: 'parents.touAcceptedTitle'
};

const Landing = () => {
    const pageType = React.useMemo(() => {
        const query = window.location.search;

        if (query.indexOf('from_confirmation=true') >= 0) {
            return PAGE_TYPE.EMAIL_CONFIRMATION;
        }

        if (query.indexOf('from_terms_acceptance=true') >= 0) {
            return PAGE_TYPE.TERMS_ACCEPTANCE;
        }

        return PAGE_TYPE.PARENTS;
    }, [window.location.search]);

    return (<div className="parents">
        <TitleBanner className="masthead">
            <div className="inner">
                <h1 className="title-banner-h1">
                    <FormattedMessage id={titleByPageType[pageType]} />
                </h1>
                <FlexRow className="masthead-info">
                    <p className="title-banner-p intro">
                        <FormattedMessage
                            id="parents.intro"
                            values={{
                                scratchFoundation: (
                                    <a href={externalLinks.scratchFoundation.homepage}>
                                        <FormattedMessage
                                            id="parents.scratchFoundationLinkText"
                                        />
                                    </a>
                                )
                            }}
                        />
                    </p>
                    <div className="ted-talk">
                        <iframe
                            allowFullScreen
                            frameBorder="0"
                            src={`https://www.youtube.com/embed/${videoId}`}
                        />
                    </div>
                </FlexRow>
            </div>
            <div className="band">
                <SubNavigation className="inner">
                    <a href="#overview">
                        <li>
                            <FormattedMessage id="parents.overview" />
                        </li>
                    </a>
                    <a href="#faq">
                        <li>
                            <FormattedMessage id="parents.faq" />
                        </li>
                    </a>
                </SubNavigation>
            </div>
        </TitleBanner>

        <div className="inner">
            <section id="overview">
                <span className="nav-spacer" />
                <h2>
                    <FormattedMessage id="parents.overviewTitle" />
                </h2>
                <FlexRow className="general-usage">
                    <div>
                        <h3><FormattedMessage id="parents.overviewLearningTitle" /></h3>
                        <p>
                            <FormattedMessage
                                id="parents.overviewLearningBody"
                                values={{
                                    creativeLearningApproach: (
                                        <a href={externalLinks.edutopia.creativeLearningApproach}>
                                            <FormattedMessage
                                                id="parents.creativeLearningApproachLinkText"
                                            />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                    <div>
                        <h3><FormattedMessage id="parents.overviewCommunityTitle" /></h3>
                        <p>
                            <FormattedMessage
                                id="parents.overviewCommunityBody"
                                values={{
                                    communityGuidelines: (
                                        <a href="/community_guidelines">
                                            <FormattedMessage
                                                id="parents.communityGuidelinesLinkText"
                                            />
                                        </a>
                                    ),
                                    privacyPolicy: (
                                        <a href="https://mitscratch.freshdesk.com/en/support/solutions/articles/4000219339-privacy-policy">
                                            <FormattedMessage
                                                id="parents.privacyPolicyLinkText"
                                            />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                </FlexRow>
            </section>
        </div>
        <TitleBanner className="faq-banner">
            <div className="inner">
                <section id="faq">
                    <span className="nav-spacer" />
                    <h2><FormattedMessage id="parents.faq" /></h2>
                    <p>
                        <FormattedMessage
                            id="parents.faqMoreAndAsk"
                            values={{
                                faqPage: (
                                    <a href="/faq">
                                        <FormattedMessage
                                            id="parents.faqLinkText"
                                        />
                                    </a>
                                ),
                                discussionForums: (
                                    <a href="/discuss">
                                        <FormattedMessage
                                            id="parents.faqDiscussionForumsLinkText"
                                        />
                                    </a>
                                ),
                                contactUs: (
                                    <a href="/contact-us">
                                        <FormattedMessage
                                            id="parents.faqContactUsLinkText"
                                        />
                                    </a>
                                )
                            }}
                        />
                    </p>
                    <FlexRow className="three-col-row">
                        <div className="faq column">
                            <h3><FormattedMessage id="parents.faqAgeRangeTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="parents.faqAgeRangeBody"
                                    values={{
                                        scratchJr: (
                                            <a href={externalLinks.scratchJr.homepage}>
                                                ScratchJr
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                        <div className="faq column">
                            <h3><FormattedMessage id="parents.faqResourcesTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="parents.faqResourcesBody"
                                    values={{
                                        ideasPage: (
                                            <a href="/ideas">
                                                <FormattedMessage
                                                    id="parents.faqIdeasLinkText"
                                                />
                                            </a>
                                        ),
                                        stepByStepGuide: (
                                            <a href="/projects/editor/?tutorial=getStarted">
                                                <FormattedMessage
                                                    id="parents.faqStepByStepGuideLinkText"
                                                />
                                            </a>
                                        ),
                                        gettingStartedGuide: (
                                            <a href={externalLinks.scratch.gettingStartedGuide_Scratch2}>
                                                <FormattedMessage
                                                    id="parents.faqGettingStartedGuideLinkText"
                                                />
                                            </a>
                                        ),
                                        scratchCards: (
                                            <a href="/info/cards">
                                                <FormattedMessage
                                                    id="parents.faqScratchCardsLinkText"
                                                />
                                            </a>
                                        ),
                                        tips: (
                                            <a href="/tips">
                                                <FormattedMessage
                                                    id="parents.faqTipsLinkText"
                                                />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                        <div className="faq column">
                            <h3><FormattedMessage id="parents.faqCommunityTitle" /></h3>
                            <p>
                                <FormattedMessage id="parents.faqCommunityBody" />
                            </p>
                        </div>
                        <div className="faq column">
                            <h3><FormattedMessage id="parents.faqGuidelinesTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="parents.faqGuidelinesBody"
                                    values={{
                                        communityGuidelines: (
                                            <a href="/community_guidelines">
                                                <FormattedMessage
                                                    id="parents.faqCommunityGuidelinesLinkText"
                                                />
                                            </a>
                                        ),
                                        CleanSpeak: (
                                            <a href="https://cleanspeak.com/products/profanity-filter">CleanSpeak</a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                        <div className="faq column">
                            <h3><FormattedMessage id="parents.faqPrivacyPolicyTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="parents.faqPrivacyPolicyBody"
                                    values={{
                                        privacyPolicy: (
                                            <a href="https://mitscratch.freshdesk.com/en/support/solutions/articles/4000219339-privacy-policy">
                                                <FormattedMessage
                                                    id="parents.privacyPolicyLinkText"
                                                />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                        <div className="faq column">
                            <h3><FormattedMessage id="parents.faqOfflineTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="parents.faqOfflineBody"
                                    values={{
                                        scratchApp: (
                                            <a href="/download">
                                                <FormattedMessage
                                                    id="parents.faqScratchApp"
                                                />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                    </FlexRow>
                </section>
            </div>
        </TitleBanner>
    </div>);
};

render(<Page><Landing /></Page>, document.getElementById('app'));
