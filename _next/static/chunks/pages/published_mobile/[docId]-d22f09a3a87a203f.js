(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[3733],{

/***/ 76283:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/published_mobile/[docId]",
      function () {
        return __webpack_require__(84321);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 84321:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Page: function() { return /* binding */ Page; },
/* harmony export */   __N_SSG: function() { return /* binding */ __N_SSG; },
/* harmony export */   maxDuration: function() { return /* binding */ maxDuration; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52322);
/* harmony import */ var appProviders_sites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19833);
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95405);
/* harmony import */ var sections_docs_published__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95077);
/* harmony import */ var utils_deviceDetection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(92035);





const MOBILE_USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";
var __N_SSG = true;
const maxDuration = 30;
const Page = (param)=>{
    let { docId, doc, flags } = param;
    if (config__WEBPACK_IMPORTED_MODULE_2__/* .config */ .v.DEBUG_ENABLED) {
        console.log("%c @@@@@@@@@@@@@@@@@@@@@@@ [PublishedPage MOBILE] docId", "background-color: pink; font-weight: bold", docId, doc);
    }
    // Ensures deviceDetection renders in desktop mode when we render on server-side
    // todo: pass the user's actual user agent, not a generic one
    // todo: find some way to encapsulate this for a request, so we don't leak the user agent to other requests
    utils_deviceDetection__WEBPACK_IMPORTED_MODULE_4__/* .UAParser */ .MP.setUA(MOBILE_USER_AGENT);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(sections_docs_published__WEBPACK_IMPORTED_MODULE_3__/* .PublishedPage */ .k, {
        docId: docId,
        doc: doc,
        flags: flags
    });
};
/* harmony default export */ __webpack_exports__["default"] = ((0,appProviders_sites__WEBPACK_IMPORTED_MODULE_1__/* .withGammaSiteProviders */ .v)(Page));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [3273,7662,4424,6694,8433,4078,2182,8707,9025,146,2812,8774,5333,9542,5417,3661,1012,4566,2888,9774,179], function() { return __webpack_exec__(76283); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=[docId]-d22f09a3a87a203f.js.map