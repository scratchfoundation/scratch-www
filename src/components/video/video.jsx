const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

require('./video.scss');

class Video extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            videoStarted: false
        };
    }

    componentDidMount () {
        if (!this.props.play) {
            return;
        }

        if (!document.getElementById('wistia_script')) {
            const wistiaScript = document.createElement('script');
            wistiaScript.id = 'wistia_script';
            wistiaScript.type = 'text/javascript';
            wistiaScript.src = 'https://fast.wistia.com/assets/external/E-v1.js';
            wistiaScript.async = false;
            document.body.appendChild(wistiaScript);
        }

        window._wq = window._wq || [];

        window._wq.push({
            id: this.props.videoId,
            onReady: video => {
                video.bind('play', () => {
                    this.setState({videoStarted: true});
                    if (this.props.onVideoStart) {
                        this.props.onVideoStart();
                    }
                    return video.unbind;
                });
            }
        });
    }

    render () {
        if (!this.props.play) {
            return null;
        }

        const videoStartedClass = this.state.videoStarted ? 'iframe-video-started' : 'iframe-video-not-started';

        return (
            <div className={classNames('video-player', this.props.className)}>
                <iframe
                    allowFullScreen
                    className={classNames('wistia_embed', `wistia_async_${this.props.videoId}`, videoStartedClass)}
                    frameBorder="0" // deprecated attribute
                    scrolling="no" // deprecated attribute
                    src={`https://fast.wistia.net/embed/iframe/${this.props.videoId}?seo=false&videoFoam=true&autoplay=true`}
                    title={this.props.title}
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        );
    }
}

Video.defaultProps = {
    height: '225',
    title: '',
    width: '400',
    play: true
};

Video.propTypes = {
    className: PropTypes.string,
    height: PropTypes.string.isRequired,
    onVideoStart: PropTypes.func,
    play: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

module.exports = Video;
