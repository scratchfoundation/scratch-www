var React = require('react');

var Navigation = require('../../navigation/www/navigation.jsx');
var Footer = require('../../footer/www/footer.jsx');

var Page = React.createClass({
    type: 'Page',
    render: function () {
        return (
            <div className="page">
                <div id="navigation">
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
