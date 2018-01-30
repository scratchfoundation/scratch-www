var classNames = require('classnames');
var React = require('react');

require('./thumbnail.scss');

var Thumbnail = React.createClass({
    type: 'Thumbnail',
    propTypes: {
        src: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            srcFallback: false,
            avatarFallback: false
        };
    },
    getDefaultProps: function () {
        return {
            href: '#',
            title: 'Project',
            src: '',
            srcDefault: 'https://uploads.scratch.mit.edu/projects/thumbnails/default.png',
            avatar: '',
            avatarDefault: 'https://uploads.scratch.mit.edu/users/avatars/default.png',
            type: 'project',
            showLoves: false,
            showFavorites: false,
            showRemixes: false,
            showViews: false,
            showAvatar: false,
            linkTitle: true,
            alt: ''
        };
    },
    handleSrcError: function () {
        this.setState({srcFallback: true});
    },
    handleAvatarError: function () {
        this.setState({avatarFallback: true});
    },
    render: function () {
        var classes = classNames(
            'thumbnail',
            this.props.type,
            this.props.className
        );
        var extra = [];
        var info = [];

        if (this.props.loves && this.props.showLoves) {
            extra.push(
                <div
                    key="loves"
                    className="thumbnail-loves"
                    title={this.props.loves + ' loves'}>
                    {this.props.loves}
                </div>
            );
        }
        if (this.props.favorites && this.props.showFavorites) {
            extra.push(
                <div
                    key="favorites"
                    className="thumbnail-favorites"
                    title={this.favorites + ' favorites'}>
                    {this.props.favorites}
                </div>
            );
        }
        if (this.props.remixes && this.props.showRemixes) {
            extra.push(
                <div
                    key="remixes"
                    className="thumbnail-remixes"
                    title={this.props.remixes + ' remixes'}
                >
                    {this.props.remixes}
                </div>
            );
        }
        if (this.props.views && this.props.showViews) {
            extra.push(
                <div
                    key="views"
                    className="thumbnail-views"
                    title={this.props.views + ' views'}
                >
                    {this.props.views}
                </div>
            );
        }

        var imgElement, titleElement, avatarElement;
        if (this.props.linkTitle) {
            if (this.state.srcFallback) {
                imgElement = (
                    <a
                        className="thumbnail-image"
                        href={this.props.href}
                        key="imgElement"
                    >
                        <img
                            alt={this.props.alt}
                            src={this.props.srcDefault}
                        />
                    </a>
                );
            } else {
                imgElement = (
                    <a
                        className="thumbnail-image"
                        href={this.props.href}
                        key="imgElement"
                    >
                        <img
                            alt={this.props.alt}
                            src={this.props.src}
                            onError={this.handleSrcError}
                        />
                    </a>
                );
            }
            titleElement = (
                <a href={this.props.href} key="titleElement">
                    {this.props.title}
                </a>
            );
        } else {
            imgElement = <img src={this.props.src} />;
            titleElement = this.props.title;
        }

        info.push(titleElement);

        if (this.props.creator) {
            info.push(
                <div key="creator" className="thumbnail-creator">
                    <a href={'/users/' + this.props.creator + '/'}>{this.props.creator}</a>
                </div>
            );
        }

        if (this.props.avatar && this.props.showAvatar) {
            if (this.state.avatarFallback) {
                avatarElement = (
                    <a
                        className="creator-image"
                        href={'/users/' + this.props.creator + '/'}
                    >
                        <img
                            alt={this.props.creator}
                            src={this.props.avatarDefault}
                        />
                    </a>
                );
            } else {
                avatarElement = (
                    <a
                        className="creator-image"
                        href={'/users/' + this.props.creator + '/'}
                    >
                        <img
                            alt={this.props.creator}
                            src={this.props.avatar}
                            onError={this.handleAvatarError}
                        />
                    </a>
                );
            }
        }
        return (
            <div className={classes} >
                {imgElement}
                <div className="thumbnail-info">
                    {avatarElement}
                    <div className="thumbnail-title">
                        {info}
                    </div>
                </div>
                {extra}
            </div>
        );
    }
});

module.exports = Thumbnail;
