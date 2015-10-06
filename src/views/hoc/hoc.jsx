var React = require('react');

require('./hoc.scss');

var Button = require('../../components/forms/button.jsx');
var Box = require('../../components/box/box.jsx');

var View = React.createClass({
    render: function () {
        return (
            <div>
                <div className="top-banner">
                <h1>Create Projects to Share!</h1>
                <p>With Scratch, you can program your own stories, games, and animations — and share them online.</p>

                <div className="card-deck">
                    <div className="card">
                        <div className="card-info">
                            <img src="/images/hide-seek-tutorial.png" />
                            <a href="#"><Button>Create a Hide & Seek Game</Button></a>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-info">
                            <img src="/images/dance-tutorial.png" />
                            <a href="/projects/editor/?tip_bar=dance"><Button>Compose a Dance Sequence</Button></a>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-info">
                            <img src="/images/name-tutorial.png" />
                            <a href="/projects/editor/?tip_bar=name"><Button>Animate Your Name</Button></a>
                        </div>
                    </div>
                </div>

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
                                <h3>Related Resources</h3>
                                <p>Below are some resources to help explore Scratch by yourself or to assist groups in
                                workshops and classrooms <a href="/help">Find out more</a></p>
                            </div>

                            <div className="resource">
                                    <img src="/svgs/tips-card.svg" />
                                    <div className="resource-info">
                                        <a href="#">Hide & Seek Tip Cards</a>
                                        <div className="file-size">13mbs</div>
                                    </div>
                            </div>
                            <div className="resource">
                                    <img src="/svgs/tips-card.svg" />
                                    <div className="resource-info">
                                        <a href="#">Dance Tip Cards</a>
                                        <div className="file-size">5mbs</div>
                                    </div>
                            </div>
                            <div className="resource">
                                    <img src="/svgs/tips-card.svg" />
                                    <div className="resource-info">
                                        <a href="#">Name Tip Cards</a>
                                        <div className="file-size">11mbs</div>
                                    </div>
                            </div>
                        </section>

                        <section className="two-up">
                            <div className="column">
                                <h3>Tips Window</h3>
                                <p>New to Scratch or haven’t heard of the Tips Window? Check out interactive tutorials,
                                handy block information, and other helpful hints all in the new
                                2015 <a href="/projects/editor/?tip_bar=home">Tips Window</a></p>
                            </div>
                            <div className="column">
                                <img src="/images/tips-test-animation.gif" />
                            </div>
                        </section>

                        <section className="one-up">
                            <div className="column">
                                <h3>Still Want More?</h3>
                                <p><strong>Awesome!</strong> Here are some addtional tutorials
                                from the Tips Window. <a href="/projects/editor/?tip_bar=home">See all tips</a></p>
                            </div>
                        </section>
                    </Box>
                </div>
            </div>

        );
    }
});

React.render(<View />, document.getElementById('view'));
