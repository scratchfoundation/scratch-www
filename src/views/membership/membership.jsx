const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');
const classNames = require('classnames');
const {useIntl} = require('react-intl');
const externalLinks = require('../../lib/external-links.js');

require('./membership.scss');

const pageSections = [
    {
        id: 'getInvolved',
        titleTextId: 'membership.getInvolvedTitle',
        contentTextId: 'membership.getInvolvedDescription',
        imgSrc: '/images/membership/get-involved.png',
        imgAltTextId: 'membership.getInvolvedImageDescription'
    },
    {
        id: 'scratchMembership',
        titleTextId: 'membership.scratchMembershipTitle',
        contentTextId: 'membership.scratchMembershipDescription',
        imgSrc: '/images/membership/scratch-membership.png',
        imgAltTextId: 'membership.scratchMembershipImageDescription',
        buttonTextId: 'membership.scratchMembershipButtonText',
        buttonLink: `${externalLinks.scratchFoundation.membership}\
?utm_source=platform&utm_medium=landingpage&utm_campaign=membership`
    },
    {
        id: 'storyXperiential',
        titleTextId: 'membership.storyXperientialTitle',
        contentTextId: 'membership.storyXperientialDescription',
        imgSrc: '/images/membership/xperiential.png',
        imgAltTextId: 'membership.storyXperientialImageDescription'
    },
    {
        id: 'spritePacks',
        titleTextId: 'membership.spritePacksTitle',
        contentTextId: 'membership.spritePacksDescription',
        imgSrc: '/images/membership/sprite-packs.png',
        imgAltTextId: 'membership.spritePacksImageDescription'
    },
    {
        id: 'discountsAndMerch',
        titleTextId: 'membership.discountsAndMerchTitle',
        contentTextId: 'membership.discountsAndMerchDescription',
        imgSrc: '/images/membership/discounts-and-merch.png',
        imgAltTextId: 'membership.discountsAndMerchImageDescription'
    },
    {
        id: 'resourcesAndEvents',
        titleTextId: 'membership.resourcesAndEventsTitle',
        contentTextId: 'membership.resourcesAndEventsDescription',
        imgSrc: '/images/membership/resources-and-events.png',
        imgAltTextId: 'membership.resourcesAndEventsImageDescription'
    }
];

const Membership = () => {
    const intl = useIntl();
    const getInvolvedSection = React.useMemo(() => pageSections.find(section => section.id === 'getInvolved'), []);
    const scratchMembershipSection =
        React.useMemo(() => pageSections.find(section => section.id === 'scratchMembership'), []);

    return (
        <div className="membership-page">
            <section className="get-involved-section">
                <div className="text-content">
                    <div className="title">
                        <FormattedMessage id={getInvolvedSection.titleTextId} />
                    </div>
                    <div className="description">
                        <FormattedMessage id={getInvolvedSection.contentTextId} />
                    </div>
                </div>
                <div className="image-anchor">
                    <img
                        className="image"
                        alt={intl.formatMessage({id: getInvolvedSection.imgAltTextId})}
                        src={getInvolvedSection.imgSrc}
                    />
                </div>
            </section>
            <section className="scratch-membership-section">
                <div className="content-wrapper">
                    <div className="header">
                        <img
                            className="image"
                            alt={intl.formatMessage({id: scratchMembershipSection.imgAltTextId})}
                            src={scratchMembershipSection.imgSrc}
                        />
                        <div className="content">
                            <div className="title">
                                <FormattedMessage id={scratchMembershipSection.titleTextId} />
                            </div>
                            <div className="description">
                                <FormattedMessage id={scratchMembershipSection.contentTextId} />
                            </div>
                            <div className="button-wrapper">
                                <a
                                    href={scratchMembershipSection.buttonLink}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="button-link"
                                >
                                    <FormattedMessage id={scratchMembershipSection.buttonTextId} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="description">
                            <FormattedMessage id="membership.scratchMembershipDescription2" />
                        </p>
                        <p className="description">
                            <FormattedMessage id="membership.scratchMembershipDescription3" />
                        </p>
                    </div>
                </div>
            </section>
            <section className="member-perks-section">
                <p className="section-title"><FormattedMessage id="membership.memberPerks" /></p>
                {pageSections.slice(2).map((section, sectionIndex) => {
                    const isEven = sectionIndex % 2 === 0;
                    const image = (<img
                        className="image"
                        src={section.imgSrc}
                        alt={intl.formatMessage({id: section.imgAltTextId})}
                    />);
                    const text = (<div className="text-content">
                        <div className="title">
                            <FormattedMessage id={section.titleTextId} />
                        </div>
                        <div className="description">
                            <FormattedMessage id={section.contentTextId} />
                        </div>
                    </div>);

                    return (
                        <div
                            key={section.id}
                            className={classNames(
                                'subsection',
                                isEven && 'even'
                            )}
                        >
                            {isEven ? image : null}
                            {text}
                            {isEven ? null : image}
                        </div>
                    );
                })}
                <div className="section-end">
                    <p className={classNames('text', 'bold')}><FormattedMessage id="membership.andMore" /></p>
                    <p className="text"><FormattedMessage id="membership.stayTuned" /></p>
                </div>
            </section>
        </div>
    );
};

render(
    <Page>
        <Membership />
    </Page>,
    document.getElementById('app')
);
