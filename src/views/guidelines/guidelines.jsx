const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./guidelines.scss');

const pageSections = [
    {
        id: 'respect',
        headerTextId: 'guidelines.respectheader',
        contentTextIds: [
            'guidelines.respectbody1',
            'guidelines.respectbody2'
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_respect.svg',
        buttonImgSrc: '/svgs/guidelines/blobblue_respect.svg'
    },
    {
        id: 'privacy',
        headerTextId: 'guidelines.privacyheader',
        contentTextIds: [
            'guidelines.privacybody1',
            'guidelines.privacybody2'
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_safe.svg',
        buttonImgSrc: '/svgs/guidelines/blobyellow_safe.svg'
    },
    {
        id: 'helpful',
        headerTextId: 'guidelines.helpfulheader',
        contentTextIds: [
            'guidelines.privacybody1',
            'guidelines.privacybody2'
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_feedback.svg',
        buttonImgSrc: '/svgs/guidelines/blobmagenta_feedback.svg'
    },
    {
        id: 'remix',
        headerTextId: 'guidelines.remixheader',
        contentTextIds: [
            'guidelines.remixbody1',
            'guidelines.remixbody2'
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_remix.svg',
        buttonImgSrc: '/svgs/guidelines/blobgreen_remix.svg'
    },
    {
        id: 'honesty',
        headerTextId: 'guidelines.honestyheader',
        contentTextIds: [
            'guidelines.honestybody1',
            'guidelines.honestybody2'
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_honest.svg',
        buttonImgSrc: '/svgs/guidelines/blobpurple_honest.svg'
    },
    {
        id: 'friendly',
        headerTextId: 'guidelines.friendlyheader',
        contentTextIds: [
            'guidelines.friendlybody1',
            'guidelines.friendlybody2'
        ],
        sectionImgSrc: '/svgs/guidelines/illustration_friendly.svg',
        buttonImgSrc: '/svgs/guidelines/blobpink_friendly.svg'
    }
];

const Guidelines = () => (
    <div className="guidelines-page">
        <header>
            <div className="title"><FormattedMessage id="guidelines.title" /></div>
            <div className="header1"><FormattedMessage id="guidelines.header1" /></div>
            <div className="header2"><FormattedMessage id="guidelines.header2" /></div>
        </header>
        <section className="navigation">
            <div className="header3"><FormattedMessage id="guidelines.header3" /></div>
            <section className="navigation-buttons">
                {
                    pageSections.map(({id, headerTextId, buttonImgSrc}) => (
                        <a
                            key={id}
                            href={`#${id}`}
                        >
                            <img src={buttonImgSrc} />
                            <FormattedMessage id={headerTextId} />
                        </a>
                    ))
                }
            </section>
        </section>
        <section className="inner guidelines">
            {
                pageSections.map(({id, headerTextId, contentTextIds, sectionImgSrc}, index) => (
                    <div
                        id={id}
                        key={id}
                        className={`guideline ${index % 2 === 0 ? 'content-first' : 'image-first'}`}
                    >
                        <div>
                            <div className="guideline-title"><FormattedMessage id={headerTextId} /></div>
                            <p className="first-paragraph">
                                <FormattedMessage id={contentTextIds[0]} />
                            </p>
                            <p className="second-paragraph">
                                <FormattedMessage id={contentTextIds[1]} />
                            </p>
                        </div>
                        <img src={sectionImgSrc} />
                    </div>
                ))
            }
        </section>
    </div>
);

render(<Page><Guidelines /></Page>, document.getElementById('app'));
