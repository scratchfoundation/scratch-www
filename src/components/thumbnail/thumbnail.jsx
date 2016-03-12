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
            type: 'project',
            showLoves: false,
            showRemixes: false,
            linkTitle: true,
            alt: ''
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
            extra.push(
                <div key="creator" className="thumbnail-creator">
                    by <a href={'/users/' + this.props.creator + '/'}>{this.props.creator}</a>
                </div>
            );
        }
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
        
        var imgElement,titleElement;
        if (this.props.linkTitle) {
            imgElement = <a className="thumbnail-image" href={this.props.href}>
                             <img src={this.props.src} alt={this.props.alt} />
                         </a>;
            titleElement =  <a href={this.props.href}>{this.props.title}</a>;
        } else {
            imgElement = <img src={this.props.src} />;
            titleElement = this.props.title;
        }

        return (
            <div className={classes} >
                {imgElement}
                <div className="thumbnail-title">
                    {titleElement}
                </div>
                {extra}
            </div>
        );
    }
});

module.exports = Thumbnail;
