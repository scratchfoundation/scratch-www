const React = require('react');
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');
const Box = require('../../components/box/box.jsx');
const Button = require('../../components/forms/button.jsx');
const Carousel = require('../../components/carousel/carousel.jsx');
const Form = require('../../components/forms/form.jsx');
const Input = require('../../components/forms/input.jsx');
const Spinner = require('../../components/spinner/spinner.jsx');
const Grid = require('../../components/grid/grid.jsx');
const TextArea = require('../../components/forms/textarea.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const Select = require('../../components/forms/select.jsx');

require('./components.scss');

const Components = () => (
    <div className="components">
        <div className="inner">
            <h1>Nav Bubbles</h1>
            <div className="subnavigation">
                <SubNavigation>
                    <a href="">
                        <li className="active">
                            cats
                        </li>
                    </a>
                    <a href="">
                        <li>
                            also cats
                        </li>
                    </a>
                    <a href="">
                        <li>
                            not cats
                        </li>
                    </a>
                </SubNavigation>
            </div>
            <h1>Grid</h1>
            <Grid
                showAvatar
            />
            <h1>Button</h1>
            <Button>I love buttons</Button>
            <h1>Form</h1>
            <div className="form">
                <Form>
                    <Select
                        label="Drop-down"
                        required
                        options={[
                            {
                                label: 'first option',
                                value: 1
                            },
                            {
                                label: 'second option',
                                value: 2
                            },
                            {
                                label: 'third option',
                                value: 3
                            }
                        ]}
                        name="name"
                        value={1}
                    />
                    <Input
                        label="Text input"
                        required
                        maxLength="30"
                        name="test"
                    />
                    <TextArea
                        label="Text area"
                        name="textarea1"
                        required
                    />
                </Form>
            </div>
            <h1>Box Component</h1>
            <Box
                more="Cat Gifs"
                moreUrl="http://www.catgifpage.com/"
                title="Some Title"
            >
                <h4>Things go in here</h4>
                <p>Lorem ipsum dolor sit amet.</p>
            </Box>
            <h1>Carousel Component</h1>
            <Carousel />
            <Box title="Carousel component in a box!">
                <Carousel />
            </Box>
            <h1>This is a blue Spinner</h1>
            <Spinner
                color="blue"
            />
            <h1>Colors</h1>
            <div className="colors">
                <span className="ui-blue">$ui-blue</span>
                <span className="ui-orange">$ui-orange</span>
                <span className="ui-light-gray">$ui-light-gray</span>
                <span className="ui-gray">$ui-gray</span>
                <span className="ui-dark-gray">$ui-dark-gray</span>
                <span className="background-color">$background-color</span>
                <span className="ui-aqua">$ui-aqua</span>
                <span className="ui-purple">$ui-purple</span>
                <span className="ui-white">$ui-white</span>
                <span className="ui-border">$ui-border</span>
                <span className="active-gray">$active-gray</span>
                <span className="active-dark-gray">$active-dark-gray</span>
                <span className="box-shadow-gray">$box-shadow-gray</span>
                <span className="overlay-gray">$overlay-gray</span>
                <span className="header-gray">$header-gray</span>
                <span className="type-gray">$type-gray</span>
                <span className="type-white">$type-white</span>
                <span className="link-blue">$link-blue</span>
                <span className="splash-green">$ui-aqua</span>
                <span className="splash-pink">$ui-purple</span>
                <span className="splash-blue">$ui-blue</span>
            </div>
        </div>
    </div>
);

render(<Page><Components /></Page>, document.getElementById('app'));
