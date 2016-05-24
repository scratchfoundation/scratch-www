var React = require('react');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var Page = require('../../components/page/www/page.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');

require('./faq.scss');

var Faq = React.createClass({
    type: 'Faq',
    render: function () {
        return (
            <div className="faq">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1>FAQ</h1>
                        <p className="intro"><FormattedMessage id='faq.intro' /></p>
                    </div>
                    <div className="band">
                        <SubNavigation className="inner">
                            <a href="#about-scratch">
                                <li>
                                    <FormattedMessage id='faq.aboutTitle' />
                                </li>
                            </a>
                            <a href="#privacy">
                                <li>
                                    <FormattedMessage id='faq.privacyTitle' />
                                </li>
                            </a>
                            <a href="#remix">
                                <li>
                                    <FormattedMessage id='faq.remixTitle' />
                                </li>
                            </a>
                            <a href="#accounts">
                                <li>
                                    <FormattedMessage id='faq.accountsTitle' />
                                </li>
                            </a>
                            <a href="#permissions">
                                <li>
                                    <FormattedMessage id='faq.permissionsTitle' />
                                </li>
                            </a>
                            <a href="#inappropriate-content">
                                <li>
                                    <FormattedMessage id='faq.inappropriateContentTitle' />
                                </li>
                            </a>
                            <a href="#clouddata">
                                <li>
                                    <FormattedMessage id='faq.cloudDataTitle' />
                                </li>
                            </a>
                        </SubNavigation>
                    </div>
                </TitleBanner>
                <div className="inner">
                    <section id="about-scratch">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='faq.aboutTitle' /></h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.aboutTitleOne' /></h3>
                                <p><FormattedHTMLMessage id='faq.aboutBodyOne' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.aboutTitleTwo' /></h3>
                                <p><FormattedHTMLMessage id='faq.aboutBodyTwo' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3 id="requirements"><FormattedMessage id='faq.aboutTitleThree' /></h3>
                                <p><FormattedHTMLMessage id='faq.aboutBodyThree' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.aboutTitleFour' /></h3>
                                <p><FormattedHTMLMessage id='faq.aboutBodyFour' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I still upload projects created with older versions of Scratch to the website?</h3>
                                <p>
                                    Yes - you can share or upload projects made with earlier versions of Scratch, and they will be visible and playable. (However, you can’t download projects made with or edited in later versions of Scratch and open them in earlier versions. For example, you can’t open a Scratch 2 project in <a href ="/scratch_1.4">Scratch 1.4</a>, because <a href ="/scratch_1.4">Scratch 1.4</a> doesn’t know how to read the .sb2 project file format.)
                                </p>
                            </div>
                       </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I record a video of my Scratch project?</h3>
                                <p>
                                    Yes, you can record a video of your Scratch project up to 60 seconds. In the Scratch editor, from the File menu, select "Record Project Video." (You need to be signed in to see this option.) You can choose additional recording options (such as recording sound and mouse clicks) through the "More Options" menu. Then, run your project however you'd like. Once the recording is done, follow the instructions to download the file to your computer. Depending on what kind of computer you have, you may need to download another program like the <a href="http://www.videolan.org/vlc/index.html">VLC Media Player</a> to play the file. This file will run on YouTube, Vimeo, and Facebook, but may need to be converted for other websites like Twitter or Tumblr.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How much does Scratch cost? Do I need a license?</h3>
                                <p>
                                    Scratch is and always will be free. You don’t need a license to use Scratch in your school, home, or anywhere else. The development and maintenance of Scratch is paid for by grants and donations. If you’d like to contribute to Scratch, check out our <a href="#">Donate page</a>.
                                </p>
                            </div>
                        </FlexRow>
                       <FlexRow className="sidebar-row">
                           <div className="body-copy column">
                               <h3>Who created Scratch?</h3>
                               <p>
                                   Scratch is developed and maintained by the Scratch Team at the <a href="http://llk.media.mit.edu/">Lifelong Kindergarten group</a> at <a href="http://www.media.mit.edu/">MIT Media Lab</a>.
                                </p>
                           </div>
                        </FlexRow>
                    </section>

                    <section id="privacy">
                        <span className="nav-spacer"></span>
                        <h2>Privacy Policy</h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What information do you ask for during account registration?</h3>
                                <p>
                                    To protect the privacy of our community members, we limit what we collect and what we publish on the website. During the registration process, we ask for the following information:
                                </p>
                                <ul>
                                    <li>username - We ask that users avoid using their real names or other identifying information.</li>
                                    <li>country</li>
                                    <li>birth month and year - We use this to confirm ownership of the account if the owner loses the password and email or asks to close an account.</li>
                                    <li>gender</li>
                                    <li>contact email address - If the account holder is younger than 13, we ask for the email address of their parent or guardian. We do not send email to this address except when someone requests to have the account password reset.</li>
                                </ul>
                                <p>
                                    The username and country of the account holder are displayed publicly on their profile page. The birth month / year, email address, and gender associated with the account are not displayed publicly. We collect this info so we can know the age and gender of our users in aggregate, and for research purposes. We do not sell or rent information about our users to anyone.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What data is collected from people while they use the website?</h3>
                                <p>
                                    When a user logs in, the Scratch website asks their browser to put an <a href="http://en.wikipedia.org/wiki/HTTP_cookie">http cookie</a> on their computer in order to remember that they are logged in while they browse different pages. We collect some data on where users click and which parts of the site they visit using Google Analytics. This "click data" helps us figure out ways to improve the website.
                                </p>

                                <p>
                                    Some of the information and data collected on the Scratch website are used in research studies intended to improve our understanding of how people learn with Scratch. The results of this research are shared with educators and researchers through conferences, journals, and other publications. You can find out more on our <a href="/info/research">Research page</a>.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Does the Scratch Team sell or rent information about users of Scratch to anyone?</h3>
                                <p>No.</p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can the Scratch Team view unshared projects on my 'My Stuff' page?</h3>
                                <p>
                                    Since the Scratch Team is responsible for moderation, we have access to all content stored on the Scratch website - including unshared projects. If you prefer to work on projects in complete privacy, you can use either the <a href="/scratch2download">Scratch 2 offline editor</a> or <a href ="/scratch_1.4">Scratch 1.4</a>.
                                </p>
                            </div>
                        </FlexRow>
                    </section>
                    <section id="remix">
                        <span className="nav-spacer"></span>
                        <h2>Remixing and Copying</h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What is a remix?</h3>
                                <p>
                                    When a Scratcher makes a copy of someone else’s project and modifies it to add their own ideas (for example, by changing scripts or costumes), the resulting project is called a "remix." Every project shared to the Scratch website can be remixed. We consider even a minor change to be a valid remix, as long as credit is given to the original project creator and others who made significant contributions to the remix.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Why does the Scratch Team require that all projects be “remixable”?</h3>
                                <p>
                                    We believe that viewing and remixing interesting projects is a great way to learn to program, and leads to cool new ideas. That’s why the source code is visible for every project shared to the Scratch website.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What if I don’t want others to remix my projects?</h3>
                                <p>
                                    By publishing your project on the Scratch website, you agree to license it under a <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.en">Creative Commons Share Alike</a> license. If you don’t want others to view and remix your creations, don’t share them on the Scratch website.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                             <div className="body-copy column">
                                 <h3>Can I use images / sounds / media from the internet in my projects?</h3>
                                 <p>
                                     It's important to respect the original creator’s wishes regarding remixing. If you choose to integrate someone else’s work into your own, be sure to give them credit on the project “credits” section, and include a link back to the original. To find art / sounds that are already licensed for remixing, check out the <a href="http://search.creativecommons.org/">Creative Commons search page</a>.
                                 </p>
                             </div>
                        </FlexRow>
                </section>
                <section id="accounts">
                    <span className="nav-spacer"></span>
                    <h2>Accounts</h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What is a “confirmed” Scratch account?</h3>
                                <p>
                                    A confirmed account on Scratch lets you share projects, write comments, and create studios. Confirming your account also lets you receive email updates from the Scratch Team.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How can I check whether my account has been confirmed?</h3>
                                <p>
                                    To check whether your account is confirmed, you must first log into your Scratch account in the top right of the screen. Once logged in, click on your username in the top right and select "Account Settings", then "Email Settings" on the left hand side. Confirmed email addresses will show a small green checkmark. Otherwise, you will see the text "Your email address is unconfirmed" in orange.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How do I confirm my account?</h3>
                                <p>
                                    After registering for Scratch, you will receive an email with a link to confirm your account. If you cannot find the email, check your Spam folder. To resend the email, go to your Account Settings, click the Email tab, and follow the instructions there. Please note that it may take up to an hour for the email to arrive. If you still don't see the email after an hour, <a href='/contact-us'>let us know</a>.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Do I have to confirm my account?</h3>
                                <p>
                                    You can still use many aspects of Scratch without confirming your account, including creating and saving projects (without sharing them). Note: If you created an account before February 11, 2015, then you can still use social features on Scratch without confirming your account.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>I forgot my password, how can I reset it?</h3>
                                <p>
                                    Enter your account name on the <a href="/accounts/password_reset/">password reset page</a>. The website will send an email to the address associated with the account containing a link you can use to reset your password.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How do I change my password?</h3>
                                <p>
                                    Go to the Scratch website, login, and then click your username in the upper right corner of the window. Choose "account settings", and click the link to change your password.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How do I change my email address?</h3>
                                <p>
                                    Go to the Scratch website, login, and then click your username in the upper right corner of the window. Choose "account settings", and click the link to change your email.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How do I transition from 'New Scratcher' to 'Scratcher'?</h3>
                                <p>
                                    Make and share projects, comment helpfully on other Scratcher's projects, and be patient! After a few weeks of being active, a link will appear on your profile page inviting you to become a Scratcher. (Note that we don't promote New Scratchers to Scratcher on request - even when bribed with fancy chocolates.)
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I have more than one account?</h3>
                                <p>
                                    It's fine to have a few accounts on the Scratch website, as long as none of them are used to break the Community Guidelines. In that case, all related accounts may be blocked or deleted.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Is it OK to have more than one person logged into an account?</h3>
                                <p>
                                    This is discouraged, because the website and project editor can easily get confused when more than one person is logged into the same account.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I change my username?</h3>
                                <p>
                                    The structure of the Scratch website depends on having a consistent account name, so it’s not possible to change your username. If you really need to, you can make a new account - but you'll have to copy your projects over on your own.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What information can I share on / with my account?</h3>
                                <p>
                                    Please don’t share personal contact information, such as your physical address, email, phone number, or anything else that can be used to make contact outside of the Scratch website. Please report projects, comments, or forum posts that contain this kind of information so the Scratch team can remove it, and remind the author of our policy.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How do I delete my account?</h3>
                                <p>
                                    Log in to Scratch, and then click your username in the top right-hand corner. Select “Account Settings,” then click the <em>“I want to delete my account”</em> link at the bottom of the page.
                                </p>
                            </div>
                        </FlexRow>
                    </section>
                    <section id="permissions">
                        <span className="nav-spacer"></span>
                        <h2>Licensing and Permissions</h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Is Scratch free?</h3>
                                <p>
                                    Yes! Scratch is available free of charge. You can use it in your school, and you can teach a course about it (even a course that costs money). You don't need to buy a license - it's free.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I use Scratch and / or screenshots of Scratch in a textbook or a CD?</h3>
                                <p>
                                    Yes, you can even write a book or chapter about Scratch. You may also use the Scratch logo when referring to Scratch. You may create screenshots / images of the Scratch application and website, and consider them to be licensed under the <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.en">Creative Commons Attribution-ShareAlike license</a>. We ask that you include a note on your textbook / CD / what have you that says "Scratch is developed by the Lifelong Kindergarten Group at the MIT Media Lab. See http://scratch.mit.edu".
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I include a description of Scratch and the Scratch logo in brochures or other materials?</h3>
                                <p>
                                    Sure! We recommend the following description: "Scratch is a programming language and online community where you can create your own interactive stories, games, and animations -- and share your creations with others around the world. In the process of designing and programming Scratch projects, young people learn to think creatively, reason systematically, and work collaboratively. Scratch is a project of the Lifelong Kindergarten group at the MIT Media Lab. It is available for free at http://scratch.mit.edu"
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I present Scratch at a conference?</h3>
                                <p>
                                    Please feel free to make presentations about Scratch to educators or other groups. We grant our permission to make presentations.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>May I use / remix Scratch support materials, sprites, images, sounds or sample projects I’ve found on the website?</h3>
                                <p>
                                    Yes - Scratch support materials made available on the Scratch website by the Scratch Team are available under the <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.en">Creative Commons Attribution-ShareAlike license</a>, with the exception of the Scratch Logo, Scratch Cat, and Gobo (Scratch trademarks).
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I sell my Scratch projects?</h3>
                                <p>
                                    Certainly - your project is your creation. Keep in mind that once you share your project on Scratch, everyone is free to download, remix, and reuse it as per the terms of the <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.en">CC-BY-SA 2.0 license</a>. So if you intend to sell your project, you may want to un-share it from Scratch.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Where can I find the source code for Scratch?</h3>
                                <p>
                                    The source code for Scratch 2 (website and editor) is not yet available. The source code for <a href ="/scratch_1.4">Scratch 1.4</a>, written in Squeak, is available <a href="https://github.com/LLK/Scratch_1.4">on GitHub</a>. The source code for the first version of the Scratch website - ScratchR - is available <a href="http://svn.assembla.com/svn/scratchr/">on Assembla</a>.
                                </p>
                            </div>
                        </FlexRow>
                    </section>
                    <section id="inappropriate-content">
                        <span className="nav-spacer"></span>
                        <h2>Inappropriate Content</h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How do I know what is or isn’t okay to share on the Scratch website?</h3>
                                <p>
                                    Check out the <a href="/community_guidelines">Scratch community guidelines</a> - they’re brief and don’t include a lot of legal stuff. There’s a link at the bottom of every page on Scratch.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What do I do if I see something that’s inappropriate?</h3>
                                <p>
                                    You can click the link that says “report” on any project, comment, discussion post, or user page where you think something isn't ok for Scratch. If the situation is complicated, you can use the Contact Us link to explain. Be sure to include as much detail as you can, with links to relevant pages.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What do I do if I see someone being mean or disrespectful?</h3>
                                <p>
                                    Don’t add to the flames! Responding to mean comments with more mean comments just makes things worse, and could result in your account being blocked. Instead, simply report anything that is disrespectful or unconstructive, and we’ll follow up with the author. We check reports every day, multiple times per day - so rest assured, we'll sort things out.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What does the Scratch team do when something is reported or flagged?</h3>
                                <p>
                                    The Scratch Team reviews reported comments and projects every day. If something breaks the Scratch community guidelines, we may remove it and send a warning to the account. Depending on how bad it is (or if we’ve already warned the account), we may also block the accounts or networks that were used to share it.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What happens when an account is blocked?</h3>
                                <p>
                                    When an account is blocked, the owner can no longer access it, or use it to create projects or comments. When they login, they see a page that explains why the account was blocked with a web form they can use to request to be unblocked. If the owner can show that they understand why their account was blocked, and promises to follow the community guidelines in the future, the  Scratch Team will review their case. Accounts will only be unblocked in cases where the account owner’s word can be trusted. Otherwise, the account (and most likely other accounts owned or created by that person) may be blocked permanently.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>My mean brother / Kaj / some other bad guy stole my account and got it banned, what do I do?</h3>
                                <p>
                                    You are responsible for keeping your password secure. If someone in real life takes control of your account and does bad stuff, tell the adults in charge of the computers. If you think someone you don’t know got access to your account, change the password and / or use the contact us link to explain the situation. If you got blocked for doing something that broke the community guidelines, don't just say you got hacked. If we can't trust you, we won't unblock you.
                                </p>
                            </div>
                        </FlexRow>
                    </section>
                    <section id="clouddata">
                        <span className="nav-spacer"></span>
                        <h2>Cloud Data</h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>What is cloud data?</h3>
                                <p>
                                    Cloud data is a feature in Scratch 2 that allows for data from a project to be saved and shared online. You can use cloud data to make surveys and other projects that store numbers over time.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Who can see the data stored in cloud data?</h3>
                                <p>
                                    When you interact with a project using cloud data blocks, your information can be stored along with your username, and others can view it. Each project keeps a log of who interacted with it and any data they shared.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Why is cloud data currently limited to only numbers -- with no strings or lists? </h3>
                                <p>
                                    The current site is limited to numbers in variables as an initial step to work out any issues with their use on the site. We plan to roll out cloud data features incrementally. If the infrastructure is working well, we plan to add other features (cloud lists, support for strings, etc.).
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>If I see someone post inappropriate content using cloud data, how do I report it?</h3>
                                <p>
                                    Click the "Report this" button (under on the project player) to report inappropriate content in cloud data. The report form includes a link to a log of all cloud data in that project and who left it - you may want to take look at it before sending your report. Make sure that you mention "cloud data" when you type your reason in the report.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Can I make chat rooms with cloud data?</h3>
                                <p>
                                    While it is technically possible to create chat rooms with cloud data, they are not currently allowed. We will reconsider this policy once we have a better sense of our capability for moderating and managing reports on cloud data.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How do I add a cloud variable when I'm making a project?</h3>
                                <p>
                                    When you make a variable, you can check the box that says "Cloud variable." Any data you store will be saved on the server and visible to others.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Who can change the information in a cloud variable?</h3>
                                <p>
                                    Only your project can store data in its cloud variable. If people change or remix your code, it creates a different variable in their project with the same name.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>I am logged in, but I still cannot use projects with cloud data. What is going on?</h3>
                                <p>
                                    You need to have become a "Scratcher" on the website to have access to cloud data. You can become a Scratcher through actively participating on the website.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>Is it possible to make multiplayer games with cloud data?</h3>
                                <p>Multiplayer games may be difficult to create, due to network speed and synchronization issues. However, some Scratchers are coming up with creative ways to use the cloud data for turn-by-turn and other games.
                                </p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3>How long does it take for cloud data to reach another Scratcher?</h3>
                                <p>
                                    It depends. If both Scratchers have a reasonably fast Internet connection (DSL/Cable), and there are no restrictive firewalls on the computers/network, updates should be transmitted in milliseconds. However, a lot of computers have firewall software running in them, and if the firewall software blocks outgoing connections to TCP port 531 and TCP port 843, the time-lag becomes one-second. We are currently trying to figure out ways in which we can work around this limitation.
                                </p>
                            </div>
                        </FlexRow>
                    </section>
                </div>
            </div>
        );
    }
});

render(<Page><Faq /></Page>, document.getElementById('app'));
