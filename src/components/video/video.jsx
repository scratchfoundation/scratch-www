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
        if (!this.props.shouldPlay) {
            return;
        }

        /**
            uses code snippets from
            https://github.com/mrdavidjcole/wistia-player-react/blob/master/src/components/wistia_embed.js
        **/
        if (!document.getElementById('wistia_script')) {
            const wistiaScript = document.createElement('script');
            wistiaScript.id = 'wistia_script';
            wistiaScript.type = 'text/javascript';
            wistiaScript.src = 'https://fast.wistia.com/assets/external/E-v1.js';
            wistiaScript.async = false;
            document.body.appendChild(wistiaScript);
        }

        window._wq = window._wq || [];

        //  Use onReady in combination with the Wistia 'play' event handler so that onVideoStart()
        //  isn't called until the video actually starts. onReady fires before the video player is visible.
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
        if (!this.props.shouldPlay) {
            return null;
        }

        // Provide CSS classes for anything using the video component to configure what happens before and after
        // the video has played for the first time. See VideoPreview for an example.
        const videoStartedClass = this.state.videoStarted ? 'iframe-video-started' : 'iframe-video-not-started';

        return (
            <div className={classNames('video-player', this.props.className)}>
                <iframe
                    allowFullScreen
                    className={classNames('wistia_embed', `wistia_async_${this.props.videoId}`, videoStartedClass)}
                    frameBorder="0" // deprecated attribute
                    scrolling="no" // deprecated attribute
                    src={`https://fast.wistia.net/embed/iframe/${this.props.videoId}?seo=false&videoFoam=true&autoplay=${this.props.autoplay}`}
                    title={this.props.title}
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        );
    }
}

Video.defaultProps = {
    autoplay: true,
    height: '225',
    title: '',
    width: '400',
    shouldPlay: true
};

Video.propTypes = {
    autoplay: PropTypes.bool,
    className: PropTypes.string,
    height: PropTypes.string.isRequired,
    onVideoStart: PropTypes.func,
    shouldPlay: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

module.exports = Video;
