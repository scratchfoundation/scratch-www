const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./thumbnail.scss');

const Thumbnail = ({
    alt = '',
    avatar = '',
    className,
    creator,
    favorites,
    href = '#',
    linkTitle = true,
    loves,
    remixes,
    showAvatar = false,
    showFavorites = false,
    showLoves = false,
    showRemixes = false,
    showViews = false,
    src = '',
    title = 'Project',
    type = 'project',
    views
}) => {
    const extra = [];
    const info = [];

    if (loves && showLoves) {
        extra.push(
            <div
                className="thumbnail-loves"
                key="loves"
                title={`${loves} loves`}
            >
                {loves}
            </div>
        );
    }
    if (favorites && showFavorites) {
        extra.push(
            <div
                className="thumbnail-favorites"
                key="favorites"
                title={`${favorites} favorites`}
            >
                {favorites}
            </div>
        );
    }
    if (remixes && showRemixes) {
        extra.push(
            <div
                className="thumbnail-remixes"
                key="remixes"
                title={`${remixes} remixes`}
            >
                {remixes}
            </div>
        );
    }
    if (views && showViews) {
        extra.push(
            <div
                className="thumbnail-views"
                key="views"
                title={`${views} views`}
            >
                {views}
            </div>
        );
    }

    let imgElement;
    let titleElement;
    let avatarElement;

    if (linkTitle) {
        imgElement = (
            <a
                className="thumbnail-image"
                href={href}
                key="imgElement"
            >
                <img
                    alt={alt}
                    src={src}
                />
            </a>
        );
        titleElement = (
            <a
                href={href}
                key="titleElement"
                title={title}
            >
                {title}
            </a>
        );
    } else {
        imgElement = <img src={src} />;
        titleElement = title;
    }

    info.push(titleElement);

    if (creator) {
        info.push(
            <div
                className="thumbnail-creator"
                key="creator"
            >
                <a href={`/users/${creator}/`}>{creator}</a>
            </div>
        );
    }

    if (avatar && showAvatar) {
        avatarElement = (
            <a
                className="creator-image"
                href={`/users/${creator}/`}
            >
                <img
                    alt={creator}
                    src={avatar}
                />
            </a>
        );
    }

    return (
        <div
            className={classNames(
                'thumbnail',
                type,
                className
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

module.exports = Thumbnail;
