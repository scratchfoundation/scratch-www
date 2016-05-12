var React = require('react');
var render = require('../../lib/render.jsx');

var Activity = require('../../components/activity/activity.jsx');
var Page = require('../../components/page/www/page.jsx');
var Box = require('../../components/box/box.jsx');
var Button = require('../../components/forms/button.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Input = require('../../components/forms/input.jsx');
var Spinner = require('../../components/spinner/spinner.jsx');

require('./components.scss');

var Components = React.createClass({
    type: 'Components',
    render: function () {
        return (
            <div className="inner components">
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
                <h1>{'Nothing!!!'}</h1>
                <Activity items={[]} />
                <h1>This is a Spinner</h1>
                <Spinner />
            </div>
        );
    }
});

render(<Page><Components /></Page>, document.getElementById('app'));
