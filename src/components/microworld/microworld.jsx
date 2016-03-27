var React = require('react');

require('./microworld.scss');

var Box = require('../../components/box/box.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Modal = require('../../components/modal/modal.jsx');
var NestedCarousel = require('../../components/nestedcarousel/nestedcarousel.jsx');

var Microworld = React.createClass({
    type: 'Microworld',
    propTypes: {
        microworldData: React.PropTypes.node.isRequired
    },
    markVideoOpen: function (key) {
        {/* When a video is clicked, mark it as an open video, so the video Modal will open.
        Key is the number of the video, so distinguish between different videos on the page */}

        var videoOpenArr = this.state.videoOpen;
        videoOpenArr[key] = true;
        this.setState({videoOpen: videoOpenArr});
    },
    markVideoClosed: function (key) {
        {/* When a video's x is clicked, mark it as closed, so the video Modal will disappear.
        Key is the number of the video, so distinguish between different videos on the page */}
        var videoOpenArr = this.state.videoOpen;
        videoOpenArr[key] = false;
        this.setState({videoOpen: videoOpenArr});
    },
    getInitialState: function () {
        return {
            videoOpen: {}
        };
    },
    renderVideos: function () {
        var videos = this.props.microworldData.videos;
        if (!videos || videos.length <= 0) {
            return null;
        }

        return (
            <div className="videos-section section">
                <h1>Get Inspired...</h1>
                <div className="videos-container">
                    <div className="videos">
                        {videos.map(this.renderVideo)}
                    </div>
                </div>
            </div>
        );
    },
    renderVideo: function (video, key) {
        var frameProps = {
            width: 570,
            height: 357,
            padding: 15
        };
        return (
            <div>
                <div className="video">
                    <div className="play-button" onClick={this.markVideoOpen.bind(this, key)}>
                    </div>
                    <img src={video.image} />
                </div>
                <Modal
                    className="video-modal"
                    isOpen={this.state.videoOpen[key]}
                    onRequestClose={this.markVideoClosed.bind(this, key)}
                    style={{content:frameProps}}>
                    <iframe src={video.link} width="560" height="315" frameBorder="0"
                            webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </Modal>
            </div>
        );
    },
    renderEditorWindow: function () {
        var projectId = this.props.microworldData.microworld_project_id;
        
        if (!projectId) {
            return null;
        }
        return (
            <div className="editor section">
                <h1>Start Creating!</h1>
                <a href={'//scratch.mit.edu/projects/'+ projectId +'/#editor'}>
                  <img className="scratch-link" src="/images/scratch-og.png"></img>
                </a>
                <iframe src={'//scratch.mit.edu/projects/embed-editor/' + projectId + '/?isMicroworld=true'}
                        frameBorder="0"> </iframe>
                {this.renderTips()}
            </div>
        );
    },
    renderTips: function () {
        var tips =  this.props.microworldData.tips;
        if (!tips || tips.length <= 0) {
            return null;
        }

        return (
            <div className="box nestedcarousel">
                <div className="box-header">
                </div>
                <div className="box-content">
                    <NestedCarousel items={tips} settings={{slidesToShow:1,slidesToScroll:1}}/>
                </div>
            </div>
            );
    },
    renderStarterProject: function () {
        var starterProjects = this.props.microworldData.starter_projects;
        if (!starterProjects || starterProjects.length <= 0){
            return null;
        }

        return (
            <div className="project-ideas">
                <h1>Check out ideas for more projects</h1>
                <Box
                    title="More Starter Projects"
                    key="starter_projects">
                    <Carousel items={starterProjects} />
                </Box>
            </div>
        );
    },
    renderProjectIdeasBox: function () {
        var communityProjects = this.props.microworldData.community_projects;
        if (!communityProjects || communityProjects.size <= 0) {
            return null;
        }

        var featured = communityProjects.featured_projects;
        var all = communityProjects.newest_projects;

        var rows = [];
        if (featured && featured.length > 0){
            rows.push(
                <Box
                    title="Featured Community Projects"
                    key="community_featured_projects">
                    <Carousel items={featured} />
               </Box>
            );
        }
        if (all && all.length > 0) {
            rows.push(
                <Box
                     title="All Community Projects"
                     key="community_all_projects">
                     <Carousel items={all} />
               </Box>
            );
        }
        if (rows.length <= 0) {
            return null;
        }
        return (
            <div className="project-ideas">
                <h1>Get inspiration from other projects</h1>
                {rows}
            </div>
        );
    },
    renderForum: function () {
        if (!this.props.microworldData.show_forum) {
            return null;
        }

        return (
        <div className="forum">
            <h1>Chat with others!</h1>
            <img src="/images/forum-image.png"/>
        </div>
        );
    },
    renderDesignStudio: function () {
        var designChallenge = this.props.microworldData.design_challenge;
        if (!designChallenge) {
            return null;
        }
        if (designChallenge.studio_id) {
            var studioHref = 'https://scratch.mit.edu//studios/' + designChallenge.studio_id + '/';
        }
        if (designChallenge.project_id) {
            return (
                <div className="side-by-side section">
                    <h1>Join our Design Challenge!</h1>
                    <div className="design-studio">
                        <iframe src={'https://scratch.mit.edu/projects/' + designChallenge.project_id +
                                     '/#fullscreen'} frameBorder="0"> </iframe>
                    </div>
                    <div className="design-studio-projects">
                        <Box title="Examples"
                             key="scratch_design_studio"
                             moreTitle={studioHref ? 'Visit the studio' : null}
                             moreHref={studioHref ? studioHref : null}>
                            {/* The two carousels are used to show two rows of projects, one above the
                                other. This should be probably be changed, to allow better scrolling. */}
                            <Carousel settings={{slidesToShow:2,slidesToScroll:2}}
                                      items={this.props.microworldData.design_challenge.studio1} />
                            <Carousel settings={{slidesToShow:2,slidesToScroll:2}}
                                      items={this.props.microworldData.design_challenge.studio2} />
                        </Box>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="section">
                    <h1>Join our Design Challenge!</h1>
                    <Box
                        title="design Challenge Projects"
                        key="scratch_design_studio"
                        moreTitle={studioHref ? 'Visit the studio' : null}
                        moreHref={studioHref ? studioHref : null}>
                        <Carousel items={this.props.microworldData.design_challenge.studio1.concat(
                            this.props.microworldData.design_challenge.studio2)} />
                   </Box>
                </div>
            );
        }
    },
    render: function () {
        return (
            <div className="inner">
                <div className="top-banner section">
                    <h1>{this.props.microworldData.title}</h1>
                    <p>{this.props.microworldData.description.join(' ')}</p>
                </div>
                {this.renderVideos()}

                <div className="content">
                    {this.renderEditorWindow()}
                    {this.renderStarterProject()}
                    {this.renderDesignStudio()}
                    {this.renderProjectIdeasBox()}
                    {this.renderForum()}
                </div>
            </div>

        );
    }
});

module.exports = Microworld;
