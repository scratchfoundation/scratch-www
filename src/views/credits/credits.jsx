var React = require('react');
var render = require('../../lib/render.jsx');

require('../../main.scss');
require('./credits.scss');

var generalMessages = require('../../main.intl');

var Navigation = require('../../components/navigation/navigation.jsx');
var Footer = require('../../components/footer/footer.jsx');

var Credits = React.createClass({
    type: 'Credits',
    render: function () {
        return (
            <div className="inner">
                <h1>Scratch Credits and Contributors</h1>
                <h2>MIT Scratch Team</h2>
                <p>Scratch is designed and developed by the Lifelong Kindergarten Group at MIT Media Lab:</p>

                <ul>
                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/167_170x170.png" />
                        <span className="name">Mitchel Resnick</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/169_170x170.png" />
                        <span className="name">Natalie Rusk</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/573207_170x170.png" />
                        <span className="name">Sayamindu Dasgupta</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/13682_170x170.png" />
                        <span className="name">Ricarose Roque</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/2584924_170x170.png" />
                        <span className="name">Ray Schamp</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/3484484_170x170.png" />
                        <span className="name">Eric Schilling</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/3532363_170x170.png" />
                        <span className="name">Chris Willis-Ford</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/3581881_170x170.png" />
                        <span className="name">Carl Bowman</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/4373707_170x170.png" />
                        <span className="name">Matthew Taylor</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/4598206_170x170.png" />
                        <span className="name">Kasia Chmielinski</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/703844_170x170.png" />
                        <span className="name">Tim Mickel</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/2752403_170x170.png" />
                        <span className="name">Saskia Leggett</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/2755634_170x170.png" />
                        <span className="name">Christan Balch</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/5721684_170x170.png" />
                        <span className="name">Randy Jou</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/10866958_170x170.png" />
                        <span className="name">Colby Gutierrez-Kraybill</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/1709047_170x170.png" />
                        <span className="name">Andrew Sliwinski</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/default_170x170.png" />
                        <span className="name">Ben Berg</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/2286560_170x170.png" />
                        <span className="name">Carmelo Presicce</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/default_170x170.png" />
                        <span className="name">Moran Tsur</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/3661900_170x170.png" />
                        <span className="name">Juanita Buitrago</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/default_170x170.png" />
                        <span className="name">Shruti Mohnot</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/1915915_170x170.png" />
                        <span className="name">Hannah Cole</span>
                    </li>
                </ul>

                <p>The team of Scratch moderators manages, supports, and improves the Scratch online community:</p>

                <ul>
                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/49156_170x170.png" />
                        <span className="name">Mark Goff</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/159139_170x170.png" />
                        <span className="name">Franchette Viloria</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/246290_170x170.png" />
                        <span className="name">Sarah Otts</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/2496866_170x170.png" />
                        <span className="name">Jolie Castellucci</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/3087865_170x170.png" />
                        <span className="name">Andrea Saxman</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/373646_170x170.png" />
                        <span className="name">Dalton Miner</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/586054_170x170.png" />
                        <span className="name">Megan Haddadi</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/4836354_170x170.png" />
                        <span className="name">Christina Huang</span>
                    </li>

                    <li>
                        <img src="//cdn.scratch.mit.edu/get_image/user/4747093_170x170.png" />
                        <span className="name">Annie Whitehouse</span>
                    </li>
                </ul>

                <h2>Previous MIT Scratch Team Members</h2>
                <p>
                    Many important contributions have been made by previous Scratch Team members,
                    including John Maloney (who led software development for the first decade of Scratch),
                    Andrés Monroy-Hernández (who led the development of the first Scratch community website),
                    Amos Blanton, Champika Fernando, Shane Clements, Abdulrahman idlbi, Evelyn Eastmond,
                    Amon Millner, Eric Rosenbaum, Jay Silver, Karen Brennan, Leo Burd, Oren Zuckerman, Gaia Carini,
                    Michelle Chung, Margarita Dekoli, Dave Feinberg, Chris Graves, Tony Hwang, Di Liu, Tammy Stern,
                    Lis Sylvan, and Claudia Urrea.
                </p>

                <h2>Design and Development Partners</h2>
                <p>
                    Paula Bontá and Brian Silverman, Playful Invention Company (who started contributing to the
                    design of Scratch even before it was called Scratch).
                </p>

                <h2>Scratch Researchers</h2>
                <p>
                    <a href="https://scratch.mit.edu/info/research/">Research on Scratch </a>
                    is being conducted by members of the MIT Scratch Team and researchers at
                    other universities, including Yasmin Kafai (who collaborated on the
                    <a href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=0325828"> initial NSF Scratch grant</a>
                    ) at the University of Pennsylvania Graduate School of Education, Karen Brennan (who leads the
                    <a href="http://scratched.gse.harvard.edu/"> ScratchEd project</a>) at the Harvard Graduate School
                    of Education, Benjamin Mako Hill at the University of Washington, Andrés Monroy Hernández at
                    Microsoft Research, Mimi Ito and Crystle Martin at the University of California, Irvine, Quinn
                    Burke at College of Charleston, Deborah Fields at Utah State University, and Kylie Peppler at
                    Indiana University.
                </p>

                <h2>Acknowledgements</h2>
                <p>
                    The following people have also contributed to the development and support of Scratch over the
                     years: Susan Abend, Robbie Berg, Lauren Bessen, Keith Braadfladt, Susan Carillo, Will Denton,
                     Nathan Dinsmore, Catherine Feldman, Jodi Finch, Ioana Fineberg, Rachel Garber, Chris Garrity,
                     Cassy Gibbs, Brian Harvey, Roland Hebert, Tracy Ho, Benjamin Howe, Kapaya Katongo, Evan Karatzas,
                     Christine Kim, Joren Lauwers, Mike Lee, Jeff Lieberman, Mark Loughridge, Kelly Liu, Anthony Lu,
                     Danny Lutz, David Malan, Wayne Marshall, John McIntosh, Paul Medlock-Walton, Dongfang (Tian) Mi,
                     Ximena Miranda, Jens Moenig, Evan Moore, Geetha Narayanan, Kate Nazemi, Liddy Nevile, Wing Ngan,
                     Derek O&#39;Connell, Tim Radvan, Karen Randall, Ian Reynolds, Miriam Ruiz, Chinua Shaw, Ed Shems,
                     Cynthia Solomon, Daniel Strimpel, Kilmer Sweazy, John Henry Thompson, Ubong Ukoh, Vladimir Vuksan,
                     Han Xu, and the many volunteer <a href="http://wiki.scratch.mit.edu/wiki/Translators"> Scratch
                     Translators</a> from around the world.
                </p>

                <p>
                    We greatly appreciate all of the contributions by members of the worldwide Scratch community,
                     who have shaped the direction of Scratch by sharing their projects, comments, and ideas.
                </p>
                <p>
                    The ideas of Seymour Papert and Alan Kay have deeply inspired and influenced our work on Scratch.
                </p>

                <h2>Supporting Organizations</h2>
                <p>
                    The following organizations have provided major financial support for Scratch:
                </p>
                <p>
                    <a href="http://www.nsf.gov/">National Science Foundation</a>,
                    <a href="http://www.scratchfoundation.org/"> Scratch Foundation</a>,
                    <a href="http://www.google.org/"> Google</a>,
                    <a href="http://www.legofoundation.com/"> LEGO Foundation</a>,
                    <a href="http://www.intel.com/">Intel Foundation</a>,
                    <a href="https://www.macfound.org/"> MacArthur Foundation</a>.
                </p>
                <p>
                    The following organizations donate their services to help keep the Scratch project running:
                </p>
                <p>
                    <a href="http://www.advancedinstaller.com/"> Advanced Installer</a>,
                    <a href="http://aws.amazon.com/"> Amazon Web Services</a>,
                    <a href="https://codetree.com/"> Codetree</a>,
                    <a href="https://www.fastly.com/"> Fastly</a>,
                    <a href="https://www.geckoboard.com"> Geckoboard</a>,
                    <a href="https://github.com/"> Github</a>,
                    <a href="https://www.inversoft.com/"> Inversoft</a>,
                    <a href="http://mailchimp.com/"> MailChimp</a>,
                    <a href="http://mandrill.com/">  Mandrill</a>,
                    <a href="http://newrelic.com/"> New Relic</a>,
                    <a href="https://www.pagerduty.com/"> PagerDuty</a>,
                    <a href="https://www.pingdom.com/"> Pingdom</a>,
                    <a href="https://www.rallydev.com/"> Rally</a>,
                    <a href="https://saucelabs.com/"> SauceLabs</a>,
                    <a href="https://screenhero.com/"> Screenhero</a>,
                    <a href="https://getsentry.com/welcome/"> Sentry</a>,
                    and <a href="http://www.git-tower.com/"> Tower</a>.
                </p>

                <p>
                    Scratch would not be possible without free and open source software, including:
                </p>
                <p>
                    <a href="https://www.djangoproject.com/"> Django</a>,
                    <a href="http://djangobb.org/"> DjangoBB</a>,
                    <a href="https://www.docker.com/"> Docker</a>,
                    <a href="https://www.elastic.co/"> Elasticsearch</a>,
                    <a href="http://ganglia.sourceforge.net/"> Ganglia</a>,
                    <a href="gunicorn.org"> Gunicorn</a>,
                    <a href="https://jenkins-ci.org/"> Jenkins</a>,
                    <a href="http://www.linux.org/"> Linux</a>,
                    <a href="http://memcached.org/"> Memcached</a>,
                    <a href="https://www.mediawiki.org/wiki/MediaWiki"> MediaWiki</a>,
                    <a href="http://www.mysql.com/"> MySQL</a>,
                    <a href="https://www.nagios.org/"> Nagios</a>,
                    <a href="https://www.nginx.com/resources/wiki/"> Nginx</a>,
                    <a href="https://nodejs.org/en/"> Node.js</a>,
                    <a href="http://pootle.translatehouse.org/"> Pootle</a>,
                    <a href="http://www.postgresql.org/"> PostgreSQL</a>,
                    <a href="https://www.python.org/"> Python</a>,
                    <a href="http://redis.io/"> Redis</a>,
                    <a href="http://saltstack.com/"> SaltStack</a>,
                    <a href="https://github.com/etsy/statsd/"> StatsD</a>,
                    <a href="http://www.ubuntu.com/"> Ubuntu</a>,
                    and <a href="https://www.varnish-cache.org/"> Varnish</a>.
                </p>
            </div>
        );
    }
});

render(<Navigation />, document.getElementById('navigation'), generalMessages);
render(<Footer />, document.getElementById('footer'), generalMessages);
render(<Credits />, document.getElementById('view'), generalMessages);
