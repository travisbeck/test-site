"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[9464],{

/***/ 41323:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: function() { return /* binding */ isPlanEventEnabled; }
/* harmony export */ });
/**
 * Determines whether a track event is allowed to be sent based on the
 * user's tracking plan.
 * If the user does not have a tracking plan or the event is allowed based
 * on the tracking plan configuration, returns true.
 */
function isPlanEventEnabled(plan, planEvent) {
    var _a, _b;
    // Always prioritize the event's `enabled` status
    if (typeof (planEvent === null || planEvent === void 0 ? void 0 : planEvent.enabled) === 'boolean') {
        return planEvent.enabled;
    }
    // Assume absence of a tracking plan means events are enabled
    return (_b = (_a = plan === null || plan === void 0 ? void 0 : plan.__default) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : true;
}
//# sourceMappingURL=is-plan-event-enabled.js.map

/***/ }),

/***/ 17761:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  LegacyDestination: function() { return /* binding */ LegacyDestination; },
  ajsDestinations: function() { return /* binding */ ajsDestinations; }
});

// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(42487);
// EXTERNAL MODULE: ../../node_modules/@segment/facade/dist/index.js
var dist = __webpack_require__(64122);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/core/connection/index.js
var connection = __webpack_require__(91946);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/core/context/index.js + 3 modules
var context = __webpack_require__(61668);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/core/environment/index.js
var environment = __webpack_require__(79677);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/core/queue/delivery.js
var delivery = __webpack_require__(37759);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/lib/as-promise.js
var as_promise = __webpack_require__(37624);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/lib/is-plan-event-enabled.js
var is_plan_event_enabled = __webpack_require__(41323);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/lib/merged-options.js
var merged_options = __webpack_require__(53826);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/lib/p-while.js
var p_while = __webpack_require__(42578);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/lib/priority-queue/index.js + 1 modules
var priority_queue = __webpack_require__(98552);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/lib/priority-queue/persisted.js
var persisted = __webpack_require__(46804);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/plugins/middleware/index.js
var middleware = __webpack_require__(18767);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/lib/parse-cdn.js
var parse_cdn = __webpack_require__(91329);
// EXTERNAL MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/lib/load-script.js
var load_script = __webpack_require__(63822);
;// CONCATENATED MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/plugins/ajs-destination/loader.js



function normalizeName(name) {
    return name.toLowerCase().replace('.', '').replace(/\s+/g, '-');
}
function obfuscatePathName(pathName, obfuscate) {
    if (obfuscate === void 0) { obfuscate = false; }
    return obfuscate ? btoa(pathName).replace(/=/g, '') : undefined;
}
function recordLoadMetrics(fullPath, ctx, name) {
    var _a, _b;
    try {
        var metric = ((_b = (_a = window === null || window === void 0 ? void 0 : window.performance) === null || _a === void 0 ? void 0 : _a.getEntriesByName(fullPath, 'resource')) !== null && _b !== void 0 ? _b : [])[0];
        // we assume everything that took under 100ms is cached
        metric &&
            ctx.stats.gauge('legacy_destination_time', Math.round(metric.duration), (0,tslib_es6/* __spreadArray */.ev)([
                name
            ], (metric.duration < 100 ? ['cached'] : []), true));
    }
    catch (_) {
        // not available
    }
}
function loadIntegration(ctx, analyticsInstance, name, version, settings, obfuscate) {
    return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
        var pathName, obfuscatedPathName, path, fullPath, err_1, deps, integrationBuilder, analyticsStub, integration;
        return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pathName = normalizeName(name);
                    obfuscatedPathName = obfuscatePathName(pathName, obfuscate);
                    path = (0,parse_cdn/* getNextIntegrationsURL */.Kg)();
                    fullPath = "".concat(path, "/integrations/").concat(obfuscatedPathName !== null && obfuscatedPathName !== void 0 ? obfuscatedPathName : pathName, "/").concat(version, "/").concat(obfuscatedPathName !== null && obfuscatedPathName !== void 0 ? obfuscatedPathName : pathName, ".dynamic.js.gz");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0,load_script/* loadScript */.v)(fullPath)];
                case 2:
                    _a.sent();
                    recordLoadMetrics(fullPath, ctx, name);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    ctx.stats.gauge('legacy_destination_time', -1, ["plugin:".concat(name), "failed"]);
                    throw err_1;
                case 4:
                    deps = window["".concat(pathName, "Deps")];
                    return [4 /*yield*/, Promise.all(deps.map(function (dep) { return (0,load_script/* loadScript */.v)(path + dep + '.gz'); }))
                        // @ts-ignore
                    ];
                case 5:
                    _a.sent();
                    // @ts-ignore
                    window["".concat(pathName, "Loader")]();
                    integrationBuilder = window["".concat(pathName, "Integration")];
                    // GA and Appcues use a different interface to instantiating integrations
                    if (integrationBuilder.Integration) {
                        analyticsStub = {
                            user: function () { return analyticsInstance.user(); },
                            addIntegration: function () { },
                        };
                        integrationBuilder(analyticsStub);
                        integrationBuilder = integrationBuilder.Integration;
                    }
                    integration = new integrationBuilder(settings);
                    integration.analytics = analyticsInstance;
                    return [2 /*return*/, integration];
            }
        });
    });
}
function unloadIntegration(name, version, obfuscate) {
    return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
        var path, pathName, obfuscatedPathName, fullPath;
        return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
            path = (0,parse_cdn/* getNextIntegrationsURL */.Kg)();
            pathName = normalizeName(name);
            obfuscatedPathName = obfuscatePathName(name, obfuscate);
            fullPath = "".concat(path, "/integrations/").concat(obfuscatedPathName !== null && obfuscatedPathName !== void 0 ? obfuscatedPathName : pathName, "/").concat(version, "/").concat(obfuscatedPathName !== null && obfuscatedPathName !== void 0 ? obfuscatedPathName : pathName, ".dynamic.js.gz");
            return [2 /*return*/, (0,load_script/* unloadScript */.t)(fullPath)];
        });
    });
}
function resolveVersion(settings) {
    var _a, _b, _c, _d;
    return ((_d = (_b = (_a = settings.versionSettings) === null || _a === void 0 ? void 0 : _a.override) !== null && _b !== void 0 ? _b : (_c = settings.versionSettings) === null || _c === void 0 ? void 0 : _c.version) !== null && _d !== void 0 ? _d : 'latest');
}
//# sourceMappingURL=loader.js.map
;// CONCATENATED MODULE: ../../node_modules/@segment/analytics-next/dist/pkg/plugins/ajs-destination/index.js














function flushQueue(xt, queue) {
    return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
        var failedQueue;
        var _this = this;
        return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failedQueue = [];
                    if ((0,connection/* isOffline */.s)()) {
                        return [2 /*return*/, queue];
                    }
                    return [4 /*yield*/, (0,p_while/* pWhile */.x)(function () { return queue.length > 0 && (0,connection/* isOnline */.G)(); }, function () { return (0,tslib_es6/* __awaiter */.mG)(_this, void 0, void 0, function () {
                            var ctx, result, success;
                            return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ctx = queue.pop();
                                        if (!ctx) {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, (0,delivery/* attempt */.a)(ctx, xt)];
                                    case 1:
                                        result = _a.sent();
                                        success = result instanceof context/* Context */._;
                                        if (!success) {
                                            failedQueue.push(ctx);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                        // re-add failed tasks
                    ];
                case 1:
                    _a.sent();
                    // re-add failed tasks
                    failedQueue.map(function (failed) { return queue.pushWithBackoff(failed); });
                    return [2 /*return*/, queue];
            }
        });
    });
}
var LegacyDestination = /** @class */ (function () {
    function LegacyDestination(name, version, settings, options) {
        if (settings === void 0) { settings = {}; }
        this.options = {};
        this.type = 'destination';
        this.middleware = [];
        this._ready = false;
        this._initialized = false;
        this.flushing = false;
        this.name = name;
        this.version = version;
        this.settings = (0,tslib_es6/* __assign */.pi)({}, settings);
        this.disableAutoISOConversion = options.disableAutoISOConversion || false;
        // AJS-Renderer sets an extraneous `type` setting that clobbers
        // existing type defaults. We need to remove it if it's present
        if (this.settings['type'] && this.settings['type'] === 'browser') {
            delete this.settings['type'];
        }
        this.options = options;
        this.buffer = options.disableClientPersistence
            ? new priority_queue/* PriorityQueue */.Z(4, [])
            : new persisted/* PersistedPriorityQueue */.$(4, "dest-".concat(name));
        this.scheduleFlush();
    }
    LegacyDestination.prototype.isLoaded = function () {
        return this._ready;
    };
    LegacyDestination.prototype.ready = function () {
        var _a;
        return (_a = this.onReady) !== null && _a !== void 0 ? _a : Promise.resolve();
    };
    LegacyDestination.prototype.load = function (ctx, analyticsInstance) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this._ready || this.onReady !== undefined) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, loadIntegration(ctx, analyticsInstance, this.name, this.version, this.settings, this.options.obfuscate)];
                    case 1:
                        _a.integration = _b.sent();
                        this.onReady = new Promise(function (resolve) {
                            var onReadyFn = function () {
                                _this._ready = true;
                                resolve(true);
                            };
                            _this.integration.once('ready', onReadyFn);
                        });
                        this.onInitialize = new Promise(function (resolve) {
                            var onInit = function () {
                                _this._initialized = true;
                                resolve(true);
                            };
                            _this.integration.on('initialize', onInit);
                        });
                        try {
                            ctx.stats.increment('analytics_js.integration.invoke', 1, [
                                "method:initialize",
                                "integration_name:".concat(this.name),
                            ]);
                            this.integration.initialize();
                        }
                        catch (error) {
                            ctx.stats.increment('analytics_js.integration.invoke.error', 1, [
                                "method:initialize",
                                "integration_name:".concat(this.name),
                            ]);
                            throw error;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LegacyDestination.prototype.unload = function (_ctx, _analyticsInstance) {
        return unloadIntegration(this.name, this.version, this.options.obfuscate);
    };
    LegacyDestination.prototype.addMiddleware = function () {
        var _a;
        var fn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fn[_i] = arguments[_i];
        }
        this.middleware = (_a = this.middleware).concat.apply(_a, fn);
    };
    LegacyDestination.prototype.shouldBuffer = function (ctx) {
        return (
        // page events can't be buffered because of destinations that automatically add page views
        ctx.event.type !== 'page' &&
            ((0,connection/* isOffline */.s)() || this._ready === false || this._initialized === false));
    };
    LegacyDestination.prototype.send = function (ctx, clz, eventType) {
        var _a, _b;
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var plan, ev, planEvent, afterMiddleware, event, err_1;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.shouldBuffer(ctx)) {
                            this.buffer.push(ctx);
                            this.scheduleFlush();
                            return [2 /*return*/, ctx];
                        }
                        plan = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.plan) === null || _b === void 0 ? void 0 : _b.track;
                        ev = ctx.event.event;
                        if (plan && ev && this.name !== 'Segment.io') {
                            planEvent = plan[ev];
                            if (!(0,is_plan_event_enabled/* isPlanEventEnabled */.n)(plan, planEvent)) {
                                ctx.updateEvent('integrations', (0,tslib_es6/* __assign */.pi)((0,tslib_es6/* __assign */.pi)({}, ctx.event.integrations), { All: false, 'Segment.io': true }));
                                ctx.cancel(new context/* ContextCancelation */.Y({
                                    retry: false,
                                    reason: "Event ".concat(ev, " disabled for integration ").concat(this.name, " in tracking plan"),
                                    type: 'Dropped by plan',
                                }));
                                return [2 /*return*/, ctx];
                            }
                            else {
                                ctx.updateEvent('integrations', (0,tslib_es6/* __assign */.pi)((0,tslib_es6/* __assign */.pi)({}, ctx.event.integrations), planEvent === null || planEvent === void 0 ? void 0 : planEvent.integrations));
                            }
                            if ((planEvent === null || planEvent === void 0 ? void 0 : planEvent.enabled) && (planEvent === null || planEvent === void 0 ? void 0 : planEvent.integrations[this.name]) === false) {
                                ctx.cancel(new context/* ContextCancelation */.Y({
                                    retry: false,
                                    reason: "Event ".concat(ev, " disabled for integration ").concat(this.name, " in tracking plan"),
                                    type: 'Dropped by plan',
                                }));
                                return [2 /*return*/, ctx];
                            }
                        }
                        return [4 /*yield*/, (0,middleware.applyDestinationMiddleware)(this.name, ctx.event, this.middleware)];
                    case 1:
                        afterMiddleware = _c.sent();
                        if (afterMiddleware === null) {
                            return [2 /*return*/, ctx];
                        }
                        event = new clz(afterMiddleware, {
                            traverse: !this.disableAutoISOConversion,
                        });
                        ctx.stats.increment('analytics_js.integration.invoke', 1, [
                            "method:".concat(eventType),
                            "integration_name:".concat(this.name),
                        ]);
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 5, , 6]);
                        if (!this.integration) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0,as_promise/* asPromise */.O)(this.integration.invoke.call(this.integration, eventType, event))];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _c.sent();
                        ctx.stats.increment('analytics_js.integration.invoke.error', 1, [
                            "method:".concat(eventType),
                            "integration_name:".concat(this.name),
                        ]);
                        throw err_1;
                    case 6: return [2 /*return*/, ctx];
                }
            });
        });
    };
    LegacyDestination.prototype.track = function (ctx) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
                return [2 /*return*/, this.send(ctx, dist.Track, 'track')];
            });
        });
    };
    LegacyDestination.prototype.page = function (ctx) {
        var _a;
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var _this = this;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                if (((_a = this.integration) === null || _a === void 0 ? void 0 : _a._assumesPageview) && !this._initialized) {
                    this.integration.initialize();
                }
                return [2 /*return*/, this.onInitialize.then(function () {
                        return _this.send(ctx, dist.Page, 'page');
                    })];
            });
        });
    };
    LegacyDestination.prototype.identify = function (ctx) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
                return [2 /*return*/, this.send(ctx, dist.Identify, 'identify')];
            });
        });
    };
    LegacyDestination.prototype.alias = function (ctx) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
                return [2 /*return*/, this.send(ctx, dist.Alias, 'alias')];
            });
        });
    };
    LegacyDestination.prototype.group = function (ctx) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
                return [2 /*return*/, this.send(ctx, dist.Group, 'group')];
            });
        });
    };
    LegacyDestination.prototype.scheduleFlush = function () {
        var _this = this;
        if (this.flushing) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(function () { return (0,tslib_es6/* __awaiter */.mG)(_this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.flushing = true;
                        _a = this;
                        return [4 /*yield*/, flushQueue(this, this.buffer)];
                    case 1:
                        _a.buffer = _b.sent();
                        this.flushing = false;
                        if (this.buffer.todo > 0) {
                            this.scheduleFlush();
                        }
                        return [2 /*return*/];
                }
            });
        }); }, Math.random() * 5000);
    };
    return LegacyDestination;
}());

function ajsDestinations(settings, globalIntegrations, options, routingMiddleware) {
    var _a, _b;
    if (globalIntegrations === void 0) { globalIntegrations = {}; }
    if (options === void 0) { options = {}; }
    if ((0,environment/* isServer */.s)()) {
        return [];
    }
    if (settings.plan) {
        options = options !== null && options !== void 0 ? options : {};
        options.plan = settings.plan;
    }
    var routingRules = (_b = (_a = settings.middlewareSettings) === null || _a === void 0 ? void 0 : _a.routingRules) !== null && _b !== void 0 ? _b : [];
    // merged remote CDN settings with user provided options
    var integrationOptions = (0,merged_options/* mergedOptions */.o)(settings, options !== null && options !== void 0 ? options : {});
    return Object.entries(settings.integrations)
        .map(function (_a) {
        var _b;
        var name = _a[0], integrationSettings = _a[1];
        if (name.startsWith('Segment')) {
            return;
        }
        var allDisableAndNotDefined = globalIntegrations.All === false &&
            globalIntegrations[name] === undefined;
        if (globalIntegrations[name] === false || allDisableAndNotDefined) {
            return;
        }
        var type = integrationSettings.type, bundlingStatus = integrationSettings.bundlingStatus, versionSettings = integrationSettings.versionSettings;
        // We use `!== 'unbundled'` (versus `=== 'bundled'`) to be inclusive of
        // destinations without a defined value for `bundlingStatus`
        var deviceMode = bundlingStatus !== 'unbundled' &&
            (type === 'browser' ||
                ((_b = versionSettings === null || versionSettings === void 0 ? void 0 : versionSettings.componentTypes) === null || _b === void 0 ? void 0 : _b.includes('browser')));
        // checking for iterable is a quick fix we need in place to prevent
        // errors showing Iterable as a failed destiantion. Ideally, we should
        // fix the Iterable metadata instead, but that's a longer process.
        if ((!deviceMode && name !== 'Segment.io') || name === 'Iterable') {
            return;
        }
        var version = resolveVersion(integrationSettings);
        var destination = new LegacyDestination(name, version, integrationOptions[name], options);
        var routing = routingRules.filter(function (rule) { return rule.destinationName === name; });
        if (routing.length > 0 && routingMiddleware) {
            destination.addMiddleware(routingMiddleware);
        }
        return destination;
    })
        .filter(function (xt) { return xt !== undefined; });
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=ajs-destination.94d109c303890d34.js.map