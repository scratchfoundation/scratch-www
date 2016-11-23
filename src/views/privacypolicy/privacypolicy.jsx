var React = require('react');
var render = require('../../lib/render.jsx');

var Page = require('../../components/page/www/page.jsx');
var InformationPage = require('../../components/informationpage/informationpage.jsx');

var Privacypolicy = React.createClass({
    type: 'Privacypolicy',
    render: function () {
        return (
            <InformationPage title={'Privacy Policy'}>
                <div className="inner info-inner">
                    <section>
                        <p className="intro">
                            We made Scratch so people like you could create projects,
                             share ideas, and build a community. To make this happen,
                             we collect some information for our users. The Scratch Team
                             understands how important privacy is to our community,
                             especially kids and parents. We wrote this privacy policy
                             to explain what information we collect, how we use it,
                             and what we're doing to keep it safe. If you have any
                             questions regarding this privacy policy, you can{' '}
                             <a href="/contact-us">contact us</a>.
                        </p>
                        <p className="callout">
                            Please do not share personal contact information, such as
                             your name, physical address, email address, phone number,
                             or anything else that can be used to make contact outside
                             of the Scratch website. Please report projects, comments,
                             or forum posts that contain this kind of information so
                             the Scratch team can remove it, and please remind the
                             author of our policy.
                         </p>
                    </section>
                    <section id="collection">
                        <dl>
                            <span className="nav-spacer"></span>
                            <h3>What information does the Scratch Team collect about me?</h3>
                            <dt>Account Information: </dt>
                            <dd>
                                In order to build projects or comment on other users' projects,
                                 you need to make an account. During account creation, we ask you
                                 for a username, your country, birth month and year, gender, and
                                 your email address (or your parent or guardian's email address if
                                 you are under 13 years old). We ask that you select a user name
                                 that does not disclose your real name or other information that
                                 could identify you. Other users can see your username and country,
                                 but not your age, gender, or email address.
                            </dd>
                            <dt>User-generated Content: </dt>
                            <dd>
                                All of your Scratch projects, comments, and forum posts are stored
                                 on the Scratch servers. Other users can see your shared projects,
                                 comments, and forum posts, along with your username. Because the
                                 Scratch Team is responsible for moderation, we have access to all
                                 content stored on the Scratch website, including unshared projects.
                                 If you prefer to work on projects in complete privacy, you can use
                                 either the <a href="/scratch2download">Scratch 2 offline editor</a>{' '}
                                 or <a href="/scratch_1.4">Scratch 1.4</a>.
                            </dd>
                            <dt>Usage Information: </dt>
                            <dd>
                                When you use Scratch, our servers will automatically store a limited
                                 amount of information about how you use the website. This information
                                 includes a number that identifies your computer (the IP address), which
                                 pages you visited, and what browser you are using.
                            </dd>
                            <dt>Google Analytics: </dt>
                            <dd>
                                We also collect some data on where you click and which parts of the
                                 site you visit using Google Analytics. This "click data" helps us figure
                                 out ways to improve the website. Information collected and processed by
                                 Google Analytics includes the user's IP address, network location, and
                                 geographic location. Google Analytics acquires all its information
                                 directly from the user, by installing a cookie (see below) on your
                                 computer, if you have enabled JavaScript. Scratch does not share any
                                 information it collects with Google, and Google does not collect any
                                 personal identifying information about you.
                            </dd>
                            <dt>Cookies: </dt>
                            <dd>
                                When you log in, the Scratch website asks your browser to put an http
                                 "cookie" on your computer. The cookie is actually a small text file
                                 that our site can send to your browser for storage on your computer.
                                 This allows the website to remember that you are logged in when you
                                 go to a different page.
                            </dd>
                        </dl>
                    </section>
                    <section id="usage">
                        <span className="nav-spacer"></span>
                        <h3>How does the Scratch Team use my information?</h3>
                        <ul>
                            <li>
                                We collect age and gender data so that we know who is using our
                                 website.
                            </li>
                            <li>
                                If you forget your password, we will ask you to disclose to us
                                 your birth month and year so that we can verify your account, and
                                 your email address so that we can send you a new password.
                            </li>
                            <li>
                                We will use your email address to respond to messages you send us
                                 or to communicate with you about the Scratch service or your account.
                            </li>
                            <li>
                                We send out occasional email updates about Scratch to the confirmed
                                 email address on your account. Scratch will never sell or share your
                                 email address without your permission. You can unsubscribe from these
                                 updates by clicking the unsubscribe link found at the bottom of the
                                 email.
                            </li>
                            <li>
                                Parents and guardians who register their under-13 year olds for
                                 Scratch may also receive additional updates from the{' '}
                                 <a href="http://www.scratchfoundation.org/">Scratch Foundation</a>,
                                 a non-profit that supports Scratch educational initiatives.
                                 The Scratch Foundation will never sell or share your email
                                 address without your permission. You can unsubscribe from these
                                 updates by clicking the unsubscribe link found at the bottom of
                                 the email.
                            </li>
                            <li>
                                If we detect repeated abusive behavior from your account, IP address,
                                 or email address, we may share your account name, IP address, and the
                                 time and content of the abusive behavior with the IP address owner
                                 (such as a school or internet service provider).
                            </li>
                            <li>
                                We may use de-identified location, age, gender, and usage data
                                 in research studies intended to improve our understanding of
                                 how people learn with Scratch. The results of this research are
                                 shared with educators and researchers through conferences,
                                 journals, and other publications. You can find out more on our{' '}
                                 <a href="/info/research">Research page</a>.
                            </li>
                            <li>
                                We may disclose some of the information we collect to third-party
                                 service providers that help us manage communications to and from
                                 the Scratch website and improve website performance. We are
                                 satisfied that these service providers have privacy policies that
                                 restrict them from further disclosing any of your information.
                            </li>
                            <li>
                                Other than as described above, we will never share personally
                                identifiable information about you with any other person,
                                company, or organization, except:
                                <ul>
                                    <li>
                                        As required to comply with our obligations under the law.
                                    </li>
                                    <li>
                                        For technical reasons, if we are required to transfer the
                                         data on our servers to another location or organization.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Scratch reserves the right to share user information with the
                                 appropriate authorities (including schools, school districts,
                                 and law enforcement, when necessary) for the purposes of protecting
                                 the safety of users, other individuals, or the security of the site.
                            </li>
                        </ul>
                    </section>
                    <section id="update">
                        <span className="nav-spacer"></span>
                        <h3>How can I update my personal information?</h3>
                        <p>
                            You can update your password, email address, and country through
                             the <a href="/account/password_change">Account Settings</a> page.
                             You can also reset your password through the{' '}
                              <a href="/account/password_reset">Account Reset</a>{' '}
                             page. You cannot change your username, but you can make a new
                             account and manually copy your projects to the new account.
                        </p>
                        <p>
                            If you want to delete your account entirely, log in to Scratch,
                             and then click your username in the top right-hand corner. Select
                             "Account Settings," then click the "I want to delete my account"
                             link at the bottom of the page.
                        </p>
                    </section>
                    <section id="protection">
                        <span className="nav-spacer"></span>
                        <h3>How does the Scratch Team protect my information?</h3>
                        <p>
                            The Scratch Team has in place physical and electronic procedures
                             to protect the information we collect on the Scratch website. We
                             strictly limit individual access to the Scratch servers and the
                             data we store on them. However, as effective as these measures
                             are, no security system is impenetrable. We cannot completely
                             guarantee the security of our database, nor can we guarantee that
                             the information you supply will not be intercepted while being
                             transmitted to us over the Internet.
                        </p>
                    </section>
                    <section id="changes">
                        <span className="nav-spacer"></span>
                        <h3>Notifications of Changes to the Privacy Policy</h3>
                        <p>
                            We review our security measures and Privacy Policy on a periodic
                             basis, and we may modify our policies as appropriate. We may also
                             change or update our Privacy Policy if we add new services or
                             features. If we make any changes to our privacy practices, we will
                             amend this Privacy Policy accordingly and post the amended policy
                             on the Scratch website. We encourage you to review our Privacy
                             Policy on a regular basis.
                        </p>
                    </section>
                    <p>The Scratch Privacy Policy was last updated: November 2016</p>
                </div>
                <nav>
                    <ol>
                        <li><a href="#collection">What information does the Scratch Team collect about me?</a></li>
                        <li><a href="#usage">How does the Scratch Team use my information?</a></li>
                        <li><a href="#update">How can I update my personal information?</a></li>
                        <li><a href="#protection">How does the Scratch Team protect my information?</a></li>
                        <li><a href="#changes">Notifications of Changes to the Privacy Policy</a></li>
                    </ol>
                </nav>
            </InformationPage>
        );
    }
});

render(<Page><Privacypolicy /></Page>, document.getElementById('app'));
