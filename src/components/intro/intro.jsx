const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const navigationActions = require('../../redux/navigation.js');

const Video = require('../video/video.jsx');
const FlexRow = require('../flex-row/flex-row.jsx');
const TitleBanner = require('../title-banner/title-banner.jsx');

require('./intro.scss');

class Intro extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleShowVideo'
        ]);
        this.state = {
            videoOpen: false
        };
    }
    handleShowVideo () {
        this.setState({videoOpen: true});
    }
    render () {
        return (
            <TitleBanner className="intro-banner">
                <FlexRow className="intro-container">
                    <FlexRow className="intro-content column">
                        <h1 className="intro-header">
                            <span>{this.props.messages['intro.tagLine1']}</span>
                            <br />
                            <span>{this.props.messages['intro.tagLine2']}</span>
                        </h1>
                        <FlexRow className="intro-buttons">
                            <a
                                className="intro-button create-button button"
                                href="/create"
                            >
                                {this.props.messages['intro.startCreating']}
                            </a>
                            <a
                                className="intro-button join-button button"
                                href="#"
                                onClick={this.props.handleOpenRegistration}
                            >
                                {this.props.messages['intro.join']}
                            </a>
                        </FlexRow>
                        
                    </FlexRow>
                    <FlexRow className="intro-video-container">
                        {this.state.videoOpen ?
                            (
                                <Video
                                    className="intro-video"
                                    videoId="joal01i8b1"
                                />
                            ) : (
                                <div
                                    className="video-image"
                                    onClick={this.handleShowVideo}
                                >
                                    <img src="/svgs/intro/video-image.svg" />
                                    <a
                                        href="#"
                                        onClick={this.handleShowVideo}
                                    >
                                        <div className="watch-button button">
                                            {this.props.messages['intro.watchVideo']}
                                        </div>
                                    </a>
                                </div>
                            )
                        }
                    </FlexRow>
                </FlexRow>
                
                <FlexRow className="intro-subnav">
                    <a
                        href="/about"
                    >
                        <div className="subnav-button button">
                            {this.props.messages['intro.aboutScratch']}
                        </div>
                    </a>
                    <a
                        href="/parents"
                    >
                        <div className="subnav-button button">
                            {this.props.messages['intro.forParents']}
                        </div>
                    </a>
                    <a
                        href="/educators"
                    >
                        <div className="subnav-button button">
                            {this.props.messages['intro.forEducators']}
                        </div>
                    </a>
                </FlexRow>
            </TitleBanner>
        );
    }
}

Intro.propTypes = {
    handleOpenRegistration: PropTypes.func,
    messages: PropTypes.shape({
        'intro.aboutScratch': PropTypes.string,
        'intro.forEducators': PropTypes.string,
        'intro.forParents': PropTypes.string,
        'intro.join': PropTypes.string,
        'intro.startCreating': PropTypes.string,
        'intro.tagLine1': PropTypes.string,
        'intro.tagLine2': PropTypes.string,
        'intro.watchVideo': PropTypes.string
    })
};

Intro.defaultProps = {
    messages: {
        'intro.aboutScratch': 'About Scratch',
        'intro.forEducators': 'For Educators',
        'intro.forParents': 'For Parents',
        'intro.join': 'Join',
        'intro.startCreating': 'Start Creating',
        'intro.tagLine1': 'Create stories, games, and animations',
        'intro.tagLine2': 'Share with others around the world',
        'intro.watchVideo': 'Watch Video'
    },
    session: {}
};

const mapStateToProps = state => ({
    session: state.session
});

const mapDispatchToProps = dispatch => ({
    handleOpenRegistration: event => {
        event.preventDefault();
        dispatch(navigationActions.setRegistrationOpen(true));
    }
});


const ConnectedIntro = connect(
    mapStateToProps,
    mapDispatchToProps
)(Intro);

module.exports = ConnectedIntro;
