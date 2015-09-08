var React = require('react');

require('./thumbnail.scss');

module.exports = React.createClass({
    propTypes: {
        src: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            href: '/projects/1000/',
            title: 'Example Project',
            src: 'http://www.lorempixel.com/144/108/',
            extra: 'by raimondious'
        };
    },
    render: function () {
        var className = this.props.className + ' thumbnail';
        return (
            <div className={className}>
                <a className="thumbnailImage" href={this.props.href}>
                    <img src={this.props.src} />
                </a>
                <span className="thumbnailTitle"><a href={this.props.href}>{this.props.title}</a></span>
                <span className="thumbnailExtra">{this.props.extra}</span>
            </div>
        );
    }
});
