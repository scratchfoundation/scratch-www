var React = require('react');

var Renderer = {
    render: function (jsx, toElement) {
        var rendered = React.render(jsx, toElement);
        if (process.env.NODE_ENV != 'production') {
            window.renderedComponents = window.renderedComponents || [];
            window.renderedComponents.push(rendered);
        }
    }
};

module.exports = Renderer;
