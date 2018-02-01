const React = require('react');
const render = require('../../../../lib/render.jsx');

const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const Page = require('../../../../components/page/conference/2016/page.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

require('./expect.scss');

const ConferenceExpectations = () => (
    <div className="expect">
        <TitleBanner className="mod-conference">
            <h1>
                What to Expect
            </h1>
            <div className="title-icon">
                <img
                    alt="expect-image"
                    src="/images/conference/expect/what-to-expect.png"
                />
            </div>
        </TitleBanner>
        <section className="inner profile">
            <FlexRow className="uneven">
                <div className="short">
                    <img src="/images/conference/expect/mitch.jpg" />
                    <h4>Mitchel Resnick</h4>
                    <p>
                        Professor of Learning Research at the MIT Media Lab
                    </p>
                </div>
                <div className="long">
                    <h2>Welcome to Scratch@MIT 2016!</h2>
                    <p className="intro">
                        The Scratch community keeps growing and growing.{' '}
                        Young people around the world have shared more than{' '}
                        15 million projects in the Scratch online community{' '}
                        – with 20,000 new projects every day.
                    </p>
                    <p className="intro">
                        But what excites us most is not the number of projects{' '}
                        but the diversity of projects. Take a look at the Scratch{' '}
                        website, and you’ll find an incredible variety of projects:{' '}
                        musical animations, virtual tours, science simulations,{' '}
                        interactive tutorials, and much more.
                    </p>
                    <p className="intro">
                        For us, this diversity of projects is an indication that{' '}
                        members of the Scratch community are developing their own{' '}
                        voices and identities through Scratch. They are learning{' '}
                        to express themselves creatively, to build on their interests,{' '}
                        and to share their ideas with others.
                    </p>
                    <p className="intro">
                        At this year’s Scratch@MIT conference, we’ll celebrate the many{' '}
                        paths and many styles of Scratch, exploring the multiple ways{' '}
                        that people can create, share, and learn with Scratch.
                    </p>
                    <p className="intro">
                        We are planning a very participatory conference, with lots of{' '}
                        hands-on workshops and opportunities for collaboration and sharing.{' '}
                        Let’s learn together!
                    </p>
                </div>
            </FlexRow>
        </section>
        <section className="keynote">
            <div className="inner">
                <div className="section-header">
                    <h2>Keynotes</h2>
                </div>
                <FlexRow>
                    <div className="card">
                        <div className="date">
                            <b>Thursday</b>
                        </div>
                        <h3>Scratch Conversations</h3>
                        <img
                            alt="Scratch Team Photo"
                            src="/images/conference/expect/scratch-team.jpg"
                        />
                        <p>
                            <b>MIT Scratch Team</b>
                            <br />
                            <b>Mitchel Resnick (moderator)</b>
                        </p>
                        <p>
                            The MIT Scratch Team opens the conference with a series of{' '}
                            conversations, exploring new ideas, new directions, and new{' '}
                            strategies for supporting creative learning with Scratch.
                        </p>
                    </div>
                    <div className="card">
                        <div className="date">
                            <b>Friday</b>
                        </div>
                        <h3>Pathways to Participation</h3>
                        <img
                            alt="Mimi and Nichole"
                            src="/images/conference/expect/mimi-nichole.jpg"
                        />
                        <p>
                            <b>Mimi Ito &amp; Nichole Pinkard</b>
                            <br />
                            <b>Ricarose Roque (moderator)</b>
                        </p>
                        <p>
                            How can we ensure that young people of all backgrounds and all{' '}
                            interests have opportunities to learn, grow, and thrive in today’s{' '}
                            rapidly-changing digital society?
                        </p>
                    </div>
                    <div className="card">
                        <div className="date">
                            <b>Saturday</b>
                        </div>
                        <h3>Creative Computing For All</h3>
                        <img
                            alt="Karen"
                            src="/images/conference/expect/karen.jpg"
                        />
                        <p>
                            <b>Karen Brennan (moderator)</b>
                        </p>
                        <p>
                            With ever-increasing attention on computing education and computer{' '}
                            science in K–12, what role can teachers play in making creative{' '}
                            computing experiences accessible to all learners?
                        </p>
                    </div>
                </FlexRow>
            </div>
        </section>
        <section className="inner schedule">
            <div className="section-header">
                <div className="title">
                    <h2>Daily Schedules</h2>
                </div>
                <p className="callout">
                    <img
                        alt="August 3rd Icon"
                        src="/svgs/conference/expect/aug3-icon.svg"
                    />
                    <b>Wednesday at 6:00p</b>&nbsp;–&nbsp;Early check-in and opening reception
                </p>
            </div>
            <FlexRow>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <img
                                    alt="August 4th Icon"
                                    src="/svgs/conference/expect/aug4-icon.svg"
                                />
                                <h3>Thursday</h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <b>8:30a</b>
                                <p>Breakfast (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>9:30a</b>
                                <p>Keynote Presentation</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>11:00a</b>
                                <p>Morning Workshops</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>12:30p</b>
                                <p>Lunch (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>2:00p</b>
                                <p>Afternoon Workshops</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>4:00p</b>
                                <p>Poster Sessions</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>7:00p</b>
                                <p>Self-organized dinner excursions</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <img
                                    alt="August 5th Icon"
                                    src="/svgs/conference/expect/aug5-icon.svg"
                                />
                                <h3>Friday</h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <b>8:30a</b>
                                <p>Breakfast (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>9:30a</b>
                                <p>Keynote Presentation</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>11:00a</b>
                                <p>Morning Workshops, Panels, and Ignite Talks</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>12:00p</b>
                                <p>Lunch (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>1:30p</b>
                                <p>Early afternoon Workshops Panels and Ignite Talks</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>3:00p</b>
                                <p>Late afternoon Workshops, Panels and Ignite Talks</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>4:30p</b>
                                <p>Poster Sessions</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>6:30p</b>
                                <p>Conference Dinner</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <img
                                    alt="August 6th Icon"
                                    src="/svgs/conference/expect/aug6-icon.svg"
                                />
                                <h3>Saturday</h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <b>8:30a</b>
                                <p>Breakfast (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>9:30a</b>
                                <p>Keynote Presentation</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>11:00a</b>
                                <p>Morning Workshops, Panels and Ignite Talks</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>12:00p</b>
                                <p>Lunch (provided) and Wrap-up Session</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </FlexRow>
        </section>
    </div>
);

render(<Page><ConferenceExpectations /></Page>, document.getElementById('app'));
