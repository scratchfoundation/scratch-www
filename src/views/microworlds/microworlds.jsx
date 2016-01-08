var classNames = require('classnames');
var React = require('react');
var render = require('../../lib/render.jsx');
var omit = require('lodash.omit');

require('./microworlds.scss');

var Api = require('../../mixins/api.jsx');
var Session = require('../../mixins/session.jsx');
var Box = require('../../components/box/box.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Modal = require('../../components/modal/modal.jsx');
var TipsSlider = require('../../components/tipsslider/tipsslider.jsx');

var Microworld = React.createClass({
    type: 'Microworld',
    mixins: [
        Api,
        Session
    ],
    showVideo: function (keya) {
        
        var videoOpenArr = this.state.videoOpen;
        videoOpenArr[keya] = true;
        this.setState({videoOpen: videoOpenArr});
        console.error("show");
        console.error(this.state.videoOpen);
    },
    closeVideo: function (keya) {
        var videoOpenArr = this.state.videoOpen;
        videoOpenArr[keya] = false;
        this.setState({videoOpen: videoOpenArr});
        console.error("close");
        console.error(this.state.videoOpen);
    },
    getInitialState: function () {
        return {
            videoOpen: {},
            featuredGlobal: {},
            featuredLocal: {},
            microworlds_data: {}
        };
    },
    componentDidMount: function () {
        this.getMicroworldData();
        this.getFeaturedGlobal();
        this.getFeaturedLocal();
    },
    getMicroworldData: function() {
        {/*Why is this not working?*/}
        var data = require("./microworlds_art.json");
        this.setState({microworlds_data: data});
    },
    getFeaturedGlobal: function () {
        this.api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (!err) {
                this.setState({featuredGlobal: body});
            }
        }.bind(this));
    },
    getFeaturedLocal: function () {
        var art_projects = require("./microworlds_projects");
        this.setState({featuredLocal: art_projects});
    },
    renderVideos: function () {
        {/*Change to read from global data*/}
        var data = require("./microworlds_art.json");
        console.error(data.videos);
        
        return (
            <div className="videos-section section">
                <h1>Get Inspired...</h1>
                <div className="videos-container">
                    <div className="videos">
                        {data.videos.map(this.renderVideo)}
                    </div>
                </div>
            </div>
        );
    },
    renderVideo: function (video, key) {
        console.error("video");
        console.error(video);
        var frameProps = {
            width: 570,
            height: 357,
            padding: 15
        };
        var left = 25 * (key+1)
        return (
            <div>
                <div className="video">
                    <div className="play-button" onClick={this.showVideo.bind(this, key)} style={{ left: left +'%' }}>
                    </div>
                    <img src={video.image} />
                </div>
                <Modal
                    className="video-modal"
                    isOpen={this.state.videoOpen[key]}
                    onRequestClose={this.closeVideo.bind(this, key)}
                    style={{content:frameProps}}>
                    <iframe src={video.link} width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </Modal>
                
            </div>
        )
    },
    renderEditorWindow: function() {
        return (
            <div className="editor section">
                <h1>Start Creating!</h1>
                {/*<iframe src="//scratch.mit.edu/projects/embed-editor/86999051/?isMicroworld=true"
                        frameborder="0"> </iframe>
                */}
                <a href="//scratch.mit.edu/projects/88148127/#editor">
                  <img src="/images/scratch-og.png" style={{width:"6%", position: "absolute", left: "75%"}}></img>
                </a>
                <iframe src="//scratch.mit.edu/projects/embed-editor/88148127/?isMicroworld=true"
                        frameborder="0"> </iframe>
                {this.renderTips()}
                
            </div>
        )
    },
    renderTips: function() {
        var tips =  require("./microworlds_tips.json");
        return (
            <div className="box tipsslider">
                <div className="box-header">
                    <h4>Start Painting</h4>
                </div>
                <div className="box-content">
                    <TipsSlider items={tips} settings={{slidesToShow:1,slidesToScroll:1}}/>
                </div>
            </div>
            )
    },
    renderStarterProject: function() {
        return (
            <div className="project-ideas">
                <Box
                    title="More Starter Projects"
                    key="design_studio">
                    <Carousel items={this.state.featuredLocal.scratch_starter_projects} />
                </Box>
            </div>
        )
    },
    renderProjectIdeasBox: function() {
        var rows = [
            <Box
                title="Featured Community Projects"
                key="community_featured_projects">
                <Carousel items={this.state.featuredLocal.community_featured_projects} />
            </Box>,
            <Box
                title="All Community Projects"
                key="community_all_projects">
                <Carousel items={this.state.featuredLocal.community_newest_projects} />
            </Box>,
        ];
        return (
            <div className="project-ideas">
                {rows}
            </div>
        )
    },
    renderForum: function() {
        return (
        <div className="forum">
            <h1>Chat with other art lovers!</h1>
            <img src="/images/forum-image.png"/>
        </div>
        )
    },
    renderDesignStudio: function() {
        return (
            <div className="side-by-side section">
                <h1>Join our Design Challenge!</h1>
                <div className="design-studio">
                    <iframe src="https://scratch.mit.edu/projects/89144801/#fullscreen" frameborder="0"> </iframe>
                </div>
                <div className="design-studio-projects">
                    <Box
                        title="Examples"
                        key="scratch_desgin_studio"
                        moreTitle="Visit the studio"
                        moreHref={'/studios/' + '1728540' + '/'}>
                    <Carousel settings={{slidesToShow:2,slidesToScroll:2}} items={this.state.featuredLocal.scratch_design_studio1} />
                    <Carousel settings={{slidesToShow:2,slidesToScroll:2}} items={this.state.featuredLocal.scratch_design_studio2} />
                        </Box>
                    </div>
                </div>
        )
    },
    render: function () {
        console.error("beginning");
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
                    <h1>Make Some Art</h1>
                    <p>Watch videos about how to create with technology.<br></br>
                       Then, create your own art project.<br></br>
                       Check out projects by others for inspiration,<br></br>
                       communicate in the forum and join the challenges!
                    </p>
                </div>

                {this.renderVideos(frameProps)}
                console.error("here!!!");

                <div className="content">
                    {this.renderEditorWindow()}
                    <h1>Check out ideas for more projects</h1>
                    {this.renderStarterProject()}
                    {this.renderDesignStudio()}
                    <h1>Get inspiration from other projects</h1>
                    {this.renderProjectIdeasBox()}
                    {this.renderForum()}
                </div>
            </div>

        );
    }
});

render(<Microworld />, document.getElementById('view'));
Modal.setAppElement(document.getElementById('view'));
