var React = require('react');

require('./about.scss');

var View = React.createClass({
    render: function () {
        return (
            <div>
                <h1>I am the about page!</h1>
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
