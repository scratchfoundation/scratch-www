const React = require('react');
const render = require('../../../../lib/render.jsx');

const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const Page = require('../../../../components/page/conference/2018/page.jsx');
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
                    <img src="/images/conference/expect/2018/mitch.jpg" />
                    <h4>Mitchel Resnick</h4>
                    <p>
                        Professor of Learning Research
                        <br />
                        Founder, MIT Scratch Team
                        <br />
                        MIT Media Lab
                    </p>
                </div>
                <div className="long">
                    <h2>Welcome to Scratch@MIT 2018!</h2>
                    <p className="intro">
                        The theme of this year’s Scratch conference is “The Next{' '}
                        Generation”. In choosing this phrase, we had two different{' '}
                        meanings in mind.
                    </p>
                    <p className="intro">
                        The theme is motivated, in part, by our work on the next generation{' '}
                        of Scratch. We plan to release this new version, called Scratch 3.0,{' '}
                        later this year. Scratch 3.0 will expand how, what, and where children{' '}
                        can create and learn with Scratch. At the conference, you’ll have lots{' '}
                        of opportunities to experiment and explore with prototype versions of{' '}
                        Scratch 3.0.
                    </p>
                    <p className="intro">
                        But even as we develop the next generation of software, our top{' '}
                        priority is always the next generation of children.
                    </p>
                    <p className="intro">
                        We continue to be amazed and delighted by all of the ways that{' '}
                        children around the world are creating and collaborating with Scratch.{' '}
                        As we see the outpouring of creativity in the Scratch community, we{' '}
                        become even more committed to developing a next generation of Scratch{' '}
                        that is truly worthy of the next generation of children.
                    </p>
                    <p className="intro">
                        At this summer’s Scratch conference, we look forward to hearing{' '}
                        your stories of how children are creating and learning with Scratch,{' '}
                        and how you are supporting them. Let’s work together to expand{' '}
                        opportunities for all children, from all backgrounds, to imagine,{' '}
                        create, and collaborate &mdash; so they can shape the world of tomorrow.
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
                        <h3>The Next Generation</h3>
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
                            Join us for an inside look at the next generation of Scratch &mdash;{' '}
                            and a discussion of how Scratch is opening new opportunities for the next{' '}
                            generation of children around the world.
                        </p>
                    </div>
                    <div className="card">
                        <div className="date">
                            <b>Friday</b>
                        </div>
                        <h3>Creative Is Not A Noun</h3>
                        <img
                            alt="Austin Kleon Photo"
                            src="/images/conference/expect/2018/austin_kleon.png"
                        />
                        <p>
                            <b>Austin Kleon</b>
                        </p>

                        <img
                            alt="Karen Photo"
                            className="moderator"
                            src="/images/conference/expect/2018/karen.jpg"
                        />
                        <p>
                            <b>Karen Brennan (moderator)</b>
                        </p>

                        <p>
                            Writer and artist Austin Kleon (author of the bestsellers Steal Like An Artist{' '}
                            and Show Your Work!) discusses his practice and shares 10 principles for anyone{' '}
                            who wants to do more creative work in a connected world.
                        </p>
                    </div>
                    <div className="card">
                        <div className="date">
                            <b>Saturday</b>
                        </div>
                        <h3>Growing Up With Scratch</h3>
                        <img
                            alt="Isabella, JT, and Jocelyn Photo"
                            src="/images/conference/expect/2018/growing-up-with-scratch-presenters.png"
                        />
                        <p>
                            <b>Isabella Bruyere, JT Galla, &amp; Jocelyn Marencik</b>
                        </p>

                        <img
                            alt="Ricarose Photo"
                            className="moderator"
                            src="/images/conference/expect/2018/ricarose.png"
                        />

                        <p>
                            <b>Ricarose Roque (moderator)</b>
                        </p>

                        <p>
                            What is it like to grow up with Scratch? Three long-time Scratch community{' '}
                            members share how they have used Scratch to express their interests, to make{' '}
                            friends, and to lead initiatives in their communities.
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
                        alt="July 25th Icon"
                        src="/svgs/conference/expect/july25-icon.svg"
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
                                    alt="July 26th Icon"
                                    src="/svgs/conference/expect/july26-icon.svg"
                                />
                                <h3>Thursday</h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <b>8:30a-9:30a</b>
                                <p>Breakfast (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>9:30a-10:30a</b>
                                <p>Keynote Presentation</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>11:00a-12:30p</b>
                                <p>Morning Workshops</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>12:30p-1:30p</b>
                                <p>Lunch (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>2:00p-3:30p</b>
                                <p>Afternoon Workshops</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>4:00p-5:30p</b>
                                <p>Poster Sessions</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <img
                                    alt="July 27th Icon"
                                    src="/svgs/conference/expect/july27-icon.svg"
                                />
                                <h3>Friday</h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <b>8:30a-9:30a</b>
                                <p>Breakfast (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>9:30a-10:30a</b>
                                <p>Keynote Presentation</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>11:00a-12:00p</b>
                                <p>Morning Workshops, Panels, and Ignite Talks</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>12:00p-1:00p</b>
                                <p>Lunch (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>1:30p-2:30p</b>
                                <p>Early Afternoon Workshops, Panels, and Ignite Talks</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>3:00p-4:00p</b>
                                <p>Late Afternoon Workshops, Panels, and Ignite Talks</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>4:30p-6:00p</b>
                                <p>Poster Sessions</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>6:00p-7:30p</b>
                                <p>Conference Dinner (provided)</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <img
                                    alt="July 28th Icon"
                                    src="/svgs/conference/expect/july28-icon.svg"
                                />
                                <h3>Saturday</h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <b>8:30a-9:30a</b>
                                <p>Breakfast (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>9:30a-10:30a</b>
                                <p>Keynote Presentation</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>11:00a-12:00p</b>
                                <p>Morning Workshops, Panels and Ignite Talks</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>12:00p-1:30p</b>
                                <p>Closing Ceremony and Lunch (provided)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>1:30p</b>
                                <p>End of Conference</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </FlexRow>
        </section>
    </div>
);

render(<Page><ConferenceExpectations /></Page>, document.getElementById('app'));
