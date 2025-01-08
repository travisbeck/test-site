(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[4604],{

/***/ 27725:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tsubMiddleware: function() { return /* binding */ tsubMiddleware; }
/* harmony export */ });
/* harmony import */ var _segment_tsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22870);
/* harmony import */ var _segment_tsub__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_segment_tsub__WEBPACK_IMPORTED_MODULE_0__);

var tsubMiddleware = function (rules) {
    return function (_a) {
        var payload = _a.payload, integration = _a.integration, next = _a.next;
        var store = new _segment_tsub__WEBPACK_IMPORTED_MODULE_0__.Store(rules);
        var rulesToApply = store.getRulesByDestinationName(integration);
        rulesToApply.forEach(function (rule) {
            var matchers = rule.matchers, transformers = rule.transformers;
            for (var i = 0; i < matchers.length; i++) {
                if (_segment_tsub__WEBPACK_IMPORTED_MODULE_0__.matches(payload.obj, matchers[i])) {
                    payload.obj = _segment_tsub__WEBPACK_IMPORTED_MODULE_0__.transform(payload.obj, transformers[i]);
                    if (payload.obj === null) {
                        return next(null);
                    }
                }
            }
        });
        next(payload);
    };
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 22870:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Store = exports.matches = exports.transform = void 0;
var transformers_1 = __webpack_require__(64303);
Object.defineProperty(exports, "transform", ({ enumerable: true, get: function () { return __importDefault(transformers_1).default; } }));
var matchers_1 = __webpack_require__(66699);
Object.defineProperty(exports, "matches", ({ enumerable: true, get: function () { return __importDefault(matchers_1).default; } }));
var store_1 = __webpack_require__(41444);
Object.defineProperty(exports, "Store", ({ enumerable: true, get: function () { return __importDefault(store_1).default; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 66699:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var dlv_1 = __importDefault(__webpack_require__(27843));
function matches(event, matcher) {
    if (!matcher) {
        throw new Error('No matcher supplied!');
    }
    switch (matcher.type) {
        case 'all':
            return all();
        case 'fql':
            return fql(matcher.ir, event);
        default:
            throw new Error("Matcher of type ".concat(matcher.type, " unsupported."));
    }
}
exports["default"] = matches;
function all() {
    return true;
}
function fql(ir, event) {
    if (!ir) {
        return false;
    }
    try {
        ir = JSON.parse(ir);
    }
    catch (e) {
        throw new Error("Failed to JSON.parse FQL intermediate representation \"".concat(ir, "\": ").concat(e));
    }
    var result = fqlEvaluate(ir, event);
    if (typeof result !== 'boolean') {
        // An error was returned, or a lowercase, typeof, or similar function was run alone. Nothing to evaluate.
        return false;
    }
    return result;
}
// FQL is 100% type strict in Go. Show no mercy to types which do not comply.
function fqlEvaluate(ir, event) {
    // If the given ir chunk is not an array, then we should check the single given path or value for literally `true`.
    if (!Array.isArray(ir)) {
        return getValue(ir, event) === true;
    }
    // Otherwise, it is a sequence of ordered steps to follow to reach our solution!
    var item = ir[0];
    switch (item) {
        /*** Unary cases ***/
        // '!' => Invert the result
        case '!':
            return !fqlEvaluate(ir[1], event);
        /*** Binary cases ***/
        // 'or' => Any condition being true returns true
        case 'or':
            for (var i = 1; i < ir.length; i++) {
                if (fqlEvaluate(ir[i], event)) {
                    return true;
                }
            }
            return false;
        // 'and' => Any condition being false returns false
        case 'and':
            for (var i = 1; i < ir.length; i++) {
                if (!fqlEvaluate(ir[i], event)) {
                    return false;
                }
            }
            return true;
        // Equivalence comparisons
        case '=':
        case '!=':
            return compareItems(getValue(ir[1], event), getValue(ir[2], event), item, event);
        // Numerical comparisons
        case '<=':
        case '<':
        case '>':
        case '>=':
            // Compare the two values with the given operator.
            return compareNumbers(getValue(ir[1], event), getValue(ir[2], event), item, event);
        // item in [list]' => Checks whether item is in list
        case 'in':
            return checkInList(getValue(ir[1], event), getValue(ir[2], event), event);
        /*** Functions ***/
        // 'contains(str1, str2)' => The first string has a substring of the second string
        case 'contains':
            return contains(getValue(ir[1], event), getValue(ir[2], event));
        // 'match(str, match)' => The given string matches the provided glob matcher
        case 'match':
            return match(getValue(ir[1], event), getValue(ir[2], event));
        // 'lowercase(str)' => Returns a lowercased string, null if the item is not a string
        case 'lowercase':
            var target = getValue(ir[1], event);
            if (typeof target !== 'string') {
                return null;
            }
            return target.toLowerCase();
        // 'typeof(val)' => Returns the FQL type of the value
        case 'typeof':
            // TODO: Do we need mapping to allow for universal comparisons? e.g. Object -> JSON, Array -> List, Floats?
            return typeof getValue(ir[1], event);
        // 'length(val)' => Returns the length of an array or string, NaN if neither
        case 'length':
            return length(getValue(ir[1], event));
        // If nothing hit, we or the IR messed up somewhere.
        default:
            throw new Error("FQL IR could not evaluate for token: ".concat(item));
    }
}
function getValue(item, event) {
    // If item is an array, leave it as-is.
    if (Array.isArray(item)) {
        return item;
    }
    // If item is an object, it has the form of `{"value": VAL}`
    if (typeof item === 'object') {
        return item.value;
    }
    // Otherwise, it's an event path, e.g. "properties.email"
    return (0, dlv_1.default)(event, item);
}
function checkInList(item, list, event) {
    return list.find(function (it) { return getValue(it, event) === item; }) !== undefined;
}
function compareNumbers(first, second, operator, event) {
    // Check if it's more IR (such as a length() function)
    if (isIR(first)) {
        first = fqlEvaluate(first, event);
    }
    if (isIR(second)) {
        second = fqlEvaluate(second, event);
    }
    if (typeof first !== 'number' || typeof second !== 'number') {
        return false;
    }
    // Reminder: NaN is not comparable to any other number (including NaN) and will always return false as desired.
    switch (operator) {
        // '<=' => The first number is less than or equal to the second.
        case '<=':
            return first <= second;
        // '>=' => The first number is greater than or equal to the second
        case '>=':
            return first >= second;
        // '<' The first number is less than the second.
        case '<':
            return first < second;
        // '>' The first number is greater than the second.
        case '>':
            return first > second;
        default:
            throw new Error("Invalid operator in compareNumbers: ".concat(operator));
    }
}
function compareItems(first, second, operator, event) {
    // Check if it's more IR (such as a lowercase() function)
    if (isIR(first)) {
        first = fqlEvaluate(first, event);
    }
    if (isIR(second)) {
        second = fqlEvaluate(second, event);
    }
    if (typeof first === 'object' && typeof second === 'object') {
        first = JSON.stringify(first);
        second = JSON.stringify(second);
    }
    // Objects with the exact same contents AND order ARE considered identical. (Don't compare by reference)
    // Even in Go, this MUST be the same byte order.
    // e.g. {a: 1, b:2} === {a: 1, b:2} BUT {a:1, b:2} !== {b:2, a:1}
    // Maybe later we'll use a stable stringifier, but we're matching server-side behavior for now.
    switch (operator) {
        // '=' => The two following items are exactly identical
        case '=':
            return first === second;
        // '!=' => The two following items are NOT exactly identical.
        case '!=':
            return first !== second;
        default:
            throw new Error("Invalid operator in compareItems: ".concat(operator));
    }
}
function contains(first, second) {
    if (typeof first !== 'string' || typeof second !== 'string') {
        return false;
    }
    return first.indexOf(second) !== -1;
}
function match(str, glob) {
    if (typeof str !== 'string' || typeof glob !== 'string') {
        return false;
    }
    return globMatches(glob, str);
}
function length(item) {
    // Match server-side behavior.
    if (item === null) {
        return 0;
    }
    // Type-check to avoid returning .length of an object
    if (!Array.isArray(item) && typeof item !== 'string') {
        return NaN;
    }
    return item.length;
}
// This is a heuristic technically speaking, but should be close enough. The odds of someone trying to test
// a func with identical IR notation is pretty low.
function isIR(value) {
    // TODO: This can be better checked by checking if this is a {"value": THIS}
    if (!Array.isArray(value)) {
        return false;
    }
    // Function checks
    if ((value[0] === 'lowercase' || value[0] === 'length' || value[0] === 'typeof') &&
        value.length === 2) {
        return true;
    }
    if ((value[0] === 'contains' || value[0] === 'match') && value.length === 3) {
        return true;
    }
    return false;
}
// Any reputable glob matcher is designed to work on filesystems and doesn't allow the override of the separator
// character "/". This is problematic since our server-side representation e.g. evaluates "match('ab/c', 'a*)"
// as TRUE, whereas any glob matcher for JS available does false. So we're rewriting it here.
// See: https://github.com/segmentio/glob/blob/master/glob.go
function globMatches(pattern, str) {
    var _a, _b;
    Pattern: while (pattern.length > 0) {
        var star = void 0;
        var chunk = void 0;
        (_a = scanChunk(pattern), star = _a.star, chunk = _a.chunk, pattern = _a.pattern);
        if (star && chunk === '') {
            // Trailing * matches rest of string
            return true;
        }
        // Look for match at current position
        var _c = matchChunk(chunk, str), t = _c.t, ok = _c.ok, err = _c.err;
        if (err) {
            return false;
        }
        // If we're the last chunk, make sure we've exhausted the str
        // otherwise we'll give a false result even if we could still match
        // using the star
        if (ok && (t.length === 0 || pattern.length > 0)) {
            str = t;
            continue;
        }
        if (star) {
            // Look for match, skipping i+1 bytes.
            for (var i = 0; i < str.length; i++) {
                ;
                (_b = matchChunk(chunk, str.slice(i + 1)), t = _b.t, ok = _b.ok, err = _b.err);
                if (ok) {
                    // If we're the last chunk, make sure we exhausted the str.
                    if (pattern.length === 0 && t.length > 0) {
                        continue;
                    }
                    str = t;
                    continue Pattern;
                }
                if (err) {
                    return false;
                }
            }
        }
        return false;
    }
    return str.length === 0;
}
function scanChunk(pattern) {
    var result = {
        star: false,
        chunk: '',
        pattern: '',
    };
    while (pattern.length > 0 && pattern[0] === '*') {
        pattern = pattern.slice(1);
        result.star = true;
    }
    var inRange = false;
    var i;
    Scan: for (i = 0; i < pattern.length; i++) {
        switch (pattern[i]) {
            case '\\':
                // Error check handled in matchChunk: bad pattern.
                if (i + 1 < pattern.length) {
                    i++;
                }
                break;
            case '[':
                inRange = true;
                break;
            case ']':
                inRange = false;
                break;
            case '*':
                if (!inRange) {
                    break Scan;
                }
        }
    }
    result.chunk = pattern.slice(0, i);
    result.pattern = pattern.slice(i);
    return result;
}
// matchChunk checks whether chunk matches the beginning of s.
// If so, it returns the remainder of s (after the match).
// Chunk is all single-character operators: literals, char classes, and ?.
function matchChunk(chunk, str) {
    var _a, _b;
    var result = {
        t: '',
        ok: false,
        err: false,
    };
    while (chunk.length > 0) {
        if (str.length === 0) {
            return result;
        }
        switch (chunk[0]) {
            case '[':
                var char = str[0];
                str = str.slice(1);
                chunk = chunk.slice(1);
                var notNegated = true;
                if (chunk.length > 0 && chunk[0] === '^') {
                    notNegated = false;
                    chunk = chunk.slice(1);
                }
                // Parse all ranges
                var foundMatch = false;
                var nRange = 0;
                while (true) {
                    if (chunk.length > 0 && chunk[0] === ']' && nRange > 0) {
                        chunk = chunk.slice(1);
                        break;
                    }
                    var lo = '';
                    var hi = '';
                    var err = void 0;
                    (_a = getEsc(chunk), lo = _a.char, chunk = _a.newChunk, err = _a.err);
                    if (err) {
                        return result;
                    }
                    hi = lo;
                    if (chunk[0] === '-') {
                        ;
                        (_b = getEsc(chunk.slice(1)), hi = _b.char, chunk = _b.newChunk, err = _b.err);
                        if (err) {
                            return result;
                        }
                    }
                    if (lo <= char && char <= hi) {
                        foundMatch = true;
                    }
                    nRange++;
                }
                if (foundMatch !== notNegated) {
                    return result;
                }
                break;
            case '?':
                str = str.slice(1);
                chunk = chunk.slice(1);
                break;
            case '\\':
                chunk = chunk.slice(1);
                if (chunk.length === 0) {
                    result.err = true;
                    return result;
                }
            // Fallthrough, missing break intentional.
            default:
                if (chunk[0] !== str[0]) {
                    return result;
                }
                str = str.slice(1);
                chunk = chunk.slice(1);
        }
    }
    result.t = str;
    result.ok = true;
    result.err = false;
    return result;
}
// getEsc gets a possibly-escaped character from chunk, for a character class.
function getEsc(chunk) {
    var result = {
        char: '',
        newChunk: '',
        err: false,
    };
    if (chunk.length === 0 || chunk[0] === '-' || chunk[0] === ']') {
        result.err = true;
        return result;
    }
    if (chunk[0] === '\\') {
        chunk = chunk.slice(1);
        if (chunk.length === 0) {
            result.err = true;
            return result;
        }
    }
    // Unlike Go, JS strings operate on characters instead of bytes.
    // This is why we aren't copying over the GetRuneFromString stuff.
    result.char = chunk[0];
    result.newChunk = chunk.slice(1);
    if (result.newChunk.length === 0) {
        result.err = true;
    }
    return result;
}
//# sourceMappingURL=matchers.js.map

/***/ }),

/***/ 41444:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Store = /** @class */ (function () {
    function Store(rules) {
        this.rules = [];
        this.rules = rules || [];
    }
    Store.prototype.getRulesByDestinationName = function (destinationName) {
        var rules = [];
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            // Rules with no destinationName are global (workspace || workspace::source)
            if (rule.destinationName === destinationName || rule.destinationName === undefined) {
                rules.push(rule);
            }
        }
        return rules;
    };
    return Store;
}());
exports["default"] = Store;
//# sourceMappingURL=store.js.map

/***/ }),

/***/ 64303:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var md5_1 = __importDefault(__webpack_require__(80374));
var dlv_1 = __importDefault(__webpack_require__(27843));
var math_base_special_ldexp_1 = __importDefault(__webpack_require__(75500));
var dset_1 = __webpack_require__(22341);
var unset_1 = __webpack_require__(94966);
function transform(payload, transformers) {
    var transformedPayload = payload;
    for (var _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
        var transformer = transformers_1[_i];
        switch (transformer.type) {
            case 'drop':
                return null;
            case 'drop_properties':
                dropProperties(transformedPayload, transformer.config);
                break;
            case 'allow_properties':
                allowProperties(transformedPayload, transformer.config);
                break;
            case 'sample_event':
                if (sampleEvent(transformedPayload, transformer.config)) {
                    break;
                }
                return null;
            case 'map_properties':
                mapProperties(transformedPayload, transformer.config);
                break;
            case 'hash_properties':
                // Not yet supported, but don't throw an error. Just ignore.
                break;
            default:
                throw new Error("Transformer of type \"".concat(transformer.type, "\" is unsupported."));
        }
    }
    return transformedPayload;
}
exports["default"] = transform;
// dropProperties removes all specified props from the object.
function dropProperties(payload, config) {
    for (var key in config.drop) {
        if (!config.drop.hasOwnProperty(key)) {
            continue;
        }
        // If key is empty, it refers to the top-level object.
        var field = key === '' ? payload : (0, dlv_1.default)(payload, key);
        // Can only drop props off of arrays and objects.
        if (typeof field !== 'object' || field === null) {
            continue;
        }
        for (var _i = 0, _a = config.drop[key]; _i < _a.length; _i++) {
            var target = _a[_i];
            delete field[target];
        }
    }
}
// allowProperties ONLY allows the specific targets within the keys. (e.g. "a.foo": ["bar", "baz"]
// on {a: {foo: {bar: 1, baz: 2}, other: 3}} will not have any drops, as it only looks inside a.foo
function allowProperties(payload, config) {
    for (var key in config.allow) {
        if (!config.allow.hasOwnProperty(key)) {
            continue;
        }
        // If key is empty, it refers to the top-level object.
        var field = key === '' ? payload : (0, dlv_1.default)(payload, key);
        // Can only drop props off of arrays and objects.
        if (typeof field !== 'object' || field === null) {
            continue;
        }
        // Execution order fortunately doesn't really matter (e.g. if someone filtered off of foo.bar, then foo.bar.baz)
        // except for micro-optimization.
        for (var k in field) {
            if (!field.hasOwnProperty(k)) {
                continue;
            }
            if (config.allow[key].indexOf(k) === -1) {
                delete field[k];
            }
        }
    }
}
function mapProperties(payload, config) {
    // Some configs might try to modify or read from a field multiple times. We will only ever read
    // values as they were before any modifications began. Thus, if you try to override e.g.
    // {a: {b: 1}} with set(a, 'b', 2) (which results in {a: {b: 2}}) and then try to copy a.b into
    // a.c, you will get {a: {b: 2, c:1}} and NOT {a: {b:2, c:2}}. This prevents map evaluation
    // order from mattering, and === what server-side does.
    // See: https://github.com/segmentio/tsub/blob/661695a63b60b90471796e667458f076af788c19/transformers/map_properties.go#L179-L200
    var initialPayload = JSON.parse(JSON.stringify(payload));
    for (var key in config.map) {
        if (!config.map.hasOwnProperty(key)) {
            continue;
        }
        var actionMap = config.map[key];
        // Can't manipulate non-objects. Check that the parent is one. Strip the last .field
        // from the string.
        var splitKey = key.split('.');
        var parent_1 = void 0;
        if (splitKey.length > 1) {
            splitKey.pop();
            parent_1 = (0, dlv_1.default)(initialPayload, splitKey.join('.'));
        }
        else {
            parent_1 = payload;
        }
        if (typeof parent_1 !== 'object') {
            continue;
        }
        // These actions are exclusive to each other.
        if (actionMap.copy) {
            var valueToCopy = (0, dlv_1.default)(initialPayload, actionMap.copy);
            if (valueToCopy !== undefined) {
                (0, dset_1.dset)(payload, key, valueToCopy);
            }
        }
        else if (actionMap.move) {
            var valueToMove = (0, dlv_1.default)(initialPayload, actionMap.move);
            if (valueToMove !== undefined) {
                (0, dset_1.dset)(payload, key, valueToMove);
            }
            (0, unset_1.unset)(payload, actionMap.move);
        }
        // Have to check only if property exists, as null, undefined, and other vals could be explicitly set.
        else if (actionMap.hasOwnProperty('set')) {
            (0, dset_1.dset)(payload, key, actionMap.set);
        }
        // to_string is not exclusive and can be paired with other actions. Final action.
        if (actionMap.to_string) {
            var valueToString = (0, dlv_1.default)(payload, key);
            // Do not string arrays and objects. Do not double-encode strings.
            if (typeof valueToString === 'string' ||
                (typeof valueToString === 'object' && valueToString !== null)) {
                continue;
            }
            // TODO: Check stringifier in Golang for parity.
            if (valueToString !== undefined) {
                (0, dset_1.dset)(payload, key, JSON.stringify(valueToString));
            }
            else {
                // TODO: Check this behavior.
                (0, dset_1.dset)(payload, key, 'undefined');
            }
        }
    }
}
function sampleEvent(payload, config) {
    if (config.sample.percent <= 0) {
        return false;
    }
    else if (config.sample.percent >= 1) {
        return true;
    }
    // If we're not filtering deterministically, just use raw percentage.
    if (!config.sample.path) {
        return samplePercent(config.sample.percent);
    }
    // Otherwise, use a deterministic hash.
    return sampleConsistentPercent(payload, config);
}
function samplePercent(percent) {
    // Math.random returns [0, 1) => 0.0<>0.9999...
    return Math.random() <= percent;
}
// sampleConsistentPercent converts an input string of bytes into a consistent uniform
// continuous distribution of [0.0, 1.0]. This is based on
// http://mumble.net/~campbell/tmp/random_real.c, but using the digest
// result of the input value as the random information.
// IMPORTANT - This function needs to === the Golang implementation to ensure that the two return the same vals!
// See: https://github.com/segmentio/sampler/blob/65cb04132305a04fcd4bcaef67d57fbe40c30241/sampler.go#L13-L38
// Since AJS supports IE9+ (typed arrays were introduced in IE10) we're doing some manual array math.
// This could be done directly with strings, but arrays are easier to reason about/have better function support.
function sampleConsistentPercent(payload, config) {
    var field = (0, dlv_1.default)(payload, config.sample.path);
    // Operate off of JSON bytes. TODO: Validate all type behavior, esp. strings.
    var digest = (0, md5_1.default)(JSON.stringify(field));
    var exponent = -64;
    // Manually maintain 64-bit int as an array.
    var significand = [];
    // Left-shift and OR for first 8 bytes of digest. (8 bytes * 8 = 64 bits)
    consumeDigest(digest.slice(0, 8), significand);
    var leadingZeros = 0;
    for (var i = 0; i < 64; i++) {
        if (significand[i] === 1) {
            break;
        }
        leadingZeros++;
    }
    if (leadingZeros !== 0) {
        // Use the last 8 bytes of the digest, same as before.
        var val = [];
        consumeDigest(digest.slice(9, 16), val);
        exponent -= leadingZeros;
        // Left-shift away leading zeros in significand.
        significand.splice(0, leadingZeros);
        // Right-shift val by 64 minus leading zeros and push into significand.
        val.splice(64 - leadingZeros);
        significand = significand.concat(val);
    }
    // Flip 64th bit
    significand[63] = significand[63] === 0 ? 1 : 0;
    // Convert our manual binary into a JS num (binary arr => binary string => psuedo-int) and run the ldexp!
    return (0, math_base_special_ldexp_1.default)(parseInt(significand.join(''), 2), exponent) < config.sample.percent;
}
// Array byte filler helper
function consumeDigest(digest, arr) {
    for (var i = 0; i < 8; i++) {
        var remainder = digest[i];
        for (var binary = 128; binary >= 1; binary /= 2) {
            if (remainder - binary >= 0) {
                remainder -= binary;
                arr.push(1);
            }
            else {
                arr.push(0);
            }
        }
    }
}
//# sourceMappingURL=transformers.js.map

/***/ }),

/***/ 94966:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unset = void 0;
var dlv_1 = __importDefault(__webpack_require__(27843));
function unset(obj, prop) {
    if ((0, dlv_1.default)(obj, prop)) {
        var segs = prop.split('.');
        var last = segs.pop();
        while (segs.length && segs[segs.length - 1].slice(-1) === '\\') {
            last = segs.pop().slice(0, -1) + '.' + last;
        }
        while (segs.length)
            obj = obj[(prop = segs.shift())];
        return delete obj[last];
    }
    return true;
}
exports.unset = unset;
//# sourceMappingURL=unset.js.map

/***/ }),

/***/ 3304:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;


/***/ }),

/***/ 57382:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array-float64
*
* @example
* var ctor = require( '@stdlib/array-float64' );
*
* var arr = new ctor( 10 );
* // returns <Float64Array>
*/

// MODULES //

var hasFloat64ArraySupport = __webpack_require__( 35569 );
var builtin = __webpack_require__( 3304 );
var polyfill = __webpack_require__( 28482 );


// MAIN //

var ctor;
if ( hasFloat64ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;


/***/ }),

/***/ 28482:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of double-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;


/***/ }),

/***/ 26322:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Typed array constructor which returns a typed array representing an array of 16-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array-uint16
*
* @example
* var ctor = require( '@stdlib/array-uint16' );
*
* var arr = new ctor( 10 );
* // returns <Uint16Array>
*/

// MODULES //

var hasUint16ArraySupport = __webpack_require__( 72508 );
var builtin = __webpack_require__( 85679 );
var polyfill = __webpack_require__( 882 );


// MAIN //

var ctor;
if ( hasUint16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;


/***/ }),

/***/ 882:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 16-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;


/***/ }),

/***/ 85679:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;


/***/ }),

/***/ 4773:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Typed array constructor which returns a typed array representing an array of 32-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array-uint32
*
* @example
* var ctor = require( '@stdlib/array-uint32' );
*
* var arr = new ctor( 10 );
* // returns <Uint32Array>
*/

// MODULES //

var hasUint32ArraySupport = __webpack_require__( 99773 );
var builtin = __webpack_require__( 33004 );
var polyfill = __webpack_require__( 23078 );


// MAIN //

var ctor;
if ( hasUint32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;


/***/ }),

/***/ 23078:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 32-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;


/***/ }),

/***/ 33004:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;


/***/ }),

/***/ 47980:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array-uint8
*
* @example
* var ctor = require( '@stdlib/array-uint8' );
*
* var arr = new ctor( 10 );
* // returns <Uint8Array>
*/

// MODULES //

var hasUint8ArraySupport = __webpack_require__( 58114 );
var builtin = __webpack_require__( 72918 );
var polyfill = __webpack_require__( 33357 );


// MAIN //

var ctor;
if ( hasUint8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;


/***/ }),

/***/ 33357:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;


/***/ }),

/***/ 72918:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;


/***/ }),

/***/ 12684:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;


/***/ }),

/***/ 35569:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test for native `Float64Array` support.
*
* @module @stdlib/assert-has-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/assert-has-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = __webpack_require__( 13876 );


// EXPORTS //

module.exports = hasFloat64ArraySupport;


/***/ }),

/***/ 13876:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var isFloat64Array = __webpack_require__( 21448 );
var GlobalFloat64Array = __webpack_require__( 12684 );


// MAIN //

/**
* Tests for native `Float64Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float64Array` support
*
* @example
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/
function hasFloat64ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat64Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat64Array( [ 1.0, 3.14, -3.14, NaN ] );
		bool = (
			isFloat64Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.14 &&
			arr[ 2 ] === -3.14 &&
			arr[ 3 ] !== arr[ 3 ]
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat64ArraySupport;


/***/ }),

/***/ 9048:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert-has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert-has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasOwnProp = __webpack_require__( 13763 );


// EXPORTS //

module.exports = hasOwnProp;


/***/ }),

/***/ 13763:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
}


// EXPORTS //

module.exports = hasOwnProp;


/***/ }),

/***/ 57009:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test for native `Symbol` support.
*
* @module @stdlib/assert-has-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/assert-has-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = __webpack_require__( 46784 );


// EXPORTS //

module.exports = hasSymbolSupport;


/***/ }),

/***/ 46784:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
}


// EXPORTS //

module.exports = hasSymbolSupport;


/***/ }),

/***/ 53123:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test for native `toStringTag` support.
*
* @module @stdlib/assert-has-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/assert-has-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = __webpack_require__( 98481 );


// EXPORTS //

module.exports = hasToStringTagSupport;


/***/ }),

/***/ 98481:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var hasSymbols = __webpack_require__( 57009 );


// VARIABLES //

var FLG = hasSymbols();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( FLG && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;


/***/ }),

/***/ 72508:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test for native `Uint16Array` support.
*
* @module @stdlib/assert-has-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/assert-has-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = __webpack_require__( 43403 );


// EXPORTS //

module.exports = hasUint16ArraySupport;


/***/ }),

/***/ 43403:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var isUint16Array = __webpack_require__( 40768 );
var UINT16_MAX = __webpack_require__( 49668 );
var GlobalUint16Array = __webpack_require__( 10187 );


// MAIN //

/**
* Tests for native `Uint16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint16Array` support
*
* @example
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/
function hasUint16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT16_MAX+1, UINT16_MAX+2 ];
		arr = new GlobalUint16Array( arr );
		bool = (
			isUint16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT16_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint16ArraySupport;


/***/ }),

/***/ 10187:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var main = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;


/***/ }),

/***/ 99773:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test for native `Uint32Array` support.
*
* @module @stdlib/assert-has-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/assert-has-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = __webpack_require__( 32822 );


// EXPORTS //

module.exports = hasUint32ArraySupport;


/***/ }),

/***/ 32822:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var isUint32Array = __webpack_require__( 72744 );
var UINT32_MAX = __webpack_require__( 63899 );
var GlobalUint32Array = __webpack_require__( 40746 );


// MAIN //

/**
* Tests for native `Uint32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint32Array` support
*
* @example
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/
function hasUint32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT32_MAX+1, UINT32_MAX+2 ];
		arr = new GlobalUint32Array( arr );
		bool = (
			isUint32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT32_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint32ArraySupport;


/***/ }),

/***/ 40746:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var main = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;


/***/ }),

/***/ 58114:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test for native `Uint8Array` support.
*
* @module @stdlib/assert-has-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/assert-has-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = __webpack_require__( 58066 );


// EXPORTS //

module.exports = hasUint8ArraySupport;


/***/ }),

/***/ 58066:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var isUint8Array = __webpack_require__( 48279 );
var UINT8_MAX = __webpack_require__( 63443 );
var GlobalUint8Array = __webpack_require__( 72731 );


// MAIN //

/**
* Tests for native `Uint8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8Array` support
*
* @example
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/
function hasUint8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT8_MAX+1, UINT8_MAX+2 ];
		arr = new GlobalUint8Array( arr );
		bool = (
			isUint8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&           // truncation
			arr[ 2 ] === UINT8_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&           // wrap around
			arr[ 4 ] === 1              // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ArraySupport;


/***/ }),

/***/ 72731:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var main = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;


/***/ }),

/***/ 21448:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test if a value is a Float64Array.
*
* @module @stdlib/assert-is-float64array
*
* @example
* var isFloat64Array = require( '@stdlib/assert-is-float64array' );
*
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* bool = isFloat64Array( [] );
* // returns false
*/

// MODULES //

var isFloat64Array = __webpack_require__( 21453 );


// EXPORTS //

module.exports = isFloat64Array;


/***/ }),

/***/ 21453:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var nativeClass = __webpack_require__( 36208 );


// VARIABLES //

var hasFloat64Array = ( typeof Float64Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float64Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float64Array
*
* @example
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat64Array( [] );
* // returns false
*/
function isFloat64Array( value ) {
	return (
		( hasFloat64Array && value instanceof Float64Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float64Array]'
	);
}


// EXPORTS //

module.exports = isFloat64Array;


/***/ }),

/***/ 69331:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var Uint8Array = __webpack_require__( 47980 );
var Uint16Array = __webpack_require__( 26322 );


// MAIN //

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;


/***/ }),

/***/ 65902:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Return a boolean indicating if an environment is little endian.
*
* @module @stdlib/assert-is-little-endian
*
* @example
* var IS_LITTLE_ENDIAN = require( '@stdlib/assert-is-little-endian' );
*
* var bool = IS_LITTLE_ENDIAN;
* // returns <boolean>
*/

// MODULES //

var IS_LITTLE_ENDIAN = __webpack_require__( 24106 );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;


/***/ }),

/***/ 24106:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var ctors = __webpack_require__( 69331 );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @private
* @returns {boolean} boolean indicating if an environment is little endian
*
* @example
* var bool = isLittleEndian();
* // returns <boolean>
*/
function isLittleEndian() {
	var uint16view;
	var uint8view;

	uint16view = new ctors[ 'uint16' ]( 1 );

	/*
	* Set the uint16 view to a value having distinguishable lower and higher order words.
	*
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// MAIN //

bool = isLittleEndian();


// EXPORTS //

module.exports = bool;


/***/ }),

/***/ 40768:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test if a value is a Uint16Array.
*
* @module @stdlib/assert-is-uint16array
*
* @example
* var isUint16Array = require( '@stdlib/assert-is-uint16array' );
*
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* bool = isUint16Array( [] );
* // returns false
*/

// MODULES //

var isUint16Array = __webpack_require__( 3823 );


// EXPORTS //

module.exports = isUint16Array;


/***/ }),

/***/ 3823:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var nativeClass = __webpack_require__( 36208 );


// VARIABLES //

var hasUint16Array = ( typeof Uint16Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint16Array
*
* @example
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint16Array( [] );
* // returns false
*/
function isUint16Array( value ) {
	return (
		( hasUint16Array && value instanceof Uint16Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint16Array]'
	);
}


// EXPORTS //

module.exports = isUint16Array;


/***/ }),

/***/ 72744:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test if a value is a Uint32Array.
*
* @module @stdlib/assert-is-uint32array
*
* @example
* var isUint32Array = require( '@stdlib/assert-is-uint32array' );
*
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* bool = isUint32Array( [] );
* // returns false
*/

// MODULES //

var isUint32Array = __webpack_require__( 72326 );


// EXPORTS //

module.exports = isUint32Array;


/***/ }),

/***/ 72326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var nativeClass = __webpack_require__( 36208 );


// VARIABLES //

var hasUint32Array = ( typeof Uint32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint32Array
*
* @example
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint32Array( [] );
* // returns false
*/
function isUint32Array( value ) {
	return (
		( hasUint32Array && value instanceof Uint32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint32Array]'
	);
}


// EXPORTS //

module.exports = isUint32Array;


/***/ }),

/***/ 48279:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test if a value is a Uint8Array.
*
* @module @stdlib/assert-is-uint8array
*
* @example
* var isUint8Array = require( '@stdlib/assert-is-uint8array' );
*
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* bool = isUint8Array( [] );
* // returns false
*/

// MODULES //

var isUint8Array = __webpack_require__( 20208 );


// EXPORTS //

module.exports = isUint8Array;


/***/ }),

/***/ 20208:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var nativeClass = __webpack_require__( 36208 );


// VARIABLES //

var hasUint8Array = ( typeof Uint8Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8Array
*
* @example
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint8Array( [] );
* // returns false
*/
function isUint8Array( value ) {
	return (
		( hasUint8Array && value instanceof Uint8Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint8Array]'
	);
}


// EXPORTS //

module.exports = isUint8Array;


/***/ }),

/***/ 66315:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/constants-float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants-float64-exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* Bias of a double-precision floating-point number's exponent.
*
* ## Notes
*
* The bias can be computed via
*
* ```tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 11\\).
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_EXPONENT_BIAS = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_EXPONENT_BIAS;


/***/ }),

/***/ 93105:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants-float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants-float64-high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;


/***/ }),

/***/ 66988:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants-float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants-float64-max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;


/***/ }),

/***/ 89777:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants-float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants-float64-max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ```text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;


/***/ }),

/***/ 53690:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants-float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants-float64-min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;


/***/ }),

/***/ 42918:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants-float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants-float64-ninf' );
* // returns -Infinity
*/

// MODULES //

var Number = __webpack_require__( 44772 );


// MAIN //

/**
* Double-precision floating-point negative infinity.
*
* ## Notes
*
* Double-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.NEGATIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_NINF = Number.NEGATIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_NINF;


/***/ }),

/***/ 24165:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/constants-float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants-float64-pinf' );
* // returns Infinity
*/


// MAIN //

/**
* Double-precision floating-point positive infinity.
*
* ## Notes
*
* Double-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.POSITIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_PINF = Number.POSITIVE_INFINITY; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = FLOAT64_PINF;


/***/ }),

/***/ 96488:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants-float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants-float64-smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;


/***/ }),

/***/ 49668:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants-uint16-max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants-uint16-max' );
* // returns 65535
*/


// MAIN //

/**
* Maximum unsigned 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{16} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 1111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 65535
*/
var UINT16_MAX = 65535|0; // asm type annotation


// EXPORTS //

module.exports = UINT16_MAX;


/***/ }),

/***/ 63899:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants-uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants-uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* Maximum unsigned 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;


/***/ }),

/***/ 63443:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants-uint8-max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants-uint8-max' );
* // returns 255
*/


// MAIN //

/**
* Maximum unsigned 8-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{8} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111
* ```
*
* @constant
* @type {integer32}
* @default 255
*/
var UINT8_MAX = 255|0; // asm type annotation


// EXPORTS //

module.exports = UINT8_MAX;


/***/ }),

/***/ 57011:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test if a double-precision floating-point numeric value is infinite.
*
* @module @stdlib/math-base-assert-is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math-base-assert-is-infinite' );
*
* var bool = isInfinite( Infinity );
* // returns true
*
* bool = isInfinite( -Infinity );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var isInfinite = __webpack_require__( 812 );


// EXPORTS //

module.exports = isInfinite;


/***/ }),

/***/ 812:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var PINF = __webpack_require__( 24165 );
var NINF = __webpack_require__( 42918 );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Infinity );
* // returns true
*
* @example
* var bool = isInfinite( -Infinity );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
}


// EXPORTS //

module.exports = isInfinite;


/***/ }),

/***/ 21883:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Test if a double-precision floating-point numeric value is `NaN`.
*
* @module @stdlib/math-base-assert-is-nan
*
* @example
* var isnan = require( '@stdlib/math-base-assert-is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 7.0 );
* // returns false
*/

// MODULES //

var isnan = __webpack_require__( 61797 );


// EXPORTS //

module.exports = isnan;


/***/ }),

/***/ 61797:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

/**
* Tests if a double-precision floating-point numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnan;


/***/ }),

/***/ 513:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Compute an absolute value of a double-precision floating-point number.
*
* @module @stdlib/math-base-special-abs
*
* @example
* var abs = require( '@stdlib/math-base-special-abs' );
*
* var v = abs( -1.0 );
* // returns 1.0
*
* v = abs( 2.0 );
* // returns 2.0
*
* v = abs( 0.0 );
* // returns 0.0
*
* v = abs( -0.0 );
* // returns 0.0
*
* v = abs( NaN );
* // returns NaN
*/

// MODULES //

var abs = __webpack_require__( 35760 );


// EXPORTS //

module.exports = abs;


/***/ }),

/***/ 35760:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

/**
* Computes the absolute value of a double-precision floating-point number `x`.
*
* @param {number} x - input value
* @returns {number} absolute value
*
* @example
* var v = abs( -1.0 );
* // returns 1.0
*
* @example
* var v = abs( 2.0 );
* // returns 2.0
*
* @example
* var v = abs( 0.0 );
* // returns 0.0
*
* @example
* var v = abs( -0.0 );
* // returns 0.0
*
* @example
* var v = abs( NaN );
* // returns NaN
*/
function abs( x ) {
	return Math.abs( x ); // eslint-disable-line stdlib/no-builtin-math
}


// EXPORTS //

module.exports = abs;


/***/ }),

/***/ 55848:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math-base-special-copysign
*
* @example
* var copysign = require( '@stdlib/math-base-special-copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var main = __webpack_require__( 10677 );


// EXPORTS //

module.exports = main;


/***/ }),

/***/ 10677:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var toWords = __webpack_require__( 77838 );
var getHighWord = __webpack_require__( 41921 );
var fromWords = __webpack_require__( 72490 );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0, 0 ];


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = copysign;


/***/ }),

/***/ 75500:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math-base-special-ldexp
*
* @example
* var ldexp = require( '@stdlib/math-base-special-ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Infinity, 11 );
* // returns Infinity
*
* x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/

// MODULES //

var ldexp = __webpack_require__( 8397 );


// EXPORTS //

module.exports = ldexp;


/***/ }),

/***/ 8397:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = __webpack_require__( 24165 );
var NINF = __webpack_require__( 42918 );
var BIAS = __webpack_require__( 66315 );
var MAX_EXPONENT = __webpack_require__( 89777 );
var MAX_SUBNORMAL_EXPONENT = __webpack_require__( 66988 );
var MIN_SUBNORMAL_EXPONENT = __webpack_require__( 53690 );
var isnan = __webpack_require__( 21883 );
var isInfinite = __webpack_require__( 57011 );
var copysign = __webpack_require__( 55848 );
var normalize = __webpack_require__( 4948 );
var floatExp = __webpack_require__( 18478 );
var toWords = __webpack_require__( 77838 );
var fromWords = __webpack_require__( 72490 );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Infinity, 11 );
* // returns Infinity
*
* @example
* var x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/
function ldexp( frac, exp ) {
	var high;
	var m;
	if (
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( FRAC, frac );
	frac = FRAC[ 0 ];
	exp += FRAC[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	toWords( WORDS, frac );
	high = WORDS[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = ldexp;


/***/ }),

/***/ 44772:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Constructor which returns a `Number` object.
*
* @module @stdlib/number-ctor
*
* @example
* var Number = require( '@stdlib/number-ctor' );
*
* var v = new Number( 10.0 );
* // returns <Number>
*/

// MODULES //

var Number = __webpack_require__( 7548 );


// EXPORTS //

module.exports = Number;


/***/ }),

/***/ 7548:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals


/***/ }),

/***/ 18478:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/number-float64-base-exponent
*
* @example
* var exponent = require( '@stdlib/number-float64-base-exponent' );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns -1023
*
* exp = exponent( NaN );
* // returns 1024
*/

// MODULES //

var exponent = __webpack_require__( 44500 );


// EXPORTS //

module.exports = exponent;


/***/ }),

/***/ 44500:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var getHighWord = __webpack_require__( 41921 );
var EXP_MASK = __webpack_require__( 93105 );
var BIAS = __webpack_require__( 66315 );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* @example
* var exp = exponent( -3.14 );
* // returns 1
*
* @example
* var exp = exponent( 0.0 );
* // returns -1023
*
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return (high - BIAS)|0; // asm type annotation
}


// EXPORTS //

module.exports = exponent;


/***/ }),

/***/ 72490:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number-float64-base-from-words
*
* @example
* var fromWords = require( '@stdlib/number-float64-base-from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/

// MODULES //

var fromWords = __webpack_require__( 79639 );


// EXPORTS //

module.exports = fromWords;


/***/ }),

/***/ 64445:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var isLittleEndian = __webpack_require__( 65902 );


// MAIN //

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;


/***/ }),

/***/ 79639:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var Uint32Array = __webpack_require__( 4773 );
var Float64Array = __webpack_require__( 57382 );
var indices = __webpack_require__( 64445 );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
*
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
*
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* @example
* var v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWords;


/***/ }),

/***/ 75646:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var isLittleEndian = __webpack_require__( 65902 );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;


/***/ }),

/***/ 41921:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number-float64-base-get-high-word
*
* @example
* var getHighWord = require( '@stdlib/number-float64-base-get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = __webpack_require__( 96285 );


// EXPORTS //

module.exports = getHighWord;


/***/ }),

/***/ 96285:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var Uint32Array = __webpack_require__( 4773 );
var Float64Array = __webpack_require__( 57382 );
var HIGH = __webpack_require__( 75646 );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
}


// EXPORTS //

module.exports = getHighWord;


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Return a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/number-float64-base-normalize
*
* @example
* var normalize = require( '@stdlib/number-float64-base-normalize' );
* var pow = require( '@stdlib/math-base-special-pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array-float64' );
* var normalize = require( '@stdlib/number-float64-base-normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*/

// MODULES //

var normalize = __webpack_require__( 59422 );


// EXPORTS //

module.exports = normalize;


/***/ }),

/***/ 59422:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var fcn = __webpack_require__( 78857 );


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math-base-special-pow' );
*
* var out = normalize( [ 0.0, 0 ], 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array-float64' );
* var pow = require( '@stdlib/math-base-special-pow' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*
* @example
* var out = normalize( [ 0.0, 0 ], 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = normalize;


/***/ }),

/***/ 78857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var FLOAT64_SMALLEST_NORMAL = __webpack_require__( 96488 );
var isInfinite = __webpack_require__( 57011 );
var isnan = __webpack_require__( 21883 );
var abs = __webpack_require__( 513 );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math-base-special-pow' );
*
* var out = normalize( [ 0.0, 0 ], 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( [ 0.0, 0 ], 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( [ 0.0, 0 ], Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ 0 ] = x;
		out[ 1 ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ 0 ] = x * SCALAR;
		out[ 1 ] = -52;
		return out;
	}
	out[ 0 ] = x;
	out[ 1 ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;


/***/ }),

/***/ 77838:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Split a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number-float64-base-to-words
*
* @example
* var toWords = require( '@stdlib/number-float64-base-to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array-uint32' );
* var toWords = require( '@stdlib/number-float64-base-to-words' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var toWords = __webpack_require__( 74010 );


// EXPORTS //

module.exports = toWords;


/***/ }),

/***/ 5782:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var isLittleEndian = __webpack_require__( 65902 );


// MAIN //

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;


/***/ }),

/***/ 74010:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var fcn = __webpack_require__( 54903 );


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array-uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = toWords;


/***/ }),

/***/ 54903:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var Uint32Array = __webpack_require__( 4773 );
var Float64Array = __webpack_require__( 57382 );
var indices = __webpack_require__( 5782 );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var Uint32Array = require( '@stdlib/array-uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ 0 ] = UINT32_VIEW[ HIGH ];
	out[ 1 ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;


/***/ }),

/***/ 36208:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



/**
* Return a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils-native-class
*
* @example
* var nativeClass = require( '@stdlib/utils-native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = __webpack_require__( 53123 );
var builtin = __webpack_require__( 7407 );
var polyfill = __webpack_require__( 74210 );


// MAIN //

var nativeClass;
if ( hasToStringTag() ) {
	nativeClass = polyfill;
} else {
	nativeClass = builtin;
}


// EXPORTS //

module.exports = nativeClass;


/***/ }),

/***/ 7407:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var toStr = __webpack_require__( 70173 );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
}


// EXPORTS //

module.exports = nativeClass;


/***/ }),

/***/ 74210:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MODULES //

var hasOwnProp = __webpack_require__( 9048 );
var toStringTag = __webpack_require__( 1403 );
var toStr = __webpack_require__( 70173 );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
}


// EXPORTS //

module.exports = nativeClass;


/***/ }),

/***/ 70173:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;


/***/ }),

/***/ 1403:
/***/ (function(module) {

"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;


/***/ }),

/***/ 27843:
/***/ (function(module) {

!function(t,n){ true?module.exports=function(t,n,e,i,o){for(n=n.split?n.split("."):n,i=0;i<n.length;i++)t=t?t[n[i]]:o;return t===o?e:t}:0}(this);
//# sourceMappingURL=dlv.umd.js.map


/***/ }),

/***/ 22341:
/***/ (function(__unused_webpack_module, exports) {

function dset(obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x, k;
	while (i < l) {
		k = keys[i++];
		if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
		t = t[k] = (i === l) ? val : (typeof(x=t[k])===typeof(keys)) ? x : (keys[i]*0 !== 0 || !!~(''+keys[i]).indexOf('.')) ? {} : [];
	}
}

exports.dset = dset;

/***/ }),

/***/ 80374:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
for(var r=[],o=0;o<64;)r[o]=0|4294967296*Math.sin(++o%Math.PI);/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(t){var e,f,n,a=[e=1732584193,f=4023233417,~e,~f],c=[],h=unescape(encodeURI(t))+"",u=h.length;for(t=--u/4+2|15,c[--t]=8*u;~u;)c[u>>2]|=h.charCodeAt(u)<<8*u--;for(o=h=0;o<t;o+=16){for(u=a;h<64;u=[n=u[3],e+((n=u[0]+[e&f|~e&n,n&e|~n&f,e^f^n,f^(e|~n)][u=h>>4]+r[h]+~~c[o|15&[h,5*h+1,3*h+5,7*h][u]])<<(u=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*u+h++%4])|n>>>-u),e,f])e=0|u[1],f=u[2];for(h=4;h;)a[--h]+=u[h]}for(t="";h<32;)t+=(a[h>>3]>>4*(1^h++)&15).toString(16);return t}
//# sourceMappingURL=index.mjs.map


/***/ })

}]);
//# sourceMappingURL=tsub-middleware.4eb5162ef76f991d.js.map