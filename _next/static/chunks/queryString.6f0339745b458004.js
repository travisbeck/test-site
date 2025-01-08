"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[3096],{

/***/ 44669:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  queryString: function() { return /* binding */ queryString; }
});

;// CONCATENATED MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/core/query-string/pickPrefix.js
/**
 * Returns an object containing only the properties prefixed by the input
 * string.
 * Ex: prefix('ajs_traits_', { ajs_traits_address: '123 St' })
 * will return { address: '123 St' }
 **/
function pickPrefix(prefix, object) {
    return Object.keys(object).reduce(function (acc, key) {
        if (key.startsWith(prefix)) {
            var field = key.substr(prefix.length);
            acc[field] = object[key];
        }
        return acc;
    }, {});
}
//# sourceMappingURL=pickPrefix.js.map
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/core/query-string/gracefulDecodeURIComponent.js
var gracefulDecodeURIComponent = __webpack_require__(87554);
;// CONCATENATED MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/core/query-string/index.js


function queryString(analytics, query) {
    var a = document.createElement('a');
    a.href = query;
    var parsed = a.search.slice(1);
    var params = parsed.split('&').reduce(function (acc, str) {
        var _a = str.split('='), k = _a[0], v = _a[1];
        acc[k] = (0,gracefulDecodeURIComponent/* gracefulDecodeURIComponent */.a)(v);
        return acc;
    }, {});
    var calls = [];
    var ajs_uid = params.ajs_uid, ajs_event = params.ajs_event, ajs_aid = params.ajs_aid;
    if (ajs_aid) {
        var anonId = Array.isArray(params.ajs_aid)
            ? params.ajs_aid[0]
            : params.ajs_aid;
        analytics.setAnonymousId(anonId);
    }
    if (ajs_uid) {
        var uid = Array.isArray(params.ajs_uid)
            ? params.ajs_uid[0]
            : params.ajs_uid;
        var traits = pickPrefix('ajs_trait_', params);
        calls.push(analytics.identify(uid, traits));
    }
    if (ajs_event) {
        var event_1 = Array.isArray(params.ajs_event)
            ? params.ajs_event[0]
            : params.ajs_event;
        var props = pickPrefix('ajs_prop_', params);
        calls.push(analytics.track(event_1, props));
    }
    return Promise.all(calls);
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=queryString.6f0339745b458004.js.map