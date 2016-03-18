var React = require('react');

var Navigation = require('../navigation/navigation.jsx');
var Footer = require('../footer/footer.jsx');

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
