var React = require('react');
var render = require('../../../lib/render.jsx');

var Page = require('../../../components/page/www/page.jsx');
var FlexRow = require('../../../components/flex-row/flex-row.jsx');
var SubNavigation = require('../../../components/subnavigation/subnavigation.jsx');
var TitleBanner = require('../../../components/title-banner/title-banner.jsx');
var Button = require('../../../components/forms/button.jsx');

require('./landing.scss');

var Landing = React.createClass({
    type: 'Landing',
    render: function () {
        return (
            <div className="educators">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1>Scratch for Educators</h1>
                        <p className="intro">
                            Your students can use Scratch to code their own{' '}
                            interactive stories, animations, and games.{' '}
                            In the process, they learn to think creatively,{' '}
                            reason systematically, and work{' '}
                            collaboratively — essential skills for everyone in today’s society.
                        </p>
                    </div>
                    <div className="band">
                        <SubNavigation className="inner">
                            <a href="#in-practice">
                                <li>
                                    In Practice
                                </li>
                            </a>
                            <a href="#resources">
                                <li>
                                    Resources
                                </li>
                            </a>
                            <a href="#teacher-accounts">
                                <li>
                                    Teacher Accounts
                                </li>
                            </a>
                        </SubNavigation>
                    </div>
                </TitleBanner>

                <div className="inner">
                    <section id="in-practice">
                        <span className="nav-spacer"></span>
                        <h2>Who Uses Scratch?</h2>
                        <p>Educators are using Scratch in a wide variety of: </p>
                        <FlexRow className="general-usage">
                            <p><b>Settings:</b> schools, museums, libraries, community centers</p>
                            <p><b>Grade Levels:</b> elementary, middle, and high school (and some colleges too!)</p>
                            <p><b>Subject Areas:</b> language arts, science, social studies,{' '}
                                math, computer science, foreign languages, and the arts</p>
                        </FlexRow>
                    </section>
                    <section id="resources">
                        <span className="nav-spacer"></span>
                        <h2>Educator Resources</h2>
                        <FlexRow className="educator-community">
                            <div>
                                <h3>A Community for Educators</h3>
                                <p>
                                    <a href="http://scratched.gse.harvard.edu/">ScratchEd</a> is an{' '}
                                    online community where Scratch educators{' '}
                                    <a href="http://scratched.gse.harvard.edu/stories">share stories</a>,{' '}
                                    exchange resources, ask questions, and{' '}
                                    find people. ScratchEd is developed and supported by{' '}
                                    the Harvard Graduate School of Education.
                                </p>
                            </div>
                            <div>
                                <h3>In-Person Gatherings</h3>
                                <p>
                                    <a href="http://www.meetup.com/pro/scratched/">Scratch Educator Meetups</a>{' '}
                                    are gatherings of Scratch Educators who want to learn with and{' '}
                                    from each other, sharing their ideas and strategies{' '}
                                    for supporting computational creativity in all its forms.
                                </p>
                            </div>
                        </FlexRow>
                        <h3 id="guides-header">Guides & Tutorials</h3>
                        <FlexRow className="guides-and-tutorials">
                            <div>
                                <img src="/svgs/teachers/resources.svg" alt="resources icon" />
                                <p>
                                    On the <a href="https://scratch.mit.edu/help/">Help Page</a>,{' '}
                                    you can find workshop guides, Scratch Cards, videos, and other resources.
                                </p>
                            </div>
                            <div>
                                <img src="/svgs/teachers/tips-window.svg" alt="tips window icon" />
                                <p>
                                    The{' '}
                                    <a href="https://scratch.mit.edu/projects/editor/?tip_bar=home">Tips Window</a>{' '}
                                    features step-by-step tutorials for getting started in Scratch.
                                </p>
                            </div>
                            <div>
                                <img src="/svgs/teachers/creative-computing.svg" alt="creative computing icon" />
                                <p className="intro">
                                    The <a href="http://scratched.gse.harvard.edu/guide/">Creative Computing{' '}
                                    Curriculum <br />Guide</a> provides plans, activities, and{' '}
                                    strategies for introducing creative computing.
                                </p>
                            </div>
                        </FlexRow>
                    </section>
                </div>
                <div id="teacher-accounts">
                    <div className="inner">
                        <div id="left">
                            <h2>Teacher Accounts in Scratch</h2>
                            <p>
                                As an educator, you can request a Scratch Teacher Account,{' '}
                                which makes it easier to create accounts for{' '}
                                groups of students and to manage your students’{' '}
                                projects and comments. To learn more, see the{' '}
                                Teacher Account FAQ page.
                            </p>
                            <Button>Request Account</Button>
                        </div>
                        <img src="/images/teachers/teacher-account.png" alt="teacher account" />
                    </div>
                </div>
            </div>
        );
    }
});

render(<Page><Landing /></Page>, document.getElementById('app'));
