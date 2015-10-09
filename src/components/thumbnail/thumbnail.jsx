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
            href: '/projects/1000/',
            title: 'Example Project',
            src: 'http://www.lorempixel.com/144/108/',
            type: 'project'
        };
    },
    render: function () {
        var classes = classNames(
            'thumbnail',
            this.props.type,
            this.props.className
        );
        var extra = [];
        if (this.props.creator) {
            extra.push(<div key="creator" className="thumbnail-creator">by {this.props.creator}</div>);
        }
        if (this.props.loves) {
            extra.push(
                <div key="loves" className="thumbnail-loves"
                     title={this.props.loves + ' loves'}>
                        {this.props.loves}
                </div>
            );
        }
        if (this.props.remixes) {
            extra.push(
                <div key="remixes" className="thumbnail-remixes"
                     title={this.props.remixes + ' remixes'}>
                        {this.props.remixes}
                </div>
            );
        }
        return (
            <div className={classes} >
                <a className="thumbnail-image" href={this.props.href}>
                    <img src={this.props.src} />
                </a>
                <div className="thumbnail-title"><a href={this.props.href}>{this.props.title}</a></div>
                {extra}
            </div>
        );
    }
});

module.exports = Thumbnail;
