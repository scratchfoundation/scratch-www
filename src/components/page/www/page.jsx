var React = require('react');
var classNames = require('classnames');

var Navigation = require('../../navigation/www/navigation.jsx');
var Footer = require('../../footer/www/footer.jsx');

var Page = React.createClass({
    type: 'Page',
    render: function () {
        var classes = classNames({
            'staging': process.env.SCRATCH_ENV == 'staging'
        });
        return (
            <div className="page">
                <div id="navigation" className={classes}>
                    <Navigation />
                </div>
                <div id="view">
                    {this.props.children}
                </div>
                <div id="footer">
                    <Footer />
                </div>
            </div>
        );
    }
});

module.exports = Page;
