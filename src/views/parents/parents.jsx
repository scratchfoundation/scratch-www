const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./parents.scss');

const Landing = () => (
    <div className="parents">
        <TitleBanner className="masthead">
            <div className="inner">
                <h1 className="title-banner-h1">
                    <FormattedMessage id="parents.title" />
                </h1>
                <FlexRow className="masthead-info">
                    <p className="title-banner-p intro">
                        <FormattedMessage id="parents.intro" />
                    </p>
                    <div className="ted-talk">
                        <iframe
                            allowFullScreen
                            frameBorder="0"
                            src="https://www.youtube.com/embed/jXUZaf5D12A"
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
                                    learningWithScratch: (
                                        <a href="http://llk.media.mit.edu/scratch/Learning-with-Scratch.pdf">
                                            <FormattedMessage
                                                id="parents.learningWithScratchLinkText"
                                            />
                                        </a>
                                    ),
                                    creativeLearningApproach: (
                                        <a href="http://www.edutopia.org/kindergarten-creativity-collaboration-lifelong-learning">
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
                                        <a href="/privacy_policy">
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
                                    <a href="/info/faq">
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
                                            <a href="https://www.scratchjr.org/">
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
                                            <a href="https://cdn.scratch.mit.edu/scratchr2/static/__edf64cc2d5d5da51528c169e65053195__//pdfs/help/Getting-Started-Guide-Scratch2.pdf">
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
                                            <a href="http://www.inversoft.com/features/profanity-filter/">CleanSpeak</a>
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
                                            <a href="/privacy_policy">
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
    </div>
);

render(<Page><Landing /></Page>, document.getElementById('app'));
