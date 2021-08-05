// this file should only be `required` in the format-time
// when Intl.RelativeTimeFormat is not available (Safari < 14), but
// we're not currently able to do the code splitting in www, and it
// is always included. To reduce the amount of data that's loaded limit
// the number of languages loaded to just the top few that are still using
// safari <14. These seven account for most uses.
// relativetimeformat depends on locale which also needs to be polyfilled in
// safari <14
// The plural rules is required for safari 12.
import {shouldPolyfill as shouldPolyfillLocale} from '@formatjs/intl-locale/should-polyfill';
import {shouldPolyfill as shouldPolyfillRelativeTimeFormat} from '@formatjs/intl-relativetimeformat/should-polyfill'
import {shouldPolyfill as shouldPolyfillPluralRules} from '@formatjs/intl-pluralrules/should-polyfill';

async function polyfill(locale) {
  if (!shouldPolyfillRelativeTimeFormat(locale)) return;

  // Load the polyfill 1st BEFORE loading data
  await import('@formatjs/intl-relativetimeformat/polyfill')

  if (shouldPolyfillPluralRules(locale)) {
    await import('@formatjs/intl-pluralrules/polyfill');
  }

  if (shouldPolyfillLocale(locale)) {
    await import('@formatjs/intl-locale/polyfill');
  }

  switch (locale) {
    case 'ar':
      await import('@formatjs/intl-relativetimeformat/locale-data/ar');
      await import('@formatjs/intl-pluralrules/locale-data/ar');
      break;
    case 'es':
    case 'es-419':
      await import('@formatjs/intl-relativetimeformat/locale-data/es');
      await import('@formatjs/intl-pluralrules/locale-data/es');
      break;
    case 'fr':
      await import('@formatjs/intl-relativetimeformat/locale-data/fr');
      await import('@formatjs/intl-pluralrules/locale-data/fr');
      break
    case 'ja':
      await import('@formatjs/intl-relativetimeformat/locale-data/ja');
      await import('@formatjs/intl-pluralrules/locale-data/ja');
      break;
    case 'tr':
      await import('@formatjs/intl-relativetimeformat/locale-data/tr');
      await import('@formatjs/intl-pluralrules/locale-data/tr');
    case 'zh':
    case 'zh-CN':
    case 'zh-TW':
      await import('@formatjs/intl-relativetimeformat/locale-data/zh');
      await import('@formatjs/intl-pluralrules/locale-data/zh');
      break;
    default:
      await import('@formatjs/intl-relativetimeformat/locale-data/en');
      await import('@formatjs/intl-pluralrules/locale-data/en');
      break;
    }
}
export default polyfill;