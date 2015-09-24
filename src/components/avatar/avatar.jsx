var React = require('react');

module.exports = React.createClass({
    propTypes: {
        path: React.PropTypes.string,
        userId: React.PropTypes.number,
        size: React.PropTypes.number,
        extension: React.PropTypes.string,
        version: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
            path: '//cdn2.scratch.mit.edu/get_image/user/',
            userId: 2584924,
            size: 32,
            extension: 'png',
            version: 1438702210.96
        };
    },
    getImageUrl: function () {
        return (
            this.props.path + this.props.userId + '_' +
            this.props.size + 'x' + this.props.size + '.' +
            this.props.extension + '?v=' + this.props.version);
    },
    render: function () {
        var url = this.getImageUrl();
        return (
            <img className="avatar" src={url} />);
    }
});
