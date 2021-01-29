// this file should only be `required` in the compose-comment component
// when Intl.RelativeTimeFormat is not available (Safari < 14)
// relativetimeformat depends on locale which also needs to be polyfilled
// and it needs localedata for all the scratch languages. While we've already
// loaded locale-data for react-intl, this polyfille seems to have it's own format,
// so they're all loaded again.
require('@formatjs/intl-locale/polyfill');
require('@formatjs/intl-relativetimeformat/polyfill');
require('@formatjs/intl-relativetimeformat/locale-data/en');
require('@formatjs/intl-relativetimeformat/locale-data/ar');
require('@formatjs/intl-relativetimeformat/locale-data/es');
require('@formatjs/intl-relativetimeformat/locale-data/fr');
require('@formatjs/intl-relativetimeformat/locale-data/ja');
require('@formatjs/intl-relativetimeformat/locale-data/tr');
require('@formatjs/intl-relativetimeformat/locale-data/zh');
