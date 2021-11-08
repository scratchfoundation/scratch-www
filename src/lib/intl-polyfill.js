// this file should only be `required` in the format-time
// when Intl.RelativeTimeFormat is not available (Safari < 14), but
// we're not currently able to do the code splitting in www, and it
// is always included. To reduce the amount of data that's loaded limit
// the number of languages loaded to just the top few that are still using
// safari <14. These seven account for most uses.
// relativetimeformat depends on locale which also needs to be polyfilled in
// safari <14
// The plural rules is required for safari 12.
import 'regenerator-runtime/runtime'; // Needed for async/await
import {shouldPolyfill as shouldPolyfillLocale} from '@formatjs/intl-locale/should-polyfill';
import {shouldPolyfill as shouldPolyfillRelativeTimeFormat} from '@formatjs/intl-relativetimeformat/should-polyfill';
import {shouldPolyfill as shouldPolyfillPluralRules} from '@formatjs/intl-pluralrules/should-polyfill';
/**
 * polyfill all the parts needed from intl
 * @param  {string} locale currently selected locale
 * @return {Promise}       returns a promise that resolves when everything is loaded
 */
const intlPolyfill = async function (locale) {
    if (!(shouldPolyfillLocale() ||
        shouldPolyfillPluralRules(locale) ||
        shouldPolyfillRelativeTimeFormat(locale))) {
        return;
    }

    if (shouldPolyfillRelativeTimeFormat(locale)) {
        await import('@formatjs/intl-relativetimeformat/polyfill');
    }

    if (shouldPolyfillPluralRules(locale)) {
        await import('@formatjs/intl-pluralrules/polyfill');
    }

    if (shouldPolyfillLocale(locale)) {
        await import('@formatjs/intl-locale/polyfill');
    }

    switch (locale.toLowerCase().split('-')[0]) {
    case 'af':
        await import('@formatjs/intl-relativetimeformat/locale-data/af');
        await import('@formatjs/intl-pluralrules/locale-data/af');
        break;
    case 'ar':
        await import('@formatjs/intl-relativetimeformat/locale-data/ar');
        await import('@formatjs/intl-pluralrules/locale-data/ar');
        break;
    case 'am':
        await import('@formatjs/intl-relativetimeformat/locale-data/am');
        await import('@formatjs/intl-pluralrules/locale-data/am');
        break;
    case 'an':
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-pluralrules/locale-data/an');
        break;
    case 'az':
        await import('@formatjs/intl-relativetimeformat/locale-data/az');
        await import('@formatjs/intl-pluralrules/locale-data/az');
        break;
    case 'id':
        await import('@formatjs/intl-relativetimeformat/locale-data/id');
        await import('@formatjs/intl-pluralrules/locale-data/id');
        break;
    case 'bn':
        await import('@formatjs/intl-relativetimeformat/locale-data/bn');
        await import('@formatjs/intl-pluralrules/locale-data/bn');
        break;
    case 'be':
        await import('@formatjs/intl-relativetimeformat/locale-data/be');
        await import('@formatjs/intl-pluralrules/locale-data/be');
        break;
    case 'bg':
        await import('@formatjs/intl-relativetimeformat/locale-data/bg');
        await import('@formatjs/intl-pluralrules/locale-data/bg');
        break;
    case 'ca':
        await import('@formatjs/intl-relativetimeformat/locale-data/ca');
        await import('@formatjs/intl-pluralrules/locale-data/ca');
        break;
    case 'cs':
        await import('@formatjs/intl-relativetimeformat/locale-data/cs');
        await import('@formatjs/intl-pluralrules/locale-data/cs');
        break;
    case 'cy':
        await import('@formatjs/intl-relativetimeformat/locale-data/cy');
        await import('@formatjs/intl-pluralrules/locale-data/cy');
        break;
    case 'da':
        await import('@formatjs/intl-relativetimeformat/locale-data/da');
        await import('@formatjs/intl-pluralrules/locale-data/da');
        break;
    case 'de':
        await import('@formatjs/intl-relativetimeformat/locale-data/de');
        await import('@formatjs/intl-pluralrules/locale-data/de');
        break;
    case 'et':
        await import('@formatjs/intl-relativetimeformat/locale-data/et');
        await import('@formatjs/intl-pluralrules/locale-data/et');
        break;
    case 'el':
        await import('@formatjs/intl-relativetimeformat/locale-data/el');
        await import('@formatjs/intl-pluralrules/locale-data/el');
        break;
    case 'en':
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-pluralrules/locale-data/en');
        break;
    case 'es':
    case 'rap':
    case 'qu':
        await import('@formatjs/intl-relativetimeformat/locale-data/es');
        await import('@formatjs/intl-pluralrules/locale-data/es');
        break;
    case 'eu':
        await import('@formatjs/intl-relativetimeformat/locale-data/eu');
        await import('@formatjs/intl-pluralrules/locale-data/eu');
        break;
    case 'fa':
        await import('@formatjs/intl-relativetimeformat/locale-data/fa');
        await import('@formatjs/intl-pluralrules/locale-data/fa');
        break;
    case 'fr':
    case 'ht':
        await import('@formatjs/intl-relativetimeformat/locale-data/fr');
        await import('@formatjs/intl-pluralrules/locale-data/fr');
        break;
    case 'fy':
        await import('@formatjs/intl-relativetimeformat/locale-data/fy');
        await import('@formatjs/intl-pluralrules/locale-data/fy');
        break;
    case 'ga':
        await import('@formatjs/intl-relativetimeformat/locale-data/ga');
        await import('@formatjs/intl-pluralrules/locale-data/ga');
        break;
    case 'gd':
        await import('@formatjs/intl-relativetimeformat/locale-data/gd');
        await import('@formatjs/intl-pluralrules/locale-data/gd');
        break;
    case 'gl':
        await import('@formatjs/intl-relativetimeformat/locale-data/gl');
        await import('@formatjs/intl-pluralrules/locale-data/gl');
        break;
    case 'ko':
        await import('@formatjs/intl-relativetimeformat/locale-data/ko');
        await import('@formatjs/intl-pluralrules/locale-data/ko');
        break;
    case 'hy':
        await import('@formatjs/intl-relativetimeformat/locale-data/hy');
        await import('@formatjs/intl-pluralrules/locale-data/hy');
        break;
    case 'he':
        await import('@formatjs/intl-relativetimeformat/locale-data/he');
        await import('@formatjs/intl-pluralrules/locale-data/he');
        break;
    case 'hr':
        await import('@formatjs/intl-relativetimeformat/locale-data/hr');
        await import('@formatjs/intl-pluralrules/locale-data/hr');
        break;
    case 'xh':
        await import('@formatjs/intl-relativetimeformat/locale-data/xh');
        await import('@formatjs/intl-pluralrules/locale-data/xh');
        break;
    case 'zu':
        await import('@formatjs/intl-relativetimeformat/locale-data/zu');
        await import('@formatjs/intl-pluralrules/locale-data/zu');
        break;
    case 'is':
        await import('@formatjs/intl-relativetimeformat/locale-data/is');
        await import('@formatjs/intl-pluralrules/locale-data/is');
        break;
    case 'it':
        await import('@formatjs/intl-relativetimeformat/locale-data/it');
        await import('@formatjs/intl-pluralrules/locale-data/it');
        break;
    case 'ka':
        await import('@formatjs/intl-relativetimeformat/locale-data/ka');
        await import('@formatjs/intl-pluralrules/locale-data/ka');
        break;
    case 'kk':
        await import('@formatjs/intl-relativetimeformat/locale-data/kk');
        await import('@formatjs/intl-pluralrules/locale-data/kk');
        break;
    case 'sw':
        await import('@formatjs/intl-relativetimeformat/locale-data/sw');
        await import('@formatjs/intl-pluralrules/locale-data/sw');
        break;
    case 'ku':
        await import('@formatjs/intl-relativetimeformat/locale-data/ku');
        await import('@formatjs/intl-pluralrules/locale-data/ku');
        break;
    case 'ckb':
        await import('@formatjs/intl-relativetimeformat/locale-data/ckb');
        await import('@formatjs/intl-pluralrules/locale-data/ckb');
        break;
    case 'lv':
        await import('@formatjs/intl-relativetimeformat/locale-data/lv');
        await import('@formatjs/intl-pluralrules/locale-data/lv');
        break;
    case 'lt':
        await import('@formatjs/intl-relativetimeformat/locale-data/lt');
        await import('@formatjs/intl-pluralrules/locale-data/lt');
        break;
    case 'hu':
        await import('@formatjs/intl-relativetimeformat/locale-data/hu');
        await import('@formatjs/intl-pluralrules/locale-data/hu');
        break;
    case 'mi':
        await import('@formatjs/intl-relativetimeformat/locale-data/mi');
        await import('@formatjs/intl-pluralrules/locale-data/en');
        break;
    case 'mn':
        await import('@formatjs/intl-relativetimeformat/locale-data/mn');
        await import('@formatjs/intl-pluralrules/locale-data/mn');
        break;
    case 'nl':
        await import('@formatjs/intl-relativetimeformat/locale-data/nl');
        await import('@formatjs/intl-pluralrules/locale-data/nl');
        break;
    case 'ja':
        await import('@formatjs/intl-relativetimeformat/locale-data/ja');
        await import('@formatjs/intl-pluralrules/locale-data/ja');
        break;
    case 'nb':
        await import('@formatjs/intl-relativetimeformat/locale-data/nb');
        await import('@formatjs/intl-pluralrules/locale-data/nb');
        break;
    case 'nn':
        await import('@formatjs/intl-relativetimeformat/locale-data/nn');
        await import('@formatjs/intl-pluralrules/locale-data/nn');
        break;
    case 'or':
        await import('@formatjs/intl-relativetimeformat/locale-data/or');
        await import('@formatjs/intl-pluralrules/locale-data/or');
        break;
    case 'uz':
        await import('@formatjs/intl-relativetimeformat/locale-data/uz');
        await import('@formatjs/intl-pluralrules/locale-data/uz');
        break;
    case 'th':
        await import('@formatjs/intl-relativetimeformat/locale-data/th');
        await import('@formatjs/intl-pluralrules/locale-data/th');
        break;
    case 'km':
        await import('@formatjs/intl-relativetimeformat/locale-data/km');
        await import('@formatjs/intl-pluralrules/locale-data/km');
        break;
    case 'pl':
        await import('@formatjs/intl-relativetimeformat/locale-data/pl');
        await import('@formatjs/intl-pluralrules/locale-data/pl');
        break;
    case 'pt':
        await import('@formatjs/intl-relativetimeformat/locale-data/pt');
        await import('@formatjs/intl-pluralrules/locale-data/pt');
        break;
    case 'ro':
        await import('@formatjs/intl-relativetimeformat/locale-data/ro');
        await import('@formatjs/intl-pluralrules/locale-data/ro');
        break;
    case 'ru':
        await import('@formatjs/intl-relativetimeformat/locale-data/ru');
        await import('@formatjs/intl-pluralrules/locale-data/ru');
        break;
    case 'nso':
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-pluralrules/locale-data/nso');
        break;
    case 'tn':
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-pluralrules/locale-data/tn');
        break;
    case 'sk':
        await import('@formatjs/intl-relativetimeformat/locale-data/sk');
        await import('@formatjs/intl-pluralrules/locale-data/sk');
        break;
    case 'sl':
        await import('@formatjs/intl-relativetimeformat/locale-data/sl');
        await import('@formatjs/intl-pluralrules/locale-data/sl');
        break;
    case 'sr':
        await import('@formatjs/intl-relativetimeformat/locale-data/sr');
        await import('@formatjs/intl-pluralrules/locale-data/sr');
        break;
    case 'fi':
        await import('@formatjs/intl-relativetimeformat/locale-data/fi');
        await import('@formatjs/intl-pluralrules/locale-data/fi');
        break;
    case 'sv':
        await import('@formatjs/intl-relativetimeformat/locale-data/sv');
        await import('@formatjs/intl-pluralrules/locale-data/sv');
        break;
    case 'vi':
        await import('@formatjs/intl-relativetimeformat/locale-data/vi');
        await import('@formatjs/intl-pluralrules/locale-data/vi');
        break;
    case 'tr':
        await import('@formatjs/intl-relativetimeformat/locale-data/tr');
        await import('@formatjs/intl-pluralrules/locale-data/tr');
        break;
    case 'uk':
        await import('@formatjs/intl-relativetimeformat/locale-data/uk');
        await import('@formatjs/intl-pluralrules/locale-data/uk');
        break;
    case 'zh':
        await import('@formatjs/intl-relativetimeformat/locale-data/zh');
        await import('@formatjs/intl-pluralrules/locale-data/zh');
        break;
    default:
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-pluralrules/locale-data/en');
        break;
    }
};

export default intlPolyfill;
