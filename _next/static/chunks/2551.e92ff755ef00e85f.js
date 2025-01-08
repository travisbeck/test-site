"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[2551],{

/***/ 22551:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Tldraw: function() { return /* binding */ Tldraw; }
});

// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(52322);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs
var chunk_PULVB27S = __webpack_require__(28535);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/utils/dist/chunk-M3TFMUOL.mjs
var chunk_M3TFMUOL = __webpack_require__(79729);
// EXTERNAL MODULE: ../../node_modules/@tldraw/tldraw/dist-esm/index.mjs + 295 modules
var dist_esm = __webpack_require__(92574);
// EXTERNAL MODULE: ../../node_modules/react/index.js
var react = __webpack_require__(2784);
// EXTERNAL MODULE: ./src/modules/user/index.ts + 12 modules
var user = __webpack_require__(88873);
// EXTERNAL MODULE: ../../node_modules/@tiptap/core/dist/index.js
var dist = __webpack_require__(37243);
// EXTERNAL MODULE: ./src/modules/media/index.ts
var media = __webpack_require__(72842);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Clipboard/parseExternalHtml.ts
var parseExternalHtml = __webpack_require__(50738);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/media/Image/index.ts + 3 modules
var Image = __webpack_require__(6643);
// EXTERNAL MODULE: ./src/utils/image.tsx
var utils_image = __webpack_require__(97912);
// EXTERNAL MODULE: ../../node_modules/@tiptap/extension-bold/dist/index.js
var extension_bold_dist = __webpack_require__(86900);
// EXTERNAL MODULE: ../../node_modules/@tiptap/extension-code/dist/index.js
var extension_code_dist = __webpack_require__(31187);
// EXTERNAL MODULE: ../../node_modules/@tiptap/extension-document/dist/index.js
var extension_document_dist = __webpack_require__(42626);
// EXTERNAL MODULE: ../../node_modules/@tiptap/extension-history/dist/index.js + 2 modules
var extension_history_dist = __webpack_require__(86509);
// EXTERNAL MODULE: ../../node_modules/@tiptap/extension-italic/dist/index.js
var extension_italic_dist = __webpack_require__(9432);
// EXTERNAL MODULE: ../../node_modules/@tiptap/extension-text/dist/index.js
var extension_text_dist = __webpack_require__(39615);
// EXTERNAL MODULE: ../../node_modules/@tiptap/extension-underline/dist/index.js
var extension_underline_dist = __webpack_require__(39475);
// EXTERNAL MODULE: ./src/modules/theming/styles/heading.ts + 1 modules
var heading = __webpack_require__(42392);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/components/menus/FormattingMenus/index.ts
var FormattingMenus = __webpack_require__(20728);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/BlockClass.ts + 1 modules
var BlockClass = __webpack_require__(50576);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/BubbleMenu/bubble-menu-plugin.ts
var bubble_menu_plugin = __webpack_require__(23307);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Emoji/index.tsx + 2 modules
var Emoji = __webpack_require__(35013);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Font/FontSize.ts
var FontSize = __webpack_require__(20145);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/HardBreak/index.ts
var HardBreak = __webpack_require__(97509);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Heading/Heading.ts + 1 modules
var Heading = __webpack_require__(57941);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/HorizontalAlign/HorizontalAlign.ts
var HorizontalAlign = __webpack_require__(9325);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Link/Link.ts + 2 modules
var Link = __webpack_require__(78694);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Paragraph/Paragraph.ts + 1 modules
var Paragraph = __webpack_require__(41086);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Strike.ts
var Strike = __webpack_require__(94694);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/TextColor/index.ts + 2 modules
var TextColor = __webpack_require__(63162);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/react/index.ts + 1 modules
var tiptap_editor_react = __webpack_require__(27210);
;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/textbox/TextboxEditor.tsx
























// Mini prosemirror editor for use inside Tldraw
const getTextboxExtensions = ()=>{
    return [
        // Editor logic
        extension_document_dist/* Document */.B.extend({
            content: "block+"
        }),
        extension_history_dist/* History */.A,
        BlockClass/* BlockClass */.l,
        // Text
        Paragraph/* Paragraph */.n,
        extension_text_dist/* Text */.x,
        Emoji/* EmojiNode */.Hy,
        Heading/* Heading */.X6.configure({
            HTMLAttributes: {
                class: heading/* HEADING_CLASS */.A8
            }
        }),
        HardBreak/* HardBreak */.U,
        FontSize/* FontSize */.Bf,
        // Marks
        extension_bold_dist/* Bold */.d8,
        extension_underline_dist/* Underline */.v,
        extension_italic_dist/* Italic */.Tx,
        TextColor/* TextColor */.d,
        TextColor/* Highlight */.y,
        HorizontalAlign/* HorizontalAlign */.Kq,
        Strike/* Strike */.R,
        Link/* Link */.r.extend({
            excludes: "underline link",
            renderHTML (param) {
                let { HTMLAttributes } = param;
                const { href } = HTMLAttributes;
                // Simplify the HTML to keep SVGs small
                return [
                    "a",
                    {
                        ...this.options.HTMLAttributes,
                        href,
                        class: "link"
                    },
                    0
                ];
            }
        }).configure({
            openOnClick: false
        }),
        extension_code_dist/* Code */.EK,
        // Menus
        bubble_menu_plugin/* BubbleMenu */.NM,
        Emoji/* EmojiShortcuts */.Pi
    ];
};
const TextboxEditor = (param)=>{
    let { isEditing, disableGradients, ...props } = param;
    const extensions = (0,react.useMemo)(()=>getTextboxExtensions(), []);
    const editor = (0,tiptap_editor_react/* useEditor */.jE)({
        extensions,
        parseOptions: {
            preserveWhitespace: "full"
        },
        ...props,
        editable: true
    });
    (0,react.useEffect)(()=>{
        if (isEditing) {
            editor === null || editor === void 0 ? void 0 : editor.commands.focus();
            editor.setEditable(true);
        } else {
            editor === null || editor === void 0 ? void 0 : editor.commands.blur();
            editor.setEditable(false);
        }
    }, [
        isEditing,
        editor
    ]);
    editor.isThumbnail = true;
    editor.shouldUseLiteMenus = true;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_PULVB27S/* Box */.xu, {
        sx: {
            width: "100%"
        },
        className: disableGradients ? heading/* HEADING_NO_GRADIENT_CLASS */.LY : undefined,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(tiptap_editor_react/* EditorContent */.kg, {
                style: {
                    width: "100%"
                },
                className: "text",
                editor: editor
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(FormattingMenus/* FormattingMenu */.uH, {
                editor: editor,
                // This needs to go outside the shape itself because transform: scale confuses Tippy
                appendToSelector: "[data-tldraw-menu-root]"
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/setupContentHandlers.ts







const acceptedImageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml"
];
const uploadFilePromise = (file, orgId)=>{
    return new Promise((resolve, reject)=>{
        (0,media/* uploadFile */.cT)(file, orgId, {
            onUploadComplete: (result)=>resolve(result),
            onUploadFailed: (error)=>reject(error)
        });
    });
};
// Based on https://github.com/tldraw/tldraw/blob/main/apps/examples/src/examples/hosted-images/HostedImagesExample.tsx
const setupContentHandlers = (editor, orgId)=>{
    editor.registerExternalAssetHandler("file", async (param)=>{
        let { file } = param;
        const id = (0,dist_esm/* uniqueId */.ELf)();
        if (!orgId) {
            throw new Error("[useAssetUpload] OrgId is required to upload assets");
        }
        const tempUrl = URL.createObjectURL(file);
        console.debug("[useAssetUpload] Handling upload for file", {
            file,
            id,
            tempUrl
        });
        const createAsset = (result)=>{
            const { src, meta } = result;
            const assetId = dist_esm/* AssetRecordType */.Ykc.createId((0,dist_esm/* getHashForString */.jKo)(src));
            const asset = dist_esm/* AssetRecordType */.Ykc.create({
                id: assetId,
                type: "image",
                typeName: "asset",
                props: {
                    name: file.name,
                    src,
                    w: meta.width,
                    h: meta.height,
                    mimeType: file.type,
                    isAnimated: meta.frame_count ? meta.frame_count > 1 : false
                }
            });
            console.debug("[useAssetUpload] Upload complete", {
                src,
                meta,
                asset
            });
            return asset;
        };
        const asset = await uploadFilePromise(file, orgId).then(createAsset);
        return asset;
    });
    // Copied from https://github.com/tldraw/tldraw/blob/main/packages/tldraw/src/lib/defaultExternalContentHandlers.ts
    // https://github.com/tldraw/tldraw/issues/2808
    editor.registerExternalContentHandler("files", async (param)=>{
        let { point, files } = param;
        const position = point !== null && point !== void 0 ? point : editor.inputs.shiftKey ? editor.inputs.currentPagePoint : editor.getViewportPageCenter();
        const pagePoint = dist_esm/* Vec */.B08.From(position);
        const currentPoint = dist_esm/* Vec */.B08.From(position);
        const shapeIds = await Promise.all(files.map(async (file)=>{
            // Use mime type instead of file ext, this is because
            // window.navigator.clipboard does not preserve file names
            // of copied files.
            if (!file.type) {
                throw new Error("No mime type");
            }
            // Limit to only images
            if (!acceptedImageMimeTypes.includes(file.type)) {
                console.warn("".concat(file.name, " not loaded - Extension not allowed."));
                return null;
            }
            try {
                const size = await dist_esm/* MediaHelpers */.xeI.getImageSize(file);
                // Create an image with a temp URL
                const id = (0,dist_esm/* createShapeId */.F17)();
                const imageShape = {
                    id,
                    type: "image",
                    x: currentPoint.x - size.w / 2,
                    y: currentPoint.y - size.h / 2,
                    opacity: 1,
                    props: {
                        w: size.w,
                        h: size.h,
                        tempUrl: URL.createObjectURL(file),
                        uploadStatus: "uploading"
                    }
                };
                // Mark this point so that undo doesn't include the intermediary loading state
                editor.mark("upload-image-".concat(id));
                editor.createShape(imageShape);
                currentPoint.x += size.w;
                // Start the upload and then update the shape with the asset when ready
                editor.getAssetForExternalContent({
                    type: "file",
                    file
                }).then((asset)=>{
                    if (!asset) {
                        throw Error("Could not create an asset");
                    }
                    // Once upload is done, update the shape with the asset
                    editor.createAssets([
                        asset
                    ]);
                    editor.updateShape({
                        id,
                        type: "image",
                        props: {
                            assetId: asset.id,
                            uploadStatus: "done",
                            tempUrl: undefined
                        }
                    });
                });
                return id;
            } catch (error) {
                console.error(error);
            }
            return null;
        }));
        const createdShapes = shapeIds.filter(Boolean);
        editor.select(...createdShapes);
        // Zoom out to fit the shape, if necessary
        centerSelectionAroundPoint(editor, pagePoint);
    });
    const schema = (0,dist/* getSchema */.J1)([
        ...getTextboxExtensions(),
        Image/* Image */.Ee
    ]);
    // Handle copying a single image from the editor
    // Based on https://tldraw.dev/examples/data/assets/external-content-sources
    editor.registerExternalContentHandler("text", async (param)=>{
        let { point, sources } = param;
        const htmlSource = sources === null || sources === void 0 ? void 0 : sources.find((s)=>s.type === "text" && s.subtype === "html");
        if (!htmlSource) return;
        // Check if the html is a single image
        const { content } = (0,parseExternalHtml/* parseExternalHtml */.T)(htmlSource.data, schema);
        const image = content.firstChild;
        if (!image || content.childCount > 1 || image.type.name !== "image") {
            // future: handle pastes of multiple images, or images with text, or other html
            return;
        }
        const { src, meta } = image.attrs;
        if (!src || (0,utils_image/* shouldUploadRemoteUrl */.dW)(src)) {
            // future: handle uploading images from elsewhere
            return;
        }
        const position = point !== null && point !== void 0 ? point : editor.inputs.shiftKey ? editor.inputs.currentPagePoint : editor.getViewportPageCenter();
        const pagePoint = dist_esm/* Vec */.B08.From(position);
        const currentPoint = dist_esm/* Vec */.B08.From(position);
        var _meta_width, _meta_height;
        const size = {
            w: (_meta_width = meta === null || meta === void 0 ? void 0 : meta.width) !== null && _meta_width !== void 0 ? _meta_width : 250,
            h: (_meta_height = meta === null || meta === void 0 ? void 0 : meta.height) !== null && _meta_height !== void 0 ? _meta_height : 150
        };
        const assetId = dist_esm/* AssetRecordType */.Ykc.createId((0,dist_esm/* getHashForString */.jKo)(src));
        const asset = dist_esm/* AssetRecordType */.Ykc.create({
            id: assetId,
            type: "image",
            typeName: "asset",
            props: {
                name: src,
                src,
                w: size.w,
                h: size.h,
                mimeType: "image",
                isAnimated: (meta === null || meta === void 0 ? void 0 : meta.frame_count) ? meta.frame_count > 1 : false
            }
        });
        const shapeId = (0,dist_esm/* createShapeId */.F17)();
        const imageShape = {
            id: shapeId,
            type: "image",
            x: currentPoint.x - size.w / 2,
            y: currentPoint.y - size.h / 2,
            opacity: 1,
            props: {
                w: size.w,
                h: size.h,
                uploadStatus: "done",
                assetId: asset.id
            }
        };
        editor.createAssets([
            asset
        ]).createShape(imageShape).select(shapeId);
        // Zoom out to fit the shape, if necessary
        centerSelectionAroundPoint(editor, pagePoint);
    });
};
function centerSelectionAroundPoint(editor, position) {
    // Re-position shapes so that the center of the group is at the provided point
    const viewportPageBounds = editor.getViewportPageBounds();
    let selectionPageBounds = editor.getSelectionPageBounds();
    if (selectionPageBounds) {
        const offset = selectionPageBounds.center.sub(position);
        editor.updateShapes(editor.getSelectedShapes().map((shape)=>{
            const localRotation = editor.getShapeParentTransform(shape).decompose().rotation;
            const localDelta = dist_esm/* Vec */.B08.Rot(offset, -localRotation);
            return {
                id: shape.id,
                type: shape.type,
                x: shape.x - localDelta.x,
                y: shape.y - localDelta.y
            };
        }));
    }
    // Zoom out to fit the shapes, if necessary
    selectionPageBounds = editor.getSelectionPageBounds();
    if (selectionPageBounds && !viewportPageBounds.contains(selectionPageBounds)) {
        editor.zoomToSelection();
    }
}

// EXTERNAL MODULE: ./src/modules/theming/styles/shapeColor.ts
var shapeColor = __webpack_require__(56216);
// EXTERNAL MODULE: ./src/modules/tldraw2/styles.ts + 1 modules
var styles = __webpack_require__(32802);
;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/textbox/utils.ts
const getFlexAlign = (align)=>{
    if (align === "middle") {
        return "center";
    }
    return align;
};
const getTextAlign = (align)=>{
    return ({
        start: "left",
        middle: "center",
        end: "right"
    })[align];
};
const applyCssVars = (el, vars)=>{
    if (!vars) return;
    Object.entries(vars).forEach((param)=>{
        let [key, value] = param;
        if (value === undefined) {
            return;
        }
        el.style.setProperty(key, value.toString());
    });
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/geo/GammaGeoShape.ts

// GeoStyle = the geometric shape
const GammaShapeStyle = dist_esm/* StyleProp */.fVw.defineEnum("tldraw:geo", {
    defaultValue: "rectangle",
    values: [
        "rectangle",
        "ellipse",
        "triangle",
        "diamond",
        "hexagon",
        "rhombus",
        "arrow-right",
        "cloud"
    ]
});
const GammaColorStyle = dist_esm/* StyleProp */.fVw.define("gamma:color", {
    type: dist_esm.T.nullable(dist_esm.T.string),
    defaultValue: null
});
const GammaStrokeWidthStyle = dist_esm/* StyleProp */.fVw.defineEnum("gamma:strokeWidth", {
    defaultValue: "sm",
    values: [
        "none",
        "sm",
        "md",
        "lg"
    ]
});
const gammaGeoShapeProps = {
    ...dist_esm/* geoShapeProps */.eGT,
    html: dist_esm.T.optional(dist_esm.T.string),
    geo: GammaShapeStyle,
    shapeColor: GammaColorStyle,
    strokeWidth: GammaStrokeWidthStyle
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/arrow/GammaArrowShape.ts


const gammaArrowShapeProps = {
    ...dist_esm/* arrowShapeProps */.si8,
    shapeColor: GammaColorStyle,
    strokeWidth: GammaStrokeWidthStyle
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/arrow/GammaArrowShapeUtil.tsx








class GammaArrowShapeUtil extends dist_esm/* ArrowShapeUtil */.YCq {
    getDefaultProps() {
        return {
            ...super.getDefaultProps(),
            shapeColor: null,
            strokeWidth: "sm"
        };
    }
    component(shape) {
        const color = shape.props.shapeColor;
        const colorVars = (0,shapeColor/* getShapeColorOverrideVars */.jP)(color, 0);
        const strokeWidth = (0,styles/* getStrokeWidth */.F)(shape.props.strokeWidth, true);
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
            style: {
                ...colorVars,
                "--stroke-width": strokeWidth
            },
            children: super.component(shape)
        });
    }
    toSvg(shape, ctx) {
        var _g_querySelector;
        const g = super.toSvg(shape, ctx);
        (_g_querySelector = g.querySelector("text[stroke-width]")) === null || _g_querySelector === void 0 ? void 0 : _g_querySelector.remove() // Remove the extra text mask element that tldraw creates
        ;
        g.dataset.shapeType = "arrow";
        const colorVars = (0,shapeColor/* getShapeColorOverrideVars */.jP)(shape.props.shapeColor, 0);
        applyCssVars(g, colorVars);
        const strokeWidth = (0,styles/* getStrokeWidth */.F)(shape.props.strokeWidth, true);
        g.style.setProperty("--stroke-width", strokeWidth.toString());
        return g;
    }
}
GammaArrowShapeUtil.props = gammaArrowShapeProps;

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/textbox/textboxSize.ts
const MIN_SIZE_WITH_LABEL = 17 * 3;
// When the user types, check if the size of the box needs to get bigger
// Forked from https://github.com/tldraw/tldraw/blob/93c2ed615c61f09a3d4936c2ed06bcebd85cf363/packages/tldraw/src/lib/shapes/geo/GeoShapeUtil.tsx#L923
// to use our new props + getLabelSize
const onBeforeUpdate = (prev, next, editor)=>{
    const prevHtml = prev.props.html;
    const nextHtml = next.props.html;
    if (prevHtml === nextHtml) {
        return next;
    }
    if (prevHtml && !nextHtml) {
        return {
            ...next,
            props: {
                ...next.props,
                growY: 0
            }
        };
    }
    const prevWidth = prev.props.w;
    const prevHeight = prev.props.h;
    const nextSize = getLabelSize(editor, next.id);
    if (!nextSize) return;
    const nextWidth = nextSize.w;
    const nextHeight = nextSize.h;
    // When entering the first character in a label (not pasting in multiple characters...)
    if (!prevHtml && nextHtml && nextHtml.length === 1) {
        let w = Math.max(prevWidth, nextWidth);
        let h = Math.max(prevHeight, nextHeight);
        // If both the width and height were less than the minimum size, make the shape square
        if (prev.props.w < MIN_SIZE_WITH_LABEL && prev.props.h < MIN_SIZE_WITH_LABEL) {
            w = Math.max(w, MIN_SIZE_WITH_LABEL);
            h = Math.max(h, MIN_SIZE_WITH_LABEL);
            w = Math.max(w, h);
            h = Math.max(w, h);
        }
        // Don't set a growY—at least, not until we've implemented a growX property
        return {
            ...next,
            props: {
                ...next.props,
                w,
                h,
                growY: 0
            }
        };
    }
    let growY = null;
    if (nextHeight > prevHeight) {
        growY = nextHeight - prevHeight;
    } else {
        if (prev.props.growY) {
            growY = 0;
        }
    }
    if (growY !== null) {
        return {
            ...next,
            props: {
                ...next.props,
                growY,
                w: next.props.autoSize ? nextWidth : Math.max(next.props.w, nextWidth)
            }
        };
    }
    if (nextWidth > prev.props.w) {
        return {
            ...next,
            props: {
                ...next.props,
                w: nextWidth
            }
        };
    }
    return next;
};
// Forked from https://github.com/tldraw/tldraw/blob/93c2ed615c61f09a3d4936c2ed06bcebd85cf363/packages/tldraw/src/lib/shapes/geo/GeoShapeUtil.tsx#L882 to use our new props + getLabelSize
const onBeforeCreate = (shape, editor)=>{
    var _getLabelSize;
    if (!shape.props.html) {
        if (shape.props.growY) {
            // No text / some growY, set growY to 0
            return {
                ...shape,
                props: {
                    ...shape.props,
                    growY: 0
                }
            };
        } else {
            // No text / no growY, nothing to change
            return;
        }
    }
    const prevHeight = shape.props.h;
    const nextHeight = (_getLabelSize = getLabelSize(editor, shape.id)) === null || _getLabelSize === void 0 ? void 0 : _getLabelSize.h;
    if (!nextHeight) return;
    let growY = null;
    if (nextHeight > prevHeight) {
        growY = nextHeight - prevHeight;
    } else {
        if (shape.props.growY) {
            growY = 0;
        }
    }
    if (growY !== null) {
        return {
            ...shape,
            props: {
                ...shape.props,
                growY
            }
        };
    }
    return;
};
const getLabelSize = (editor, id)=>{
    const container = editor.getContainer();
    if (!container) return;
    const textboxElt = container.querySelector('[data-textbox-id="'.concat(id, '"]'));
    const editorElt = textboxElt === null || textboxElt === void 0 ? void 0 : textboxElt.querySelector(".ProseMirror");
    if (!editorElt) return;
    if (editorElt.textContent === "") return; // Prevent measuring before the editor has content, which can happen while opening the editor
    return {
        w: editorElt.offsetWidth,
        h: editorElt.offsetHeight
    };
};

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs
var chunk_KRPLQIP4 = __webpack_require__(38035);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Clipboard/utils.ts
var utils = __webpack_require__(48972);
// EXTERNAL MODULE: ../../node_modules/@tldraw/editor/dist-esm/index.mjs + 88 modules
var editor_dist_esm = __webpack_require__(5109);
;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/textbox/useEditableText.ts
/* eslint-disable no-inner-declarations */ 

// Simplified version of https://github.com/tldraw/tldraw/blob/main/packages/tldraw/src/lib/shapes/shared/useEditableText.ts
function useEditableText(id) {
    const editor = (0,editor_dist_esm/* useEditor */.jE2)();
    const isEditing = (0,editor_dist_esm/* useValue */.HgN)("isEditing", ()=>editor.getEditingShapeId() === id, [
        editor,
        id
    ]);
    // When the label blurs, deselect all of the text and complete.
    // This makes it so that the canvas does not have to be focused
    // in order to exit the editing state and complete the editing state
    const handleBlur = (0,react.useCallback)((e)=>{
        // If focus jumps within the formatting menu (eg when opening a dropdown)
        // then don't complete editing
        if (e.relatedTarget instanceof Element && e.relatedTarget.closest('[data-in-editor-focus="true"]')) {
            return;
        }
        if (e.target instanceof Element && e.target.closest('[data-in-editor-focus="true"]')) {
            return;
        }
        requestAnimationFrame(()=>{
            var _window_getSelection;
            (_window_getSelection = window.getSelection()) === null || _window_getSelection === void 0 ? void 0 : _window_getSelection.removeAllRanges();
            // Tells tldraw that we're done editing
            editor.complete();
        });
    }, [
        editor
    ]);
    const handleInputPointerDown = (0,react.useCallback)((e)=>{
        if (e.target instanceof Element && e.target.closest('[data-in-editor-focus="true"]')) {
            // If you click inside the formatting menu, dont forward that event to the shape
            (0,editor_dist_esm/* stopEventPropagation */.beA)(e);
            return;
        }
        editor.dispatch({
            ...(0,editor_dist_esm/* getPointerInfo */.YyG)(e),
            type: "pointer",
            name: "pointer_down",
            target: "shape",
            shape: editor.getShape(id)
        });
        (0,editor_dist_esm/* stopEventPropagation */.beA)(e) // we need to prevent blurring the input
        ;
    }, [
        editor,
        id
    ]);
    const handleDoubleClick = editor_dist_esm/* stopEventPropagation */.beA;
    return {
        isEditing,
        handleInputPointerDown,
        handleDoubleClick,
        handleBlur
    };
}

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/textbox/GammaTextbox.tsx







// Based on https://github.com/tldraw/tldraw/blob/main/packages/tldraw/src/lib/shapes/shared/TextLabel.tsx
const GammaTextbox = (param)=>{
    let { tlEditor, shape, disableGradients, autosize } = param;
    const { id, type, props } = shape;
    const { align, html } = props;
    const verticalAlign = "verticalAlign" in props ? props.verticalAlign : "start" // Text shape doesnt have vertical align
    ;
    const onUpdate = (param)=>{
        let { editor: pmEditor } = param;
        const newContent = pmEditor.state.doc.content;
        const serializedHtml = (0,utils/* serializeFragmentToHtml */.G8)(newContent, pmEditor.schema);
        tlEditor.updateShapes([
            {
                id,
                type,
                props: {
                    html: serializedHtml,
                    // We don't use the "text" prop, but Tldraw has checks all over the place to see if a shape has text
                    // inside or is empty, e.g. when hovering on the label, so we need to update it
                    text: pmEditor.state.doc.textContent
                }
            }
        ]);
    };
    const isSelected = (0,dist_esm/* useValue */.HgN)("isSelected", ()=>tlEditor.getSelectedShapeIds().includes(id) && tlEditor.getSelectedShapeIds().length === 1, [
        tlEditor,
        id
    ]);
    const { handleInputPointerDown, handleDoubleClick, handleBlur, isEditing } = useEditableText(id);
    const textAlign = getTextAlign(align);
    const flexAlign = getFlexAlign(align);
    const flexJustify = getFlexAlign(verticalAlign !== null && verticalAlign !== void 0 ? verticalAlign : "middle");
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_KRPLQIP4/* Flex */.k, {
        className: "textbox",
        "data-textbox-id": id,
        "data-autosize": autosize,
        css: {
            "--horizontal-align": flexAlign,
            "--vertical-align": flexJustify,
            "--text-align": textAlign
        },
        w: "100%",
        h: "100%",
        pointerEvents: isSelected ? "auto" : "none",
        userSelect: isEditing ? "text" : "none",
        cursor: isEditing ? "text" : undefined,
        outlineOffset: "-2px",
        outline: isEditing ? "2px solid var(--chakra-ring-color)" : undefined,
        // This is needed to prevent selection jumping to end
        onPointerDown: handleInputPointerDown,
        onDoubleClick: handleDoubleClick,
        onBlur: handleBlur,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(TextboxEditor, {
            content: html,
            onUpdate: onUpdate,
            isEditing: isEditing,
            disableGradients: disableGradients,
            autosize: autosize
        })
    });
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/geo/GammaGeo.tsx





// Forked from https://github.com/tldraw/tldraw/blob/93c2ed615c61f09a3d4936c2ed06bcebd85cf363/packages/tldraw/src/lib/shapes/geo/GeoShapeUtil.tsx#L362
const GammaGeo = (param)=>{
    let { shape, editor } = param;
    const geometry = editor.getShapeGeometry(shape);
    const data = getShapePathData(shape, geometry);
    const { fill, shapeColor: color, strokeWidth } = shape.props;
    // We pass 1 as fillOpacity because we apply opacity separately
    const bgColorVars = (0,shapeColor/* getShapeColorOverrideVars */.jP)(color, 1);
    const strokeWidthPx = (0,styles/* getStrokeWidth */.F)(strokeWidth, fill === "none");
    const svgVars = {
        ...bgColorVars
    };
    const { textColorVars } = (0,shapeColor/* getTextColorVarsForBackground */.Yw)(fill === "none" ? undefined : color);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(dist_esm/* SVGContainer */.gkc, {
                id: shape.id,
                style: svgVars,
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                    d: data,
                    "data-fill": fill,
                    color: color || undefined,
                    style: {
                        fillOpacity: fill === "semi" ? 0.5 : fill === "none" ? 0 : 1,
                        strokeWidth: strokeWidthPx
                    }
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(dist_esm/* HTMLContainer */.G7H, {
                id: shape.id,
                style: {
                    width: shape.props.w,
                    height: shape.props.h + shape.props.growY,
                    ...textColorVars
                },
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(GammaTextbox, {
                    tlEditor: editor,
                    shape: shape,
                    disableGradients: Boolean(color && fill !== "none")
                })
            })
        ]
    });
};
const getShapePathData = (shape, geometry)=>{
    if (shape.props.geo === "ellipse") {
        const { w, h, growY } = shape.props;
        const cx = w / 2;
        const cy = (h + growY) / 2;
        const rx = Math.max(0, cx);
        const ry = Math.max(0, cy);
        return "M".concat(cx - rx, ",").concat(cy, "a").concat(rx, ",").concat(ry, ",0,1,1,").concat(rx * 2, ",0a").concat(rx, ",").concat(ry, ",0,1,1,-").concat(rx * 2, ",0");
    } else {
        const outline = geometry instanceof dist_esm/* Group2d */.mqq ? geometry.children[0].vertices : geometry.vertices;
        const rounded = getRoundedPolygonPoints(shape.id, outline);
        return getRoundedPolygonPath(rounded);
    }
};
// Everything below copied from https://github.com/tldraw/tldraw/blob/6cd498a1ed6420c04a1a522115a381eb0e4bff75/packages/tldraw/src/lib/shapes/shared/polygon-helpers.ts#L54
// (it wasnt exported)
/** @public */ function getRoundedPolygonPoints(id, outline) {
    let offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, roundness = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 4, passes = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
    const results = [];
    const random = (0,dist_esm/* rng */.Vkp)(id);
    let p0 = outline[0];
    let p1;
    const len = outline.length;
    for(let i = 0, n = len * passes; i < n; i++){
        p1 = dist_esm/* Vec */.B08.AddXY(outline[(i + 1) % len], random() * offset, random() * offset);
        const delta = dist_esm/* Vec */.B08.Sub(p1, p0);
        const distance = dist_esm/* Vec */.B08.Len(delta);
        const vector = dist_esm/* Vec */.B08.Div(delta, distance).mul(Math.min(distance / 4, roundness));
        results.push(dist_esm/* Vec */.B08.Add(p0, vector), dist_esm/* Vec */.B08.Add(p1, vector.neg()), p1);
        p0 = p1;
    }
    return results;
}
/** @public */ function getRoundedPolygonPath(points) {
    let polylineA = "M";
    const len = points.length;
    let p0;
    let p1;
    let p2;
    for(let i = 0, n = len; i < n; i += 3){
        p0 = points[i];
        p1 = points[i + 1];
        p2 = points[i + 2];
        polylineA += "".concat((0,dist_esm/* precise */.Yku)(p0), "L").concat((0,dist_esm/* precise */.Yku)(p1), "Q").concat((0,dist_esm/* precise */.Yku)(p2));
    }
    polylineA += "".concat((0,dist_esm/* precise */.Yku)(points[0]));
    return polylineA;
}

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/geo/geoSvg.ts






const geoToSvg = (shape, editor)=>{
    const { id, props } = shape;
    const geometry = editor.getShapeGeometry(shape);
    const { geo, shapeColor: color, fill, html, text, align, verticalAlign, strokeWidth } = props;
    const path = geo === "ellipse" ? ellipsePath(shape) : polygonPath(shape, geometry);
    if (fill === "semi") {
        path.style.setProperty("fill-opacity", "0.5");
    } else if (fill === "none") {
        path.style.setProperty("fill-opacity", "0");
    } else {
        path.style.setProperty("fill-opacity", "1");
    }
    path.setAttribute("id", id);
    // We pass 1 as fillOpacity because we apply opacity separately
    const colorVars = (0,shapeColor/* getShapeColorOverrideVars */.jP)(color, 1);
    const strokeWidthPx = (0,styles/* getStrokeWidth */.F)(strokeWidth, fill === "none");
    applyCssVars(path, colorVars);
    path.style.setProperty("stroke-width", strokeWidthPx.toString());
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.dataset.shapeType = "geo";
    g.appendChild(path);
    if (!text) {
        return g;
    }
    const bounds = geometry.bounds;
    const htmlContainer = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    htmlContainer.setAttribute("width", bounds.w.toString());
    htmlContainer.setAttribute("height", bounds.h.toString());
    if (color) {
        htmlContainer.classList.add(heading/* HEADING_NO_GRADIENT_CLASS */.LY);
        const { textColorVars } = (0,shapeColor/* getTextColorVarsForBackground */.Yw)(color);
        applyCssVars(htmlContainer, textColorVars);
    }
    const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
    div.innerHTML = '<div class="text">'.concat(html, "</div>");
    div.style.setProperty("--text-align", getTextAlign(align));
    div.style.setProperty("--horizontal-align", getFlexAlign(align));
    div.style.setProperty("--vertical-align", getFlexAlign(verticalAlign));
    div.classList.add("textbox");
    htmlContainer.appendChild(div);
    g.appendChild(htmlContainer);
    return g;
};
// Copied from https://github.com/tldraw/tldraw/blob/93c2ed615c61f09a3d4936c2ed06bcebd85cf363/packages/tldraw/src/lib/shapes/geo/components/DrawStylePolygon.tsx#L45
const polygonPath = (shape, geometry)=>{
    const outline = geometry instanceof dist_esm/* Group2d */.mqq ? geometry.children[0].vertices : geometry.vertices;
    const rounded = getRoundedPolygonPoints(shape.id, outline);
    const data = getRoundedPolygonPath(rounded);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", data);
    return path;
};
// Copied from https://github.com/tldraw/tldraw/blob/93c2ed615c61f09a3d4936c2ed06bcebd85cf363/packages/tldraw/src/lib/shapes/geo/components/SolidStyleEllipse.tsx#L33
const ellipsePath = (shape)=>{
    const { w, h, growY } = shape.props;
    const cx = w / 2;
    const cy = (h + growY) / 2;
    const rx = Math.max(0, cx);
    const ry = Math.max(0, cy);
    const d = "M".concat(cx - rx, ",").concat(cy, "a").concat(rx, ",").concat(ry, ",0,1,1,").concat(rx * 2, ",0a").concat(rx, ",").concat(ry, ",0,1,1,-").concat(rx * 2, ",0");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("width", w.toString());
    path.setAttribute("height", h.toString());
    return path;
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/geo/GammaGeoShapeUtil.tsx





const GammaGeoShapeUtil_MIN_SIZE_WITH_LABEL = (/* unused pure expression or super */ null && (17 * 3));
class GammaGeoShapeUtil extends dist_esm/* GeoShapeUtil */.YQh {
    getDefaultProps() {
        return {
            ...super.getDefaultProps(),
            html: "",
            shapeColor: null,
            strokeWidth: "sm"
        };
    }
    toSvg(shape, _ctx) {
        return geoToSvg(shape, this.editor);
    }
    component(shape) {
        return GammaGeo({
            shape,
            editor: this.editor
        });
    }
    // Fork original getGeometry to use our getLabelSize in calculating labelGeometry
    // Without this, clicking around the text can deselect the text
    // because of logic in https://github.com/tldraw/tldraw/blob/4cc823e22eab5d9e751a32c958e83d28d9eb8ec4/packages/tldraw/src/lib/tools/SelectTool/childStates/EditingShape.ts#L75
    // Forked from: https://github.com/tldraw/tldraw/blob/4cc823e22eab5d9e751a32c958e83d28d9eb8ec4/packages/tldraw/src/lib/shapes/geo/GeoShapeUtil.tsx#L309
    getGeometry(shape) {
        const geometry = super.getGeometry(shape);
        const [body, label] = geometry.children;
        if (!body || !label) return geometry;
        const labelSize = getLabelSize(this.editor, shape.id);
        if (!labelSize) return geometry;
        const w = Math.max(1, shape.props.w);
        const h = Math.max(1, shape.props.h + shape.props.growY);
        const labelWidth = Math.min(w, Math.max(labelSize.w, Math.min(32, Math.max(1, w - 8))));
        const labelHeight = Math.min(h, Math.max(labelSize.h, Math.min(32, Math.max(1, w - 8))));
        return new dist_esm/* Group2d */.mqq({
            children: [
                body,
                new dist_esm/* Rectangle2d */.zc7({
                    x: shape.props.align === "start" ? 0 : shape.props.align === "end" ? w - labelWidth : (w - labelWidth) / 2,
                    y: shape.props.verticalAlign === "start" ? 0 : shape.props.verticalAlign === "end" ? h - labelHeight : (h - labelHeight) / 2,
                    width: labelWidth,
                    height: labelHeight,
                    isFilled: true,
                    isLabel: true
                })
            ]
        });
    }
    constructor(...args){
        super(...args);
        this.onBeforeUpdate = (prev, next)=>{
            return onBeforeUpdate(prev, next, this.editor);
        };
        this.onBeforeCreate = (shape)=>{
            return onBeforeCreate(shape, this.editor);
        };
    }
}
GammaGeoShapeUtil.props = gammaGeoShapeProps;

// EXTERNAL MODULE: ../../node_modules/lodash/clamp.js
var clamp = __webpack_require__(27875);
var clamp_default = /*#__PURE__*/__webpack_require__.n(clamp);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/media/Placeholder/index.ts + 2 modules
var Placeholder = __webpack_require__(88424);
;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/image/GammaImageShape.ts


const gammaImageShapeProps = {
    ...dist_esm/* imageShapeProps */.FcS,
    tempUrl: dist_esm.T.string.optional(),
    uploadStatus: dist_esm.T.literalEnum("uploading", "done", "error").optional(),
    removeBackgroundStatus: dist_esm.T.literalEnum("idle", "in-progress").optional(),
    shapeColor: GammaColorStyle
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/image/GammaImageShapeUtil.tsx








class GammaImageShapeUtil extends dist_esm/* ImageShapeUtil */.Zow {
    getDefaultProps() {
        return {
            ...super.getDefaultProps(),
            shapeColor: null
        };
    }
    component(shape) {
        const isSvg = isSvgImage(shape, this.editor);
        const filterId = "recolor-".concat(shape.id);
        const image = isSvg && shape.props.shapeColor ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_PULVB27S/* Box */.xu, {
            sx: {
                ".tl-image": {
                    filter: "url(#".concat(filterId, ")")
                }
            },
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "0",
                    height: "0",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("defs", {
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("filter", {
                            id: filterId,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("feFlood", {
                                    floodColor: shape.props.shapeColor,
                                    result: "flood"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("feComposite", {
                                    in: "flood",
                                    in2: "SourceAlpha",
                                    operator: "in"
                                })
                            ]
                        })
                    })
                }),
                super.component(shape)
            ]
        }) : super.component(shape);
        const isRemovingBackground = shape.props.removeBackgroundStatus === "in-progress";
        if (shape.props.uploadStatus === "uploading" || isRemovingBackground) {
            // Adjust the size of the loading spinner based on the zoom level
            // This prevents it from looking tiny when zoomed out
            const counterZoomFactor = clamp_default()(1 / this.editor.getZoomLevel(), 0.75, 5);
            return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_PULVB27S/* Box */.xu, {
                style: {
                    "--temp-url": (0,utils_image/* backgroundImageFromUrls */.Ly)(shape.props.tempUrl)
                },
                "data-image-upload-status": shape.props.uploadStatus,
                pos: "relative",
                children: [
                    image,
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                        transform: "scale(".concat(counterZoomFactor, ")"),
                        transformOrigin: "top left",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(Placeholder/* MediaPlaceholderSpinner */.HI, {
                            removeBackground: isRemovingBackground
                        })
                    })
                ]
            });
        }
        return image;
    }
    // Forked from https://github.com/tldraw/tldraw/blob/5e54526776d0b8eca89f6c0ae6b194974810625c/packages/tldraw/src/lib/shapes/image/ImageShapeUtil.tsx#L177
    // to prevent fetching remote URLs
    async toSvg(shape) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const asset = shape.props.assetId ? this.editor.getAsset(shape.props.assetId) : null;
        if (!asset) return g;
        const src = (asset === null || asset === void 0 ? void 0 : asset.props.src) || "";
        const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS("http://www.w3.org/1999/xlink", "href", src);
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        g.appendChild(defs);
        const isSvg = isSvgImage(shape, this.editor);
        if (isSvg && shape.props.shapeColor) {
            const recolorId = "recolor-".concat(shape.id);
            image.style.setProperty("filter", "url(#".concat(recolorId, ")"));
            const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
            filter.setAttribute("id", recolorId);
            const flood = document.createElementNS("http://www.w3.org/2000/svg", "feFlood");
            flood.setAttribute("flood-color", shape.props.shapeColor);
            flood.setAttribute("result", "flood");
            filter.appendChild(flood);
            const composite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
            composite.setAttribute("in", "flood");
            composite.setAttribute("in2", "SourceAlpha");
            composite.setAttribute("operator", "in");
            filter.appendChild(composite);
            defs.appendChild(filter);
        }
        const containerStyle = getCroppedContainerStyle(shape);
        const crop = shape.props.crop;
        if (containerStyle.transform && crop) {
            const { transform, width, height } = containerStyle;
            const croppedWidth = (crop.bottomRight.x - crop.topLeft.x) * width;
            const croppedHeight = (crop.bottomRight.y - crop.topLeft.y) * height;
            const points = [
                new dist_esm/* Vec */.B08(0, 0),
                new dist_esm/* Vec */.B08(croppedWidth, 0),
                new dist_esm/* Vec */.B08(croppedWidth, croppedHeight),
                new dist_esm/* Vec */.B08(0, croppedHeight)
            ];
            const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute("points", points.map((p)=>"".concat(p.x, ",").concat(p.y)).join(" "));
            const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
            const cropId = "cropClipPath-".concat(shape.id);
            clipPath.setAttribute("id", cropId);
            clipPath.appendChild(polygon);
            defs.appendChild(clipPath);
            const innerElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
            innerElement.setAttribute("clip-path", "url(#".concat(cropId, ")"));
            image.setAttribute("width", width.toString());
            image.setAttribute("height", height.toString());
            image.style.transform = transform;
            innerElement.appendChild(image);
            g.appendChild(innerElement);
        } else {
            image.setAttribute("width", shape.props.w.toString());
            image.setAttribute("height", shape.props.h.toString());
            g.appendChild(image);
        }
        return g;
    }
}
GammaImageShapeUtil.props = gammaImageShapeProps;
// This fn wasn't exported from tldraw so I just copied it here, no change
/**
 * When an image is cropped we need to translate the image to show the portion withing the cropped
 * area. We do this by translating the image by the negative of the top left corner of the crop
 * area.
 *
 * @param shape - Shape The image shape for which to get the container style
 * @returns - Styles to apply to the image container
 */ function getCroppedContainerStyle(shape) {
    const crop = shape.props.crop;
    const topLeft = crop === null || crop === void 0 ? void 0 : crop.topLeft;
    if (!topLeft) {
        return {
            width: shape.props.w,
            height: shape.props.h
        };
    }
    const w = 1 / (crop.bottomRight.x - crop.topLeft.x) * shape.props.w;
    const h = 1 / (crop.bottomRight.y - crop.topLeft.y) * shape.props.h;
    const offsetX = -topLeft.x * w;
    const offsetY = -topLeft.y * h;
    return {
        transform: "translate(".concat(offsetX, "px, ").concat(offsetY, "px)"),
        width: w,
        height: h
    };
}
const isSvgImage = (shape, editor)=>{
    const asset = shape.props.assetId ? editor.getAsset(shape.props.assetId) : undefined;
    if (!asset) {
        var _shape_props_tempUrl;
        return (_shape_props_tempUrl = shape.props.tempUrl) === null || _shape_props_tempUrl === void 0 ? void 0 : _shape_props_tempUrl.endsWith(".svg");
    }
    return "mimeType" in asset.props && asset.props.mimeType === "image/svg+xml";
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/line/GammaLineShape.ts


const gammaLineShapeProps = {
    ...dist_esm/* lineShapeProps */.BGI,
    shapeColor: GammaColorStyle,
    strokeWidth: GammaStrokeWidthStyle
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/line/GammaLineShapeUtil.tsx








class GammaLineShapeUtil extends dist_esm/* LineShapeUtil */.Rwx {
    getDefaultProps() {
        return {
            ...super.getDefaultProps(),
            shapeColor: null,
            strokeWidth: "sm"
        };
    }
    component(shape) {
        const color = shape.props.shapeColor;
        const colorVars = (0,shapeColor/* getShapeColorOverrideVars */.jP)(color, 0);
        const strokeWidth = (0,styles/* getStrokeWidth */.F)(shape.props.strokeWidth, true);
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
            style: {
                ...colorVars,
                "--stroke-width": strokeWidth
            },
            children: super.component(shape)
        });
    }
    toSvg(shape, ctx) {
        const g = super.toSvg(shape, ctx);
        const outerG = document.createElementNS("http://www.w3.org/2000/svg", "g");
        outerG.dataset.shapeType = "line";
        const colorVars = (0,shapeColor/* getShapeColorOverrideVars */.jP)(shape.props.shapeColor, 0);
        applyCssVars(outerG, colorVars);
        const strokeWidth = (0,styles/* getStrokeWidth */.F)(shape.props.strokeWidth, true);
        g.style.setProperty("--stroke-width", strokeWidth.toString());
        outerG.appendChild(g);
        return outerG;
    }
}
GammaLineShapeUtil.props = gammaLineShapeProps;

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/text/GammaText.tsx




const GammaText = (param)=>{
    let { shape, editor } = param;
    const { shapeColor: color, autoSize } = shape.props;
    const textColorVars = (0,shapeColor/* getTextColorVars */.NC)(color);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(dist_esm/* HTMLContainer */.G7H, {
            id: shape.id,
            style: {
                width: autoSize ? "max-content" : shape.props.w,
                minWidth: autoSize ? "8em" : undefined,
                minHeight: "3.5em",
                right: "auto",
                left: "auto",
                height: shape.props.h + shape.props.growY,
                ...textColorVars
            },
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(GammaTextbox, {
                tlEditor: editor,
                shape: shape,
                autosize: autoSize,
                disableGradients: !!color
            })
        })
    });
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/text/GammaTextShape.ts


const gammaTextShapeProps = {
    ...dist_esm/* textShapeProps */.XBb,
    html: dist_esm.T.optional(dist_esm.T.string),
    shapeColor: GammaColorStyle,
    h: dist_esm.T.number,
    growY: dist_esm.T.number
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/text/textSvg.ts



const textToSvg = (shape, editor)=>{
    const { props } = shape;
    const geometry = editor.getShapeGeometry(shape);
    const { shapeColor: color, html, align } = props;
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (!html) {
        return g;
    }
    const bounds = geometry.bounds;
    const htmlContainer = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    // +1 gives a little wiggle room to prevent text wrapping
    htmlContainer.setAttribute("width", (bounds.w + 1).toString()) // +1 ensures we round up for fractions to prevent weird wrapping in SVGs
    ;
    htmlContainer.setAttribute("height", bounds.h.toString());
    if (color) {
        htmlContainer.classList.add(heading/* HEADING_NO_GRADIENT_CLASS */.LY);
        applyCssVars(htmlContainer, (0,shapeColor/* getTextColorVars */.NC)(color));
    }
    const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
    div.innerHTML = '<div class="text">'.concat(html, "</div>");
    div.style.setProperty("--text-align", getTextAlign(align));
    div.style.setProperty("--horizontal-align", getFlexAlign(align));
    if (shape.props.autoSize) {
        div.dataset.autosize = "true";
    }
    div.classList.add("textbox");
    htmlContainer.appendChild(div);
    g.appendChild(htmlContainer);
    return g;
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/shapes/text/GammaTextShapeUtil.tsx





const sizeCache = new dist_esm/* WeakMapCache */._cv();
const MIN_HEIGHT = 44 // In px, before any text is entered
;
const MIN_WIDTH = MIN_SIZE_WITH_LABEL;
class GammaTextShapeUtil extends dist_esm/* TextShapeUtil */.zBk {
    getDefaultProps() {
        return {
            ...super.getDefaultProps(),
            w: MIN_WIDTH,
            h: MIN_HEIGHT,
            growY: 0,
            html: "",
            shapeColor: null
        };
    }
    toSvg(shape, _ctx) {
        return textToSvg(shape, this.editor);
    }
    component(shape) {
        return GammaText({
            shape,
            editor: this.editor
        });
    }
    // Forked from https://github.com/tldraw/tldraw/blob/4cc823e22eab5d9e751a32c958e83d28d9eb8ec4/packages/tldraw/src/lib/shapes/text/TextShapeUtil.tsx#L49
    getMinDimensions(shape) {
        return sizeCache.get({
            id: shape.id,
            props: shape.props
        }, (param)=>{
            let { id, props } = param;
            const labelSize = getLabelSize(this.editor, id);
            if (labelSize) return {
                width: Math.max(MIN_WIDTH, labelSize.w),
                height: Math.max(MIN_HEIGHT, labelSize.h)
            };
            if (props) {
                return {
                    width: props.w,
                    height: props.h + props.growY
                };
            }
            return {
                width: MIN_WIDTH,
                height: MIN_HEIGHT
            };
        });
    }
    constructor(...args){
        super(...args);
        // Forked from https://github.com/tldraw/tldraw/blob/4cc823e22eab5d9e751a32c958e83d28d9eb8ec4/packages/tldraw/src/lib/shapes/text/TextShapeUtil.tsx#L260
        this.onEditEnd = (shape)=>{
            const { props: { html } } = shape;
            // Clean up the shape if the user deletes all the text
            if (!html || html.length === 0 || html === "<p></p>") {
                this.editor.deleteShapes([
                    shape.id
                ]);
            }
        };
        // Override the base text resize handler, which tries to scale text bigger or smaller
        // Forked from https://github.com/tldraw/tldraw/blob/4cc823e22eab5d9e751a32c958e83d28d9eb8ec4/packages/tldraw/src/lib/shapes/text/TextShapeUtil.tsx#L199
        this.onResize = (shape, info)=>{
            const { initialBounds, initialShape, handle } = info;
            let { scaleX } = info;
            if (handle === "top" || handle === "bottom") {
                scaleX = 1;
            }
            const prevWidth = initialBounds.width;
            let nextWidth = prevWidth * scaleX;
            const offset = new dist_esm/* Vec */.B08(0, 0);
            nextWidth = Math.max(1, Math.abs(nextWidth));
            if (handle.includes("left")) {
                offset.x = prevWidth - nextWidth;
                if (scaleX < 0) {
                    offset.x += nextWidth;
                }
            } else if (handle.includes("right")) {
                if (scaleX < 0) {
                    offset.x -= nextWidth;
                }
            } else {
                // Prevent moving side to side when you just resize top or bottom
                return {
                    x: initialShape.x
                };
            }
            const { x, y } = offset.rot(shape.rotation).add(initialShape);
            return {
                id: shape.id,
                type: shape.type,
                x,
                y,
                props: {
                    w: nextWidth / initialShape.props.scale,
                    autoSize: false
                }
            };
        };
        this.onBeforeUpdate = (prev, next)=>{
            return onBeforeUpdate(prev, next, this.editor);
        };
        this.onBeforeCreate = (shape)=>{
            return onBeforeCreate(shape, this.editor);
        };
    }
}
GammaTextShapeUtil.props = gammaTextShapeProps;

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-3ASUQ6PA.mjs
var chunk_3ASUQ6PA = __webpack_require__(29117);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/popover/dist/chunk-3WRTUQ76.mjs + 1 modules
var chunk_3WRTUQ76 = __webpack_require__(43679);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/popover/dist/chunk-OFUG2FGD.mjs
var chunk_OFUG2FGD = __webpack_require__(34071);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-NTCQBYKE.mjs
var chunk_NTCQBYKE = __webpack_require__(17993);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/button/dist/chunk-DA7QIPTJ.mjs
var chunk_DA7QIPTJ = __webpack_require__(75768);
// EXTERNAL MODULE: ../../node_modules/@fortawesome/pro-regular-svg-icons/index.mjs
var pro_regular_svg_icons = __webpack_require__(42946);
// EXTERNAL MODULE: ../../node_modules/@lingui/core/dist/index.mjs
var core_dist = __webpack_require__(87254);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/components/menus/FormattingMenus/RemoveBackgroundButton.tsx
var RemoveBackgroundButton = __webpack_require__(31087);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/components/menus/FormattingMenus/FormattingMenuDivider.tsx
var FormattingMenuDivider = __webpack_require__(38280);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/menu/dist/chunk-UZJ3TPNQ.mjs
var chunk_UZJ3TPNQ = __webpack_require__(10625);
// EXTERNAL MODULE: ../ui/dist/index.js + 43 modules
var ui_dist = __webpack_require__(64253);
// EXTERNAL MODULE: ../../node_modules/@lingui/react/dist/index.mjs + 1 modules
var react_dist = __webpack_require__(5879);
// EXTERNAL MODULE: ./src/modules/theming/components/ColorPickerMenu/ColorPickerMenu.tsx + 3 modules
var ColorPickerMenu = __webpack_require__(54842);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs
var chunk_ZJJGQIVY = __webpack_require__(29058);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/button/dist/chunk-6QYXN73V.mjs
var chunk_6QYXN73V = __webpack_require__(32899);
// EXTERNAL MODULE: ../../node_modules/@fortawesome/react-fontawesome/index.es.js
var index_es = __webpack_require__(49929);
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/ToolbarIcon.tsx





const iconShadow = "0px 1px 0px rgba(0,0,0,0)";
const iconColor = "trueblue.600";
const ToolbarIcon = (0,chunk_ZJJGQIVY/* forwardRef */.G)((param, ref)=>{
    let { label, icon, rotation, customIcon, tooltipPlacement = "top", shortcut, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_dist/* GammaTooltip */.kH, {
        placement: tooltipPlacement,
        label: label,
        isDisabled: !label,
        shortcut: shortcut,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_6QYXN73V/* IconButton */.h, {
            "aria-label": label || "",
            ref: ref,
            size: "md",
            variant: "",
            icon: customIcon ? customIcon : /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
                icon: icon,
                rotation: rotation,
                fixedWidth: true
            }),
            color: iconColor,
            textShadow: iconShadow,
            fontWeight: "500",
            borderRadius: "md",
            borderWidth: "1px",
            borderColor: "transparent",
            _hover: {
                bg: "gray.100",
                borderColor: "gray.200"
            },
            _active: {
                bg: "trueblue.100",
                borderColor: "trueblue.200"
            },
            ...props
        })
    });
});
const EditToolbarIcon = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
        ...props,
        ref: ref,
        color: "gray.900"
    });
});
EditToolbarIcon.displayName = "EditToolbarIcon";

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/popover/dist/chunk-24I2HV4N.mjs + 1 modules
var chunk_24I2HV4N = __webpack_require__(39429);
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/ToolbarWrapper.tsx


const ToolbarWrapper = (param)=>{
    let { children, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_KRPLQIP4/* Flex */.k, {
        bg: "#F9FAFBEE",
        p: 1,
        borderWidth: "1px",
        borderRadius: "xl",
        shadow: "xl",
        border: "1px solid",
        borderColor: "gray.200",
        ...props,
        children: children
    });
};
const ToolbarPopoverContent = (param)=>{
    let { children, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_24I2HV4N/* PopoverContent */.y, {
        w: "fit-content",
        pos: "relative",
        shadow: "none",
        border: "none",
        bg: "none",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                pos: "absolute",
                insetX: -6,
                top: -6,
                bottom: 0,
                // bg="red" // For debugging
                zIndex: "-1"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarWrapper, {
                direction: "column",
                overflow: "hidden",
                ...props,
                children: children
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/utils.ts
// Returns a value if everything in selection shares a value, otherwise null if it's a mix
const getSelectedStyle = (editor, style)=>{
    const sharedStyle = editor.getSharedStyles().get(style);
    if (!sharedStyle || sharedStyle.type === "mixed") return null;
    return sharedStyle.value;
};
// The style for new shapes
const getNextStyle = (editor, style)=>{
    // @ts-ignore - this works but marked internal right now - https://github.com/tldraw/tldraw/issues/2807
    return editor.getStyleForNextShape(style);
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/ShapeColorMenu.tsx













const ColorIcon = (param)=>{
    let { color } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
        as: "span",
        alignSelf: "center",
        boxSize: 5,
        borderRadius: "md",
        border: "2px solid",
        borderColor: "gray.300",
        bgColor: color !== null && color !== void 0 ? color : "#FFFFFF"
    });
};
const ShapeColorMenu = (0,dist_esm/* track */.jas)(()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const color = getSelectedStyle(editor, GammaColorStyle);
    const selection = editor.getSelectedShapes();
    const canChangeColor = selection.some((shape)=>[
            "geo",
            "text",
            "line",
            "arrow"
        ].includes(shape.type) || shape.type === "image" && isSvgImage(shape, editor));
    if (!canChangeColor) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        isLazy: true,
        trigger: "hover",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_dist/* GammaTooltip */.kH, {
                placement: "top",
                label: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                    id: "XAIjEI"
                }),
                "aria-label": core_dist/* i18n */.ag._({
                    id: "XAIjEI"
                }),
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                        icon: pro_regular_svg_icons/* faPalette */.q2v,
                        customIcon: color ? /*#__PURE__*/ (0,jsx_runtime.jsx)(ColorIcon, {
                            color: color || undefined
                        }) : undefined
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarPopoverContent, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_UZJ3TPNQ/* Menu */.v, {
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ColorPickerMenu/* ColorPickerMenuInner */.M, {
                        setColor: (newColor)=>{
                            editor.setStyleForSelectedShapes(GammaColorStyle, newColor);
                        },
                        currentColor: color || null,
                        source: "tldraw"
                    })
                })
            })
        ]
    });
});

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/image/dist/chunk-QINAG4RG.mjs + 1 modules
var chunk_QINAG4RG = __webpack_require__(75009);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs
var chunk_2OOHT3W5 = __webpack_require__(77533);
// EXTERNAL MODULE: ../../node_modules/@fortawesome/pro-solid-svg-icons/index.mjs
var pro_solid_svg_icons = __webpack_require__(54933);
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/StrokeIcon.svg
/* harmony default export */ var StrokeIcon = ({"src":"/_next/static/media/StrokeIcon.70a66bd1.svg","height":32,"width":31,"blurWidth":0,"blurHeight":0});
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/ShapeFillMenu.tsx













const ShapeStrokePopover = (0,dist_esm/* track */.jas)(()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const canChangeStroke = editor.getSelectedShapes().some((shape)=>[
            "geo",
            "line",
            "arrow"
        ].includes(shape.type));
    if (!canChangeStroke) return null;
    const selection = editor.getSelectedShapes();
    const selectedStroke = getSelectedStyle(editor, GammaStrokeWidthStyle);
    const canRemoveStroke = selection.some((shape)=>shape.type === "geo" && shape.props.fill !== "none") || selectedStroke === "none";
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        trigger: "hover",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                    icon: pro_regular_svg_icons/* faBorderTopLeft */.tVX,
                    customIcon: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_QINAG4RG/* Image */.E, {
                        src: StrokeIcon.src
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarPopoverContent, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
                    spacing: 1,
                    children: [
                        canRemoveStroke && /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faEmptySet */.ImE,
                            label: core_dist/* i18n */.ag._({
                                id: "v9FFq4"
                            }),
                            isActive: selectedStroke === "none",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(GammaStrokeWidthStyle, "none");
                            }
                        }, "none"),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faHorizontalRule */.ZC5,
                            customIcon: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                                w: 6,
                                h: 0.5,
                                bg: "gray.900",
                                borderRadius: "md"
                            }),
                            label: core_dist/* i18n */.ag._({
                                id: "jlw6Pf"
                            }),
                            isActive: selectedStroke === "sm",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(GammaStrokeWidthStyle, "sm");
                            }
                        }, "sm"),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faHorizontalRule */.ZC5,
                            customIcon: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                                w: 6,
                                h: 1,
                                bg: "gray.900",
                                borderRadius: "md"
                            }),
                            label: core_dist/* i18n */.ag._({
                                id: "NsbGKw"
                            }),
                            isActive: selectedStroke === "md",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(GammaStrokeWidthStyle, "md");
                            }
                        }, "md"),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faHorizontalRule */.ZC5,
                            customIcon: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                                w: 6,
                                h: 2,
                                bg: "gray.900",
                                borderRadius: "md"
                            }),
                            label: core_dist/* i18n */.ag._({
                                id: "kOx9y9"
                            }),
                            isActive: selectedStroke === "lg",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(GammaStrokeWidthStyle, "lg");
                            }
                        }, "lg")
                    ]
                })
            })
        ]
    });
});
const ShapeFillPopover = (0,dist_esm/* track */.jas)(()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const selection = editor.getSelectedShapes();
    const canChangeFill = selection.some((shape)=>shape.type === "geo");
    if (!canChangeFill) return null;
    const selectedFill = getSelectedStyle(editor, dist_esm/* DefaultFillStyle */.pp9);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        trigger: "hover",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                    icon: pro_regular_svg_icons/* faCircleHalfStroke */.DhN
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarPopoverContent, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
                    spacing: 1,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faCircle */.diR,
                            label: core_dist/* i18n */.ag._({
                                id: "MaFhfZ"
                            }),
                            isActive: selectedFill === "none",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(dist_esm/* DefaultFillStyle */.pp9, "none");
                            }
                        }, "none"),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faCircleHalfStroke */.DhN,
                            label: core_dist/* i18n */.ag._({
                                id: "X9rcHX"
                            }),
                            isActive: selectedFill === "semi",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(dist_esm/* DefaultFillStyle */.pp9, "semi");
                            }
                        }, "semi"),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_solid_svg_icons/* faCircle */.diR,
                            label: core_dist/* i18n */.ag._({
                                id: "Qocai2"
                            }),
                            isActive: selectedFill === "solid",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(dist_esm/* DefaultFillStyle */.pp9, "solid");
                            }
                        }, "solid")
                    ]
                })
            })
        ]
    });
});
const ArrowHeadPopover = (0,dist_esm/* track */.jas)(()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const selection = editor.getSelectedShapes();
    const canChangeArrows = selection.some((shape)=>shape.type === "arrow");
    if (!canChangeArrows) return null;
    const arrowheadStart = getSelectedStyle(editor, dist_esm/* ArrowShapeArrowheadStartStyle */.TAC);
    const arrowheadEnd = getSelectedStyle(editor, dist_esm/* ArrowShapeArrowheadEndStyle */.ZJj);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        trigger: "hover",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                    icon: pro_regular_svg_icons/* faRightLeft */.eRx
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarPopoverContent, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
                    spacing: 2,
                    pl: 2,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_2OOHT3W5/* Text */.x, {
                            fontSize: "sm",
                            fontWeight: "600",
                            color: "gray.500",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                                id: "tXkhj/"
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faHorizontalRule */.ZC5,
                            label: core_dist/* i18n */.ag._({
                                id: "Vgxmlw"
                            }),
                            isActive: arrowheadStart === "none",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(dist_esm/* ArrowShapeArrowheadStartStyle */.TAC, "none");
                            }
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faArrowLeft */.acZ,
                            label: core_dist/* i18n */.ag._({
                                id: "6AKiWu"
                            }),
                            isActive: arrowheadStart !== "none",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(dist_esm/* ArrowShapeArrowheadStartStyle */.TAC, "arrow");
                            }
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(FormattingMenuDivider/* FormattingMenuDivider */.w, {}),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_2OOHT3W5/* Text */.x, {
                            fontSize: "sm",
                            fontWeight: "600",
                            color: "gray.500",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                                id: "xDr/ct"
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faHorizontalRule */.ZC5,
                            label: core_dist/* i18n */.ag._({
                                id: "Vgxmlw"
                            }),
                            isActive: arrowheadStart === "none",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(dist_esm/* ArrowShapeArrowheadEndStyle */.ZJj, "none");
                            }
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faArrowRight */.eFW,
                            label: core_dist/* i18n */.ag._({
                                id: "6AKiWu"
                            }),
                            isActive: arrowheadEnd !== "none",
                            onClick: ()=>{
                                editor.setStyleForSelectedShapes(dist_esm/* ArrowShapeArrowheadEndStyle */.ZJj, "arrow");
                            }
                        }, "end")
                    ]
                })
            })
        ]
    });
});

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-W7WUSNWJ.mjs
var chunk_W7WUSNWJ = __webpack_require__(74008);
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/TextAlignPopover.tsx








const AlignIcons = {
    start: pro_regular_svg_icons/* faAlignLeft */.elf,
    middle: pro_regular_svg_icons/* faAlignCenter */.MB3,
    end: pro_regular_svg_icons/* faAlignRight */.S3c
};
const TextAlignPopover = ()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const textAlign = getSelectedStyle(editor, dist_esm/* DefaultHorizontalAlignStyle */.XoM);
    const verticalAlign = getSelectedStyle(editor, dist_esm/* DefaultVerticalAlignStyle */.HO5);
    const canAlignVertical = editor.getSelectedShapes().some((shape)=>"verticalAlign" in shape.props);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        trigger: "hover",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                    icon: AlignIcons[textAlign || "start"]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarPopoverContent, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_NTCQBYKE/* VStack */.g, {
                    spacing: 2,
                    divider: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_W7WUSNWJ/* Divider */.i, {}),
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_DA7QIPTJ/* ButtonGroup */.h, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faAlignLeft */.elf,
                                    label: core_dist/* i18n */.ag._({
                                        id: "7Ug5sE"
                                    }),
                                    onClick: ()=>editor.setStyleForSelectedShapes(dist_esm/* DefaultHorizontalAlignStyle */.XoM, "start"),
                                    isActive: textAlign === "start"
                                }, "align-left"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faAlignCenter */.MB3,
                                    label: core_dist/* i18n */.ag._({
                                        id: "vLp84F"
                                    }),
                                    onClick: ()=>editor.setStyleForSelectedShapes(dist_esm/* DefaultHorizontalAlignStyle */.XoM, "middle"),
                                    isActive: textAlign === "middle"
                                }, "align-center"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faAlignRight */.S3c,
                                    label: core_dist/* i18n */.ag._({
                                        id: "sQU9zP"
                                    }),
                                    onClick: ()=>editor.setStyleForSelectedShapes(dist_esm/* DefaultHorizontalAlignStyle */.XoM, "end"),
                                    isActive: textAlign === "end"
                                }, "align-right")
                            ]
                        }),
                        canAlignVertical && /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_DA7QIPTJ/* ButtonGroup */.h, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faArrowUpToLine */.bqB,
                                    label: core_dist/* i18n */.ag._({
                                        id: "wjY74a"
                                    }),
                                    onClick: ()=>editor.setStyleForSelectedShapes(dist_esm/* DefaultVerticalAlignStyle */.HO5, "start"),
                                    isActive: verticalAlign === "start"
                                }, "align-top"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faArrowsFromLine */.Zy$,
                                    label: core_dist/* i18n */.ag._({
                                        id: "vNKCfC"
                                    }),
                                    onClick: ()=>editor.setStyleForSelectedShapes(dist_esm/* DefaultVerticalAlignStyle */.HO5, "middle"),
                                    isActive: verticalAlign === "middle"
                                }, "align-middle"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faArrowDownToLine */.E0H,
                                    label: core_dist/* i18n */.ag._({
                                        id: "CqhMZT"
                                    }),
                                    onClick: ()=>editor.setStyleForSelectedShapes(dist_esm/* DefaultVerticalAlignStyle */.HO5, "end"),
                                    isActive: verticalAlign === "end"
                                }, "align-right")
                            ]
                        })
                    ]
                })
            })
        ]
    });
};

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/toast/dist/chunk-6RSEZNRH.mjs
var chunk_6RSEZNRH = __webpack_require__(70065);
// EXTERNAL MODULE: ./src/modules/credits/hooks.ts
var hooks = __webpack_require__(25556);
// EXTERNAL MODULE: ./src/modules/credits/mutations.ts
var mutations = __webpack_require__(13090);
// EXTERNAL MODULE: ./src/modules/redux/index.ts + 10 modules
var redux = __webpack_require__(35649);
// EXTERNAL MODULE: ./src/modules/segment/index.ts
var segment = __webpack_require__(31601);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/media/Image/reducer.ts
var reducer = __webpack_require__(33315);
// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/media/Image/useRemoveBackground.ts
var useRemoveBackground = __webpack_require__(3423);
// EXTERNAL MODULE: ./src/modules/user/reducer.ts
var user_reducer = __webpack_require__(6814);
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/useRemoveBackgroundTLDraw.ts













const createImageAsset = (existingAsset, src)=>{
    const assetId = dist_esm/* AssetRecordType */.Ykc.createId((0,dist_esm/* getHashForString */.jKo)(src));
    const asset = dist_esm/* AssetRecordType */.Ykc.create({
        id: assetId,
        type: "image",
        typeName: "asset",
        props: {
            ...existingAsset.props,
            src
        }
    });
    return asset;
};
const useRemoveTLDrawBackground = (tlEditor, workspaceId)=>{
    const dispatch = (0,redux/* useAppDispatch */.TL)();
    const toast = (0,chunk_6RSEZNRH/* useToast */.p)();
    const workspace = (0,redux/* useAppSelector */.CG)((0,user_reducer/* selectDocOrMostPermissiveWorkspaceForUser */.ux)(workspaceId));
    const selection = tlEditor.getSelectedShapes();
    const selectedImageShapes = selection.filter((shape)=>shape.type === "image")// SVGs are not supported for background removal
    .filter((shape)=>!isSvgImage(shape, tlEditor)).filter((shape)=>!shape.props.uploadStatus || ![
            "uploading",
            "error"
        ].includes(shape.props.uploadStatus));
    const isUploadingImage = selectedImageShapes.some((shape)=>shape.props.uploadStatus === "uploading");
    // Show the button if there are any images eligible for background removal
    const showRemoveBackground = selectedImageShapes.length > 0;
    // Disable the button if all eligible images are currently being processed
    // OR
    // if any of the images are currently being uploaded
    const disableRemoveBackground = selectedImageShapes.every((shape)=>shape.props.removeBackgroundStatus === "in-progress") || isUploadingImage;
    const startRemoveBackground = (0,react.useCallback)(()=>{
        if (!(workspace === null || workspace === void 0 ? void 0 : workspace.id)) {
            throw new Error("No workspaceId provided");
        }
        return Promise.all(selectedImageShapes.map(async (shape)=>{
            const id = shape.id;
            const assetId = shape.props.assetId;
            if (!assetId) {
                console.error("No assetId found for image shape", shape);
                return;
            }
            const asset = tlEditor.getAsset(assetId);
            if (!(asset === null || asset === void 0 ? void 0 : asset.props.src)) return;
            dispatch((0,reducer/* startRemoveBg */._8)({
                id
            }));
            try {
                tlEditor.mark("remove-background-".concat(id));
                tlEditor.updateShape({
                    id,
                    type: "image",
                    props: {
                        removeBackgroundStatus: "in-progress"
                    }
                });
                const newSrc = await (0,useRemoveBackground/* fetchRemoveBackgroundImage */.i)({
                    imageUrl: asset.props.src,
                    workspaceId: workspace.id
                });
                const newAsset = createImageAsset(asset, newSrc);
                tlEditor.createAssets([
                    newAsset
                ]);
                dispatch((0,reducer/* setRemoveBgUrl */.jJ)({
                    id,
                    url: newSrc
                }));
                (0,mutations/* trackAiCreditsUsed */.i)("removeBackground", workspace);
                await (0,utils_image/* downloadImage */.GN)(newSrc);
                tlEditor.updateShape({
                    id,
                    type: "image",
                    props: {
                        assetId: newAsset.id,
                        removeBackgroundStatus: "idle"
                    }
                });
            } catch (e) {
                var _e_cause, _e_cause1;
                tlEditor.bail() // Undo back to before the remove background started
                ;
                const timedOut = e.name === "AbortError";
                const isKnownError = ((_e_cause = e.cause) === null || _e_cause === void 0 ? void 0 : _e_cause.statusCode) && ((_e_cause1 = e.cause) === null || _e_cause1 === void 0 ? void 0 : _e_cause1.statusCode) < 500;
                toast({
                    title: core_dist/* i18n */.ag._({
                        id: "xwVKp4"
                    }),
                    position: "top",
                    description: timedOut ? core_dist/* i18n */.ag._({
                        id: "sSkbaZ"
                    }) : isKnownError ? e.message : core_dist/* i18n */.ag._({
                        id: "2ePs/6"
                    }),
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
            }
            requestAnimationFrame(()=>{
                dispatch((0,reducer/* endRemoveBg */.l_)({
                    id
                }));
            });
        }));
    }, [
        dispatch,
        selectedImageShapes,
        tlEditor,
        toast,
        workspace
    ]);
    const removeBackground = (0,hooks/* useAllowOrUpsell */.YO)(startRemoveBackground, "removeBackground", segment/* SegmentEvents */.AA.GAMMA_PRO_UPSELL_REMOVE_BACKGROUND);
    return {
        showRemoveBackground,
        disableRemoveBackground,
        removeBackground
    };
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/EditToolbar.tsx













const EditToolbar = (0,dist_esm/* track */.jas)((param)=>{
    let { workspaceId } = param;
    const editor = (0,dist_esm/* useEditor */.jE2)();
    if (!editor) return null;
    const { showRemoveBackground, disableRemoveBackground, removeBackground } = useRemoveTLDrawBackground(editor, workspaceId);
    const selection = editor.getSelectedShapes();
    const hasSelection = selection.length > 0;
    if (!hasSelection) return null;
    const hasGroupSelected = selection.some((shape)=>shape.type === "group");
    const numberOfSelectedIds = selection.length;
    const hasTextSelected = selection.some((shape)=>shape.type === "text" || "text" in shape.props && shape.props.text || "html" in shape.props && shape.props.html);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_KRPLQIP4/* Flex */.k, {
        w: "100%",
        direction: "row",
        position: "absolute",
        bottom: 2,
        align: "flex-end",
        justify: "center",
        zIndex: "var(--layer-menus)",
        id: "tldraw-edit-toolbar",
        fontFamily: "Inter, sans-serif",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
            spacing: 0,
            border: "1px solid",
            borderColor: "gray.200",
            shadow: "lg",
            borderRadius: "xl",
            bg: "#F9FAFBEE",
            overflow: "hidden",
            p: 1,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ShapeColorMenu, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ShapeStrokePopover, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ShapeFillPopover, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ArrowHeadPopover, {}),
                hasTextSelected && /*#__PURE__*/ (0,jsx_runtime.jsx)(TextAlignPopover, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ForwardBackPopover, {}),
                numberOfSelectedIds >= 2 && /*#__PURE__*/ (0,jsx_runtime.jsx)(ShapeAlignPopover, {}),
                showRemoveBackground ? /*#__PURE__*/ (0,jsx_runtime.jsx)(RemoveBackgroundButton/* RemoveBackgroundButton */.L, {
                    onClick: removeBackground,
                    disabled: disableRemoveBackground
                }) : null,
                numberOfSelectedIds >= 2 || hasGroupSelected ? /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                    icon: pro_regular_svg_icons/* faObjectGroup */.tU8,
                    label: hasGroupSelected ? "Ungroup selection" : "Group selection",
                    onClick: ()=>hasGroupSelected ? editor.ungroupShapes(selection.map((s)=>s.id)) : editor.groupShapes(selection.map((s)=>s.id)),
                    isActive: hasGroupSelected,
                    shortcut: "Mod+G / Mod+Shift+G"
                }, "group") : null,
                /*#__PURE__*/ (0,jsx_runtime.jsx)(FormattingMenuDivider/* FormattingMenuDivider */.w, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                    icon: pro_regular_svg_icons/* faTrash */.XAH,
                    label: core_dist/* i18n */.ag._({
                        id: "/Wgayn"
                    }),
                    onClick: ()=>editor.deleteShapes(selection.map((s)=>s.id)),
                    "data-testid": "drawing-edit-toolbar-delete",
                    color: "red.500",
                    shortcut: "Del"
                }, "delete")
            ]
        })
    });
});
const ForwardBackPopover = (0,dist_esm/* track */.jas)(()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const selection = editor.getSelectedShapes();
    const selectedIds = selection.map((s)=>s.id);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        trigger: "hover",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                    icon: pro_regular_svg_icons/* faBringFront */.XQV
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarPopoverContent, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
                    spacing: 1,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faBringFront */.XQV,
                            label: core_dist/* i18n */.ag._({
                                id: "J6qWQV"
                            }),
                            onClick: ()=>editor.bringToFront(selectedIds),
                            shortcut: "]"
                        }, "front"),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faBringForward */.y3T,
                            label: core_dist/* i18n */.ag._({
                                id: "9xFjqz"
                            }),
                            onClick: ()=>editor.bringForward(selectedIds),
                            shortcut: "Alt+]"
                        }, "forward"),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faSendBackward */.QZW,
                            label: core_dist/* i18n */.ag._({
                                id: "OfSb1W"
                            }),
                            onClick: ()=>editor.sendBackward(selectedIds),
                            shortcut: "Alt+["
                        }, "backward"),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                            icon: pro_regular_svg_icons/* faSendBack */.H5Z,
                            label: core_dist/* i18n */.ag._({
                                id: "/zBSYY"
                            }),
                            onClick: ()=>editor.sendToBack(selectedIds),
                            shortcut: "["
                        }, "back")
                    ]
                })
            })
        ]
    });
});
const ShapeAlignPopover = (0,dist_esm/* track */.jas)(()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const shapeIds = editor.getSelectedShapeIds();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        trigger: "hover",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                    icon: pro_regular_svg_icons/* faObjectsAlignLeft */.I6v
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarPopoverContent, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_NTCQBYKE/* VStack */.g, {
                    spacing: 2,
                    align: "start",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_DA7QIPTJ/* ButtonGroup */.h, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faObjectsAlignLeft */.I6v,
                                    label: core_dist/* i18n */.ag._({
                                        id: "IR6Txi"
                                    }),
                                    onClick: ()=>editor.alignShapes(shapeIds, "left"),
                                    shortcut: "Alt+A"
                                }, "align-left"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faObjectsAlignCenterHorizontal */.liD,
                                    label: core_dist/* i18n */.ag._({
                                        id: "8nOdkO"
                                    }),
                                    onClick: ()=>editor.alignShapes(shapeIds, "center-horizontal"),
                                    shortcut: "Alt+H"
                                }, "align-center"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faObjectsAlignRight */.xfv,
                                    label: core_dist/* i18n */.ag._({
                                        id: "pd0UH2"
                                    }),
                                    onClick: ()=>editor.alignShapes(shapeIds, "right"),
                                    shortcut: "Alt+D"
                                }, "align-right"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faDistributeSpacingHorizontal */.ZC_,
                                    label: core_dist/* i18n */.ag._({
                                        id: "8lqfXb"
                                    }),
                                    onClick: ()=>editor.distributeShapes(shapeIds, "horizontal")
                                }, "distribute-h")
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_DA7QIPTJ/* ButtonGroup */.h, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faObjectsAlignTop */.JhG,
                                    label: core_dist/* i18n */.ag._({
                                        id: "/Q0jUh"
                                    }),
                                    onClick: ()=>editor.alignShapes(shapeIds, "top"),
                                    shortcut: "Alt+W"
                                }, "align-top"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faObjectsAlignCenterVertical */.UiH,
                                    label: core_dist/* i18n */.ag._({
                                        id: "QhuQN2"
                                    }),
                                    onClick: ()=>editor.alignShapes(shapeIds, "center-vertical"),
                                    shortcut: "Alt+V"
                                }, "align-middle"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faObjectsAlignBottom */.iXx,
                                    label: core_dist/* i18n */.ag._({
                                        id: "EPnxoe"
                                    }),
                                    onClick: ()=>editor.alignShapes(shapeIds, "bottom"),
                                    shortcut: "Alt+S"
                                }, "align-bottom"),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbarIcon, {
                                    icon: pro_regular_svg_icons/* faDistributeSpacingVertical */.edW,
                                    label: core_dist/* i18n */.ag._({
                                        id: "a1NrWf"
                                    }),
                                    onClick: ()=>editor.distributeShapes(shapeIds, "vertical")
                                }, "distribute-v")
                            ]
                        })
                    ]
                })
            })
        ]
    });
});

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-NEK3OOAM.mjs
var chunk_NEK3OOAM = __webpack_require__(20437);
// EXTERNAL MODULE: ../../node_modules/@fortawesome/pro-duotone-svg-icons/index.mjs
var pro_duotone_svg_icons = __webpack_require__(82655);
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/ArrowRight.svg
/* harmony default export */ var ArrowRight = ({"src":"/_next/static/media/ArrowRight.efcc34da.svg","height":17,"width":20,"blurWidth":0,"blurHeight":0});
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/Parallelogram.svg
/* harmony default export */ var Parallelogram = ({"src":"/_next/static/media/Parallelogram.a20f8446.svg","height":16,"width":21,"blurWidth":0,"blurHeight":0});
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/useInsertMedia.tsx



// Forked from https://github.com/tldraw/tldraw/blob/5347c5f30e593fb2616011dddab64f1b225d4d41/packages/tldraw/src/lib/ui/hooks/useInsertMedia.ts#L4
function useInsertMedia() {
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const inputRef = (0,react.useRef)();
    (0,react.useEffect)(()=>{
        const input = window.document.createElement("input");
        input.type = "file";
        input.accept = acceptedImageMimeTypes.join(",");
        input.multiple = true;
        inputRef.current = input;
        async function onchange(e) {
            const fileList = e.target.files;
            if (!fileList || fileList.length === 0) return;
            await editor.putExternalContent({
                type: "files",
                files: Array.from(fileList),
                point: editor.getViewportPageBounds().center,
                ignoreParent: false
            });
            input.value = "";
        }
        input.addEventListener("change", onchange);
        return ()=>{
            inputRef.current = undefined;
            input.removeEventListener("change", onchange);
        };
    }, [
        editor
    ]);
    return (0,react.useCallback)(()=>{
        var _inputRef_current;
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.click();
    }, [
        inputRef
    ]);
}

;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/InsertToolbar.tsx













const getInsertToolbarCommands = ()=>[
        {
            icon: pro_solid_svg_icons/* faArrowPointer */.qaO,
            label: ()=>core_dist/* i18n */.ag._({
                    id: "rG3WVm"
                }),
            tool: "select",
            shortcut: "V"
        },
        {
            icon: pro_duotone_svg_icons/* faHand */.ioV,
            label: ()=>core_dist/* i18n */.ag._({
                    id: "8tjQCz"
                }),
            tool: "hand",
            shortcut: "H"
        },
        {
            icon: pro_duotone_svg_icons/* faEraser */.xf2,
            label: ()=>core_dist/* i18n */.ag._({
                    id: "Ajc4TJ"
                }),
            tool: "eraser",
            shortcut: "E"
        },
        "-",
        {
            icon: pro_solid_svg_icons/* faHorizontalRule */.ZC5,
            label: ()=>core_dist/* i18n */.ag._({
                    id: "rjuFFw"
                }),
            tool: "line",
            shortcut: "L"
        },
        {
            icon: pro_solid_svg_icons/* faArrowUpRight */.nUK,
            label: ()=>core_dist/* i18n */.ag._({
                    id: "zFkhx3"
                }),
            tool: "arrow",
            shortcut: "A"
        },
        {
            icon: pro_duotone_svg_icons/* faShapes */.Kak,
            label: ()=>core_dist/* i18n */.ag._({
                    id: "kALRc9"
                }),
            tool: "geo"
        },
        {
            icon: pro_solid_svg_icons/* faText */.K5C,
            label: ()=>core_dist/* i18n */.ag._({
                    id: "xeiujy"
                }),
            tool: "text",
            shortcut: "T"
        },
        {
            icon: pro_duotone_svg_icons/* faImage */.VmB,
            label: ()=>core_dist/* i18n */.ag._({
                    id: "hG89Ed"
                }),
            tool: "media",
            shortcut: "Mod+U"
        }
    ];
const GeoShapes = [
    {
        icon: pro_solid_svg_icons/* faRhombus */.K3M,
        image: Parallelogram,
        label: ()=>core_dist/* i18n */.ag._({
                id: "Bgytaf"
            }),
        shape: "rhombus",
        iconRotation: 90
    },
    {
        icon: pro_solid_svg_icons/* faRectangle */.lCX,
        label: ()=>core_dist/* i18n */.ag._({
                id: "30KLDI"
            }),
        shape: "rectangle",
        shortcut: "R"
    },
    {
        icon: pro_solid_svg_icons/* faHexagon */.iOh,
        iconRotation: 90,
        label: ()=>core_dist/* i18n */.ag._({
                id: "tIb8bD"
            }),
        shape: "hexagon"
    },
    {
        icon: pro_solid_svg_icons/* faCircle */.diR,
        label: ()=>core_dist/* i18n */.ag._({
                id: "7xMmki"
            }),
        shape: "ellipse",
        shortcut: "O"
    },
    {
        icon: pro_solid_svg_icons/* faCloud */.uM9,
        label: ()=>core_dist/* i18n */.ag._({
                id: "XLMJ7O"
            }),
        shape: "cloud"
    },
    {
        icon: pro_solid_svg_icons/* faTriangle */.BwA,
        label: ()=>core_dist/* i18n */.ag._({
                id: "ucHvJP"
            }),
        shape: "triangle"
    },
    {
        icon: pro_solid_svg_icons/* faArrowRightFromBracket */.SJh,
        image: ArrowRight,
        label: ()=>core_dist/* i18n */.ag._({
                id: "0ULIwF"
            }),
        shape: "arrow-right"
    },
    {
        icon: pro_solid_svg_icons/* faDiamond */.qtD,
        label: ()=>core_dist/* i18n */.ag._({
                id: "T+jTW/"
            }),
        shape: "diamond"
    }
];
const InsertToolbar = (0,dist_esm/* track */.jas)(()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const activeTool = editor.getCurrentTool();
    const insertMedia = useInsertMedia();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_KRPLQIP4/* Flex */.k, {
        h: "100%",
        direction: "column",
        position: "absolute",
        right: 2,
        align: "flex-end",
        justify: "center",
        zIndex: "var(--layer-menus)",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarWrapper, {
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_NTCQBYKE/* VStack */.g, {
                spacing: 1,
                children: getInsertToolbarCommands().map((cmd)=>{
                    if (cmd === "-") {
                        return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_W7WUSNWJ/* Divider */.i, {});
                    }
                    const { label, icon, tool, shortcut } = cmd;
                    if (tool === "geo") {
                        return /*#__PURE__*/ (0,jsx_runtime.jsx)(ShapesPopover, {}, tool);
                    }
                    return /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                        icon: icon,
                        label: label(),
                        shortcut: shortcut,
                        onClick: ()=>{
                            if (tool === "media") {
                                insertMedia();
                                return;
                            }
                            editor.setCurrentTool(tool);
                        },
                        isActive: activeTool.id === tool,
                        tooltipPlacement: "left",
                        "data-testid": "drawing-insert-toolbar-".concat(tool)
                    }, tool);
                })
            })
        })
    });
});
const ShapesPopover = (0,dist_esm/* track */.jas)(()=>{
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const activeTool = editor.getCurrentTool();
    const activeShape = getSelectedStyle(editor, GammaShapeStyle);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        trigger: "hover",
        placement: "left-start",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                    icon: pro_duotone_svg_icons/* faShapes */.Kak,
                    isActive: activeTool.id === "geo",
                    "data-testid": "drawing-insert-toolbar-geo"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_24I2HV4N/* PopoverContent */.y, {
                background: "none",
                shadow: "none",
                w: "fit-content",
                border: "none",
                mt: -8,
                p: 6,
                pr: 0,
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarWrapper, {
                    direction: "column",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_NEK3OOAM/* SimpleGrid */.M, {
                        columns: 2,
                        gap: 1,
                        children: GeoShapes.map((param)=>{
                            let { label, icon, iconRotation, image, shape, shortcut } = param;
                            return /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                                icon: icon,
                                rotation: iconRotation,
                                customIcon: image ? /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_QINAG4RG/* Image */.E, {
                                    src: image === null || image === void 0 ? void 0 : image.src,
                                    w: "50%"
                                }) : undefined,
                                label: label(),
                                shortcut: shortcut,
                                onClick: ()=>{
                                    editor.setCurrentTool("geo");
                                    if (shape) {
                                        editor.setStyleForNextShapes(GammaShapeStyle, shape);
                                    }
                                },
                                isActive: activeShape === shape,
                                tooltipPlacement: "left",
                                "data-testid": "drawing-insert-toolbar-shape-".concat(shape),
                                opacity: 0.75
                            }, shape);
                        })
                    })
                })
            })
        ]
    });
});

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/menu/dist/chunk-Z3VR2BFQ.mjs
var chunk_Z3VR2BFQ = __webpack_require__(67046);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs + 3 modules
var chunk_UVUR7MCU = __webpack_require__(62614);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/menu/dist/chunk-6MF6NSK4.mjs
var chunk_6MF6NSK4 = __webpack_require__(99058);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/menu/dist/chunk-5TWLKMYI.mjs + 1 modules
var chunk_5TWLKMYI = __webpack_require__(25481);
// EXTERNAL MODULE: ./src/utils/deviceDetection.ts + 1 modules
var deviceDetection = __webpack_require__(92035);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/popover/dist/chunk-JKY3EM6P.mjs
var chunk_JKY3EM6P = __webpack_require__(89833);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-7OLJDQMT.mjs
var chunk_7OLJDQMT = __webpack_require__(74409);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-EBIU6VW7.mjs
var chunk_EBIU6VW7 = __webpack_require__(5740);
// EXTERNAL MODULE: ./src/modules/help/components/KeyboardShortcutsPopover/index.ts + 2 modules
var KeyboardShortcutsPopover = __webpack_require__(18922);
// EXTERNAL MODULE: ./src/modules/i18n/hooks/useLocalizedFunction.tsx
var useLocalizedFunction = __webpack_require__(78456);
// EXTERNAL MODULE: ./src/utils/handlers.ts
var handlers = __webpack_require__(9237);
;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/HelpPopover.tsx










const getDiagramShortcuts = ()=>{
    return [
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "6MxxvO"
            }),
            shortcut: [
                "Mod+U"
            ]
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "rG3WVm"
            }),
            shortcut: [
                "V"
            ]
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "2FGWTy"
            }),
            shortcut: "E"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "vJ0hjc"
            }),
            shortcut: "H"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "30KLDI"
            }),
            shortcut: "R"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "rp5GhR"
            }),
            shortcut: "O"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "zFkhx3"
            }),
            shortcut: "A"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "rjuFFw"
            }),
            shortcut: "L"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "xeiujy"
            }),
            shortcut: "T"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "9uI/rE"
            }),
            shortcut: "Mod+Z"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "H3oH0g"
            }),
            shortcut: "Mod+Shift+Z"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "cCd8Bs"
            }),
            shortcut: "Mod+X"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "he3ygx"
            }),
            shortcut: "Mod+C"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "HzVv6g"
            }),
            shortcut: "Mod+V"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "UILhO0"
            }),
            shortcut: "Mod+'"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "wgNoIs"
            }),
            shortcut: "Mod+A"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "cnGeoo"
            }),
            shortcut: "Del"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "euc6Ns"
            }),
            shortcut: "Mod+D"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "AWOSPo"
            }),
            shortcut: "Mod+="
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "FjkaiT"
            }),
            shortcut: "Mod+-"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "41NrIs"
            }),
            shortcut: "Shift+0"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "pLI1Is"
            }),
            shortcut: "Shift+1"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "1eH/UF"
            }),
            shortcut: "Shift+2"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "IS9/i3"
            }),
            shortcut: "]"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "i4A317"
            }),
            shortcut: "Alt+]"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "yWNAen"
            }),
            shortcut: "Alt+["
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "WMIp7w"
            }),
            shortcut: "["
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "L8fEEm"
            }),
            shortcut: "Mod+G"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "E4mitS"
            }),
            shortcut: "Mod+Shift+G"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "/Q0jUh"
            }),
            shortcut: "Alt+W"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "QhuQN2"
            }),
            shortcut: "Alt+V"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "EPnxoe"
            }),
            shortcut: "Alt+S"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "IR6Txi"
            }),
            shortcut: "Alt+A"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "8nOdkO"
            }),
            shortcut: "Alt+H"
        },
        {
            description: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                id: "pd0UH2"
            }),
            shortcut: "Alt+D"
        }
    ];
};
const HelpPopover = ()=>{
    const shortcuts = (0,useLocalizedFunction/* useLocalizedFunction */.A)(getDiagramShortcuts);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3WRTUQ76/* Popover */.J, {
        trigger: "click",
        placement: "bottom",
        isLazy: true,
        returnFocusOnClose: false,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_OFUG2FGD/* PopoverTrigger */.x, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                    icon: pro_duotone_svg_icons/* faQuestionCircle */.Fuz,
                    label: core_dist/* i18n */.ag._({
                        id: "IBvHGk"
                    }),
                    onMouseDown: handlers/* preventDefaultToAvoidBlur */.br
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_24I2HV4N/* PopoverContent */.y, {
                p: 4,
                w: "400px",
                maxH: "80vh",
                overflowY: "auto",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_JKY3EM6P/* PopoverCloseButton */.u, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_NTCQBYKE/* VStack */.g, {
                        spacing: 4,
                        fontSize: "md",
                        fontWeight: "500",
                        align: "start",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_7OLJDQMT/* Heading */.X, {
                                size: "md",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                                    id: "y5p2bQ"
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_2OOHT3W5/* Text */.x, {
                                as: "ul",
                                ms: 4,
                                sx: {
                                    li: {
                                        my: 2
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                                            id: "Eln6mJ"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                                            id: "oCNO6k",
                                            components: {
                                                0: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_EBIU6VW7/* Kbd */.T, {})
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                                            id: "YmUqaF",
                                            components: {
                                                0: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_EBIU6VW7/* Kbd */.T, {})
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                                            id: "bzaAgu",
                                            values: {
                                                0: deviceDetection/* isWindows */.ED ? "Alt" : "Option"
                                            },
                                            components: {
                                                0: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_EBIU6VW7/* Kbd */.T, {})
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                                            id: "z9xlo8",
                                            components: {
                                                0: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_EBIU6VW7/* Kbd */.T, {})
                                            }
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_7OLJDQMT/* Heading */.X, {
                                size: "md",
                                children: "Keyboard shortcuts"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(KeyboardShortcutsPopover/* ShortcutsTable */.A, {
                                list: shortcuts
                            })
                        ]
                    })
                ]
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/modules/tldraw2/ui/ZoomToolbar.tsx













const ZoomToolbar = (0,dist_esm/* track */.jas)(function ZoomToolbar() {
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const showGrid = editor.getInstanceState().isGridMode;
    const canUndo = editor.getCanUndo();
    const canRedo = editor.getCanRedo();
    const { isGammaOrgUser } = (0,user/* useUserContext */.SE)();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_KRPLQIP4/* Flex */.k, {
        position: "absolute",
        top: 2,
        left: 2,
        zIndex: "var(--layer-menus)",
        fontFamily: "Inter, sans-serif",
        fontSize: "md",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarWrapper, {
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
                spacing: 2,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ZoomMenu, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_W7WUSNWJ/* Divider */.i, {
                        orientation: "vertical"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                        icon: pro_solid_svg_icons/* faGrid5 */.fnF,
                        label: showGrid ? core_dist/* i18n */.ag._({
                            id: "yKNnfN"
                        }) : core_dist/* i18n */.ag._({
                            id: "1P5SDm"
                        }),
                        shortcut: "Mod+'",
                        isActive: showGrid,
                        onClick: ()=>{
                            editor.updateInstanceState({
                                isGridMode: !showGrid
                            });
                        }
                    }, "grid"),
                    isGammaOrgUser && /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_W7WUSNWJ/* Divider */.i, {
                        orientation: "vertical"
                    }),
                    isGammaOrgUser && /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                        icon: pro_duotone_svg_icons/* faFileArrowDown */.ISu,
                        color: "sunglow.600",
                        label: core_dist/* i18n */.ag._({
                            id: "SpTWH3"
                        }),
                        shortcut: "(Gamma admin only)",
                        onClick: ()=>{
                            const allShapes = Array.from(editor.getCurrentPageShapeIds());
                            (0,dist_esm/* exportAs */.xUL)(editor, allShapes, "svg", undefined, {
                                scale: 1
                            });
                        }
                    }, "download"),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(HelpPopover, {}),
                    (canUndo || canRedo) && /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_W7WUSNWJ/* Divider */.i, {
                        orientation: "vertical"
                    }),
                    canUndo && /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                        icon: pro_duotone_svg_icons/* faUndo */.X7o,
                        label: core_dist/* i18n */.ag._({
                            id: "9uI/rE"
                        }),
                        shortcut: "Mod+Z",
                        onClick: ()=>editor.undo()
                    }, "undo"),
                    canRedo && /*#__PURE__*/ (0,jsx_runtime.jsx)(ToolbarIcon, {
                        icon: pro_duotone_svg_icons/* faRedo */.XSV,
                        label: core_dist/* i18n */.ag._({
                            id: "H3oH0g"
                        }),
                        shortcut: "Mod+Shift+Z",
                        onClick: ()=>editor.redo()
                    }, "redo")
                ]
            })
        })
    });
});
const ZoomMenu = (0,dist_esm/* track */.jas)(function ZoomMenu() {
    const editor = (0,dist_esm/* useEditor */.jE2)();
    const zoom = editor.getZoomLevel();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_UZJ3TPNQ/* Menu */.v, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_Z3VR2BFQ/* MenuButton */.j, {
                as: chunk_UVUR7MCU/* Button */.z,
                "data-test-id": "zoom-menu-button",
                size: "sm",
                colorScheme: "trueblue",
                variant: "ghost",
                leftIcon: /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
                    icon: pro_duotone_svg_icons/* faMagnifyingGlass */.Y$T
                }),
                children: [
                    Math.round(zoom * 100),
                    "%"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_6MF6NSK4/* MenuList */.q, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_5TWLKMYI/* MenuItem */.s, {
                        command: deviceDetection/* isWindows */.ED ? "Ctrl+" : "⌘+",
                        onClick: ()=>editor.zoomIn(),
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                            id: "AWOSPo"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_5TWLKMYI/* MenuItem */.s, {
                        command: deviceDetection/* isWindows */.ED ? "Ctrl-" : "⌘-",
                        onClick: ()=>editor.zoomOut(),
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                            id: "FjkaiT"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_5TWLKMYI/* MenuItem */.s, {
                        command: "⇧0",
                        onClick: ()=>editor.resetZoom(),
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                            id: "41NrIs"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_5TWLKMYI/* MenuItem */.s, {
                        command: "⇧1",
                        onClick: ()=>editor.zoomToFit(),
                        "data-test-id": "zoom-to-fit-button",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                            id: "pLI1Is"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_5TWLKMYI/* MenuItem */.s, {
                        command: "⇧2",
                        onClick: ()=>editor.zoomToSelection(),
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_dist/* Trans */.cC, {
                            id: "1eH/UF"
                        })
                    })
                ]
            })
        ]
    });
});

// EXTERNAL MODULE: ../../node_modules/@tldraw/tldraw/tldraw.css
var tldraw = __webpack_require__(35872);
;// CONCATENATED MODULE: ./src/modules/tldraw2/TldrawEditor.tsx

















const defaultComponents = {
    SelectionForeground: dist_esm/* TldrawSelectionForeground */.uIq,
    SelectionBackground: dist_esm/* TldrawSelectionBackground */.meR,
    Handles: dist_esm/* TldrawHandles */.pBL,
    HoveredShapeIndicator: dist_esm/* TldrawHoveredShapeIndicator */.CNS
};
const GammaShapeUtils = [
    GammaGeoShapeUtil,
    GammaTextShapeUtil,
    GammaArrowShapeUtil,
    GammaLineShapeUtil,
    GammaImageShapeUtil
];
const SupportedTools = [
    ...dist_esm/* defaultTools */.e5F,
    dist_esm/* TextShapeTool */.Qq1,
    dist_esm/* GeoShapeTool */.MFZ,
    dist_esm/* LineShapeTool */.FWf,
    dist_esm/* ArrowShapeTool */.T_Y
];
const Tldraw = (props)=>{
    const workspaceId = props.orgId || (0,user/* getCurrentWorkspaceId */.n_)();
    (0,react.useEffect)(()=>{
        dist_esm/* DefaultFontFamilies */.p64.draw = "var(--body-font)";
    }, []);
    const [editor, setEditor] = (0,react.useState)();
    const [mounted, setMounted] = (0,react.useState)(false);
    const handleMount = (0,react.useCallback)((editorInstance)=>{
        if (mounted) return;
        setEditor(editorInstance);
        setMounted(true);
        setupContentHandlers(editorInstance, workspaceId);
        editorInstance.setStyleForNextShapes(dist_esm/* DefaultDashStyle */.ciG, "solid");
        editorInstance.setStyleForNextShapes(dist_esm/* DefaultFillStyle */.pp9, "solid");
        editorInstance.user.updateUserPreferences({
            isSnapMode: true
        });
        if (props.defaultStyles) {
            editorInstance.setStyleForNextShapes(dist_esm/* DefaultFillStyle */.pp9, props.defaultStyles.fill, {
                ephemeral: true
            });
            editorInstance.setStyleForNextShapes(GammaStrokeWidthStyle, props.defaultStyles.strokeWidth, {
                ephemeral: true
            });
        }
        editorInstance.sideEffects.registerBeforeChangeHandler("shape", (_, nextShape)=>{
            // Prevent locking shapes accidentally (eg via keyboard shortcuts)
            // since our UI doesn't have a way to unlock them
            if (nextShape.isLocked) {
                return {
                    ...nextShape,
                    isLocked: false
                };
            }
            return nextShape;
        });
    }, [
        mounted,
        workspaceId,
        props.defaultStyles
    ]);
    (0,react.useEffect)(()=>{
        if (!props.onChange || !editor) return;
        const cleanupListener = editor.store.listen((_ev)=>{
            props.onChange(editor);
        }, {
            source: "user",
            scope: "document"
        });
        return ()=>{
            cleanupListener();
        };
    }, [
        editor,
        props.onChange
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(dist_esm/* TldrawEditor */.gRN, {
        initialState: "select",
        shapeUtils: GammaShapeUtils,
        tools: SupportedTools,
        components: defaultComponents,
        ...props,
        onMount: (0,chunk_M3TFMUOL/* callAllHandlers */.v0)(props.onMount, handleMount),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(dist_esm/* TldrawUiContextProvider */.U_z, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(TLCanvas, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(KeyboardShortcuts, {})
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(EditToolbar, {
                workspaceId: workspaceId
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(InsertToolbar, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ZoomToolbar, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                "data-tldraw-menu-root": true,
                pos: "absolute",
                inset: 0,
                fontSize: "1rem"
            })
        ]
    });
};
const TLCanvas = ()=>{
    const { Canvas } = (0,dist_esm/* useEditorComponents */.ofW)();
    if (!Canvas) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(Canvas, {});
};
const KeyboardShortcuts = ()=>{
    (0,dist_esm/* useKeyboardShortcuts */.aLu)();
    (0,dist_esm/* useNativeClipboardEvents */.r45)();
    return null;
};


/***/ })

}]);
//# sourceMappingURL=2551.e92ff755ef00e85f.js.map