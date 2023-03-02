// This file polyfills the required Intl objects and locale data.
// The react-intl library uses PluralRules, RelativeTimeFormat, NumberFormat,
// and DateTimeFormat. Even if browsers support these objects, it is possible
// that the browser does not support the specific locale.
// There are a small number of Scratch locales that do not have polyfill locale
// data available. See /src/lib/locales.js for how they are handled.
// relativetimeformat depends on locale which also needs to be polyfilled in
// safari <14
// The plural rules is required for safari 12.
import 'regenerator-runtime/runtime'; // Needed for async/await
import {shouldPolyfill as shouldPolyfillLocale} from '@formatjs/intl-locale/should-polyfill';
import {shouldPolyfill as shouldPolyfillRelativeTimeFormat} from '@formatjs/intl-relativetimeformat/should-polyfill';
import {shouldPolyfill as shouldPolyfillPluralRules} from '@formatjs/intl-pluralrules/should-polyfill';
import {shouldPolyfill as shouldPolyfillNumberFormat} from '@formatjs/intl-numberformat/should-polyfill';
import {shouldPolyfill as shouldPolyfillDateTimeFormat} from '@formatjs/intl-datetimeformat/should-polyfill';
/**
 * polyfill all the parts needed from intl
 * @param  {string} locale currently selected locale
 * @return {Promise}       returns a promise that resolves when everything is loaded
 */
const intlPolyfill = async function (locale) {
    if (!(shouldPolyfillLocale() ||
        shouldPolyfillPluralRules(locale) ||
        shouldPolyfillRelativeTimeFormat(locale) ||
        shouldPolyfillNumberFormat(locale) ||
        shouldPolyfillDateTimeFormat(locale))) {
        return;
    }

    if (shouldPolyfillLocale()) {
        await import('@formatjs/intl-locale/polyfill-force');
    }

    if (shouldPolyfillPluralRules(locale)) {
        await import('@formatjs/intl-pluralrules/polyfill-force');
    }

    if (shouldPolyfillRelativeTimeFormat(locale)) {
        await import('@formatjs/intl-relativetimeformat/polyfill-force');
    }

    if (shouldPolyfillNumberFormat(locale)) {
        await import('@formatjs/intl-numberformat/polyfill-force');
    }

    if (shouldPolyfillDateTimeFormat(locale)) {
        await import('@formatjs/intl-datetimeformat/polyfill-force');
    }

    switch (locale.toLowerCase().split('-')[0]) {
    case 'af':
        await import('@formatjs/intl-pluralrules/locale-data/af');
        await import('@formatjs/intl-relativetimeformat/locale-data/af');
        await import('@formatjs/intl-numberformat/locale-data/af');
        await import('@formatjs/intl-datetimeformat/locale-data/af');
        break;
    case 'ar':
        await import('@formatjs/intl-pluralrules/locale-data/ar');
        await import('@formatjs/intl-relativetimeformat/locale-data/ar');
        await import('@formatjs/intl-numberformat/locale-data/ar');
        await import('@formatjs/intl-datetimeformat/locale-data/ar');
        break;
    case 'am':
        await import('@formatjs/intl-pluralrules/locale-data/am');
        await import('@formatjs/intl-relativetimeformat/locale-data/am');
        await import('@formatjs/intl-numberformat/locale-data/am');
        await import('@formatjs/intl-datetimeformat/locale-data/am');
        break;
    case 'ast':
        await import('@formatjs/intl-pluralrules/locale-data/ast');
        await import('@formatjs/intl-relativetimeformat/locale-data/ast');
        await import('@formatjs/intl-numberformat/locale-data/ast');
        await import('@formatjs/intl-datetimeformat/locale-data/ast');
        break;
    case 'az':
        await import('@formatjs/intl-pluralrules/locale-data/az');
        await import('@formatjs/intl-relativetimeformat/locale-data/az');
        await import('@formatjs/intl-numberformat/locale-data/az');
        await import('@formatjs/intl-datetimeformat/locale-data/az');
        break;
    case 'id':
        await import('@formatjs/intl-pluralrules/locale-data/id');
        await import('@formatjs/intl-relativetimeformat/locale-data/id');
        await import('@formatjs/intl-numberformat/locale-data/id');
        await import('@formatjs/intl-datetimeformat/locale-data/id');
        break;
    case 'bn':
        await import('@formatjs/intl-pluralrules/locale-data/bn');
        await import('@formatjs/intl-relativetimeformat/locale-data/bn');
        await import('@formatjs/intl-numberformat/locale-data/bn');
        await import('@formatjs/intl-datetimeformat/locale-data/bn');
        break;
    case 'be':
        await import('@formatjs/intl-pluralrules/locale-data/be');
        await import('@formatjs/intl-relativetimeformat/locale-data/be');
        await import('@formatjs/intl-numberformat/locale-data/be');
        await import('@formatjs/intl-datetimeformat/locale-data/be');
        break;
    case 'bg':
        await import('@formatjs/intl-pluralrules/locale-data/bg');
        await import('@formatjs/intl-relativetimeformat/locale-data/bg');
        await import('@formatjs/intl-numberformat/locale-data/bg');
        await import('@formatjs/intl-datetimeformat/locale-data/bg');
        break;
    case 'ca':
        await import('@formatjs/intl-pluralrules/locale-data/ca');
        await import('@formatjs/intl-relativetimeformat/locale-data/ca');
        await import('@formatjs/intl-numberformat/locale-data/ca');
        await import('@formatjs/intl-datetimeformat/locale-data/ca');
        break;
    case 'cs':
        await import('@formatjs/intl-pluralrules/locale-data/cs');
        await import('@formatjs/intl-relativetimeformat/locale-data/cs');
        await import('@formatjs/intl-numberformat/locale-data/cs');
        await import('@formatjs/intl-datetimeformat/locale-data/cs');
        break;
    case 'cy':
        await import('@formatjs/intl-pluralrules/locale-data/cy');
        await import('@formatjs/intl-relativetimeformat/locale-data/cy');
        await import('@formatjs/intl-numberformat/locale-data/cy');
        await import('@formatjs/intl-datetimeformat/locale-data/cy');
        break;
    case 'da':
        await import('@formatjs/intl-pluralrules/locale-data/da');
        await import('@formatjs/intl-relativetimeformat/locale-data/da');
        await import('@formatjs/intl-numberformat/locale-data/da');
        await import('@formatjs/intl-datetimeformat/locale-data/da');
        break;
    case 'de':
        await import('@formatjs/intl-pluralrules/locale-data/de');
        await import('@formatjs/intl-relativetimeformat/locale-data/de');
        await import('@formatjs/intl-numberformat/locale-data/de');
        await import('@formatjs/intl-datetimeformat/locale-data/de');
        break;
    case 'et':
        await import('@formatjs/intl-pluralrules/locale-data/et');
        await import('@formatjs/intl-relativetimeformat/locale-data/et');
        await import('@formatjs/intl-numberformat/locale-data/et');
        await import('@formatjs/intl-datetimeformat/locale-data/et');
        break;
    case 'el':
        await import('@formatjs/intl-pluralrules/locale-data/el');
        await import('@formatjs/intl-relativetimeformat/locale-data/el');
        await import('@formatjs/intl-numberformat/locale-data/el');
        await import('@formatjs/intl-datetimeformat/locale-data/el');
        break;
    case 'en':
        await import('@formatjs/intl-pluralrules/locale-data/en');
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-numberformat/locale-data/en');
        await import('@formatjs/intl-datetimeformat/locale-data/en');
        break;
    case 'es':
        await import('@formatjs/intl-pluralrules/locale-data/es');
        await import('@formatjs/intl-relativetimeformat/locale-data/es');
        await import('@formatjs/intl-numberformat/locale-data/es');
        await import('@formatjs/intl-datetimeformat/locale-data/es');
        break;
    case 'eo':
        await import('@formatjs/intl-pluralrules/locale-data/eo');
        await import('@formatjs/intl-relativetimeformat/locale-data/eo');
        await import('@formatjs/intl-numberformat/locale-data/eo');
        await import('@formatjs/intl-datetimeformat/locale-data/eo');
        break;
    case 'eu':
        await import('@formatjs/intl-pluralrules/locale-data/eu');
        await import('@formatjs/intl-relativetimeformat/locale-data/eu');
        await import('@formatjs/intl-numberformat/locale-data/eu');
        await import('@formatjs/intl-datetimeformat/locale-data/eu');
        break;
    case 'fa':
        await import('@formatjs/intl-pluralrules/locale-data/fa');
        await import('@formatjs/intl-relativetimeformat/locale-data/fa');
        await import('@formatjs/intl-numberformat/locale-data/fa');
        await import('@formatjs/intl-datetimeformat/locale-data/fa');
        break;
    case 'fil':
        await import('@formatjs/intl-pluralrules/locale-data/fil');
        await import('@formatjs/intl-relativetimeformat/locale-data/fil');
        await import('@formatjs/intl-numberformat/locale-data/fil');
        await import('@formatjs/intl-datetimeformat/locale-data/fil');
        break;
    case 'fr':
        await import('@formatjs/intl-pluralrules/locale-data/fr');
        await import('@formatjs/intl-relativetimeformat/locale-data/fr');
        await import('@formatjs/intl-numberformat/locale-data/fr');
        await import('@formatjs/intl-datetimeformat/locale-data/fr');
        break;
    case 'fy':
        await import('@formatjs/intl-pluralrules/locale-data/fy');
        await import('@formatjs/intl-relativetimeformat/locale-data/fy');
        await import('@formatjs/intl-numberformat/locale-data/fy');
        await import('@formatjs/intl-datetimeformat/locale-data/fy');
        break;
    case 'ga':
        await import('@formatjs/intl-pluralrules/locale-data/ga');
        await import('@formatjs/intl-relativetimeformat/locale-data/ga');
        await import('@formatjs/intl-numberformat/locale-data/ga');
        await import('@formatjs/intl-datetimeformat/locale-data/ga');
        break;
    case 'gd':
        await import('@formatjs/intl-pluralrules/locale-data/gd');
        await import('@formatjs/intl-relativetimeformat/locale-data/gd');
        await import('@formatjs/intl-numberformat/locale-data/gd');
        await import('@formatjs/intl-datetimeformat/locale-data/gd');
        break;
    case 'gl':
        await import('@formatjs/intl-pluralrules/locale-data/gl');
        await import('@formatjs/intl-relativetimeformat/locale-data/gl');
        await import('@formatjs/intl-numberformat/locale-data/gl');
        await import('@formatjs/intl-datetimeformat/locale-data/gl');
        break;
    case 'ko':
        await import('@formatjs/intl-pluralrules/locale-data/ko');
        await import('@formatjs/intl-relativetimeformat/locale-data/ko');
        await import('@formatjs/intl-numberformat/locale-data/ko');
        await import('@formatjs/intl-datetimeformat/locale-data/ko');
        break;
    case 'ha':
        await import('@formatjs/intl-pluralrules/locale-data/ha');
        await import('@formatjs/intl-relativetimeformat/locale-data/ha');
        await import('@formatjs/intl-numberformat/locale-data/ha');
        await import('@formatjs/intl-datetimeformat/locale-data/ha');
        break;
    case 'hy':
        await import('@formatjs/intl-pluralrules/locale-data/hy');
        await import('@formatjs/intl-relativetimeformat/locale-data/hy');
        await import('@formatjs/intl-numberformat/locale-data/hy');
        await import('@formatjs/intl-datetimeformat/locale-data/hy');
        break;
    case 'he':
        await import('@formatjs/intl-pluralrules/locale-data/he');
        await import('@formatjs/intl-relativetimeformat/locale-data/he');
        await import('@formatjs/intl-numberformat/locale-data/he');
        await import('@formatjs/intl-datetimeformat/locale-data/he');
        break;
    case 'hr':
        await import('@formatjs/intl-pluralrules/locale-data/hr');
        await import('@formatjs/intl-relativetimeformat/locale-data/hr');
        await import('@formatjs/intl-numberformat/locale-data/hr');
        await import('@formatjs/intl-datetimeformat/locale-data/hr');
        break;
    case 'xh':
        await import('@formatjs/intl-pluralrules/locale-data/xh');
        await import('@formatjs/intl-relativetimeformat/locale-data/xh');
        await import('@formatjs/intl-numberformat/locale-data/xh');
        await import('@formatjs/intl-datetimeformat/locale-data/xh');
        break;
    case 'zu':
        await import('@formatjs/intl-pluralrules/locale-data/zu');
        await import('@formatjs/intl-relativetimeformat/locale-data/zu');
        await import('@formatjs/intl-numberformat/locale-data/zu');
        await import('@formatjs/intl-datetimeformat/locale-data/zu');
        break;
    case 'is':
        await import('@formatjs/intl-pluralrules/locale-data/is');
        await import('@formatjs/intl-relativetimeformat/locale-data/is');
        await import('@formatjs/intl-numberformat/locale-data/is');
        await import('@formatjs/intl-datetimeformat/locale-data/is');
        break;
    case 'it':
        await import('@formatjs/intl-pluralrules/locale-data/it');
        await import('@formatjs/intl-relativetimeformat/locale-data/it');
        await import('@formatjs/intl-numberformat/locale-data/it');
        await import('@formatjs/intl-datetimeformat/locale-data/it');
        break;
    case 'ka':
        await import('@formatjs/intl-pluralrules/locale-data/ka');
        await import('@formatjs/intl-relativetimeformat/locale-data/ka');
        await import('@formatjs/intl-numberformat/locale-data/ka');
        await import('@formatjs/intl-datetimeformat/locale-data/ka');
        break;
    case 'kk':
        await import('@formatjs/intl-pluralrules/locale-data/kk');
        await import('@formatjs/intl-relativetimeformat/locale-data/kk');
        await import('@formatjs/intl-numberformat/locale-data/kk');
        await import('@formatjs/intl-datetimeformat/locale-data/kk');
        break;
    case 'qu':
        await import('@formatjs/intl-pluralrules/locale-data/en');
        await import('@formatjs/intl-relativetimeformat/locale-data/qu');
        await import('@formatjs/intl-numberformat/locale-data/qu');
        await import('@formatjs/intl-datetimeformat/locale-data/qu');
        break;
    case 'sw':
        await import('@formatjs/intl-pluralrules/locale-data/sw');
        await import('@formatjs/intl-relativetimeformat/locale-data/sw');
        await import('@formatjs/intl-numberformat/locale-data/sw');
        await import('@formatjs/intl-datetimeformat/locale-data/sw');
        break;
    case 'ku':
        await import('@formatjs/intl-pluralrules/locale-data/ku');
        await import('@formatjs/intl-relativetimeformat/locale-data/ku');
        await import('@formatjs/intl-numberformat/locale-data/ku');
        await import('@formatjs/intl-datetimeformat/locale-data/ku');
        break;
    case 'ckb':
        await import('@formatjs/intl-pluralrules/locale-data/ckb');
        await import('@formatjs/intl-relativetimeformat/locale-data/ckb');
        await import('@formatjs/intl-numberformat/locale-data/ckb');
        await import('@formatjs/intl-datetimeformat/locale-data/ckb');
        break;
    case 'lv':
        await import('@formatjs/intl-pluralrules/locale-data/lv');
        await import('@formatjs/intl-relativetimeformat/locale-data/lv');
        await import('@formatjs/intl-numberformat/locale-data/lv');
        await import('@formatjs/intl-datetimeformat/locale-data/lv');
        break;
    case 'lt':
        await import('@formatjs/intl-pluralrules/locale-data/lt');
        await import('@formatjs/intl-relativetimeformat/locale-data/lt');
        await import('@formatjs/intl-numberformat/locale-data/lt');
        await import('@formatjs/intl-datetimeformat/locale-data/lt');
        break;
    case 'hu':
        await import('@formatjs/intl-pluralrules/locale-data/hu');
        await import('@formatjs/intl-relativetimeformat/locale-data/hu');
        await import('@formatjs/intl-numberformat/locale-data/hu');
        await import('@formatjs/intl-datetimeformat/locale-data/hu');
        break;
    case 'mi':
        await import('@formatjs/intl-pluralrules/locale-data/en');
        await import('@formatjs/intl-relativetimeformat/locale-data/mi');
        await import('@formatjs/intl-numberformat/locale-data/mi');
        await import('@formatjs/intl-datetimeformat/locale-data/mi');
        break;
    case 'mn':
        await import('@formatjs/intl-pluralrules/locale-data/mn');
        await import('@formatjs/intl-relativetimeformat/locale-data/mn');
        await import('@formatjs/intl-numberformat/locale-data/mn');
        await import('@formatjs/intl-datetimeformat/locale-data/mn');
        break;
    case 'nl':
        await import('@formatjs/intl-pluralrules/locale-data/nl');
        await import('@formatjs/intl-relativetimeformat/locale-data/nl');
        await import('@formatjs/intl-numberformat/locale-data/nl');
        await import('@formatjs/intl-datetimeformat/locale-data/nl');
        break;
    case 'ja':
        await import('@formatjs/intl-pluralrules/locale-data/ja');
        await import('@formatjs/intl-relativetimeformat/locale-data/ja');
        await import('@formatjs/intl-numberformat/locale-data/ja');
        await import('@formatjs/intl-datetimeformat/locale-data/ja');
        break;
    case 'nb':
        await import('@formatjs/intl-pluralrules/locale-data/nb');
        await import('@formatjs/intl-relativetimeformat/locale-data/nb');
        await import('@formatjs/intl-numberformat/locale-data/nb');
        await import('@formatjs/intl-datetimeformat/locale-data/nb');
        break;
    case 'nn':
        await import('@formatjs/intl-pluralrules/locale-data/nn');
        await import('@formatjs/intl-relativetimeformat/locale-data/nn');
        await import('@formatjs/intl-numberformat/locale-data/nn');
        await import('@formatjs/intl-datetimeformat/locale-data/nn');
        break;
    case 'or':
        await import('@formatjs/intl-pluralrules/locale-data/or');
        await import('@formatjs/intl-relativetimeformat/locale-data/or');
        await import('@formatjs/intl-numberformat/locale-data/or');
        await import('@formatjs/intl-datetimeformat/locale-data/or');
        break;
    case 'uz':
        await import('@formatjs/intl-pluralrules/locale-data/uz');
        await import('@formatjs/intl-relativetimeformat/locale-data/uz');
        await import('@formatjs/intl-numberformat/locale-data/uz');
        await import('@formatjs/intl-datetimeformat/locale-data/uz');
        break;
    case 'th':
        await import('@formatjs/intl-pluralrules/locale-data/th');
        await import('@formatjs/intl-relativetimeformat/locale-data/th');
        await import('@formatjs/intl-numberformat/locale-data/th');
        await import('@formatjs/intl-datetimeformat/locale-data/th');
        break;
    case 'km':
        await import('@formatjs/intl-pluralrules/locale-data/km');
        await import('@formatjs/intl-relativetimeformat/locale-data/km');
        await import('@formatjs/intl-numberformat/locale-data/km');
        await import('@formatjs/intl-datetimeformat/locale-data/km');
        break;
    case 'pl':
        await import('@formatjs/intl-pluralrules/locale-data/pl');
        await import('@formatjs/intl-relativetimeformat/locale-data/pl');
        await import('@formatjs/intl-numberformat/locale-data/pl');
        await import('@formatjs/intl-datetimeformat/locale-data/pl');
        break;
    case 'pt':
        await import('@formatjs/intl-pluralrules/locale-data/pt');
        await import('@formatjs/intl-relativetimeformat/locale-data/pt');
        await import('@formatjs/intl-numberformat/locale-data/pt');
        await import('@formatjs/intl-datetimeformat/locale-data/pt');
        break;
    case 'ro':
        await import('@formatjs/intl-pluralrules/locale-data/ro');
        await import('@formatjs/intl-relativetimeformat/locale-data/ro');
        await import('@formatjs/intl-numberformat/locale-data/ro');
        await import('@formatjs/intl-datetimeformat/locale-data/ro');
        break;
    case 'ru':
        await import('@formatjs/intl-pluralrules/locale-data/ru');
        await import('@formatjs/intl-relativetimeformat/locale-data/ru');
        await import('@formatjs/intl-numberformat/locale-data/ru');
        await import('@formatjs/intl-datetimeformat/locale-data/ru');
        break;
    case 'nso':
        await import('@formatjs/intl-pluralrules/locale-data/nso');
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-numberformat/locale-data/en');
        await import('@formatjs/intl-datetimeformat/locale-data/en');
        break;
    case 'tn':
        await import('@formatjs/intl-pluralrules/locale-data/tn');
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-numberformat/locale-data/en');
        await import('@formatjs/intl-datetimeformat/locale-data/en');
        break;
    case 'sk':
        await import('@formatjs/intl-pluralrules/locale-data/sk');
        await import('@formatjs/intl-relativetimeformat/locale-data/sk');
        await import('@formatjs/intl-numberformat/locale-data/sk');
        await import('@formatjs/intl-datetimeformat/locale-data/sk');
        break;
    case 'sl':
        await import('@formatjs/intl-pluralrules/locale-data/sl');
        await import('@formatjs/intl-relativetimeformat/locale-data/sl');
        await import('@formatjs/intl-numberformat/locale-data/sl');
        await import('@formatjs/intl-datetimeformat/locale-data/sl');
        break;
    case 'sr':
        await import('@formatjs/intl-pluralrules/locale-data/sr');
        await import('@formatjs/intl-relativetimeformat/locale-data/sr');
        await import('@formatjs/intl-numberformat/locale-data/sr');
        await import('@formatjs/intl-datetimeformat/locale-data/sr');
        break;
    case 'fi':
        await import('@formatjs/intl-pluralrules/locale-data/fi');
        await import('@formatjs/intl-relativetimeformat/locale-data/fi');
        await import('@formatjs/intl-numberformat/locale-data/fi');
        await import('@formatjs/intl-datetimeformat/locale-data/fi');
        break;
    case 'sv':
        await import('@formatjs/intl-pluralrules/locale-data/sv');
        await import('@formatjs/intl-relativetimeformat/locale-data/sv');
        await import('@formatjs/intl-numberformat/locale-data/sv');
        await import('@formatjs/intl-datetimeformat/locale-data/sv');
        break;
    case 'vi':
        await import('@formatjs/intl-pluralrules/locale-data/vi');
        await import('@formatjs/intl-relativetimeformat/locale-data/vi');
        await import('@formatjs/intl-numberformat/locale-data/vi');
        await import('@formatjs/intl-datetimeformat/locale-data/vi');
        break;
    case 'tr':
        await import('@formatjs/intl-pluralrules/locale-data/tr');
        await import('@formatjs/intl-relativetimeformat/locale-data/tr');
        await import('@formatjs/intl-numberformat/locale-data/tr');
        await import('@formatjs/intl-datetimeformat/locale-data/tr');
        break;
    case 'uk':
        await import('@formatjs/intl-pluralrules/locale-data/uk');
        await import('@formatjs/intl-relativetimeformat/locale-data/uk');
        await import('@formatjs/intl-numberformat/locale-data/uk');
        await import('@formatjs/intl-datetimeformat/locale-data/uk');
        break;
    case 'zh':
        await import('@formatjs/intl-pluralrules/locale-data/zh');
        await import('@formatjs/intl-relativetimeformat/locale-data/zh');
        await import('@formatjs/intl-numberformat/locale-data/zh');
        await import('@formatjs/intl-datetimeformat/locale-data/zh');
        break;
    default:
        await import('@formatjs/intl-pluralrules/locale-data/en');
        await import('@formatjs/intl-relativetimeformat/locale-data/en');
        await import('@formatjs/intl-numberformat/locale-data/en');
        await import('@formatjs/intl-datetimeformat/locale-data/en');
        break;
    }
};

export default intlPolyfill;
