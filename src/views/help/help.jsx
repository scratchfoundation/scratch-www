
var React = require('react');

require('./help.scss');
var Box = require('../../components/box/box.jsx');

var View = React.createClass({
    render: function () {
        return (
            <div className="inner">
            <h1> Scratch Help </h1>
                <div className="leftcolumn">
                    <Box title="Get Started with Scratch">
                        <div className="box-contents">
                            <div className="get-started">
                                <img src="/images/help/step-by-step-intro.png"></img>
                                <p><a href="projects/84867414/#editor">Try out the step-by-step intro</a></p>
                            </div>
                            <div className="get-started">
                                <img src="/images/help/starter-projects.png"></img>
                                <p><a href="/starter_projects">Explore These Starter Projects</a></p>
                            </div>
                            <div className="get-started">
                                <iframe src="//player.vimeo.com/video/80961102?title=0&amp;
                                byline=0&amp;portrait=0;hd_off=1&amp;"
                                width="170" height="128" frameborder="0" webkitallowfullscreen=""
                                mozallowfullscreen=""
                                allowfullscreen=""></iframe>
                                <p><a href="https://vimeo.com/80961102">Watch the Getting Started video</a></p>
                            </div>
                        </div>
                    </Box>
                    <Box title="Scratch Guides">
                        <div className="box-contents">
                            <p>Here are some guides to help you learn Scratch:</p>
                            <div className="guides">
                                <div className="scratch-guide">
                                    <img src="/images/help/guide.png"></img>
                                    <h4>
                                        <a href="https://cdn.scratch.mit.edu/scratchr2/static/__
                                    61560e08176805f6f84b8d1dd737d59b__/
                                    pdfs/help/Getting-Started-Guide-Scratch2.pdf">
                                    Getting Started Guide</a>
                                </h4>
                                    <p>This step-by-step guide (PDF) provides an easy introduction to Scratch.</p>
                                </div>
                                 <div className="scratch-cards">
                                    <img src="/images/help/scratch-cards.png"></img>
                                    <h4>
                                        <a href="/help/cards">
                                    Scratch Cards</a>
                                </h4>
                                    <p>Each of these cards shows something you can do in Scratch.</p>
                                </div>
                                <div className="video-tutorials">
                                    <img src="/images/help/video-tutorials.png"></img>
                                    <h4>
                                        <a href="/help/videos">
                                    Video Tutorials</a>
                                </h4>
                                    <p>These videos include tips on using the paint editor, and
                                    introduce how to program games and animations in Scratch</p>
                                </div>
                            </div>
                        </div>

                    </Box>
                    <Box title="Explore the Scratch Community">
                        <div className="box-contents">
                            <p><a href="/explore">Explore</a> projects and studios Scratchers are making</p>
                            <p>Search for projects about:
                                <form class="search" action="/search/google_results/" method="get">
                                    <input type="text" name="q" />
                                </form>
                            </p>
                            <p><a href="/discuss/6">Introduce</a> yourself in the Scratch forums</p>
                            <p> Click
                                <img src="/images/help/follow-button-small.png" />
                                 on any profile to receive updates</p>
                        </div>
                    </Box>
                </div>
                <div className="rightcolumn">
                    <Box title="What is Scratch?">
                        <div className="box-contents">
                            <div className="cat1"><img src="/images/cat1.png"></img></div>
                            <div className="what-is-scratch">
                            <a href="/about">About Scratch</a>
                            <p> For <a href="/parents">Parents</a></p>
                            <p> For <a href="/educators">Educators</a></p>
                            </div>
                        </div>
                    </Box>
                    <Box title="Questions?">
                        <div className="box-contents">
                            <p> Browse for answers on <a href="/help/faq">Frequently Asked Questions</a></p>
                            <p> Or visit the <a href="/discuss">discussion forums</a>:</p>
                            <p><a href="/discuss/4">- Questions About Scratch</a></p>
                            <p><a href="/discuss/7">- Help with Scripts</a></p>
                        </div>
                    </Box>
                    <Box title="Resources">
                        <div className="box-contents">
                            <h4>
                                <a href="http://scratched.gse.harvard.edu/">Scratch Ed</a>
                            </h4>
                            <p> An online community for educators using Scratch, with stories, discussions, and
                            resources, such as the Scratch curriculum guide.</p>
                            <h4>
                                <a href="http://wiki.scratch.mit.edu/">Scratch Wiki</a>
                            </h4>
                            <p> The Scratch Wiki contains a wide variety of articles by Scratchers for Scratchers,
                            including advanced topics and tutorials.</p>
                            <h4>
                                <a href="/scratch2download">Scratch 2.0 Offline Editor</a>
                            </h4>
                            <p> Download the Scratch 2 offline editor.</p>
                            <h4>
                                <a href="/scratch_1.4">Scratch 1.4 Download</a>
                            </h4>
                            <p> Links and information on the previous version of Scratch.</p>
                            <h4>
                                <a href="http://wiki.scratch.mit.edu/wiki/How_to_connect_to_the_physical_world">
                            Scratch and The Physical World</a>
                        </h4>
                            <p> Connect your Scratch projects to the physical world with
                            <a href="http://www.makeymakey.com/"> MaKey MaKey</a>,
                            <a href="https://education.lego.com/en-us/lesi/elementary/lego-education-wedo"> LEGO WeDo
                            </a>, or
                            <a href="https://www.sparkfun.com/products/11888"> PicoBoard</a>.</p>
                            <h4>
                                <a href="http://wiki.scratch.mit.edu/wiki/Scratch_Media">Scratch Logo</a>
                            </h4>
                            <p>Access the Scratch logo and other media files.</p>
                        </div>
                    </Box>
                </div>
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
