var React = require('react');

require('./main.scss');

var Navigation = require('./components/navigation/navigation.jsx');
var Footer = require('./components/footer/footer.jsx');

var renderedNavigation = React.render(<Navigation />, document.getElementById('navigation'));
var renderedFooter = React.render(<Footer />, document.getElementById('footer'));

if (process.env.NODE_ENV != 'production') {
    window.renderedComponents = window.renderedComponents || [];
    window.renderedComponents.push(renderedNavigation);
    window.renderedComponents.push(renderedFooter);
}
