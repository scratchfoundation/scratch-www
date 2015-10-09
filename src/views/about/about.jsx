var React = require('react');

require('./about.scss');

var About = React.createClass({
    type: 'About',
    render: function () {
        return (
            <div>
                <h1>I am the about page!</h1>
            </div>
        );
    }
});

var renderedView = React.render(<About />, document.getElementById('view'));

if (process.env.NODE_ENV != 'production') {
    window.renderedComponents = window.renderedComponents || [];
    window.renderedComponents.push(renderedView);
}
