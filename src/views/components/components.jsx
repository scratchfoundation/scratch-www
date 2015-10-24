var React = require('react');
var render = require('../../lib/render.jsx');

var Activity = require('../../components/activity/activity.jsx');
var Box = require('../../components/box/box.jsx');
var Button = require('../../components/forms/button.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Input = require('../../components/forms/input.jsx');


require('./components.scss');

var Components = React.createClass({
    type: 'Components',
    render: function () {
        return (
            <div className="inner">
                <h1>Button</h1>
                <Button>I love button</Button>
                <h1>Form</h1>
                <Input type="text" name="test" maxLength="30" />
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
                <h1>{'What\'s Happening??'}</h1>
                <Activity />
            </div>
        );
    }
});

render(<Components />, document.getElementById('view'));
