// this file should only be `required` in the format-time
// when Intl.RelativeTimeFormat is not available (Safari < 14), but
// we're not currently able to do the code splitting in www, and it
// is always included. To reduce the amount of data that's loaded limit
// the number of languages loaded to just the top few that are still using
// safari <14. These seven account for most uses.
// relativetimeformat depends on locale which also needs to be polyfilled in
// safari <14
// The plural rules is required for safari 12.
require('@formatjs/intl-locale/polyfill');
require('@formatjs/intl-pluralrules/polyfill');
require('@formatjs/intl-pluralrules/locale-data/en');
require('@formatjs/intl-relativetimeformat/polyfill');
require('@formatjs/intl-relativetimeformat/locale-data/en');
require('@formatjs/intl-relativetimeformat/locale-data/ar');
require('@formatjs/intl-relativetimeformat/locale-data/es');
require('@formatjs/intl-relativetimeformat/locale-data/fr');
require('@formatjs/intl-relativetimeformat/locale-data/ja');
require('@formatjs/intl-relativetimeformat/locale-data/tr');
require('@formatjs/intl-relativetimeformat/locale-data/zh');
