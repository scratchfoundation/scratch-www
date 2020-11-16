const bindAll = require('lodash.bindall');

const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

require('./video.scss');

class Video extends React.Component {
    componentDidMount () {
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
        window._wq.push({
            id: this.props.videoId,
            onReady: this.props.onLoad
        });
    }

    render () {
        return (
            <div className={classNames('video-player', this.props.className)}>
                <iframe
                    allowFullScreen
                    // allowFullScreen is legacy, can we start using allow='fullscreen'?
                    // allow="fullscreen"
                    className={classNames('wistia_embed', `wistia_async_${this.props.videoId}`)}
                    frameBorder="0" // deprecated attribute
                    height={this.props.height}
                    scrolling="no" // deprecated attribute
                    src={`https://fast.wistia.net/embed/iframe/${this.props.videoId}?seo=false&videoFoam=true`}
                    title={this.props.title}
                    width={this.props.width}
                    // onLoad={this.props.onLoad}
                />
            </div>
        );
    }
}
Video.defaultProps = {
    height: '225',
    title: '',
    width: '400'
};

Video.propTypes = {
    className: PropTypes.string,
    height: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

module.exports = Video;
