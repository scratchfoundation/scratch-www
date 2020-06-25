const React = require('react');
const render = require('../../lib/render.jsx');
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
                <div className="mid-header">
                    <h2>MIT Scratch Team</h2>
                    <p>
                        <FormattedMessage id="credits.developers" />
                    </p>
                </div>
                <ul className="avatar-grid">
                    {People.map((person, index) => (
                        <li
                            className="avatar-item"
                            key={`person-${index}`}
                        >
                            <div>
                                {person.userName ? (
                                    <a href={`https://scratch.mit.edu/users/${person.userName}/`}>
                                        <Avatar
                                            alt=""
                                            src={`https://cdn.scratch.mit.edu/get_image/user/${person.userId || 'default'}_80x80.png`}
                                        />
                                    </a>
                                ) : (
                                    /* if userName is not given, there's no chance userId is given */
                                    <Avatar
                                        alt=""
                                        src={`https://cdn.scratch.mit.edu/get_image/user/default_80x80.png`}
                                    />
                                )}
                            </div>
                            <span className="avatar-text">
                                {person.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className="supporters"
                id="donors"
            >
                <div className="mid-header">
                    <h2>
                        <FormattedMessage id="credits.currentSponsors" />
                    </h2>
                    <p>
                        <FormattedMessage id="credits.currentFinancialSupport" />
                    </p>
                </div>
                <div className="logo-grid">
                    {Supporters.map((supporter, index) => (
                        <span
                            className="logo"
                            key={`logo-${index}`}
                        >
                            {supporter.logoDestination ? (<a href={supporter.logoDestination}>
                                {supporter.logoSrc ? (
                                    <img
                                        alt=""
                                        src={supporter.logoSrc}
                                        width={supporter.width}
                                    />
                                ) : (
                                    <div className="text-logo">
                                        {supporter.textLogo}
                                    </div>
                                )}
                            </a>) : (supporter.logoSrc ? (
                                <img
                                    alt=""
                                    src={supporter.logoSrc}
                                    width={supporter.width}
                                />
                            ) : (
                                <div className="text-logo">
                                    {supporter.textLogo}
                                </div>
                            ))
                            }
                        </span>
                    ))}
                </div>
            </div>
            <div className="acknowledge-content">
                <h2>
                    <FormattedMessage id="credits.translationsTitle" />
                </h2>
                <p>
                    <FormattedMessage
                        id="credits.acknowledgementsTranslators"
                        values={{
                            translatorsLink: (
                                <a href="https://en.scratch-wiki.info/wiki/Translators">
                                    <FormattedMessage id="credits.acknowledgementsTranslatorsLinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h2>
                    <FormattedMessage id="credits.illustrationsTitle" />
                </h2>
                <p>
                    <FormattedMessage id="credits.acknowledgementsIllustrations" />
                </p>
                <p>
                  Natalie Rosalinda Hall, Wren McDonald, Leigh McG, Andrew Rae, Daria Skrybchenko,
                  Robert Hunter, Alex Eben Meyer, Ding Ding Hu, Owen Davey.
                </p>
                <h2>
                    <FormattedMessage id="credits.soundsTitle" />
                </h2>
                <p>
                    <FormattedMessage id="credits.acknowledgementsSounds" />
                </p>
                <p>
                    <FormattedMessage id="credits.soundsThanks" />
                    {' '}
                    acclivity, belloisec, Benboncan, Calcuttan, coby12388, copyc4t,
                    cs272, Flick3r, FreqMan, gelo_papas, han1, InspectorJ, jiserte,
                    junggle, juskiddink, klankbeeld, LittleRobotSoundFactory, LloydEvans09,
                    lonemonk, rhodesmas, sandyrb, themfish, tyops.
                </p>
                <h2>
                    <FormattedMessage id="credits.pastContributors" />
                </h2>
                <p>
                    <FormattedMessage id="credits.pastContributorsThanks" />
                </p>
                <p>
                    <FormattedMessage id="credits.otherContributors" />
                    {' '}
                    Ben Berg, Amos Blanton, Karen Brennan, Juanita Buitrago,
                    Leo Burd, Gaia Carini, Kasia Chmielinski, Michelle Chung,
                    Shane Clements, Hannah Cole, Ellen Daoust, Sayamindu Dasgupta,
                    Margarita Dekoli, Dave Feinberg, Linda Fernsel,
                    Chris Graves, Joel Gritter, Megan Haddadi, Connor Hudson,
                    Christina Huang, Tony Hwang, Abdulrahman Idlbi, Randy Jou,
                    Lily Kim, Tauntaun Kim, Saskia Leggett, Tim Mickel,
                    Amon Millner, My Nguyen, Lisa O&apos;Brien, Abisola Okuk,
                    Tina Quach, Ricarose Roque, Andrea Saxman, Jay Silver,
                    Andrew Sliwinski, Tammy Stern, Lis Sylvan, Hanako Tjia,
                    Claudia Urrea, Julia Zimmerman, Oren Zuckerman.
                </p>
                <p>
                    <FormattedMessage id="credits.partnersBody" />
                </p>
                <h2>
                    <FormattedMessage id="credits.researchersTitle" />
                </h2>
                <p>
                    <FormattedMessage
                        id="credits.researchersBody"
                        values={{
                            scratchResearchLink: (
                                <a href="https://scratch.mit.edu/info/research/">
                                    <FormattedMessage id="credits.researchLinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="credits.researchersContributors"
                        values={{
                            nsfLink: (
                                <a href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=0325828">
                                    <FormattedMessage id="credits.researchNSFLinkText" />
                                </a>
                            ),
                            scratchEdLink: (
                                <a href="http://scratched.gse.harvard.edu/">
                                    <FormattedMessage id="credits.researchScratchEdLinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h2>
                    <FormattedMessage id="credits.acknowledgementsTitle" />
                </h2>
                <p>
                    <FormattedMessage id="credits.acknowledgementsContributors" />
                </p>
                <p>
                    Susan Abend, Robbie Berg, Lauren Bessen, Keith Braadfladt, Katie Broida,
                    Susan Carillo, Will Denton, Nathan Dinsmore, Catherine Feldman, Rachel Fenichel,
                    Jodi Finch, Ioana Fineberg, Corey Frang, JT Galla, Rachel Garber, Cassy Gibbs,
                    Z Goddard, Brian Harvey, Roland Hebert, Tracy Ho, Benjamin Howe, Kapaya Katongo,
                    Evan Karatzas, Christine Kim, Joren Lauwers, Mike Lee, Jeff Lieberman,
                    Mark Loughridge, Kelly Liu, Anthony Lu, Danny Lutz, David Malan
                    Wayne Marshall, John McIntosh, Paul Medlock-Walton, Dongfang (Tian) Mi,
                    Ximena Miranda, Jens Moenig, Evan Moore, Geetha Narayanan, Kate Nazemi,
                    Liddy Nevile, Wing Ngan, Derek O&apos;Connell, Tim Radvan, Karen Randall,
                    Ian Reynolds, Miriam Ruiz, Boaz Sender, Chinua Shaw, Ed Shems, Cynthia Solomon,
                    Marie Staver, Daniel Strimpel, Kilmer Sweazy, John Henry Thompson, Ubong Ukoh,
                    Vladimir Vuksan, Han Xu.
                </p>
                <p>
                    <FormattedMessage id="credits.acknowledgementsInfluencers" />
                </p>
                <p>
                    <FormattedMessage id="credits.acknowledgementsCommunity" />
                </p>
            </div>
        </div>
    </div>);

const WrappedCredits = injectIntl(Credits);
render(<Page><WrappedCredits /></Page>, document.getElementById('app'));
