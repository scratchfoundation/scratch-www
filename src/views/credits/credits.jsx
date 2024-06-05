const React = require('react');
const render = require('../../lib/render.jsx');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const Page = require('../../components/page/www/page.jsx');
const People = require('./people.json');
const PeopleGrid = require('../../components/people-grid/people-grid.jsx');

require('./credits.scss');

// Sort people by name alphabetically
People.sort((a, b) => (a.name.localeCompare(b.name)));

const Credits = () => (
    <div className="credits">
        <div className="content">
            <div className="people">
                <div className="mid-header">
                    <h2>Our Team</h2>
                    <p>
                        <FormattedMessage id="credits.developers" />
                    </p>
                </div>
                <PeopleGrid people={People} />
            </div>
            <div
                className="supporters"
                id="donors"
            >
                <div className="mid-header">
                    <h2>
                        <FormattedMessage id="credits.translationsTitle" />
                    </h2>
                    <p>
                        <FormattedMessage
                            id="credits.acknowledgementsTranslators"
                            values={{
                                translatorsLink: (
                                    <a
                                        href="https://en.scratch-wiki.info/wiki/Translators"
                                        rel="noreferrer noopener"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="credits.acknowledgementsTranslatorsLinkText" />
                                    </a>
                                )
                            }}
                        />
                        {' '}
                        <FormattedMessage id="credits.acknowledgementsLanguageOrganizers" />
                        {' '}
                        <span>
                            Brenda Nyaringita (Kiswahili), Farshid Meidani (فارسی‎),
                            Hans de Jong (Nederlands), Karin Colsman (Gàidhlig),
                            Nasir Khan Saikat (বাংলা).
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div
            className="content"
            id="acknowledgements"
        >
            <div className="acknowledge-content">
                <h2>
                    <FormattedMessage id="credits.donorsTitle" />
                </h2>
                <p>
                    <FormattedMessage
                        id="credits.acknowledgementsDonors"
                        values={{
                            donorsLink: (
                                <a
                                    href="https://www.scratchfoundation.org/supporters"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FormattedMessage id="credits.acknowledgementsDonorsLinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h2>
                    <FormattedMessage id="credits.lifelongKindergartenTitle" />
                </h2>
                <p>
                    <FormattedMessage
                        id="credits.acknowledgementsLifelongKindergarten"
                        values={{
                            lifelongKindergartenLink: (
                                <a
                                    href="https://www.media.mit.edu/groups/lifelong-kindergarten/overview/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FormattedMessage id="credits.acknowledgementsLifelongKindergartenLinkText" />
                                </a>
                            ),
                            nsfGrantLink: (
                                <a
                                    href="https://web.media.mit.edu/~mres/papers/scratch-proposal-handout.pdf"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FormattedMessage id="credits.acknowledgementsNSFGrantLinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h2>
                    <FormattedMessage id="credits.pastContributors" />
                </h2>
                <p>
                    <FormattedMessage id="credits.pastContributorsThanks" />
                </p>
                <p>
                    Yusuf Ahmad, Zoë Bentley, Ben Berg, Amos Blanton, Paula Bontá, Carl Bowman, Karen Brennan,
                    Juanita Buitrago, Leo Burd, Gaia Carini, Jolie Castellucci, Karishma Chadha, Kasia Chmielinski,
                    Michelle Chung, Shane Clements, Hannah Cole, Sayamindu Dasgupta,
                    Zachary Deiman, Margarita Dekoli, Manuj Dhariwal, Shruti Dhariwal, Dave Feinberg,
                    Champika Fernando, Linda Fernsel, Elizabeth Foster, Joan Fusco,
                    Lily Gabaree, Stephanie Gayle, Chris Graves, Joel Gritter,
                    Megan Haddadi, Kreg Hanning, Sean Hickey, Christina Huang,
                    Tony Hwang, Abdulrahman Idlbi, Rupal Jain, Addae Jordan, Randy Jou,
                    Paul Kaplan, Lily Kim, Tauntaun Kim, Amy Lee, Saskia Leggett, Shenkiat Lim, DD Liu,
                    John Maloney, Tim Mickel, Amon Millner, Ariam Mogos, Andrés Monroy-Hernández,
                    Marian Muthui, Katelyn Mann, Cindy Nguyen, My Nguyen, Lisa O&apos;Brien, Abisola Okuk,
                    Kristin Osiecki, Sarah Otts, Carmelo Presicce, Tina Quach, Mitchel Resnick,
                    Ricarose Roque, Natalie Rusk, Andrea Saxman, Ray Schamp, Eric Schilling, Rupa Shah, Mimi Shalf,
                    Jay Silver, Brian Silverman, Andrew Sliwinski, Stephanie Stephens, Tammy Stern, Lis Sylvan,
                    Bryce Taylor, Matt Taylor, Hanako Tjia, Jaleesa Trapp, Moran Tsur, Claudia Urrea, Kathy Wu,
                    Shawna Young, Julia Zimmerman, Oren Zuckerman.
                </p>
                <h2>
                    <FormattedMessage id="credits.illustrationsTitle" />
                </h2>
                <p>
                    <FormattedMessage id="credits.acknowledgementsIllustrations" />
                </p>
                <p>
                    Natalie Rosalinda Hall, Wren McDonald, Leigh McG, Andrew Rae, Daria
                    Skrybchenko, Robert Hunter, Alex Eben Meyer, Ding Ding Hu, Owen
                    Davey, Zo&euml; Bentley, DD Liu, Kristin Osiecki, Kathy Wu.
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
                    <FormattedMessage id="credits.acknowledgementsOtherContributors" />
                </h2>
                <p>
                    <FormattedMessage id="credits.acknowledgementsContributors" />
                </p>
                <p>
                    Susan Abend, Robbie Berg, Lauren Bessen, Keith Braadfladt,
                    Katie Broida, Susan Carillo, Will Denton, Nathan Dinsmore,
                    Catherine Feldman, Rachel Fenichel, Jodi Finch, Ioana Fineberg,
                    Corey Frang, JT Galla, Rachel Garber, Cassy Gibbs, Z Goddard,
                    Brian Harvey, Roland Hebert, Tracy Ho, Benjamin Howe,
                    Yasmin Kafai, Kapaya Katongo, Evan Karatzas, Christine Kim,
                    Joren Lauwers, Mike Lee, Jeff Lieberman, Mark Loughridge,
                    Kelly Liu, Anthony Lu, Danny Lutz, David Malan Wayne Marshall,
                    John McIntosh, Paul Medlock-Walton, Dongfang (Tian) Mi, Dalton Miner,
                    Ximena Miranda, Jens Moenig, Evan Moore, Geetha Narayanan,
                    Kate Nazemi, Liddy Nevile, Wing Ngan, Derek O&apos;Connell,
                    Tim Radvan, Karen Randall, Ian Reynolds, Miriam Ruiz,
                    Boaz Sender, Chinua Shaw, Ed Shems, Cynthia Solomon,
                    Marie Staver, Daniel Strimpel, Kilmer Sweazy,
                    John Henry Thompson, Ubong Ukoh, Vladimir Vuksan, Han Xu.
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
