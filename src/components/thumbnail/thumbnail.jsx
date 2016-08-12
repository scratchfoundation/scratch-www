var React = require('react');
var classNames = require('classnames');

require('./thumbnail.scss');

var Thumbnail = React.createClass({
    type: 'Thumbnail',
    propTypes: {
        src: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            href: '#',
            title: 'Project',
            src: '',
            avatar: '',
            type: 'project',
            showLoves: false,
            showFavorites: false,
            showRemixes: false,
            showViews: false,
            showAvatar: false,
            linkTitle: true,
            cards: false,
            alt: ''
        };
    },
    render: function () {
        var classes = classNames(
            'thumbnail',
            this.props.type,
            this.props.className,
            {'cards': this.props.cards}
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
                    title={this.props.remixes + ' remixes'}>
                    {this.props.remixes}
                </div>
            );
        }
        if (this.props.views && this.props.showViews) {
            extra.push(
                <div
                    key="views"
                    className="thumbnail-views"
                    title={this.props.views + ' views'}>
                    {this.props.views}
                </div>
            );
        }
        var imgElement,titleElement,avatarElement;
        if (this.props.linkTitle) {
            imgElement = <a className="thumbnail-image" href={this.props.href}>
                             <img src={this.props.src} alt={this.props.alt} />
                         </a>;
            titleElement =  <a href={this.props.href}>{this.props.title}</a>;
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
            avatarElement =
                <a className="creator-image" href={'/users/' + this.props.creator + '/'}>
                    <img src={this.props.avatar} alt={this.props.creator} />
                </a>;
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
