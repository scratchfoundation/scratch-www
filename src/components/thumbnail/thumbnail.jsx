const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./thumbnail.scss');

const Thumbnail = props => {
    const extra = [];
    const info = [];

    if (props.loves && props.showLoves) {
        extra.push(
            <div
                className="thumbnail-loves"
                key="loves"
                title={`${props.loves} loves`}
            >
                {props.loves}
            </div>
        );
    }
    if (props.favorites && props.showFavorites) {
        extra.push(
            <div
                className="thumbnail-favorites"
                key="favorites"
                title={`${props.favorites} favorites`}
            >
                {props.favorites}
            </div>
        );
    }
    if (props.remixes && props.showRemixes) {
        extra.push(
            <div
                className="thumbnail-remixes"
                key="remixes"
                title={`${props.remixes} remixes`}
            >
                {props.remixes}
            </div>
        );
    }
    if (props.views && props.showViews) {
        extra.push(
            <div
                className="thumbnail-views"
                key="views"
                title={`${props.views} views`}
            >
                {props.views}
            </div>
        );
    }

    let imgElement;
    let titleElement;
    let avatarElement;

    if (props.linkTitle) {
        imgElement = (
            <a
                className="thumbnail-image"
                href={props.href}
                key="imgElement"
            >
                <img
                    alt={props.alt}
                    src={props.src}
                />
            </a>
        );
        titleElement = (
            <a
                href={props.href}
                key="titleElement"
                title={props.title}
            >
                {props.title}
            </a>
        );
    } else {
        imgElement = <img src={props.src} />;
        titleElement = props.title;
    }

    info.push(titleElement);

    if (props.creator) {
        info.push(
            <div
                className="thumbnail-creator"
                key="creator"
            >
                <a href={`/users/${props.creator}/`}>{props.creator}</a>
            </div>
        );
    }

    if (props.avatar && props.showAvatar) {
        avatarElement = (
            <a
                className="creator-image"
                href={`/users/${props.creator}/`}
            >
                <img
                    alt={props.creator}
                    src={props.avatar}
                />
            </a>
        );
    }
    return (
        <div
            className={classNames(
                'thumbnail',
                props.type,
                props.className
            )}
        >
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
};

Thumbnail.propTypes = {
    alt: PropTypes.string,
    avatar: PropTypes.string,
    className: PropTypes.string,
    creator: PropTypes.string,
    favorites: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    href: PropTypes.string,
    linkTitle: PropTypes.bool,
    loves: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    remixes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showAvatar: PropTypes.bool,
    showFavorites: PropTypes.bool,
    showLoves: PropTypes.bool,
    showRemixes: PropTypes.bool,
    showViews: PropTypes.bool,
    src: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    views: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Thumbnail.defaultProps = {
    alt: '',
    avatar: '',
    href: '#',
    linkTitle: true,
    showAvatar: false,
    showFavorites: false,
    showLoves: false,
    showRemixes: false,
    showViews: false,
    src: '',
    title: 'Project',
    type: 'project'
};

module.exports = Thumbnail;
