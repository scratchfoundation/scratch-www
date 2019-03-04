const React = require('react');

const Page = require('../../../components/page/www/page.jsx');
const render = require('../../../lib/render.jsx');

const InformationPage = require('../../../components/informationpage/informationpage.jsx');

const Moderator = () => (
    <InformationPage title={'Community Moderator'}>
        <div className="inner info-inner">
            <p>
                Interested in online communities, internet culture, and
                working with kids? We&#39;re seeking community moderators
                to work with the <a href="/">Scratch</a> Team. Scratch
                Moderators help keep Scratch a safe, trusted, and friendly
                environment.
            </p>
            <p>
                Scratch is a free service where young people learn to
                program by creating interactive stories, games, and
                animations which they can share to an online community.
                Scratch has grown to more than 30 million registered
                members (ages 8 and up) who create and share thousands
                of projects each day. Moderators will gain valuable
                experience working online with youth in a creative,
                interest-driven setting.
            </p>
            <h3>Responsibilities:</h3>
            <ul>
                <li>
                    Promote the values and core ideas of the Scratch
                    project (such as inclusiveness, creative collaboration,
                    and constructive feedback)
                </li>
                <li>
                    Review reported users, projects, studios, and comments
                    for appropriateness on the Scratch website
                </li>
                <li>
                    Work with young people to help them understand what they
                    did that breaks our <a href="/community_guidelines">Community Guidelines</a>
                </li>
                <li>
                    Determine when a person is or isn’t likely to be able to
                    participate constructively in the Scratch online community
                </li>
            </ul>
            <br />
            <h3>Qualifications:</h3>
            <ul>
                <li>
                    Active participation in online communities, forums,
                    or social media
                </li>
                <li>
                    Excellent writing and communication skills
                </li>
                <li>
                    Comfortable learning to use new software and websites
                </li>
                <li>
                    Strong online research skills
                </li>
                <li>
                    Good judgement and ability to consider issues from
                    multiple perspectives
                </li>
                <li>
                    Able to work well independently, manage your time
                    well, and stay focused while working remotely
                </li>
                <li>
                    Able to work well as part of a team and participate
                    in group discussions
                </li>
                <li>
                    Not required, but would be nice: ability to read and
                    write in multiple languages (especially if one of those
                    languages is Japanese, Korean, or Russian!)
                </li>
            </ul>
            <br />
            <p>
                This position is part-time (10-15 hours per week),
                flexible hours (this work can be done 24/7 and we
                set a schedule which fits in with your life),
                under contract with starting pay of $12 per hour.
                All candidates must be at least 18 years old and
                have authorization to work in the United States.
            </p>
            <p><b>(MIT Media Lab, Cambridge, MA or Remote)</b></p>
            <p>
                Send a copy of your resume, links to one or more of your online
                presences, and cover letter to{' '}
                <a href="mailto:jobs+moderator@scratch.mit.edu">jobs+moderator@scratch.mit.edu</a>.
            </p>
            <p>
                <i>
                    Really want the gig? <a href="/create">Create</a> an
                    awesome Scratch project to introduce yourself, share
                    it on the Scratch website, and send us a link.
                </i>
            </p>
        </div>
    </InformationPage>
);

render(<Page><Moderator /></Page>, document.getElementById('app'));
