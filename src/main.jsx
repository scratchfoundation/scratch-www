var render = require('./lib/render.jsx');

require('./main.scss');

var Navigation = require('./components/navigation/navigation.jsx');
var Footer = require('./components/footer/footer.jsx');

render(<Navigation />, document.getElementById('navigation'));
render(<Footer />, document.getElementById('footer'));
