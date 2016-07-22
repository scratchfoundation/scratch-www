var React = require('react');
var connect = require('react-redux').connect;
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
                    <Navigation layout={this.props.layout}/>
                </div>
                <div id="view">
                    {this.props.children}
                </div>
                <div id="footer">
                    <Footer layout={this.props.layout}/>
                </div>
            </div>
        );
    }
});

var mapStateToProps = function (state) {
    return {
        layout: state.layout
    };
};

var ConnectedPage = connect(mapStateToProps)(Page);
module.exports = ConnectedPage;
