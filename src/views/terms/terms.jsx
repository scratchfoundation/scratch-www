const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const Terms = () => (
    <InformationPage title={'Scratch Terms of Use'}>
        <div className="inner info-inner">
            <section id="user-agreement">
                <span className="nav-spacer" />
                <h3>1. User Agreement</h3>
                <p>
                    1.1 These Terms of Use constitute an agreement between
                    you and the Scratch Team that governs your use of{' '}
                    <a href="https://scratch.mit.edu">scratch.mit.edu</a>{' '}
                    and all associated services, including but not limited
                    to the <a href="http://day.scratch.mit.edu">Scratch Day</a>{' '}
                    and <a href="http://scratchx.org">ScratchX</a> websites
                    (collectively &#34;Scratch&#34;). The Scratch Team is part of the
                    Lifelong Kindergarten Group in the Media Laboratory at the
                    Massachusetts Institute of Technology (&#34;MIT&#34;). Please
                    read the Terms of Use carefully. By using Scratch you
                    affirm that you have read, understood, and accepted
                    the terms and conditions in the Terms of Use. If you
                    do not agree with any of these conditions, please do not
                    use Scratch.
                </p>
                <p>
                    1.2 Your privacy is important to us. Please read our{' '}
                    <a href="/privacy_policy">Privacy Policy</a>, which identifies
                    how the Scratch Team uses, collects, and stores information
                    it collects through the Services. By using Scratch, you
                    additionally agree that you are comfortable with Scratch&#39;s
                    Privacy Policy.
                </p>
                <p>
                    1.3 Scratch is open to children and adults of all ages, and
                    we ask that you keep this in mind when using the Scratch
                    services. When you use Scratch, you agree to abide by the{' '}
                    <a href="/community_guidelines">Scratch Community Guidelines</a>.
                </p>
                <p>
                    1.4 The Scratch Team may change the Terms of Use from time to
                    time. You can always find the latest version of the Terms of Use
                    at <a href="/terms_of_use">http://scratch.mit.edu/terms_of_use</a>.
                    The date of the most recent revisions will appear on this page.
                    Your continued use of the Services constitutes your acceptance
                    of any changes to or revisions of the Terms of Use.
                </p>
            </section>
            <section id="account-creation">
                <span className="nav-spacer" />
                <h3>2. Account Creation and Maintenance</h3>
                <p>
                    2.1 In order to use some features of the Services, you will need to
                    register with Scratch and create an account. Creating an account is
                    optional, but without an account you will not be able to save or
                    publish projects or comments on Scratch. When registering for a
                    personal account, you will be asked to provide certain personal
                    information, such as your email address, gender, birth month and
                    year, and country. Please see Scratch&#39;s{' '}
                    <a href="/privacy_policy">Privacy Policy</a> for Scratch&#39;s data
                    retention and usage policies.
                </p>
                <p>
                    2.2 You are responsible for keeping your password secret and your
                    account secure. You are solely responsible for any use of your
                    account, even if your account is used by another person. If any use
                    of your account violates the Terms of Service, your account may be
                    suspended or deleted.
                </p>
                <p>
                    2.3 You may not use another person&#39;s Scratch account without permission.
                </p>
                <p>
                    2.4 Account names cannot be changed. If you want a different account name,
                     create a new account and copy your existing projects over by hand.
                </p>
                <p>
                    2.5 If you have reason to believe that your account is no longer secure
                    (for example, in the event of a loss, theft, or unauthorized disclosure
                    of your password), promptly change your password. If you cannot access
                    your account to change your password, notify us at{' '}
                    <a href="mailto:help@scratch.mit.edu">help@scratch.mit.edu</a>.
                </p>
            </section>
            <section id="rules-of-usage">
                <span className="nav-spacer" />
                <h3>3. Rules of Usage</h3>
                <p>
                    3.1 The Scratch Team supports freedom of expression. However, Scratch is
                     intended for a wide audience, and some content is inappropriate for the
                     Scratch community. You may not use the Scratch service in any way, that:
                    <ol>
                        <li>
                            Promotes bigotry, discrimination, hatred, or violence against any
                             individual or group;
                        </li>
                        <li>
                            Threatens, harasses, or intimidates any other person, whether that
                             person is a Scratch user or not;
                        </li>
                        <li>Contains foul language or personal attacks;</li>
                        <li>Contains sexually explicit or graphically violent material;</li>
                        <li>
                            Provides instructions on how to commit illegal activities or obtain
                             illegal products;
                        </li>
                        <li>
                            Except in connection with organizing Scratch day events, asks any
                             other user for personally identifying information, contact
                             information, or passwords; or
                        </li>
                        <li>
                            Exposes any others person&#39;s personally identifying information,
                             contact information, or passwords without that person&#39;s permission.
                        </li>
                    </ol>
                </p>
                <p>
                    3.3 You agree to comply with all applicable laws and regulations when you use
                     Scratch. You may not use Scratch in any unlawful way, including to harass,
                     stalk, or defame any other person.
                </p>
                <p>
                    3.4 You may not impersonate, imitate or pretend to be somebody else when using
                     the Services.
                </p>
                <p>
                    3.5 You agree not to use Scratch in any way intended to disrupt the service,
                     gain unauthorized access to the service, or interfere with any other user&#39;s
                     ability to use the service. Prohibited activities include, but are not limited
                     to:
                    <ol>
                        <li>
                            Posting content deliberately designed to crash the Scratch
                             website or editor;
                        </li>
                        <li>
                            Linking to pages containing viruses or malware;
                        </li>
                        <li>
                            Using administrator passwords or pretending to be an administrator;
                        </li>
                        <li>
                            Repeatedly posting the same material, or &#34;spamming&#34;;
                        </li>
                        <li>
                            Using alternate accounts or organizing voting groups to manipulate
                             site statistics, such as purposely trying to get on the &#34;What the
                             Community is Loving/Remixing&#34; rows of the front page.
                        </li>
                    </ol>
                </p>
                <p>
                    3.6 Commercial use of Scratch, user-generated content, and support
                    materials is permitted under the{' '}
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/">
                    Creative Commons Attribution-ShareAlike 2.0 license</a>. However,
                    the Scratch Team reserves the right to block any commercial use
                    of Scratch that, in the Scratch Team&#39;s sole discretion, is harmful
                    to the community. Harmful commercial use includes spamming or
                    repeated advertisement through projects, comments, or forum posts.
                </p>
                <p>
                    3.7 You agree not to post links to any content outside of the
                    Scratch website, if to do so would violate any part of the Terms of Use.
                </p>
            </section>
            <section id="user-content">
                <span className="nav-spacer" />
                <h3>4. User-Generated Content and Licensing</h3>
                <p>
                    4.1 For the purposes of the Terms of Use, &#34;user-generated content&#34;
                     includes any projects, comments, forum posts, or links to third
                     party websites that a user submits to Scratch.
                </p>
                <p>
                    4.2 The Scratch Team encourages everyone to foster creativity by
                     freely sharing code, art, music, and other works. However, we
                     also understand the need for individuals and companies to protect
                     their intellectual property rights. You are responsible for making
                     sure you have the necessary rights, licenses, or permission for
                     any user-generated content you submit to Scratch.
                </p>
                <p>
                    4.3 All user-generated content you submit to Scratch is licensed
                    to and through Scratch under the{' '}
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/">
                    Creative Commons Attribution-ShareAlike 2.0 license</a>. This
                    allows others to view and remix your content. This license also
                    allows the Scratch Team to display, distribute, and reproduce
                    your content on the Scratch website, through social media
                    channels, and elsewhere. If you do not want to license your
                    content under this license, then do not share it on Scratch.
                </p>
                <p>
                    4.4 You may only submit user-generated projects that were created
                     with (1) the Scratch website editor or (2) an unmodified copy of
                     the Scratch editor compiled from the source code described in
                     Section 5.3. You may not upload any projects that were created, by
                     you or by anyone else, with a modified version of the Scratch editor.
                </p>
                <p>
                    4.5 Although the Scratch Team requires all users to comply with
                     these Terms of Use, some inappropriate user-generated content
                     may be submitted and displayed on the Scratch website. You
                     understand that when you use Scratch you may be exposed to
                     user-generated content that you find objectionable or offensive.
                     If you see any content that violates the Community Guidelines
                     or Terms of Use, please let us know by using the &#34;Report this&#34;
                     button. You only need to report an item once. The Scratch Team
                     reviews reported content every day.
                </p>
                <p>
                    4.6 In addition to reviewing reported user-generated content, the
                     Scratch Team reserves the right, but is not obligated, to monitor
                     all uses of the Scratch service. The Scratch Team may edit, move,
                     or delete any content that violates the Terms of Use or Community
                     Guidelines, without notice.
                </p>
                <p>
                    4.7 All user-generated content is provided as-is. The Scratch Team
                     makes no warranties about the accuracy or reliability of any
                     user-generated content available through Scratch and does not
                     endorse Scratch Day events or vet or verify information posted in
                     connection with said events. The Scratch Team does not endorse any
                     views, opinions, or advice expressed in user-generated content. You
                     agree to relieve the Scratch Team of any and all liability arising
                     from your user-generated content and from Scratch Day events you
                     may organize or host.
                </p>
            </section>
            <section id="scratch-content">
                <span className="nav-spacer" />
                <h3>5. Scratch Content and Licensing</h3>
                <p>
                    5.1 Except for any user-generated content, the Scratch Team owns and
                     retains all rights in and to the Scratch code, the design,
                     functionality, and architecture of Scratch, and any software or
                     content provided through Scratch (collectively &#34;the Scratch IP&#34;).
                     If you want to use Scratch in a way that is not allowed by these
                     Terms of Use, you must first contact the Scratch Team. Except for
                     any rights explicitly granted under these Terms of Use, you are not
                     granted any rights in and to any Scratch IP.
                </p>
                <p>
                    5.2 Scratch provides support materials, including images, sounds,
                    video, and sample code, to help users build projects. Support materials
                    are licensed under the{' '}
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/">
                    Creative Commons Attribution-ShareAlike 2.0 license</a>. You may also
                    use screenshots of Scratch under the same license. Please note that
                    this does not apply to materials that are also trademarked by the
                    Scratch Team or other parties as described in parts 5.4 and 5.5, below.
                    <br />
                    The Creative Commons Attribution-ShareAlike 2.0 license requires you to
                    attribute any material you use to the original author. When you use
                    Scratch support materials, or screenshots of the Scratch website,
                    please use the following attribution: &#34;Scratch is developed by the
                    Lifelong Kindergarten Group at the MIT Media Lab. See
                    http://scratch.mit.edu.&#34;
                </p>
                <p>
                    5.3 The source code for Scratch 1.4 is available for download and subject
                    to the copyright notice as indicated on the <a href="/info/faq">Scratch FAQ</a>
                    {' '}page.
                </p>
                <p>
                    5.4 The Scratch name, Scratch logo, Scratch Day logo, Scratch Cat, and Gobo
                     are Trademarks owned by the Scratch Team. The MIT name and logo are Trademarks
                     owned by the Massachusetts Institute of Technology. Unless you are licensed by
                     Scratch under a specific licensing program or agreement, you may not use
                     these logos to label, promote, or endorse any product or service. You may use
                     the Scratch Logo to refer to the Scratch website and programming language.
                </p>
                <p>
                    5.5 The Scratch support materials library may contain images and sounds that
                     are trademarked by third parties. The fact that materials are included in
                     the Scratch support materials library does not in any way limit or reduce
                     intellectual property rights, including trademark rights, otherwise
                     available to the materials&#39; owners. Nothing in these Terms of Use or the
                     Creative Commons 2.0 license will be construed to limit or reduce any
                     party&#39;s rights in that party&#39;s valid trademarks. You may not use these
                     materials to label, promote, or endorse any product or service. You are
                     solely responsible for any violation of a third party&#39;s intellectual
                     property rights caused by your misuse of these materials.
                </p>
            </section>
            <section id="dmca">
                <span className="nav-spacer" />
                <h3>6. Digital Millennium Copyright Act (DMCA)</h3>
                <p>
                    6.1 If you are a copyright holder and believe that content on Scratch
                    violates your rights, you may send a DMCA notification to{' '}
                    <a href="mailto:copyright@scratch.mit.edu">copyright@scratch.mit.edu</a>.
                    For more information, including the information that must be included
                    in a DMCA notification, see our full <a href="/DMCA">DMCA Policy</a> and
                    the text of the DMCA,{' '}
                    <a href="http://www.law.cornell.edu/uscode/text/17/512">17 U.S.C. § 512</a>.
                </p>
                <p>
                    6.2 If you are a Scratch user and you believe that your content did not
                    constitute a copyright violation and was taken down in error, you may
                    send a notification to{' '}
                    <a href="mailto:copyright@scratch.mit.edu">copyright@scratch.mit.edu</a>.
                    Please include:
                    <ul>
                        <li>Your Scratch username and email address;</li>
                        <li>The specific content you believe was taken down in error; and</li>
                        <li>
                            A brief statement of why you believe there was no copyright violation
                            (e.g., the content was not copyrighted, you had permission to use the
                            content, or your use of the content was a &#34;fair use&#34;).
                        </li>
                    </ul>
                </p>
            </section>
            <section id="termination">
                <span className="nav-spacer" />
                <h3>7. Suspension and Termination of Accounts</h3>
                <p>
                    7.1 Scratch has the right to suspend your account for violations of the
                     Terms of Use or Community Guidelines. Repeat violators may have their
                     account deleted. The Scratch Team reserves the sole right to determine
                     what constitutes a violation of the Terms of Use or Community Guidelines.
                     The Scratch Team also reserves the right to terminate any account used
                     to circumvent prior enforcement of the Terms of Use.
                </p>
                <p>
                    7.2 If you want to delete or temporarily disable your account, please
                     email <a href="mailto:help@scratch.mit.edu">help@scratch.mit.edu</a>.
                </p>
            </section>
            <section id="third-party">
                <span className="nav-spacer" />
                <h3>8. Third Party Websites</h3>
                <p>
                    8.1 Content on Scratch, including user-generated content, may include
                     links to third party websites. The Scratch Team is not capable of
                     reviewing or managing third party websites, and assumes no
                     responsibility for the privacy practices, content, or functionality
                     of third party websites. You agree to relieve the Scratch Team of
                     any and all liability arising from third party websites.
                </p>
            </section>
            <section id="indemnification">
                <span className="nav-spacer" />
                <h3>9. Indemnification</h3>
                <p>
                    You agree to indemnify MIT, the Scratch Team, the Scratch Foundation,
                     and all their affiliates, employees, faculty members, fellows,
                     students, agents, representatives, third party service providers,
                     and members of their governing boards (all of which are &#34;Scratch
                     Entities&#34;), and to defend and hold each of them harmless, from any
                     and all claims and liabilities (including attorneys{'\''} fees) arising
                     out of or related to your breach of the Terms of Service or your
                     use of Scratch.
                </p>
                <p>
                    For federal government agencies, provisions in the Terms of Use
                     relating to Indemnification shall not apply to your Official Use,
                     except to the extent expressly authorized by federal law. For
                     state and local government agencies in the United States, Terms
                     of Use relating to Indemnification shall apply to your Official
                     Use only to the extent authorized by the laws of your jurisdiction.
                </p>
            </section>
            <section id="disclaimer">
                <span className="nav-spacer" />
                <h3>10. Disclaimer of Warranty</h3>
                <p><b>
                    You acknowledge that you are using Scratch at your own risk. Scratch
                     is provided &#34;as is,&#34; and the Scratch Entities hereby expressly
                     disclaim any and all warranties, express and implied, including but
                     not limited to any warranties of accuracy, reliability, title,
                     merchantability, non-infringement, fitness for a particular purpose
                     or any other warranty, condition, guarantee or representation,
                     whether oral, in writing or in electronic form, including but not
                     limited to the accuracy or completeness of any information contained
                     therein or provided by Scratch. Without limiting the foregoing, the
                     Scratch Entities disclaim any and all warranties, express and implied,
                     regarding user-generated content and Scratch Day events. The Scratch
                     Entities and their third party service providers do not represent or
                     warrant that access to Scratch will be uninterrupted or that there
                     will be no failures, errors or omissions or loss of transmitted
                     information, or that no viruses will be transmitted through Scratch
                     services.
                </b></p>
            </section>
            <section id="liability">
                <span className="nav-spacer" />
                <h3>11. Limitation of Liability</h3>
                <p><b>
                    The Scratch Entities shall not be liable to you or any third parties
                     for any direct, indirect, special, consequential or punitive damages
                     of any kind, regardless of the type of claim or the nature of the
                     cause of action, even if the Scratch Team has been advised of the
                     possibility of such damages. Without limiting the foregoing, the
                     Scratch Entites shall have no liability to you or any third parties
                     for damages or harms arising out of user-generated content or
                     Scratch Day events.
                </b></p>
            </section>
            <section id="jurisdiction">
                <span className="nav-spacer" />
                <h3>12. Jurisdiction</h3>
                <p>
                    Scratch is offered by the Scratch Team from its facilities in the United
                     States. The Scratch Team makes no representations that Scratch is
                     appropriate or available for use in other locations. Those who access
                     or use Scratch are responsible for compliance with local law.
                </p>
            </section>
            <section id="choice-of-law">
                <span className="nav-spacer" />
                <h3>13. Choice of Law and Venue</h3>
                <p>
                    You agree that these Terms of Use, for all purposes, shall be governed
                     and construed in accordance with the laws of the Commonwealth of
                     Massachusetts applicable to contracts to be wholly performed therein,
                     and any action based on, relating to, or alleging a breach of the
                     Terms of Use must be brought in a state or federal court in Suffolk
                     County, Massachusetts. In addition, both parties agree to submit to
                     the exclusive personal jurisdiction and venue of such courts.
                </p>
                <p>
                    If you are a federal, state, or local government entity in the United
                     States using Scratch in your official capacity and legally unable to
                     accept the controlling law, jurisdiction or venue clauses above, then
                     those clauses do not apply to you. For such U.S. federal government
                     entities, these Terms and any action related thereto will be governed
                     by the laws of the United States of America (without reference to
                     conflict of laws) and, in the absence of federal law and to the extent
                     permitted under federal law, the laws of the Commonwealth of
                     Massachusetts (excluding choice of law).
                </p>
            </section>
            <section id="choice-of-language">
                <span className="nav-spacer" />
                <h3>14. Choice of Language</h3>
                <p>
                    If the Scratch Team provides you with a translation of the English language
                     version of these Terms of Use, the Privacy Policy, or any other policy,
                     then you agree that the translation is provided for informational purposes
                     only and does not modify the English language version. In the event of a
                     conflict between a translation and the English version, the English version
                     will govern.
                </p>
            </section>
            <section id="no-waiver">
                <span className="nav-spacer" />
                <h3>15. No Waiver</h3>
                <p>
                    No waiver of any term of these Terms of Use shall be deemed a further or
                     continuing waiver of such term or any other term, and the Scratch Team&#39;s
                     failure to assert any right or provision under these Terms of Use shall
                     not constitute a waiver of such right or provision.
                </p>
            </section>
            <section id="entire-agreement">
                <span className="nav-spacer" />
                <h3>16. Entire Agreement</h3>
                <p>
                    This document, together with all appendices, constitutes the entire Terms
                     of Use and supersedes all previous agreements with the Scratch Team relating
                     to the use of Scratch. Revision date: April 2016.
                </p>
            </section>
            <section id="appendix-a">
                <span className="nav-spacer" />
                <h3>Appendix A: Additional Terms for Scratch Day Website</h3>
                <p>
                    The following additional terms also govern your access to and use of web
                     pages hosted within day.scratch.mit.edu/ (collectively, the “Scratch Day
                     Site”). All of the terms set forth in the general Terms of Use above also
                     apply to the Scratch Day Site, unless we clearly state otherwise.
                </p>
                <h4>1. Privacy Policy</h4>
                <p>
                    The Scratch Day Site Privacy Policy, not the Scratch Privacy Policy,
                     describes how the Scratch Team uses, collects, and stores information
                     it collects through the Scratch Day Site. By using the Scratch Day
                     Site, you agree that you are comfortable with the Privacy Policy.
                </p>
                <h4>2. Account Creation and Maintenance</h4>
                <p>
                    2.1 In order to post an event to the Scratch Day Site, you will need
                     to register and create an account. This account is a separate account
                     from your Scratch account. All registrants must be over 18 years of
                     age. When registering for a personal account, you will be asked to
                     provide certain personal information, such as your email address,
                     first and last name, and Scratch username (optional). Please see the
                     Scratch Day Site Privacy Policy for Scratch’s data retention and usage
                     policies.
                </p>
                <p>
                    2.2 You are responsible for keeping your password secret and your account
                     secure. You are solely responsible for any use of your account, even if
                     your account is used by another person. If any use of your account
                     violates the Terms of Use, your account may be suspended or deleted.
                </p>
                <p>
                    2.3 If you have reason to believe that your account is no longer secure
                    (for example, in the event of a loss, theft, or unauthorized disclosure
                    of your password), promptly change your password. If you cannot access
                    your account to change your password, notify us at{' '}
                    <a href="mailto:scratchday@media.mit.edu">scratchday@media.mit.edu</a>
                </p>
                <p>
                    2.4 The terms set forth in this section apply to the Scratch Day Site.
                    The Account Creation and Maintenance terms in the general Terms of Use
                    do not apply to the Scratch Day Site.
                </p>
                <h4>3. No Endorsement</h4>
                <p>
                    You understand that neither MIT, nor the Scratch Team, nor the Code to
                     Learn Foundation endorses any Scratch Day event. If you are hosting a
                     Scratch Day event, you may not state or imply that MIT, the Scratch
                     Team, or the Code to Learn Foundation has endorsed your event.
                </p>
            </section>
            <section id="appendix-b">
                <span className="nav-spacer" />
                <h3>Appendix B: Additional Terms for ScratchX Website</h3>
                <p>
                    The following additional terms also govern your access to and use of web
                     pages hosted within scratchx.org (collectively, the “ScratchX Site”).
                     All of the terms set forth in the general Terms of Use above also apply
                     to the ScratchX Site, unless we clearly state otherwise.
                </p>
                <h4>1. ScratchX and GitHub</h4>
                <p>
                    The ScratchX Site provides a platform for developers to link their
                     experimental extensions to Scratch. However, we do not host those
                     extensions or save them on the ScratchX site. All the extensions loaded
                     on to ScratchX are hosted publicly on independent developers’ accounts
                     on GitHub. Your use of GitHub is subject to GitHub’s Terms of Service
                     and Privacy.
                </p>
                <h4>2. Privacy Policy</h4>
                <p>
                    The ScratchX Site Privacy Policy, not the Scratch Privacy Policy,
                     describes how the Scratch Team uses, collects, and stores information
                     it collects through the ScratchX Site. By using the ScratchX Site, you
                     agree to the terms of the Privacy Policy.
                </p>
                <h4>3. No Endorsement</h4>
                <p>
                    By using ScratchX, you understand that neither MIT, nor the Scratch Team,
                     nor the Code to Learn Foundation endorses any ScratchX experimental
                     extension. If you are a developer linking to your own experimental
                     extension via the ScratchX site, you may not state or imply that MIT,
                     the Scratch Team, or the Code to Learn Foundation has endorsed your
                     extension.
                </p>
            </section>
            <p><b>The Scratch Terms of Use was last updated: April 2016</b></p>
        </div>
        <nav>
            <ol>
                <li><a href="#appendix-a">Scratch Day Terms</a></li>
                <li><a href="#appendix-b">ScratchX Terms</a></li>
            </ol>
        </nav>
    </InformationPage>
);

render(<Page><Terms /></Page>, document.getElementById('app'));
