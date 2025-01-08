"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[8150],{

/***/ 83997:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadLegacyVideoPlugins: function() { return /* binding */ loadLegacyVideoPlugins; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42487);

function loadLegacyVideoPlugins(analytics) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__awaiter */ .mG)(this, void 0, void 0, function () {
        var plugins;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__generator */ .Jh)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __webpack_require__.e(/* import() */ 9799).then(__webpack_require__.t.bind(__webpack_require__, 69799, 23))
                    // This is super gross, but we need to support the `window.analytics.plugins` namespace
                    // that is linked in the segment docs in order to be backwards compatible with ajs-classic
                    // @ts-expect-error
                ];
                case 1:
                    plugins = _a.sent();
                    // This is super gross, but we need to support the `window.analytics.plugins` namespace
                    // that is linked in the segment docs in order to be backwards compatible with ajs-classic
                    // @ts-expect-error
                    analytics._plugins = plugins;
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=legacyVideos.1c59c6c4c3c086b5.js.map