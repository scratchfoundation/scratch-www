var React = require('react');

var Navigation = require('../../../navigation/conference/2016/navigation.jsx');
var Footer = require('../../../footer/conference/2016/footer.jsx');

require('../page.scss');

var Page = React.createClass({
    type: 'Page',
    render: function () {
        return (
            <div className="page mod-conference">
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
