var React = require('react');
var render = require('../../lib/render.jsx');

require('./hoc.scss');

var Button = require('../../components/forms/button.jsx');
var Box = require('../../components/box/box.jsx');

var Hoc = React.createClass({
    type: 'Hoc',

    getInitialState: function () {
        return {
            bgClass: ''
        };
    },
    onCardEnter: function (bgClass) {
        this.setState({
            bgClass: bgClass
        });
    },
    render: function () {
        return (
            <div>
                <div className={'top-banner ' + this.state.bgClass}>
                    <h1>Get Creative with Coding</h1>
                    <p>
                        With Scratch, you can program your own stories, games, and animations —
                        and share them online.
                    </p>

                    <div className="card-deck">
                        <div className="card">
                            <a href="/projects/editor/?tip_bar=name">
                                <div className="card-info" onMouseEnter={this.onCardEnter.bind(this, 'name-bg')}>
                                    <img src="/images/name-tutorial.jpg" />
                                    <Button>Animate Your Name</Button>
                                </div>
                            </a>
                        </div>

                        <div className="card" onMouseEnter={this.onCardEnter.bind(this, 'wbb-bg')}>
                            <a href="/hide">
                                <div className="card-info">
                                    <img src="/images/hide-seek-tutorial.jpg" />
                                    <Button> Hide-and-Seek Game</Button>
                                </div>
                            </a>
                        </div>

                        <div className="card" onMouseEnter={this.onCardEnter.bind(this, 'dance-bg')}>
                            <a href="/projects/editor/?tip_bar=dance">
                                <div className="card-info">
                                    <img src="/images/dance-tutorial.jpg" />
                                    <Button>Dance, Dance, Dance</Button>
                                </div>
                            </a>
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
                                    <h5>Animate Your Name</h5>
                                    <a href="#">Activity Cards</a>
                                    <a href="#">Facilitator Guide</a>
                                </div>
                            </div>

                            <div className="resource">
                                <img src="/svgs/tips-card.svg" />
                                <div className="resource-info">
                                    <h5>Hide-and-Seek</h5>
                                    <a href="#">Activity Cards</a>
                                    <a href="#">Facilitator Guide</a>
                                </div>
                            </div>
                            
                            <div className="resource">
                                <img src="/svgs/tips-card.svg" />
                                <div className="resource-info">
                                    <h5>Dance, Dance, Dance</h5>
                                    <a href="#">Activity Cards</a>
                                    <a href="#">Facilitator Guide</a>
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

                    <section className="one-up">
                        <h3>Collaborators</h3>
                        <div className="logos">
                            <img src="/images/code-org-logo.png" />
                            <img src="/images/cn-logo.png" />
                            <img src="/images/paa-logo.png" />
                            <img src="/images/pocketcode-logo.png" />
                        </div>
                    </section>
                </div>
            </div>

        );
    }
});

render(<Hoc />, document.getElementById('view'));
