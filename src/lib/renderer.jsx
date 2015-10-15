var ReactDOM = require('react-dom');

var Renderer = {
    render: function (jsx, toElement) {
        var rendered = ReactDOM.render(jsx, toElement);
        if (process.env.NODE_ENV != 'production') {
            window.renderedComponents = window.renderedComponents || [];
            window.renderedComponents.push(rendered);
        }
    }
};

module.exports = Renderer;
