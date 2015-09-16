var React = require('react');

var Box = require('../../components/box/box.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');

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
                <h1>Carousel Component</h1>
                <Carousel />
                <Box
                    title="Carousel component in a box!">
                    <Carousel />
                </Box>
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
