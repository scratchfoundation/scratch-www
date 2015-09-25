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
                            <img src="https://www.dropbox.com/s/v8dvhd4i6soutit/temp-card-img.png?dl=1"></img>
                            <Button>Create a Hide & Seek Game</Button>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-info">
                            <img src="https://www.dropbox.com/s/v8dvhd4i6soutit/temp-card-img.png?dl=1"></img>
                            <Button>Compose a Dance Sequence</Button>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-info">
                            <img src="https://www.dropbox.com/s/v8dvhd4i6soutit/temp-card-img.png?dl=1"></img>
                            <Button>Animate Your Name</Button>
                        </div>
                    </div>
                </div>

                <ul className="sub-nav">
                    <li className="info">Find out more:</li>
                    <a href="#"><li className="link">About Scratch</li></a>
                    <a href="#"><li className="link">For Parents</li></a>
                    <a href="#"><li className="link">For Educators</li></a>
                </ul>
                </div>

                <div className="inner">
                    <Box>
                        <section className="one-up">
                            <div className="column">
                                <h3>Related Resources</h3>
                                <p>Below are some resources to help explore Scratch by yourself or to assist groups in workshops and classrooms <a href="#">Find out more</a></p>
                            </div>
                        </section>

                        <section className="two-up">
                            <div className="column">
                                <h3>Tips Window</h3>
                                <p>New to Scratch or haven’t heard of the Tips Window? Check out interactive tutorials, handy block information, and other helpful hints all in the new 2015 <a href="#">Tips Window</a></p>
                            </div>
                            <div className="column">
                                <img src="https://www.dropbox.com/s/l1n1ba7aof3qqx4/tips-test-animation.gif?dl=1"></img>
                            </div>
                        </section>

                        <section className="one-up">
                            <div className="column">
                                <h3>Still Want More?</h3>
                                <p><strong>Awesome!</strong> Here are some addtional tutorials from the Tips Window. <a href="#">See all tips</a></p>
                            </div>
                        </section>
                    </Box>
                </div>
            </div>

        );
    }
});

React.render(<View />, document.getElementById('view'));
