const React = require('react');
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');

const CommunityBlocksInterviews = () => (
    <div className="inner">
        <h2>Community Blocks Beta Tester Interviews</h2>
        <br />
        <p>
            Hello Scratchers!
        </p>
        <p>
            I am Sayamindu Dasgupta (<a
                href="/users/sdg1/"
                rel="noopener noreferrer"
                target="_blank"
            >
                sdg1
            </a> on Scratch) and I am a member of
            the <a
                href="/info/credits"
                rel="noopener noreferrer"
                target="_blank"
            >
                MIT Scratch Team
            </a>.
        </p>
        <p>
            One of our projects on the MIT Scratch Team is to understand how people use Scratch, the Scratch Community
            Blocks, and participate in the Scratch community. To do this, we are talking to Scratchers who have been
            particapting the Community Blocks beta testing program directly through interviews. In the interview, we
            would talk for an hour, asking about your Scratch experience (by phone or a service like Skype).
        </p>
        <p>
            Thank you for indicating in the beta invitation survey that you are willing to be interviewed.
            If you are still interested, please do the following steps:
        </p>

        <ul>
            <li>
                <b>Complete the consent forms:</b> If you are under 18 years old, please download and complete these
                two forms (<a href="/pdfs/interviews/communityblocks/assent_form.pdf">one for you to sign</a>&nbsp;
                and <a href="/pdfs/interviews/communityblocks/consent_for_parent.pdf">
                    another for your parent to sign
                </a>).
                If you are 18 years old and over, please complete&nbsp;
                <a href="/pdfs/interviews/communityblocks/consent_for_over_18.pdf">this form</a>.
            </li>
            <li>
                <b>Send the forms:</b> You can send me the forms in two ways: (1) by email
                (<a
                    href="mailto:sayamindu@media.mit.edu"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    sayamindu@media.mit.edu
                </a>) by taking a picture
                or scanning the forms, or (2) send it through snail mail to Sayamindu Dasgupta, 77 Massachusetts Ave
                E14-464A, Cambridge, MA 02139
            </li>
            <li>
                <b>Schedule a time to talk:</b> Send me an email
                (<a
                    href="mailto:sayamindu@media.mit.edu"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    sayamindu@media.mit.edu
                </a>) with a possible time
                where we can talk for about an hour.
            </li>
            <li>
                If you have any questions, please do not hesitate to contact me by sending me an email
                at <a href="mailto:sayamindu@media.mit.edu">sayamindu@media.mit.edu</a>.
            </li>
        </ul>

        <p>
            Thank you and I look forward to speaking with you. Scratch on!
        </p>
        Sayamindu
    </div>
);

render(<Page><CommunityBlocksInterviews /></Page>, document.getElementById('app'));
