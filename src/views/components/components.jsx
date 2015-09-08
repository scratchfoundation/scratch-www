var React = require('react');

var Box = require('../../components/box/box.jsx');

require('./components.scss');

var View = React.createClass({
    render: function () {
        return (
            <div className="inner">
                <h1>Box Component</h1>
                <Box 
                    title="Some Title"
                    more="Cat Gifs"
                    moreUrl="http://www.catgifpage.com/">
                    <h4>Things go in here</h4>
                    <p>Lorem ipsum dolor sit amet.</p>
                </Box>
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
