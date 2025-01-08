"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[9214],{

/***/ 65212:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   remoteMiddlewares: function() { return /* binding */ remoteMiddlewares; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42487);
/* harmony import */ var _core_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79677);
/* harmony import */ var _lib_load_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63822);
/* harmony import */ var _lib_parse_cdn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91329);




function remoteMiddlewares(ctx, settings, obfuscate) {
    var _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__awaiter */ .mG)(this, void 0, void 0, function () {
        var path, remoteMiddleware, names, scripts, middleware;
        var _this = this;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__generator */ .Jh)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if ((0,_core_environment__WEBPACK_IMPORTED_MODULE_1__/* .isServer */ .s)()) {
                        return [2 /*return*/, []];
                    }
                    path = (0,_lib_parse_cdn__WEBPACK_IMPORTED_MODULE_2__/* .getNextIntegrationsURL */ .Kg)();
                    remoteMiddleware = (_a = settings.enabledMiddleware) !== null && _a !== void 0 ? _a : {};
                    names = Object.entries(remoteMiddleware)
                        .filter(function (_a) {
                        var _ = _a[0], enabled = _a[1];
                        return enabled;
                    })
                        .map(function (_a) {
                        var name = _a[0];
                        return name;
                    });
                    scripts = names.map(function (name) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__awaiter */ .mG)(_this, void 0, void 0, function () {
                        var nonNamespaced, bundleName, fullPath, error_1;
                        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__generator */ .Jh)(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    nonNamespaced = name.replace('@segment/', '');
                                    bundleName = nonNamespaced;
                                    if (obfuscate) {
                                        bundleName = btoa(nonNamespaced).replace(/=/g, '');
                                    }
                                    fullPath = "".concat(path, "/middleware/").concat(bundleName, "/latest/").concat(bundleName, ".js.gz");
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, (0,_lib_load_script__WEBPACK_IMPORTED_MODULE_3__/* .loadScript */ .v)(fullPath)
                                        // @ts-ignore
                                    ];
                                case 2:
                                    _a.sent();
                                    // @ts-ignore
                                    return [2 /*return*/, window["".concat(nonNamespaced, "Middleware")]];
                                case 3:
                                    error_1 = _a.sent();
                                    ctx.log('error', error_1);
                                    ctx.stats.increment('failed_remote_middleware');
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(scripts)];
                case 1:
                    middleware = _b.sent();
                    middleware = middleware.filter(Boolean);
                    return [2 /*return*/, middleware];
            }
        });
    });
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=remoteMiddleware.2404211cb76044ee.js.map