var classNames = require('classnames');
var React = require('react');
var render = require('../../lib/render.jsx');
var omit = require('lodash.omit');

require('./microworlds_art.scss');

var Api = require('../../mixins/api.jsx');
var Session = require('../../mixins/session.jsx');
var Box = require('../../components/box/box.jsx');

require('./microworlds_art.scss');
var Carousel = require('../../components/carousel/carousel.jsx');
var Modal = require('../../components/modal/modal.jsx');

var Microworld = React.createClass({
    type: 'Microworld',
    mixins: [
        Api,
        Session
    ],
    showVideo1: function () {
        this.setState({videoOpen1: true});
    },
    closeVideo1: function () {
        this.setState({videoOpen1: false});
    },
    showVideo2: function () {
        this.setState({videoOpen2: true});
    },
    closeVideo2: function () {
        this.setState({videoOpen2: false});
    },
    showVideo3: function () {
        this.setState({videoOpen3: true});
    },
    closeVideo3: function () {
        this.setState({videoOpen3: false});
    },
    getInitialState: function () {
        return {
            videoOpen1: false,
            videoOpen2: false,
            videoOpen3: false,
            featuredGlobal: {},
        };
    },
    componentDidMount: function () {
        this.getFeaturedGlobal();
    },
    getFeaturedGlobal: function () {
        this.api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredGlobal: body});
        }.bind(this));
    },
    renderVideos: function (frameProps) {
        return (
            <div className="videos-section section">
                <h1>Get Inspired...</h1>
                <div className="videos-container">
                    <div className="videos">
                        <div className="video">
                            <div className="play-button" onClick={this.showVideo1} style={{ left: '25%' }}></div>
                            <img src="http://farm8.staticflickr.com/7245/7120445933_7de87c2bd9_z.jpg" />
                        </div>
                        <Modal
                            className="video-modal"
                            isOpen={this.state.videoOpen1}
                            onRequestClose={this.closeVideo1}
                            style={{content:frameProps}}>
                            <iframe src="https://player.vimeo.com/video/40904471" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </Modal>
                        <div className="video">
                            <div className="play-button" onClick={this.showVideo2} style={{ left: '47%' }}></div>
                            <img src="http://blogs.adobe.com/conversations/files/2015/04/project-para2-1024x572.jpg" />
                        </div>
                        <Modal
                            className="video-modal"
                            isOpen={this.state.videoOpen2}
                            onRequestClose={this.closeVideo2}
                            style={{content:frameProps}}>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/Tdvj8XMrqXc?autoplay=1" frameborder="0" allowfullscreen></iframe>
                        </Modal>
                        <div className="video">
                            <div className="play-button" onClick={this.showVideo3} style={{ left: '70%' }}></div>
                            <img src="http://iluminate.com/wp-content/uploads/2015/07/iluminate-news-residency-at-resorts-world-genting-malaysia-1200x798.jpg" />
                        </div>
                        <Modal
                            className="video-modal"
                            isOpen={this.state.videoOpen3}
                            onRequestClose={this.closeVideo3}
                            style={{content:frameProps}}>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/Xg1dUhVI9i0?autoplay=1" frameborder="0" allowfullscreen></iframe>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    },
    renderEditorWindow: function() {
        return (
            <div className="editor section">
                <h1>Start Creating!</h1>
                {/*<iframe src="//scratch.mit.edu/projects/embed-editor/86999051/?isMicroworld=true"
                        frameborder="0"> </iframe>*/}
                <img src="/images/scratch-og.png" href="//scratch.mit.edu/projects/88148127/#editor" style={{width:"10%"}}></img>
                <iframe src="//scratch.mit.edu/projects/embed-editor/88148127/?isMicroworld=true"
                        frameborder="0"> </iframe>
                {this.renderTips()}
            </div>
        )
    },
    renderTips: function() {
        return (
        <div className="pathways">
            {/*<div className="tips">
            <div className="tips-slider flexslider">
              <ul className =" slides">
                <li>
                    <div className="tip-slide">
                        <h3>Start to Dance</h3>
                        <div className="tip-step">
                            <img src = "images/pathways/dancer-sprite.png"/>
                            <h5> First, select a sprite </h5>
                        </div>

                        <div className="tip-step">
                            <img src = "images/pathways/switch-wait.gif" />
                            <h5> Then, try this script</h5>
                        </div>

                        <div className="tip-step">
                            <img src = "images/pathways/green-flag.gif" />
                            <h5> Start it! </h5>
                        </div>

                    </div>
                </li>
                <li>
                <div className="tip-slide">
                    <h3>Repeat the Dance</h3>
                <div className="tip-step">
                    <img src = "images/pathways/add-wait.gif" />
                <h5>Add another "wait"</h5>
                </div>
                <div className="tip-step">
                    <img src = "images/pathways/add-repeat.gif" />
                <h5>Drag this block over</h5>
                </div>

                <div className="tip-step">
                    <img src = "images/pathways/green-flag.gif" />
                <h5> Start it </h5>
                </div>
                </div>
                </li>
                <li>
                <div className="tip-slide">
                    <h3>Play Music</h3>
                <div className="tip-step">

                    <img src = "images/pathways/add-play-sound.gif" />
                <h5> Add music that repeats </h5>
                </div>

                <div className="tip-step">
                    <img src = "images/pathways/green-flag.gif"/>
                <h5> Start it</h5>
                </div>
                </div>
                </li>
                <li>
                <div className="tip-slide">
                    <h3>Shadow Dance</h3>
                <div className="tip-step">

                    <img src = "images/pathways/shadow-dance.gif" />
                <h5> Add this block </h5>
                </div>

                <div className="tip-step">
                    <img src = "images/pathways/green-flag.gif" />
                <h5> Start it </h5>
                </div>

                <div className="tip-step">
                    <img src = "images/pathways/stop.gif" />
                <h5> Click the stop sign to reset </h5>
                </div>
                </div>
                </li>
                <li>
                <div className="tip-slide">
                    <h3>More things to try</h3>

                <div className="tip-step">
                    <img src = "images/pathways/change-dance-moves.gif" />
                    <h5> Try different dance moves</h5>
                    </div>
                    <div className="tip-step">
                    <img src = "images/pathways/long-dance-script.png" />
                    <h5> Add more moves </h5>
                    </div>

                    <div className="tip-step">
                    <img src = "images/pathways/change-dance-timing.png" />
                    <h5> Change the timing </h5>
                    </div>


                    </div>
                    </li>
              </ul>
            </div>
          </div>*/}
        </div>

            );
    },
    renderProjectIdeasBox: function() {
        var rows = [
            <Box
                title="More Starter Projects"
                key="design_studio">
                <Carousel items={this.state.featuredGlobal.scratch_design_studio} />
            </Box>,
            <Box
                title="Featured Community Projects"
                key="community_featured_projects">
                <Carousel items={this.state.featuredGlobal.community_featured_projects} />
            </Box>,
            <Box
                title="All Community Projects"
                key="community_all_projects">
                <Carousel items={this.state.featuredGlobal.community_featured_studios} />
            </Box>,
        ];
        console.log(this.state.featuredGlobal);

        return (
            <div className="project-ideas">
                {rows}
            </div>
        )
    },
    renderForum: function() {
        return (
        <div className="forum">
            <h1>Forum</h1>
            <img src="/images/forum-image.png"/>
        </div>
        )
    },
    renderDesignStudio: function() {
        return (
        <div className="design-studio">
            <img src="/images/design-studio-image.png"/>
        </div>
        )
    },
    render: function () {
        var classes = classNames(
            'top-banner'
        );
        var frameProps = {
            width: 570,
            height: 357,
            padding: 15
        };

        return (
            <div>
                <div className="top-banner section">
                    <h1>Art and Creating</h1>
                    <p>Watch a video about how to create with technology.<br></br>
                       Then, create your own art project.<br></br>
                       Check out projects by others for inspiration,<br></br>
                       communicate in the forum and join the challenges!
                    </p>
                </div>

                {this.renderVideos(frameProps)}

                <div className="content">
                    {this.renderEditorWindow()}

                    {this.renderProjectIdeasBox()}
                    <div className="side-by-side section">
                        {this.renderForum()}
                        {this.renderDesignStudio()}
                    </div>
                </div>
            </div>

        );
    }
});

render(<Microworld />, document.getElementById('view'));
Modal.setAppElement(document.getElementById('view'));
