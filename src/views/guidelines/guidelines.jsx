const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');
const {useIntl} = require('react-intl');

require('./guidelines.scss');

const pageSections = [
    {
        id: 'respect',
        headerTextId: 'guidelines.respectheader',
        contentTexts: [
            {id: 'guidelines.respectbody1'},
            {id: 'guidelines.respectbody2'}
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_respect.svg',
        sectionImgAltTextId: 'guidelines.respectSectionImageDescription',
        buttonImgSrc: '/svgs/guidelines/blobblue_respect.svg',
        buttonImgAltTextId: 'guidelines.respectButtonImageDescription'
    },
    {
        id: 'privacy',
        headerTextId: 'guidelines.privacyheader',
        contentTexts: [
            {id: 'guidelines.privacybody1'},
            {id: 'guidelines.privacybody2'}
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_safe.svg',
        sectionImgAltTextId: 'guidelines.privacySectionImageDescription',
        buttonImgSrc: '/svgs/guidelines/blobyellow_safe.svg',
        buttonImgAltTextId: 'guidelines.privacyButtonImageDescription'
    },
    {
        id: 'helpful',
        headerTextId: 'guidelines.helpfulheader',
        contentTexts: [
            {id: 'guidelines.helpfulbody1'},
            {id: 'guidelines.helpfulbody2'}
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_feedback.svg',
        sectionImgAltTextId: 'guidelines.helpfulSectionImageDescription',
        buttonImgSrc: '/svgs/guidelines/blobmagenta_feedback.svg',
        buttonImgAltTextId: 'guidelines.helpfulButtonImageDescription'
    },
    {
        id: 'remix',
        headerTextId: 'guidelines.remixheader',
        contentTexts: [
            {id: 'guidelines.remixbody1'},
            {id: 'guidelines.remixbody2'}
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_remix.svg',
        sectionImgAltTextId: 'guidelines.remixSectionImageDescription',
        buttonImgSrc: '/svgs/guidelines/blobgreen_remix.svg',
        buttonImgAltTextId: 'guidelines.remixButtonImageDescription'
    },
    {
        id: 'honesty',
        headerTextId: 'guidelines.honestyheader',
        contentTexts: [
            {id: 'guidelines.honestybody1'},
            {id: 'guidelines.honestybody2'}
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_honest.svg',
        sectionImgAltTextId: 'guidelines.honestySectionImageDescription',
        buttonImgSrc: '/svgs/guidelines/blobpurple_honest.svg',
        buttonImgAltTextId: 'guidelines.honestyButtonImageDescription'
    },
    {
        id: 'friendly',
        headerTextId: 'guidelines.friendlyheader',
        contentTexts: [
            {id: 'guidelines.friendlybody1'},
            {id: 'guidelines.friendlybody2'}
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_friendly.svg',
        sectionImgAltTextId: 'guidelines.friendlySectionImageDescription',
        buttonImgSrc: '/svgs/guidelines/blobpink_friendly.svg',
        buttonImgAltTextId: 'guidelines.friendlyButtonImageDescription'
    },
    {
        id: 'learn-more',
        headerTextId: 'guidelines.learnMoreheader',
        contentTexts: [
            {
                id: 'guidelines.learnMorebody1',
                values: {
                    a: chunks => (
                        <a
                            href="https://resources.scratch.mit.edu/www/guides/en/scratch-community-guide.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {chunks}
                        </a>
                    )
                }
            },
            {id: 'guidelines.learnMorebody2'}
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_learn_more.svg',
        sectionImgAltTextId: 'guidelines.learnMoreSectionImageDescription'
    }
];

const Guidelines = () => {
    const intl = useIntl();

    return (
        <div className="guidelines-page">
            <header>
                <div className="title">
                    <FormattedMessage id="guidelines.title" />
                </div>
                <div className="header1">
                    <FormattedMessage id="guidelines.header1" />
                </div>
                <div className="header2">
                    <FormattedMessage id="guidelines.header2" />
                </div>
            </header>
            <section className="navigation">
                <div className="header3">
                    <FormattedMessage id="guidelines.header3" />
                </div>
                <section className="navigation-buttons">
                    {pageSections
                        .filter(guide => guide.buttonImgSrc)
                        .map(({id, headerTextId, buttonImgSrc, buttonImgAltTextId}) => (
                            <a
                                key={id}
                                href={`#${id}`}
                            >
                                <img
                                    alt={intl.formatMessage({id: buttonImgAltTextId})}
                                    src={buttonImgSrc}
                                />
                                <FormattedMessage id={headerTextId} />
                            </a>
                        ))}
                </section>
            </section>
            <section className="inner guidelines">
                {pageSections.map(
                    ({id, headerTextId, contentTexts, sectionImgSrc, sectionImgAltTextId}, index) => (
                        <div
                            id={id}
                            key={id}
                            className={`guideline ${
                                index % 2 === 0 ? 'content-first' : 'image-first'
                            }`}
                        >
                            <div>
                                <div className="guideline-title">
                                    <FormattedMessage id={headerTextId} />
                                </div>
                                <p className="first-paragraph">
                                    <FormattedMessage {...contentTexts[0]} />
                                </p>
                                <p className="second-paragraph">
                                    <FormattedMessage {...contentTexts[1]} />
                                </p>
                            </div>
                            <img
                                alt={intl.formatMessage({id: sectionImgAltTextId})}
                                src={sectionImgSrc}
                            />
                        </div>
                    )
                )}
            </section>
        </div>
    );
};

render(
    <Page>
        <Guidelines />
    </Page>,
    document.getElementById('app')
);
