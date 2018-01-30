const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const Box = require('../box/box.jsx');
const LegacyCarousel = require('../carousel/legacy-carousel.jsx');
const IframeModal = require('../modal/iframe/modal.jsx');
const NestedCarousel = require('../nestedcarousel/nestedcarousel.jsx');

require('./microworld.scss');

class Microworld extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'markVideoOpen',
            'markVideoClosed',
            'renderVideos',
            'renderVideo',
            'renderEditorWindow',
            'renderTips',
            'renderStarterProject',
            'renderProjectIdeasBox',
            'renderForum',
            'renderDesignStudio'
        ]);
        this.state = {
            videoOpen: {}
        };
    }
    markVideoOpen (key) {
        /* 
            When a video is clicked, mark it as an open video, so the video Modal will open.
            Key is the number of the video, so distinguish between different videos on the page
        */
        const videoOpenArr = this.state.videoOpen;
        videoOpenArr[key] = true;
        this.setState({videoOpen: videoOpenArr});
    }
    markVideoClosed (key) {
        /*
            When a video's x is clicked, mark it as closed, so the video Modal will disappear.
            Key is the number of the video, so distinguish between different videos on the page
        */
        const videoOpenArr = this.state.videoOpen;
        videoOpenArr[key] = false;
        this.setState({videoOpen: videoOpenArr});
    }
    renderVideos () {
        const videos = this.props.microworldData.videos;
        if (!videos || videos.length <= 0) {
            return null;
        }

        return (
            <div className="videos-section section">
                <h1 className="sectionheader">Get Inspired...</h1>
                <div className="videos-container">
                    <div className="videos">
                        {videos.map(this.renderVideo)}
                    </div>
                </div>
            </div>
        );
    }
    renderVideo (video, key) {
        return (
            <div>
                <div className="video">
                    <div
                        className="play-button"
                        onClick={() => { // eslint-disable-line react/jsx-no-bind
                            this.markVideoOpen(key);
                        }}
                    />
                    <img src={video.image} />
                </div>
                <IframeModal
                    className="mod-microworld-video"
                    isOpen={this.state.videoOpen[key]}
                    src={video.link}
                    onRequestClose={() => { // eslint-disable-line react/jsx-no-bind
                        this.markVideoClosed(key);
                    }}
                />
            </div>
        );
    }
    renderEditorWindow () {
        const projectId = this.props.microworldData.microworld_project_id;
        
        if (!projectId) {
            return null;
        }
        return (
            <div className="editor section">
                <h1 className="sectionheader">Start Creating!</h1>
                <iframe
                    frameBorder="0"
                    src={`//scratch.mit.edu/projects/embed-editor/${projectId}/?isMicroworld=true`}
                />
                {this.renderTips()}
            </div>
        );
    }
    renderTips () {
        const tips = this.props.microworldData.tips;
        if (!tips || tips.length <= 0) {
            return null;
        }

        return (
            <div className="box nestedcarousel">
                <div className="box-header" />
                <div className="box-content">
                    <NestedCarousel
                        items={tips}
                        settings={{
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }}
                    />
                </div>
            </div>
        );
    }
    renderStarterProject () {
        const starterProjects = this.props.microworldData.starter_projects;
        if (!starterProjects || starterProjects.length <= 0){
            return null;
        }

        return (
            <div className="project-ideas">
                <h1 className="sectionheader">Check out ideas for more projects</h1>
                <Box
                    key="starter_projects"
                    title="More Starter Projects"
                >
                    <LegacyCarousel items={starterProjects} />
                </Box>
            </div>
        );
    }
    renderProjectIdeasBox () {
        const communityProjects = this.props.microworldData.community_projects;
        if (!communityProjects || communityProjects.size <= 0) {
            return null;
        }

        const featured = communityProjects.featured_projects;
        const all = communityProjects.newest_projects;

        const rows = [];
        if (featured && featured.length > 0){
            rows.push(
                <Box
                    key="community_featured_projects"
                    title="Featured Community Projects"
                >
                    <LegacyCarousel items={featured} />
                </Box>
            );
        }
        if (all && all.length > 0) {
            rows.push(
                <Box
                    key="community_all_projects"
                    title="All Community Projects"
                >
                    <LegacyCarousel items={all} />
                </Box>
            );
        }
        if (rows.length <= 0) {
            return null;
        }
        return (
            <div className="project-ideas section">
                <h1 className="sectionheader">Get inspiration from other projects</h1>
                {rows}
            </div>
        );
    }
    renderForum () {
        if (!this.props.microworldData.show_forum) {
            return null;
        }

        return (
            <div className="forum">
                <h1 className="sectionheader">Chat with others!</h1>
                <img src="/images/forum-image.png" />
            </div>
        );
    }
    renderDesignStudio () {
        const designChallenge = this.props.microworldData.design_challenge;
        if (!designChallenge) {
            return null;
        }

        let studioHref = '';
        if (designChallenge.studio_id) {
            studioHref = `https://scratch.mit.edu//studios/${designChallenge.studio_id}/`;
        }
        if (designChallenge.project_id) {
            return (
                <div className="side-by-side section">
                    <h1 className="sectionheader">Join our Design Challenge!</h1>
                    <div className="design-studio">
                        <iframe
                            frameBorder="0"
                            src={`https://scratch.mit.edu/projects/${designChallenge.project_id}/#fullscreen`}
                        />
                    </div>
                    <div className="design-studio-projects">
                        <Box
                            key="scratch_design_studio"
                            moreHref={studioHref ? studioHref : null}
                            moreTitle={studioHref ? 'Visit the studio' : null}
                            title="Examples"
                        >
                            {/* The two carousels are used to show two rows of projects, one above the
                                other. This should be probably be changed, to allow better scrolling. */}
                            <LegacyCarousel
                                items={this.props.microworldData.design_challenge.studio1}
                                settings={{
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }}
                            />
                            <LegacyCarousel
                                items={this.props.microworldData.design_challenge.studio2}
                                settings={{
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }}
                            />
                        </Box>
                    </div>
                </div>
            );
        }
        return (
            <div className="section">
                <h1 className="sectionheader">Join our Design Challenge!</h1>
                <Box
                    key="scratch_design_studio"
                    moreHref={studioHref ? studioHref : null}
                    moreTitle={studioHref ? 'Visit the studio' : null}
                    title="design Challenge Projects"
                >
                    <LegacyCarousel
                        items={
                            this.props.microworldData.design_challenge.studio1.concat(
                                this.props.microworldData.design_challenge.studio2
                            )
                        }
                    />
               `</Box>
            </div>
        );
    }
    render () {
        return (
            <div className="inner microworld">
                <div className="top-banner section">
                    <h1 className="sectionheader">{this.props.microworldData.title}</h1>
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
}

Microworld.propTypes = {
    microworldData: PropTypes.node.isRequired
};

module.exports = Microworld;
