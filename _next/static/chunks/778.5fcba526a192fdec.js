"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[778],{

/***/ 60778:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoomPanel: function() { return /* binding */ LoomPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52322);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(17993);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(74409);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(62614);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(77533);
/* harmony import */ var _gamma_app_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64253);
/* harmony import */ var _lingui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5879);
/* harmony import */ var _lingui_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(87254);
/* harmony import */ var _loomhq_record_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61770);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2784);
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(95405);
/* harmony import */ var modules_api_healthCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1547);
/* harmony import */ var modules_tiptap_editor_extensions_media_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(46007);
/* harmony import */ var _components_URLFetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1960);
/* harmony import */ var _EmbedMetadata__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(29689);












const LOOM_APP_ID = config__WEBPACK_IMPORTED_MODULE_4__/* .config */ .v.APPLICATION_ENVIRONMENT === "dev" ? "9d1115d2-34a8-45a5-8e3e-55064589896b" : "5653e0e4-f7db-49a7-a75b-aacc56db22e4";
const LoomPanel = (param)=>{
    let { editor, updateAttributes, currentAttributes } = param;
    const { isInOfflineMode } = (0,modules_api_healthCheck__WEBPACK_IMPORTED_MODULE_5__/* .useHealthCheck */ .$)();
    const recordRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
    const [isRecordSDKSupported, setRecordSDKSupported] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const canRecord = isRecordSDKSupported && !isInOfflineMode;
    const url = (0,modules_tiptap_editor_extensions_media_utils__WEBPACK_IMPORTED_MODULE_6__/* .getMediaEmbedUrl */ .NW)(currentAttributes);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (isInOfflineMode) return;
        (0,_loomhq_record_sdk__WEBPACK_IMPORTED_MODULE_2__/* .isSupported */ .Gb)().then((param)=>{
            let { supported, error } = param;
            if (error) console.warn("Loom recordSDK not supported due to: ".concat(error));
            setRecordSDKSupported(supported);
        });
    }, [
        isInOfflineMode
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (!canRecord || recordRef.current === null) return;
        let loomTeardown;
        (0,_loomhq_record_sdk__WEBPACK_IMPORTED_MODULE_2__/* .setup */ .cY)({
            publicAppId: LOOM_APP_ID,
            config: {
                defaultRecordingType: _loomhq_record_sdk__WEBPACK_IMPORTED_MODULE_2__/* .RecordingType */ .yy.CameraOnly
            }
        }).then((param)=>{
            let { configureButton, teardown } = param;
            if (recordRef.current === null) {
                teardown() // Button deleted before setup completed
                ;
                return;
            }
            loomTeardown = teardown;
            const sdkButton = configureButton({
                element: recordRef.current
            });
            sdkButton.on("insert-click", (video)=>{
                const { sharedUrl } = video;
                (0,_components_URLFetcher__WEBPACK_IMPORTED_MODULE_7__/* .fetchAndUpdateEmbedAttrsForUrlAndUploadThumbnail */ .ft)(sharedUrl, updateAttributes);
            });
        });
        return ()=>{
            if (loomTeardown) loomTeardown();
        };
    }, [
        recordRef,
        updateAttributes,
        canRecord
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__/* .VStack */ .g, {
        align: "stretch",
        spacing: 4,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__/* .VStack */ .g, {
                align: "stretch",
                spacing: 2,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__/* .Heading */ .X, {
                        size: "md",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_lingui_react__WEBPACK_IMPORTED_MODULE_11__/* .Trans */ .cC, {
                            id: "FK9Qbk"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_gamma_app_ui__WEBPACK_IMPORTED_MODULE_1__/* .GammaTooltip */ .kH, {
                        placement: "top",
                        label: !isRecordSDKSupported ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_lingui_react__WEBPACK_IMPORTED_MODULE_11__/* .Trans */ .cC, {
                            id: "Tnx6na"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_lingui_react__WEBPACK_IMPORTED_MODULE_11__/* .Trans */ .cC, {
                            id: "SPlisu"
                        }),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__/* .Button */ .z, {
                            ref: recordRef,
                            isDisabled: !canRecord,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_lingui_react__WEBPACK_IMPORTED_MODULE_11__/* .Trans */ .cC, {
                                id: "IJaotC"
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__/* .Text */ .x, {
                color: "gray.500",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_lingui_react__WEBPACK_IMPORTED_MODULE_11__/* .Trans */ .cC, {
                    id: "+gsW0v"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_URLFetcher__WEBPACK_IMPORTED_MODULE_7__/* .URLFetcher */ .v, {
                currentUrl: url,
                updateAttributes: updateAttributes,
                placeholder: _lingui_core__WEBPACK_IMPORTED_MODULE_14__/* .i18n */ .ag._({
                    id: "dX1T6f"
                })
            }),
            url && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_EmbedMetadata__WEBPACK_IMPORTED_MODULE_8__/* .EmbedMetadata */ .E, {
                editor: editor,
                updateAttributes: updateAttributes,
                currentAttributes: currentAttributes
            })
        ]
    });
};


/***/ })

}]);
//# sourceMappingURL=778.5fcba526a192fdec.js.map