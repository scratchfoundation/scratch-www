const React = require('react');

const Page = require('../../../components/page/www/page.jsx');
const render = require('../../../lib/render.jsx');

const InformationPage = require('../../../components/informationpage/informationpage.jsx');

const Moderator = () => (
    <InformationPage title={'Community Moderator'}>
        <div className="inner info-inner">
            <p>
                Interested in kids, creativity, and online communities?
                We&#39;re seeking community moderators to work with the Scratch
                Team. Moderators will support creative activities and
                positive interactions on Scratch — a free online community
                where young people program and share interactive stories,
                games, and animations. Scratch has grown to more than 20
                million registered members (ages 8 and up), creating and
                sharing thousands of projects each day. Moderators will
                gain valuable experience working online with youth in a
                creative, interest driven setting.
            </p>
            <h3>Responsibilities:</h3>
            <ul>
                <li>
                    Participate actively in the Scratch online community as
                    a mentor and resource for youth
                </li>
                <li>
                    Help moderate projects, studios, and comments on the
                    website
                </li>
                <li>
                    Support youth volunteer programs in the online community
                </li>
                <li>
                    Promote the values and core ideas of the Scratch project
                    (such as remixing, creative collaboration, and
                    constructive feedback)
                </li>
            </ul>
            <br />
            <h3>Qualifications:</h3>
            <ul>
                <li>
                    Active participation in online communities, forums, or
                    other web-based media
                </li>
                <li>
                    Excellent writing and communication skills
                </li>
                <li>
                    Good at considering issues from multiple perspectives
                </li>
                <li>
                    Able to work independently and as part of a team
                </li>
                <li>
                    Interest in visual arts, programming, or teaching
                </li>
                <li>
                    Not required, but would be cool: Ability to read and
                    write another language
                </li>
            </ul>
            <br />
            <p>
                This position is part-time (10-12 hours per week) under contract.
                All candidates must be at least 18 years old and have
                authorization to work in the United States.
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
