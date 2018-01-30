var classNames = require('classnames');
var React = require('react');

require('./slide.scss');

var Slide = React.createClass({
    displayName: 'Slide',
    render: function () {
        return (
            <div className={classNames(['slide', this.props.className])}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Slide;
