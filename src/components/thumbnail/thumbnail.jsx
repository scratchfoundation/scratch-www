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
        return (
            <div className={'thumbnail ' + this.props.className}>
                <a className='thumbnail-image' href={this.props.href}>
                    <img src={this.props.src} />
                </a>
                <span className='thumbnail-title'><a href={this.props.href}>{this.props.title}</a></span>
                <span className='thumbnail-extra'>{this.props.extra}</span>
            </div>
        );
    }
});
