var React = require('react');
var render = require('../../lib/render.jsx');
var Box = require('../../components/box/box.jsx');

require('./educators.scss');

var Educators = React.createClass({
    type: 'Educators',
    render: function () {
        return (
            <div className="inner">
                <h1>For Educators</h1>
                <div className="masthead">
                    <div className="intro">
                        <p>Scratch is designed with learning and education in mind.
                         A wide variety of educators have been supporting Scratch creators since 2007, in both formal
                         and informal learning environments – K-12 classroom teachers, educational and computer science
                        researchers, librarians, museum educators, and parents.</p>
                         <p>Want to learn more about learning with Scratch? Check out the ScratchEd online community.</p>
                    </div>
                    <div className="video">
                        <iframe src="https://player.vimeo.com/video/33349120?title=0&byline=0&portrait=0"
                        width="445"
                        height="250" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                </div>
                <div className="information">
                    <div className="leftcolumn">
                        <h2>What is ScratchEd?</h2>
                        <p>Launched in July 2009, ScratchEd is an online community where Scratch educators
                         share stories, exchange resources, ask questions, and find people.
                        </p>
                        <p>Since its launch, more than 7500 educators from all around the world have joined the
                         community, sharing hundreds of resources and engaging in thousands of discussions.</p>
                        <h2>How can I learn more about what educators are doing with Scratch – and
                         how I might use it?</h2>
                        <p>Not sure what might be possible with Scratch?</p>
                        <p>Read a story about how educators have been including Scratch activities
                         in a wide range of learning environments.
                        </p>
                        <p>Or explore resources across ages, disciplines, and settings. Watch webinars and review
                         documents like the Scratch curriculum guide.
                        </p>
                        <p>In addition to exploring the ScratchEd online community and its resources, you can engage
                         with the ScratchEd Team and other Scratch educators via Twitter, Facebook, Edmodo,
                         weekly roundups, and our quarterly newsletter.</p>
                    </div>
                    <div className="rightcolumn">
                        <Box title="Connect with ScratchEd">
                            <div className="box-contents">
                                <div className="what-is-scratch">
                                    <p><a href="http://scratched.gse.harvard.edu/">Online Community</a></p>
                                    <p><a href="https://twitter.com/scratchedteam">Twitter</a></p>
                                    <p><a href="http://www.facebook.com/ScratchEdTeam">Facebook</a></p>
                                    <p><a href="http://www.edmodo.com/publisher/scratcheducation">Edmodo</a></p>
                                    <p><a href="http://scratched.gse.harvard.edu/discussions/scratched-weekly-roundup">
                                    Weekly Roundups</a></p>
                                    <p><a href="http://scratched.gse.harvard.edu/events">Quarterly Newsletter</a></p>
                                    <p><a href="http://scratched.gse.harvard.edu/contact">Email</a></p>
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        );
    }
});

render(<Educators />, document.getElementById('view'));
