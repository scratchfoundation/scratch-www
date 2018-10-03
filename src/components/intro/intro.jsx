const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const navigationActions = require('../../redux/navigation.js');

const IframeModal = require('../modal/iframe/modal.jsx');
const Registration = require('../registration/registration.jsx');

require('./intro.scss');

class Intro extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleShowVideo',
            'handleCloseVideo'
        ]);
        this.state = {
            videoOpen: false
        };
    }
    handleShowVideo () {
        this.setState({videoOpen: true});
    }
    handleCloseVideo () {
        this.setState({videoOpen: false});
    }
    render () {
        return (
            <div className="intro">
                <div className="content">
                    <h1
                        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
                            __html: this.props.messages['intro.tagLine']
                        }}
                    />
                    <div className="sprites">
                        <a
                            className="sprite sprite-1"
                            href="/projects/editor/?tip_bar=getStarted"
                        >
                            <img
                                alt="Scratch Cat"
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/cat-a.png"
                            />
                            <img
                                alt="Scratch Cat"
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/cat-b.png"
                            />
                            <div className="circle" />
                            <div className="text">
                                {this.props.messages['intro.tryItOut']}
                            </div>
                        </a>
                        <a
                            className="sprite sprite-2"
                            href="/starter_projects/"
                        >
                            <img
                                alt="Tera"
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/tera-a.png"
                            />
                            <img
                                alt="Tera"
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/tera-b.png"
                            />
                            <div className="circle" />
                            <div className="text">
                                {this.props.messages['intro.seeExamples']}
                            </div>
                        </a>
                        <a
                            className="sprite sprite-3"
                            href="#"
                            onClick={this.props.handleOpenRegistration}
                        >
                            <img
                                alt="Gobo"
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/gobo-a.png"
                            />
                            <img
                                alt="Gobo"
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/gobo-b.png"
                            />
                            <div className="circle" />
                            <div className="text">
                                {this.props.messages['intro.joinScratch']}
                            </div>
                            <div className="text subtext">{this.props.messages['intro.itsFree']}</div>
                        </a>
                        <Registration
                            key="registration"
                        />
                    </div>
                    <div
                        className="description"
                        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
                            __html: this.props.messages['intro.description']
                        }}
                    />
                    <div className="links">
                        <a href="/about/">
                            {this.props.messages['intro.aboutScratch']}
                        </a>
                        <a href="/educators/">
                            {this.props.messages['intro.forEducators']}
                        </a>
                        <a
                            className="last"
                            href="/parents/"
                        >
                            {this.props.messages['intro.forParents']}
                        </a>
                    </div>
                </div>
                <div className="video">
                    <div
                        className="play-button"
                        onClick={this.handleShowVideo}
                    />
                    <img
                        alt="Intro Video"
                        src="//cdn.scratch.mit.edu/scratchr2/static/images/hp-video-screenshot.png"
                    />
                </div>
                <IframeModal
                    className="mod-intro-video"
                    isOpen={this.state.videoOpen}
                    src="//player.vimeo.com/video/65583694?title=0&amp;byline=0&amp;portrait=0"
                    onRequestClose={this.handleCloseVideo}
                />
            </div>
        );
    }
}

Intro.propTypes = {
    handleOpenRegistration: PropTypes.func,
    messages: PropTypes.shape({
        'intro.aboutScratch': PropTypes.string,
        'intro.forEducators': PropTypes.string,
        'intro.forParents': PropTypes.string,
        'intro.itsFree': PropTypes.string,
        'intro.joinScratch': PropTypes.string,
        'intro.seeExamples': PropTypes.string,
        'intro.tagLine': PropTypes.string,
        'intro.tryItOut': PropTypes.string,
        'intro.description': PropTypes.string
    })
};

Intro.defaultProps = {
    messages: {
        'intro.aboutScratch': 'ABOUT SCRATCH',
        'intro.forEducators': 'FOR EDUCATORS',
        'intro.forParents': 'FOR PARENTS',
        'intro.itsFree': 'it\'s free!',
        'intro.joinScratch': 'JOIN SCRATCH',
        'intro.seeExamples': 'SEE EXAMPLES',
        'intro.tagLine': 'Create stories, games, and animations<br /> Share with others around the world',
        'intro.tryItOut': 'TRY IT OUT',
        'intro.description': 'A creative learning community with <span class="project-count"> ' +
                             'over 14 million </span>projects shared'
    },
    session: {}
};

const mapStateToProps = state => ({
    session: state.session
});

const mapDispatchToProps = dispatch => ({
    handleOpenRegistration: event => {
        event.preventDefault();
        dispatch(navigationActions.handleOpenRegistration());
    }
});


const ConnectedIntro = connect(
    mapStateToProps,
    mapDispatchToProps
)(Intro);

module.exports = ConnectedIntro;
