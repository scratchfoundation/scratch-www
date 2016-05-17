(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactIntl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
'use strict';

exports = module.exports = require('./lib/memoizer')['default'];
exports['default'] = exports;

},{"./lib/memoizer":4}],3:[function(require,module,exports){
"use strict";

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop = Object.prototype.hasOwnProperty;

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};
exports.defineProperty = defineProperty, exports.objCreate = objCreate;


},{}],4:[function(require,module,exports){
"use strict";
var src$es5$$ = require("./es5");
exports["default"] = createFormatCache;

// -----------------------------------------------------------------------------

function createFormatCache(FormatConstructor) {
    var cache = src$es5$$.objCreate(null);

    return function () {
        var args    = Array.prototype.slice.call(arguments);
        var cacheId = getCacheId(args);
        var format  = cacheId && cache[cacheId];

        if (!format) {
            format = src$es5$$.objCreate(FormatConstructor.prototype);
            FormatConstructor.apply(format, args);

            if (cacheId) {
                cache[cacheId] = format;
            }
        }

        return format;
    };
}

// -- Utilities ----------------------------------------------------------------

function getCacheId(inputs) {
    // When JSON is not available in the runtime, we will not create a cache id.
    if (typeof JSON === 'undefined') { return; }

    var cacheId = [];

    var i, len, input;

    for (i = 0, len = inputs.length; i < len; i += 1) {
        input = inputs[i];

        if (input && typeof input === 'object') {
            cacheId.push(orderedProps(input));
        } else {
            cacheId.push(input);
        }
    }

    return JSON.stringify(cacheId);
}

function orderedProps(obj) {
    var props = [],
        keys  = [];

    var key, i, len, prop;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    var orderedKeys = keys.sort();

    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
        key  = orderedKeys[i];
        prop = {};

        prop[key] = obj[key];
        props[i]  = prop;
    }

    return props;
}


},{"./es5":3}],5:[function(require,module,exports){
/* jshint node:true */

'use strict';

var IntlMessageFormat = require('./lib/main')['default'];

// Add all locale data to `IntlMessageFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.
require('./lib/locales');

// Re-export `IntlMessageFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.
exports = module.exports = IntlMessageFormat;
exports['default'] = exports;

},{"./lib/locales":1,"./lib/main":10}],6:[function(require,module,exports){
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

"use strict";
exports["default"] = Compiler;

function Compiler(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern  = [];

    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
        element = elements[i];

        switch (element.type) {
            case 'messageTextElement':
                pattern.push(this.compileMessageText(element));
                break;

            case 'argumentElement':
                pattern.push(this.compileArgument(element));
                break;

            default:
                throw new Error('Message element does not have a valid type');
        }
    }

    return pattern;
};

Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
        // Create a cache a NumberFormat instance that can be reused for any
        // PluralOffsetString instance in this message.
        if (!this.pluralNumberFormat) {
            this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
        }

        return new PluralOffsetString(
                this.currentPlural.id,
                this.currentPlural.format.offset,
                this.pluralNumberFormat,
                element.value);
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
};

Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
        return new StringFormat(element.id);
    }

    var formats  = this.formats,
        locales  = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
        case 'numberFormat':
            options = formats.number[format.style];
            return {
                id    : element.id,
                format: new Intl.NumberFormat(locales, options).format
            };

        case 'dateFormat':
            options = formats.date[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'timeFormat':
            options = formats.time[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'pluralFormat':
            options = this.compileOptions(element);
            return new PluralFormat(
                element.id, format.ordinal, format.offset, options, pluralFn
            );

        case 'selectFormat':
            options = this.compileOptions(element);
            return new SelectFormat(element.id, options);

        default:
            throw new Error('Message element does not have a valid format type');
    }
};

Compiler.prototype.compileOptions = function (element) {
    var format      = element.format,
        options     = format.options,
        optionsHash = {};

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;

    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
        option = options[i];

        // Compile the sub-pattern and save it under the options's selector.
        optionsHash[option.selector] = this.compileMessage(option.value);
    }

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();

    return optionsHash;
};

// -- Compiler Helper Classes --------------------------------------------------

function StringFormat(id) {
    this.id = id;
}

StringFormat.prototype.format = function (value) {
    if (!value) {
        return '';
    }

    return typeof value === 'string' ? value : String(value);
};

function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id         = id;
    this.useOrdinal = useOrdinal;
    this.offset     = offset;
    this.options    = options;
    this.pluralFn   = pluralFn;
}

PluralFormat.prototype.getOption = function (value) {
    var options = this.options;

    var option = options['=' + value] ||
            options[this.pluralFn(value - this.offset, this.useOrdinal)];

    return option || options.other;
};

function PluralOffsetString(id, offset, numberFormat, string) {
    this.id           = id;
    this.offset       = offset;
    this.numberFormat = numberFormat;
    this.string       = string;
}

PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);

    return this.string
            .replace(/(^|[^\\])#/g, '$1' + number)
            .replace(/\\#/g, '#');
};

function SelectFormat(id, options) {
    this.id      = id;
    this.options = options;
}

SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
};


},{}],7:[function(require,module,exports){
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

"use strict";
var src$utils$$ = require("./utils"), src$es5$$ = require("./es5"), src$compiler$$ = require("./compiler"), intl$messageformat$parser$$ = require("intl-messageformat-parser");
exports["default"] = MessageFormat;

// -- MessageFormat --------------------------------------------------------

function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ?
            MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    formats = this._mergeFormats(MessageFormat.formats, formats);

    // Defined first because it's used to build the format pattern.
    src$es5$$.defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

    // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.
    var pluralFn = this._findPluralRuleFunction(this._locale);
    var pattern  = this._compilePattern(ast, locales, formats, pluralFn);

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var messageFormat = this;
    this.format = function (values) {
        return messageFormat._format(pattern, values);
    };
}

// Default format options used as the prototype of the `formats` provided to the
// constructor. These are used when constructing the internal Intl.NumberFormat
// and Intl.DateTimeFormat instances.
src$es5$$.defineProperty(MessageFormat, 'formats', {
    enumerable: true,

    value: {
        number: {
            'currency': {
                style: 'currency'
            },

            'percent': {
                style: 'percent'
            }
        },

        date: {
            'short': {
                month: 'numeric',
                day  : 'numeric',
                year : '2-digit'
            },

            'medium': {
                month: 'short',
                day  : 'numeric',
                year : 'numeric'
            },

            'long': {
                month: 'long',
                day  : 'numeric',
                year : 'numeric'
            },

            'full': {
                weekday: 'long',
                month  : 'long',
                day    : 'numeric',
                year   : 'numeric'
            }
        },

        time: {
            'short': {
                hour  : 'numeric',
                minute: 'numeric'
            },

            'medium':  {
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },

            'long': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            },

            'full': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            }
        }
    }
});

// Define internal private properties for dealing with locale data.
src$es5$$.defineProperty(MessageFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
src$es5$$.defineProperty(MessageFormat, '__parse', {value: intl$messageformat$parser$$["default"].parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
        locale: this._locale
    };
};

MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
    return compiler.compile(ast);
};

MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.
    while (data) {
        if (data.pluralRuleFunction) {
            return data.pluralRuleFunction;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlMessageFormat is missing a ' +
        '`pluralRuleFunction` for :' + locale
    );
};

MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i, len, part, id, value;

    for (i = 0, len = pattern.length; i < len; i += 1) {
        part = pattern[i];

        // Exist early for string parts.
        if (typeof part === 'string') {
            result += part;
            continue;
        }

        id = part.id;

        // Enforce that all required values are provided by the caller.
        if (!(values && src$utils$$.hop.call(values, id))) {
            throw new Error('A value must be provided for: ' + id);
        }

        value = values[id];

        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (part.options) {
            result += this._format(part.getOption(value), values);
        } else {
            result += part.format(value);
        }
    }

    return result;
};

MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type, mergedType;

    for (type in defaults) {
        if (!src$utils$$.hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

        if (formats && src$utils$$.hop.call(formats, type)) {
            src$utils$$.extend(mergedType, formats[type]);
        }
    }

    return mergedFormats;
};

MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(MessageFormat.defaultLocale);

    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlMessageFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};


},{"./compiler":6,"./es5":9,"./utils":11,"intl-messageformat-parser":12}],8:[function(require,module,exports){
// GENERATED FILE
"use strict";
exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};


},{}],9:[function(require,module,exports){
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

"use strict";
var src$utils$$ = require("./utils");

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (src$utils$$.hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};
exports.defineProperty = defineProperty, exports.objCreate = objCreate;


},{"./utils":11}],10:[function(require,module,exports){
/* jslint esnext: true */

"use strict";
var src$core$$ = require("./core"), src$en$$ = require("./en");

src$core$$["default"].__addLocaleData(src$en$$["default"]);
src$core$$["default"].defaultLocale = 'en';

exports["default"] = src$core$$["default"];


},{"./core":7,"./en":8}],11:[function(require,module,exports){
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

"use strict";
exports.extend = extend;
var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
    var sources = Array.prototype.slice.call(arguments, 1),
        i, len, source, key;

    for (i = 0, len = sources.length; i < len; i += 1) {
        source = sources[i];
        if (!source) { continue; }

        for (key in source) {
            if (hop.call(source, key)) {
                obj[key] = source[key];
            }
        }
    }

    return obj;
}
exports.hop = hop;


},{}],12:[function(require,module,exports){
'use strict';

exports = module.exports = require('./lib/parser')['default'];
exports['default'] = exports;

},{"./lib/parser":13}],13:[function(require,module,exports){
"use strict";

exports["default"] = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = function(elements) {
                return {
                    type    : 'messageFormatPattern',
                    elements: elements
                };
            },
        peg$c2 = peg$FAILED,
        peg$c3 = function(text) {
                var string = '',
                    i, j, outerLen, inner, innerLen;

                for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
                    inner = text[i];

                    for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
                        string += inner[j];
                    }
                }

                return string;
            },
        peg$c4 = function(messageText) {
                return {
                    type : 'messageTextElement',
                    value: messageText
                };
            },
        peg$c5 = /^[^ \t\n\r,.+={}#]/,
        peg$c6 = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" },
        peg$c7 = "{",
        peg$c8 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c9 = null,
        peg$c10 = ",",
        peg$c11 = { type: "literal", value: ",", description: "\",\"" },
        peg$c12 = "}",
        peg$c13 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c14 = function(id, format) {
                return {
                    type  : 'argumentElement',
                    id    : id,
                    format: format && format[2]
                };
            },
        peg$c15 = "number",
        peg$c16 = { type: "literal", value: "number", description: "\"number\"" },
        peg$c17 = "date",
        peg$c18 = { type: "literal", value: "date", description: "\"date\"" },
        peg$c19 = "time",
        peg$c20 = { type: "literal", value: "time", description: "\"time\"" },
        peg$c21 = function(type, style) {
                return {
                    type : type + 'Format',
                    style: style && style[2]
                };
            },
        peg$c22 = "plural",
        peg$c23 = { type: "literal", value: "plural", description: "\"plural\"" },
        peg$c24 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: false,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options
                };
            },
        peg$c25 = "selectordinal",
        peg$c26 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
        peg$c27 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: true,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options
                }
            },
        peg$c28 = "select",
        peg$c29 = { type: "literal", value: "select", description: "\"select\"" },
        peg$c30 = function(options) {
                return {
                    type   : 'selectFormat',
                    options: options
                };
            },
        peg$c31 = "=",
        peg$c32 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c33 = function(selector, pattern) {
                return {
                    type    : 'optionalFormatPattern',
                    selector: selector,
                    value   : pattern
                };
            },
        peg$c34 = "offset:",
        peg$c35 = { type: "literal", value: "offset:", description: "\"offset:\"" },
        peg$c36 = function(number) {
                return number;
            },
        peg$c37 = function(offset, options) {
                return {
                    type   : 'pluralFormat',
                    offset : offset,
                    options: options
                };
            },
        peg$c38 = { type: "other", description: "whitespace" },
        peg$c39 = /^[ \t\n\r]/,
        peg$c40 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
        peg$c41 = { type: "other", description: "optionalWhitespace" },
        peg$c42 = /^[0-9]/,
        peg$c43 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c44 = /^[0-9a-f]/i,
        peg$c45 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
        peg$c46 = "0",
        peg$c47 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c48 = /^[1-9]/,
        peg$c49 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c50 = function(digits) {
            return parseInt(digits, 10);
        },
        peg$c51 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c52 = { type: "class", value: "[^{}\\\\\\0-\\x1F \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F \\t\\n\\r]" },
        peg$c53 = "\\\\",
        peg$c54 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
        peg$c55 = function() { return '\\'; },
        peg$c56 = "\\#",
        peg$c57 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
        peg$c58 = function() { return '\\#'; },
        peg$c59 = "\\{",
        peg$c60 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
        peg$c61 = function() { return '\u007B'; },
        peg$c62 = "\\}",
        peg$c63 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
        peg$c64 = function() { return '\u007D'; },
        peg$c65 = "\\u",
        peg$c66 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c67 = function(digits) {
                return String.fromCharCode(parseInt(digits, 16));
            },
        peg$c68 = function(chars) { return chars.join(''); },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsemessageFormatPattern();

      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0;

      s0 = peg$parsemessageTextElement();
      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsechars();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c2;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c3(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsemessageTextElement() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsemessageText();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c4(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseargument() {
      var s0, s1, s2;

      s0 = peg$parsenumber();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c5.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c5.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
          }
        } else {
          s1 = peg$c2;
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c7;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseargument();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s6 = peg$c10;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseelementFormat();
                  if (s8 !== peg$FAILED) {
                    s6 = [s6, s7, s8];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c2;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c2;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c2;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c9;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c12;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c13); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c14(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0;

      s0 = peg$parsesimpleFormat();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepluralFormat();
        if (s0 === peg$FAILED) {
          s0 = peg$parseselectOrdinalFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselectFormat();
          }
        }
      }

      return s0;
    }

    function peg$parsesimpleFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c17) {
          s1 = peg$c17;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c18); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c19) {
            s1 = peg$c19;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c20); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c10;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsechars();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c9;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c24(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselectOrdinalFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 13) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 13;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c27(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselectFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c28) {
        s1 = peg$c28;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseoptionalFormatPattern();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseoptionalFormatPattern();
                }
              } else {
                s5 = peg$c2;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c30(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c31;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$parsechars();
      }

      return s0;
    }

    function peg$parseoptionalFormatPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselector();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c12;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c13); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c33(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c34) {
        s1 = peg$c34;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c36(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralStyle() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseoffset();
      if (s1 === peg$FAILED) {
        s1 = peg$c9;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseoptionalFormatPattern();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseoptionalFormatPattern();
            }
          } else {
            s3 = peg$c2;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c37(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c39.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c39.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c40); }
          }
        }
      } else {
        s0 = peg$c2;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsews();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsews();
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c42.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c44.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c46;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c48.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c49); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsedigit();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsedigit();
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c50(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      if (peg$c51.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c52); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c53) {
          s1 = peg$c53;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c54); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c55();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c56) {
            s1 = peg$c56;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c57); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c58();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c59) {
              s1 = peg$c59;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c60); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c61();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c62) {
                s1 = peg$c62;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c63); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c64();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c65) {
                  s1 = peg$c65;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c66); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  s4 = peg$parsehexDigit();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsehexDigit();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsehexDigit();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parsehexDigit();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$c2;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$c2;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$c2;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c2;
                  }
                  if (s3 !== peg$FAILED) {
                    s3 = input.substring(s2, peg$currPos);
                  }
                  s2 = s3;
                  if (s2 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c67(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c68(s1);
      }
      s0 = s1;

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();


},{}],14:[function(require,module,exports){
/* jshint node:true */

'use strict';

var IntlRelativeFormat = require('./lib/main')['default'];

// Add all locale data to `IntlRelativeFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.
require('./lib/locales');

// Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.
exports = module.exports = IntlRelativeFormat;
exports['default'] = exports;

},{"./lib/locales":1,"./lib/main":19}],15:[function(require,module,exports){
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

"use strict";
var intl$messageformat$$ = require("intl-messageformat"), src$diff$$ = require("./diff"), src$es5$$ = require("./es5");
exports["default"] = RelativeFormat;

// -----------------------------------------------------------------------------

var FIELDS = ['second', 'minute', 'hour', 'day', 'month', 'year'];
var STYLES = ['best fit', 'numeric'];

// -- RelativeFormat -----------------------------------------------------------

function RelativeFormat(locales, options) {
    options = options || {};

    // Make a copy of `locales` if it's an array, so that it doesn't change
    // since it's used lazily.
    if (src$es5$$.isArray(locales)) {
        locales = locales.concat();
    }

    src$es5$$.defineProperty(this, '_locale', {value: this._resolveLocale(locales)});
    src$es5$$.defineProperty(this, '_options', {value: {
        style: this._resolveStyle(options.style),
        units: this._isValidUnits(options.units) && options.units
    }});

    src$es5$$.defineProperty(this, '_locales', {value: locales});
    src$es5$$.defineProperty(this, '_fields', {value: this._findFields(this._locale)});
    src$es5$$.defineProperty(this, '_messages', {value: src$es5$$.objCreate(null)});

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var relativeFormat = this;
    this.format = function format(date, options) {
        return relativeFormat._format(date, options);
    };
}

// Define internal private properties for dealing with locale data.
src$es5$$.defineProperty(RelativeFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
src$es5$$.defineProperty(RelativeFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlRelativeFormat is missing a ' +
            '`locale` property value'
        );
    }

    RelativeFormat.__localeData__[data.locale.toLowerCase()] = data;

    // Add data to IntlMessageFormat.
    intl$messageformat$$["default"].__addLocaleData(data);
}});

// Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.
src$es5$$.defineProperty(RelativeFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

// Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.
src$es5$$.defineProperty(RelativeFormat, 'thresholds', {
    enumerable: true,

    value: {
        second: 45,  // seconds to minute
        minute: 45,  // minutes to hour
        hour  : 22,  // hours to day
        day   : 26,  // days to month
        month : 11   // months to year
    }
});

RelativeFormat.prototype.resolvedOptions = function () {
    return {
        locale: this._locale,
        style : this._options.style,
        units : this._options.units
    };
};

RelativeFormat.prototype._compileMessage = function (units) {
    // `this._locales` is the original set of locales the user specified to the
    // constructor, while `this._locale` is the resolved root locale.
    var locales        = this._locales;
    var resolvedLocale = this._locale;

    var field        = this._fields[units];
    var relativeTime = field.relativeTime;
    var future       = '';
    var past         = '';
    var i;

    for (i in relativeTime.future) {
        if (relativeTime.future.hasOwnProperty(i)) {
            future += ' ' + i + ' {' +
                relativeTime.future[i].replace('{0}', '#') + '}';
        }
    }

    for (i in relativeTime.past) {
        if (relativeTime.past.hasOwnProperty(i)) {
            past += ' ' + i + ' {' +
                relativeTime.past[i].replace('{0}', '#') + '}';
        }
    }

    var message = '{when, select, future {{0, plural, ' + future + '}}' +
                                 'past {{0, plural, ' + past + '}}}';

    // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeFormat instance.
    return new intl$messageformat$$["default"](message, locales);
};

RelativeFormat.prototype._getMessage = function (units) {
    var messages = this._messages;

    // Create a new synthetic message based on the locale data from CLDR.
    if (!messages[units]) {
        messages[units] = this._compileMessage(units);
    }

    return messages[units];
};

RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
    var field = this._fields[units];

    if (field.relative) {
        return field.relative[diff];
    }
};

RelativeFormat.prototype._findFields = function (locale) {
    var localeData = RelativeFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find `fields` to return.
    while (data) {
        if (data.fields) {
            return data.fields;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlRelativeFormat is missing `fields` for :' +
        locale
    );
};

RelativeFormat.prototype._format = function (date, options) {
    var now = options && options.now !== undefined ? options.now : src$es5$$.dateNow();

    if (date === undefined) {
        date = now;
    }

    // Determine if the `date` and optional `now` values are valid, and throw a
    // similar error to what `Intl.DateTimeFormat#format()` would throw.
    if (!isFinite(now)) {
        throw new RangeError(
            'The `now` option provided to IntlRelativeFormat#format() is not ' +
            'in valid range.'
        );
    }

    if (!isFinite(date)) {
        throw new RangeError(
            'The date value provided to IntlRelativeFormat#format() is not ' +
            'in valid range.'
        );
    }

    var diffReport  = src$diff$$["default"](now, date);
    var units       = this._options.units || this._selectUnits(diffReport);
    var diffInUnits = diffReport[units];

    if (this._options.style !== 'numeric') {
        var relativeUnits = this._getRelativeUnits(diffInUnits, units);
        if (relativeUnits) {
            return relativeUnits;
        }
    }

    return this._getMessage(units).format({
        '0' : Math.abs(diffInUnits),
        when: diffInUnits < 0 ? 'past' : 'future'
    });
};

RelativeFormat.prototype._isValidUnits = function (units) {
    if (!units || src$es5$$.arrIndexOf.call(FIELDS, units) >= 0) {
        return true;
    }

    if (typeof units === 'string') {
        var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);
        if (suggestion && src$es5$$.arrIndexOf.call(FIELDS, suggestion) >= 0) {
            throw new Error(
                '"' + units + '" is not a valid IntlRelativeFormat `units` ' +
                'value, did you mean: ' + suggestion
            );
        }
    }

    throw new Error(
        '"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' +
        'must be one of: "' + FIELDS.join('", "') + '"'
    );
};

RelativeFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(RelativeFormat.defaultLocale);

    var localeData = RelativeFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlRelativeFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

RelativeFormat.prototype._resolveStyle = function (style) {
    // Default to "best fit" style.
    if (!style) {
        return STYLES[0];
    }

    if (src$es5$$.arrIndexOf.call(STYLES, style) >= 0) {
        return style;
    }

    throw new Error(
        '"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' +
        'must be one of: "' + STYLES.join('", "') + '"'
    );
};

RelativeFormat.prototype._selectUnits = function (diffReport) {
    var i, l, units;

    for (i = 0, l = FIELDS.length; i < l; i += 1) {
        units = FIELDS[i];

        if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
            break;
        }
    }

    return units;
};


},{"./diff":16,"./es5":18,"intl-messageformat":5}],16:[function(require,module,exports){
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

"use strict";

var round = Math.round;

function daysToYears(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    return days * 400 / 146097;
}

exports["default"] = function (from, to) {
    // Convert to ms timestamps.
    from = +from;
    to   = +to;

    var millisecond = round(to - from),
        second      = round(millisecond / 1000),
        minute      = round(second / 60),
        hour        = round(minute / 60),
        day         = round(hour / 24),
        week        = round(day / 7);

    var rawYears = daysToYears(day),
        month    = round(rawYears * 12),
        year     = round(rawYears);

    return {
        millisecond: millisecond,
        second     : second,
        minute     : minute,
        hour       : hour,
        day        : day,
        week       : week,
        month      : month,
        year       : year
    };
};


},{}],17:[function(require,module,exports){
// GENERATED FILE
"use strict";
exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"in {0} year","other":"in {0} years"},"past":{"one":"{0} year ago","other":"{0} years ago"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"in {0} month","other":"in {0} months"},"past":{"one":"{0} month ago","other":"{0} months ago"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"one":"in {0} hour","other":"in {0} hours"},"past":{"one":"{0} hour ago","other":"{0} hours ago"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"one":"in {0} minute","other":"in {0} minutes"},"past":{"one":"{0} minute ago","other":"{0} minutes ago"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} second","other":"in {0} seconds"},"past":{"one":"{0} second ago","other":"{0} seconds ago"}}}}};


},{}],18:[function(require,module,exports){
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

"use strict";

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
    /*jshint validthis:true */
    var arr = this;
    if (!arr.length) {
        return -1;
    }

    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
        if (arr[i] === search) {
            return i;
        }
    }

    return -1;
};

var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === '[object Array]';
};

var dateNow = Date.now || function () {
    return new Date().getTime();
};
exports.defineProperty = defineProperty, exports.objCreate = objCreate, exports.arrIndexOf = arrIndexOf, exports.isArray = isArray, exports.dateNow = dateNow;


},{}],19:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"./core":15,"./en":17,"dup":10}],20:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("development" !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],21:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _types = require('../types');

var _utils = require('../utils');

var FormattedDate = (function (_Component) {
    _inherits(FormattedDate, _Component);

    function FormattedDate(props, context) {
        _classCallCheck(this, FormattedDate);

        _Component.call(this, props, context);
        _utils.invariantIntlContext(context);
    }

    FormattedDate.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    FormattedDate.prototype.render = function render() {
        var formatDate = this.context.intl.formatDate;
        var _props = this.props;
        var value = _props.value;
        var children = _props.children;

        var formattedDate = formatDate(value, this.props);

        if (typeof children === 'function') {
            return children(formattedDate);
        }

        return _react2['default'].createElement(
            'span',
            null,
            formattedDate
        );
    };

    return FormattedDate;
})(_react.Component);

exports['default'] = FormattedDate;

FormattedDate.displayName = 'FormattedDate';

FormattedDate.contextTypes = {
    intl: _types.intlShape
};

FormattedDate.propTypes = _extends({}, _types.dateTimeFormatPropTypes, {
    value: _react.PropTypes.any.isRequired,
    format: _react.PropTypes.string,
    children: _react.PropTypes.func
});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../types":37,"../utils":38}],22:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _types = require('../types');

var _utils = require('../utils');

var FormattedHTMLMessage = (function (_Component) {
    _inherits(FormattedHTMLMessage, _Component);

    function FormattedHTMLMessage(props, context) {
        _classCallCheck(this, FormattedHTMLMessage);

        _Component.call(this, props, context);
        _utils.invariantIntlContext(context);
    }

    FormattedHTMLMessage.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        var values = this.props.values;
        var nextValues = nextProps.values;

        if (!_utils.shallowEquals(nextValues, values)) {
            return true;
        }

        // Since `values` has already been checked, we know they're not
        // different, so the current `values` are carried over so the shallow
        // equals comparison on the other props isn't affected by the `values`.
        var nextPropsToCheck = _extends({}, nextProps, {
            values: values
        });

        for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            next[_key - 1] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    };

    FormattedHTMLMessage.prototype.render = function render() {
        var formatHTMLMessage = this.context.intl.formatHTMLMessage;
        var _props = this.props;
        var id = _props.id;
        var description = _props.description;
        var defaultMessage = _props.defaultMessage;
        var rawValues = _props.values;
        var tagName = _props.tagName;
        var children = _props.children;

        var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
        var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

        if (typeof children === 'function') {
            return children(formattedHTMLMessage);
        }

        // Since the message presumably has HTML in it, we need to set
        // `innerHTML` in order for it to be rendered and not escaped by React.
        // To be safe, all string prop values were escaped when formatting the
        // message. It is assumed that the message is not UGC, and came from the
        // developer making it more like a template.
        //
        // Note: There's a perf impact of using this component since there's no
        // way for React to do its virtual DOM diffing.
        return _react.createElement(tagName, {
            dangerouslySetInnerHTML: {
                __html: formattedHTMLMessage
            }
        });
    };

    return FormattedHTMLMessage;
})(_react.Component);

exports['default'] = FormattedHTMLMessage;

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';

FormattedHTMLMessage.contextTypes = {
    intl: _types.intlShape
};

FormattedHTMLMessage.propTypes = {
    id: _react.PropTypes.string,
    description: _react.PropTypes.string,
    defaultMessage: _react.PropTypes.string,

    values: _react.PropTypes.object,
    tagName: _react.PropTypes.string,
    children: _react.PropTypes.func
};

FormattedHTMLMessage.defaultProps = {
    values: {},
    tagName: 'span'
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../types":37,"../utils":38}],23:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _intlMessageformat = require('intl-messageformat');

var _intlMessageformat2 = _interopRequireDefault(_intlMessageformat);

var _intlRelativeformat = require('intl-relativeformat');

var _intlRelativeformat2 = _interopRequireDefault(_intlRelativeformat);

var _plural = require('../plural');

var _plural2 = _interopRequireDefault(_plural);

var _intlFormatCache = require('intl-format-cache');

var _intlFormatCache2 = _interopRequireDefault(_intlFormatCache);

var _utils = require('../utils');

var _types = require('../types');

var _format = require('../format');

var format = _interopRequireWildcard(_format);

var _localeDataRegistry = require('../locale-data-registry');

var intlPropNames = Object.keys(_types.intlPropTypes);
var intlFormatPropNames = Object.keys(_types.intlFormatPropTypes);

var IntlProvider = (function (_Component) {
    _inherits(IntlProvider, _Component);

    function IntlProvider(props) {
        var _this = this;

        _classCallCheck(this, IntlProvider);

        _Component.call(this, props);

        // Used to stabilize time when performing an initial rendering so that
        // all relative times use the same reference "now" time.
        var initialNow = isFinite(props.initialNow) ? Number(props.initialNow) : Date.now();

        this.state = {
            // Creating `Intl*` formatters is expensive so these format caches
            // memoize the `Intl*` constructors and have the same lifecycle as
            // this IntlProvider instance.
            getDateTimeFormat: _intlFormatCache2['default'](Intl.DateTimeFormat),
            getNumberFormat: _intlFormatCache2['default'](Intl.NumberFormat),
            getMessageFormat: _intlFormatCache2['default'](_intlMessageformat2['default']),
            getRelativeFormat: _intlFormatCache2['default'](_intlRelativeformat2['default']),
            getPluralFormat: _intlFormatCache2['default'](_plural2['default']),

            // Wrapper to provide stable "now" time for initial render.
            now: function now() {
                return _this._didDisplay ? Date.now() : initialNow;
            }
        };
    }

    IntlProvider.prototype.getConfig = function getConfig() {
        var _this2 = this;

        var config = intlPropNames.reduce(function (config, name) {
            config[name] = _this2.props[name];
            return config;
        }, {});
        if(config.locale === 'zh-cn'||config.locale ==='zh-tw')
        {
           config.locale = 'zh';
        }
        if (!_localeDataRegistry.hasLocaleData(config.locale)) {
            var _config = config;
            var locale = _config.locale;
            var defaultLocale = _config.defaultLocale;
            var defaultFormats = _config.defaultFormats;

            if ("development" !== 'production') {
                console.error('[React Intl] Missing locale data for: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'));
            }

            // Since there's no registered locale data for `locale`, this will
            // fallback to the `defaultLocale` to make sure things can render.
            // The `messages` are overridden to the `defaultProps` empty object
            // to maintain referential equality across re-renders. It's assumed
            // each <FormattedMessage> contains a `defaultMessage` prop.
            config = _extends({}, config, {
                locale: defaultLocale,
                formats: defaultFormats,
                messages: IntlProvider.defaultProps.messages
            });
        }

        return config;
    };

    IntlProvider.prototype.getBoundFormatFns = function getBoundFormatFns(config, state) {
        return intlFormatPropNames.reduce(function (boundFormatFns, name) {
            boundFormatFns[name] = format[name].bind(null, config, state);
            return boundFormatFns;
        }, {});
    };

    IntlProvider.prototype.getChildContext = function getChildContext() {
        var config = this.getConfig();

        // Bind intl factories and current config to the format functions.
        var boundFormatFns = this.getBoundFormatFns(config, this.state);

        return {
            intl: _extends({}, config, boundFormatFns, {
                now: this.state.now
            })
        };
    };

    IntlProvider.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    IntlProvider.prototype.componentDidMount = function componentDidMount() {
        this._didDisplay = true;
    };

    IntlProvider.prototype.render = function render() {
        return _react.Children.only(this.props.children);
    };

    return IntlProvider;
})(_react.Component);

exports['default'] = IntlProvider;

IntlProvider.displayName = 'IntlProvider';

IntlProvider.childContextTypes = {
    intl: _types.intlShape.isRequired
};

IntlProvider.propTypes = _extends({}, _types.intlPropTypes, {
    children: _react.PropTypes.element.isRequired,
    initialNow: _react.PropTypes.any
});

IntlProvider.defaultProps = {
    formats: {},
    messages: {},

    defaultLocale: 'en',
    defaultFormats: {}
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../format":30,"../locale-data-registry":32,"../plural":34,"../types":37,"../utils":38,"intl-format-cache":2,"intl-messageformat":5,"intl-relativeformat":14}],24:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _types = require('../types');

var _utils = require('../utils');

var FormattedMessage = (function (_Component) {
    _inherits(FormattedMessage, _Component);

    function FormattedMessage(props, context) {
        _classCallCheck(this, FormattedMessage);

        _Component.call(this, props, context);
        _utils.invariantIntlContext(context);
    }

    FormattedMessage.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        var values = this.props.values;
        var nextValues = nextProps.values;

        if (!_utils.shallowEquals(nextValues, values)) {
            return true;
        }

        // Since `values` has already been checked, we know they're not
        // different, so the current `values` are carried over so the shallow
        // equals comparison on the other props isn't affected by the `values`.
        var nextPropsToCheck = _extends({}, nextProps, {
            values: values
        });

        for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            next[_key - 1] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    };

    FormattedMessage.prototype.render = function render() {
        var formatMessage = this.context.intl.formatMessage;
        var _props = this.props;
        var id = _props.id;
        var description = _props.description;
        var defaultMessage = _props.defaultMessage;
        var values = _props.values;
        var tagName = _props.tagName;
        var children = _props.children;

        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);
        var tokenRegexp = new RegExp('(@__ELEMENT-' + uid + '-\\d+__@)', 'g');

        var generateToken = (function () {
            var counter = 0;
            return function () {
                return '@__ELEMENT-' + uid + '-' + (counter += 1) + '__@';
            };
        })();

        var tokenizedValues = {};
        var elements = {};

        // Iterates over the `props` to keep track of any React Element values
        // so they can be represented by the `token` as a placeholder when the
        // `message` is formatted. This allows the formatted message to then be
        // broken-up into parts with references to the React Elements inserted
        // back in.
        Object.keys(values).forEach(function (name) {
            var value = values[name];

            if (_react.isValidElement(value)) {
                var token = generateToken();
                tokenizedValues[name] = token;
                elements[token] = value;
            } else {
                tokenizedValues[name] = value;
            }
        });

        var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
        var formattedMessage = formatMessage(descriptor, tokenizedValues);

        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This approach
        // allows messages to render with React Elements while keeping React's
        // virtual diffing working properly.
        var nodes = formattedMessage.split(tokenRegexp).filter(function (part) {
            return !!part;
        }).map(function (part) {
            return elements[part] || part;
        });

        if (typeof children === 'function') {
            return children.apply(undefined, _toConsumableArray(nodes));
        }

        return _react.createElement.apply(undefined, [tagName, null].concat(_toConsumableArray(nodes)));
    };

    return FormattedMessage;
})(_react.Component);

exports['default'] = FormattedMessage;

FormattedMessage.displayName = 'FormattedMessage';

FormattedMessage.contextTypes = {
    intl: _types.intlShape
};

FormattedMessage.propTypes = {
    id: _react.PropTypes.string.isRequired,
    description: _react.PropTypes.string,
    defaultMessage: _react.PropTypes.string,

    values: _react.PropTypes.object,
    tagName: _react.PropTypes.string,
    children: _react.PropTypes.func
};

FormattedMessage.defaultProps = {
    values: {},
    tagName: 'span'
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../types":37,"../utils":38}],25:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _types = require('../types');

var _utils = require('../utils');

var FormattedNumber = (function (_Component) {
    _inherits(FormattedNumber, _Component);

    function FormattedNumber(props, context) {
        _classCallCheck(this, FormattedNumber);

        _Component.call(this, props, context);
        _utils.invariantIntlContext(context);
    }

    FormattedNumber.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    FormattedNumber.prototype.render = function render() {
        var formatNumber = this.context.intl.formatNumber;
        var _props = this.props;
        var value = _props.value;
        var children = _props.children;

        var formattedNumber = formatNumber(value, this.props);

        if (typeof children === 'function') {
            return children(formattedNumber);
        }

        return _react2['default'].createElement(
            'span',
            null,
            formattedNumber
        );
    };

    return FormattedNumber;
})(_react.Component);

exports['default'] = FormattedNumber;

FormattedNumber.displayName = 'FormattedNumber';

FormattedNumber.contextTypes = {
    intl: _types.intlShape
};

FormattedNumber.propTypes = _extends({}, _types.numberFormatPropTypes, {
    value: _react.PropTypes.any.isRequired,
    format: _react.PropTypes.string,
    children: _react.PropTypes.func
});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../types":37,"../utils":38}],26:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _types = require('../types');

var _utils = require('../utils');

var FormattedPlural = (function (_Component) {
    _inherits(FormattedPlural, _Component);

    function FormattedPlural(props, context) {
        _classCallCheck(this, FormattedPlural);

        _Component.call(this, props, context);
        _utils.invariantIntlContext(context);
    }

    FormattedPlural.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    FormattedPlural.prototype.render = function render() {
        var formatPlural = this.context.intl.formatPlural;
        var _props = this.props;
        var value = _props.value;
        var other = _props.other;
        var children = _props.children;

        var pluralCategory = formatPlural(value, this.props);
        var formattedPlural = this.props[pluralCategory] || other;

        if (typeof children === 'function') {
            return children(formattedPlural);
        }

        return _react2['default'].createElement(
            'span',
            null,
            formattedPlural
        );
    };

    return FormattedPlural;
})(_react.Component);

exports['default'] = FormattedPlural;

FormattedPlural.displayName = 'FormattedPlural';

FormattedPlural.contextTypes = {
    intl: _types.intlShape
};

FormattedPlural.propTypes = _extends({}, _types.pluralFormatPropTypes, {
    value: _react.PropTypes.any.isRequired,

    other: _react.PropTypes.node.isRequired,
    zero: _react.PropTypes.node,
    one: _react.PropTypes.node,
    two: _react.PropTypes.node,
    few: _react.PropTypes.node,
    many: _react.PropTypes.node,

    children: _react.PropTypes.func
});

FormattedPlural.defaultProps = {
    style: 'cardinal'
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../types":37,"../utils":38}],27:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _types = require('../types');

var _utils = require('../utils');

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24;

// The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout
var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
    var absDelta = Math.abs(delta);

    if (absDelta < MINUTE) {
        return 'second';
    }

    if (absDelta < HOUR) {
        return 'minute';
    }

    if (absDelta < DAY) {
        return 'hour';
    }

    // The maximum scheduled delay will be measured in days since the maximum
    // timer delay is less than the number of milliseconds in 25 days.
    return 'day';
}

function getUnitDelay(units) {
    switch (units) {
        case 'second':
            return SECOND;
        case 'minute':
            return MINUTE;
        case 'hour':
            return HOUR;
        case 'day':
            return DAY;
        default:
            return MAX_TIMER_DELAY;
    }
}

var FormattedRelative = (function (_Component) {
    _inherits(FormattedRelative, _Component);

    function FormattedRelative(props, context) {
        _classCallCheck(this, FormattedRelative);

        _Component.call(this, props, context);
        _utils.invariantIntlContext(context);

        var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now();

        // `now` is stored as state so that `render()` remains a function of
        // props + state, instead of accessing `Date.now()` inside `render()`.
        this.state = { now: now };
    }

    FormattedRelative.prototype.scheduleNextUpdate = function scheduleNextUpdate(props, state) {
        var _this = this;

        var updateInterval = props.updateInterval;

        // If the `updateInterval` is falsy, including `0`, then auto updates
        // have been turned off, so we bail and skip scheduling an update.
        if (!updateInterval) {
            return;
        }

        var delta = Number(props.value) - state.now;
        var units = props.units || selectUnits(delta);

        var unitDelay = getUnitDelay(units);
        var unitRemainder = Math.abs(delta % unitDelay);

        // We want the largest possible timer delay which will still display
        // accurate information while reducing unnecessary re-renders. The delay
        // should be until the next "interesting" moment, like a tick from
        // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.
        var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);

        clearTimeout(this._timer);

        this._timer = setTimeout(function () {
            _this.setState({ now: _this.context.intl.now() });
        }, delay);
    };

    FormattedRelative.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    FormattedRelative.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
        this.scheduleNextUpdate(nextProps, nextState);
    };

    FormattedRelative.prototype.componentDidMount = function componentDidMount() {
        this.scheduleNextUpdate(this.props, this.state);
    };

    FormattedRelative.prototype.componentWillUnmount = function componentWillUnmount() {
        clearTimeout(this._timer);
    };

    FormattedRelative.prototype.render = function render() {
        var formatRelative = this.context.intl.formatRelative;
        var _props = this.props;
        var value = _props.value;
        var children = _props.children;

        var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

        if (typeof children === 'function') {
            return children(formattedRelative);
        }

        return _react2['default'].createElement(
            'span',
            null,
            formattedRelative
        );
    };

    return FormattedRelative;
})(_react.Component);

exports['default'] = FormattedRelative;

FormattedRelative.displayName = 'FormattedRelative';

FormattedRelative.contextTypes = {
    intl: _types.intlShape
};

FormattedRelative.propTypes = _extends({}, _types.relativeFormatPropTypes, {
    value: _react.PropTypes.any.isRequired,
    format: _react.PropTypes.string,
    updateInterval: _react.PropTypes.number,
    initialNow: _react.PropTypes.any,
    children: _react.PropTypes.func
});

FormattedRelative.defaultProps = {
    updateInterval: 1000 * 10
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../types":37,"../utils":38}],28:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _types = require('../types');

var _utils = require('../utils');

var FormattedTime = (function (_Component) {
    _inherits(FormattedTime, _Component);

    function FormattedTime(props, context) {
        _classCallCheck(this, FormattedTime);

        _Component.call(this, props, context);
        _utils.invariantIntlContext(context);
    }

    FormattedTime.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    FormattedTime.prototype.render = function render() {
        var formatTime = this.context.intl.formatTime;
        var _props = this.props;
        var value = _props.value;
        var children = _props.children;

        var formattedTime = formatTime(value, this.props);

        if (typeof children === 'function') {
            return children(formattedTime);
        }

        return _react2['default'].createElement(
            'span',
            null,
            formattedTime
        );
    };

    return FormattedTime;
})(_react.Component);

exports['default'] = FormattedTime;

FormattedTime.displayName = 'FormattedTime';

FormattedTime.contextTypes = {
    intl: _types.intlShape
};

FormattedTime.propTypes = _extends({}, _types.dateTimeFormatPropTypes, {
    value: _react.PropTypes.any.isRequired,
    format: _react.PropTypes.string,
    children: _react.PropTypes.func
});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../types":37,"../utils":38}],29:[function(require,module,exports){
// GENERATED FILE
"use strict";

exports.__esModule = true;
exports["default"] = { "locale": "en", "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";return n == 1 && v0 ? "one" : "other";
  }, "fields": { "year": { "displayName": "Year", "relative": { "0": "this year", "1": "next year", "-1": "last year" }, "relativeTime": { "future": { "one": "in {0} year", "other": "in {0} years" }, "past": { "one": "{0} year ago", "other": "{0} years ago" } } }, "month": { "displayName": "Month", "relative": { "0": "this month", "1": "next month", "-1": "last month" }, "relativeTime": { "future": { "one": "in {0} month", "other": "in {0} months" }, "past": { "one": "{0} month ago", "other": "{0} months ago" } } }, "day": { "displayName": "Day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } } }, "hour": { "displayName": "Hour", "relativeTime": { "future": { "one": "in {0} hour", "other": "in {0} hours" }, "past": { "one": "{0} hour ago", "other": "{0} hours ago" } } }, "minute": { "displayName": "Minute", "relativeTime": { "future": { "one": "in {0} minute", "other": "in {0} minutes" }, "past": { "one": "{0} minute ago", "other": "{0} minutes ago" } } }, "second": { "displayName": "Second", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} second", "other": "in {0} seconds" }, "past": { "one": "{0} second ago", "other": "{0} seconds ago" } } } } };
module.exports = exports["default"];

},{}],30:[function(require,module,exports){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;
exports.formatDate = formatDate;
exports.formatTime = formatTime;
exports.formatRelative = formatRelative;
exports.formatNumber = formatNumber;
exports.formatPlural = formatPlural;
exports.formatMessage = formatMessage;
exports.formatHTMLMessage = formatHTMLMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _types = require('./types');

var _utils = require('./utils');

var DATE_TIME_FORMAT_OPTIONS = Object.keys(_types.dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(_types.numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(_types.relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(_types.pluralFormatPropTypes);

function filterFormatOptions(whitelist, obj) {
    var defaults = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return whitelist.reduce(function (opts, name) {
        if (obj.hasOwnProperty(name)) {
            opts[name] = obj[name];
        } else if (defaults.hasOwnProperty(name)) {
            opts[name] = defaults[name];
        }

        return opts;
    }, {});
}

function getNamedFormat(formats, type, name) {
    var format = formats && formats[type] && formats[type][name];
    if (format) {
        return format;
    }

    if ("development" !== 'production') {
        console.error('[React Intl] No ' + type + ' format named: ' + name);
    }
}

function formatDate(config, state, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var format = options.format;

    var date = new Date(value);
    var defaults = format && getNamedFormat(formats, 'date', format);

    var filteredOptions = filterFormatOptions(DATE_TIME_FORMAT_OPTIONS, options, defaults);

    return state.getDateTimeFormat(locale, filteredOptions).format(date);
}

function formatTime(config, state, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var format = options.format;

    var date = new Date(value);
    var defaults = format && getNamedFormat(formats, 'time', format);

    var filteredOptions = filterFormatOptions(DATE_TIME_FORMAT_OPTIONS, options, defaults);

    return state.getDateTimeFormat(locale, filteredOptions).format(date);
}

function formatRelative(config, state, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var now = options.now;
    var format = options.format;

    var date = new Date(value);
    var defaults = format && getNamedFormat(formats, 'relative', format);

    var filteredOptions = filterFormatOptions(RELATIVE_FORMAT_OPTIONS, options, defaults);

    return state.getRelativeFormat(locale, filteredOptions).format(date, {
        now: isFinite(now) ? now : state.now()
    });
}

function formatNumber(config, state, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var format = options.format;

    var defaults = format && getNamedFormat(formats, 'number', format);

    var filteredOptions = filterFormatOptions(NUMBER_FORMAT_OPTIONS, options, defaults);

    return state.getNumberFormat(locale, filteredOptions).format(value);
}

function formatPlural(config, state, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;

    var filteredOptions = filterFormatOptions(PLURAL_FORMAT_OPTIONS, options);

    return state.getPluralFormat(locale, filteredOptions).format(value);
}

function formatMessage(config, state, messageDescriptor) {
    var values = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var messages = config.messages;
    var defaultLocale = config.defaultLocale;
    var defaultFormats = config.defaultFormats;
    var id = messageDescriptor.id;
    var defaultMessage = messageDescriptor.defaultMessage;

    _invariant2['default'](id, '[React Intl] An `id` must be provided to format a message.');

    var message = messages && messages[id];

    if (!(message || defaultMessage)) {
        if ("development" !== 'production') {
            console.error('[React Intl] Cannot format message. ' + ('Missing message: "' + id + '" for locale: "' + locale + '", ') + 'and no default message was provided.');
        }

        return id;
    }

    var formattedMessage = undefined;

    if (message) {
        try {
            var formatter = state.getMessageFormat(message, locale, formats);

            formattedMessage = formatter.format(values);
        } catch (e) {
            if ("development" !== 'production') {
                console.error('[React Intl] Error formatting message: "' + id + '"\n' + e);
            }
        }
    }

    if (!formattedMessage && defaultMessage) {
        try {
            var formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

            formattedMessage = formatter.format(values);
        } catch (e) {
            if ("development" !== 'production') {
                console.error('[React Intl] Error formatting the default message for: ' + ('"' + id + '"\n' + e));
            }
        }
    }

    if (!formattedMessage) {
        if ("development" !== 'production') {
            console.warn('[React Intl] Using source fallback for message: "' + id + '"');
        }
    }

    return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
    var rawValues = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    // Process all the values before they are used when formatting the ICU
    // Message string. Since the formatted message might be injected via
    // `innerHTML`, all String-based values need to be HTML-escaped.
    var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
        var value = rawValues[name];
        escaped[name] = typeof value === 'string' ? _utils.escape(value) : value;
        return escaped;
    }, {});

    return formatMessage(config, state, messageDescriptor, escapedValues);
}

},{"./types":37,"./utils":38,"invariant":20}],31:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// Inspired by react-redux's `connect()` HOC factory function implementation:
// https://github.com/rackt/react-redux

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = injectIntl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _types = require('./types');

var _utils = require('./utils');

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

function injectIntl(WrappedComponent) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var _options$intlPropName = options.intlPropName;
    var intlPropName = _options$intlPropName === undefined ? 'intl' : _options$intlPropName;
    var _options$withRef = options.withRef;
    var withRef = _options$withRef === undefined ? false : _options$withRef;

    var InjectIntl = (function (_Component) {
        _inherits(InjectIntl, _Component);

        function InjectIntl(props, context) {
            _classCallCheck(this, InjectIntl);

            _Component.call(this, props, context);
            _utils.invariantIntlContext(context);
        }

        InjectIntl.prototype.getWrappedInstance = function getWrappedInstance() {
            _invariant2['default'](withRef, '[React Intl] To access the wrapped instance, ' + 'the `{withRef: true}` option must be set when calling: ' + '`injectIntl()`');
        };

        InjectIntl.prototype.render = function render() {
            return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, _defineProperty({}, intlPropName, this.context.intl), {
                ref: withRef ? 'wrappedInstance' : null
            }));
        };

        return InjectIntl;
    })(_react.Component);

    InjectIntl.displayName = 'IntjectIntl(' + getDisplayName(WrappedComponent) + ')';

    InjectIntl.contextTypes = {
        intl: _types.intlShape
    };

    return InjectIntl;
}

module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./types":37,"./utils":38,"invariant":20}],32:[function(require,module,exports){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;
exports.addLocaleData = addLocaleData;
exports.hasLocaleData = hasLocaleData;

var _intlMessageformat = require('intl-messageformat');

var _intlRelativeformat = require('intl-relativeformat');

var registeredLocales = Object.create(null);

function addLocaleData() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    var locales = Array.isArray(data) ? data : [data];

    locales.forEach(function (localeData) {
        _intlMessageformat.__addLocaleData(localeData);
        _intlRelativeformat.__addLocaleData(localeData);

        var locale = localeData.locale;

        registeredLocales[locale.toLowerCase()] = locale;
    });
}

function hasLocaleData(locale) {
    return !!registeredLocales[locale.toLowerCase()];
}

},{"intl-messageformat":5,"intl-relativeformat":14}],33:[function(require,module,exports){
// GENERATED FILE
"use strict";exports.__esModule = true;exports["default"] = [{"locale":"aa","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"aa-DJ","parentLocale":"aa"},{"locale":"aa-ER","parentLocale":"aa"},{"locale":"aa-ET","parentLocale":"aa"},{"locale":"af","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Jaar","relative":{"0":"hierdie jaar","1":"volgende jaar","-1":"verlede jaar"},"relativeTime":{"future":{"one":"Oor {0} jaar","other":"Oor {0} jaar"},"past":{"one":"{0} jaar gelede","other":"{0} jaar gelede"}}},"month":{"displayName":"Maand","relative":{"0":"vandeesmaand","1":"volgende maand","-1":"verlede maand"},"relativeTime":{"future":{"one":"Oor {0} maand","other":"Oor {0} maande"},"past":{"one":"{0} maand gelede","other":"{0} maande gelede"}}},"day":{"displayName":"Dag","relative":{"0":"vandag","1":"môre","2":"oormôre","-1":"gister","-2":"eergister"},"relativeTime":{"future":{"one":"Oor {0} dag","other":"Oor {0} dae"},"past":{"one":"{0} dag gelede","other":"{0} dae gelede"}}},"hour":{"displayName":"Uur","relativeTime":{"future":{"one":"Oor {0} uur","other":"Oor {0} uur"},"past":{"one":"{0} uur gelede","other":"{0} uur gelede"}}},"minute":{"displayName":"Minuut","relativeTime":{"future":{"one":"Oor {0} minuut","other":"Oor {0} minute"},"past":{"one":"{0} minuut gelede","other":"{0} minute gelede"}}},"second":{"displayName":"Sekonde","relative":{"0":"nou"},"relativeTime":{"future":{"one":"Oor {0} sekonde","other":"Oor {0} sekondes"},"past":{"one":"{0} sekonde gelede","other":"{0} sekondes gelede"}}}}},{"locale":"af-NA","parentLocale":"af"},{"locale":"af-ZA","parentLocale":"af"},{"locale":"agq","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"kɨnûm","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ndzɔŋ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"utsuʔ","relative":{"0":"nɛ","1":"tsʉtsʉ","-1":"ā zūɛɛ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"tàm","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"menè","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"sɛkɔ̀n","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"agq-CM","parentLocale":"agq"},{"locale":"ak","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"Afe","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Bosome","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Da","relative":{"0":"Ndɛ","1":"Ɔkyena","-1":"Ndeda"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Dɔnhwer","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Sema","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sɛkɛnd","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ak-GH","parentLocale":"ak"},{"locale":"am","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n >= 0 && n <= 1?"one":"other"},"fields":{"year":{"displayName":"ዓመት","relative":{"0":"በዚህ ዓመት","1":"የሚቀጥለው ዓመት","-1":"ያለፈው ዓመት"},"relativeTime":{"future":{"one":"በ{0} ዓመታት ውስጥ","other":"በ{0} ዓመታት ውስጥ"},"past":{"one":"ከ{0} ዓመት በፊት","other":"ከ{0} ዓመታት በፊት"}}},"month":{"displayName":"ወር","relative":{"0":"በዚህ ወር","1":"የሚቀጥለው ወር","-1":"ያለፈው ወር"},"relativeTime":{"future":{"one":"በ{0} ወር ውስጥ","other":"በ{0} ወራት ውስጥ"},"past":{"one":"ከ{0} ወር በፊት","other":"ከ{0} ወራት በፊት"}}},"day":{"displayName":"ቀን","relative":{"0":"ዛሬ","1":"ነገ","2":"ከነገ ወዲያ","-1":"ትናንት","-2":"ከትናንት ወዲያ"},"relativeTime":{"future":{"one":"በ{0} ቀን ውስጥ","other":"በ{0} ቀናት ውስጥ"},"past":{"one":"ከ{0} ቀን በፊት","other":"ከ{0} ቀናት በፊት"}}},"hour":{"displayName":"ሰዓት","relativeTime":{"future":{"one":"በ{0} ሰዓት ውስጥ","other":"በ{0} ሰዓቶች ውስጥ"},"past":{"one":"ከ{0} ሰዓት በፊት","other":"ከ{0} ሰዓቶች በፊት"}}},"minute":{"displayName":"ደቂቃ","relativeTime":{"future":{"one":"በ{0} ደቂቃ ውስጥ","other":"በ{0} ደቂቃዎች ውስጥ"},"past":{"one":"ከ{0} ደቂቃ በፊት","other":"ከ{0} ደቂቃዎች በፊት"}}},"second":{"displayName":"ሰከንድ","relative":{"0":"አሁን"},"relativeTime":{"future":{"one":"በ{0} ሰከንድ ውስጥ","other":"በ{0} ሰከንዶች ውስጥ"},"past":{"one":"ከ{0} ሰከንድ በፊት","other":"ከ{0} ሰከንዶች በፊት"}}}}},{"locale":"am-ET","parentLocale":"am"},{"locale":"ar","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n,n100=t0 && s[0].slice(-2);if(ord)return "other";return n == 0?"zero":n == 1?"one":n == 2?"two":n100 >= 3 && n100 <= 10?"few":n100 >= 11 && n100 <= 99?"many":"other"},"fields":{"year":{"displayName":"السنة","relative":{"0":"السنة الحالية","1":"السنة التالية","-1":"السنة الماضية"},"relativeTime":{"future":{"zero":"خلال {0} من السنوات","one":"خلال {0} من السنوات","two":"خلال سنتين","few":"خلال {0} سنوات","many":"خلال {0} سنة","other":"خلال {0} من السنوات"},"past":{"zero":"قبل {0} من السنوات","one":"قبل {0} من السنوات","two":"قبل سنتين","few":"قبل {0} سنوات","many":"قبل {0} سنة","other":"قبل {0} من السنوات"}}},"month":{"displayName":"الشهر","relative":{"0":"هذا الشهر","1":"الشهر التالي","-1":"الشهر الماضي"},"relativeTime":{"future":{"zero":"خلال {0} من الشهور","one":"خلال {0} من الشهور","two":"خلال شهرين","few":"خلال {0} شهور","many":"خلال {0} شهرًا","other":"خلال {0} من الشهور"},"past":{"zero":"قبل {0} من الشهور","one":"قبل {0} من الشهور","two":"قبل شهرين","few":"قبل {0} أشهر","many":"قبل {0} شهرًا","other":"قبل {0} من الشهور"}}},"day":{"displayName":"يوم","relative":{"0":"اليوم","1":"غدًا","2":"بعد الغد","-1":"أمس","-2":"أول أمس"},"relativeTime":{"future":{"zero":"خلال {0} من الأيام","one":"خلال {0} من الأيام","two":"خلال يومين","few":"خلال {0} أيام","many":"خلال {0} يومًا","other":"خلال {0} من الأيام"},"past":{"zero":"قبل {0} من الأيام","one":"قبل {0} من الأيام","two":"قبل يومين","few":"قبل {0} أيام","many":"قبل {0} يومًا","other":"قبل {0} من الأيام"}}},"hour":{"displayName":"الساعات","relativeTime":{"future":{"zero":"خلال {0} من الساعات","one":"خلال {0} من الساعات","two":"خلال ساعتين","few":"خلال {0} ساعات","many":"خلال {0} ساعة","other":"خلال {0} من الساعات"},"past":{"zero":"قبل {0} من الساعات","one":"قبل {0} من الساعات","two":"قبل ساعتين","few":"قبل {0} ساعات","many":"قبل {0} ساعة","other":"قبل {0} من الساعات"}}},"minute":{"displayName":"الدقائق","relativeTime":{"future":{"zero":"خلال {0} من الدقائق","one":"خلال {0} من الدقائق","two":"خلال دقيقتين","few":"خلال {0} دقائق","many":"خلال {0} دقيقة","other":"خلال {0} من الدقائق"},"past":{"zero":"قبل {0} من الدقائق","one":"قبل {0} من الدقائق","two":"قبل دقيقتين","few":"قبل {0} دقائق","many":"قبل {0} دقيقة","other":"قبل {0} من الدقائق"}}},"second":{"displayName":"الثواني","relative":{"0":"الآن"},"relativeTime":{"future":{"zero":"خلال {0} من الثواني","one":"خلال {0} من الثواني","two":"خلال ثانيتين","few":"خلال {0} ثوانِ","many":"خلال {0} ثانية","other":"خلال {0} من الثواني"},"past":{"zero":"قبل {0} من الثواني","one":"قبل {0} من الثواني","two":"قبل ثانيتين","few":"قبل {0} ثوانِ","many":"قبل {0} ثانية","other":"قبل {0} من الثواني"}}}}},{"locale":"ar-001","parentLocale":"ar"},{"locale":"ar-AE","parentLocale":"ar","fields":{"year":{"displayName":"السنة","relative":{"0":"هذه السنة","1":"السنة التالية","-1":"السنة الماضية"},"relativeTime":{"future":{"zero":"خلال {0} من السنوات","one":"خلال {0} من السنوات","two":"خلال سنتين","few":"خلال {0} سنوات","many":"خلال {0} سنة","other":"خلال {0} من السنوات"},"past":{"zero":"قبل {0} من السنوات","one":"قبل {0} من السنوات","two":"قبل سنتين","few":"قبل {0} سنوات","many":"قبل {0} سنة","other":"قبل {0} من السنوات"}}},"month":{"displayName":"الشهر","relative":{"0":"هذا الشهر","1":"الشهر التالي","-1":"الشهر الماضي"},"relativeTime":{"future":{"zero":"خلال {0} من الشهور","one":"خلال {0} من الشهور","two":"خلال شهرين","few":"خلال {0} شهور","many":"خلال {0} شهرًا","other":"خلال {0} من الشهور"},"past":{"zero":"قبل {0} من الشهور","one":"قبل {0} من الشهور","two":"قبل شهرين","few":"قبل {0} أشهر","many":"قبل {0} شهرًا","other":"قبل {0} من الشهور"}}},"day":{"displayName":"يوم","relative":{"0":"اليوم","1":"غدًا","2":"بعد الغد","-1":"أمس","-2":"أول أمس"},"relativeTime":{"future":{"zero":"خلال {0} من الأيام","one":"خلال {0} من الأيام","two":"خلال يومين","few":"خلال {0} أيام","many":"خلال {0} يومًا","other":"خلال {0} من الأيام"},"past":{"zero":"قبل {0} من الأيام","one":"قبل {0} من الأيام","two":"قبل يومين","few":"قبل {0} أيام","many":"قبل {0} يومًا","other":"قبل {0} من الأيام"}}},"hour":{"displayName":"الساعات","relativeTime":{"future":{"zero":"خلال {0} من الساعات","one":"خلال {0} من الساعات","two":"خلال ساعتين","few":"خلال {0} ساعات","many":"خلال {0} ساعة","other":"خلال {0} من الساعات"},"past":{"zero":"قبل {0} من الساعات","one":"قبل {0} من الساعات","two":"قبل ساعتين","few":"قبل {0} ساعات","many":"قبل {0} ساعة","other":"قبل {0} من الساعات"}}},"minute":{"displayName":"الدقائق","relativeTime":{"future":{"zero":"خلال {0} من الدقائق","one":"خلال {0} من الدقائق","two":"خلال دقيقتين","few":"خلال {0} دقائق","many":"خلال {0} دقيقة","other":"خلال {0} من الدقائق"},"past":{"zero":"قبل {0} من الدقائق","one":"قبل {0} من الدقائق","two":"قبل دقيقتين","few":"قبل {0} دقائق","many":"قبل {0} دقيقة","other":"قبل {0} من الدقائق"}}},"second":{"displayName":"الثواني","relative":{"0":"الآن"},"relativeTime":{"future":{"zero":"خلال {0} من الثواني","one":"خلال {0} من الثواني","two":"خلال ثانيتين","few":"خلال {0} ثوانِ","many":"خلال {0} ثانية","other":"خلال {0} من الثواني"},"past":{"zero":"قبل {0} من الثواني","one":"قبل {0} من الثواني","two":"قبل ثانيتين","few":"قبل {0} ثوانِ","many":"قبل {0} ثانية","other":"قبل {0} من الثواني"}}}}},{"locale":"ar-BH","parentLocale":"ar"},{"locale":"ar-DJ","parentLocale":"ar"},{"locale":"ar-DZ","parentLocale":"ar"},{"locale":"ar-EG","parentLocale":"ar"},{"locale":"ar-EH","parentLocale":"ar"},{"locale":"ar-ER","parentLocale":"ar"},{"locale":"ar-IL","parentLocale":"ar"},{"locale":"ar-IQ","parentLocale":"ar"},{"locale":"ar-JO","parentLocale":"ar"},{"locale":"ar-KM","parentLocale":"ar"},{"locale":"ar-KW","parentLocale":"ar"},{"locale":"ar-LB","parentLocale":"ar"},{"locale":"ar-LY","parentLocale":"ar"},{"locale":"ar-MA","parentLocale":"ar"},{"locale":"ar-MR","parentLocale":"ar"},{"locale":"ar-OM","parentLocale":"ar"},{"locale":"ar-PS","parentLocale":"ar"},{"locale":"ar-QA","parentLocale":"ar"},{"locale":"ar-SA","parentLocale":"ar"},{"locale":"ar-SD","parentLocale":"ar"},{"locale":"ar-SO","parentLocale":"ar"},{"locale":"ar-SS","parentLocale":"ar"},{"locale":"ar-SY","parentLocale":"ar"},{"locale":"ar-TD","parentLocale":"ar"},{"locale":"ar-TN","parentLocale":"ar"},{"locale":"ar-YE","parentLocale":"ar"},{"locale":"as","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"বছৰ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"মাহ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"দিন","relative":{"0":"today","1":"কাইলৈ","2":"পৰহিলৈ","-1":"কালি","-2":"পৰহি"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ঘণ্টা","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"মিনিট","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"ছেকেণ্ড","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"as-IN","parentLocale":"as"},{"locale":"asa","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mweji","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Thiku","relative":{"0":"Iyoo","1":"Yavo","-1":"Ighuo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Thaa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Thekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"asa-TZ","parentLocale":"asa"},{"locale":"ast","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"añu","relative":{"0":"esti añu","1":"l’añu viniente","-1":"l’añu pasáu"},"relativeTime":{"future":{"one":"En {0} añu","other":"En {0} años"},"past":{"one":"Hai {0} añu","other":"Hai {0} años"}}},"month":{"displayName":"mes","relative":{"0":"esti mes","1":"el mes viniente","-1":"el mes pasáu"},"relativeTime":{"future":{"one":"En {0} mes","other":"En {0} meses"},"past":{"one":"Hai {0} mes","other":"Hai {0} meses"}}},"day":{"displayName":"día","relative":{"0":"güei","1":"mañana","2":"pasao mañana","-1":"ayeri","-2":"antayeri"},"relativeTime":{"future":{"one":"En {0} dia","other":"En {0} díes"},"past":{"one":"Hai {0} dia","other":"Hai {0} díes"}}},"hour":{"displayName":"hora","relativeTime":{"future":{"one":"En {0} hora","other":"En {0} hores"},"past":{"one":"Hai {0} hora","other":"Hai {0} hores"}}},"minute":{"displayName":"minutu","relativeTime":{"future":{"one":"En {0} minutu","other":"En {0} minutos"},"past":{"one":"Hai {0} minutu","other":"Hai {0} minutos"}}},"second":{"displayName":"segundu","relative":{"0":"now"},"relativeTime":{"future":{"one":"En {0} segundu","other":"En {0} segundos"},"past":{"one":"Hai {0} segundu","other":"Hai {0} segundos"}}}}},{"locale":"ast-ES","parentLocale":"ast"},{"locale":"az","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],i10=i.slice(-1),i100=i.slice(-2),i1000=i.slice(-3);if(ord)return i10 == 1 || i10 == 2 || i10 == 5 || i10 == 7 || i10 == 8 || i100 == 20 || i100 == 50 || i100 == 70 || i100 == 80?"one":i10 == 3 || i10 == 4 || i1000 == 100 || i1000 == 200 || i1000 == 300 || i1000 == 400 || i1000 == 500 || i1000 == 600 || i1000 == 700 || i1000 == 800 || i1000 == 900?"few":i == 0 || i10 == 6 || i100 == 40 || i100 == 60 || i100 == 90?"many":"other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"İl","relative":{"0":"bu il","1":"gələn il","-1":"keçən il"},"relativeTime":{"future":{"one":"{0} il ərzində","other":"{0} il ərzində"},"past":{"one":"{0} il öncə","other":"{0} il öncə"}}},"month":{"displayName":"Ay","relative":{"0":"bu ay","1":"gələn ay","-1":"keçən ay"},"relativeTime":{"future":{"one":"{0} ay ərzində","other":"{0} ay ərzində"},"past":{"one":"{0} ay öncə","other":"{0} ay öncə"}}},"day":{"displayName":"Gün","relative":{"0":"bu gün","1":"sabah","-1":"dünən"},"relativeTime":{"future":{"one":"{0} gün ərzində","other":"{0} gün ərzində"},"past":{"one":"{0} gün öncə","other":"{0} gün öncə"}}},"hour":{"displayName":"Saat","relativeTime":{"future":{"one":"{0} saat ərzində","other":"{0} saat ərzində"},"past":{"one":"{0} saat öncə","other":"{0} saat öncə"}}},"minute":{"displayName":"Dəqiqə","relativeTime":{"future":{"one":"{0} dəqiqə ərzində","other":"{0} dəqiqə ərzində"},"past":{"one":"{0} dəqiqə öncə","other":"{0} dəqiqə öncə"}}},"second":{"displayName":"Saniyə","relative":{"0":"indi"},"relativeTime":{"future":{"one":"{0} saniyə ərzində","other":"{0} saniyə ərzində"},"past":{"one":"{0} saniyə öncə","other":"{0} saniyə öncə"}}}}},{"locale":"az-Cyrl","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"az-Cyrl-AZ","parentLocale":"az-Cyrl"},{"locale":"az-Latn","parentLocale":"az"},{"locale":"az-Latn-AZ","parentLocale":"az-Latn"},{"locale":"bas","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ŋwìi","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"soŋ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"kɛl","relative":{"0":"lɛ̀n","1":"yàni","-1":"yààni"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ŋgɛŋ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"ŋget","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"hìŋgeŋget","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"bas-CM","parentLocale":"bas"},{"locale":"be","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2);if(ord)return "other";return n10 == 1 && n100 != 11?"one":n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)?"few":t0 && n10 == 0 || n10 >= 5 && n10 <= 9 || n100 >= 11 && n100 <= 14?"many":"other"},"fields":{"year":{"displayName":"год","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"месяц","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"дзень","relative":{"0":"сёння","1":"заўтра","2":"паслязаўтра","-1":"учора","-2":"пазаўчора"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"гадзіна","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"хвіліна","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"секунда","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"be-BY","parentLocale":"be"},{"locale":"bem","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Umwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Umweshi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ubushiku","relative":{"0":"Lelo","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Insa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Mineti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekondi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"bem-ZM","parentLocale":"bem"},{"locale":"bez","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Mwaha","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwedzi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Sihu","relative":{"0":"Neng’u ni","1":"Hilawu","-1":"Igolo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"bez-TZ","parentLocale":"bez"},{"locale":"bg","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"година","relative":{"0":"тази година","1":"следващата година","-1":"миналата година"},"relativeTime":{"future":{"one":"след {0} година","other":"след {0} години"},"past":{"one":"преди {0} година","other":"преди {0} години"}}},"month":{"displayName":"месец","relative":{"0":"този месец","1":"следващият месец","-1":"миналият месец"},"relativeTime":{"future":{"one":"след {0} месец","other":"след {0} месеца"},"past":{"one":"преди {0} месец","other":"преди {0} месеца"}}},"day":{"displayName":"ден","relative":{"0":"днес","1":"утре","2":"вдругиден","-1":"вчера","-2":"онзи ден"},"relativeTime":{"future":{"one":"след {0} ден","other":"след {0} дни"},"past":{"one":"преди {0} ден","other":"преди {0} дни"}}},"hour":{"displayName":"час","relativeTime":{"future":{"one":"след {0} час","other":"след {0} часа"},"past":{"one":"преди {0} час","other":"преди {0} часа"}}},"minute":{"displayName":"минута","relativeTime":{"future":{"one":"след {0} минута","other":"след {0} минути"},"past":{"one":"преди {0} минута","other":"преди {0} минути"}}},"second":{"displayName":"секунда","relative":{"0":"сега"},"relativeTime":{"future":{"one":"след {0} секунда","other":"след {0} секунди"},"past":{"one":"преди {0} секунда","other":"преди {0} секунди"}}}}},{"locale":"bg-BG","parentLocale":"bg"},{"locale":"bh","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"bm","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"san","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"kalo","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"don","relative":{"0":"bi","1":"sini","-1":"kunu"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"lɛrɛ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"miniti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"sekondi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"bm-Latn","parentLocale":"bm"},{"locale":"bm-Latn-ML","parentLocale":"bm-Latn"},{"locale":"bm-Nkoo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"bn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1 || n == 5 || n == 7 || n == 8 || n == 9 || n == 10?"one":n == 2 || n == 3?"two":n == 4?"few":n == 6?"many":"other";return n >= 0 && n <= 1?"one":"other"},"fields":{"year":{"displayName":"বছর","relative":{"0":"এই বছর","1":"পরের বছর","-1":"গত বছর"},"relativeTime":{"future":{"one":"{0} বছরে","other":"{0} বছরে"},"past":{"one":"{0} বছর পূর্বে","other":"{0} বছর পূর্বে"}}},"month":{"displayName":"মাস","relative":{"0":"এই মাস","1":"পরের মাস","-1":"গত মাস"},"relativeTime":{"future":{"one":"{0} মাসে","other":"{0} মাসে"},"past":{"one":"{0} মাস পূর্বে","other":"{0} মাস পূর্বে"}}},"day":{"displayName":"দিন","relative":{"0":"আজ","1":"আগামীকাল","2":"আগামী পরশু","-1":"গতকাল","-2":"গত পরশু"},"relativeTime":{"future":{"one":"{0} দিনের মধ্যে","other":"{0} দিনের মধ্যে"},"past":{"one":"{0} দিন পূর্বে","other":"{0} দিন পূর্বে"}}},"hour":{"displayName":"ঘন্টা","relativeTime":{"future":{"one":"{0} ঘন্টায়","other":"{0} ঘন্টায়"},"past":{"one":"{0} ঘন্টা আগে","other":"{0} ঘন্টা আগে"}}},"minute":{"displayName":"মিনিট","relativeTime":{"future":{"one":"{0} মিনিটে","other":"{0} মিনিটে"},"past":{"one":"{0} মিনিট পূর্বে","other":"{0} মিনিট পূর্বে"}}},"second":{"displayName":"সেকেন্ড","relative":{"0":"এখন"},"relativeTime":{"future":{"one":"{0} সেকেন্ডে","other":"{0} সেকেন্ডে"},"past":{"one":"{0} সেকেন্ড পূর্বে","other":"{0} সেকেন্ড পূর্বে"}}}}},{"locale":"bn-BD","parentLocale":"bn"},{"locale":"bn-IN","parentLocale":"bn"},{"locale":"bo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ལོ།","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ཟླ་བ་","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"ཉིན།","relative":{"0":"དེ་རིང་","1":"སང་ཉིན་","2":"གནངས་ཉིན་ཀ་","-1":"ཁས་ས་","-2":"ཁས་ཉིན་ཀ་"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ཆུ་ཙོ་","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"སྐར་མ།","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"སྐར་ཆ།","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"bo-CN","parentLocale":"bo"},{"locale":"bo-IN","parentLocale":"bo"},{"locale":"br","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2),n1000000=t0 && s[0].slice(-6);if(ord)return "other";return n10 == 1 && n100 != 11 && n100 != 71 && n100 != 91?"one":n10 == 2 && n100 != 12 && n100 != 72 && n100 != 92?"two":(n10 == 3 || n10 == 4 || n10 == 9) && (n100 < 10 || n100 > 19) && (n100 < 70 || n100 > 79) && (n100 < 90 || n100 > 99)?"few":n != 0 && t0 && n1000000 == 0?"many":"other"},"fields":{"year":{"displayName":"bloaz","relative":{"0":"this year","1":"next year","-1":"warlene"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"miz","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"deiz","relative":{"0":"hiziv","1":"warcʼhoazh","-1":"decʼh","-2":"dercʼhent-decʼh"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"eur","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"munut","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"eilenn","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"br-FR","parentLocale":"br"},{"locale":"brx","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"बोसोर","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"दान","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"सान","relative":{"0":"दिनै","1":"गाबोन","-1":"मैया"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"रिंगा","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"मिनिथ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"सेखेन्द","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"brx-IN","parentLocale":"brx"},{"locale":"bs","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return "other";return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11?"one":v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14)?"few":"other"},"fields":{"year":{"displayName":"godina","relative":{"0":"ove godine","1":"sljedeće godine","-1":"prošle godine"},"relativeTime":{"future":{"one":"za {0} godinu","few":"za {0} godine","other":"za {0} godina"},"past":{"one":"prije {0} godinu","few":"prije {0} godine","other":"prije {0} godina"}}},"month":{"displayName":"mjesec","relative":{"0":"ovaj mjesec","1":"sljedeći mjesec","-1":"prošli mjesec"},"relativeTime":{"future":{"one":"za {0} mjesec","few":"za {0} mjeseca","other":"za {0} mjeseci"},"past":{"one":"prije {0} mjesec","few":"prije {0} mjeseca","other":"prije {0} mjeseci"}}},"day":{"displayName":"dan","relative":{"0":"danas","1":"sutra","2":"prekosutra","-1":"juče","-2":"prekjuče"},"relativeTime":{"future":{"one":"za {0} dan","few":"za {0} dana","other":"za {0} dana"},"past":{"one":"prije {0} dan","few":"prije {0} dana","other":"prije {0} dana"}}},"hour":{"displayName":"sat","relativeTime":{"future":{"one":"za {0} sat","few":"za {0} sata","other":"za {0} sati"},"past":{"one":"prije {0} sat","few":"prije {0} sata","other":"prije {0} sati"}}},"minute":{"displayName":"minut","relativeTime":{"future":{"one":"za {0} minutu","few":"za {0} minute","other":"za {0} minuta"},"past":{"one":"prije {0} minutu","few":"prije {0} minute","other":"prije {0} minuta"}}},"second":{"displayName":"sekund","relative":{"0":"sada"},"relativeTime":{"future":{"one":"za {0} sekundu","few":"za {0} sekunde","other":"za {0} sekundi"},"past":{"one":"prije {0} sekundu","few":"prije {0} sekunde","other":"prije {0} sekundi"}}}}},{"locale":"bs-Cyrl","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"година","relative":{"0":"Ове године","1":"Следеће године","-1":"Прошле године"},"relativeTime":{"future":{"one":"за {0} годину","few":"за {0} године","other":"за {0} година"},"past":{"one":"пре {0} годину","few":"пре {0} године","other":"пре {0} година"}}},"month":{"displayName":"месец","relative":{"0":"Овог месеца","1":"Следећег месеца","-1":"Прошлог месеца"},"relativeTime":{"future":{"one":"за {0} месец","few":"за {0} месеца","other":"за {0} месеци"},"past":{"one":"пре {0} месец","few":"пре {0} месеца","other":"пре {0} месеци"}}},"day":{"displayName":"дан","relative":{"0":"данас","1":"сутра","2":"прекосутра","-1":"јуче","-2":"прекјуче"},"relativeTime":{"future":{"one":"за {0} дан","few":"за {0} дана","other":"за {0} дана"},"past":{"one":"пре {0} дан","few":"пре {0} дана","other":"пре {0} дана"}}},"hour":{"displayName":"час","relativeTime":{"future":{"one":"за {0} сат","few":"за {0} сата","other":"за {0} сати"},"past":{"one":"пре {0} сат","few":"пре {0} сата","other":"пре {0} сати"}}},"minute":{"displayName":"минут","relativeTime":{"future":{"one":"за {0} минут","few":"за {0} минута","other":"за {0} минута"},"past":{"one":"пре {0} минут","few":"пре {0} минута","other":"пре {0} минута"}}},"second":{"displayName":"секунд","relative":{"0":"now"},"relativeTime":{"future":{"one":"за {0} секунд","few":"за {0} секунде","other":"за {0} секунди"},"past":{"one":"пре {0} секунд","few":"пре {0} секунде","other":"пре {0} секунди"}}}}},{"locale":"bs-Cyrl-BA","parentLocale":"bs-Cyrl"},{"locale":"bs-Latn","parentLocale":"bs"},{"locale":"bs-Latn-BA","parentLocale":"bs-Latn"},{"locale":"ca","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return n == 1 || n == 3?"one":n == 2?"two":n == 4?"few":"other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"any","relative":{"0":"enguany","1":"l’any que ve","-1":"l’any passat"},"relativeTime":{"future":{"one":"d’aquí a {0} any","other":"d’aquí a {0} anys"},"past":{"one":"fa {0} any","other":"fa {0} anys"}}},"month":{"displayName":"mes","relative":{"0":"aquest mes","1":"el mes que ve","-1":"el mes passat"},"relativeTime":{"future":{"one":"d’aquí a {0} mes","other":"d’aquí a {0} mesos"},"past":{"one":"fa {0} mes","other":"fa {0} mesos"}}},"day":{"displayName":"dia","relative":{"0":"avui","1":"demà","2":"demà passat","-1":"ahir","-2":"abans-d’ahir"},"relativeTime":{"future":{"one":"d’aquí a {0} dia","other":"d’aquí a {0} dies"},"past":{"one":"fa {0} dia","other":"fa {0} dies"}}},"hour":{"displayName":"hora","relativeTime":{"future":{"one":"d’aquí a {0} hora","other":"d’aquí {0} hores"},"past":{"one":"fa {0} hora","other":"fa {0} hores"}}},"minute":{"displayName":"minut","relativeTime":{"future":{"one":"d’aquí a {0} minut","other":"d’aquí a {0} minuts"},"past":{"one":"fa {0} minut","other":"fa {0} minuts"}}},"second":{"displayName":"segon","relative":{"0":"ara"},"relativeTime":{"future":{"one":"d’aquí a {0} segon","other":"d’aquí a {0} segons"},"past":{"one":"fa {0} segon","other":"fa {0} segons"}}}}},{"locale":"ca-AD","parentLocale":"ca"},{"locale":"ca-ES","parentLocale":"ca"},{"locale":"ca-ES-VALENCIA","parentLocale":"ca-ES"},{"locale":"ca-FR","parentLocale":"ca"},{"locale":"ca-IT","parentLocale":"ca"},{"locale":"cgg","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Omwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Omwezi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Eizooba","relative":{"0":"Erizooba","1":"Nyenkyakare","-1":"Nyomwabazyo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Shaaha","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Edakiika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Obucweka/Esekendi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"cgg-UG","parentLocale":"cgg"},{"locale":"chr","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"ᏑᏕᏘᏴᏓ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ᏏᏅᏓ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"ᏏᎦ","relative":{"0":"ᎪᎯ ᎢᎦ","1":"ᏌᎾᎴᎢ","-1":"ᏒᎯ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ᏑᏣᎶᏓ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"ᎢᏯᏔᏬᏍᏔᏅ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"ᎠᏎᏢ","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"chr-US","parentLocale":"chr"},{"locale":"ckb","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"cs","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":i >= 2 && i <= 4 && v0?"few":!v0?"many":"other"},"fields":{"year":{"displayName":"Rok","relative":{"0":"tento rok","1":"příští rok","-1":"minulý rok"},"relativeTime":{"future":{"one":"za {0} rok","few":"za {0} roky","many":"za {0} roku","other":"za {0} let"},"past":{"one":"před {0} rokem","few":"před {0} lety","many":"před {0} rokem","other":"před {0} lety"}}},"month":{"displayName":"Měsíc","relative":{"0":"tento měsíc","1":"příští měsíc","-1":"minulý měsíc"},"relativeTime":{"future":{"one":"za {0} měsíc","few":"za {0} měsíce","many":"za {0} měsíce","other":"za {0} měsíců"},"past":{"one":"před {0} měsícem","few":"před {0} měsíci","many":"před {0} měsícem","other":"před {0} měsíci"}}},"day":{"displayName":"Den","relative":{"0":"dnes","1":"zítra","2":"pozítří","-1":"včera","-2":"předevčírem"},"relativeTime":{"future":{"one":"za {0} den","few":"za {0} dny","many":"za {0} dne","other":"za {0} dní"},"past":{"one":"před {0} dnem","few":"před {0} dny","many":"před {0} dnem","other":"před {0} dny"}}},"hour":{"displayName":"Hodina","relativeTime":{"future":{"one":"za {0} hodinu","few":"za {0} hodiny","many":"za {0} hodiny","other":"za {0} hodin"},"past":{"one":"před {0} hodinou","few":"před {0} hodinami","many":"před {0} hodinou","other":"před {0} hodinami"}}},"minute":{"displayName":"Minuta","relativeTime":{"future":{"one":"za {0} minutu","few":"za {0} minuty","many":"za {0} minuty","other":"za {0} minut"},"past":{"one":"před {0} minutou","few":"před {0} minutami","many":"před {0} minutou","other":"před {0} minutami"}}},"second":{"displayName":"Sekunda","relative":{"0":"nyní"},"relativeTime":{"future":{"one":"za {0} sekundu","few":"za {0} sekundy","many":"za {0} sekundy","other":"za {0} sekund"},"past":{"one":"před {0} sekundou","few":"před {0} sekundami","many":"před {0} sekundou","other":"před {0} sekundami"}}}}},{"locale":"cs-CZ","parentLocale":"cs"},{"locale":"cy","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 0 || n == 7 || n == 8 || n == 9?"zero":n == 1?"one":n == 2?"two":n == 3 || n == 4?"few":n == 5 || n == 6?"many":"other";return n == 0?"zero":n == 1?"one":n == 2?"two":n == 3?"few":n == 6?"many":"other"},"fields":{"year":{"displayName":"Blwyddyn","relative":{"0":"eleni","1":"blwyddyn nesaf","-1":"llynedd"},"relativeTime":{"future":{"zero":"Ymhen {0} mlynedd","one":"Ymhen blwyddyn","two":"Ymhen {0} flynedd","few":"Ymhen {0} blynedd","many":"Ymhen {0} blynedd","other":"Ymhen {0} mlynedd"},"past":{"zero":"{0} o flynyddoedd yn ôl","one":"blwyddyn yn ôl","two":"{0} flynedd yn ôl","few":"{0} blynedd yn ôl","many":"{0} blynedd yn ôl","other":"{0} o flynyddoedd yn ôl"}}},"month":{"displayName":"Mis","relative":{"0":"y mis hwn","1":"mis nesaf","-1":"mis diwethaf"},"relativeTime":{"future":{"zero":"Ymhen {0} mis","one":"Ymhen mis","two":"Ymhen deufis","few":"Ymhen {0} mis","many":"Ymhen {0} mis","other":"Ymhen {0} mis"},"past":{"zero":"{0} mis yn ôl","one":"{0} mis yn ôl","two":"{0} fis yn ôl","few":"{0} mis yn ôl","many":"{0} mis yn ôl","other":"{0} mis yn ôl"}}},"day":{"displayName":"Dydd","relative":{"0":"heddiw","1":"yfory","2":"drennydd","-1":"ddoe","-2":"echdoe"},"relativeTime":{"future":{"zero":"Ymhen {0} diwrnod","one":"Ymhen diwrnod","two":"Ymhen deuddydd","few":"Ymhen tridiau","many":"Ymhen {0} diwrnod","other":"Ymhen {0} diwrnod"},"past":{"zero":"{0} diwrnod yn ôl","one":"{0} diwrnod yn ôl","two":"{0} ddiwrnod yn ôl","few":"{0} diwrnod yn ôl","many":"{0} diwrnod yn ôl","other":"{0} diwrnod yn ôl"}}},"hour":{"displayName":"Awr","relativeTime":{"future":{"zero":"Ymhen {0} awr","one":"Ymhen {0} awr","two":"Ymhen {0} awr","few":"Ymhen {0} awr","many":"Ymhen {0} awr","other":"Ymhen {0} awr"},"past":{"zero":"{0} awr yn ôl","one":"awr yn ôl","two":"{0} awr yn ôl","few":"{0} awr yn ôl","many":"{0} awr yn ôl","other":"{0} awr yn ôl"}}},"minute":{"displayName":"Munud","relativeTime":{"future":{"zero":"Ymhen {0} munud","one":"Ymhen munud","two":"Ymhen {0} funud","few":"Ymhen {0} munud","many":"Ymhen {0} munud","other":"Ymhen {0} munud"},"past":{"zero":"{0} munud yn ôl","one":"{0} munud yn ôl","two":"{0} funud yn ôl","few":"{0} munud yn ôl","many":"{0} munud yn ôl","other":"{0} munud yn ôl"}}},"second":{"displayName":"Eiliad","relative":{"0":"nawr"},"relativeTime":{"future":{"zero":"Ymhen {0} eiliad","one":"Ymhen eiliad","two":"Ymhen {0} eiliad","few":"Ymhen {0} eiliad","many":"Ymhen {0} eiliad","other":"Ymhen {0} eiliad"},"past":{"zero":"{0} eiliad yn ôl","one":"eiliad yn ôl","two":"{0} eiliad yn ôl","few":"{0} eiliad yn ôl","many":"{0} eiliad yn ôl","other":"{0} eiliad yn ôl"}}}}},{"locale":"cy-GB","parentLocale":"cy"},{"locale":"da","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],t0=Number(s[0]) == n;if(ord)return "other";return n == 1 || !t0 && (i == 0 || i == 1)?"one":"other"},"fields":{"year":{"displayName":"År","relative":{"0":"i år","1":"næste år","-1":"sidste år"},"relativeTime":{"future":{"one":"om {0} år","other":"om {0} år"},"past":{"one":"for {0} år siden","other":"for {0} år siden"}}},"month":{"displayName":"Måned","relative":{"0":"denne måned","1":"næste måned","-1":"sidste måned"},"relativeTime":{"future":{"one":"om {0} måned","other":"om {0} måneder"},"past":{"one":"for {0} måned siden","other":"for {0} måneder siden"}}},"day":{"displayName":"Dag","relative":{"0":"i dag","1":"i morgen","2":"i overmorgen","-1":"i går","-2":"i forgårs"},"relativeTime":{"future":{"one":"om {0} dag","other":"om {0} dage"},"past":{"one":"for {0} dag siden","other":"for {0} dage siden"}}},"hour":{"displayName":"Time","relativeTime":{"future":{"one":"om {0} time","other":"om {0} timer"},"past":{"one":"for {0} time siden","other":"for {0} timer siden"}}},"minute":{"displayName":"Minut","relativeTime":{"future":{"one":"om {0} minut","other":"om {0} minutter"},"past":{"one":"for {0} minut siden","other":"for {0} minutter siden"}}},"second":{"displayName":"Sekund","relative":{"0":"nu"},"relativeTime":{"future":{"one":"om {0} sekund","other":"om {0} sekunder"},"past":{"one":"for {0} sekund siden","other":"for {0} sekunder siden"}}}}},{"locale":"da-DK","parentLocale":"da"},{"locale":"da-GL","parentLocale":"da"},{"locale":"dav","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mori","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ituku","relative":{"0":"Idime","1":"Kesho","-1":"Iguo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"dav-KE","parentLocale":"dav"},{"locale":"de","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Jahr","relative":{"0":"dieses Jahr","1":"nächstes Jahr","-1":"letztes Jahr"},"relativeTime":{"future":{"one":"in {0} Jahr","other":"in {0} Jahren"},"past":{"one":"vor {0} Jahr","other":"vor {0} Jahren"}}},"month":{"displayName":"Monat","relative":{"0":"diesen Monat","1":"nächsten Monat","-1":"letzten Monat"},"relativeTime":{"future":{"one":"in {0} Monat","other":"in {0} Monaten"},"past":{"one":"vor {0} Monat","other":"vor {0} Monaten"}}},"day":{"displayName":"Tag","relative":{"0":"heute","1":"morgen","2":"übermorgen","-1":"gestern","-2":"vorgestern"},"relativeTime":{"future":{"one":"in {0} Tag","other":"in {0} Tagen"},"past":{"one":"vor {0} Tag","other":"vor {0} Tagen"}}},"hour":{"displayName":"Stunde","relativeTime":{"future":{"one":"in {0} Stunde","other":"in {0} Stunden"},"past":{"one":"vor {0} Stunde","other":"vor {0} Stunden"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"one":"in {0} Minute","other":"in {0} Minuten"},"past":{"one":"vor {0} Minute","other":"vor {0} Minuten"}}},"second":{"displayName":"Sekunde","relative":{"0":"jetzt"},"relativeTime":{"future":{"one":"in {0} Sekunde","other":"in {0} Sekunden"},"past":{"one":"vor {0} Sekunde","other":"vor {0} Sekunden"}}}}},{"locale":"de-AT","parentLocale":"de"},{"locale":"de-BE","parentLocale":"de"},{"locale":"de-CH","parentLocale":"de"},{"locale":"de-DE","parentLocale":"de"},{"locale":"de-LI","parentLocale":"de"},{"locale":"de-LU","parentLocale":"de"},{"locale":"dje","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Jiiri","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Handu","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Zaari","relative":{"0":"Hõo","1":"Suba","-1":"Bi"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Guuru","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Miniti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Miti","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"dje-NE","parentLocale":"dje"},{"locale":"dsb","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i100=i.slice(-2),f100=f.slice(-2);if(ord)return "other";return v0 && i100 == 1 || f100 == 1?"one":v0 && i100 == 2 || f100 == 2?"two":v0 && (i100 == 3 || i100 == 4) || f100 == 3 || f100 == 4?"few":"other"},"fields":{"year":{"displayName":"lěto","relative":{"0":"lětosa","1":"znowa","-1":"łoni"},"relativeTime":{"future":{"one":"za {0} lěto","two":"za {0} lěśe","few":"za {0} lěta","other":"za {0} lět"},"past":{"one":"pśed {0} lětom","two":"pśed {0} lětoma","few":"pśed {0} lětami","other":"pśed {0} lětami"}}},"month":{"displayName":"mjasec","relative":{"0":"ten mjasec","1":"pśiducy mjasec","-1":"slědny mjasec"},"relativeTime":{"future":{"one":"za {0} mjasec","two":"za {0} mjaseca","few":"za {0} mjasecy","other":"za {0} mjasecow"},"past":{"one":"pśed {0} mjasecom","two":"pśed {0} mjasecoma","few":"pśed {0} mjasecami","other":"pśed {0} mjasecami"}}},"day":{"displayName":"źeń","relative":{"0":"źinsa","1":"witśe","-1":"cora"},"relativeTime":{"future":{"one":"za {0} źeń","two":"za {0} dnja","few":"za {0} dny","other":"za {0} dnjow"},"past":{"one":"pśed {0} dnjom","two":"pśed {0} dnjoma","few":"pśed {0} dnjami","other":"pśed {0} dnjami"}}},"hour":{"displayName":"góźina","relativeTime":{"future":{"one":"za {0} góźinu","two":"za {0} góźinje","few":"za {0} góźiny","other":"za {0} góźin"},"past":{"one":"pśed {0} góźinu","two":"pśed {0} góźinoma","few":"pśed {0} góźinami","other":"pśed {0} góźinami"}}},"minute":{"displayName":"minuta","relativeTime":{"future":{"one":"za {0} minutu","two":"za {0} minuśe","few":"za {0} minuty","other":"za {0} minutow"},"past":{"one":"pśed {0} minutu","two":"pśed {0} minutoma","few":"pśed {0} minutami","other":"pśed {0} minutami"}}},"second":{"displayName":"sekunda","relative":{"0":"now"},"relativeTime":{"future":{"one":"za {0} sekundu","two":"za {0} sekunźe","few":"za {0} sekundy","other":"za {0} sekundow"},"past":{"one":"pśed {0} sekundu","two":"pśed {0} sekundoma","few":"pśed {0} sekundami","other":"pśed {0} sekundami"}}}}},{"locale":"dsb-DE","parentLocale":"dsb"},{"locale":"dua","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"mbú","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"mɔ́di","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"búnyá","relative":{"0":"wɛ́ŋgɛ̄","1":"kíɛlɛ","-1":"kíɛlɛ nítómb́í"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ŋgandɛ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"ndɔkɔ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"píndí","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"dua-CM","parentLocale":"dua"},{"locale":"dv","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"dyo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Emit","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Fuleeŋ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Funak","relative":{"0":"Jaat","1":"Kajom","-1":"Fucen"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"dyo-SN","parentLocale":"dyo"},{"locale":"dz","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ལོ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"ལོ་འཁོར་ {0} ནང་"},"past":{"other":"ལོ་འཁོར་ {0} ཧེ་མ་"}}},"month":{"displayName":"ཟླ་ཝ་","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"ཟླཝ་ {0} ནང་"},"past":{"other":"ཟླཝ་ {0} ཧེ་མ་"}}},"day":{"displayName":"ཚེས་","relative":{"0":"ད་རིས་","1":"ནངས་པ་","2":"གནངས་ཚེ","-1":"ཁ་ཙ་","-2":"ཁ་ཉིམ"},"relativeTime":{"future":{"other":"ཉིནམ་ {0} ནང་"},"past":{"other":"ཉིནམ་ {0} ཧེ་མ་"}}},"hour":{"displayName":"ཆུ་ཚོད","relativeTime":{"future":{"other":"ཆུ་ཚོད་ {0} ནང་"},"past":{"other":"ཆུ་ཚོད་ {0} ཧེ་མ་"}}},"minute":{"displayName":"སྐར་མ","relativeTime":{"future":{"other":"སྐར་མ་ {0} ནང་"},"past":{"other":"སྐར་མ་ {0} ཧེ་མ་"}}},"second":{"displayName":"སྐར་ཆཱ་","relative":{"0":"now"},"relativeTime":{"future":{"other":"སྐར་ཆ་ {0} ནང་"},"past":{"other":"སྐར་ཆ་ {0} ཧེ་མ་"}}}}},{"locale":"dz-BT","parentLocale":"dz"},{"locale":"ebu","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mweri","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mũthenya","relative":{"0":"Ũmũnthĩ","1":"Rũciũ","-1":"Ĩgoro"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ithaa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Ndagĩka","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekondi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ebu-KE","parentLocale":"ebu"},{"locale":"ee","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"ƒe","relative":{"0":"ƒe sia","1":"ƒe si gbɔ na","-1":"ƒe si va yi"},"relativeTime":{"future":{"one":"le ƒe {0} me","other":"le ƒe {0} wo me"},"past":{"one":"ƒe {0} si va yi","other":"ƒe {0} si wo va yi"}}},"month":{"displayName":"ɣleti","relative":{"0":"ɣleti sia","1":"ɣleti si gbɔ na","-1":"ɣleti si va yi"},"relativeTime":{"future":{"one":"le ɣleti {0} me","other":"le ɣleti {0} wo me"},"past":{"one":"ɣleti {0} si va yi","other":"ɣleti {0} si wo va yi"}}},"day":{"displayName":"ŋkeke","relative":{"0":"egbe","1":"etsɔ si gbɔna","2":"nyitsɔ si gbɔna","-1":"etsɔ si va yi","-2":"nyitsɔ si va yi"},"relativeTime":{"future":{"one":"le ŋkeke {0} me","other":"le ŋkeke {0} wo me"},"past":{"one":"ŋkeke {0} si va yi","other":"ŋkeke {0} si wo va yi"}}},"hour":{"displayName":"gaƒoƒo","relativeTime":{"future":{"one":"le gaƒoƒo {0} me","other":"le gaƒoƒo {0} wo me"},"past":{"one":"gaƒoƒo {0} si va yi","other":"gaƒoƒo {0} si wo va yi"}}},"minute":{"displayName":"aɖabaƒoƒo","relativeTime":{"future":{"one":"le aɖabaƒoƒo {0} me","other":"le aɖabaƒoƒo {0} wo me"},"past":{"one":"aɖabaƒoƒo {0} si va yi","other":"aɖabaƒoƒo {0} si wo va yi"}}},"second":{"displayName":"sekend","relative":{"0":"fifi"},"relativeTime":{"future":{"one":"le sekend {0} me","other":"le sekend {0} wo me"},"past":{"one":"sekend {0} si va yi","other":"sekend {0} si wo va yi"}}}}},{"locale":"ee-GH","parentLocale":"ee"},{"locale":"ee-TG","parentLocale":"ee"},{"locale":"el","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Έτος","relative":{"0":"φέτος","1":"επόμενο έτος","-1":"προηγούμενο έτος"},"relativeTime":{"future":{"one":"σε {0} έτος","other":"σε {0} έτη"},"past":{"one":"πριν από {0} έτος","other":"πριν από {0} έτη"}}},"month":{"displayName":"Μήνας","relative":{"0":"τρέχων μήνας","1":"επόμενος μήνας","-1":"προηγούμενος μήνας"},"relativeTime":{"future":{"one":"σε {0} μήνα","other":"σε {0} μήνες"},"past":{"one":"πριν από {0} μήνα","other":"πριν από {0} μήνες"}}},"day":{"displayName":"Ημέρα","relative":{"0":"σήμερα","1":"αύριο","2":"μεθαύριο","-1":"χθες","-2":"προχθές"},"relativeTime":{"future":{"one":"σε {0} ημέρα","other":"σε {0} ημέρες"},"past":{"one":"πριν από {0} ημέρα","other":"πριν από {0} ημέρες"}}},"hour":{"displayName":"Ώρα","relativeTime":{"future":{"one":"σε {0} ώρα","other":"σε {0} ώρες"},"past":{"one":"πριν από {0} ώρα","other":"πριν από {0} ώρες"}}},"minute":{"displayName":"Λεπτό","relativeTime":{"future":{"one":"σε {0} λεπτό","other":"σε {0} λεπτά"},"past":{"one":"πριν από {0} λεπτό","other":"πριν από {0} λεπτά"}}},"second":{"displayName":"Δευτερόλεπτο","relative":{"0":"τώρα"},"relativeTime":{"future":{"one":"σε {0} δευτερόλεπτο","other":"σε {0} δευτερόλεπτα"},"past":{"one":"πριν από {0} δευτερόλεπτο","other":"πριν από {0} δευτερόλεπτα"}}}}},{"locale":"el-CY","parentLocale":"el"},{"locale":"el-GR","parentLocale":"el"},{"locale":"en","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2);if(ord)return n10 == 1 && n100 != 11?"one":n10 == 2 && n100 != 12?"two":n10 == 3 && n100 != 13?"few":"other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"in {0} year","other":"in {0} years"},"past":{"one":"{0} year ago","other":"{0} years ago"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"in {0} month","other":"in {0} months"},"past":{"one":"{0} month ago","other":"{0} months ago"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"one":"in {0} hour","other":"in {0} hours"},"past":{"one":"{0} hour ago","other":"{0} hours ago"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"one":"in {0} minute","other":"in {0} minutes"},"past":{"one":"{0} minute ago","other":"{0} minutes ago"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} second","other":"in {0} seconds"},"past":{"one":"{0} second ago","other":"{0} seconds ago"}}}}},{"locale":"en-001","parentLocale":"en"},{"locale":"en-150","parentLocale":"en-GB"},{"locale":"en-GB","parentLocale":"en-001"},{"locale":"en-AG","parentLocale":"en-001"},{"locale":"en-AI","parentLocale":"en-001"},{"locale":"en-AS","parentLocale":"en"},{"locale":"en-AU","parentLocale":"en-GB","fields":{"year":{"displayName":"Year","relative":{"0":"This year","1":"Next year","-1":"Last year"},"relativeTime":{"future":{"one":"in {0} year","other":"in {0} years"},"past":{"one":"{0} year ago","other":"{0} years ago"}}},"month":{"displayName":"Month","relative":{"0":"This month","1":"Next month","-1":"Last month"},"relativeTime":{"future":{"one":"in {0} month","other":"in {0} months"},"past":{"one":"{0} month ago","other":"{0} months ago"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"one":"in {0} hour","other":"in {0} hours"},"past":{"one":"{0} hour ago","other":"{0} hours ago"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"one":"in {0} minute","other":"in {0} minutes"},"past":{"one":"{0} minute ago","other":"{0} minutes ago"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} second","other":"in {0} seconds"},"past":{"one":"{0} second ago","other":"{0} seconds ago"}}}}},{"locale":"en-BB","parentLocale":"en-001"},{"locale":"en-BE","parentLocale":"en-GB"},{"locale":"en-BM","parentLocale":"en-001"},{"locale":"en-BS","parentLocale":"en-001"},{"locale":"en-BW","parentLocale":"en-001"},{"locale":"en-BZ","parentLocale":"en-001"},{"locale":"en-CA","parentLocale":"en"},{"locale":"en-CC","parentLocale":"en-001"},{"locale":"en-CK","parentLocale":"en-001"},{"locale":"en-CM","parentLocale":"en-001"},{"locale":"en-CX","parentLocale":"en-001"},{"locale":"en-DG","parentLocale":"en-GB"},{"locale":"en-DM","parentLocale":"en-001"},{"locale":"en-Dsrt","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"en-ER","parentLocale":"en-001"},{"locale":"en-FJ","parentLocale":"en-001"},{"locale":"en-FK","parentLocale":"en-GB"},{"locale":"en-FM","parentLocale":"en-001"},{"locale":"en-GD","parentLocale":"en-001"},{"locale":"en-GG","parentLocale":"en-GB"},{"locale":"en-GH","parentLocale":"en-001"},{"locale":"en-GI","parentLocale":"en-GB"},{"locale":"en-GM","parentLocale":"en-001"},{"locale":"en-GU","parentLocale":"en"},{"locale":"en-GY","parentLocale":"en-001"},{"locale":"en-HK","parentLocale":"en-GB"},{"locale":"en-IE","parentLocale":"en-GB"},{"locale":"en-IM","parentLocale":"en-GB"},{"locale":"en-IN","parentLocale":"en-GB"},{"locale":"en-IO","parentLocale":"en-GB"},{"locale":"en-JE","parentLocale":"en-GB"},{"locale":"en-JM","parentLocale":"en-001"},{"locale":"en-KE","parentLocale":"en-001"},{"locale":"en-KI","parentLocale":"en-001"},{"locale":"en-KN","parentLocale":"en-001"},{"locale":"en-KY","parentLocale":"en-001"},{"locale":"en-LC","parentLocale":"en-001"},{"locale":"en-LR","parentLocale":"en-001"},{"locale":"en-LS","parentLocale":"en-001"},{"locale":"en-MG","parentLocale":"en-001"},{"locale":"en-MH","parentLocale":"en"},{"locale":"en-MO","parentLocale":"en-GB"},{"locale":"en-MP","parentLocale":"en"},{"locale":"en-MS","parentLocale":"en-001"},{"locale":"en-MT","parentLocale":"en-GB"},{"locale":"en-MU","parentLocale":"en-001"},{"locale":"en-MW","parentLocale":"en-001"},{"locale":"en-MY","parentLocale":"en-001"},{"locale":"en-NA","parentLocale":"en-001"},{"locale":"en-NF","parentLocale":"en-001"},{"locale":"en-NG","parentLocale":"en-001"},{"locale":"en-NR","parentLocale":"en-001"},{"locale":"en-NU","parentLocale":"en-001"},{"locale":"en-NZ","parentLocale":"en-GB"},{"locale":"en-PG","parentLocale":"en-001"},{"locale":"en-PH","parentLocale":"en-001"},{"locale":"en-PK","parentLocale":"en-GB"},{"locale":"en-PN","parentLocale":"en-001"},{"locale":"en-PR","parentLocale":"en"},{"locale":"en-PW","parentLocale":"en-001"},{"locale":"en-RW","parentLocale":"en-001"},{"locale":"en-SB","parentLocale":"en-001"},{"locale":"en-SC","parentLocale":"en-001"},{"locale":"en-SD","parentLocale":"en-001"},{"locale":"en-SG","parentLocale":"en-GB"},{"locale":"en-SH","parentLocale":"en-GB"},{"locale":"en-SL","parentLocale":"en-001"},{"locale":"en-SS","parentLocale":"en-001"},{"locale":"en-SX","parentLocale":"en-001"},{"locale":"en-SZ","parentLocale":"en-001"},{"locale":"en-TC","parentLocale":"en-001"},{"locale":"en-TK","parentLocale":"en-001"},{"locale":"en-TO","parentLocale":"en-001"},{"locale":"en-TT","parentLocale":"en-001"},{"locale":"en-TV","parentLocale":"en-001"},{"locale":"en-TZ","parentLocale":"en-001"},{"locale":"en-UG","parentLocale":"en-001"},{"locale":"en-UM","parentLocale":"en"},{"locale":"en-US","parentLocale":"en"},{"locale":"en-US-POSIX","parentLocale":"en-US"},{"locale":"en-VC","parentLocale":"en-001"},{"locale":"en-VG","parentLocale":"en-GB"},{"locale":"en-VI","parentLocale":"en"},{"locale":"en-VU","parentLocale":"en-001"},{"locale":"en-WS","parentLocale":"en-001"},{"locale":"en-ZA","parentLocale":"en-001"},{"locale":"en-ZM","parentLocale":"en-001"},{"locale":"en-ZW","parentLocale":"en-001"},{"locale":"eo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"jaro","relative":{"0":"nuna jaro","1":"venonta jaro","-1":"pasinta jaro"},"relativeTime":{"future":{"one":"post {0} jaro","other":"post {0} jaroj"},"past":{"one":"antaŭ {0} jaro","other":"antaŭ {0} jaroj"}}},"month":{"displayName":"monato","relative":{"0":"nuna monato","1":"venonta monato","-1":"pasinta monato"},"relativeTime":{"future":{"one":"post {0} monato","other":"post {0} monatoj"},"past":{"one":"antaŭ {0} monato","other":"antaŭ {0} monatoj"}}},"day":{"displayName":"tago","relative":{"0":"hodiaŭ","1":"morgaŭ","-1":"hieraŭ"},"relativeTime":{"future":{"one":"post {0} tago","other":"post {0} tagoj"},"past":{"one":"antaŭ {0} tago","other":"antaŭ {0} tagoj"}}},"hour":{"displayName":"horo","relativeTime":{"future":{"one":"post {0} horo","other":"post {0} horoj"},"past":{"one":"antaŭ {0} horo","other":"antaŭ {0} horoj"}}},"minute":{"displayName":"minuto","relativeTime":{"future":{"one":"post {0} minuto","other":"post {0} minutoj"},"past":{"one":"antaŭ {0} minuto","other":"antaŭ {0} minutoj"}}},"second":{"displayName":"sekundo","relative":{"0":"now"},"relativeTime":{"future":{"one":"post {0} sekundo","other":"post {0} sekundoj"},"past":{"one":"antaŭ {0} sekundo","other":"antaŭ {0} sekundoj"}}}}},{"locale":"eo-001","parentLocale":"eo"},{"locale":"es","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Año","relative":{"0":"este año","1":"el próximo año","-1":"el año pasado"},"relativeTime":{"future":{"one":"dentro de {0} año","other":"dentro de {0} años"},"past":{"one":"hace {0} año","other":"hace {0} años"}}},"month":{"displayName":"Mes","relative":{"0":"este mes","1":"el próximo mes","-1":"el mes pasado"},"relativeTime":{"future":{"one":"dentro de {0} mes","other":"dentro de {0} meses"},"past":{"one":"hace {0} mes","other":"hace {0} meses"}}},"day":{"displayName":"Día","relative":{"0":"hoy","1":"mañana","2":"pasado mañana","-1":"ayer","-2":"antes de ayer"},"relativeTime":{"future":{"one":"dentro de {0} día","other":"dentro de {0} días"},"past":{"one":"hace {0} día","other":"hace {0} días"}}},"hour":{"displayName":"Hora","relativeTime":{"future":{"one":"dentro de {0} hora","other":"dentro de {0} horas"},"past":{"one":"hace {0} hora","other":"hace {0} horas"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"one":"dentro de {0} minuto","other":"dentro de {0} minutos"},"past":{"one":"hace {0} minuto","other":"hace {0} minutos"}}},"second":{"displayName":"Segundo","relative":{"0":"ahora"},"relativeTime":{"future":{"one":"dentro de {0} segundo","other":"dentro de {0} segundos"},"past":{"one":"hace {0} segundo","other":"hace {0} segundos"}}}}},{"locale":"es-419","parentLocale":"es","fields":{"year":{"displayName":"Año","relative":{"0":"Este año","1":"Año próximo","-1":"Año pasado"},"relativeTime":{"future":{"one":"En {0} año","other":"En {0} años"},"past":{"one":"hace {0} año","other":"hace {0} años"}}},"month":{"displayName":"Mes","relative":{"0":"Este mes","1":"Mes próximo","-1":"El mes pasado"},"relativeTime":{"future":{"one":"En {0} mes","other":"En {0} meses"},"past":{"one":"hace {0} mes","other":"hace {0} meses"}}},"day":{"displayName":"Día","relative":{"0":"hoy","1":"mañana","2":"pasado mañana","-1":"ayer","-2":"antes de ayer"},"relativeTime":{"future":{"one":"En {0} día","other":"En {0} días"},"past":{"one":"hace {0} día","other":"hace {0} días"}}},"hour":{"displayName":"Hora","relativeTime":{"future":{"one":"En {0} hora","other":"En {0} horas"},"past":{"one":"hace {0} hora","other":"hace {0} horas"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"one":"En {0} minuto","other":"En {0} minutos"},"past":{"one":"hace {0} minuto","other":"hace {0} minutos"}}},"second":{"displayName":"Segundo","relative":{"0":"ahora"},"relativeTime":{"future":{"one":"En {0} segundo","other":"En {0} segundos"},"past":{"one":"hace {0} segundo","other":"hace {0} segundos"}}}}},{"locale":"es-AR","parentLocale":"es-419"},{"locale":"es-BO","parentLocale":"es-419"},{"locale":"es-CL","parentLocale":"es-419"},{"locale":"es-CO","parentLocale":"es-419"},{"locale":"es-CR","parentLocale":"es-419"},{"locale":"es-CU","parentLocale":"es-419"},{"locale":"es-DO","parentLocale":"es-419"},{"locale":"es-EA","parentLocale":"es"},{"locale":"es-EC","parentLocale":"es-419"},{"locale":"es-ES","parentLocale":"es"},{"locale":"es-GQ","parentLocale":"es"},{"locale":"es-GT","parentLocale":"es-419"},{"locale":"es-HN","parentLocale":"es-419"},{"locale":"es-IC","parentLocale":"es"},{"locale":"es-MX","parentLocale":"es-419","fields":{"year":{"displayName":"Año","relative":{"0":"este año","1":"el año próximo","-1":"el año pasado"},"relativeTime":{"future":{"one":"En {0} año","other":"En {0} años"},"past":{"one":"hace {0} año","other":"hace {0} años"}}},"month":{"displayName":"Mes","relative":{"0":"este mes","1":"el mes próximo","-1":"el mes pasado"},"relativeTime":{"future":{"one":"en {0} mes","other":"en {0} meses"},"past":{"one":"hace {0} mes","other":"hace {0} meses"}}},"day":{"displayName":"Día","relative":{"0":"hoy","1":"mañana","2":"pasado mañana","-1":"ayer","-2":"antes de ayer"},"relativeTime":{"future":{"one":"En {0} día","other":"En {0} días"},"past":{"one":"hace {0} día","other":"hace {0} días"}}},"hour":{"displayName":"Hora","relativeTime":{"future":{"one":"En {0} hora","other":"En {0} horas"},"past":{"one":"hace {0} hora","other":"hace {0} horas"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"one":"En {0} minuto","other":"En {0} minutos"},"past":{"one":"hace {0} minuto","other":"hace {0} minutos"}}},"second":{"displayName":"Segundo","relative":{"0":"ahora"},"relativeTime":{"future":{"one":"En {0} segundo","other":"En {0} segundos"},"past":{"one":"hace {0} segundo","other":"hace {0} segundos"}}}}},{"locale":"es-NI","parentLocale":"es-419"},{"locale":"es-PA","parentLocale":"es-419"},{"locale":"es-PE","parentLocale":"es-419"},{"locale":"es-PH","parentLocale":"es"},{"locale":"es-PR","parentLocale":"es-419"},{"locale":"es-PY","parentLocale":"es-419"},{"locale":"es-SV","parentLocale":"es-419"},{"locale":"es-US","parentLocale":"es-419"},{"locale":"es-UY","parentLocale":"es-419"},{"locale":"es-VE","parentLocale":"es-419"},{"locale":"et","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"aasta","relative":{"0":"käesolev aasta","1":"järgmine aasta","-1":"eelmine aasta"},"relativeTime":{"future":{"one":"{0} aasta pärast","other":"{0} aasta pärast"},"past":{"one":"{0} aasta eest","other":"{0} aasta eest"}}},"month":{"displayName":"kuu","relative":{"0":"käesolev kuu","1":"järgmine kuu","-1":"eelmine kuu"},"relativeTime":{"future":{"one":"{0} kuu pärast","other":"{0} kuu pärast"},"past":{"one":"{0} kuu eest","other":"{0} kuu eest"}}},"day":{"displayName":"päev","relative":{"0":"täna","1":"homme","2":"ülehomme","-1":"eile","-2":"üleeile"},"relativeTime":{"future":{"one":"{0} päeva pärast","other":"{0} päeva pärast"},"past":{"one":"{0} päeva eest","other":"{0} päeva eest"}}},"hour":{"displayName":"tund","relativeTime":{"future":{"one":"{0} tunni pärast","other":"{0} tunni pärast"},"past":{"one":"{0} tunni eest","other":"{0} tunni eest"}}},"minute":{"displayName":"minut","relativeTime":{"future":{"one":"{0} minuti pärast","other":"{0} minuti pärast"},"past":{"one":"{0} minuti eest","other":"{0} minuti eest"}}},"second":{"displayName":"sekund","relative":{"0":"nüüd"},"relativeTime":{"future":{"one":"{0} sekundi pärast","other":"{0} sekundi pärast"},"past":{"one":"{0} sekundi eest","other":"{0} sekundi eest"}}}}},{"locale":"et-EE","parentLocale":"et"},{"locale":"eu","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Urtea","relative":{"0":"aurten","1":"hurrengo urtea","-1":"aurreko urtea"},"relativeTime":{"future":{"one":"{0} urte barru","other":"{0} urte barru"},"past":{"one":"Duela {0} urte","other":"Duela {0} urte"}}},"month":{"displayName":"Hilabetea","relative":{"0":"hilabete hau","1":"hurrengo hilabetea","-1":"aurreko hilabetea"},"relativeTime":{"future":{"one":"{0} hilabete barru","other":"{0} hilabete barru"},"past":{"one":"Duela {0} hilabete","other":"Duela {0} hilabete"}}},"day":{"displayName":"Eguna","relative":{"0":"gaur","1":"bihar","2":"etzi","-1":"atzo","-2":"herenegun"},"relativeTime":{"future":{"one":"{0} egun barru","other":"{0} egun barru"},"past":{"one":"Duela {0} egun","other":"Duela {0} egun"}}},"hour":{"displayName":"Ordua","relativeTime":{"future":{"one":"{0} ordu barru","other":"{0} ordu barru"},"past":{"one":"Duela {0} ordu","other":"Duela {0} ordu"}}},"minute":{"displayName":"Minutua","relativeTime":{"future":{"one":"{0} minutu barru","other":"{0} minutu barru"},"past":{"one":"Duela {0} minutu","other":"Duela {0} minutu"}}},"second":{"displayName":"Segundoa","relative":{"0":"orain"},"relativeTime":{"future":{"one":"{0} segundo barru","other":"{0} segundo barru"},"past":{"one":"Duela {0} segundo","other":"Duela {0} segundo"}}}}},{"locale":"eu-ES","parentLocale":"eu"},{"locale":"ewo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"M̀bú","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ngɔn","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Amǒs","relative":{"0":"Aná","1":"Okírí","-1":"Angogé"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Awola","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Enútɛn","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Akábəga","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ewo-CM","parentLocale":"ewo"},{"locale":"fa","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n >= 0 && n <= 1?"one":"other"},"fields":{"year":{"displayName":"سال","relative":{"0":"امسال","1":"سال آینده","-1":"سال گذشته"},"relativeTime":{"future":{"one":"{0} سال بعد","other":"{0} سال بعد"},"past":{"one":"{0} سال پیش","other":"{0} سال پیش"}}},"month":{"displayName":"ماه","relative":{"0":"این ماه","1":"ماه آینده","-1":"ماه گذشته"},"relativeTime":{"future":{"one":"{0} ماه بعد","other":"{0} ماه بعد"},"past":{"one":"{0} ماه پیش","other":"{0} ماه پیش"}}},"day":{"displayName":"روز","relative":{"0":"امروز","1":"فردا","2":"پس‌فردا","-1":"دیروز","-2":"پریروز"},"relativeTime":{"future":{"one":"{0} روز بعد","other":"{0} روز بعد"},"past":{"one":"{0} روز پیش","other":"{0} روز پیش"}}},"hour":{"displayName":"ساعت","relativeTime":{"future":{"one":"{0} ساعت بعد","other":"{0} ساعت بعد"},"past":{"one":"{0} ساعت پیش","other":"{0} ساعت پیش"}}},"minute":{"displayName":"دقیقه","relativeTime":{"future":{"one":"{0} دقیقه بعد","other":"{0} دقیقه بعد"},"past":{"one":"{0} دقیقه پیش","other":"{0} دقیقه پیش"}}},"second":{"displayName":"ثانیه","relative":{"0":"اکنون"},"relativeTime":{"future":{"one":"{0} ثانیه بعد","other":"{0} ثانیه بعد"},"past":{"one":"{0} ثانیه پیش","other":"{0} ثانیه پیش"}}}}},{"locale":"fa-AF","parentLocale":"fa"},{"locale":"fa-IR","parentLocale":"fa"},{"locale":"ff","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n >= 0 && n < 2?"one":"other"},"fields":{"year":{"displayName":"Hitaande","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Lewru","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ñalnde","relative":{"0":"Hannde","1":"Jaŋngo","-1":"Haŋki"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Waktu","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Hoƴom","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Majaango","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ff-CM","parentLocale":"ff"},{"locale":"ff-GN","parentLocale":"ff"},{"locale":"ff-MR","parentLocale":"ff"},{"locale":"ff-SN","parentLocale":"ff"},{"locale":"fi","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"vuosi","relative":{"0":"tänä vuonna","1":"ensi vuonna","-1":"viime vuonna"},"relativeTime":{"future":{"one":"{0} vuoden päästä","other":"{0} vuoden päästä"},"past":{"one":"{0} vuosi sitten","other":"{0} vuotta sitten"}}},"month":{"displayName":"kuukausi","relative":{"0":"tässä kuussa","1":"ensi kuussa","-1":"viime kuussa"},"relativeTime":{"future":{"one":"{0} kuukauden päästä","other":"{0} kuukauden päästä"},"past":{"one":"{0} kuukausi sitten","other":"{0} kuukautta sitten"}}},"day":{"displayName":"päivä","relative":{"0":"tänään","1":"huomenna","2":"ylihuomenna","-1":"eilen","-2":"toissa päivänä"},"relativeTime":{"future":{"one":"{0} päivän päästä","other":"{0} päivän päästä"},"past":{"one":"{0} päivä sitten","other":"{0} päivää sitten"}}},"hour":{"displayName":"tunti","relativeTime":{"future":{"one":"{0} tunnin päästä","other":"{0} tunnin päästä"},"past":{"one":"{0} tunti sitten","other":"{0} tuntia sitten"}}},"minute":{"displayName":"minuutti","relativeTime":{"future":{"one":"{0} minuutin päästä","other":"{0} minuutin päästä"},"past":{"one":"{0} minuutti sitten","other":"{0} minuuttia sitten"}}},"second":{"displayName":"sekunti","relative":{"0":"nyt"},"relativeTime":{"future":{"one":"{0} sekunnin päästä","other":"{0} sekunnin päästä"},"past":{"one":"{0} sekunti sitten","other":"{0} sekuntia sitten"}}}}},{"locale":"fi-FI","parentLocale":"fi"},{"locale":"fil","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i10=i.slice(-1),f10=f.slice(-1);if(ord)return n == 1?"one":"other";return v0 && (i == 1 || i == 2 || i == 3) || v0 && i10 != 4 && i10 != 6 && i10 != 9 || !v0 && f10 != 4 && f10 != 6 && f10 != 9?"one":"other"},"fields":{"year":{"displayName":"Taon","relative":{"0":"ngayong taon","1":"susunod na taon","-1":"nakaraang taon"},"relativeTime":{"future":{"one":"sa {0} taon","other":"sa {0} (na) taon"},"past":{"one":"{0} taon ang nakalipas","other":"{0} (na) taon ang nakalipas"}}},"month":{"displayName":"Buwan","relative":{"0":"ngayong buwan","1":"susunod na buwan","-1":"nakaraang buwan"},"relativeTime":{"future":{"one":"sa {0} buwan","other":"sa {0} (na) buwan"},"past":{"one":"{0} buwan ang nakalipas","other":"{0} (na) buwan ang nakalipas"}}},"day":{"displayName":"Araw","relative":{"0":"ngayong araw","1":"bukas","2":"Samakalawa","-1":"kahapon","-2":"Araw bago ang kahapon"},"relativeTime":{"future":{"one":"sa {0} araw","other":"sa {0} (na) araw"},"past":{"one":"{0} araw ang nakalipas","other":"{0} (na) araw ang nakalipas"}}},"hour":{"displayName":"Oras","relativeTime":{"future":{"one":"sa {0} oras","other":"sa {0} (na) oras"},"past":{"one":"{0} oras ang nakalipas","other":"{0} (na) oras ang nakalipas"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"one":"sa {0} minuto","other":"sa {0} (na) minuto"},"past":{"one":"{0} minuto ang nakalipas","other":"sa {0} (na) minuto"}}},"second":{"displayName":"Segundo","relative":{"0":"ngayon"},"relativeTime":{"future":{"one":"sa {0} segundo","other":"sa {0} (na) segundo"},"past":{"one":"{0} segundo ang nakalipas","other":"{0} (na) segundo ang nakalipas"}}}}},{"locale":"fil-PH","parentLocale":"fil"},{"locale":"fo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"ár","relative":{"0":"hetta ár","1":"næstu ár","-1":"síðstu ár"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"mánuður","relative":{"0":"henda mánuður","1":"næstu mánuður","-1":"síðstu mánuður"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"dagur","relative":{"0":"í dag","1":"á morgunn","2":"á yfirmorgunn","-1":"í gær","-2":"í fyrradag"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"klukkustund","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"mínúta","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"sekund","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"fo-FO","parentLocale":"fo"},{"locale":"fr","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1?"one":"other";return n >= 0 && n < 2?"one":"other"},"fields":{"year":{"displayName":"année","relative":{"0":"cette année","1":"l’année prochaine","-1":"l’année dernière"},"relativeTime":{"future":{"one":"dans {0} an","other":"dans {0} ans"},"past":{"one":"il y a {0} an","other":"il y a {0} ans"}}},"month":{"displayName":"mois","relative":{"0":"ce mois-ci","1":"le mois prochain","-1":"le mois dernier"},"relativeTime":{"future":{"one":"dans {0} mois","other":"dans {0} mois"},"past":{"one":"il y a {0} mois","other":"il y a {0} mois"}}},"day":{"displayName":"jour","relative":{"0":"aujourd’hui","1":"demain","2":"après-demain","-1":"hier","-2":"avant-hier"},"relativeTime":{"future":{"one":"dans {0} jour","other":"dans {0} jours"},"past":{"one":"il y a {0} jour","other":"il y a {0} jours"}}},"hour":{"displayName":"heure","relativeTime":{"future":{"one":"dans {0} heure","other":"dans {0} heures"},"past":{"one":"il y a {0} heure","other":"il y a {0} heures"}}},"minute":{"displayName":"minute","relativeTime":{"future":{"one":"dans {0} minute","other":"dans {0} minutes"},"past":{"one":"il y a {0} minute","other":"il y a {0} minutes"}}},"second":{"displayName":"seconde","relative":{"0":"maintenant"},"relativeTime":{"future":{"one":"dans {0} seconde","other":"dans {0} secondes"},"past":{"one":"il y a {0} seconde","other":"il y a {0} secondes"}}}}},{"locale":"fr-BE","parentLocale":"fr"},{"locale":"fr-BF","parentLocale":"fr"},{"locale":"fr-BI","parentLocale":"fr"},{"locale":"fr-BJ","parentLocale":"fr"},{"locale":"fr-BL","parentLocale":"fr"},{"locale":"fr-CA","parentLocale":"fr","fields":{"year":{"displayName":"année","relative":{"0":"cette année","1":"l’année prochaine","-1":"l’année dernière"},"relativeTime":{"future":{"one":"Dans {0} an","other":"Dans {0} ans"},"past":{"one":"Il y a {0} an","other":"Il y a {0} ans"}}},"month":{"displayName":"mois","relative":{"0":"ce mois-ci","1":"le mois prochain","-1":"le mois dernier"},"relativeTime":{"future":{"one":"Dans {0} mois","other":"Dans {0} mois"},"past":{"one":"Il y a {0} mois","other":"Il y a {0} mois"}}},"day":{"displayName":"jour","relative":{"0":"aujourd’hui","1":"demain","2":"après-demain","-1":"hier","-2":"avant-hier"},"relativeTime":{"future":{"one":"Dans {0} jour","other":"Dans {0} jours"},"past":{"one":"Il y a {0} jour","other":"Il y a {0} jours"}}},"hour":{"displayName":"heure","relativeTime":{"future":{"one":"Dans {0} heure","other":"Dans {0} heures"},"past":{"one":"Il y a {0} heure","other":"Il y a {0} heures"}}},"minute":{"displayName":"minute","relativeTime":{"future":{"one":"Dans {0} minute","other":"Dans {0} minutes"},"past":{"one":"Il y a {0} minute","other":"Il y a {0} minutes"}}},"second":{"displayName":"seconde","relative":{"0":"maintenant"},"relativeTime":{"future":{"one":"Dans {0} seconde","other":"Dans {0} secondes"},"past":{"one":"Il y a {0} seconde","other":"Il y a {0} secondes"}}}}},{"locale":"fr-CD","parentLocale":"fr"},{"locale":"fr-CF","parentLocale":"fr"},{"locale":"fr-CG","parentLocale":"fr"},{"locale":"fr-CH","parentLocale":"fr"},{"locale":"fr-CI","parentLocale":"fr"},{"locale":"fr-CM","parentLocale":"fr"},{"locale":"fr-DJ","parentLocale":"fr"},{"locale":"fr-DZ","parentLocale":"fr"},{"locale":"fr-FR","parentLocale":"fr"},{"locale":"fr-GA","parentLocale":"fr"},{"locale":"fr-GF","parentLocale":"fr"},{"locale":"fr-GN","parentLocale":"fr"},{"locale":"fr-GP","parentLocale":"fr"},{"locale":"fr-GQ","parentLocale":"fr"},{"locale":"fr-HT","parentLocale":"fr"},{"locale":"fr-KM","parentLocale":"fr"},{"locale":"fr-LU","parentLocale":"fr"},{"locale":"fr-MA","parentLocale":"fr"},{"locale":"fr-MC","parentLocale":"fr"},{"locale":"fr-MF","parentLocale":"fr"},{"locale":"fr-MG","parentLocale":"fr"},{"locale":"fr-ML","parentLocale":"fr"},{"locale":"fr-MQ","parentLocale":"fr"},{"locale":"fr-MR","parentLocale":"fr"},{"locale":"fr-MU","parentLocale":"fr"},{"locale":"fr-NC","parentLocale":"fr"},{"locale":"fr-NE","parentLocale":"fr"},{"locale":"fr-PF","parentLocale":"fr"},{"locale":"fr-PM","parentLocale":"fr"},{"locale":"fr-RE","parentLocale":"fr"},{"locale":"fr-RW","parentLocale":"fr"},{"locale":"fr-SC","parentLocale":"fr"},{"locale":"fr-SN","parentLocale":"fr"},{"locale":"fr-SY","parentLocale":"fr"},{"locale":"fr-TD","parentLocale":"fr"},{"locale":"fr-TG","parentLocale":"fr"},{"locale":"fr-TN","parentLocale":"fr"},{"locale":"fr-VU","parentLocale":"fr"},{"locale":"fr-WF","parentLocale":"fr"},{"locale":"fr-YT","parentLocale":"fr"},{"locale":"fur","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"an","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"ca di {0} an","other":"ca di {0} agns"},"past":{"one":"{0} an indaûr","other":"{0} agns indaûr"}}},"month":{"displayName":"mês","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"ca di {0} mês","other":"ca di {0} mês"},"past":{"one":"{0} mês indaûr","other":"{0} mês indaûr"}}},"day":{"displayName":"dì","relative":{"0":"vuê","1":"doman","2":"passantdoman","-1":"îr","-2":"îr l’altri"},"relativeTime":{"future":{"one":"ca di {0} zornade","other":"ca di {0} zornadis"},"past":{"one":"{0} zornade indaûr","other":"{0} zornadis indaûr"}}},"hour":{"displayName":"ore","relativeTime":{"future":{"one":"ca di {0} ore","other":"ca di {0} oris"},"past":{"one":"{0} ore indaûr","other":"{0} oris indaûr"}}},"minute":{"displayName":"minût","relativeTime":{"future":{"one":"ca di {0} minût","other":"ca di {0} minûts"},"past":{"one":"{0} minût indaûr","other":"{0} minûts indaûr"}}},"second":{"displayName":"secont","relative":{"0":"now"},"relativeTime":{"future":{"one":"ca di {0} secont","other":"ca di {0} seconts"},"past":{"one":"{0} secont indaûr","other":"{0} seconts indaûr"}}}}},{"locale":"fur-IT","parentLocale":"fur"},{"locale":"fy","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Jier","relative":{"0":"dit jier","1":"folgjend jier","-1":"foarich jier"},"relativeTime":{"future":{"one":"Oer {0} jier","other":"Oer {0} jier"},"past":{"one":"{0} jier lyn","other":"{0} jier lyn"}}},"month":{"displayName":"Moanne","relative":{"0":"dizze moanne","1":"folgjende moanne","-1":"foarige moanne"},"relativeTime":{"future":{"one":"Oer {0} moanne","other":"Oer {0} moannen"},"past":{"one":"{0} moanne lyn","other":"{0} moannen lyn"}}},"day":{"displayName":"dei","relative":{"0":"vandaag","1":"morgen","2":"Oermorgen","-1":"gisteren","-2":"eergisteren"},"relativeTime":{"future":{"one":"Oer {0} dei","other":"Oer {0} deien"},"past":{"one":"{0} dei lyn","other":"{0} deien lyn"}}},"hour":{"displayName":"oere","relativeTime":{"future":{"one":"Oer {0} oere","other":"Oer {0} oere"},"past":{"one":"{0} oere lyn","other":"{0} oere lyn"}}},"minute":{"displayName":"Minút","relativeTime":{"future":{"one":"Oer {0} minút","other":"Oer {0} minuten"},"past":{"one":"{0} minút lyn","other":"{0} minuten lyn"}}},"second":{"displayName":"Sekonde","relative":{"0":"nu"},"relativeTime":{"future":{"one":"Oer {0} sekonde","other":"Oer {0} sekonden"},"past":{"one":"{0} sekonde lyn","other":"{0} sekonden lyn"}}}}},{"locale":"fy-NL","parentLocale":"fy"},{"locale":"ga","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n;if(ord)return "other";return n == 1?"one":n == 2?"two":t0 && n >= 3 && n <= 6?"few":t0 && n >= 7 && n <= 10?"many":"other"},"fields":{"year":{"displayName":"Bliain","relative":{"0":"an bhliain seo","1":"an bhliain seo chugainn","-1":"anuraidh"},"relativeTime":{"future":{"one":"i gceann {0} bhliain","two":"i gceann {0} bhliain","few":"i gceann {0} bliana","many":"i gceann {0} mbliana","other":"i gceann {0} bliain"},"past":{"one":"{0} bhliain ó shin","two":"{0} bhliain ó shin","few":"{0} bliana ó shin","many":"{0} mbliana ó shin","other":"{0} bliain ó shin"}}},"month":{"displayName":"Mí","relative":{"0":"an mhí seo","1":"an mhí seo chugainn","-1":"an mhí seo caite"},"relativeTime":{"future":{"one":"i gceann {0} mhí","two":"i gceann {0} mhí","few":"i gceann {0} mhí","many":"i gceann {0} mí","other":"i gceann {0} mí"},"past":{"one":"{0} mhí ó shin","two":"{0} mhí ó shin","few":"{0} mhí ó shin","many":"{0} mí ó shin","other":"{0} mí ó shin"}}},"day":{"displayName":"Lá","relative":{"0":"inniu","1":"amárach","2":"arú amárach","-1":"inné","-2":"arú inné"},"relativeTime":{"future":{"one":"i gceann {0} lá","two":"i gceann {0} lá","few":"i gceann {0} lá","many":"i gceann {0} lá","other":"i gceann {0} lá"},"past":{"one":"{0} lá ó shin","two":"{0} lá ó shin","few":"{0} lá ó shin","many":"{0} lá ó shin","other":"{0} lá ó shin"}}},"hour":{"displayName":"Uair","relativeTime":{"future":{"one":"i gceann {0} uair an chloig","two":"i gceann {0} uair an chloig","few":"i gceann {0} huaire an chloig","many":"i gceann {0} n-uaire an chloig","other":"i gceann {0} uair an chloig"},"past":{"one":"{0} uair an chloig ó shin","two":"{0} uair an chloig ó shin","few":"{0} huaire an chloig ó shin","many":"{0} n-uaire an chloig ó shin","other":"{0} uair an chloig ó shin"}}},"minute":{"displayName":"Nóiméad","relativeTime":{"future":{"one":"i gceann {0} nóiméad","two":"i gceann {0} nóiméad","few":"i gceann {0} nóiméad","many":"i gceann {0} nóiméad","other":"i gceann {0} nóiméad"},"past":{"one":"{0} nóiméad ó shin","two":"{0} nóiméad ó shin","few":"{0} nóiméad ó shin","many":"{0} nóiméad ó shin","other":"{0} nóiméad ó shin"}}},"second":{"displayName":"Soicind","relative":{"0":"now"},"relativeTime":{"future":{"one":"i gceann {0} soicind","two":"i gceann {0} shoicind","few":"i gceann {0} shoicind","many":"i gceann {0} soicind","other":"i gceann {0} soicind"},"past":{"one":"{0} soicind ó shin","two":"{0} shoicind ó shin","few":"{0} shoicind ó shin","many":"{0} soicind ó shin","other":"{0} soicind ó shin"}}}}},{"locale":"ga-IE","parentLocale":"ga"},{"locale":"gd","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n;if(ord)return "other";return n == 1 || n == 11?"one":n == 2 || n == 12?"two":t0 && n >= 3 && n <= 10 || t0 && n >= 13 && n <= 19?"few":"other"},"fields":{"year":{"displayName":"bliadhna","relative":{"0":"am bliadhna","1":"an ath-bhliadhna","-1":"an-uiridh","-2":"a-bhòn-uiridh"},"relativeTime":{"future":{"one":"an ceann {0} bhliadhna","two":"an ceann {0} bhliadhna","few":"an ceann {0} bliadhnaichean","other":"an ceann {0} bliadhna"},"past":{"one":"o chionn {0} bhliadhna","two":"o chionn {0} bhliadhna","few":"o chionn {0} bliadhnaichean","other":"o chionn {0} bliadhna"}}},"month":{"displayName":"mìos","relative":{"0":"am mìos seo","1":"an ath-mhìos","-1":"am mìos seo chaidh"},"relativeTime":{"future":{"one":"an ceann {0} mhìosa","two":"an ceann {0} mhìosa","few":"an ceann {0} mìosan","other":"an ceann {0} mìosa"},"past":{"one":"o chionn {0} mhìosa","two":"o chionn {0} mhìosa","few":"o chionn {0} mìosan","other":"o chionn {0} mìosa"}}},"day":{"displayName":"latha","relative":{"0":"an-diugh","1":"a-màireach","2":"an-earar","3":"an-eararais","-1":"an-dè","-2":"a-bhòin-dè"},"relativeTime":{"future":{"one":"an ceann {0} latha","two":"an ceann {0} latha","few":"an ceann {0} làithean","other":"an ceann {0} latha"},"past":{"one":"o chionn {0} latha","two":"o chionn {0} latha","few":"o chionn {0} làithean","other":"o chionn {0} latha"}}},"hour":{"displayName":"uair a thìde","relativeTime":{"future":{"one":"an ceann {0} uair a thìde","two":"an ceann {0} uair a thìde","few":"an ceann {0} uairean a thìde","other":"an ceann {0} uair a thìde"},"past":{"one":"o chionn {0} uair a thìde","two":"o chionn {0} uair a thìde","few":"o chionn {0} uairean a thìde","other":"o chionn {0} uair a thìde"}}},"minute":{"displayName":"mionaid","relativeTime":{"future":{"one":"an ceann {0} mhionaid","two":"an ceann {0} mhionaid","few":"an ceann {0} mionaidean","other":"an ceann {0} mionaid"},"past":{"one":"o chionn {0} mhionaid","two":"o chionn {0} mhionaid","few":"o chionn {0} mionaidean","other":"o chionn {0} mionaid"}}},"second":{"displayName":"diog","relative":{"0":"now"},"relativeTime":{"future":{"one":"an ceann {0} diog","two":"an ceann {0} dhiog","few":"an ceann {0} diogan","other":"an ceann {0} diog"},"past":{"one":"o chionn {0} diog","two":"o chionn {0} dhiog","few":"o chionn {0} diogan","other":"o chionn {0} diog"}}}}},{"locale":"gd-GB","parentLocale":"gd"},{"locale":"gl","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Ano","relative":{"0":"este ano","1":"seguinte ano","-1":"ano pasado"},"relativeTime":{"future":{"one":"En {0} ano","other":"En {0} anos"},"past":{"one":"Hai {0} ano","other":"Hai {0} anos"}}},"month":{"displayName":"Mes","relative":{"0":"este mes","1":"mes seguinte","-1":"mes pasado"},"relativeTime":{"future":{"one":"En {0} mes","other":"En {0} meses"},"past":{"one":"Hai {0} mes","other":"Hai {0} meses"}}},"day":{"displayName":"Día","relative":{"0":"hoxe","1":"mañá","2":"pasadomañá","-1":"onte","-2":"antonte"},"relativeTime":{"future":{"one":"En {0} día","other":"En {0} días"},"past":{"one":"Hai {0} día","other":"Hai {0} días"}}},"hour":{"displayName":"Hora","relativeTime":{"future":{"one":"En {0} hora","other":"En {0} horas"},"past":{"one":"Hai {0} hora","other":"Hai {0} horas"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"one":"En {0} minuto","other":"En {0} minutos"},"past":{"one":"Hai {0} minuto","other":"Hai {0} minutos"}}},"second":{"displayName":"Segundo","relative":{"0":"agora"},"relativeTime":{"future":{"one":"En {0} segundo","other":"En {0} segundos"},"past":{"one":"Hai {0} segundo","other":"Hai {0} segundos"}}}}},{"locale":"gl-ES","parentLocale":"gl"},{"locale":"gsw","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Jaar","relative":{"0":"diese Jaar","1":"nächste Jaar","-1":"letzte Jaar"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Monet","relative":{"0":"diese Monet","1":"nächste Monet","-1":"letzte Monet"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Tag","relative":{"0":"hüt","1":"moorn","2":"übermoorn","-1":"geschter","-2":"vorgeschter"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Schtund","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minuute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"gsw-CH","parentLocale":"gsw"},{"locale":"gsw-FR","parentLocale":"gsw"},{"locale":"gsw-LI","parentLocale":"gsw"},{"locale":"gu","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1?"one":n == 2 || n == 3?"two":n == 4?"few":n == 6?"many":"other";return n >= 0 && n <= 1?"one":"other"},"fields":{"year":{"displayName":"વર્ષ","relative":{"0":"આ વર્ષે","1":"આવતા વર્ષે","-1":"ગયા વર્ષે"},"relativeTime":{"future":{"one":"{0} વર્ષમાં","other":"{0} વર્ષમાં"},"past":{"one":"{0} વર્ષ પહેલા","other":"{0} વર્ષ પહેલા"}}},"month":{"displayName":"મહિનો","relative":{"0":"આ મહિને","1":"આવતા મહિને","-1":"ગયા મહિને"},"relativeTime":{"future":{"one":"{0} મહિનામાં","other":"{0} મહિનામાં"},"past":{"one":"{0} મહિના પહેલા","other":"{0} મહિના પહેલા"}}},"day":{"displayName":"દિવસ","relative":{"0":"આજે","1":"આવતીકાલે","2":"પરમદિવસે","-1":"ગઈકાલે","-2":"ગયા પરમદિવસે"},"relativeTime":{"future":{"one":"{0} દિવસમાં","other":"{0} દિવસમાં"},"past":{"one":"{0} દિવસ પહેલા","other":"{0} દિવસ પહેલા"}}},"hour":{"displayName":"કલાક","relativeTime":{"future":{"one":"{0} કલાકમાં","other":"{0} કલાકમાં"},"past":{"one":"{0} કલાક પહેલા","other":"{0} કલાક પહેલા"}}},"minute":{"displayName":"મિનિટ","relativeTime":{"future":{"one":"{0} મિનિટમાં","other":"{0} મિનિટમાં"},"past":{"one":"{0} મિનિટ પહેલા","other":"{0} મિનિટ પહેલા"}}},"second":{"displayName":"સેકન્ડ","relative":{"0":"હમણાં"},"relativeTime":{"future":{"one":"{0} સેકંડમાં","other":"{0} સેકંડમાં"},"past":{"one":"{0} સેકંડ પહેલા","other":"{0} સેકંડ પહેલા"}}}}},{"locale":"gu-IN","parentLocale":"gu"},{"locale":"guw","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"guz","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Omwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Omotienyi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Rituko","relative":{"0":"Rero","1":"Mambia","-1":"Igoro"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ensa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Edakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Esekendi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"guz-KE","parentLocale":"guz"},{"locale":"gv","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return "other";return v0 && i10 == 1?"one":v0 && i10 == 2?"two":v0 && (i100 == 0 || i100 == 20 || i100 == 40 || i100 == 60 || i100 == 80)?"few":!v0?"many":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"gv-IM","parentLocale":"gv"},{"locale":"ha","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Shekara","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Wata","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Kwana","relative":{"0":"Yau","1":"Gobe","-1":"Jiya"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Awa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Daƙiƙa","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ha-Arab","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ha-Latn","parentLocale":"ha"},{"locale":"ha-Latn-GH","parentLocale":"ha-Latn"},{"locale":"ha-Latn-NE","parentLocale":"ha-Latn"},{"locale":"ha-Latn-NG","parentLocale":"ha-Latn"},{"locale":"haw","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"haw-US","parentLocale":"haw"},{"locale":"he","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1);if(ord)return "other";return n == 1 && v0?"one":i == 2 && v0?"two":v0 && (n < 0 || n > 10) && t0 && n10 == 0?"many":"other"},"fields":{"year":{"displayName":"שנה","relative":{"0":"השנה","1":"השנה הבאה","-1":"השנה שעברה"},"relativeTime":{"future":{"one":"בעוד שנה","two":"בעוד שנתיים","many":"בעוד {0} שנה","other":"בעוד {0} שנים"},"past":{"one":"לפני שנה","two":"לפני שנתיים","many":"לפני {0} שנה","other":"לפני {0} שנים"}}},"month":{"displayName":"חודש","relative":{"0":"החודש","1":"החודש הבא","-1":"החודש שעבר"},"relativeTime":{"future":{"one":"בעוד חודש","two":"בעוד חודשיים","many":"בעוד {0} חודשים","other":"בעוד {0} חודשים"},"past":{"one":"לפני חודש","two":"לפני חודשיים","many":"לפני {0} חודשים","other":"לפני {0} חודשים"}}},"day":{"displayName":"יום","relative":{"0":"היום","1":"מחר","2":"מחרתיים","-1":"אתמול","-2":"שלשום"},"relativeTime":{"future":{"one":"בעוד יום {0}","two":"בעוד יומיים","many":"בעוד {0} ימים","other":"בעוד {0} ימים"},"past":{"one":"לפני יום {0}","two":"לפני יומיים","many":"לפני {0} ימים","other":"לפני {0} ימים"}}},"hour":{"displayName":"שעה","relativeTime":{"future":{"one":"בעוד שעה","two":"בעוד שעתיים","many":"בעוד {0} שעות","other":"בעוד {0} שעות"},"past":{"one":"לפני שעה","two":"לפני שעתיים","many":"לפני {0} שעות","other":"לפני {0} שעות"}}},"minute":{"displayName":"דקה","relativeTime":{"future":{"one":"בעוד דקה","two":"בעוד שתי דקות","many":"בעוד {0} דקות","other":"בעוד {0} דקות"},"past":{"one":"לפני דקה","two":"לפני שתי דקות","many":"לפני {0} דקות","other":"לפני {0} דקות"}}},"second":{"displayName":"שנייה","relative":{"0":"עכשיו"},"relativeTime":{"future":{"one":"בעוד שנייה","two":"בעוד שתי שניות","many":"בעוד {0} שניות","other":"בעוד {0} שניות"},"past":{"one":"לפני שנייה","two":"לפני שתי שניות","many":"לפני {0} שניות","other":"לפני {0} שניות"}}}}},{"locale":"he-IL","parentLocale":"he"},{"locale":"hi","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1?"one":n == 2 || n == 3?"two":n == 4?"few":n == 6?"many":"other";return n >= 0 && n <= 1?"one":"other"},"fields":{"year":{"displayName":"वर्ष","relative":{"0":"इस वर्ष","1":"अगला वर्ष","-1":"पिछला वर्ष"},"relativeTime":{"future":{"one":"{0} वर्ष में","other":"{0} वर्ष में"},"past":{"one":"{0} वर्ष पहले","other":"{0} वर्ष पहले"}}},"month":{"displayName":"माह","relative":{"0":"इस माह","1":"अगला माह","-1":"पिछला माह"},"relativeTime":{"future":{"one":"{0} माह में","other":"{0} माह में"},"past":{"one":"{0} माह पहले","other":"{0} माह पहले"}}},"day":{"displayName":"दिन","relative":{"0":"आज","1":"कल","2":"परसों","-1":"कल","-2":"बीता परसों"},"relativeTime":{"future":{"one":"{0} दिन में","other":"{0} दिन में"},"past":{"one":"{0} दिन पहले","other":"{0} दिन पहले"}}},"hour":{"displayName":"घंटा","relativeTime":{"future":{"one":"{0} घंटे में","other":"{0} घंटे में"},"past":{"one":"{0} घंटे पहले","other":"{0} घंटे पहले"}}},"minute":{"displayName":"मिनट","relativeTime":{"future":{"one":"{0} मिनट में","other":"{0} मिनट में"},"past":{"one":"{0} मिनट पहले","other":"{0} मिनट पहले"}}},"second":{"displayName":"सेकंड","relative":{"0":"अब"},"relativeTime":{"future":{"one":"{0} सेकंड में","other":"{0} सेकंड में"},"past":{"one":"{0} सेकंड पहले","other":"{0} सेकंड पहले"}}}}},{"locale":"hi-IN","parentLocale":"hi"},{"locale":"hr","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return "other";return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11?"one":v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14)?"few":"other"},"fields":{"year":{"displayName":"Godina","relative":{"0":"ove godine","1":"sljedeće godine","-1":"prošle godine"},"relativeTime":{"future":{"one":"za {0} godinu","few":"za {0} godine","other":"za {0} godina"},"past":{"one":"prije {0} godinu","few":"prije {0} godine","other":"prije {0} godina"}}},"month":{"displayName":"Mjesec","relative":{"0":"ovaj mjesec","1":"sljedeći mjesec","-1":"prošli mjesec"},"relativeTime":{"future":{"one":"za {0} mjesec","few":"za {0} mjeseca","other":"za {0} mjeseci"},"past":{"one":"prije {0} mjesec","few":"prije {0} mjeseca","other":"prije {0} mjeseci"}}},"day":{"displayName":"Dan","relative":{"0":"danas","1":"sutra","2":"prekosutra","-1":"jučer","-2":"prekjučer"},"relativeTime":{"future":{"one":"za {0} dan","few":"za {0} dana","other":"za {0} dana"},"past":{"one":"prije {0} dan","few":"prije {0} dana","other":"prije {0} dana"}}},"hour":{"displayName":"Sat","relativeTime":{"future":{"one":"za {0} sat","few":"za {0} sata","other":"za {0} sati"},"past":{"one":"prije {0} sat","few":"prije {0} sata","other":"prije {0} sati"}}},"minute":{"displayName":"Minuta","relativeTime":{"future":{"one":"za {0} minutu","few":"za {0} minute","other":"za {0} minuta"},"past":{"one":"prije {0} minutu","few":"prije {0} minute","other":"prije {0} minuta"}}},"second":{"displayName":"Sekunda","relative":{"0":"sada"},"relativeTime":{"future":{"one":"za {0} sekundu","few":"za {0} sekunde","other":"za {0} sekundi"},"past":{"one":"prije {0} sekundu","few":"prije {0} sekunde","other":"prije {0} sekundi"}}}}},{"locale":"hr-BA","parentLocale":"hr"},{"locale":"hr-HR","parentLocale":"hr"},{"locale":"hsb","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i100=i.slice(-2),f100=f.slice(-2);if(ord)return "other";return v0 && i100 == 1 || f100 == 1?"one":v0 && i100 == 2 || f100 == 2?"two":v0 && (i100 == 3 || i100 == 4) || f100 == 3 || f100 == 4?"few":"other"},"fields":{"year":{"displayName":"lěto","relative":{"0":"lětsa","1":"klětu","-1":"loni"},"relativeTime":{"future":{"one":"za {0} lěto","two":"za {0} lěće","few":"za {0} lěta","other":"za {0} lět"},"past":{"one":"před {0} lětom","two":"před {0} lětomaj","few":"před {0} lětami","other":"před {0} lětami"}}},"month":{"displayName":"měsac","relative":{"0":"tutón měsac","1":"přichodny měsac","-1":"zašły měsac"},"relativeTime":{"future":{"one":"za {0} měsac","two":"za {0} měsacaj","few":"za {0} měsacy","other":"za {0} měsacow"},"past":{"one":"před {0} měsacom","two":"před {0} měsacomaj","few":"před {0} měsacami","other":"před {0} měsacami"}}},"day":{"displayName":"dźeń","relative":{"0":"dźensa","1":"jutře","-1":"wčera"},"relativeTime":{"future":{"one":"za {0} dźeń","two":"za {0} dnjej","few":"za {0} dny","other":"za {0} dnjow"},"past":{"one":"před {0} dnjom","two":"před {0} dnjomaj","few":"před {0} dnjemi","other":"před {0} dnjemi"}}},"hour":{"displayName":"hodźina","relativeTime":{"future":{"one":"za {0} hodźinu","two":"za {0} hodźinje","few":"za {0} hodźiny","other":"za {0} hodźin"},"past":{"one":"před {0} hodźinu","two":"před {0} hodźinomaj","few":"před {0} hodźinami","other":"před {0} hodźinami"}}},"minute":{"displayName":"minuta","relativeTime":{"future":{"one":"za {0} minutu","two":"za {0} minuće","few":"za {0} minuty","other":"za {0} minutow"},"past":{"one":"před {0} minutu","two":"před {0} minutomaj","few":"před {0} minutami","other":"před {0} minutami"}}},"second":{"displayName":"sekunda","relative":{"0":"now"},"relativeTime":{"future":{"one":"za {0} sekundu","two":"za {0} sekundźe","few":"za {0} sekundy","other":"za {0} sekundow"},"past":{"one":"před {0} sekundu","two":"před {0} sekundomaj","few":"před {0} sekundami","other":"před {0} sekundami"}}}}},{"locale":"hsb-DE","parentLocale":"hsb"},{"locale":"hu","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1 || n == 5?"one":"other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"év","relative":{"0":"ez az év","1":"következő év","-1":"előző év"},"relativeTime":{"future":{"one":"{0} év múlva","other":"{0} év múlva"},"past":{"one":"{0} évvel ezelőtt","other":"{0} évvel ezelőtt"}}},"month":{"displayName":"hónap","relative":{"0":"ez a hónap","1":"következő hónap","-1":"előző hónap"},"relativeTime":{"future":{"one":"{0} hónap múlva","other":"{0} hónap múlva"},"past":{"one":"{0} hónappal ezelőtt","other":"{0} hónappal ezelőtt"}}},"day":{"displayName":"nap","relative":{"0":"ma","1":"holnap","2":"holnapután","-1":"tegnap","-2":"tegnapelőtt"},"relativeTime":{"future":{"one":"{0} nap múlva","other":"{0} nap múlva"},"past":{"one":"{0} nappal ezelőtt","other":"{0} nappal ezelőtt"}}},"hour":{"displayName":"óra","relativeTime":{"future":{"one":"{0} óra múlva","other":"{0} óra múlva"},"past":{"one":"{0} órával ezelőtt","other":"{0} órával ezelőtt"}}},"minute":{"displayName":"perc","relativeTime":{"future":{"one":"{0} perc múlva","other":"{0} perc múlva"},"past":{"one":"{0} perccel ezelőtt","other":"{0} perccel ezelőtt"}}},"second":{"displayName":"másodperc","relative":{"0":"most"},"relativeTime":{"future":{"one":"{0} másodperc múlva","other":"{0} másodperc múlva"},"past":{"one":"{0} másodperccel ezelőtt","other":"{0} másodperccel ezelőtt"}}}}},{"locale":"hu-HU","parentLocale":"hu"},{"locale":"hy","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1?"one":"other";return n >= 0 && n < 2?"one":"other"},"fields":{"year":{"displayName":"Տարի","relative":{"0":"այս տարի","1":"հաջորդ տարի","-1":"անցյալ տարի"},"relativeTime":{"future":{"one":"{0} տարի անց","other":"{0} տարի անց"},"past":{"one":"{0} տարի առաջ","other":"{0} տարի առաջ"}}},"month":{"displayName":"Ամիս","relative":{"0":"այս ամիս","1":"հաջորդ ամիս","-1":"անցյալ ամիս"},"relativeTime":{"future":{"one":"{0} ամիս անց","other":"{0} ամիս անց"},"past":{"one":"{0} ամիս առաջ","other":"{0} ամիս առաջ"}}},"day":{"displayName":"Օր","relative":{"0":"այսօր","1":"վաղը","2":"վաղը չէ մյուս օրը","-1":"երեկ","-2":"երեկ չէ առաջի օրը"},"relativeTime":{"future":{"one":"{0} օր անց","other":"{0} օր անց"},"past":{"one":"{0} օր առաջ","other":"{0} օր առաջ"}}},"hour":{"displayName":"Ժամ","relativeTime":{"future":{"one":"{0} ժամ անց","other":"{0} ժամ անց"},"past":{"one":"{0} ժամ առաջ","other":"{0} ժամ առաջ"}}},"minute":{"displayName":"Րոպե","relativeTime":{"future":{"one":"{0} րոպե անց","other":"{0} րոպե անց"},"past":{"one":"{0} րոպե առաջ","other":"{0} րոպե առաջ"}}},"second":{"displayName":"Վայրկյան","relative":{"0":"այժմ"},"relativeTime":{"future":{"one":"{0} վայրկյան անց","other":"{0} վայրկյան անց"},"past":{"one":"{0} վայրկյան առաջ","other":"{0} վայրկյան առաջ"}}}}},{"locale":"hy-AM","parentLocale":"hy"},{"locale":"ia","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ia-FR","parentLocale":"ia"},{"locale":"id","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Tahun","relative":{"0":"tahun ini","1":"tahun depan","-1":"tahun lalu"},"relativeTime":{"future":{"other":"Dalam {0} tahun"},"past":{"other":"{0} tahun yang lalu"}}},"month":{"displayName":"Bulan","relative":{"0":"bulan ini","1":"Bulan berikutnya","-1":"bulan lalu"},"relativeTime":{"future":{"other":"Dalam {0} bulan"},"past":{"other":"{0} bulan yang lalu"}}},"day":{"displayName":"Hari","relative":{"0":"hari ini","1":"besok","2":"lusa","-1":"kemarin","-2":"kemarin lusa"},"relativeTime":{"future":{"other":"Dalam {0} hari"},"past":{"other":"{0} hari yang lalu"}}},"hour":{"displayName":"Jam","relativeTime":{"future":{"other":"Dalam {0} jam"},"past":{"other":"{0} jam yang lalu"}}},"minute":{"displayName":"Menit","relativeTime":{"future":{"other":"Dalam {0} menit"},"past":{"other":"{0} menit yang lalu"}}},"second":{"displayName":"Detik","relative":{"0":"sekarang"},"relativeTime":{"future":{"other":"Dalam {0} detik"},"past":{"other":"{0} detik yang lalu"}}}}},{"locale":"id-ID","parentLocale":"id"},{"locale":"ig","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Afọ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ọnwa","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ụbọchị","relative":{"0":"Taata","1":"Echi","-1":"Nnyaafụ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Elekere","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Nkeji","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Nkejinta","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ig-NG","parentLocale":"ig"},{"locale":"ii","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ꈎ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ꆪ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"ꑍ","relative":{"0":"ꀃꑍ","1":"ꃆꏂꑍ","2":"ꌕꀿꑍ","-1":"ꀋꅔꉈ","-2":"ꎴꂿꋍꑍ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ꄮꈉ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"ꃏ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"ꇙ","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ii-CN","parentLocale":"ii"},{"locale":"in","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"is","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],t0=Number(s[0]) == n,i10=i.slice(-1),i100=i.slice(-2);if(ord)return "other";return t0 && i10 == 1 && i100 != 11 || !t0?"one":"other"},"fields":{"year":{"displayName":"ár","relative":{"0":"á þessu ári","1":"á næsta ári","-1":"á síðasta ári"},"relativeTime":{"future":{"one":"eftir {0} ár","other":"eftir {0} ár"},"past":{"one":"fyrir {0} ári","other":"fyrir {0} árum"}}},"month":{"displayName":"mánuður","relative":{"0":"í þessum mánuði","1":"í næsta mánuði","-1":"í síðasta mánuði"},"relativeTime":{"future":{"one":"eftir {0} mánuð","other":"eftir {0} mánuði"},"past":{"one":"fyrir {0} mánuði","other":"fyrir {0} mánuðum"}}},"day":{"displayName":"dagur","relative":{"0":"í dag","1":"á morgun","2":"eftir tvo daga","-1":"í gær","-2":"í fyrradag"},"relativeTime":{"future":{"one":"eftir {0} dag","other":"eftir {0} daga"},"past":{"one":"fyrir {0} degi","other":"fyrir {0} dögum"}}},"hour":{"displayName":"klukkustund","relativeTime":{"future":{"one":"eftir {0} klukkustund","other":"eftir {0} klukkustundir"},"past":{"one":"fyrir {0} klukkustund","other":"fyrir {0} klukkustundum"}}},"minute":{"displayName":"mínúta","relativeTime":{"future":{"one":"eftir {0} mínútu","other":"eftir {0} mínútur"},"past":{"one":"fyrir {0} mínútu","other":"fyrir {0} mínútum"}}},"second":{"displayName":"sekúnda","relative":{"0":"núna"},"relativeTime":{"future":{"one":"eftir {0} sekúndu","other":"eftir {0} sekúndur"},"past":{"one":"fyrir {0} sekúndu","other":"fyrir {0} sekúndum"}}}}},{"locale":"is-IS","parentLocale":"is"},{"locale":"it","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return n == 11 || n == 8 || n == 80 || n == 800?"many":"other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Anno","relative":{"0":"quest’anno","1":"anno prossimo","-1":"anno scorso"},"relativeTime":{"future":{"one":"tra {0} anno","other":"tra {0} anni"},"past":{"one":"{0} anno fa","other":"{0} anni fa"}}},"month":{"displayName":"Mese","relative":{"0":"questo mese","1":"mese prossimo","-1":"mese scorso"},"relativeTime":{"future":{"one":"tra {0} mese","other":"tra {0} mesi"},"past":{"one":"{0} mese fa","other":"{0} mesi fa"}}},"day":{"displayName":"Giorno","relative":{"0":"oggi","1":"domani","2":"dopodomani","-1":"ieri","-2":"l’altro ieri"},"relativeTime":{"future":{"one":"tra {0} giorno","other":"tra {0} giorni"},"past":{"one":"{0} giorno fa","other":"{0} giorni fa"}}},"hour":{"displayName":"Ora","relativeTime":{"future":{"one":"tra {0} ora","other":"tra {0} ore"},"past":{"one":"{0} ora fa","other":"{0} ore fa"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"one":"tra {0} minuto","other":"tra {0} minuti"},"past":{"one":"{0} minuto fa","other":"{0} minuti fa"}}},"second":{"displayName":"Secondo","relative":{"0":"ora"},"relativeTime":{"future":{"one":"tra {0} secondo","other":"tra {0} secondi"},"past":{"one":"{0} secondo fa","other":"{0} secondi fa"}}}}},{"locale":"it-CH","parentLocale":"it"},{"locale":"it-IT","parentLocale":"it"},{"locale":"it-SM","parentLocale":"it"},{"locale":"iu","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"iw","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1);if(ord)return "other";return n == 1 && v0?"one":i == 2 && v0?"two":v0 && (n < 0 || n > 10) && t0 && n10 == 0?"many":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ja","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"年","relative":{"0":"今年","1":"翌年","-1":"昨年"},"relativeTime":{"future":{"other":"{0} 年後"},"past":{"other":"{0} 年前"}}},"month":{"displayName":"月","relative":{"0":"今月","1":"翌月","-1":"先月"},"relativeTime":{"future":{"other":"{0} か月後"},"past":{"other":"{0} か月前"}}},"day":{"displayName":"日","relative":{"0":"今日","1":"明日","2":"明後日","-1":"昨日","-2":"一昨日"},"relativeTime":{"future":{"other":"{0} 日後"},"past":{"other":"{0} 日前"}}},"hour":{"displayName":"時","relativeTime":{"future":{"other":"{0} 時間後"},"past":{"other":"{0} 時間前"}}},"minute":{"displayName":"分","relativeTime":{"future":{"other":"{0} 分後"},"past":{"other":"{0} 分前"}}},"second":{"displayName":"秒","relative":{"0":"今すぐ"},"relativeTime":{"future":{"other":"{0} 秒後"},"past":{"other":"{0} 秒前"}}}}},{"locale":"ja-JP","parentLocale":"ja"},{"locale":"jbo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"jgo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"Nǔu ŋguꞋ {0}","other":"Nǔu ŋguꞋ {0}"},"past":{"one":"Ɛ́gɛ́ mɔ́ ŋguꞋ {0}","other":"Ɛ́gɛ́ mɔ́ ŋguꞋ {0}"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"Nǔu {0} saŋ","other":"Nǔu {0} saŋ"},"past":{"one":"ɛ́ gɛ́ mɔ́ pɛsaŋ {0}","other":"ɛ́ gɛ́ mɔ́ pɛsaŋ {0}"}}},"day":{"displayName":"Day","relative":{"0":"lɔꞋɔ","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"Nǔu lɛ́Ꞌ {0}","other":"Nǔu lɛ́Ꞌ {0}"},"past":{"one":"Ɛ́ gɛ́ mɔ́ lɛ́Ꞌ {0}","other":"Ɛ́ gɛ́ mɔ́ lɛ́Ꞌ {0}"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"one":"nǔu háwa {0}","other":"nǔu háwa {0}"},"past":{"one":"ɛ́ gɛ mɔ́ {0} háwa","other":"ɛ́ gɛ mɔ́ {0} háwa"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"one":"nǔu {0} minút","other":"nǔu {0} minút"},"past":{"one":"ɛ́ gɛ́ mɔ́ minút {0}","other":"ɛ́ gɛ́ mɔ́ minút {0}"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"jgo-CM","parentLocale":"jgo"},{"locale":"ji","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"jmc","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Maka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mori","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mfiri","relative":{"0":"Inu","1":"Ngama","-1":"Ukou"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakyika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"jmc-TZ","parentLocale":"jmc"},{"locale":"jv","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"jw","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ka","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],i100=i.slice(-2);if(ord)return i == 1?"one":i == 0 || i100 >= 2 && i100 <= 20 || i100 == 40 || i100 == 60 || i100 == 80?"many":"other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"წელი","relative":{"0":"ამ წელს","1":"მომავალ წელს","-1":"გასულ წელს"},"relativeTime":{"future":{"one":"{0} წელიწადში","other":"{0} წელიწადში"},"past":{"one":"{0} წლის წინ","other":"{0} წლის წინ"}}},"month":{"displayName":"თვე","relative":{"0":"ამ თვეში","1":"მომავალ თვეს","-1":"გასულ თვეს"},"relativeTime":{"future":{"one":"{0} თვეში","other":"{0} თვეში"},"past":{"one":"{0} თვის წინ","other":"{0} თვის წინ"}}},"day":{"displayName":"დღე","relative":{"0":"დღეს","1":"ხვალ","2":"ზეგ","-1":"გუშინ","-2":"გუშინწინ"},"relativeTime":{"future":{"one":"{0} დღეში","other":"{0} დღეში"},"past":{"one":"{0} დღის წინ","other":"{0} დღის წინ"}}},"hour":{"displayName":"საათი","relativeTime":{"future":{"one":"{0} საათში","other":"{0} საათში"},"past":{"one":"{0} საათის წინ","other":"{0} საათის წინ"}}},"minute":{"displayName":"წუთი","relativeTime":{"future":{"one":"{0} წუთში","other":"{0} წუთში"},"past":{"one":"{0} წუთის წინ","other":"{0} წუთის წინ"}}},"second":{"displayName":"წამი","relative":{"0":"ახლა"},"relativeTime":{"future":{"one":"{0} წამში","other":"{0} წამში"},"past":{"one":"{0} წამის წინ","other":"{0} წამის წინ"}}}}},{"locale":"ka-GE","parentLocale":"ka"},{"locale":"kab","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n >= 0 && n < 2?"one":"other"},"fields":{"year":{"displayName":"Aseggas","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Aggur","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ass","relative":{"0":"Ass-a","1":"Azekka","-1":"Iḍelli"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Tamert","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Tamrect","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Tasint","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kab-DZ","parentLocale":"kab"},{"locale":"kaj","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kam","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwai","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mũthenya","relative":{"0":"Ũmũnthĩ","1":"Ũnĩ","-1":"Ĩyoo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Ndatĩka","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"sekondi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kam-KE","parentLocale":"kam"},{"locale":"kcg","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kde","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwedi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Lihiku","relative":{"0":"Nelo","1":"Nundu","-1":"Lido"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kde-TZ","parentLocale":"kde"},{"locale":"kea","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Anu","relative":{"0":"es anu li","1":"prósimu anu","-1":"anu pasadu"},"relativeTime":{"future":{"other":"di li {0} anu"},"past":{"other":"a ten {0} anu"}}},"month":{"displayName":"Mes","relative":{"0":"es mes li","1":"prósimu mes","-1":"mes pasadu"},"relativeTime":{"future":{"other":"di li {0} mes"},"past":{"other":"a ten {0} mes"}}},"day":{"displayName":"Dia","relative":{"0":"oji","1":"manha","-1":"onti"},"relativeTime":{"future":{"other":"di li {0} dia"},"past":{"other":"a ten {0} dia"}}},"hour":{"displayName":"Ora","relativeTime":{"future":{"other":"di li {0} ora"},"past":{"other":"a ten {0} ora"}}},"minute":{"displayName":"Minutu","relativeTime":{"future":{"other":"di li {0} minutu"},"past":{"other":"a ten {0} minutu"}}},"second":{"displayName":"Sigundu","relative":{"0":"now"},"relativeTime":{"future":{"other":"di li {0} sigundu"},"past":{"other":"a ten {0} sigundu"}}}}},{"locale":"kea-CV","parentLocale":"kea"},{"locale":"khq","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Jiiri","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Handu","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Jaari","relative":{"0":"Hõo","1":"Suba","-1":"Bi"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Guuru","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Miniti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Miti","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"khq-ML","parentLocale":"khq"},{"locale":"ki","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mweri","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mũthenya","relative":{"0":"Ũmũthĩ","1":"Rũciũ","-1":"Ira"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ithaa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Ndagĩka","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ki-KE","parentLocale":"ki"},{"locale":"kk","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1);if(ord)return n10 == 6 || n10 == 9 || t0 && n10 == 0 && n != 0?"many":"other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Жыл","relative":{"0":"биылғы жыл","1":"келесі жыл","-1":"былтырғы жыл"},"relativeTime":{"future":{"one":"{0} жылдан кейін","other":"{0} жылдан кейін"},"past":{"one":"{0} жыл бұрын","other":"{0} жыл бұрын"}}},"month":{"displayName":"Ай","relative":{"0":"осы ай","1":"келесі ай","-1":"өткен ай"},"relativeTime":{"future":{"one":"{0} айдан кейін","other":"{0} айдан кейін"},"past":{"one":"{0} ай бұрын","other":"{0} ай бұрын"}}},"day":{"displayName":"күн","relative":{"0":"бүгін","1":"ертең","2":"арғы күні","-1":"кеше","-2":"алдыңғы күні"},"relativeTime":{"future":{"one":"{0} күннен кейін","other":"{0} күннен кейін"},"past":{"one":"{0} күн бұрын","other":"{0} күн бұрын"}}},"hour":{"displayName":"Сағат","relativeTime":{"future":{"one":"{0} сағаттан кейін","other":"{0} сағаттан кейін"},"past":{"one":"{0} сағат бұрын","other":"{0} сағат бұрын"}}},"minute":{"displayName":"Минут","relativeTime":{"future":{"one":"{0} минуттан кейін","other":"{0} минуттан кейін"},"past":{"one":"{0} минут бұрын","other":"{0} минут бұрын"}}},"second":{"displayName":"Секунд","relative":{"0":"қазір"},"relativeTime":{"future":{"one":"{0} секундтан кейін","other":"{0} секундтан кейін"},"past":{"one":"{0} секунд бұрын","other":"{0} секунд бұрын"}}}}},{"locale":"kk-Cyrl","parentLocale":"kk"},{"locale":"kk-Cyrl-KZ","parentLocale":"kk-Cyrl"},{"locale":"kkj","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"muka","1":"nɛmɛnɔ","-1":"kwey"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kkj-CM","parentLocale":"kkj"},{"locale":"kl","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"ukioq","relative":{"0":"manna ukioq","1":"tulleq ukioq","-1":"kingulleq ukioq"},"relativeTime":{"future":{"one":"om {0} ukioq","other":"om {0} ukioq"},"past":{"one":"for {0} ukioq siden","other":"for {0} ukioq siden"}}},"month":{"displayName":"qaammat","relative":{"0":"manna qaammat","1":"tulleq qaammat","-1":"kingulleq qaammat"},"relativeTime":{"future":{"one":"om {0} qaammat","other":"om {0} qaammat"},"past":{"one":"for {0} qaammat siden","other":"for {0} qaammat siden"}}},"day":{"displayName":"ulloq","relative":{"0":"ullumi","1":"aqagu","2":"aqaguagu","-1":"ippassaq","-2":"ippassaani"},"relativeTime":{"future":{"one":"om {0} ulloq unnuarlu","other":"om {0} ulloq unnuarlu"},"past":{"one":"for {0} ulloq unnuarlu siden","other":"for {0} ulloq unnuarlu siden"}}},"hour":{"displayName":"nalunaaquttap-akunnera","relativeTime":{"future":{"one":"om {0} nalunaaquttap-akunnera","other":"om {0} nalunaaquttap-akunnera"},"past":{"one":"for {0} nalunaaquttap-akunnera siden","other":"for {0} nalunaaquttap-akunnera siden"}}},"minute":{"displayName":"minutsi","relativeTime":{"future":{"one":"om {0} minutsi","other":"om {0} minutsi"},"past":{"one":"for {0} minutsi siden","other":"for {0} minutsi siden"}}},"second":{"displayName":"sekundi","relative":{"0":"now"},"relativeTime":{"future":{"one":"om {0} sekundi","other":"om {0} sekundi"},"past":{"one":"for {0} sekundi siden","other":"for {0} sekundi siden"}}}}},{"locale":"kl-GL","parentLocale":"kl"},{"locale":"kln","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Kenyit","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Arawet","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Betut","relative":{"0":"Raini","1":"Mutai","-1":"Amut"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Sait","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minitit","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekondit","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kln-KE","parentLocale":"kln"},{"locale":"km","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ឆ្នាំ","relative":{"0":"ឆ្នាំ​នេះ","1":"ឆ្នាំ​ក្រោយ","-1":"ឆ្នាំ​មុន"},"relativeTime":{"future":{"other":"ក្នុង​រយៈ​ពេល {0} ឆ្នាំ"},"past":{"other":"{0} ឆ្នាំ​មុន"}}},"month":{"displayName":"ខែ","relative":{"0":"ខែ​នេះ","1":"ខែ​ក្រោយ","-1":"ខែ​មុន"},"relativeTime":{"future":{"other":"ក្នុង​រយៈ​ពេល {0} ខែ"},"past":{"other":"{0} ខែមុន"}}},"day":{"displayName":"ថ្ងៃ","relative":{"0":"ថ្ងៃ​នេះ","1":"ថ្ងៃ​ស្អែក","2":"​ខាន​ស្អែក","-1":"ម្សិលមិញ","-2":"ម្សិល​ម៉្ងៃ"},"relativeTime":{"future":{"other":"ក្នុង​រយៈ​ពេល {0} ថ្ងៃ"},"past":{"other":"{0} ថ្ងៃ​មុន"}}},"hour":{"displayName":"ម៉ោង","relativeTime":{"future":{"other":"ក្នុង​រយៈ​ពេល {0} ម៉ោង"},"past":{"other":"{0} ម៉ោង​មុន"}}},"minute":{"displayName":"នាទី","relativeTime":{"future":{"other":"ក្នុង​រយៈពេល {0} នាទី"},"past":{"other":"{0} នាទី​មុន"}}},"second":{"displayName":"វិនាទី","relative":{"0":"ឥឡូវ"},"relativeTime":{"future":{"other":"ក្នុង​រយៈពេល {0} វិនាទី"},"past":{"other":"{0} វិនាទី​មុន"}}}}},{"locale":"km-KH","parentLocale":"km"},{"locale":"kn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n >= 0 && n <= 1?"one":"other"},"fields":{"year":{"displayName":"ವರ್ಷ","relative":{"0":"ಈ ವರ್ಷ","1":"ಮುಂದಿನ ವರ್ಷ","-1":"ಕಳೆದ ವರ್ಷ"},"relativeTime":{"future":{"one":"{0} ವರ್ಷದಲ್ಲಿ","other":"{0} ವರ್ಷಗಳಲ್ಲಿ"},"past":{"one":"{0} ವರ್ಷದ ಹಿಂದೆ","other":"{0} ವರ್ಷಗಳ ಹಿಂದೆ"}}},"month":{"displayName":"ತಿಂಗಳು","relative":{"0":"ಈ ತಿಂಗಳು","1":"ಮುಂದಿನ ತಿಂಗಳು","-1":"ಕಳೆದ ತಿಂಗಳು"},"relativeTime":{"future":{"one":"{0} ತಿಂಗಳಲ್ಲಿ","other":"{0} ತಿಂಗಳುಗಳಲ್ಲಿ"},"past":{"one":"{0} ತಿಂಗಳುಗಳ ಹಿಂದೆ","other":"{0} ತಿಂಗಳುಗಳ ಹಿಂದೆ"}}},"day":{"displayName":"ದಿನ","relative":{"0":"ಇಂದು","1":"ನಾಳೆ","2":"ನಾಡಿದ್ದು","-1":"ನಿನ್ನೆ","-2":"ಮೊನ್ನೆ"},"relativeTime":{"future":{"one":"{0} ದಿನದಲ್ಲಿ","other":"{0} ದಿನಗಳಲ್ಲಿ"},"past":{"one":"{0} ದಿನದ ಹಿಂದೆ","other":"{0} ದಿನಗಳ ಹಿಂದೆ"}}},"hour":{"displayName":"ಗಂಟೆ","relativeTime":{"future":{"one":"{0} ಗಂಟೆಯಲ್ಲಿ","other":"{0} ಗಂಟೆಗಳಲ್ಲಿ"},"past":{"one":"{0} ಗಂಟೆ ಹಿಂದೆ","other":"{0} ಗಂಟೆಗಳ ಹಿಂದೆ"}}},"minute":{"displayName":"ನಿಮಿಷ","relativeTime":{"future":{"one":"{0} ನಿಮಿಷದಲ್ಲಿ","other":"{0} ನಿಮಿಷಗಳಲ್ಲಿ"},"past":{"one":"{0} ನಿಮಿಷಗಳ ಹಿಂದೆ","other":"{0} ನಿಮಿಷಗಳ ಹಿಂದೆ"}}},"second":{"displayName":"ಸೆಕೆಂಡ್","relative":{"0":"ಇದೀಗ"},"relativeTime":{"future":{"one":"{0} ಸೆಕೆಂಡ್‌ನಲ್ಲಿ","other":"{0} ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ"},"past":{"one":"{0} ಸೆಕೆಂಡ್ ಹಿಂದೆ","other":"{0} ಸೆಕೆಂಡುಗಳ ಹಿಂದೆ"}}}}},{"locale":"kn-IN","parentLocale":"kn"},{"locale":"ko","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"년","relative":{"0":"올해","1":"내년","-1":"작년"},"relativeTime":{"future":{"other":"{0}년 후"},"past":{"other":"{0}년 전"}}},"month":{"displayName":"월","relative":{"0":"이번 달","1":"다음 달","-1":"지난달"},"relativeTime":{"future":{"other":"{0}개월 후"},"past":{"other":"{0}개월 전"}}},"day":{"displayName":"일","relative":{"0":"오늘","1":"내일","2":"모레","-1":"어제","-2":"그저께"},"relativeTime":{"future":{"other":"{0}일 후"},"past":{"other":"{0}일 전"}}},"hour":{"displayName":"시","relativeTime":{"future":{"other":"{0}시간 후"},"past":{"other":"{0}시간 전"}}},"minute":{"displayName":"분","relativeTime":{"future":{"other":"{0}분 후"},"past":{"other":"{0}분 전"}}},"second":{"displayName":"초","relative":{"0":"지금"},"relativeTime":{"future":{"other":"{0}초 후"},"past":{"other":"{0}초 전"}}}}},{"locale":"ko-KP","parentLocale":"ko"},{"locale":"ko-KR","parentLocale":"ko"},{"locale":"kok","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kok-IN","parentLocale":"kok"},{"locale":"ks","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"ؤری","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"رٮ۪تھ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"دۄہ","relative":{"0":"اَز","1":"پگاہ","-1":"راتھ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"گٲنٛٹہٕ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"مِنَٹ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"سٮ۪کَنڑ","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ks-Arab","parentLocale":"ks"},{"locale":"ks-Arab-IN","parentLocale":"ks-Arab"},{"locale":"ksb","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Ng’waka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ng’ezi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Siku","relative":{"0":"Evi eo","1":"Keloi","-1":"Ghuo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ksb-TZ","parentLocale":"ksb"},{"locale":"ksf","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Bǝk","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ŋwíí","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ŋwós","relative":{"0":"Gɛ́ɛnǝ","1":"Ridúrǝ́","-1":"Rinkɔɔ́"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Cámɛɛn","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Mǝnít","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Háu","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ksf-CM","parentLocale":"ksf"},{"locale":"ksh","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0?"zero":n == 1?"one":"other"},"fields":{"year":{"displayName":"Johr","relative":{"0":"diese Johr","1":"nächste Johr","-1":"läz Johr"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mohnd","relative":{"0":"diese Mohnd","1":"nächste Mohnd","-1":"lätzde Mohnd"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Daach","relative":{"0":"hück","1":"morje","2":"övvermorje","-1":"jestere","-2":"vörjestere"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Schtund","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Menutt","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekond","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ksh-DE","parentLocale":"ksh"},{"locale":"ku","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kw","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"Bledhen","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mis","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Dedh","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Eur","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"kw-GB","parentLocale":"kw"},{"locale":"ky","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"жыл","relative":{"0":"быйыл","1":"эмдиги жылы","-1":"былтыр"},"relativeTime":{"future":{"one":"{0} жылдан кийин","other":"{0} жылдан кийин"},"past":{"one":"{0} жыл мурун","other":"{0} жыл мурун"}}},"month":{"displayName":"ай","relative":{"0":"бул айда","1":"эмдиги айда","-1":"өткөн айда"},"relativeTime":{"future":{"one":"{0} айдан кийин","other":"{0} айдан кийин"},"past":{"one":"{0} ай мурун","other":"{0} ай мурун"}}},"day":{"displayName":"күн","relative":{"0":"бүгүн","1":"эртеӊ","2":"бүрсүгүнү","-1":"кечээ","-2":"мурдагы күнү"},"relativeTime":{"future":{"one":"{0} күндөн кийин","other":"{0} күндөн кийин"},"past":{"one":"{0} күн мурун","other":"{0} күн мурун"}}},"hour":{"displayName":"саат","relativeTime":{"future":{"one":"{0} сааттан кийин","other":"{0} сааттан кийин"},"past":{"one":"{0} саат мурун","other":"{0} саат мурун"}}},"minute":{"displayName":"мүнөт","relativeTime":{"future":{"one":"{0} мүнөттөн кийин","other":"{0} мүнөттөн кийин"},"past":{"one":"{0} мүнөт мурун","other":"{0} мүнөт мурун"}}},"second":{"displayName":"секунд","relative":{"0":"азыр"},"relativeTime":{"future":{"one":"{0} секунддан кийин","other":"{0} секунддан кийин"},"past":{"one":"{0} секунд мурун","other":"{0} секунд мурун"}}}}},{"locale":"ky-Cyrl","parentLocale":"ky"},{"locale":"ky-Cyrl-KG","parentLocale":"ky-Cyrl"},{"locale":"lag","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0];if(ord)return "other";return n == 0?"zero":(i == 0 || i == 1) && n != 0?"one":"other"},"fields":{"year":{"displayName":"Mwaáka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mweéri","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Sikʉ","relative":{"0":"Isikʉ","1":"Lamʉtoondo","-1":"Niijo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Sáa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakíka","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekúunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"lag-TZ","parentLocale":"lag"},{"locale":"lb","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Joer","relative":{"0":"dëst Joer","1":"nächst Joer","-1":"lescht Joer"},"relativeTime":{"future":{"one":"an {0} Joer","other":"a(n) {0} Joer"},"past":{"one":"virun {0} Joer","other":"viru(n) {0} Joer"}}},"month":{"displayName":"Mount","relative":{"0":"dëse Mount","1":"nächste Mount","-1":"leschte Mount"},"relativeTime":{"future":{"one":"an {0} Mount","other":"a(n) {0} Méint"},"past":{"one":"virun {0} Mount","other":"viru(n) {0} Méint"}}},"day":{"displayName":"Dag","relative":{"0":"haut","1":"muer","-1":"gëschter"},"relativeTime":{"future":{"one":"an {0} Dag","other":"a(n) {0} Deeg"},"past":{"one":"virun {0} Dag","other":"viru(n) {0} Deeg"}}},"hour":{"displayName":"Stonn","relativeTime":{"future":{"one":"an {0} Stonn","other":"a(n) {0} Stonnen"},"past":{"one":"virun {0} Stonn","other":"viru(n) {0} Stonnen"}}},"minute":{"displayName":"Minutt","relativeTime":{"future":{"one":"an {0} Minutt","other":"a(n) {0} Minutten"},"past":{"one":"virun {0} Minutt","other":"viru(n) {0} Minutten"}}},"second":{"displayName":"Sekonn","relative":{"0":"now"},"relativeTime":{"future":{"one":"an {0} Sekonn","other":"a(n) {0} Sekonnen"},"past":{"one":"virun {0} Sekonn","other":"viru(n) {0} Sekonnen"}}}}},{"locale":"lb-LU","parentLocale":"lb"},{"locale":"lg","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwezi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Lunaku","relative":{"0":"Lwaleero","1":"Nkya","-1":"Ggulo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saawa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakiika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Kasikonda","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"lg-UG","parentLocale":"lg"},{"locale":"lkt","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Ómakȟa","relative":{"0":"Lé ómakȟa kiŋ","1":"Tȟokáta ómakȟa kiŋháŋ","-1":"Ómakȟa kʼuŋ héhaŋ"},"relativeTime":{"future":{"other":"Letáŋhaŋ ómakȟa {0} kiŋháŋ"},"past":{"other":"Hékta ómakȟa {0} kʼuŋ héhaŋ"}}},"month":{"displayName":"Wí","relative":{"0":"Lé wí kiŋ","1":"Wí kiŋháŋ","-1":"Wí kʼuŋ héhaŋ"},"relativeTime":{"future":{"other":"Letáŋhaŋ wíyawapi {0} kiŋháŋ"},"past":{"other":"Hékta wíyawapi {0} kʼuŋ héhaŋ"}}},"day":{"displayName":"Aŋpétu","relative":{"0":"Lé aŋpétu kiŋ","1":"Híŋhaŋni kiŋháŋ","-1":"Lé aŋpétu kiŋ"},"relativeTime":{"future":{"other":"Letáŋhaŋ {0}-čháŋ kiŋháŋ"},"past":{"other":"Hékta {0}-čháŋ k’uŋ héhaŋ"}}},"hour":{"displayName":"Owápȟe","relativeTime":{"future":{"other":"Letáŋhaŋ owápȟe {0} kiŋháŋ"},"past":{"other":"Hékta owápȟe {0} kʼuŋ héhaŋ"}}},"minute":{"displayName":"Owápȟe oȟʼáŋkȟo","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Okpí","relative":{"0":"now"},"relativeTime":{"future":{"other":"Letáŋhaŋ okpí {0} kiŋháŋ"},"past":{"other":"Hékta okpí {0} k’uŋ héhaŋ"}}}}},{"locale":"lkt-US","parentLocale":"lkt"},{"locale":"ln","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"Mobú","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Sánzá","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mokɔlɔ","relative":{"0":"Lɛlɔ́","1":"Lóbi ekoyâ","-1":"Lóbi elékí"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ngonga","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Monúti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sɛkɔ́ndɛ","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ln-AO","parentLocale":"ln"},{"locale":"ln-CD","parentLocale":"ln"},{"locale":"ln-CF","parentLocale":"ln"},{"locale":"ln-CG","parentLocale":"ln"},{"locale":"lo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1?"one":"other";return "other"},"fields":{"year":{"displayName":"ປີ","relative":{"0":"ປີນີ້","1":"ປີໜ້າ","-1":"ປີກາຍ"},"relativeTime":{"future":{"other":"ໃນອີກ {0} ປີ"},"past":{"other":"{0} ປີກ່ອນ"}}},"month":{"displayName":"ເດືອນ","relative":{"0":"ເດືອນນີ້","1":"ເດືອນໜ້າ","-1":"ເດືອນແລ້ວ"},"relativeTime":{"future":{"other":"ໃນອີກ {0} ເດືອນ"},"past":{"other":"{0} ເດືອນກ່ອນ"}}},"day":{"displayName":"ມື້","relative":{"0":"ມື້ນີ້","1":"ມື້ອື່ນ","2":"ມື້ຮື","-1":"ມື້ວານ","-2":"ມື້ກ່ອນ"},"relativeTime":{"future":{"other":"ໃນອີກ {0} ມື້"},"past":{"other":"{0} ມື້ກ່ອນ"}}},"hour":{"displayName":"ຊົ່ວໂມງ","relativeTime":{"future":{"other":"ໃນອີກ {0} ຊົ່ວໂມງ"},"past":{"other":"{0} ຊົ່ວໂມງກ່ອນ"}}},"minute":{"displayName":"ນາທີ","relativeTime":{"future":{"other":"{0} ໃນອີກ 0 ນາທີ"},"past":{"other":"{0} ນາທີກ່ອນ"}}},"second":{"displayName":"ວິນາທີ","relative":{"0":"ຕອນນີ້"},"relativeTime":{"future":{"other":"ໃນອີກ {0} ວິນາທີ"},"past":{"other":"{0} ວິນາທີກ່ອນ"}}}}},{"locale":"lo-LA","parentLocale":"lo"},{"locale":"lt","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),f=s[1] || "",t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2);if(ord)return "other";return n10 == 1 && (n100 < 11 || n100 > 19)?"one":n10 >= 2 && n10 <= 9 && (n100 < 11 || n100 > 19)?"few":f != 0?"many":"other"},"fields":{"year":{"displayName":"Metai","relative":{"0":"šiais metais","1":"kitais metais","-1":"praėjusiais metais"},"relativeTime":{"future":{"one":"po {0} metų","few":"po {0} metų","many":"po {0} metų","other":"po {0} metų"},"past":{"one":"prieš {0} metus","few":"prieš {0} metus","many":"prieš {0} metų","other":"prieš {0} metų"}}},"month":{"displayName":"Mėnuo","relative":{"0":"šį mėnesį","1":"kitą mėnesį","-1":"praėjusį mėnesį"},"relativeTime":{"future":{"one":"po {0} mėnesio","few":"po {0} mėnesių","many":"po {0} mėnesio","other":"po {0} mėnesių"},"past":{"one":"prieš {0} mėnesį","few":"prieš {0} mėnesius","many":"prieš {0} mėnesio","other":"prieš {0} mėnesių"}}},"day":{"displayName":"Diena","relative":{"0":"šiandien","1":"rytoj","2":"poryt","-1":"vakar","-2":"užvakar"},"relativeTime":{"future":{"one":"po {0} dienos","few":"po {0} dienų","many":"po {0} dienos","other":"po {0} dienų"},"past":{"one":"prieš {0} dieną","few":"prieš {0} dienas","many":"prieš {0} dienos","other":"prieš {0} dienų"}}},"hour":{"displayName":"Valanda","relativeTime":{"future":{"one":"po {0} valandos","few":"po {0} valandų","many":"po {0} valandos","other":"po {0} valandų"},"past":{"one":"prieš {0} valandą","few":"prieš {0} valandas","many":"prieš {0} valandos","other":"prieš {0} valandų"}}},"minute":{"displayName":"Minutė","relativeTime":{"future":{"one":"po {0} minutės","few":"po {0} minučių","many":"po {0} minutės","other":"po {0} minučių"},"past":{"one":"prieš {0} minutę","few":"prieš {0} minutes","many":"prieš {0} minutės","other":"prieš {0} minučių"}}},"second":{"displayName":"Sekundė","relative":{"0":"dabar"},"relativeTime":{"future":{"one":"po {0} sekundės","few":"po {0} sekundžių","many":"po {0} sekundės","other":"po {0} sekundžių"},"past":{"one":"prieš {0} sekundę","few":"prieš {0} sekundes","many":"prieš {0} sekundės","other":"prieš {0} sekundžių"}}}}},{"locale":"lt-LT","parentLocale":"lt"},{"locale":"lu","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Tshidimu","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ngondo","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Dituku","relative":{"0":"Lelu","1":"Malaba","-1":"Makelela"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Diba","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Kasunsu","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Kasunsukusu","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"lu-CD","parentLocale":"lu"},{"locale":"luo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"higa","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"dwe","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"chieng’","relative":{"0":"kawuono","1":"kiny","-1":"nyoro"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"dakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"nyiriri mar saa","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"luo-KE","parentLocale":"luo"},{"locale":"luy","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Muhiga","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mweri","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ridiku","relative":{"0":"Lero","1":"Mgamba","-1":"Mgorova"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Isaa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Idagika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"luy-KE","parentLocale":"luy"},{"locale":"lv","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),f=s[1] || "",v=f.length,t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2),f100=f.slice(-2),f10=f.slice(-1);if(ord)return "other";return t0 && n10 == 0 || n100 >= 11 && n100 <= 19 || v == 2 && f100 >= 11 && f100 <= 19?"zero":n10 == 1 && n100 != 11 || v == 2 && f10 == 1 && f100 != 11 || v != 2 && f10 == 1?"one":"other"},"fields":{"year":{"displayName":"Gads","relative":{"0":"šajā gadā","1":"nākamajā gadā","-1":"pagājušajā gadā"},"relativeTime":{"future":{"zero":"pēc {0} gadiem","one":"pēc {0} gada","other":"pēc {0} gadiem"},"past":{"zero":"pirms {0} gadiem","one":"pirms {0} gada","other":"pirms {0} gadiem"}}},"month":{"displayName":"Mēnesis","relative":{"0":"šajā mēnesī","1":"nākamajā mēnesī","-1":"pagājušajā mēnesī"},"relativeTime":{"future":{"zero":"pēc {0} mēnešiem","one":"pēc {0} mēneša","other":"pēc {0} mēnešiem"},"past":{"zero":"pirms {0} mēnešiem","one":"pirms {0} mēneša","other":"pirms {0} mēnešiem"}}},"day":{"displayName":"diena","relative":{"0":"šodien","1":"rīt","2":"parīt","-1":"vakar","-2":"aizvakar"},"relativeTime":{"future":{"zero":"pēc {0} dienām","one":"pēc {0} dienas","other":"pēc {0} dienām"},"past":{"zero":"pirms {0} dienām","one":"pirms {0} dienas","other":"pirms {0} dienām"}}},"hour":{"displayName":"Stundas","relativeTime":{"future":{"zero":"pēc {0} stundām","one":"pēc {0} stundas","other":"pēc {0} stundām"},"past":{"zero":"pirms {0} stundām","one":"pirms {0} stundas","other":"pirms {0} stundām"}}},"minute":{"displayName":"Minūtes","relativeTime":{"future":{"zero":"pēc {0} minūtēm","one":"pēc {0} minūtes","other":"pēc {0} minūtēm"},"past":{"zero":"pirms {0} minūtēm","one":"pirms {0} minūtes","other":"pirms {0} minūtēm"}}},"second":{"displayName":"Sekundes","relative":{"0":"tagad"},"relativeTime":{"future":{"zero":"pēc {0} sekundēm","one":"pēc {0} sekundes","other":"pēc {0} sekundēm"},"past":{"zero":"pirms {0} sekundēm","one":"pirms {0} sekundes","other":"pirms {0} sekundēm"}}}}},{"locale":"lv-LV","parentLocale":"lv"},{"locale":"mas","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Ɔlárì","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ɔlápà","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ɛnkɔlɔ́ŋ","relative":{"0":"Táatá","1":"Tááisérè","-1":"Ŋolé"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ɛ́sáâ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Oldákikaè","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mas-KE","parentLocale":"mas"},{"locale":"mas-TZ","parentLocale":"mas"},{"locale":"mer","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mweri","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ntukũ","relative":{"0":"Narua","1":"Rũjũ","-1":"Ĩgoro"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ĩthaa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Ndagika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekondi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mer-KE","parentLocale":"mer"},{"locale":"mfe","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Lane","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwa","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Zour","relative":{"0":"Zordi","1":"Demin","-1":"Yer"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ler","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minit","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Segonn","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mfe-MU","parentLocale":"mfe"},{"locale":"mg","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"Taona","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Volana","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Andro","relative":{"0":"Anio","1":"Rahampitso","-1":"Omaly"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ora","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minitra","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Segondra","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mg-MG","parentLocale":"mg"},{"locale":"mgh","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"yaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"mweri","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"nihuku","relative":{"0":"lel’lo","1":"me’llo","-1":"n’chana"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"isaa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"idakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"isekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mgh-MZ","parentLocale":"mgh"},{"locale":"mgo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"fituʼ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"iməg","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"+{0} m","other":"+{0} m"},"past":{"one":"-{0} m","other":"-{0} m"}}},"day":{"displayName":"anəg","relative":{"0":"tèchɔ̀ŋ","1":"isu","2":"isu ywi","-1":"ikwiri"},"relativeTime":{"future":{"one":"+{0} d","other":"+{0} d"},"past":{"one":"-{0} d","other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"one":"+{0} h","other":"+{0} h"},"past":{"one":"-{0} h","other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"one":"+{0} min","other":"+{0} min"},"past":{"one":"-{0} min","other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"one":"+{0} s","other":"+{0} s"},"past":{"one":"-{0} s","other":"-{0} s"}}}}},{"locale":"mgo-CM","parentLocale":"mgo"},{"locale":"mk","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1);if(ord)return i10 == 1 && i100 != 11?"one":i10 == 2 && i100 != 12?"two":(i10 == 7 || i10 == 8) && i100 != 17 && i100 != 18?"many":"other";return v0 && i10 == 1 || f10 == 1?"one":"other"},"fields":{"year":{"displayName":"година","relative":{"0":"оваа година","1":"следната година","-1":"минатата година"},"relativeTime":{"future":{"one":"за {0} година","other":"за {0} години"},"past":{"one":"пред {0} година","other":"пред {0} години"}}},"month":{"displayName":"Месец","relative":{"0":"овој месец","1":"следниот месец","-1":"минатиот месец"},"relativeTime":{"future":{"one":"за {0} месец","other":"за {0} месеци"},"past":{"one":"пред {0} месец","other":"пред {0} месеци"}}},"day":{"displayName":"ден","relative":{"0":"денес","1":"утре","2":"задутре","-1":"вчера","-2":"завчера"},"relativeTime":{"future":{"one":"за {0} ден","other":"за {0} дена"},"past":{"one":"пред {0} ден","other":"пред {0} дена"}}},"hour":{"displayName":"Час","relativeTime":{"future":{"one":"за {0} час","other":"за {0} часа"},"past":{"one":"пред {0} час","other":"пред {0} часа"}}},"minute":{"displayName":"Минута","relativeTime":{"future":{"one":"за {0} минута","other":"за {0} минути"},"past":{"one":"пред {0} минута","other":"пред {0} минути"}}},"second":{"displayName":"Секунда","relative":{"0":"сега"},"relativeTime":{"future":{"one":"за {0} секунда","other":"за {0} секунди"},"past":{"one":"пред {0} секунда","other":"пред {0} секунди"}}}}},{"locale":"mk-MK","parentLocale":"mk"},{"locale":"ml","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"വർഷം","relative":{"0":"ഈ വർ‌ഷം","1":"അടുത്തവർഷം","-1":"കഴിഞ്ഞ വർഷം"},"relativeTime":{"future":{"one":"{0} വർഷത്തിൽ","other":"{0} വർഷത്തിൽ"},"past":{"one":"{0} വർഷം മുമ്പ്","other":"{0} വർഷം മുമ്പ്"}}},"month":{"displayName":"മാസം","relative":{"0":"ഈ മാസം","1":"അടുത്ത മാസം","-1":"കഴിഞ്ഞ മാസം"},"relativeTime":{"future":{"one":"{0} മാസത്തിൽ","other":"{0} മാസത്തിൽ"},"past":{"one":"{0} മാസം മുമ്പ്","other":"{0} മാസം മുമ്പ്"}}},"day":{"displayName":"ദിവസം","relative":{"0":"ഇന്ന്","1":"നാളെ","2":"മറ്റന്നാൾ","-1":"ഇന്നലെ","-2":"മിനിഞ്ഞാന്ന്"},"relativeTime":{"future":{"one":"{0} ദിവസത്തിൽ","other":"{0} ദിവസത്തിൽ"},"past":{"one":"{0} ദിവസം മുമ്പ്","other":"{0} ദിവസം മുമ്പ്"}}},"hour":{"displayName":"മണിക്കൂർ","relativeTime":{"future":{"one":"{0} മണിക്കൂറിൽ","other":"{0} മണിക്കൂറിൽ"},"past":{"one":"{0} മണിക്കൂർ മുമ്പ്","other":"{0} മണിക്കൂർ മുമ്പ്"}}},"minute":{"displayName":"മിനിട്ട്","relativeTime":{"future":{"one":"{0} മിനിറ്റിൽ","other":"{0} മിനിറ്റിൽ"},"past":{"one":"{0} മിനിറ്റ് മുമ്പ്","other":"{0} മിനിറ്റ് മുമ്പ്"}}},"second":{"displayName":"സെക്കൻറ്","relative":{"0":"ഇപ്പോൾ"},"relativeTime":{"future":{"one":"{0} സെക്കൻഡിൽ","other":"{0} സെക്കൻഡിൽ"},"past":{"one":"{0} സെക്കൻഡ് മുമ്പ്","other":"{0} സെക്കൻഡ് മുമ്പ്"}}}}},{"locale":"ml-IN","parentLocale":"ml"},{"locale":"mn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Жил","relative":{"0":"энэ жил","1":"ирэх жил","-1":"өнгөрсөн жил"},"relativeTime":{"future":{"one":"{0} жилийн дараа","other":"{0} жилийн дараа"},"past":{"one":"{0} жилийн өмнө","other":"{0} жилийн өмнө"}}},"month":{"displayName":"Сар","relative":{"0":"энэ сар","1":"ирэх сар","-1":"өнгөрсөн сар"},"relativeTime":{"future":{"one":"{0} сарын дараа","other":"{0} сарын дараа"},"past":{"one":"{0} сарын өмнө","other":"{0} сарын өмнө"}}},"day":{"displayName":"Өдөр","relative":{"0":"өнөөдөр","1":"маргааш","2":"нөгөөдөр","-1":"өчигдөр","-2":"уржигдар"},"relativeTime":{"future":{"one":"{0} өдрийн дараа","other":"{0} өдрийн дараа"},"past":{"one":"{0} өдрийн өмнө","other":"{0} өдрийн өмнө"}}},"hour":{"displayName":"Цаг","relativeTime":{"future":{"one":"{0} цагийн дараа","other":"{0} цагийн ��араа"},"past":{"one":"{0} цагийн өмнө","other":"{0} цагийн өмнө"}}},"minute":{"displayName":"Минут","relativeTime":{"future":{"one":"{0} минутын дараа","other":"{0} минутын дараа"},"past":{"one":"{0} минутын өмнө","other":"{0} минутын өмнө"}}},"second":{"displayName":"Секунд","relative":{"0":"Одоо"},"relativeTime":{"future":{"one":"{0} секундын дараа","other":"{0} секундын дараа"},"past":{"one":"{0} секундын өмнө","other":"{0} секундын өмнө"}}}}},{"locale":"mn-Cyrl","parentLocale":"mn"},{"locale":"mn-Cyrl-MN","parentLocale":"mn-Cyrl"},{"locale":"mn-Mong","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mo","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0]) == n,n100=t0 && s[0].slice(-2);if(ord)return n == 1?"one":"other";return n == 1 && v0?"one":!v0 || n == 0 || n != 1 && n100 >= 1 && n100 <= 19?"few":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mr","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1?"one":n == 2 || n == 3?"two":n == 4?"few":"other";return n >= 0 && n <= 1?"one":"other"},"fields":{"year":{"displayName":"वर्ष","relative":{"0":"हे वर्ष","1":"पुढील वर्ष","-1":"मागील वर्ष"},"relativeTime":{"future":{"one":"{0} वर्षामध्ये","other":"{0} वर्षांमध्ये"},"past":{"one":"{0} वर्षापूर्वी","other":"{0} वर्षांपूर्वी"}}},"month":{"displayName":"महिना","relative":{"0":"हा महिना","1":"पुढील महिना","-1":"मागील महिना"},"relativeTime":{"future":{"one":"{0} महिन्यामध्ये","other":"{0} महिन्यांमध्ये"},"past":{"one":"{0} महिन्यापूर्वी","other":"{0} महिन्यांपूर्वी"}}},"day":{"displayName":"दिवस","relative":{"0":"आज","1":"उद्या","-1":"काल"},"relativeTime":{"future":{"one":"{0} दिवसामध्ये","other":"{0} दिवसांमध्ये"},"past":{"one":"{0} दिवसापूर्वी","other":"{0} दिवसांपूर्वी"}}},"hour":{"displayName":"तास","relativeTime":{"future":{"one":"{0} तासामध्ये","other":"{0} तासांमध्ये"},"past":{"one":"{0} तासापूर्वी","other":"{0} तासांपूर्वी"}}},"minute":{"displayName":"मिनिट","relativeTime":{"future":{"one":"{0} मिनिटामध्ये","other":"{0} मिनिटांमध्ये"},"past":{"one":"{0} मिनिटापूर्वी","other":"{0} मिनिटांपूर्वी"}}},"second":{"displayName":"सेकंद","relative":{"0":"आत्ता"},"relativeTime":{"future":{"one":"{0} सेकंदामध्ये","other":"{0} सेकंदांमध्ये"},"past":{"one":"{0} सेकंदापूर्वी","other":"{0} सेकंदांपूर्वी"}}}}},{"locale":"mr-IN","parentLocale":"mr"},{"locale":"ms","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1?"one":"other";return "other"},"fields":{"year":{"displayName":"Tahun","relative":{"0":"tahun ini","1":"tahun depan","-1":"tahun lepas"},"relativeTime":{"future":{"other":"dalam {0} saat"},"past":{"other":"{0} tahun lalu"}}},"month":{"displayName":"Bulan","relative":{"0":"bulan ini","1":"bulan depan","-1":"bulan lalu"},"relativeTime":{"future":{"other":"dalam {0} bulan"},"past":{"other":"{0} bulan lalu"}}},"day":{"displayName":"Hari","relative":{"0":"hari ini","1":"esok","2":"lusa","-1":"semalam","-2":"kelmarin"},"relativeTime":{"future":{"other":"dalam {0} hari"},"past":{"other":"{0} hari lalu"}}},"hour":{"displayName":"Jam","relativeTime":{"future":{"other":"dalam {0} jam"},"past":{"other":"{0} jam yang lalu"}}},"minute":{"displayName":"Minit","relativeTime":{"future":{"other":"dalam {0} minit"},"past":{"other":"{0} minit yang lalu"}}},"second":{"displayName":"Saat","relative":{"0":"sekarang"},"relativeTime":{"future":{"other":"dalam {0} saat"},"past":{"other":"{0} saat lalu"}}}}},{"locale":"ms-Arab","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ms-Latn","parentLocale":"ms"},{"locale":"ms-Latn-BN","parentLocale":"ms-Latn"},{"locale":"ms-Latn-MY","parentLocale":"ms-Latn"},{"locale":"ms-Latn-SG","parentLocale":"ms-Latn"},{"locale":"mt","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n,n100=t0 && s[0].slice(-2);if(ord)return "other";return n == 1?"one":n == 0 || n100 >= 2 && n100 <= 10?"few":n100 >= 11 && n100 <= 19?"many":"other"},"fields":{"year":{"displayName":"Sena","relative":{"0":"Din is-sena","1":"Is-sena d-dieħla","-1":"Is-sena li għaddiet"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"one":"{0} sena ilu","few":"{0} snin ilu","many":"{0} snin ilu","other":"{0} snin ilu"}}},"month":{"displayName":"Xahar","relative":{"0":"Dan ix-xahar","1":"Ix-xahar id-dieħel","-1":"Ix-xahar li għadda"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Jum","relative":{"0":"Illum","1":"Għada","-1":"Ilbieraħ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Siegħa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minuta","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekonda","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mt-MT","parentLocale":"mt"},{"locale":"mua","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Syii","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Fĩi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Zah’nane/ Comme","relative":{"0":"Tǝ’nahko","1":"Tǝ’nane","-1":"Tǝsoo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Cok comme","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Cok comme ma laŋne","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Cok comme ma laŋ tǝ biŋ","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"mua-CM","parentLocale":"mua"},{"locale":"my","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"နှစ်","relative":{"0":"ယခုနှစ်","1":"နောက်နှစ်","-1":"ယမန်နှစ်"},"relativeTime":{"future":{"other":"{0}နှစ်အတွင်း"},"past":{"other":"လွန်ခဲ့သော{0}နှစ်"}}},"month":{"displayName":"လ","relative":{"0":"ယခုလ","1":"နောက်လ","-1":"ယမန်လ"},"relativeTime":{"future":{"other":"{0}လအတွင်း"},"past":{"other":"လွန်ခဲ့သော{0}လ"}}},"day":{"displayName":"ရက်","relative":{"0":"ယနေ့","1":"မနက်ဖြန်","2":"သဘက်ခါ","-1":"မနေ့က","-2":"တနေ့က"},"relativeTime":{"future":{"other":"{0}ရက်အတွင်း"},"past":{"other":"လွန်ခဲ့သော{0}ရက်"}}},"hour":{"displayName":"နာရီ","relativeTime":{"future":{"other":"{0}နာရီအတွင်း"},"past":{"other":"လွန်ခဲ့သော{0}နာရီ"}}},"minute":{"displayName":"မိနစ်","relativeTime":{"future":{"other":"{0}မိနစ်အတွင်း"},"past":{"other":"လွန်ခဲ့သော{0}မိနစ်"}}},"second":{"displayName":"စက္ကန့်","relative":{"0":"ယခု"},"relativeTime":{"future":{"other":"{0}စက္ကန့်အတွင်း"},"past":{"other":"လွန်ခဲ့သော{0}စက္ကန့်"}}}}},{"locale":"my-MM","parentLocale":"my"},{"locale":"nah","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"naq","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"Kurib","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ǁKhâb","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Tsees","relative":{"0":"Neetsee","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Iiri","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Haib","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"ǀGâub","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"naq-NA","parentLocale":"naq"},{"locale":"nb","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"År","relative":{"0":"i år","1":"neste år","-1":"i fjor"},"relativeTime":{"future":{"one":"om {0} år","other":"om {0} år"},"past":{"one":"for {0} år siden","other":"for {0} år siden"}}},"month":{"displayName":"Måned","relative":{"0":"denne måneden","1":"neste måned","-1":"forrige måned"},"relativeTime":{"future":{"one":"om {0} måned","other":"om {0} måneder"},"past":{"one":"for {0} måned siden","other":"for {0} måneder siden"}}},"day":{"displayName":"Dag","relative":{"0":"i dag","1":"i morgen","2":"i overmorgen","-1":"i går","-2":"i forgårs"},"relativeTime":{"future":{"one":"om {0} døgn","other":"om {0} døgn"},"past":{"one":"for {0} døgn siden","other":"for {0} døgn siden"}}},"hour":{"displayName":"Time","relativeTime":{"future":{"one":"om {0} time","other":"om {0} timer"},"past":{"one":"for {0} time siden","other":"for {0} timer siden"}}},"minute":{"displayName":"Minutt","relativeTime":{"future":{"one":"om {0} minutt","other":"om {0} minutter"},"past":{"one":"for {0} minutt siden","other":"for {0} minutter siden"}}},"second":{"displayName":"Sekund","relative":{"0":"nå"},"relativeTime":{"future":{"one":"om {0} sekund","other":"om {0} sekunder"},"past":{"one":"for {0} sekund siden","other":"for {0} sekunder siden"}}}}},{"locale":"nb-NO","parentLocale":"nb"},{"locale":"nb-SJ","parentLocale":"nb"},{"locale":"nd","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Umnyaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Inyangacale","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ilanga","relative":{"0":"Lamuhla","1":"Kusasa","-1":"Izolo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ihola","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Umuzuzu","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Isekendi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nd-ZW","parentLocale":"nd"},{"locale":"ne","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n;if(ord)return t0 && n >= 1 && n <= 4?"one":"other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"बर्ष","relative":{"0":"यो वर्ष","1":"अर्को वर्ष","-1":"पहिलो वर्ष"},"relativeTime":{"future":{"one":"{0} वर्षमा","other":"{0} वर्षमा"},"past":{"one":"{0} वर्ष अघि","other":"{0} वर्ष अघि"}}},"month":{"displayName":"महिना","relative":{"0":"यो महिना","1":"अर्को महिना","-1":"गएको महिना"},"relativeTime":{"future":{"one":"{0} महिनामा","other":"{0} महिनामा"},"past":{"one":"{0} महिना पहिले","other":"{0} महिना पहिले"}}},"day":{"displayName":"बार","relative":{"0":"आज","1":"भोली","-1":"हिजो","-2":"अस्ति"},"relativeTime":{"future":{"one":"{0} दिनमा","other":"{0} दिनमा"},"past":{"one":"{0} दिन पहिले","other":"{0} दिन पहिले"}}},"hour":{"displayName":"घण्टा","relativeTime":{"future":{"one":"{0} घण्टामा","other":"{0} घण्टामा"},"past":{"one":"{0} घण्टा पहिले","other":"{0} घण्टा पहिले"}}},"minute":{"displayName":"मिनेट","relativeTime":{"future":{"one":"{0} मिनेटमा","other":"{0} मिनेटमा"},"past":{"one":"{0} मिनेट पहिले","other":"{0} मिनेट पहिले"}}},"second":{"displayName":"दोस्रो","relative":{"0":"अब"},"relativeTime":{"future":{"one":"{0} सेकेण्डमा","other":"{0} सेकेण्डमा"},"past":{"one":"{0} सेकेण्ड पहिले","other":"{0} सेकेण्ड पहिले"}}}}},{"locale":"ne-IN","parentLocale":"ne","fields":{"year":{"displayName":"वर्ष","relative":{"0":"यो वर्ष","1":"अर्को वर्ष","-1":"पहिलो वर्ष"},"relativeTime":{"future":{"one":"{0} वर्षमा","other":"{0} वर्षमा"},"past":{"one":"{0} वर्ष अघि","other":"{0} वर्ष अघि"}}},"month":{"displayName":"महिना","relative":{"0":"यो महिना","1":"अर्को महिना","-1":"गएको महिना"},"relativeTime":{"future":{"one":"{0} महिनामा","other":"{0} महिनामा"},"past":{"one":"{0} महिना पहिले","other":"{0} महिना पहिले"}}},"day":{"displayName":"वार","relative":{"0":"आज","1":"भोली","2":"पर्सि","-1":"हिजो","-2":"अस्ति"},"relativeTime":{"future":{"one":"{0} दिनमा","other":"{0} दिनमा"},"past":{"one":"{0} दिन पहिले","other":"{0} दिन पहिले"}}},"hour":{"displayName":"घण्टा","relativeTime":{"future":{"one":"{0} घण्टामा","other":"{0} घण्टामा"},"past":{"one":"{0} घण्टा पहिले","other":"{0} घण्टा पहिले"}}},"minute":{"displayName":"मिनेट","relativeTime":{"future":{"one":"{0} मिनेटमा","other":"{0} मिनेटमा"},"past":{"one":"{0} मिनेट पहिले","other":"{0} मिनेट पहिले"}}},"second":{"displayName":"सेकेन्ड","relative":{"0":"अब"},"relativeTime":{"future":{"one":"{0} सेकेण्डमा","other":"{0} सेकेण्डमा"},"past":{"one":"{0} सेकेण्ड पहिले","other":"{0} सेकेण्ड पहिले"}}}}},{"locale":"ne-NP","parentLocale":"ne"},{"locale":"nl","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Jaar","relative":{"0":"dit jaar","1":"volgend jaar","-1":"vorig jaar"},"relativeTime":{"future":{"one":"over {0} jaar","other":"over {0} jaar"},"past":{"one":"{0} jaar geleden","other":"{0} jaar geleden"}}},"month":{"displayName":"Maand","relative":{"0":"deze maand","1":"volgende maand","-1":"vorige maand"},"relativeTime":{"future":{"one":"over {0} maand","other":"over {0} maanden"},"past":{"one":"{0} maand geleden","other":"{0} maanden geleden"}}},"day":{"displayName":"Dag","relative":{"0":"vandaag","1":"morgen","2":"overmorgen","-1":"gisteren","-2":"eergisteren"},"relativeTime":{"future":{"one":"over {0} dag","other":"over {0} dagen"},"past":{"one":"{0} dag geleden","other":"{0} dagen geleden"}}},"hour":{"displayName":"Uur","relativeTime":{"future":{"one":"over {0} uur","other":"over {0} uur"},"past":{"one":"{0} uur geleden","other":"{0} uur geleden"}}},"minute":{"displayName":"Minuut","relativeTime":{"future":{"one":"over {0} minuut","other":"over {0} minuten"},"past":{"one":"{0} minuut geleden","other":"{0} minuten geleden"}}},"second":{"displayName":"Seconde","relative":{"0":"nu"},"relativeTime":{"future":{"one":"over {0} seconde","other":"over {0} seconden"},"past":{"one":"{0} seconde geleden","other":"{0} seconden geleden"}}}}},{"locale":"nl-AW","parentLocale":"nl"},{"locale":"nl-BE","parentLocale":"nl"},{"locale":"nl-BQ","parentLocale":"nl"},{"locale":"nl-CW","parentLocale":"nl"},{"locale":"nl-NL","parentLocale":"nl"},{"locale":"nl-SR","parentLocale":"nl"},{"locale":"nl-SX","parentLocale":"nl"},{"locale":"nmg","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mbvu","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ngwɛn","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Duö","relative":{"0":"Dɔl","1":"Namáná","-1":"Nakugú"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Wulā","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Mpálâ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Nyiɛl","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nmg-CM","parentLocale":"nmg"},{"locale":"nn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"år","relative":{"0":"dette år","1":"neste år","-1":"i fjor"},"relativeTime":{"future":{"one":"om {0} år","other":"om {0} år"},"past":{"one":"for {0} år siden","other":"for {0} år siden"}}},"month":{"displayName":"månad","relative":{"0":"denne månad","1":"neste månad","-1":"forrige månad"},"relativeTime":{"future":{"one":"om {0} måned","other":"om {0} måneder"},"past":{"one":"for {0} måned siden","other":"for {0} måneder siden"}}},"day":{"displayName":"dag","relative":{"0":"i dag","1":"i morgon","2":"i overmorgon","-1":"i går","-2":"i forgårs"},"relativeTime":{"future":{"one":"om {0} døgn","other":"om {0} døgn"},"past":{"one":"for {0} døgn siden","other":"for {0} døgn siden"}}},"hour":{"displayName":"time","relativeTime":{"future":{"one":"om {0} time","other":"om {0} timer"},"past":{"one":"for {0} time siden","other":"for {0} timer siden"}}},"minute":{"displayName":"minutt","relativeTime":{"future":{"one":"om {0} minutt","other":"om {0} minutter"},"past":{"one":"for {0} minutt siden","other":"for {0} minutter siden"}}},"second":{"displayName":"sekund","relative":{"0":"now"},"relativeTime":{"future":{"one":"om {0} sekund","other":"om {0} sekunder"},"past":{"one":"for {0} sekund siden","other":"for {0} sekunder siden"}}}}},{"locale":"nn-NO","parentLocale":"nn"},{"locale":"nnh","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"ngùʼ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"lyɛ̌ʼ","relative":{"0":"lyɛ̌ʼɔɔn","1":"jǔɔ gẅie à ne ntóo","-1":"jǔɔ gẅie à ka tɔ̌g"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"fʉ̀ʼ nèm","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nnh-CM","parentLocale":"nnh"},{"locale":"no","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nqo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nr","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nr-ZA","parentLocale":"nr"},{"locale":"nso","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nso-ZA","parentLocale":"nso"},{"locale":"nus","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Ruɔ̱n","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Pay","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Cäŋ","relative":{"0":"Walɛ","1":"Ruun","-1":"Pan"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Thaak","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minit","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Thɛkɛni","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nus-SD","parentLocale":"nus"},{"locale":"ny","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nyn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Omwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Omwezi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Eizooba","relative":{"0":"Erizooba","1":"Nyenkyakare","-1":"Nyomwabazyo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Shaaha","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Edakiika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Obucweka/Esekendi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"nyn-UG","parentLocale":"nyn"},{"locale":"om","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"om-ET","parentLocale":"om"},{"locale":"om-KE","parentLocale":"om"},{"locale":"or","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"or-IN","parentLocale":"or"},{"locale":"os","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Аз","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Мӕй","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Бон","relative":{"0":"Абон","1":"Сом","2":"Иннӕбон","-1":"Знон","-2":"Ӕндӕрӕбон"},"relativeTime":{"future":{"one":"{0} боны фӕстӕ","other":"{0} боны фӕстӕ"},"past":{"one":"{0} бон раздӕр","other":"{0} боны размӕ"}}},"hour":{"displayName":"Сахат","relativeTime":{"future":{"one":"{0} сахаты фӕстӕ","other":"{0} сахаты фӕстӕ"},"past":{"one":"{0} сахаты размӕ","other":"{0} сахаты размӕ"}}},"minute":{"displayName":"Минут","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Секунд","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"os-GE","parentLocale":"os"},{"locale":"os-RU","parentLocale":"os"},{"locale":"pa","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"ਸਾਲ","relative":{"0":"ਇਹ ਸਾਲ","1":"ਅਗਲਾ ਸਾਲ","-1":"ਪਿਛਲਾ ਸਾਲ"},"relativeTime":{"future":{"one":"{0} ਸਾਲ ਵਿੱਚ","other":"{0} ਸਾਲਾਂ ਵਿੱਚ"},"past":{"one":"{0} ਸਾਲ ਪਹਿਲਾਂ","other":"{0} ਸਾਲ ਪਹਿਲਾਂ"}}},"month":{"displayName":"ਮਹੀਨਾ","relative":{"0":"ਇਹ ਮਹੀਨਾ","1":"ਅਗਲਾ ਮਹੀਨਾ","-1":"ਪਿਛਲਾ ਮਹੀਨਾ"},"relativeTime":{"future":{"one":"{0} ਮਹੀਨੇ ਵਿੱਚ","other":"{0} ਮਹੀਨਿਆਂ ਵਿੱਚ"},"past":{"one":"{0} ਮਹੀਨੇ ਪਹਿਲਾਂ","other":"{0} ਮਹੀਨੇ ਪਹਿਲਾਂ"}}},"day":{"displayName":"ਦਿਨ","relative":{"0":"ਅੱਜ","1":"ਭਲਕੇ","-1":"ਬੀਤਿਆ ਕੱਲ੍ਹ"},"relativeTime":{"future":{"one":"{0} ਦਿਨ ਵਿੱਚ","other":"{0} ਦਿਨਾਂ ਵਿੱਚ"},"past":{"one":"{0} ਦਿਨ ਪਹਿਲਾਂ","other":"{0} ਦਿਨ ਪਹਿਲਾਂ"}}},"hour":{"displayName":"ਘੰਟਾ","relativeTime":{"future":{"one":"{0} ਘੰਟੇ ਵਿੱਚ","other":"{0} ਘੰਟਿਆਂ ਵਿੱਚ"},"past":{"one":"{0} ਘੰਟਾ ਪਹਿਲਾਂ","other":"{0} ਘੰਟੇ ਪਹਿਲਾਂ"}}},"minute":{"displayName":"ਮਿੰਟ","relativeTime":{"future":{"one":"{0} ਮਿੰਟ ਵਿੱਚ","other":"{0} ਮਿੰਟਾਂ ਵਿੱਚ"},"past":{"one":"{0} ਮਿੰਟ ਪਹਿਲਾਂ","other":"{0} ਮਿੰਟ ਪਹਿਲਾਂ"}}},"second":{"displayName":"ਸਕਿੰਟ","relative":{"0":"ਹੁਣ"},"relativeTime":{"future":{"one":"{0} ਸਕਿੰਟ ਵਿੱਚ","other":"{0} ਸਕਿੰਟਾਂ ਵਿੱਚ"},"past":{"one":"{0} ਸਕਿੰਟ ਪਹਿਲਾਂ","other":"{0} ਸਕਿੰਟ ਪਹਿਲਾਂ"}}}}},{"locale":"pa-Arab","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ورھا","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"مہينا","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"دئن","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"گھنٹا","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"منٹ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"pa-Arab-PK","parentLocale":"pa-Arab"},{"locale":"pa-Guru","parentLocale":"pa"},{"locale":"pa-Guru-IN","parentLocale":"pa-Guru"},{"locale":"pap","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"pl","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return "other";return n == 1 && v0?"one":v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14)?"few":v0 && i != 1 && (i10 == 0 || i10 == 1) || v0 && i10 >= 5 && i10 <= 9 || v0 && i100 >= 12 && i100 <= 14?"many":"other"},"fields":{"year":{"displayName":"rok","relative":{"0":"w tym roku","1":"w przyszłym roku","-1":"w zeszłym roku"},"relativeTime":{"future":{"one":"za {0} rok","few":"za {0} lata","many":"za {0} lat","other":"za {0} roku"},"past":{"one":"{0} rok temu","few":"{0} lata temu","many":"{0} lat temu","other":"{0} roku temu"}}},"month":{"displayName":"miesiąc","relative":{"0":"w tym miesiącu","1":"w przyszłym miesiącu","-1":"w zeszłym miesiącu"},"relativeTime":{"future":{"one":"za {0} miesiąc","few":"za {0} miesiące","many":"za {0} miesięcy","other":"za {0} miesiąca"},"past":{"one":"{0} miesiąc temu","few":"{0} miesiące temu","many":"{0} miesięcy temu","other":"{0} miesiąca temu"}}},"day":{"displayName":"dzień","relative":{"0":"dzisiaj","1":"jutro","2":"pojutrze","-1":"wczoraj","-2":"przedwczoraj"},"relativeTime":{"future":{"one":"za {0} dzień","few":"za {0} dni","many":"za {0} dni","other":"za {0} dnia"},"past":{"one":"{0} dzień temu","few":"{0} dni temu","many":"{0} dni temu","other":"{0} dnia temu"}}},"hour":{"displayName":"godzina","relativeTime":{"future":{"one":"za {0} godzinę","few":"za {0} godziny","many":"za {0} godzin","other":"za {0} godziny"},"past":{"one":"{0} godzinę temu","few":"{0} godziny temu","many":"{0} godzin temu","other":"{0} godziny temu"}}},"minute":{"displayName":"minuta","relativeTime":{"future":{"one":"za {0} minutę","few":"za {0} minuty","many":"za {0} minut","other":"za {0} minuty"},"past":{"one":"{0} minutę temu","few":"{0} minuty temu","many":"{0} minut temu","other":"{0} minuty temu"}}},"second":{"displayName":"sekunda","relative":{"0":"teraz"},"relativeTime":{"future":{"one":"za {0} sekundę","few":"za {0} sekundy","many":"za {0} sekund","other":"za {0} sekundy"},"past":{"one":"{0} sekundę temu","few":"{0} sekundy temu","many":"{0} sekund temu","other":"{0} sekundy temu"}}}}},{"locale":"pl-PL","parentLocale":"pl"},{"locale":"prg","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),f=s[1] || "",v=f.length,t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2),f100=f.slice(-2),f10=f.slice(-1);if(ord)return "other";return t0 && n10 == 0 || n100 >= 11 && n100 <= 19 || v == 2 && f100 >= 11 && f100 <= 19?"zero":n10 == 1 && n100 != 11 || v == 2 && f10 == 1 && f100 != 11 || v != 2 && f10 == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ps","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ps-AF","parentLocale":"ps"},{"locale":"pt","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n;if(ord)return "other";return t0 && n >= 0 && n <= 2 && n != 2?"one":"other"},"fields":{"year":{"displayName":"Ano","relative":{"0":"este ano","1":"próximo ano","-1":"ano passado"},"relativeTime":{"future":{"one":"Dentro de {0} ano","other":"Dentro de {0} anos"},"past":{"one":"Há {0} ano","other":"Há {0} anos"}}},"month":{"displayName":"Mês","relative":{"0":"este mês","1":"próximo mês","-1":"mês passado"},"relativeTime":{"future":{"one":"Dentro de {0} mês","other":"Dentro de {0} meses"},"past":{"one":"Há {0} mês","other":"Há {0} meses"}}},"day":{"displayName":"Dia","relative":{"0":"hoje","1":"amanhã","2":"depois de amanhã","-1":"ontem","-2":"anteontem"},"relativeTime":{"future":{"one":"Dentro de {0} dia","other":"Dentro de {0} dias"},"past":{"one":"Há {0} dia","other":"Há {0} dias"}}},"hour":{"displayName":"Hora","relativeTime":{"future":{"one":"Dentro de {0} hora","other":"Dentro de {0} horas"},"past":{"one":"Há {0} hora","other":"Há {0} horas"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"one":"Dentro de {0} minuto","other":"Dentro de {0} minutos"},"past":{"one":"Há {0} minuto","other":"Há {0} minutos"}}},"second":{"displayName":"Segundo","relative":{"0":"agora"},"relativeTime":{"future":{"one":"Dentro de {0} segundo","other":"Dentro de {0} segundos"},"past":{"one":"Há {0} segundo","other":"Há {0} segundos"}}}}},{"locale":"pt-AO","parentLocale":"pt-PT"},{"locale":"pt-PT","parentLocale":"pt","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Ano","relative":{"0":"este ano","1":"próximo ano","-1":"ano passado"},"relativeTime":{"future":{"one":"dentro de {0} ano","other":"dentro de {0} anos"},"past":{"one":"há {0} ano","other":"há {0} anos"}}},"month":{"displayName":"Mês","relative":{"0":"este mês","1":"próximo mês","-1":"mês passado"},"relativeTime":{"future":{"one":"dentro de {0} mês","other":"dentro de {0} meses"},"past":{"one":"há {0} mês","other":"há {0} meses"}}},"day":{"displayName":"Dia","relative":{"0":"hoje","1":"amanhã","2":"depois de amanhã","-1":"ontem","-2":"anteontem"},"relativeTime":{"future":{"one":"dentro de {0} dia","other":"dentro de {0} dias"},"past":{"one":"há {0} dia","other":"há {0} dias"}}},"hour":{"displayName":"Hora","relativeTime":{"future":{"one":"dentro de {0} hora","other":"dentro de {0} horas"},"past":{"one":"há {0} hora","other":"há {0} horas"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"one":"dentro de {0} minuto","other":"dentro de {0} minutos"},"past":{"one":"há {0} minuto","other":"há {0} minutos"}}},"second":{"displayName":"Segundo","relative":{"0":"agora"},"relativeTime":{"future":{"one":"dentro de {0} segundo","other":"dentro de {0} segundos"},"past":{"one":"há {0} segundo","other":"há {0} segundos"}}}}},{"locale":"pt-BR","parentLocale":"pt"},{"locale":"pt-CV","parentLocale":"pt-PT"},{"locale":"pt-GW","parentLocale":"pt-PT"},{"locale":"pt-MO","parentLocale":"pt-PT"},{"locale":"pt-MZ","parentLocale":"pt-PT"},{"locale":"pt-ST","parentLocale":"pt-PT"},{"locale":"pt-TL","parentLocale":"pt-PT"},{"locale":"qu","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"qu-BO","parentLocale":"qu"},{"locale":"qu-EC","parentLocale":"qu"},{"locale":"qu-PE","parentLocale":"qu"},{"locale":"rm","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"onn","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"mais","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Tag","relative":{"0":"oz","1":"damaun","2":"puschmaun","-1":"ier","-2":"stersas"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ura","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"minuta","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"secunda","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"rm-CH","parentLocale":"rm"},{"locale":"rn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Umwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ukwezi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Umusi","relative":{"0":"Uyu musi","1":"Ejo (hazoza)","-1":"Ejo (haheze)"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Isaha","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Umunota","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Isegonda","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"rn-BI","parentLocale":"rn"},{"locale":"ro","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0]) == n,n100=t0 && s[0].slice(-2);if(ord)return n == 1?"one":"other";return n == 1 && v0?"one":!v0 || n == 0 || n != 1 && n100 >= 1 && n100 <= 19?"few":"other"},"fields":{"year":{"displayName":"An","relative":{"0":"anul acesta","1":"anul viitor","-1":"anul trecut"},"relativeTime":{"future":{"one":"peste {0} an","few":"peste {0} ani","other":"peste {0} de ani"},"past":{"one":"acum {0} an","few":"acum {0} ani","other":"acum {0} de ani"}}},"month":{"displayName":"Lună","relative":{"0":"luna aceasta","1":"luna viitoare","-1":"luna trecută"},"relativeTime":{"future":{"one":"peste {0} lună","few":"peste {0} luni","other":"peste {0} de luni"},"past":{"one":"acum {0} lună","few":"acum {0} luni","other":"acum {0} de luni"}}},"day":{"displayName":"Zi","relative":{"0":"azi","1":"mâine","2":"poimâine","-1":"ieri","-2":"alaltăieri"},"relativeTime":{"future":{"one":"peste {0} zi","few":"peste {0} zile","other":"peste {0} de zile"},"past":{"one":"acum {0} zi","few":"acum {0} zile","other":"acum {0} de zile"}}},"hour":{"displayName":"Oră","relativeTime":{"future":{"one":"peste {0} oră","few":"peste {0} ore","other":"peste {0} de ore"},"past":{"one":"acum {0} oră","few":"acum {0} ore","other":"acum {0} de ore"}}},"minute":{"displayName":"Minut","relativeTime":{"future":{"one":"peste {0} minut","few":"peste {0} minute","other":"peste {0} de minute"},"past":{"one":"acum {0} minut","few":"acum {0} minute","other":"acum {0} de minute"}}},"second":{"displayName":"Secundă","relative":{"0":"acum"},"relativeTime":{"future":{"one":"peste {0} secundă","few":"peste {0} secunde","other":"peste {0} de secunde"},"past":{"one":"acum {0} secundă","few":"acum {0} secunde","other":"acum {0} de secunde"}}}}},{"locale":"ro-MD","parentLocale":"ro"},{"locale":"ro-RO","parentLocale":"ro"},{"locale":"rof","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Muaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mweri","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mfiri","relative":{"0":"Linu","1":"Ng’ama","-1":"Hiyo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Isaa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"rof-TZ","parentLocale":"rof"},{"locale":"ru","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return "other";return v0 && i10 == 1 && i100 != 11?"one":v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14)?"few":v0 && i10 == 0 || v0 && i10 >= 5 && i10 <= 9 || v0 && i100 >= 11 && i100 <= 14?"many":"other"},"fields":{"year":{"displayName":"Год","relative":{"0":"в этому году","1":"в следующем году","-1":"в прошлом году"},"relativeTime":{"future":{"one":"через {0} год","few":"через {0} года","many":"через {0} лет","other":"через {0} года"},"past":{"one":"{0} год назад","few":"{0} года назад","many":"{0} лет назад","other":"{0} года назад"}}},"month":{"displayName":"Месяц","relative":{"0":"в этом месяце","1":"в следующем месяце","-1":"в прошлом месяце"},"relativeTime":{"future":{"one":"через {0} месяц","few":"через {0} месяца","many":"через {0} месяцев","other":"через {0} месяца"},"past":{"one":"{0} месяц назад","few":"{0} месяца назад","many":"{0} месяцев назад","other":"{0} месяца назад"}}},"day":{"displayName":"День","relative":{"0":"сегодня","1":"завтра","2":"послезавтра","-1":"вчера","-2":"позавчера"},"relativeTime":{"future":{"one":"через {0} день","few":"через {0} дня","many":"через {0} дней","other":"через {0} дней"},"past":{"one":"{0} день назад","few":"{0} дня назад","many":"{0} дней назад","other":"{0} дня назад"}}},"hour":{"displayName":"Час","relativeTime":{"future":{"one":"через {0} час","few":"через {0} часа","many":"через {0} часов","other":"через {0} часа"},"past":{"one":"{0} час назад","few":"{0} часа назад","many":"{0} часов назад","other":"{0} часа назад"}}},"minute":{"displayName":"Минута","relativeTime":{"future":{"one":"через {0} минуту","few":"через {0} минуты","many":"через {0} минут","other":"через {0} минуты"},"past":{"one":"{0} минуту назад","few":"{0} минуты назад","many":"{0} минут назад","other":"{0} минуты назад"}}},"second":{"displayName":"Секунда","relative":{"0":"сейчас"},"relativeTime":{"future":{"one":"через {0} секунду","few":"через {0} секунды","many":"через {0} секунд","other":"через {0} секунды"},"past":{"one":"{0} секунду назад","few":"{0} секунды назад","many":"{0} секунд назад","other":"{0} секунды назад"}}}}},{"locale":"ru-BY","parentLocale":"ru"},{"locale":"ru-KG","parentLocale":"ru"},{"locale":"ru-KZ","parentLocale":"ru"},{"locale":"ru-MD","parentLocale":"ru"},{"locale":"ru-RU","parentLocale":"ru"},{"locale":"ru-UA","parentLocale":"ru"},{"locale":"rw","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"rw-RW","parentLocale":"rw"},{"locale":"rwk","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Maka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mori","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mfiri","relative":{"0":"Inu","1":"Ngama","-1":"Ukou"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakyika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"rwk-TZ","parentLocale":"rwk"},{"locale":"sah","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Сыл","relative":{"0":"бу сыл","1":"кэлэр сыл","-1":"ааспыт сыл"},"relativeTime":{"future":{"other":"{0} сылынан"},"past":{"other":"{0} сыл ынараа өттүгэр"}}},"month":{"displayName":"Ый","relative":{"0":"бу ый","1":"аныгыскы ый","-1":"ааспыт ый"},"relativeTime":{"future":{"other":"{0} ыйынан"},"past":{"other":"{0} ый ынараа өттүгэр"}}},"day":{"displayName":"Күн","relative":{"0":"Бүгүн","1":"Сарсын","2":"Өйүүн","-1":"Бэҕэһээ","-2":"Иллэрээ күн"},"relativeTime":{"future":{"other":"{0} күнүнэн"},"past":{"other":"{0} күн ынараа өттүгэр"}}},"hour":{"displayName":"Чаас","relativeTime":{"future":{"other":"{0} чааһынан"},"past":{"other":"{0} чаас ынараа өттүгэр"}}},"minute":{"displayName":"Мүнүүтэ","relativeTime":{"future":{"other":"{0} мүнүүтэннэн"},"past":{"other":"{0} мүнүүтэ ынараа өттүгэр"}}},"second":{"displayName":"Сөкүүндэ","relative":{"0":"now"},"relativeTime":{"future":{"other":"{0} сөкүүндэннэн"},"past":{"other":"{0} сөкүүндэ ынараа өттүгэр"}}}}},{"locale":"sah-RU","parentLocale":"sah"},{"locale":"saq","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Lari","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Lapa","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mpari","relative":{"0":"Duo","1":"Taisere","-1":"Ng’ole"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saai","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Idakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Isekondi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"saq-KE","parentLocale":"saq"},{"locale":"sbp","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mwakha","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwesi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Lusiku","relative":{"0":"Ineng’uni","1":"Pamulaawu","-1":"Imehe"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ilisala","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Idakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Isekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"sbp-TZ","parentLocale":"sbp"},{"locale":"se","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"jáhki","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"{0} jahki maŋŋilit","two":"{0} jahkki maŋŋilit","other":"{0} jahkki maŋŋilit"},"past":{"one":"{0} jahki árat","two":"{0} jahkki árat","other":"{0} jahkki árat"}}},"month":{"displayName":"mánnu","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"{0} mánotbadji maŋŋilit","two":"{0} mánotbadji maŋŋilit","other":"{0} mánotbadji maŋŋilit"},"past":{"one":"{0} mánotbadji árat","two":"{0} mánotbadji árat","other":"{0} mánotbadji árat"}}},"day":{"displayName":"beaivi","relative":{"0":"odne","1":"ihttin","2":"paijeelittáá","-1":"ikte","-2":"oovdebpeivvi"},"relativeTime":{"future":{"one":"{0} jándor maŋŋilit","two":"{0} jándor amaŋŋilit","other":"{0} jándora maŋŋilit"},"past":{"one":"{0} jándor árat","two":"{0} jándora árat","other":"{0} jándora árat"}}},"hour":{"displayName":"diibmu","relativeTime":{"future":{"one":"{0} diibmu maŋŋilit","two":"{0} diibmur maŋŋilit","other":"{0} diibmur maŋŋilit"},"past":{"one":"{0} diibmu árat","two":"{0} diibmur árat","other":"{0} diibmur árat"}}},"minute":{"displayName":"minuhtta","relativeTime":{"future":{"one":"{0} minuhta maŋŋilit","two":"{0} minuhtta maŋŋilit","other":"{0} minuhtta maŋŋilit"},"past":{"one":"{0} minuhta árat","two":"{0} minuhtta árat","other":"{0} minuhtta árat"}}},"second":{"displayName":"sekunda","relative":{"0":"now"},"relativeTime":{"future":{"one":"{0} sekunda maŋŋilit","two":"{0} sekundda maŋŋilit","other":"{0} sekundda maŋŋilit"},"past":{"one":"{0} sekunda árat","two":"{0} sekundda árat","other":"{0} sekundda árat"}}}}},{"locale":"se-FI","parentLocale":"se","fields":{"year":{"displayName":"jahki","relative":{"0":"dán jagi","1":"boahtte jagi","-1":"mannan jagi"},"relativeTime":{"future":{"one":"{0} jagi siste","two":"{0} jagi siste","other":"{0} jagi siste"},"past":{"one":"{0} jagi árat","two":"{0} jagi árat","other":"{0} jagi árat"}}},"month":{"displayName":"mánnu","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"{0} mánotbadji maŋŋilit","two":"{0} mánotbadji maŋŋilit","other":"{0} mánotbadji maŋŋilit"},"past":{"one":"{0} mánotbadji árat","two":"{0} mánotbadji árat","other":"{0} mánotbadji árat"}}},"day":{"displayName":"beaivi","relative":{"0":"odne","1":"ihttin","2":"paijeelittáá","-1":"ikte","-2":"oovdebpeivvi"},"relativeTime":{"future":{"one":"{0} jándor maŋŋilit","two":"{0} jándor amaŋŋilit","other":"{0} jándora maŋŋilit"},"past":{"one":"{0} jándor árat","two":"{0} jándora árat","other":"{0} jándora árat"}}},"hour":{"displayName":"diibmu","relativeTime":{"future":{"one":"{0} diibmu maŋŋilit","two":"{0} diibmur maŋŋilit","other":"{0} diibmur maŋŋilit"},"past":{"one":"{0} diibmu árat","two":"{0} diibmur árat","other":"{0} diibmur árat"}}},"minute":{"displayName":"minuhtta","relativeTime":{"future":{"one":"{0} minuhta maŋŋilit","two":"{0} minuhtta maŋŋilit","other":"{0} minuhtta maŋŋilit"},"past":{"one":"{0} minuhta árat","two":"{0} minuhtta árat","other":"{0} minuhtta árat"}}},"second":{"displayName":"sekunda","relative":{"0":"now"},"relativeTime":{"future":{"one":"{0} sekunda maŋŋilit","two":"{0} sekundda maŋŋilit","other":"{0} sekundda maŋŋilit"},"past":{"one":"{0} sekunda árat","two":"{0} sekundda árat","other":"{0} sekundda árat"}}}}},{"locale":"se-NO","parentLocale":"se"},{"locale":"se-SE","parentLocale":"se"},{"locale":"seh","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Chaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwezi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ntsiku","relative":{"0":"Lero","1":"Manguana","-1":"Zuro"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hora","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minuto","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Segundo","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"seh-MZ","parentLocale":"seh"},{"locale":"ses","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Jiiri","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Handu","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Zaari","relative":{"0":"Hõo","1":"Suba","-1":"Bi"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Guuru","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Miniti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Miti","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ses-ML","parentLocale":"ses"},{"locale":"sg","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Ngû","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Nze","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Lâ","relative":{"0":"Lâsô","1":"Kêkerêke","-1":"Bîrï"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Ngbonga","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Ndurü ngbonga","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Nzîna ngbonga","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"sg-CF","parentLocale":"sg"},{"locale":"sh","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return "other";return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11?"one":v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14)?"few":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"shi","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n;if(ord)return "other";return n >= 0 && n <= 1?"one":t0 && n >= 2 && n <= 10?"few":"other"},"fields":{"year":{"displayName":"ⴰⵙⴳⴳⵯⴰⵙ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ⴰⵢⵢⵓⵔ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"ⴰⵙⵙ","relative":{"0":"ⴰⵙⵙⴰ","1":"ⴰⵙⴽⴽⴰ","-1":"ⵉⴹⵍⵍⵉ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ⵜⴰⵙⵔⴰⴳⵜ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"ⵜⵓⵙⴷⵉⴷⵜ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"ⵜⴰⵙⵉⵏⵜ","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"shi-Latn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"asggʷas","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ayyur","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"ass","relative":{"0":"assa","1":"askka","-1":"iḍlli"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"tasragt","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"tusdidt","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"tasint","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"shi-Latn-MA","parentLocale":"shi-Latn"},{"locale":"shi-Tfng","parentLocale":"shi"},{"locale":"shi-Tfng-MA","parentLocale":"shi-Tfng"},{"locale":"si","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "";if(ord)return "other";return n == 0 || n == 1 || i == 0 && f == 1?"one":"other"},"fields":{"year":{"displayName":"වර්ෂය","relative":{"0":"මෙම වසර","1":"ඊළඟ වසර","-1":"පසුගිය වසර"},"relativeTime":{"future":{"one":"වසර {0} කින්","other":"වසර {0} කින්"},"past":{"one":"වසර {0}ට පෙර","other":"වසර {0}ට පෙර"}}},"month":{"displayName":"මාසය","relative":{"0":"මෙම මාසය","1":"ඊළඟ මාසය","-1":"පසුගිය මාසය"},"relativeTime":{"future":{"one":"මාස {0}කින්","other":"මාස {0}කින්"},"past":{"one":"මාස {0}කට පෙර","other":"මාස {0}කට පෙර"}}},"day":{"displayName":"දිනය","relative":{"0":"අද","1":"හෙට","2":"අනිද්දා","-1":"ඊයේ","-2":"පෙරේදා"},"relativeTime":{"future":{"one":"දින {0}න්","other":"දින {0}න්"},"past":{"one":"දින {0} ට පෙර","other":"දින {0} ට පෙර"}}},"hour":{"displayName":"පැය","relativeTime":{"future":{"one":"පැය {0} කින්","other":"පැය {0} කින්"},"past":{"one":"පැය {0}ට පෙර","other":"පැය {0}ට පෙර"}}},"minute":{"displayName":"මිනිත්තුව","relativeTime":{"future":{"one":"මිනිත්තු {0} කින්","other":"මිනිත්තු {0} කින්"},"past":{"one":"මිනිත්තු {0}ට පෙර","other":"මිනිත්තු {0}ට පෙර"}}},"second":{"displayName":"තත්පරය","relative":{"0":"දැන්"},"relativeTime":{"future":{"one":"තත්පර {0} කින්","other":"තත්පර {0} කින්"},"past":{"one":"තත්පර {0}කට පෙර","other":"තත්පර {0}කට පෙර"}}}}},{"locale":"si-LK","parentLocale":"si"},{"locale":"sk","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":i >= 2 && i <= 4 && v0?"few":!v0?"many":"other"},"fields":{"year":{"displayName":"rok","relative":{"0":"tento rok","1":"budúci rok","-1":"minulý rok"},"relativeTime":{"future":{"one":"o {0} rok","few":"o {0} roky","many":"o {0} roka","other":"o {0} rokov"},"past":{"one":"pred {0} rokom","few":"pred {0} rokmi","many":"pred {0} rokom","other":"pred {0} rokmi"}}},"month":{"displayName":"mesiac","relative":{"0":"tento mesiac","1":"budúci mesiac","-1":"minulý mesiac"},"relativeTime":{"future":{"one":"o {0} mesiac","few":"o {0} mesiace","many":"o {0} mesiaca","other":"o {0} mesiacov"},"past":{"one":"pred {0} mesiacom","few":"pred {0} mesiacmi","many":"pred {0} mesiacom","other":"pred {0} mesiacmi"}}},"day":{"displayName":"deň","relative":{"0":"dnes","1":"zajtra","2":"pozajtra","-1":"včera","-2":"predvčerom"},"relativeTime":{"future":{"one":"o {0} deň","few":"o {0} dni","many":"o {0} dňa","other":"o {0} dní"},"past":{"one":"pred {0} dňom","few":"pred {0} dňami","many":"pred {0} dňom","other":"pred {0} dňami"}}},"hour":{"displayName":"hodina","relativeTime":{"future":{"one":"o {0} hodinu","few":"o {0} hodiny","many":"o {0} hodiny","other":"o {0} hodín"},"past":{"one":"pred {0} hodinou","few":"pred {0} hodinami","many":"pred {0} hodinou","other":"pred {0} hodinami"}}},"minute":{"displayName":"minúta","relativeTime":{"future":{"one":"o {0} minútu","few":"o {0} minúty","many":"o {0} minúty","other":"o {0} minút"},"past":{"one":"pred {0} minútou","few":"pred {0} minútami","many":"pred {0} minútou","other":"pred {0} minútami"}}},"second":{"displayName":"sekunda","relative":{"0":"teraz"},"relativeTime":{"future":{"one":"o {0} sekundu","few":"o {0} sekundy","many":"o {0} sekundy","other":"o {0} sekúnd"},"past":{"one":"pred {0} sekundou","few":"pred {0} sekundami","many":"Pred {0} sekundami","other":"pred {0} sekundami"}}}}},{"locale":"sk-SK","parentLocale":"sk"},{"locale":"sl","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i100=i.slice(-2);if(ord)return "other";return v0 && i100 == 1?"one":v0 && i100 == 2?"two":v0 && (i100 == 3 || i100 == 4) || !v0?"few":"other"},"fields":{"year":{"displayName":"Leto","relative":{"0":"letos","1":"naslednje leto","-1":"lani"},"relativeTime":{"future":{"one":"čez {0} leto","two":"čez {0} leti","few":"čez {0} leta","other":"čez {0} let"},"past":{"one":"pred {0} letom","two":"pred {0} letoma","few":"pred {0} leti","other":"pred {0} leti"}}},"month":{"displayName":"Mesec","relative":{"0":"ta mesec","1":"naslednji mesec","-1":"prejšnji mesec"},"relativeTime":{"future":{"one":"čez {0} mesec","two":"čez {0} meseca","few":"čez {0} mesece","other":"čez {0} mesecev"},"past":{"one":"pred {0} mesecem","two":"pred {0} mesecema","few":"pred {0} meseci","other":"pred {0} meseci"}}},"day":{"displayName":"Dan","relative":{"0":"danes","1":"jutri","2":"pojutrišnjem","-1":"včeraj","-2":"predvčerajšnjim"},"relativeTime":{"future":{"one":"čez {0} dan","two":"čez {0} dneva","few":"čez {0} dni","other":"čez {0} dni"},"past":{"one":"pred {0} dnevom","two":"pred {0} dnevoma","few":"pred {0} dnevi","other":"pred {0} dnevi"}}},"hour":{"displayName":"Ura","relativeTime":{"future":{"one":"čez {0} h","two":"čez {0} h","few":"čez {0} h","other":"čez {0} h"},"past":{"one":"pred {0} h","two":"pred {0} h","few":"pred {0} h","other":"pred {0} h"}}},"minute":{"displayName":"Minuta","relativeTime":{"future":{"one":"čez {0} min.","two":"čez {0} min.","few":"čez {0} min.","other":"čez {0} min."},"past":{"one":"pred {0} min.","two":"pred {0} min.","few":"pred {0} min.","other":"pred {0} min."}}},"second":{"displayName":"Sekunda","relative":{"0":"zdaj"},"relativeTime":{"future":{"one":"čez {0} sekundo","two":"čez {0} sekundi","few":"čez {0} sekunde","other":"čez {0} sekund"},"past":{"one":"pred {0} sekundo","two":"pred {0} sekundama","few":"pred {0} sekundami","other":"pred {0} sekundami"}}}}},{"locale":"sl-SI","parentLocale":"sl"},{"locale":"sma","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"smi","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"smj","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"smn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"smn-FI","parentLocale":"smn"},{"locale":"sms","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":n == 2?"two":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"sn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Gore","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwedzi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Zuva","relative":{"0":"Nhasi","1":"Mangwana","-1":"Nezuro"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Awa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Mineti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekondi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"sn-ZW","parentLocale":"sn"},{"locale":"so","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Sanad","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Bil","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Maalin","relative":{"0":"Maanta","1":"Berri","-1":"Shalay"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saacad","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Daqiiqad","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Il biriqsi","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"so-DJ","parentLocale":"so"},{"locale":"so-ET","parentLocale":"so"},{"locale":"so-KE","parentLocale":"so"},{"locale":"so-SO","parentLocale":"so"},{"locale":"sq","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2);if(ord)return n == 1?"one":n10 == 4 && n100 != 14?"many":"other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"vit","relative":{"0":"këtë vit","1":"vitin e ardhshëm","-1":"vitin e kaluar"},"relativeTime":{"future":{"one":"pas {0} viti","other":"pas {0} vjetësh"},"past":{"one":"para {0} viti","other":"para {0} vjetësh"}}},"month":{"displayName":"muaj","relative":{"0":"këtë muaj","1":"muajin e ardhshëm","-1":"muajin e kaluar"},"relativeTime":{"future":{"one":"pas {0} muaji","other":"pas {0} muajsh"},"past":{"one":"para {0} muaji","other":"para {0} muajsh"}}},"day":{"displayName":"ditë","relative":{"0":"sot","1":"nesër","-1":"dje"},"relativeTime":{"future":{"one":"pas {0} dite","other":"pas {0} ditësh"},"past":{"one":"para {0} dite","other":"para {0} ditësh"}}},"hour":{"displayName":"orë","relativeTime":{"future":{"one":"pas {0} ore","other":"pas {0} orësh"},"past":{"one":"para {0} ore","other":"para {0} orësh"}}},"minute":{"displayName":"minutë","relativeTime":{"future":{"one":"pas {0} minute","other":"pas {0} minutash"},"past":{"one":"para {0} minute","other":"para {0} minutash"}}},"second":{"displayName":"sekondë","relative":{"0":"tani"},"relativeTime":{"future":{"one":"pas {0} sekonde","other":"pas {0} sekondash"},"past":{"one":"para {0} sekonde","other":"para {0} sekondash"}}}}},{"locale":"sq-AL","parentLocale":"sq"},{"locale":"sq-MK","parentLocale":"sq"},{"locale":"sq-XK","parentLocale":"sq"},{"locale":"sr","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return "other";return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11?"one":v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14)?"few":"other"},"fields":{"year":{"displayName":"година","relative":{"0":"ове године","1":"следеће године","-1":"прошле године"},"relativeTime":{"future":{"one":"за {0} годину","few":"за {0} године","other":"за {0} година"},"past":{"one":"пре {0} године","few":"пре {0} године","other":"пре {0} година"}}},"month":{"displayName":"месец","relative":{"0":"овог месеца","1":"следећег месеца","-1":"прошлог месеца"},"relativeTime":{"future":{"one":"за {0} месец","few":"за {0} месеца","other":"за {0} месеци"},"past":{"one":"пре {0} месеца","few":"пре {0} месеца","other":"пре {0} месеци"}}},"day":{"displayName":"дан","relative":{"0":"данас","1":"сутра","2":"прекосутра","-1":"јуче","-2":"прекјуче"},"relativeTime":{"future":{"one":"за {0} дан","few":"за {0} дана","other":"за {0} дана"},"past":{"one":"пре {0} дана","few":"пре {0} дана","other":"пре {0} дана"}}},"hour":{"displayName":"сат","relativeTime":{"future":{"one":"за {0} сат","few":"за {0} сата","other":"за {0} сати"},"past":{"one":"пре {0} сата","few":"пре {0} сата","other":"пре {0} сати"}}},"minute":{"displayName":"минут","relativeTime":{"future":{"one":"за {0} минут","few":"за {0} минута","other":"за {0} минута"},"past":{"one":"пре {0} минута","few":"пре {0} минута","other":"пре {0} минута"}}},"second":{"displayName":"секунд","relative":{"0":"сада"},"relativeTime":{"future":{"one":"за {0} секунду","few":"за {0} секунде","other":"за {0} секунди"},"past":{"one":"пре {0} секунде","few":"пре {0} секунде","other":"пре {0} секунди"}}}}},{"locale":"sr-Cyrl","parentLocale":"sr"},{"locale":"sr-Cyrl-BA","parentLocale":"sr-Cyrl"},{"locale":"sr-Cyrl-ME","parentLocale":"sr-Cyrl"},{"locale":"sr-Cyrl-RS","parentLocale":"sr-Cyrl"},{"locale":"sr-Cyrl-XK","parentLocale":"sr-Cyrl"},{"locale":"sr-Latn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"godina","relative":{"0":"ove godine","1":"sledeće godine","-1":"prošle godine"},"relativeTime":{"future":{"one":"za {0} godinu","few":"za {0} godine","other":"za {0} godina"},"past":{"one":"pre {0} godine","few":"pre {0} godine","other":"pre {0} godina"}}},"month":{"displayName":"mesec","relative":{"0":"ovog meseca","1":"sledećeg meseca","-1":"prošlog meseca"},"relativeTime":{"future":{"one":"za {0} mesec","few":"za {0} meseca","other":"za {0} meseci"},"past":{"one":"pre {0} meseca","few":"pre {0} meseca","other":"pre {0} meseci"}}},"day":{"displayName":"dan","relative":{"0":"danas","1":"sutra","2":"prekosutra","-1":"juče","-2":"prekjuče"},"relativeTime":{"future":{"one":"za {0} dan","few":"za {0} dana","other":"za {0} dana"},"past":{"one":"pre {0} dana","few":"pre {0} dana","other":"pre {0} dana"}}},"hour":{"displayName":"sat","relativeTime":{"future":{"one":"za {0} sat","few":"za {0} sata","other":"za {0} sati"},"past":{"one":"pre {0} sata","few":"pre {0} sata","other":"pre {0} sati"}}},"minute":{"displayName":"minut","relativeTime":{"future":{"one":"za {0} minut","few":"za {0} minuta","other":"za {0} minuta"},"past":{"one":"pre {0} minuta","few":"pre {0} minuta","other":"pre {0} minuta"}}},"second":{"displayName":"sekund","relative":{"0":"sada"},"relativeTime":{"future":{"one":"za {0} sekundu","few":"za {0} sekunde","other":"za {0} sekundi"},"past":{"one":"pre {0} sekunde","few":"pre {0} sekunde","other":"pre {0} sekundi"}}}}},{"locale":"sr-Latn-BA","parentLocale":"sr-Latn"},{"locale":"sr-Latn-ME","parentLocale":"sr-Latn"},{"locale":"sr-Latn-RS","parentLocale":"sr-Latn"},{"locale":"sr-Latn-XK","parentLocale":"sr-Latn"},{"locale":"ss","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ss-SZ","parentLocale":"ss"},{"locale":"ss-ZA","parentLocale":"ss"},{"locale":"ssy","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ssy-ER","parentLocale":"ssy"},{"locale":"st","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"sv","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2);if(ord)return (n10 == 1 || n10 == 2) && n100 != 11 && n100 != 12?"one":"other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"År","relative":{"0":"i år","1":"nästa år","-1":"i fjol"},"relativeTime":{"future":{"one":"om {0} år","other":"om {0} år"},"past":{"one":"för {0} år sedan","other":"för {0} år sedan"}}},"month":{"displayName":"Månad","relative":{"0":"denna månad","1":"nästa månad","-1":"förra månaden"},"relativeTime":{"future":{"one":"om {0} månad","other":"om {0} månader"},"past":{"one":"för {0} månad sedan","other":"för {0} månader sedan"}}},"day":{"displayName":"Dag","relative":{"0":"i dag","1":"i morgon","2":"i övermorgon","-1":"i går","-2":"i förrgår"},"relativeTime":{"future":{"one":"om {0} dag","other":"om {0} dagar"},"past":{"one":"för {0} dag sedan","other":"för {0} dagar sedan"}}},"hour":{"displayName":"Timme","relativeTime":{"future":{"one":"om {0} timme","other":"om {0} timmar"},"past":{"one":"för {0} timme sedan","other":"för {0} timmar sedan"}}},"minute":{"displayName":"Minut","relativeTime":{"future":{"one":"om {0} minut","other":"om {0} minuter"},"past":{"one":"för {0} minut sedan","other":"för {0} minuter sedan"}}},"second":{"displayName":"Sekund","relative":{"0":"nu"},"relativeTime":{"future":{"one":"om {0} sekund","other":"om {0} sekunder"},"past":{"one":"för {0} sekund sedan","other":"för {0} sekunder sedan"}}}}},{"locale":"sv-AX","parentLocale":"sv"},{"locale":"sv-FI","parentLocale":"sv","fields":{"year":{"displayName":"år","relative":{"0":"i år","1":"nästa år","-1":"i fjol"},"relativeTime":{"future":{"one":"om {0} år","other":"om {0} år"},"past":{"one":"för {0} år sedan","other":"för {0} år sedan"}}},"month":{"displayName":"månad","relative":{"0":"denna månad","1":"nästa månad","-1":"förra månaden"},"relativeTime":{"future":{"one":"om {0} månad","other":"om {0} månader"},"past":{"one":"för {0} månad sedan","other":"för {0} månader sedan"}}},"day":{"displayName":"dag","relative":{"0":"i dag","1":"i morgon","2":"i övermorgon","-1":"i går","-2":"i förrgår"},"relativeTime":{"future":{"one":"om {0} dag","other":"om {0} dagar"},"past":{"one":"för {0} dag sedan","other":"för {0} dagar sedan"}}},"hour":{"displayName":"Timme","relativeTime":{"future":{"one":"om {0} timme","other":"om {0} timmar"},"past":{"one":"för {0} timme sedan","other":"för {0} timmar sedan"}}},"minute":{"displayName":"minut","relativeTime":{"future":{"one":"om {0} minut","other":"om {0} minuter"},"past":{"one":"för {0} minut sedan","other":"för {0} minuter sedan"}}},"second":{"displayName":"sekund","relative":{"0":"nu"},"relativeTime":{"future":{"one":"om {0} sekund","other":"om {0} sekunder"},"past":{"one":"för {0} sekund sedan","other":"för {0} sekunder sedan"}}}}},{"locale":"sv-SE","parentLocale":"sv"},{"locale":"sw","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"mwaka huu","1":"mwaka ujao","-1":"mwaka uliopita"},"relativeTime":{"future":{"one":"baada ya mwaka {0}","other":"baada ya miaka {0}"},"past":{"one":"mwaka {0} uliopita","other":"miaka {0} iliyopita"}}},"month":{"displayName":"Mwezi","relative":{"0":"mwezi huu","1":"mwezi ujao","-1":"mwezi uliopita"},"relativeTime":{"future":{"one":"baada ya mwezi {0}","other":"baada ya miezi {0}"},"past":{"one":"mwezi {0} uliopita","other":"miezi {0} iliyopita"}}},"day":{"displayName":"Siku","relative":{"0":"leo","1":"kesho","2":"kesho kutwa","-1":"jana","-2":"juzi"},"relativeTime":{"future":{"one":"baada ya siku {0}","other":"baada ya siku {0}"},"past":{"one":"siku {0} iliyopita","other":"siku {0} zilizopita"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"one":"baada ya saa {0}","other":"baada ya saa {0}"},"past":{"one":"saa {0} iliyopita","other":"saa {0} zilizopita"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"one":"baada ya dakika {0}","other":"baada ya dakika {0}"},"past":{"one":"dakika {0} iliyopita","other":"dakika {0} zilizopita"}}},"second":{"displayName":"Sekunde","relative":{"0":"sasa"},"relativeTime":{"future":{"one":"baada ya sekunde {0}","other":"baada ya sekunde {0}"},"past":{"one":"Sekunde {0} iliyopita","other":"Sekunde {0} zilizopita"}}}}},{"locale":"sw-KE","parentLocale":"sw"},{"locale":"sw-TZ","parentLocale":"sw"},{"locale":"sw-UG","parentLocale":"sw"},{"locale":"swc","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Mwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mwezi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Siku","relative":{"0":"Leo","1":"Kesho","-1":"Jana"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"swc-CD","parentLocale":"swc"},{"locale":"syr","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ta","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"ஆண்டு","relative":{"0":"இந்த ஆண்டு","1":"அடுத்த ஆண்டு","-1":"கடந்த ஆண்டு"},"relativeTime":{"future":{"one":"{0} ஆண்டில்","other":"{0} ஆண்டுகளில்"},"past":{"one":"{0} ஆண்டிற்கு முன்","other":"{0} ஆண்டுகளுக்கு முன்"}}},"month":{"displayName":"மாதம்","relative":{"0":"இந்த மாதம்","1":"அடுத்த மாதம்","-1":"கடந்த மாதம்"},"relativeTime":{"future":{"one":"{0} மாதத்தில்","other":"{0} மாதங்களில்"},"past":{"one":"{0} மாதத்துக்கு முன்","other":"{0} மாதங்களுக்கு முன்"}}},"day":{"displayName":"நாள்","relative":{"0":"இன்று","1":"நாளை","2":"நாளை மறுநாள்","-1":"நேற்று","-2":"நேற்று முன் தினம்"},"relativeTime":{"future":{"one":"{0} நாளில்","other":"{0} நாட்களில்"},"past":{"one":"{0} நாளைக்கு முன்","other":"{0} நாட்களுக்கு முன்"}}},"hour":{"displayName":"மணி","relativeTime":{"future":{"one":"{0} மணிநேரத்தில்","other":"{0} மணிநேரத்தில்"},"past":{"one":"{0} மணிநேரம் முன்","other":"{0} மணிநேரம் முன்"}}},"minute":{"displayName":"நிமிடம்","relativeTime":{"future":{"one":"{0} நிமிடத்தில்","other":"{0} நிமிடங்களில்"},"past":{"one":"{0} நிமிடத்திற்கு முன்","other":"{0} நிமிடங்களுக்கு முன்"}}},"second":{"displayName":"விநாடி","relative":{"0":"இப்போது"},"relativeTime":{"future":{"one":"{0} விநாடியில்","other":"{0} விநாடிகளில்"},"past":{"one":"{0} விநாடிக்கு முன்","other":"{0} விநாடிகளுக்கு முன்"}}}}},{"locale":"ta-IN","parentLocale":"ta"},{"locale":"ta-LK","parentLocale":"ta"},{"locale":"ta-MY","parentLocale":"ta"},{"locale":"ta-SG","parentLocale":"ta"},{"locale":"te","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"సంవత్సరం","relative":{"0":"ఈ సంవత్సరం","1":"తదుపరి సంవత్సరం","-1":"గత సంవత్సరం"},"relativeTime":{"future":{"one":"{0} సంవత్సరంలో","other":"{0} సంవత్సరాల్లో"},"past":{"one":"{0} సంవత్సరం క్రితం","other":"{0} సంవత్సరాల క్రితం"}}},"month":{"displayName":"నెల","relative":{"0":"ఈ నెల","1":"తదుపరి నెల","-1":"గత నెల"},"relativeTime":{"future":{"one":"{0} నెలలో","other":"{0} నెలల్లో"},"past":{"one":"{0} నెల క్రితం","other":"{0} నెలల క్రితం"}}},"day":{"displayName":"దినం","relative":{"0":"ఈ రోజు","1":"రేపు","2":"ఎల్లుండి","-1":"నిన్న","-2":"మొన్న"},"relativeTime":{"future":{"one":"{0} రోజులో","other":"{0} రోజుల్లో"},"past":{"one":"{0} రోజు క్రితం","other":"{0} రోజుల క్రితం"}}},"hour":{"displayName":"గంట","relativeTime":{"future":{"one":"{0} గంటలో","other":"{0} గంటల్లో"},"past":{"one":"{0} గంట క్రితం","other":"{0} గంటల క్రితం"}}},"minute":{"displayName":"నిమిషము","relativeTime":{"future":{"one":"{0} నిమిషంలో","other":"{0} నిమిషాల్లో"},"past":{"one":"{0} నిమిషం క్రితం","other":"{0} నిమిషాల క్రితం"}}},"second":{"displayName":"క్షణం","relative":{"0":"ప్రస్తుతం"},"relativeTime":{"future":{"one":"{0} సెకన్‌లో","other":"{0} సెకన్లలో"},"past":{"one":"{0} సెకను క్రితం","other":"{0} సెకన్ల క్రితం"}}}}},{"locale":"te-IN","parentLocale":"te"},{"locale":"teo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Ekan","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Elap","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Aparan","relative":{"0":"Lolo","1":"Moi","-1":"Jaan"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Esaa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Idakika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Isekonde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"teo-KE","parentLocale":"teo"},{"locale":"teo-UG","parentLocale":"teo"},{"locale":"th","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ปี","relative":{"0":"ปีนี้","1":"ปีหน้า","-1":"ปีที่แล้ว"},"relativeTime":{"future":{"other":"ในอีก {0} ปี"},"past":{"other":"{0} ปีที่แล้ว"}}},"month":{"displayName":"เดือน","relative":{"0":"เดือนนี้","1":"เดือนหน้า","-1":"เดือนที่แล้ว"},"relativeTime":{"future":{"other":"ในอีก {0} เดือน"},"past":{"other":"{0} เดือนที่ผ่านมา"}}},"day":{"displayName":"วัน","relative":{"0":"วันนี้","1":"พรุ่งนี้","2":"มะรืนนี้","-1":"เมื่อวาน","-2":"เมื่อวานซืน"},"relativeTime":{"future":{"other":"ในอีก {0} วัน"},"past":{"other":"{0} วันที่ผ่านมา"}}},"hour":{"displayName":"ชั่วโมง","relativeTime":{"future":{"other":"ในอีก {0} ชั่วโมง"},"past":{"other":"{0} ชั่วโมงที่ผ่านมา"}}},"minute":{"displayName":"นาที","relativeTime":{"future":{"other":"ในอีก {0} นาที"},"past":{"other":"{0} นาทีที่ผ่านมา"}}},"second":{"displayName":"วินาที","relative":{"0":"ขณะนี้"},"relativeTime":{"future":{"other":"ในอีก {0} วินาที"},"past":{"other":"{0} วินาทีที่ผ่านมา"}}}}},{"locale":"th-TH","parentLocale":"th"},{"locale":"ti","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ti-ER","parentLocale":"ti"},{"locale":"ti-ET","parentLocale":"ti"},{"locale":"tig","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"tk","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"tl","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],f=s[1] || "",v0=!s[1],i10=i.slice(-1),f10=f.slice(-1);if(ord)return n == 1?"one":"other";return v0 && (i == 1 || i == 2 || i == 3) || v0 && i10 != 4 && i10 != 6 && i10 != 9 || !v0 && f10 != 4 && f10 != 6 && f10 != 9?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"tn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"tn-BW","parentLocale":"tn"},{"locale":"tn-ZA","parentLocale":"tn"},{"locale":"to","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"taʻu","relative":{"0":"taʻú ni","1":"taʻu kahaʻu","-1":"taʻu kuoʻosi"},"relativeTime":{"future":{"other":"ʻi he taʻu ʻe {0}"},"past":{"other":"taʻu ʻe {0} kuoʻosi"}}},"month":{"displayName":"māhina","relative":{"0":"māhiná ni","1":"māhina kahaʻu","-1":"māhina kuoʻosi"},"relativeTime":{"future":{"other":"ʻi he māhina ʻe {0}"},"past":{"other":"māhina ʻe {0} kuoʻosi"}}},"day":{"displayName":"ʻaho","relative":{"0":"ʻahó ni","1":"ʻapongipongi","2":"ʻahepongipongi","-1":"ʻaneafi","-2":"ʻaneheafi"},"relativeTime":{"future":{"other":"ʻi he ʻaho ʻe {0}"},"past":{"other":"ʻaho ʻe {0} kuoʻosi"}}},"hour":{"displayName":"houa","relativeTime":{"future":{"other":"ʻi he houa ʻe {0}"},"past":{"other":"houa ʻe {0} kuoʻosi"}}},"minute":{"displayName":"miniti","relativeTime":{"future":{"other":"ʻi he miniti ʻe {0}"},"past":{"other":"miniti ʻe {0} kuoʻosi"}}},"second":{"displayName":"sekoni","relative":{"0":"taimiʻni"},"relativeTime":{"future":{"other":"ʻi he sekoni ʻe {0}"},"past":{"other":"sekoni ʻe {0} kuoʻosi"}}}}},{"locale":"to-TO","parentLocale":"to"},{"locale":"tr","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Yıl","relative":{"0":"bu yıl","1":"gelecek yıl","-1":"geçen yıl"},"relativeTime":{"future":{"one":"{0} yıl sonra","other":"{0} yıl sonra"},"past":{"one":"{0} yıl önce","other":"{0} yıl önce"}}},"month":{"displayName":"Ay","relative":{"0":"bu ay","1":"gelecek ay","-1":"geçen ay"},"relativeTime":{"future":{"one":"{0} ay sonra","other":"{0} ay sonra"},"past":{"one":"{0} ay önce","other":"{0} ay önce"}}},"day":{"displayName":"Gün","relative":{"0":"bugün","1":"yarın","2":"öbür gün","-1":"dün","-2":"evvelsi gün"},"relativeTime":{"future":{"one":"{0} gün sonra","other":"{0} gün sonra"},"past":{"one":"{0} gün önce","other":"{0} gün önce"}}},"hour":{"displayName":"Saat","relativeTime":{"future":{"one":"{0} saat sonra","other":"{0} saat sonra"},"past":{"one":"{0} saat önce","other":"{0} saat önce"}}},"minute":{"displayName":"Dakika","relativeTime":{"future":{"one":"{0} dakika sonra","other":"{0} dakika sonra"},"past":{"one":"{0} dakika önce","other":"{0} dakika önce"}}},"second":{"displayName":"Saniye","relative":{"0":"şimdi"},"relativeTime":{"future":{"one":"{0} saniye sonra","other":"{0} saniye sonra"},"past":{"one":"{0} saniye önce","other":"{0} saniye önce"}}}}},{"locale":"tr-CY","parentLocale":"tr"},{"locale":"tr-TR","parentLocale":"tr"},{"locale":"ts","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ts-ZA","parentLocale":"ts"},{"locale":"twq","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Jiiri","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Handu","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Zaari","relative":{"0":"Hõo","1":"Suba","-1":"Bi"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Guuru","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Miniti","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Miti","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"twq-NE","parentLocale":"twq"},{"locale":"tzm","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),t0=Number(s[0]) == n;if(ord)return "other";return n == 0 || n == 1 || t0 && n >= 11 && n <= 99?"one":"other"},"fields":{"year":{"displayName":"Asseggas","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Ayur","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ass","relative":{"0":"Assa","1":"Asekka","-1":"Assenaṭ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Tasragt","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Tusdat","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Tusnat","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"tzm-Latn","parentLocale":"tzm"},{"locale":"tzm-Latn-MA","parentLocale":"tzm-Latn"},{"locale":"ug","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"يىل","relative":{"0":"بۇ يىل","1":"كېلەر يىل","-1":"ئۆتكەن يىل"},"relativeTime":{"future":{"one":"{0} يىلدىن كېيىن","other":"{0} يىلدىن كېيىن"},"past":{"one":"{0} يىل ئىلگىرى","other":"{0} يىل ئىلگىرى"}}},"month":{"displayName":"ئاي","relative":{"0":"بۇ ئاي","1":"كېلەر ئاي","-1":"ئۆتكەن ئاي"},"relativeTime":{"future":{"one":"{0} ئايدىن كېيىن","other":"{0} ئايدىن كېيىن"},"past":{"one":"{0} ئاي ئىلگىرى","other":"{0} ئاي ئىلگىرى"}}},"day":{"displayName":"كۈن","relative":{"0":"بۈگۈن","1":"ئەتە","-1":"تۈنۈگۈن"},"relativeTime":{"future":{"one":"{0} كۈندىن كېيىن","other":"{0} كۈندىن كېيىن"},"past":{"one":"{0} كۈن ئىلگىرى","other":"{0} كۈن ئىلگىرى"}}},"hour":{"displayName":"سائەت","relativeTime":{"future":{"one":"{0} سائەتتىن كېيىن","other":"{0} سائەتتىن كېيىن"},"past":{"one":"{0} سائەت ئىلگىرى","other":"{0} سائەت ئىلگىرى"}}},"minute":{"displayName":"مىنۇت","relativeTime":{"future":{"one":"{0} مىنۇتتىن كېيىن","other":"{0} مىنۇتتىن كېيىن"},"past":{"one":"{0} مىنۇت ئىلگىرى","other":"{0} مىنۇت ئىلگىرى"}}},"second":{"displayName":"سېكۇنت","relative":{"0":"now"},"relativeTime":{"future":{"one":"{0} سېكۇنتتىن كېيىن","other":"{0} سېكۇنتتىن كېيىن"},"past":{"one":"{0} سېكۇنت ئىلگىرى","other":"{0} سېكۇنت ئىلگىرى"}}}}},{"locale":"ug-Arab","parentLocale":"ug"},{"locale":"ug-Arab-CN","parentLocale":"ug-Arab"},{"locale":"uk","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],t0=Number(s[0]) == n,n10=t0 && s[0].slice(-1),n100=t0 && s[0].slice(-2),i10=i.slice(-1),i100=i.slice(-2);if(ord)return n10 == 3 && n100 != 13?"few":"other";return v0 && i10 == 1 && i100 != 11?"one":v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14)?"few":v0 && i10 == 0 || v0 && i10 >= 5 && i10 <= 9 || v0 && i100 >= 11 && i100 <= 14?"many":"other"},"fields":{"year":{"displayName":"Рік","relative":{"0":"цього року","1":"наступного року","-1":"торік"},"relativeTime":{"future":{"one":"через {0} рік","few":"через {0} роки","many":"через {0} років","other":"через {0} року"},"past":{"one":"{0} рік тому","few":"{0} роки тому","many":"{0} років тому","other":"{0} року тому"}}},"month":{"displayName":"Місяць","relative":{"0":"цього місяця","1":"наступного місяця","-1":"минулого місяця"},"relativeTime":{"future":{"one":"через {0} місяць","few":"через {0} місяці","many":"через {0} місяців","other":"через {0} місяця"},"past":{"one":"{0} місяць тому","few":"{0} місяці тому","many":"{0} місяців тому","other":"{0} місяця тому"}}},"day":{"displayName":"День","relative":{"0":"сьогодні","1":"завтра","2":"післязавтра","-1":"учора","-2":"позавчора"},"relativeTime":{"future":{"one":"через {0} день","few":"через {0} дні","many":"через {0} днів","other":"через {0} дня"},"past":{"one":"{0} день тому","few":"{0} дні тому","many":"{0} днів тому","other":"{0} дня тому"}}},"hour":{"displayName":"Година","relativeTime":{"future":{"one":"через {0} годину","few":"через {0} години","many":"через {0} годин","other":"через {0} години"},"past":{"one":"{0} годину тому","few":"{0} години тому","many":"{0} годин тому","other":"{0} години тому"}}},"minute":{"displayName":"Хвилина","relativeTime":{"future":{"one":"через {0} хвилину","few":"через {0} хвилини","many":"через {0} хвилин","other":"через {0} хвилини"},"past":{"one":"{0} хвилину тому","few":"{0} хвилини тому","many":"{0} хвилин тому","other":"{0} хвилини тому"}}},"second":{"displayName":"Секунда","relative":{"0":"зараз"},"relativeTime":{"future":{"one":"через {0} секунду","few":"через {0} секунди","many":"через {0} секунд","other":"через {0} секунди"},"past":{"one":"{0} секунду тому","few":"{0} секунди тому","many":"{0} секунд тому","other":"{0} секунди тому"}}}}},{"locale":"uk-UA","parentLocale":"uk"},{"locale":"ur","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"سال","relative":{"0":"اس سال","1":"اگلے سال","-1":"گزشتہ سال"},"relativeTime":{"future":{"one":"{0} سال میں","other":"{0} سال میں"},"past":{"one":"{0} سال پہلے","other":"{0} سال پہلے"}}},"month":{"displayName":"مہینہ","relative":{"0":"اس مہینہ","1":"اگلے مہینہ","-1":"پچھلے مہینہ"},"relativeTime":{"future":{"one":"{0} مہینہ میں","other":"{0} مہینے میں"},"past":{"one":"{0} مہینہ پہلے","other":"{0} مہینے پہلے"}}},"day":{"displayName":"دن","relative":{"0":"آج","1":"آئندہ کل","2":"آنے والا پرسوں","-1":"گزشتہ کل","-2":"گزشتہ پرسوں"},"relativeTime":{"future":{"one":"{0} دن میں","other":"{0} دنوں میں"},"past":{"one":"{0} دن پہلے","other":"{0} دنوں پہلے"}}},"hour":{"displayName":"گھنٹہ","relativeTime":{"future":{"one":"{0} گھنٹہ میں","other":"{0} گھنٹے میں"},"past":{"one":"{0} گھنٹہ پہلے","other":"{0} گھنٹے پہلے"}}},"minute":{"displayName":"منٹ","relativeTime":{"future":{"one":"{0} منٹ میں","other":"{0} منٹ میں"},"past":{"one":"{0} منٹ پہلے","other":"{0} منٹ پہلے"}}},"second":{"displayName":"سیکنڈ","relative":{"0":"اب"},"relativeTime":{"future":{"one":"{0} سیکنڈ میں","other":"{0} سیکنڈ میں"},"past":{"one":"{0} سیکنڈ پہلے","other":"{0} سیکنڈ پہلے"}}}}},{"locale":"ur-IN","parentLocale":"ur","fields":{"year":{"displayName":"سال","relative":{"0":"اس سال","1":"اگلے سال","-1":"گزشتہ سال"},"relativeTime":{"future":{"one":"{0} سال میں","other":"{0} سالوں میں"},"past":{"one":"{0} سال پہلے","other":"{0} سالوں پہلے"}}},"month":{"displayName":"مہینہ","relative":{"0":"اس ماہ","1":"اگلے ماہ","-1":"گزشتہ ماہ"},"relativeTime":{"future":{"one":"{0} ماہ میں","other":"{0} ماہ میں"},"past":{"one":"{0} ماہ قبل","other":"{0} ماہ قبل"}}},"day":{"displayName":"دن","relative":{"0":"آج","1":"کل","2":"آنے والا پرسوں","-1":"کل","-2":"گزشتہ پرسوں"},"relativeTime":{"future":{"one":"{0} دن میں","other":"{0} دنوں میں"},"past":{"one":"{0} دن پہلے","other":"{0} دنوں پہلے"}}},"hour":{"displayName":"گھنٹہ","relativeTime":{"future":{"one":"{0} گھنٹہ میں","other":"{0} گھنٹے میں"},"past":{"one":"{0} گھنٹہ پہلے","other":"{0} گھنٹے پہلے"}}},"minute":{"displayName":"منٹ","relativeTime":{"future":{"one":"{0} منٹ میں","other":"{0} منٹ میں"},"past":{"one":"{0} منٹ قبل","other":"{0} منٹ قبل"}}},"second":{"displayName":"سیکنڈ","relative":{"0":"اب"},"relativeTime":{"future":{"one":"{0} سیکنڈ میں","other":"{0} سیکنڈ میں"},"past":{"one":"{0} سیکنڈ قبل","other":"{0} سیکنڈ قبل"}}}}},{"locale":"ur-PK","parentLocale":"ur"},{"locale":"uz","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Yil","relative":{"0":"bu yil","1":"keyingi yil","-1":"oʻtgan yil"},"relativeTime":{"future":{"one":"{0} yildan soʻng","other":"{0} yildan soʻng"},"past":{"one":"{0} yil avval","other":"{0} yil avval"}}},"month":{"displayName":"Oy","relative":{"0":"bu oy","1":"keyingi oy","-1":"oʻtgan oy"},"relativeTime":{"future":{"one":"{0} oydan soʻng","other":"{0} oydan soʻng"},"past":{"one":"{0} oy avval","other":"{0} oy avval"}}},"day":{"displayName":"Kun","relative":{"0":"bugun","1":"ertaga","-1":"kecha"},"relativeTime":{"future":{"one":"{0} kundan soʻng","other":"{0} kundan soʻng"},"past":{"one":"{0} kun oldin","other":"{0} kun oldin"}}},"hour":{"displayName":"Soat","relativeTime":{"future":{"one":"{0} soatdan soʻng","other":"{0} soatdan soʻng"},"past":{"one":"{0} soat oldin","other":"{0} soat oldin"}}},"minute":{"displayName":"Daqiqa","relativeTime":{"future":{"one":"{0} daqiqadan soʻng","other":"{0} daqiqadan soʻng"},"past":{"one":"{0} daqiqa oldin","other":"{0} daqiqa oldin"}}},"second":{"displayName":"Soniya","relative":{"0":"hozir"},"relativeTime":{"future":{"one":"{0} soniyadan soʻng","other":"{0} soniyadan soʻng"},"past":{"one":"{0} soniya oldin","other":"{0} soniya oldin"}}}}},{"locale":"uz-Arab","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"uz-Arab-AF","parentLocale":"uz-Arab"},{"locale":"uz-Cyrl","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Йил","relative":{"0":"бу йил","1":"кейинги йил","-1":"ўтган йил"},"relativeTime":{"future":{"one":"{0} йилдан сўнг","other":"{0} йилдан сўнг"},"past":{"one":"{0} йил аввал","other":"{0} йил аввал"}}},"month":{"displayName":"Ой","relative":{"0":"бу ой","1":"кейинги ой","-1":"ўтган ой"},"relativeTime":{"future":{"one":"{0} ойдан сўнг","other":"{0} ойдан сўнг"},"past":{"one":"{0} ой аввал","other":"{0} ой аввал"}}},"day":{"displayName":"Кун","relative":{"0":"бугун","1":"эртага","-1":"кеча"},"relativeTime":{"future":{"one":"{0} кундан сўнг","other":"{0} кундан сўнг"},"past":{"one":"{0} кун олдин","other":"{0} кун олдин"}}},"hour":{"displayName":"Соат","relativeTime":{"future":{"one":"{0} соатдан сўнг","other":"{0} соатдан сўнг"},"past":{"one":"{0} соат олдин","other":"{0} соат олдин"}}},"minute":{"displayName":"Дақиқа","relativeTime":{"future":{"one":"{0} дақиқадан сўнг","other":"{0} дақиқадан сўнг"},"past":{"one":"{0} дақиқа олдин","other":"{0} дақиқа олдин"}}},"second":{"displayName":"Сония","relative":{"0":"ҳозир"},"relativeTime":{"future":{"one":"{0} сониядан сўнг","other":"{0} сониядан сўнг"},"past":{"one":"{0} сония олдин","other":"{0} сония олдин"}}}}},{"locale":"uz-Cyrl-UZ","parentLocale":"uz-Cyrl"},{"locale":"uz-Latn","parentLocale":"uz"},{"locale":"uz-Latn-UZ","parentLocale":"uz-Latn"},{"locale":"vai","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ꕢꘋ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ꕪꖃ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"ꔎꔒ","relative":{"0":"ꗦꗷ","1":"ꔻꕯ","-1":"ꖴꖸ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ꕌꕎ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"ꕆꕇ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"ꕧꕃꕧꕪ","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"vai-Latn","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"saŋ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"kalo","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"tele","relative":{"0":"wɛlɛ","1":"sina","-1":"kunu"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"hawa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"mini","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"jaki-jaka","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"vai-Latn-LR","parentLocale":"vai-Latn"},{"locale":"vai-Vaii","parentLocale":"vai"},{"locale":"vai-Vaii-LR","parentLocale":"vai-Vaii"},{"locale":"ve","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"ve-ZA","parentLocale":"ve"},{"locale":"vi","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return n == 1?"one":"other";return "other"},"fields":{"year":{"displayName":"Năm","relative":{"0":"năm nay","1":"năm sau","-1":"năm ngoái"},"relativeTime":{"future":{"other":"trong {0} năm nữa"},"past":{"other":"{0} năm trước"}}},"month":{"displayName":"Tháng","relative":{"0":"tháng này","1":"tháng sau","-1":"tháng trước"},"relativeTime":{"future":{"other":"trong {0} tháng nữa"},"past":{"other":"{0} tháng trước"}}},"day":{"displayName":"Ngày","relative":{"0":"hôm nay","1":"ngày mai","2":"ngày kia","-1":"hôm qua","-2":"hôm kia"},"relativeTime":{"future":{"other":"trong {0} ngày nữa"},"past":{"other":"{0} ngày trước"}}},"hour":{"displayName":"Giờ","relativeTime":{"future":{"other":"trong {0} giờ nữa"},"past":{"other":"{0} giờ trước"}}},"minute":{"displayName":"Phút","relativeTime":{"future":{"other":"trong {0} phút nữa"},"past":{"other":"{0} phút trước"}}},"second":{"displayName":"Giây","relative":{"0":"bây giờ"},"relativeTime":{"future":{"other":"trong {0} giây nữa"},"past":{"other":"{0} giây trước"}}}}},{"locale":"vi-VN","parentLocale":"vi"},{"locale":"vo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"yel","relative":{"0":"ayelo","1":"oyelo","-1":"äyelo"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"mul","relative":{"0":"amulo","1":"omulo","-1":"ämulo"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Tag","relative":{"0":"adelo","1":"odelo","2":"udelo","-1":"ädelo","-2":"edelo"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"düp","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"minut","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"sekun","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"vo-001","parentLocale":"vo"},{"locale":"vun","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Maka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Mori","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Mfiri","relative":{"0":"Inu","1":"Ngama","-1":"Ukou"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Saa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Dakyika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Sekunde","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"vun-TZ","parentLocale":"vun"},{"locale":"wa","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 0 || n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"wae","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Jár","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"I {0} jár","other":"I {0} jár"},"past":{"one":"vor {0} jár","other":"cor {0} jár"}}},"month":{"displayName":"Mánet","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"I {0} mánet","other":"I {0} mánet"},"past":{"one":"vor {0} mánet","other":"vor {0} mánet"}}},"day":{"displayName":"Tag","relative":{"0":"Hitte","1":"Móre","2":"Ubermóre","-1":"Gešter","-2":"Vorgešter"},"relativeTime":{"future":{"one":"i {0} tag","other":"i {0} täg"},"past":{"one":"vor {0} tag","other":"vor {0} täg"}}},"hour":{"displayName":"Schtund","relativeTime":{"future":{"one":"i {0} stund","other":"i {0} stunde"},"past":{"one":"vor {0} stund","other":"vor {0} stunde"}}},"minute":{"displayName":"Mínütta","relativeTime":{"future":{"one":"i {0} minüta","other":"i {0} minüte"},"past":{"one":"vor {0} minüta","other":"vor {0} minüte"}}},"second":{"displayName":"Sekunda","relative":{"0":"now"},"relativeTime":{"future":{"one":"i {0} sekund","other":"i {0} sekunde"},"past":{"one":"vor {0} sekund","other":"vor {0} sekunde"}}}}},{"locale":"wae-CH","parentLocale":"wae"},{"locale":"wo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"xh","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Hour","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Minute","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Second","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"xog","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n == 1?"one":"other"},"fields":{"year":{"displayName":"Omwaka","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Omwezi","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Olunaku","relative":{"0":"Olwaleelo (leelo)","1":"Enkyo","-1":"Edho"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"Essawa","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Edakiika","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Obutikitiki","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"xog-UG","parentLocale":"xog"},{"locale":"yav","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"yɔɔŋ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"oóli","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"puɔ́sɛ́","relative":{"0":"ínaan","1":"nakinyám","-1":"púyoó"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"kisikɛl,","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"minít","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"síkɛn","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"yav-CM","parentLocale":"yav"},{"locale":"yi","pluralRuleFunction":function pluralRuleFunction(n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return "other";return n == 1 && v0?"one":"other"},"fields":{"year":{"displayName":"יאָהר","relative":{"0":"הײַ יאָר","1":"איבער א יאָר","-1":"פֿאַראַיאָר"},"relativeTime":{"future":{"one":"איבער {0} יאָר","other":"איבער {0} יאָר"},"past":{"one":"פֿאַר {0} יאָר","other":"פֿאַר {0} יאָר"}}},"month":{"displayName":"מאנאַט","relative":{"0":"דעם חודש","1":"קומענדיקן חודש","-1":"פֿאַרגאנגענעם חודש"},"relativeTime":{"future":{"one":"איבער {0} חודש","other":"איבער {0} חדשים"},"past":{"one":"פֿאַר {0} חודש","other":"פֿאַר {0} חדשים"}}},"day":{"displayName":"טאג","relative":{"0":"היינט","1":"מארגן","-1":"נעכטן"},"relativeTime":{"future":{"one":"אין {0} טאָג אַרום","other":"אין {0} טעג אַרום"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"שעה","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"מינוט","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"סעקונדע","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"yi-001","parentLocale":"yi"},{"locale":"yo","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"Ọdún","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Osù","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ọjọ́","relative":{"0":"Òní","1":"Ọ̀la","2":"òtúùnla","-1":"Àná","-2":"íjẹta"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"wákàtí","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Ìsẹ́jú","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Ìsẹ́jú Ààyá","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"yo-BJ","parentLocale":"yo","fields":{"year":{"displayName":"Ɔdún","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"Osù","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"Ɔjɔ́","relative":{"0":"Òní","1":"Ɔ̀la","2":"òtúùnla","-1":"Àná","-2":"íjɛta"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"wákàtí","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"Ìsɛ́jú","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"Ìsɛ́jú Ààyá","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"yo-NG","parentLocale":"yo"},{"locale":"zgh","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"ⴰⵙⴳⴳⵯⴰⵙ","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"other":"+{0} y"},"past":{"other":"-{0} y"}}},"month":{"displayName":"ⴰⵢⵢⵓⵔ","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"other":"+{0} m"},"past":{"other":"-{0} m"}}},"day":{"displayName":"ⴰⵙⵙ","relative":{"0":"ⴰⵙⵙⴰ","1":"ⴰⵙⴽⴽⴰ","-1":"ⵉⴹⵍⵍⵉ"},"relativeTime":{"future":{"other":"+{0} d"},"past":{"other":"-{0} d"}}},"hour":{"displayName":"ⵜⴰⵙⵔⴰⴳⵜ","relativeTime":{"future":{"other":"+{0} h"},"past":{"other":"-{0} h"}}},"minute":{"displayName":"ⵜⵓⵙⴷⵉⴷⵜ","relativeTime":{"future":{"other":"+{0} min"},"past":{"other":"-{0} min"}}},"second":{"displayName":"ⵜⴰⵙⵉⵏⵜ","relative":{"0":"now"},"relativeTime":{"future":{"other":"+{0} s"},"past":{"other":"-{0} s"}}}}},{"locale":"zgh-MA","parentLocale":"zgh"},{"locale":"zh","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"年","relative":{"0":"今年","1":"明年","-1":"去年"},"relativeTime":{"future":{"other":"{0}年后"},"past":{"other":"{0}年前"}}},"month":{"displayName":"月","relative":{"0":"本月","1":"下个月","-1":"上个月"},"relativeTime":{"future":{"other":"{0}个月后"},"past":{"other":"{0}个月前"}}},"day":{"displayName":"日","relative":{"0":"今天","1":"明天","2":"后天","-1":"昨天","-2":"前天"},"relativeTime":{"future":{"other":"{0}天后"},"past":{"other":"{0}天前"}}},"hour":{"displayName":"小时","relativeTime":{"future":{"other":"{0}小时后"},"past":{"other":"{0}小时前"}}},"minute":{"displayName":"分钟","relativeTime":{"future":{"other":"{0}分钟后"},"past":{"other":"{0}分钟前"}}},"second":{"displayName":"秒钟","relative":{"0":"现在"},"relativeTime":{"future":{"other":"{0}秒钟后"},"past":{"other":"{0}秒钟前"}}}}},{"locale":"zh-Hans","parentLocale":"zh"},{"locale":"zh-Hans-CN","parentLocale":"zh-Hans"},{"locale":"zh-Hans-HK","parentLocale":"zh-Hans","fields":{"year":{"displayName":"年","relative":{"0":"今年","1":"明年","-1":"去年"},"relativeTime":{"future":{"other":"{0}年后"},"past":{"other":"{0}年前"}}},"month":{"displayName":"月","relative":{"0":"本月","1":"下个月","-1":"上个月"},"relativeTime":{"future":{"other":"{0}个月后"},"past":{"other":"{0}个月前"}}},"day":{"displayName":"日","relative":{"0":"今天","1":"明天","2":"后天","-1":"昨天","-2":"前天"},"relativeTime":{"future":{"other":"{0}天后"},"past":{"other":"{0}天前"}}},"hour":{"displayName":"小时","relativeTime":{"future":{"other":"{0}小时后"},"past":{"other":"{0}小时前"}}},"minute":{"displayName":"分钟","relativeTime":{"future":{"other":"{0}分钟后"},"past":{"other":"{0}分钟前"}}},"second":{"displayName":"秒钟","relative":{"0":"现在"},"relativeTime":{"future":{"other":"{0}秒后"},"past":{"other":"{0}秒前"}}}}},{"locale":"zh-Hans-MO","parentLocale":"zh-Hans","fields":{"year":{"displayName":"年","relative":{"0":"今年","1":"明年","-1":"去年"},"relativeTime":{"future":{"other":"{0}年后"},"past":{"other":"{0}年前"}}},"month":{"displayName":"月","relative":{"0":"本月","1":"下个月","-1":"上个月"},"relativeTime":{"future":{"other":"{0}个月后"},"past":{"other":"{0}个月前"}}},"day":{"displayName":"天","relative":{"0":"今天","1":"明天","2":"后天","-1":"昨天","-2":"前天"},"relativeTime":{"future":{"other":"{0}天后"},"past":{"other":"{0}天前"}}},"hour":{"displayName":"小时","relativeTime":{"future":{"other":"{0}小时后"},"past":{"other":"{0}小时前"}}},"minute":{"displayName":"分钟","relativeTime":{"future":{"other":"{0}分钟后"},"past":{"other":"{0}分钟前"}}},"second":{"displayName":"秒钟","relative":{"0":"现在"},"relativeTime":{"future":{"other":"{0}秒后"},"past":{"other":"{0}秒前"}}}}},{"locale":"zh-Hans-SG","parentLocale":"zh-Hans","fields":{"year":{"displayName":"年","relative":{"0":"今年","1":"明年","-1":"去年"},"relativeTime":{"future":{"other":"{0}年后"},"past":{"other":"{0}年前"}}},"month":{"displayName":"月","relative":{"0":"本月","1":"下个月","-1":"上个月"},"relativeTime":{"future":{"other":"{0}个月后"},"past":{"other":"{0}个月前"}}},"day":{"displayName":"日","relative":{"0":"今天","1":"明天","2":"后天","-1":"昨天","-2":"前天"},"relativeTime":{"future":{"other":"{0}天后"},"past":{"other":"{0}天前"}}},"hour":{"displayName":"小时","relativeTime":{"future":{"other":"{0}小时后"},"past":{"other":"{0}小时前"}}},"minute":{"displayName":"分钟","relativeTime":{"future":{"other":"{0}分钟后"},"past":{"other":"{0}分钟前"}}},"second":{"displayName":"秒钟","relative":{"0":"现在"},"relativeTime":{"future":{"other":"{0}秒后"},"past":{"other":"{0}秒前"}}}}},{"locale":"zh-Hant","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return "other"},"fields":{"year":{"displayName":"年","relative":{"0":"今年","1":"明年","-1":"去年"},"relativeTime":{"future":{"other":"{0} 年後"},"past":{"other":"{0} 年前"}}},"month":{"displayName":"月","relative":{"0":"本月","1":"下個月","-1":"上個月"},"relativeTime":{"future":{"other":"{0} 個月後"},"past":{"other":"{0} 個月前"}}},"day":{"displayName":"日","relative":{"0":"今天","1":"明天","2":"後天","-1":"昨天","-2":"前天"},"relativeTime":{"future":{"other":"{0} 天後"},"past":{"other":"{0} 天前"}}},"hour":{"displayName":"小時","relativeTime":{"future":{"other":"{0} 小時後"},"past":{"other":"{0} 小時前"}}},"minute":{"displayName":"分鐘","relativeTime":{"future":{"other":"{0} 分鐘後"},"past":{"other":"{0} 分鐘前"}}},"second":{"displayName":"秒","relative":{"0":"現在"},"relativeTime":{"future":{"other":"{0} 秒後"},"past":{"other":"{0} 秒前"}}}}},{"locale":"zh-Hant-HK","parentLocale":"zh-Hant","fields":{"year":{"displayName":"年","relative":{"0":"今年","1":"明年","-1":"去年"},"relativeTime":{"future":{"other":"{0} 年後"},"past":{"other":"{0} 年前"}}},"month":{"displayName":"月","relative":{"0":"本月","1":"下個月","-1":"上個月"},"relativeTime":{"future":{"other":"{0} 個月後"},"past":{"other":"{0} 個月前"}}},"day":{"displayName":"日","relative":{"0":"今日","1":"明日","2":"後日","-1":"昨日","-2":"前日"},"relativeTime":{"future":{"other":"{0} 日後"},"past":{"other":"{0} 日前"}}},"hour":{"displayName":"小時","relativeTime":{"future":{"other":"{0} 小時後"},"past":{"other":"{0} 小時前"}}},"minute":{"displayName":"分鐘","relativeTime":{"future":{"other":"{0} 分鐘後"},"past":{"other":"{0} 分鐘前"}}},"second":{"displayName":"秒","relative":{"0":"現在"},"relativeTime":{"future":{"other":"{0} 秒後"},"past":{"other":"{0} 秒前"}}}}},{"locale":"zh-Hant-MO","parentLocale":"zh-Hant-HK"},{"locale":"zh-Hant-TW","parentLocale":"zh-Hant"},{"locale":"zu","pluralRuleFunction":function pluralRuleFunction(n,ord){if(ord)return "other";return n >= 0 && n <= 1?"one":"other"},"fields":{"year":{"displayName":"Unyaka","relative":{"0":"kulo nyaka","1":"unyaka ozayo","-1":"onyakeni odlule"},"relativeTime":{"future":{"one":"onyakeni ongu-{0}","other":"Eminyakeni engu-{0}"},"past":{"one":"{0} unyaka odlule","other":"{0} iminyaka edlule"}}},"month":{"displayName":"Inyanga","relative":{"0":"le nyanga","1":"inyanga ezayo","-1":"inyanga edlule"},"relativeTime":{"future":{"one":"Enyangeni engu-{0}","other":"Ezinyangeni ezingu-{0}"},"past":{"one":"{0} inyanga edlule","other":"{0} izinyanga ezedlule"}}},"day":{"displayName":"usuku","relative":{"0":"namhlanje","1":"kusasa","2":"Usuku olulandela olakusasa","-1":"izolo","-2":"Usuku olwandulela olwayizolo"},"relativeTime":{"future":{"one":"Osukwini olungu-{0}","other":"Ezinsukwini ezingu-{0}"},"past":{"one":"osukwini olungu-{0} olwedlule","other":"ezinsukwini ezingu-{0} ezedlule."}}},"hour":{"displayName":"Ihora","relativeTime":{"future":{"one":"Ehoreni elingu-{0}","other":"Emahoreni angu-{0}"},"past":{"one":"ehoreni eligu-{0} eledluli","other":"emahoreni angu-{0} edlule"}}},"minute":{"displayName":"Iminithi","relativeTime":{"future":{"one":"Kumunithi engu-{0}","other":"Emaminithini angu-{0}"},"past":{"one":"eminithini elingu-{0} eledlule","other":"amaminithi angu-{0} adlule"}}},"second":{"displayName":"Isekhondi","relative":{"0":"manje"},"relativeTime":{"future":{"one":"Kusekhondi elingu-{0}","other":"Kumasekhondi angu-{0}"},"past":{"one":"isekhondi elingu-{0} eledlule","other":"amasekhondi angu-{0} adlule"}}}}},{"locale":"zu-ZA","parentLocale":"zu"}];module.exports = exports["default"];

},{}],34:[function(require,module,exports){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// This is a "hack" until a proper `intl-pluralformat` package is created.

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _intlMessageformat = require('intl-messageformat');

var _intlMessageformat2 = _interopRequireDefault(_intlMessageformat);

function resolveLocale(locales) {
    // IntlMessageFormat#_resolveLocale() does not depend on `this`.
    return _intlMessageformat2['default'].prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
    // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
    return _intlMessageformat2['default'].prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, IntlPluralFormat);

    var useOrdinal = options.style === 'ordinal';
    var pluralFn = findPluralFunction(resolveLocale(locales));

    this.format = function (value) {
        return pluralFn(value, useOrdinal);
    };
};

exports['default'] = IntlPluralFormat;
module.exports = exports['default'];

},{"intl-messageformat":5}],35:[function(require,module,exports){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _localeDataIndex = require('./locale-data/index');

var _localeDataIndex2 = _interopRequireDefault(_localeDataIndex);

var _reactIntl = require('./react-intl');

_defaults(exports, _interopExportWildcard(_reactIntl, _defaults));

_reactIntl.addLocaleData(_localeDataIndex2['default']);

},{"./locale-data/index":33,"./react-intl":36}],36:[function(require,module,exports){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;
exports.defineMessages = defineMessages;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _en = require('./en');

var _en2 = _interopRequireDefault(_en);

var _localeDataRegistry = require('./locale-data-registry');

_localeDataRegistry.addLocaleData(_en2['default']);

exports.addLocaleData = _localeDataRegistry.addLocaleData;

var _types = require('./types');

exports.intlShape = _types.intlShape;

var _inject = require('./inject');

exports.injectIntl = _interopRequire(_inject);

var _componentsIntl = require('./components/intl');

exports.IntlProvider = _interopRequire(_componentsIntl);

var _componentsDate = require('./components/date');

exports.FormattedDate = _interopRequire(_componentsDate);

var _componentsTime = require('./components/time');

exports.FormattedTime = _interopRequire(_componentsTime);

var _componentsRelative = require('./components/relative');

exports.FormattedRelative = _interopRequire(_componentsRelative);

var _componentsNumber = require('./components/number');

exports.FormattedNumber = _interopRequire(_componentsNumber);

var _componentsPlural = require('./components/plural');

exports.FormattedPlural = _interopRequire(_componentsPlural);

var _componentsMessage = require('./components/message');

exports.FormattedMessage = _interopRequire(_componentsMessage);

var _componentsHtmlMessage = require('./components/html-message');

exports.FormattedHTMLMessage = _interopRequire(_componentsHtmlMessage);

function defineMessages(messageDescriptors) {
  // This simply returns what's passed-in because it's meant to be a hook for
  // babel-plugin-react-intl.
  return messageDescriptors;
}

},{"./components/date":21,"./components/html-message":22,"./components/intl":23,"./components/message":24,"./components/number":25,"./components/plural":26,"./components/relative":27,"./components/time":28,"./en":29,"./inject":31,"./locale-data-registry":32,"./types":37}],37:[function(require,module,exports){
(function (global){
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var bool = _react.PropTypes.bool;
var number = _react.PropTypes.number;
var string = _react.PropTypes.string;
var func = _react.PropTypes.func;
var object = _react.PropTypes.object;
var oneOf = _react.PropTypes.oneOf;
var shape = _react.PropTypes.shape;
var intlPropTypes = {
    locale: string.isRequired,
    formats: object,
    messages: object,

    defaultLocale: string,
    defaultFormats: object
};

exports.intlPropTypes = intlPropTypes;
var intlFormatPropTypes = {
    formatDate: func.isRequired,
    formatTime: func.isRequired,
    formatRelative: func.isRequired,
    formatNumber: func.isRequired,
    formatPlural: func.isRequired,
    formatMessage: func.isRequired,
    formatHTMLMessage: func.isRequired
};

exports.intlFormatPropTypes = intlFormatPropTypes;
var intlShape = shape(_extends({}, intlPropTypes, intlFormatPropTypes, {
    now: func.isRequired
}));

exports.intlShape = intlShape;
var dateTimeFormatPropTypes = {
    localeMatcher: oneOf(['best fit', 'lookup']),
    formatMatcher: oneOf(['basic', 'best fit']),

    timeZone: string,
    hour12: bool,

    weekday: oneOf(['narrow', 'short', 'long']),
    era: oneOf(['narrow', 'short', 'long']),
    year: oneOf(['numeric', '2-digit']),
    month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
    day: oneOf(['numeric', '2-digit']),
    hour: oneOf(['numeric', '2-digit']),
    minute: oneOf(['numeric', '2-digit']),
    second: oneOf(['numeric', '2-digit']),
    timeZoneName: oneOf(['short', 'long'])
};

exports.dateTimeFormatPropTypes = dateTimeFormatPropTypes;
var numberFormatPropTypes = {
    localeMatcher: oneOf(['best fit', 'lookup']),

    style: oneOf(['decimal', 'currency', 'percent']),
    currency: string,
    currencyDisplay: oneOf(['symbol', 'code', 'name']),
    useGrouping: bool,

    minimumIntegerDigits: number,
    minimumFractionDigits: number,
    maximumFractionDigits: number,
    minimumSignificantDigits: number,
    maximumSignificantDigits: number
};

exports.numberFormatPropTypes = numberFormatPropTypes;
var relativeFormatPropTypes = {
    style: oneOf(['best fit', 'numeric']),
    units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year'])
};

exports.relativeFormatPropTypes = relativeFormatPropTypes;
var pluralFormatPropTypes = {
    style: oneOf(['cardinal', 'ordinal'])
};
exports.pluralFormatPropTypes = pluralFormatPropTypes;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],38:[function(require,module,exports){
/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

'use strict';

exports.__esModule = true;
exports.escape = escape;
exports.invariantIntlContext = invariantIntlContext;
exports.shallowEquals = shallowEquals;
exports.shouldIntlComponentUpdate = shouldIntlComponentUpdate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var ESCAPED_CHARS = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    '\'': '&#x27;'
};

var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
    return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
        return ESCAPED_CHARS[match];
    });
}

function invariantIntlContext() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var intl = _ref.intl;

    _invariant2['default'](intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

function shouldIntlComponentUpdate(instance, nextProps, nextState) {
    var nextContext = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    var context = instance.context || {};
    var intl = context.intl || {};
    var nextIntl = nextContext.intl || {};

    return !shallowEquals(nextProps, instance.props) || !shallowEquals(nextState, instance.state) || !shallowEquals(nextIntl, intl);
}

},{"invariant":20}]},{},[35])(35)
});
//# sourceMappingURL=react-intl-with-locales.js.map
