var React = require('react');
var Renderer = require('../../lib/renderer.jsx');

require('./hoc.scss');

var Button = require('../../components/forms/button.jsx');
var Box = require('../../components/box/box.jsx');

var Hoc = React.createClass({
    type: 'Hoc',
    render: function () {
        return (
            <div>
                <div className="top-banner">
                    <h1>Get Creative with Coding</h1>

                    <div className="card-deck">
                        <div className="card">
                            <div className="card-info">
                                <img src="/images/name-tutorial.png" />
                                <a href="/projects/editor/?tip_bar=name"><Button>Animate Your Name</Button></a>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-info">
                                <img src="/images/hide-seek-tutorial.png" />
                                <a href="#"><Button>Hide-and-Seek Game</Button></a>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-info">
                                <img src="/images/dance-tutorial.png" />
                                <a href="/projects/editor/?tip_bar=dance"><Button>Dance, Dance, Dance</Button></a>
                            </div>
                        </div>
                    </div>

                    <p>
                        With Scratch, you can program your own stories, games, and animations —
                        and share them online.
                    </p>

                    <ul className="sub-nav">
                        <li className="info">Find out more:</li>
                        <a href="/about"><li className="link">About Scratch</li></a>
                        <a href="/parents"><li className="link">For Parents</li></a>
                        <a href="/educators"><li className="link">For Educators</li></a>
                    </ul>
                </div>

                <div className="inner">
                    <Box>
                        <section className="one-up">
                            <div className="column">
                                <h3>Activity Cards and Guides</h3>
                                <p>
                                    Want tips and ideas for your Hour-of-Code activities?&nbsp;
                                    View and print activity cards and facilitator guides.
                                    <br />
                                    For more resources, see <a href="/help">Scratch Help</a>.
                                </p>
                            </div>

                            <div className="resource">
                                <img src="/svgs/tips-card.svg" />
                                <div className="resource-info">
                                    <a href="#">Animate Your Name</a>
                                    <div className="file-size">13 mb</div>
                                </div>
                            </div>

                            <div className="resource">
                                <img src="/svgs/tips-card.svg" />
                                <div className="resource-info">
                                    <a href="#">Hide-and-Seek</a>
                                    <div className="file-size">5 mb</div>
                                </div>
                            </div>
                            
                            <div className="resource">
                                <img src="/svgs/tips-card.svg" />
                                <div className="resource-info">
                                    <a href="#">Dance, Dance, Dance</a>
                                    <div className="file-size">11 mb</div>
                                </div>
                            </div>
                        </section>

                        <section className="two-up">
                            <div className="column">
                                <h3>Tips Window</h3>
                                <p>
                                    Need help getting started? Looking for ideas?&nbsp;
                                    You can find tutorials and helpful hints in the
                                    <br />
                                    <a href="/projects/editor/?tip_bar=home">Tips Window</a>
                                </p>
                            </div>
                            <div className="column">
                                <img src="/images/tips-test-animation.gif" />
                            </div>
                        </section>
                    </Box>
                </div>
            </div>

        );
    }
});

Renderer.render(<Hoc />, document.getElementById('view'));
