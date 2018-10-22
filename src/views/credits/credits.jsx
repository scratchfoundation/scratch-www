const React = require('react');
const render = require('../../lib/render.jsx');
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const Avatar = require('../../components/avatar/avatar.jsx');
const Page = require('../../components/page/www/page.jsx');
const People = require('./people.json');
const Supporters = require('./supporters.json');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

require('./credits.scss');

const Credits = () => (
    <div className="credits">
        <TitleBanner className="masthead mod-blue-bg">
            <h1 className="title-banner-h1">
                <FormattedMessage id="credits.title" />
            </h1>
        </TitleBanner>
        <div className="content">
            <div className="people">
                <div className="midHeader">
                    <h2>MIT Scratch Team</h2>
                    <p>
                        <FormattedHTMLMessage id="credits.developers" />
                    </p>
                </div>
                <ul>
                    {People.map((person, index) => (
                        <li
                            key={`person-${index}`}
                        >
                            <div>
                                <a href={`https://scratch.mit.edu/users/${person.userName}/`}>
                                    <Avatar
                                        alt=""
                                        src={`https://cdn.scratch.mit.edu/get_image/user/${person.userId || 'default'}_80x80.png`}
                                    />
                                </a>
                            </div>
                            <span>
                                {person.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="supporters">
                <div className="midHeader">
                    <h2>
                        <FormattedHTMLMessage id="credits.currentSponsors" />
                    </h2>
                    <p>
                        <FormattedHTMLMessage id="credits.currentFinancialSupport" />
                    </p>
                </div>
                <div className="logoGrid">
                    {Supporters.map((supporter, index) => (
                        <span
                            className="logo"
                            key={`logo-${index}`}
                        >
                            <a href={supporter.logoDestination}>
                                {supporter.logoSrc ? (
                                    <img
                                        alt=""
                                        src={supporter.logoSrc}
                                        width={supporter.width}
                                    />
                                ) :
                                    <div className="textLogo">
                                        {supporter.textLogo}
                                    </div>
                                }
                            </a>
                        </span>
                    ))}
                </div>
            </div>
            <div className="acknowledgeContent">
                <h2>
                    <FormattedHTMLMessage id="credits.translationsTitle" />
                </h2>
                <p>
                    <FormattedHTMLMessage id="credits.acknowledgementsTranslators" />
                </p>
                <h2>
                    <FormattedHTMLMessage id="credits.illustrationsTitle" />
                </h2>
                <p>
                    <FormattedHTMLMessage id="credits.acknowledgementsIllustrations" />
                </p>
                <p>
                  Natalie Rosalinda Hall, Wren McDonald, Andrew Rae, Daria Skrybchenko,
                  Robert Hunter, Alex Eben Meyer, Ding Ding Hu, Owen Davey.
                </p>
                <h2>
                    <FormattedHTMLMessage id="credits.pastContributors" />
                </h2>
                <p>
                    <FormattedHTMLMessage id="credits.pastContributorsThanks" />
                </p>
                <p>
                    <FormattedHTMLMessage id="credits.otherContributors" />
                    {' '}
                    Ben Berg, Amos Blanton, Karen Brennan, Juanita Buitrago, Leo Burd,
                    Gaia Carini, Kasia Chmielinski, Michelle Chung, Shane Clements,
                    Hannah Cole, Sayamindu Dasgupta, Margarita Dekoli, Evelyn Eastmond,
                    Dave Feinberg, Chris Graves, Megan Haddadi, Connor Hudson,
                    Christina Huang, Tony Hwang, Abdulrahman Idlbi, Randy Jou, Lily Kim,
                    Tauntaun Kim, Saskia Leggett, Tim Mickel, Amon Millner, Ricarose Roque,
                    Andrea Saxman, Jay Silver, Tammy Stern, Lis Sylvan, Hanako Tjia, Claudia
                    Urrea, Oren Zuckerman.
                </p>
                <p>
                    <FormattedHTMLMessage id="credits.partnersBody" />
                </p>
                <h2>
                    <FormattedHTMLMessage id="credits.researchersTitle" />
                </h2>
                <p>
                    <FormattedHTMLMessage id="credits.researchersBody" />
                </p>
                <p>
                    <FormattedHTMLMessage id="credits.researchersContributors" />
                </p>
                <h2>
                    <FormattedHTMLMessage id="credits.acknowledgementsTitle" />
                </h2>
                <p>
                    <FormattedHTMLMessage id="credits.acknowledgementsContributors" />
                </p>
                <p>
                    Susan Abend, Robbie Berg, Lauren Bessen, Keith Braadfladt,
                    Susan Carillo, Will Denton, Nathan Dinsmore, Catherine Feldman,
                    Jodi Finch, Ioana Fineberg, JT Galla, Rachel Garber, Cassy Gibbs,
                    Brian Harvey, Roland Hebert, Tracy Ho, Benjamin Howe, Kapaya Katongo,
                    Evan Karatzas, Christine Kim, Joren Lauwers, Mike Lee, Jeff Lieberman,
                    Mark Loughridge, Kelly Liu, Anthony Lu, Danny Lutz, David Malan
                    Wayne Marshall, John McIntosh, Paul Medlock-Walton, Dongfang (Tian) Mi,
                    Ximena Miranda, Jens Moenig, Evan Moore, Geetha Narayanan, Kate Nazemi,
                    Liddy Nevile, Wing Ngan, Derek O&apos;Connell, Tim Radvan, Karen Randall,
                    Ian Reynolds, Miriam Ruiz, Chinua Shaw, Ed Shems, Cynthia Solomon,
                    Daniel Strimpel, Kilmer Sweazy, John Henry Thompson, Ubong Ukoh,
                    Vladimir Vuksan, Han Xu.
                </p>
                <p>
                    <FormattedHTMLMessage id="credits.acknowledgementsInfluencers" />
                </p>
                <p>
                    <FormattedHTMLMessage id="credits.acknowledgementsCommunity" />
                </p>
            </div>
        </div>
    </div>);

const WrappedCredits = injectIntl(Credits);
render(<Page><WrappedCredits /></Page>, document.getElementById('app'));
