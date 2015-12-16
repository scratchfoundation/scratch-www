var ReactIntl = require('react-intl');

var customLanguages = require('../custom-locales.json');
var render = require('./lib/render.jsx');

require('./main.scss');

var Navigation = require('./components/navigation/navigation.jsx');
var Footer = require('./components/footer/footer.jsx');

for (var locale in customLanguages) {
    ReactIntl.addLocaleData(customLanguages[locale]);
}
render(<Navigation />, document.getElementById('navigation'));
render(<Footer />, document.getElementById('footer'));
