var connect = require('react-redux').connect;
var omit = require('lodash.omit');
var React = require('react');

var sessionActions = require('../../redux/session.js');

var Modal = require('../modal/modal.jsx');
var Registration = require('../registration/registration.jsx');

require('./intro.scss');

Modal.setAppElement(document.getElementById('view'));

var Intro = React.createClass({
    type: 'Intro',
    getDefaultProps: function () {
        return {
            messages: {
                'intro.aboutScratch': 'ABOUT SCRATCH',
                'intro.forEducators': 'FOR EDUCATORS',
                'intro.forParents': 'FOR PARENTS',
                'intro.joinScratch': 'JOIN SCRATCH',
                'intro.seeExamples': 'SEE EXAMPLES',
                'intro.tagLine': 'Create stories, games, and animations<br /> Share with others around the world',
                'intro.tryItOut': 'TRY IT OUT',
                'intro.description': 'A creative learning community with <span class="project-count"> ' +
                                     'over 14 million </span>projects shared'
            },
            session: {}
        };
    },
    getInitialState: function () {
        return {
            videoOpen: false
        };
    },
    showVideo: function () {
        this.setState({videoOpen: true});
    },
    closeVideo: function () {
        this.setState({videoOpen: false});
    },
    handleJoinClick: function (e) {
        e.preventDefault();
        this.setState({'registrationOpen': true});
    },
    closeRegistration: function () {
        this.setState({'registrationOpen': false});
    },
    completeRegistration: function () {
        this.props.dispatch(sessionActions.refreshSession());
        this.closeRegistration();
    },
    render: function () {
        var frameProps = {
            width: 570,
            height: 357,
            padding: 15
        };
        return (
            <div className="intro">
                <div className="content">
                    <h1 dangerouslySetInnerHTML={{__html: this.props.messages['intro.tagLine']}}>
                    </h1>
                    <div className="sprites">
                        <a className="sprite sprite-1" href="/projects/editor/?tip_bar=getStarted">
                            <img
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/cat-a.png"
                                alt="Scratch Cat" />
                            <img
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/cat-b.png"
                                alt="Scratch Cat" />
                            <div className="circle"></div>
                            <div className="text">
                                {this.props.messages['intro.tryItOut']}
                            </div>
                        </a>
                        <a className="sprite sprite-2" href="/starter_projects/">
                            <img
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/tera-a.png"
                                alt="Tera" />
                            <img
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/tera-b.png"
                                alt="Tera" />
                            <div className="circle"></div>
                            <div className="text">
                                {this.props.messages['intro.seeExamples']}
                            </div>
                        </a>
                        <a className="sprite sprite-3" href="#" onClick={this.handleJoinClick}>
                            <img
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/gobo-a.png"
                                alt="Gobo" />
                            <img
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/gobo-b.png"
                                alt="Gobo" />
                            <div className="circle"></div>
                            <div className="text">
                                {this.props.messages['intro.joinScratch']}
                            </div>
                            <div className="text subtext">( it&rsquo;s free )</div>
                        </a>
                        <Registration key="registration"
                                      isOpen={this.state.registrationOpen}
                                      onRequestClose={this.closeRegistration}
                                      onRegistrationDone={this.completeRegistration} />
                    </div>
                    <div className="description"
                         dangerouslySetInnerHTML={{__html: this.props.messages['intro.description']}}></div>
                    <div className="links">
                        <a href="/about/">
                            {this.props.messages['intro.aboutScratch']}
                        </a>
                        <a href="/educators/">
                            {this.props.messages['intro.forEducators']}
                        </a>
                        <a className="last" href="/parents/">
                            {this.props.messages['intro.forParents']}
                        </a>
                    </div>
                </div>
                <div className="video">
                    <div className="play-button" onClick={this.showVideo}></div>
                    <img src="//cdn.scratch.mit.edu/scratchr2/static/images/hp-video-screenshot.png"
                         alt="Intro Video" />
                </div>
                <Modal
                        className="video-modal"
                        isOpen={this.state.videoOpen}
                        onRequestClose={this.closeVideo}
                        style={{content:frameProps}}>
                    <iframe
                        src="//player.vimeo.com/video/65583694?title=0&amp;byline=0&amp;portrait=0"
                        {...omit(frameProps, 'padding')} />
                </Modal>
            </div>
        );
    }
});

var mapStateToProps = function (state) {
    return {
        session: state.session
    };
};

var ConnectedIntro = connect(mapStateToProps)(Intro);

module.exports = ConnectedIntro;
