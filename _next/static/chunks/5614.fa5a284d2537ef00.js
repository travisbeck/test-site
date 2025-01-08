(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[5614],{

/***/ 25614:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  DataEditor: function() { return /* binding */ DataEditor; }
});

// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(52322);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs
var chunk_KRPLQIP4 = __webpack_require__(38035);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs
var chunk_PULVB27S = __webpack_require__(28535);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/button/dist/chunk-6QYXN73V.mjs
var chunk_6QYXN73V = __webpack_require__(32899);
// EXTERNAL MODULE: ../../node_modules/@fortawesome/pro-regular-svg-icons/index.mjs
var pro_regular_svg_icons = __webpack_require__(42946);
// EXTERNAL MODULE: ../../node_modules/@fortawesome/react-fontawesome/index.es.js
var index_es = __webpack_require__(49929);
// EXTERNAL MODULE: ../ui/dist/index.js + 43 modules
var dist = __webpack_require__(64253);
// EXTERNAL MODULE: ../../node_modules/@lingui/core/dist/index.mjs
var core_dist = __webpack_require__(87254);
// EXTERNAL MODULE: ../../node_modules/@silevis/reactgrid/core/handleStateUpdate-7fc017d9.js
var handleStateUpdate_7fc017d9 = __webpack_require__(40474);
// EXTERNAL MODULE: ../../node_modules/react/index.js
var react = __webpack_require__(2784);
// EXTERNAL MODULE: ../../node_modules/react-dom/profiling.js
var profiling = __webpack_require__(89760);
;// CONCATENATED MODULE: ../../node_modules/@silevis/reactgrid/core/reactgrid.esm.js

//# sourceMappingURL=reactgrid.esm.js.map

// EXTERNAL MODULE: ../../node_modules/@visx/responsive/esm/components/ParentSize.js + 24 modules
var ParentSize = __webpack_require__(2574);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/menu/dist/chunk-UZJ3TPNQ.mjs
var chunk_UZJ3TPNQ = __webpack_require__(10625);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/menu/dist/chunk-6MF6NSK4.mjs
var chunk_6MF6NSK4 = __webpack_require__(99058);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-W7WUSNWJ.mjs
var chunk_W7WUSNWJ = __webpack_require__(74008);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/menu/dist/chunk-5TWLKMYI.mjs + 1 modules
var chunk_5TWLKMYI = __webpack_require__(25481);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-3ASUQ6PA.mjs
var chunk_3ASUQ6PA = __webpack_require__(29117);
// EXTERNAL MODULE: ../../node_modules/@chakra-ui/portal/dist/chunk-34PD6CUK.mjs
var chunk_34PD6CUK = __webpack_require__(332);
// EXTERNAL MODULE: ../../node_modules/@fortawesome/pro-solid-svg-icons/index.mjs
var pro_solid_svg_icons = __webpack_require__(54933);
;// CONCATENATED MODULE: ./src/gamma_components/ContextMenu/constants.ts
const constants_DEFAULT_POSITION = {
    x: -1000,
    y: -1000
};

;// CONCATENATED MODULE: ./src/gamma_components/ContextMenu/utils.ts
function isNestingItem(item) {
    return "items" in item;
}
function isCheckItem(item) {
    return "check" in item;
}
function isMenuItem(item) {
    return "label" in item;
}
function isDividerItem(item) {
    return "divider" in item;
}
function isIconDefinition(i) {
    return "icon" in i;
}
/**
 * Takes 3 coordinates and returns the following angles:
 * alpha: angle from initial to top
 * beta: angle from initial to bottom
 *
 * These are normalized angles so they overlap. They are _expected_ to go from
 * 0 to 90deg.
 */ const getAngles = (param)=>{
    let { initial, top, bottom } = param;
    const xDiff = Math.abs(top.x - initial.x);
    const topYDiff = Math.abs(top.y - initial.y);
    const bottomYDiff = Math.abs(bottom.y - initial.y);
    if (xDiff === 0) {
        return {
            alpha: 0,
            beta: 0
        };
    }
    return {
        alpha: Math.atan(topYDiff / xDiff),
        beta: Math.atan(bottomYDiff / xDiff)
    };
};
function indexMenuItems(itemsToIndex) {
    const itemsIndex = new Map();
    const getItemFromIndex = (indexVal, items)=>{
        let current = null;
        for (const ix of indexVal){
            current = items[ix];
            if (!current) {
                console.log(indexVal, ix);
                throw new Error("item not found");
            }
            items = isNestingItem(current) ? current.items : [];
        }
        if (!current) {
            console.log(indexVal);
            throw new Error("item not found");
        }
        return current;
    };
    const getItemFromKey = (key, items)=>{
        return getItemFromIndex(itemsIndex.get(key) || [], items);
    };
    const traverseItems = function(items) {
        let indices = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        items.forEach((item, ix)=>{
            if (!isMenuItem(item)) {
                return;
            }
            const key = item.key;
            if (itemsIndex.has(key)) {
                console.log(itemsIndex.get(key));
                throw new Error("duplicated key=".concat(key));
            }
            const itemIndex = [
                ...indices,
                ix
            ];
            itemsIndex.set(key, itemIndex);
            if (isNestingItem(item)) {
                traverseItems(item.items, itemIndex);
            }
        });
    };
    traverseItems(itemsToIndex);
    const itemsHash = [
        ...itemsIndex.entries()
    ].map((param)=>{
        let [k, v] = param;
        return "".concat(k, ":").concat(v.join("|"));
    }).join(",");
    return {
        itemsIndex,
        itemsHash,
        getItemFromKey
    };
}

;// CONCATENATED MODULE: ./src/gamma_components/ContextMenu/hooks/useContextMenuListeners.ts


const SAFE_TRIANGLE_DELAY = 500;
const useContextMenuListeners = (param)=>{
    let { menuItems, position, isOpen, onClose } = param;
    const lastHoverRef = (0,react.useRef)(null);
    const openMenusRefs = (0,react.useRef)(new Map());
    const [openMenus, setOpenMenus] = (0,react.useState)([]);
    const { itemsIndex, itemsHash, getItemFromKey } = indexMenuItems(menuItems);
    const mouseMoveHandler = (0,react.useCallback)((ev)=>{
        var _ev_target, _ev_target1, _itemsIndex_get, _openMenus_nestDepth, _hoveredMenu_element, _hoveredMenu_element1, _hoveredMenu_element2;
        const menuItem = (_ev_target = ev.target) === null || _ev_target === void 0 ? void 0 : _ev_target.closest("[data-menu-item-key]");
        const menuElement = (_ev_target1 = ev.target) === null || _ev_target1 === void 0 ? void 0 : _ev_target1.closest("[data-menu-id]");
        const menuKey = (menuElement === null || menuElement === void 0 ? void 0 : menuElement.getAttribute("data-menu-id")) || "";
        const itemKey = (menuItem === null || menuItem === void 0 ? void 0 : menuItem.getAttribute("data-menu-item-key")) || "";
        if (!menuKey || !itemKey) {
            return;
        }
        const hoveredMenu = openMenusRefs.current.get(menuKey);
        if (!hoveredMenu) {
            return;
        }
        const { trigger, hideTimer } = hoveredMenu;
        const hoverKey = "".concat(menuKey, ":").concat(itemKey);
        const nestDepth = (_itemsIndex_get = itemsIndex.get(itemKey)) === null || _itemsIndex_get === void 0 ? void 0 : _itemsIndex_get.length;
        var _openMenusRefs_current_get;
        const nextSubmenu = (_openMenusRefs_current_get = openMenusRefs.current.get(nestDepth && ((_openMenus_nestDepth = openMenus[nestDepth]) === null || _openMenus_nestDepth === void 0 ? void 0 : _openMenus_nestDepth.key) || "")) !== null && _openMenusRefs_current_get !== void 0 ? _openMenusRefs_current_get : {};
        const { element: subMenuElement, key: subMenuKey, hideTimer: subMenuHideTimer } = nextSubmenu !== null && nextSubmenu !== void 0 ? nextSubmenu : {};
        const scheduleCloseSubmenu = function() {
            let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : SAFE_TRIANGLE_DELAY;
            const closeSubmenu = ()=>{
                setOpenMenus((existing)=>{
                    const updated = existing.splice(0, nestDepth);
                    existing.forEach((param)=>{
                        let { key } = param;
                        const ref = openMenusRefs.current.get(key);
                        if (!ref) {
                            return;
                        }
                        if (ref.hideTimer) {
                            clearTimeout(ref.hideTimer);
                        }
                        openMenusRefs.current.delete(key);
                    });
                    return updated;
                });
            };
            nextSubmenu.hideTimer = setTimeout(closeSubmenu, delay);
        };
        // If there's a timer to hide the menu we're currently hovering over,
        // clear it.
        if (hideTimer) {
            clearTimeout(hideTimer);
            hoveredMenu.hideTimer = undefined;
        }
        // If the hovered item is the currently opened item, update trigger
        // coords and do nothing else.
        if (itemKey === subMenuKey) {
            // Uncomment to visualize the hot zone. (1 of 3)
            // coordsInTriangle({
            //   el: subMenuElement!,
            //   initial: trigger!,
            //   currentCoords: { x: ev.clientX, y: ev.clientY },
            // })
            // End visualize the hot zone. (1 of 3)
            hoveredMenu.trigger = {
                x: ev.clientX,
                y: ev.clientY
            };
            if (subMenuHideTimer) {
                clearTimeout(subMenuHideTimer);
                nextSubmenu.hideTimer = undefined;
            }
            return;
        }
        // If there's an already opened menu item and the cursor is inside the
        // magic triangle, do nothing.
        if (subMenuElement && trigger && coordsInTriangle({
            el: subMenuElement,
            initial: trigger,
            currentCoords: {
                x: ev.clientX,
                y: ev.clientY
            }
        })) {
            if (!subMenuHideTimer) {
                scheduleCloseSubmenu();
            }
            return;
        }
        if (lastHoverRef.current === hoverKey) {
            return;
        }
        lastHoverRef.current = hoverKey;
        const item = getItemFromKey(itemKey, menuItems);
        // hover is in another menu item without nested items. Close submenu
        if (!isNestingItem(item)) {
            if (nestDepth && openMenus[nestDepth]) {
                scheduleCloseSubmenu(0);
            }
            return;
        }
        if (hideTimer) {
            clearTimeout(hideTimer);
            hoveredMenu.hideTimer = undefined;
        }
        // hover is in a menu item with nested items. Open submenu
        const openMenu = openMenus.find((param)=>{
            let { key } = param;
            return key === menuKey;
        });
        if (!openMenu) {
            console.error("menu not found", {
                openMenus: {
                    ...openMenus
                },
                menuKey
            });
            return;
        }
        const menuPosition = openMenu.position;
        var _hoveredMenu_element_offsetLeft, _hoveredMenu_element_offsetTop;
        const itemPos = {
            x: ((_hoveredMenu_element_offsetLeft = (_hoveredMenu_element = hoveredMenu.element) === null || _hoveredMenu_element === void 0 ? void 0 : _hoveredMenu_element.offsetLeft) !== null && _hoveredMenu_element_offsetLeft !== void 0 ? _hoveredMenu_element_offsetLeft : menuPosition.x) + (((_hoveredMenu_element1 = hoveredMenu.element) === null || _hoveredMenu_element1 === void 0 ? void 0 : _hoveredMenu_element1.offsetWidth) || 0),
            y: menuItem.offsetTop + ((_hoveredMenu_element_offsetTop = (_hoveredMenu_element2 = hoveredMenu.element) === null || _hoveredMenu_element2 === void 0 ? void 0 : _hoveredMenu_element2.offsetTop) !== null && _hoveredMenu_element_offsetTop !== void 0 ? _hoveredMenu_element_offsetTop : menuPosition.y)
        };
        hoveredMenu.trigger = {
            x: ev.clientX,
            y: ev.clientY
        };
        setOpenMenus((existing)=>{
            var _hoveredMenu_element;
            const updated = existing.slice(0, nestDepth);
            updated.push({
                key: itemKey,
                position: itemPos,
                offset: {
                    x: ((_hoveredMenu_element = hoveredMenu.element) === null || _hoveredMenu_element === void 0 ? void 0 : _hoveredMenu_element.offsetWidth) || menuItem.offsetWidth,
                    y: menuItem.offsetHeight * -1
                }
            });
            if (!openMenusRefs.current.has(itemKey)) {
                openMenusRefs.current.set(itemKey, {});
            }
            openMenusRefs.current.get(itemKey).key = itemKey;
            return updated;
        });
    }, // `itemsHash` reflects changes to `getItemFromKey` and `itemsIndex`.
    // `menuItems` could potentially become stale but there's no guarantee that
    // the caller memoizes this so opt for not listening to it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        openMenus,
        itemsHash
    ]);
    function getMenuItems(key) {
        if (key === "_root") {
            return menuItems;
        }
        const item = getItemFromKey(key, menuItems);
        if (isNestingItem(item)) {
            return item.items;
        }
        return [];
    }
    (0,react.useEffect)(()=>{
        window.addEventListener("mousemove", mouseMoveHandler);
        // Uncomment to visualize the hot zone. (2 of 3)
        // ;['line-a', 'line-b', 'line-c', 'line-d'].forEach((id, ix) => {
        //   const colors = ['red', 'transparent', 'green', 'transparent']
        //   if (!document.getElementById(id)) {
        //     const el = document.createElement('div')
        //     el.id = id
        //     el.style.position = 'absolute'
        //     el.style.zIndex = '9999999999'
        //     el.style.width = '500px'
        //     el.style.height = '1px'
        //     el.style.top = `${50 + ix * 10}px`
        //     el.style.left = '15px'
        //     el.style.background = colors[ix]
        //     el.style.pointerEvents = 'none'
        //     el.style.transformOrigin = 'top left'
        //
        //     document.body.appendChild(el)
        //   }
        // })
        // End visualize the hot zone. (2 of 3)
        return ()=>{
            window.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, [
        mouseMoveHandler
    ]);
    (0,react.useEffect)(()=>{
        if (isOpen === false) {
            setOpenMenus([]);
            openMenusRefs.current = new Map();
        } else {
            setOpenMenus([
                {
                    key: "_root",
                    position,
                    offset: {
                        x: 0,
                        y: 0
                    }
                }
            ]);
        }
        const clickHandler = (ev)=>{
            var _ev_target;
            if (!isOpen) {
                return;
            }
            const menuElement = (_ev_target = ev.target) === null || _ev_target === void 0 ? void 0 : _ev_target.closest("[data-menu-id]");
            if (!menuElement) {
                onClose();
            }
        };
        window.addEventListener("mousedown", clickHandler);
        return ()=>{
            window.removeEventListener("mousedown", clickHandler);
        };
    // We don't care about changes to `position` we only care about its value
    // when `isOpen` changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isOpen,
        onClose
    ]);
    (0,react.useEffect)(()=>{
        setOpenMenus((existing)=>{
            if (!existing.length) {
                return existing;
            }
            existing[0].position = {
                x: position.x,
                y: position.y
            };
            return existing;
        });
    }, [
        position.x,
        position.y
    ]);
    return {
        setMenuRef: (key)=>(element)=>{
                if (!openMenusRefs.current.has(key)) {
                    openMenusRefs.current.set(key, {});
                }
                openMenusRefs.current.get(key).element = element;
            },
        openMenus,
        getMenuItems
    };
};
function coordsInTriangle(param) {
    let { el, initial, currentCoords } = param;
    if (!el || el.offsetTop < 0 || el.offsetLeft < 0) {
        return false;
    }
    // If the cursor x is going away from the target, don't bother checking.
    if (el.offsetLeft < initial.x && currentCoords.x > initial.x || el.offsetLeft > initial.x && currentCoords.x < initial.x) {
        return false;
    }
    const delta = {
        x: 0,
        y: 0
    };
    if (el.offsetLeft < initial.x) {
        delta.x += el.offsetWidth;
    }
    const angles = getAngles({
        initial,
        top: {
            y: el.offsetTop,
            x: el.offsetLeft + delta.x
        },
        bottom: {
            y: el.offsetTop + el.offsetHeight,
            x: el.offsetLeft + delta.x
        }
    });
    const clickAngle = Math.atan(Math.abs(initial.y - currentCoords.y) / Math.abs(currentCoords.x - initial.x));
    // Uncomment to visualize the hot zone. (3 of 3)
    // ;['line-a', 'line-b', 'line-c', 'line-d'].forEach((id, ix) => {
    //   const a = document.getElementById(id)
    //   if (!a) {
    //     return
    //   }
    //   a.style.top = `${initial.y}px`
    //   a.style.left = `${initial.x}px`
    //   a.style.transformOrigin = 'left'
    //
    //   switch (ix) {
    //     case 0:
    //       if (delta.x) {
    //         a.style.transform = `rotate(${1 * Math.PI + angles.alpha}rad)`
    //       } else {
    //         a.style.transform = `rotate(${2 * Math.PI - angles.alpha}rad)`
    //       }
    //       break
    //     case 1:
    //       a.style.left = `${initial.x - 250}px`
    //       break
    //     case 2:
    //       if (delta.x) {
    //         a.style.transform = `rotate(${1 * Math.PI - angles.beta}rad)`
    //       } else {
    //         a.style.transform = `rotate(${angles.beta}rad)`
    //       }
    //       break
    //     case 3:
    //       if (currentCoords.y < initial.y) {
    //         a.style.transform = `rotate(${2 * Math.PI - clickAngle}rad)`
    //       } else {
    //         a.style.transform = `rotate(${clickAngle}rad)`
    //       }
    //       break
    //   }
    // })
    // End visualize the hot zone. (3 of 3)
    if (currentCoords.y < initial.y) {
        return clickAngle < angles.alpha;
    }
    return clickAngle < angles.beta;
}

// EXTERNAL MODULE: ../../node_modules/lodash/debounce.js
var debounce = __webpack_require__(54073);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);
;// CONCATENATED MODULE: ./src/gamma_components/ContextMenu/hooks/usePreventOverflow.tsx


const usePreventOverflow = (param)=>{
    let { element, position, offset = {
        x: 0,
        y: 0
    } } = param;
    const [viewDimensions, setViewDimensions] = (0,react.useState)({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [newPosition, setNewPosition] = (0,react.useState)({
        x: position.x,
        y: position.y
    });
    const calculatePosition = (0,react.useCallback)((el)=>{
        const { width: viewWidth, height: viewHeight } = viewDimensions;
        if (position.x < 0 || position.y < 0) {
            return;
        }
        const delta = {
            x: 0,
            y: 0
        };
        if (el.offsetWidth + position.x > viewWidth) {
            delta.x = (el.offsetWidth + offset.x) * -1;
        }
        if (el.offsetHeight + position.y > viewHeight) {
            delta.y = (el.offsetHeight + offset.y) * -1;
        }
        const np = {
            x: position.x + delta.x,
            y: position.y + delta.y
        };
        if (np.x !== newPosition.x || np.y !== newPosition.y) {
            setNewPosition(np);
        }
    }, [
        position.x,
        position.y,
        offset.x,
        offset.y,
        newPosition,
        viewDimensions
    ]);
    (0,react.useEffect)(()=>{
        const setBounds = debounce_default()(()=>{
            setViewDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }, 150);
        window.addEventListener("resize", setBounds);
        return ()=>{
            window.removeEventListener("resize", setBounds);
        };
    }, []);
    (0,react.useEffect)(()=>{
        if (!element) {
            return;
        }
        calculatePosition(element);
    }, [
        calculatePosition,
        element
    ]);
    return {
        calculatePosition,
        position: newPosition
    };
};

;// CONCATENATED MODULE: ./src/gamma_components/ContextMenu/ContextMenu.tsx










const ContextMenuInner = /*#__PURE__*/ (0,react.forwardRef)((param, selfRef)=>{
    let { isOpen, onClose, menuItems, position, parentOffset = {
        x: 0,
        y: 0
    }, id, activeElement } = param;
    const menuRef = (0,react.useRef)(null);
    // Checks if the element overflows the screen and returns a position to
    // flip it if it does.
    const { position: menuPosition, calculatePosition } = usePreventOverflow({
        element: menuRef.current,
        position,
        offset: parentOffset
    });
    const exposeRef = ()=>{
        var _menuRef_current;
        // There doesn't seem to be a way to get a ref directly to the parent...
        const parentNode = ((_menuRef_current = menuRef.current) === null || _menuRef_current === void 0 ? void 0 : _menuRef_current.parentNode) || null;
        if (typeof selfRef === "function") {
            selfRef(parentNode);
        } else if (selfRef) {
            selfRef.current = parentNode;
        }
    };
    (0,react.useEffect)(()=>{
        if (selfRef) {
            exposeRef();
        }
    // It's safe to call a "stale" version of `exposeRef`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selfRef
    ]);
    const setRef = (el)=>{
        // menuRef is the ref to this menuList item
        menuRef.current = el;
        exposeRef();
        if (el) {
            calculatePosition(el);
        }
    };
    const itemsHash = menuItems.map((i)=>isDividerItem(i) ? "divider" : i.key).join(",");
    (0,react.useEffect)(()=>{
        if (menuRef.current) {
            calculatePosition(menuRef.current);
        }
    // `calculatePosition` is not in the dependencies. We don't want to call
    // it when it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        itemsHash,
        position
    ]);
    const items = (0,react.useMemo)(()=>menuItems.filter((item)=>!isDividerItem(item)), [
        menuItems
    ]);
    const menuHasChecked = !!items.find((item)=>isCheckItem(item));
    const menuHasIcons = !!items.find((item)=>item.icon);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_UZJ3TPNQ/* Menu */.v, {
            isOpen: isOpen,
            onClose: onClose,
            closeOnBlur: false,
            closeOnSelect: true,
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_6MF6NSK4/* MenuList */.q, {
                "data-menu-id": id,
                zIndex: "tooltip",
                rootProps: {
                    style: {
                        top: menuPosition.y,
                        left: menuPosition.x
                    }
                },
                ref: setRef,
                children: menuItems.map((item, ix)=>isDividerItem(item) ? /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_W7WUSNWJ/* Divider */.i, {
                        color: "gray.300",
                        my: 2
                    }, "divider-".concat(ix)) : /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_5TWLKMYI/* MenuItem */.s, {
                        cursor: "pointer",
                        icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(ItemLeftIcon, {
                            item: item,
                            menuHasIcons: menuHasIcons,
                            menuHasChecked: menuHasChecked
                        }),
                        background: activeElement === item.key ? "gray.100" : undefined,
                        closeOnSelect: !isNestingItem(item),
                        onClick: isNestingItem(item) ? undefined : item.onClick,
                        isDisabled: item.disabled,
                        color: item.color,
                        "data-menu-item-key": item.key,
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
                            width: "100%",
                            pointerEvents: "none",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                                    flexGrow: 2,
                                    children: item.label
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                                    flexGrow: 0,
                                    pl: 2,
                                    children: isNestingItem(item) && /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
                                        icon: pro_regular_svg_icons/* faAngleRight */.yOZ
                                    })
                                })
                            ]
                        })
                    }, item.key))
            })
        })
    });
});
ContextMenuInner.displayName = "ContextMenuInner";
const ItemLeftIcon = (param)=>{
    let { item, menuHasIcons, menuHasChecked } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_3ASUQ6PA/* HStack */.U, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                menuHasChecked && /*#__PURE__*/ (0,jsx_runtime.jsx)(ItemCheckIcon, {
                    item: item
                }),
                menuHasIcons && /*#__PURE__*/ (0,jsx_runtime.jsx)(ItemIcon, {
                    item: item
                })
            ]
        })
    });
};
const ItemCheckIcon = (param)=>{
    let { item } = param;
    if (!isCheckItem(item) || !item.check) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
            width: "1em"
        });
    }
    if (item.check === "multiple") {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
            icon: pro_solid_svg_icons/* faMinus */.Kl4
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
        icon: pro_solid_svg_icons/* faCheck */.LEp
    });
};
const ItemIcon = (param)=>{
    let { item } = param;
    if (!item.icon) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
            width: "1em"
        });
    }
    if (isIconDefinition(item.icon)) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
            icon: item.icon
        });
    }
    return item.icon;
};
const ContextMenu = (param)=>{
    let { onClose, isOpen, menuItems, position } = param;
    const { setMenuRef, openMenus, getMenuItems } = useContextMenuListeners({
        isOpen,
        onClose,
        menuItems,
        position
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_34PD6CUK/* Portal */.h, {
        appendToParentPortal: false,
        children: [
            ...openMenus,
            null
        ].map((menu, ix)=>{
            var _openMenus_;
            var _openMenus__key;
            return menu === null ? /*#__PURE__*/ (0,jsx_runtime.jsx)(ContextMenuInner, {
                id: "placeholder",
                menuItems: [],
                position: constants_DEFAULT_POSITION,
                isOpen: false,
                onClose: onClose
            }, "menu-".concat(ix)) : /*#__PURE__*/ (0,jsx_runtime.jsx)(ContextMenuInner, {
                id: menu.key,
                activeElement: (_openMenus__key = (_openMenus_ = openMenus[ix + 1]) === null || _openMenus_ === void 0 ? void 0 : _openMenus_.key) !== null && _openMenus__key !== void 0 ? _openMenus__key : undefined,
                menuItems: getMenuItems(menu.key),
                position: menu.position,
                parentOffset: menu.offset,
                isOpen: true,
                // If a child element "autocloses" i.e. on select, close everything.
                onClose: onClose,
                ref: setMenuRef(menu.key)
            }, "menu-".concat(ix));
        })
    });
};

;// CONCATENATED MODULE: ./src/gamma_components/ContextMenu/hooks/useContextMenu.ts


const useContextMenu = ()=>{
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [isOpen, setIsOpen] = useState(false);
    const onContextMenu = (ev)=>{
        ev.stopPropagation();
        ev.preventDefault();
        const pos = {
            x: ev.clientX,
            y: ev.clientY
        };
        setPosition(pos);
        setIsOpen(true);
    };
    return {
        onContextMenu,
        menuProps: {
            isOpen,
            position,
            onClose: ()=>{
                setIsOpen(false);
                setPosition(DEFAULT_POSITION);
            }
        }
    };
};

;// CONCATENATED MODULE: ./src/gamma_components/ContextMenu/index.tsx




// EXTERNAL MODULE: ./src/modules/charts/context/index.tsx + 1 modules
var context = __webpack_require__(52725);
// EXTERNAL MODULE: ./src/modules/charts/context/actions.ts
var actions = __webpack_require__(49769);
// EXTERNAL MODULE: ./src/modules/charts/data/ChartRange.ts
var ChartRange = __webpack_require__(40156);
;// CONCATENATED MODULE: ./src/modules/charts/data/serializers/chartTSVSerializer.ts
const chartTSVSerializer = {
    serialize (data) {
        let { includeLabels } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const out = [];
        if (includeLabels) {
            out.push(data.columns.map((param)=>{
                let { label } = param;
                return label;
            }).join("	"));
        }
        for (const row of data.rows){
            const outRow = [];
            for (const column of data.columns){
                outRow.push(data.getCellOrThrow({
                    row: row.id,
                    column: column.id
                }).textValue);
            }
            out.push(outRow.join("	"));
        }
        return out.join("\n");
    }
};

// EXTERNAL MODULE: ./src/modules/charts/data/utils.ts
var utils = __webpack_require__(549);
// EXTERNAL MODULE: ./src/modules/charts/data/constants.ts
var constants = __webpack_require__(48148);
;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/constants.ts
const CHART_GRID_HEADER_ROW_ID = "__header__";
const CHART_GRID_GUTTER_ID = "__gutter__";
// 40px seems to be the minimum width in react grid
// TODO (javier): Dig deeper into this
const CHART_GRID_GUTTER_WIDTH = 40;

;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/functions/clipboard.ts






const CHART_DATA_MIME = "application/gamma.chart+json";
function handlePastedData(data, pastedData, focus, selection) {
    const messages = [];
    const plainData = pastedData.getData("text/plain");
    // parse pastedData
    const pastedRows = plainData.split(/\r?\n/).map((d)=>d.split("	"));
    const pos = focus ? findCellPosition(data, focus) : {
        row: -1,
        column: 0
    };
    // Truncate rows
    const deletedRows = pastedRows.splice(constants/* CHART_MAX_ROWS */.F - pos.row);
    // Truncate every column
    const deletedCells = pastedRows.map((columns)=>columns.splice(constants/* CHART_MAX_COLS */.Z - pos.column)).flat();
    if (deletedRows.length) {
        messages.push({
            severity: "warning",
            message: core_dist/* i18n */.ag._({
                id: "ApWHNy",
                values: {
                    CHART_MAX_ROWS: constants/* CHART_MAX_ROWS */.F
                }
            })
        });
    }
    if (deletedCells.length) {
        messages.push({
            severity: "warning",
            message: core_dist/* i18n */.ag._({
                id: "fWPCNB",
                values: {
                    CHART_MAX_COLS: constants/* CHART_MAX_COLS */.Z
                }
            })
        });
    }
    // Handles pasting a single value in all selected cells.
    if (pastedRows.length === 1 && pastedRows[0].length === 1) {
        const pastedValue = pastedRows[0][0];
        selection.data.cells.forEach((cell)=>{
            cell.textValue = pastedValue;
        });
        return {
            messages
        };
    }
    return {
        pastedRange: pasteData(data, pos, pastedRows),
        messages
    };
}
function pasteData(data, pos, pastedRows) {
    const missingRows = pastedRows.length - (data.rows.length - pos.row);
    const missingColumns = pastedRows[0].length - (data.columns.length - pos.column);
    const columnTypes = guessColumnTypes(pastedRows);
    // Add missing columns
    for(let i = 0; i < missingColumns; i++){
        const row = pastedRows[1];
        const columnIx = row.length - missingColumns + i;
        data.addEmptyColumn(columnTypes[columnIx]);
    }
    // Add missing rows
    for(let i = 0; i < missingRows; i++){
        data.addEmptyRow();
    }
    const pastedRange = {
        includesLabels: pos.row === -1
    };
    pastedRows.forEach((pastedColumns, ri)=>{
        const rowIx = ri + pos.row;
        // Editing column labels
        if (rowIx === -1) {
            // Hack for the case when the resulting selection would only contain
            // label rows... I don't like this
            pastedRange.from = {
                row: CHART_GRID_HEADER_ROW_ID,
                column: data.columns[pos.column].id
            };
            pastedColumns.forEach((value, ci)=>{
                const column = data.columns[ci + pos.column];
                column.label = value;
                pastedRange.to = {
                    row: CHART_GRID_HEADER_ROW_ID,
                    column: column.id
                };
            });
            return;
        }
        const row = data.rows[rowIx];
        if (!row) {
            throw new Error("We did something baaaad - row");
        }
        pastedColumns.forEach((value, ci)=>{
            const columnIx = ci + pos.column;
            const column = data.columns[columnIx];
            if (!column) {
                throw new Error("Column at index={columnIx} not found");
            }
            if (rowIx === 0 && (column.isEmpty(data) || pastedRows.length >= data.rows.filter((r)=>!r.isEmpty(data)).length - pos.row)) {
                column.updateType(data, columnTypes[ci]);
            }
            const currentCellLocation = {
                row: row.id,
                column: column.id
            };
            const cell = data.getCellOrThrow(currentCellLocation);
            cell.textValue = value;
            if (!pastedRange.from || pastedRange.from.row === CHART_GRID_HEADER_ROW_ID) {
                pastedRange.from = currentCellLocation;
            }
            pastedRange.to = currentCellLocation;
        });
    });
    return new ChartRange/* ChartRange */.r(data, pastedRange.from, pastedRange.to, pastedRange.includesLabels);
}
function handleCopyData(dataTransfer, selection) {
    const rangeData = selection.data;
    // TODO (javier): Handle this mime type on paste so we can copy decorators
    // and other metadata. Figure out how to retain information about whether or
    // not the range includes the labels.
    dataTransfer.setData(CHART_DATA_MIME, JSON.stringify(rangeData));
    dataTransfer.setData("text/plain", chartTSVSerializer.serialize(rangeData, {
        includeLabels: selection.includesLabels
    }));
    return rangeData;
}
function findCellPosition(data, param) {
    let { rowId, columnId } = param;
    const row = data.rows.findIndex((r)=>r.id === rowId);
    const column = data.columns.findIndex((c)=>c.id === columnId);
    if (rowId === CHART_GRID_HEADER_ROW_ID) {
        return {
            row: -1,
            column
        };
    }
    // If either row or column were not found (shouldn't happen) return top left
    if (row < 0 || column < 0) {
        return {
            row: -1,
            column: 0
        };
    }
    return {
        row,
        column
    };
}
/**
 * Iterates over the data and guesses the column type and format.
 *
 * The heuristic is pretty simple. It tries to parse the data with each
 * formatter and counts how many were succesful. It then determines the format
 * by looking at the format that was succesful the most.
 *
 * Once a formatter succeeds, it stops looking for a match so ambiguous data
 * will prefer formatters specified first in the formatters map.
 */ function guessColumnTypes(tsvData) {
    const columnTypeFormats = new Map();
    for (const row of tsvData){
        for(let i = 0; i < row.length; i++){
            const format = (0,utils/* findDataFormat */.iA)(row[i], i);
            if (!columnTypeFormats.has(i)) {
                columnTypeFormats.set(i, new Map());
            }
            const columnFormats = columnTypeFormats.get(i);
            columnFormats.set(format, (columnFormats.get(format) || 0) + 1);
        }
    }
    return [
        ...columnTypeFormats.values()
    ].map((colEntries)=>{
        const columnTypes = [
            ...colEntries.entries()
        ];
        columnTypes.sort((a, b)=>{
            return b[1] - a[1];
        });
        const winner = columnTypes[0][0];
        return winner === "label" ? {
            type: winner
        } : {
            type: "data",
            format: winner
        };
    });
}

// EXTERNAL MODULE: ../../node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs
var chunk_2OOHT3W5 = __webpack_require__(77533);
;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/cells/utils.ts

function handleCellInputKeyDown(e) {
    const target = e.currentTarget;
    const { selectionStart, selectionEnd, value } = target;
    const arrows = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown"
    ];
    const key = e.key;
    let stopPropagation = true;
    if (selectionStart === selectionEnd && arrows.includes(key) && !e.shiftKey) {
        switch(key){
            case "ArrowUp":
            case "ArrowLeft":
                if (selectionEnd === 0) {
                    stopPropagation = false;
                }
                break;
            case "ArrowDown":
            case "ArrowRight":
                if (selectionEnd === value.length) {
                    stopPropagation = false;
                }
                break;
        }
    }
    if (stopPropagation && ((0,handleStateUpdate_7fc017d9.K)(e.keyCode) || e.altKey || e.ctrlKey || e.metaKey)) {
        e.stopPropagation();
    }
    if (key === "Escape") {
        this.wasEscKeyPressed = true;
    }
}

;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/cells/DelegateCell.tsx





class DelegateCellTemplate {
    update(cell, cellToMerge) {
        return this.getCompatibleCell({
            ...cell,
            cell: cellToMerge.cell || cell.cell,
            text: cellToMerge.text
        });
    }
    getCompatibleCell(uncertainCell) {
        const cell = uncertainCell.cell;
        if (!cell) {
            throw new Error("cell missing for delegate cell");
        }
        var _uncertainCell_text;
        return {
            ...uncertainCell,
            cell,
            text: (_uncertainCell_text = uncertainCell.text) !== null && _uncertainCell_text !== void 0 ? _uncertainCell_text : cell.textValue,
            value: (0,utils/* isDataCell */.Vd)(cell) ? cell.data : Number.NaN
        };
    }
    handleKeyDown(cell, keyCode, ctrl, shift, alt, key) {
        if (!ctrl && !alt && (0,handleStateUpdate_7fc017d9.w)(keyCode)) {
            return {
                cell: {
                    ...cell,
                    text: (0,handleStateUpdate_7fc017d9.O)(key, shift)
                },
                enableEditMode: true
            };
        }
        return {
            cell,
            enableEditMode: keyCode === handleStateUpdate_7fc017d9.bz.POINTER || keyCode === handleStateUpdate_7fc017d9.bz.ENTER
        };
    }
    getClassName(delegateCell) {
        const cell = delegateCell.cell;
        const classNames = [
            "cell-type-".concat(cell.type)
        ];
        if (cell.hasError) {
            classNames.push("rg-invalid");
        }
        if ((0,utils/* isDataCell */.Vd)(cell)) {
            classNames.push("cell-format-".concat(cell.getFormatter().type));
        }
        return classNames.join(" ");
    }
    render(cell, isEditing, onCellChanged) {
        if (!isEditing) {
            return /*#__PURE__*/ (0,jsx_runtime.jsx)(DelegateCellComponent, {
                cell: cell,
                onCellChanged: onCellChanged
            });
        }
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
            ref: (input)=>{
                if (!input) {
                    return;
                }
                input.focus();
                // Puts the cursor at the end of the text input
                input.setSelectionRange(input.value.length, input.value.length);
            },
            className: "cell-type-".concat(cell.cell.type),
            defaultValue: cell.text,
            onChange: (e)=>{
                onCellChanged(this.getCompatibleCell({
                    ...cell,
                    text: e.currentTarget.value
                }), false);
            },
            onBlur: (e)=>{
                onCellChanged(this.getCompatibleCell({
                    ...cell,
                    text: e.currentTarget.value
                }), !this.wasEscKeyPressed);
                this.wasEscKeyPressed = false;
            },
            onCopy: (e)=>e.stopPropagation(),
            onCut: (e)=>e.stopPropagation(),
            onPaste: (e)=>e.stopPropagation(),
            onPointerDown: (e)=>e.stopPropagation(),
            onKeyDown: handleCellInputKeyDown.bind(this)
        });
    }
    constructor(){
        this.wasEscKeyPressed = false;
    }
}
const DelegateCellComponent = (param)=>{
    let { cell } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_3ASUQ6PA/* HStack */.U, {
        width: "100%",
        position: "relative",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_2OOHT3W5/* Text */.x, {
            as: "span",
            flexGrow: 1,
            className: "cell-content",
            children: cell.text
        })
    });
};

;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/columnTypes.tsx


const availableColumnTypes = {
    label: {
        label: ()=>core_dist/* i18n */.ag._({
                id: "87a/t/"
            }),
        icon: pro_regular_svg_icons/* faFontCase */.nUG
    },
    raw: {
        label: ()=>core_dist/* i18n */.ag._({
                id: "kZz4L7"
            }),
        icon: pro_regular_svg_icons/* fa00 */.KR_
    },
    currency: {
        label: ()=>core_dist/* i18n */.ag._({
                id: "Q2lUR2"
            }),
        icon: pro_regular_svg_icons/* faDollar */.n7u
    },
    percentage: {
        label: ()=>core_dist/* i18n */.ag._({
                id: "/roQKz"
            }),
        icon: pro_regular_svg_icons/* faPercent */.jGC
    }
};

;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/cells/GutterCell.tsx








class GutterCellTemplate {
    getCompatibleCell(uncertainCell) {
        const text = uncertainCell.text || "";
        const value = parseFloat(text);
        return {
            ...uncertainCell,
            text,
            value,
            column: uncertainCell.column
        };
    }
    handleKeyDown(cell) {
        return {
            cell,
            enableEditMode: false
        };
    }
    isFocusable(_cell) {
        // We don't disable focus here because we want to select the whole line if
        // the user navigates to the gutter with the keyboard. This is handled by
        // `onFocusLocationChanging`
        return true;
    }
    update(cell, cellToMerge) {
        return this.getCompatibleCell({
            ...cell,
            text: cellToMerge.text
        });
    }
    render(cell) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(GutterCellComponent, {
            cell: cell
        });
    }
}
// React complains if we try to use hooks inside a class component
const GutterCellComponent = (param)=>{
    let { cell } = param;
    const { state, dispatch } = (0,react.useContext)(context/* ChartContext */._M);
    const column = cell.column;
    if (!column) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
            children: cell.text
        });
    }
    const format = column.type === "label" ? "label" : column.format;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
        width: "100%",
        position: "relative",
        pr: 2,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_2OOHT3W5/* Text */.x, {
                as: "span",
                flexGrow: 2,
                textAlign: "center",
                children: cell.text
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_6QYXN73V/* IconButton */.h, {
                "aria-label": "options",
                variant: "link",
                color: "gray.700",
                flexGrow: 0,
                icon: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_3ASUQ6PA/* HStack */.U, {
                    children: [
                        column.fixedType ? /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
                            size: "xs",
                            icon: availableColumnTypes[format].icon
                        }) : /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
                            size: "xs",
                            icon: pro_solid_svg_icons/* faSparkles */.JyM
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
                            icon: pro_solid_svg_icons/* faAngleDown */.gc2
                        })
                    ]
                }),
                cursor: "pointer",
                justifyContent: "flex-start",
                onMouseDownCapture: (ev)=>{
                    var _state_gridFunctions;
                    (_state_gridFunctions = state.gridFunctions) === null || _state_gridFunctions === void 0 ? void 0 : _state_gridFunctions.selectColumn(column.id);
                    dispatch((0,actions/* openContextMenuAction */.oV)({
                        x: ev.clientX,
                        y: ev.clientY
                    }));
                    ev.stopPropagation();
                }
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/cells/HeaderCell.tsx




class GammaHeaderCellTemplate {
    update(cell, cellToMerge) {
        var _cellToMerge_column;
        return this.getCompatibleCell({
            ...cell,
            column: cellToMerge.column || cell.column,
            text: cellToMerge.text,
            columnType: cellToMerge.columnType || ((_cellToMerge_column = cellToMerge.column) === null || _cellToMerge_column === void 0 ? void 0 : _cellToMerge_column.type)
        });
    }
    getCompatibleCell(uncertainCell) {
        const column = uncertainCell.column;
        if (!column) {
            throw new Error("column missing for header cell");
        }
        var _uncertainCell_text;
        return {
            ...uncertainCell,
            column,
            text: (_uncertainCell_text = uncertainCell.text) !== null && _uncertainCell_text !== void 0 ? _uncertainCell_text : column.label,
            columnType: uncertainCell.columnType || column.type,
            value: Number.NaN
        };
    }
    handleKeyDown(cell, keyCode, ctrl, shift, alt, key) {
        if (!ctrl && !alt && (0,handleStateUpdate_7fc017d9.w)(keyCode)) {
            return {
                cell: {
                    ...cell,
                    text: (0,handleStateUpdate_7fc017d9.O)(key, shift)
                },
                enableEditMode: true
            };
        }
        return {
            cell,
            enableEditMode: keyCode === handleStateUpdate_7fc017d9.bz.POINTER || keyCode === handleStateUpdate_7fc017d9.bz.ENTER
        };
    }
    getClassName(cell, _isInEditMode) {
        var _cell_column;
        return "column-type-".concat((_cell_column = cell.column) === null || _cell_column === void 0 ? void 0 : _cell_column.type);
    }
    render(cell, isEditing, onCellChanged) {
        if (!isEditing) {
            return /*#__PURE__*/ (0,jsx_runtime.jsx)(GammaHeaderCellComponent, {
                cell: cell,
                onCellChanged: onCellChanged
            });
        }
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
            ref: (input)=>{
                if (!input) {
                    return;
                }
                input.focus();
                // Puts the cursor at the end of the text input
                input.setSelectionRange(input.value.length, input.value.length);
            },
            defaultValue: cell.text,
            onChange: (e)=>{
                onCellChanged(this.getCompatibleCell({
                    ...cell,
                    text: e.currentTarget.value
                }), false);
            },
            onBlur: (e)=>{
                onCellChanged(this.getCompatibleCell({
                    ...cell,
                    text: e.currentTarget.value
                }), !this.wasEscKeyPressed);
                this.wasEscKeyPressed = false;
            },
            onCopy: (e)=>e.stopPropagation(),
            onCut: (e)=>e.stopPropagation(),
            onPaste: (e)=>e.stopPropagation(),
            onPointerDown: (e)=>e.stopPropagation(),
            onKeyDown: handleCellInputKeyDown.bind(this)
        });
    }
    constructor(){
        this.wasEscKeyPressed = false;
    }
}
const GammaHeaderCellComponent = (param)=>{
    let { cell } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_3ASUQ6PA/* HStack */.U, {
        width: "100%",
        position: "relative",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_2OOHT3W5/* Text */.x, {
            flexGrow: 1,
            children: cell.text
        })
    });
};

;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/chartReactGridSerializer.ts

const chartReactGridSerializer = {
    serialize (data) {
        const headerRows = [
            {
                rowId: CHART_GRID_GUTTER_ID,
                cells: [
                    {
                        type: "gutter",
                        text: ""
                    }
                ],
                height: 40
            },
            {
                rowId: CHART_GRID_HEADER_ROW_ID,
                cells: [
                    {
                        type: "gutter",
                        text: "1"
                    }
                ],
                height: 40
            }
        ];
        const columnLabel = [];
        const columns = data.columns.map((col)=>{
            incrementLetteredLabel(columnLabel);
            headerRows[0].cells.push({
                type: "gutter",
                text: columnLabel.map((c)=>String.fromCharCode(c)).join(""),
                column: col
            });
            headerRows[1].cells.push({
                type: "gamma-header",
                column: col
            });
            return {
                columnId: col.id,
                reorderable: true,
                resizable: false
            };
        });
        columns.unshift({
            columnId: CHART_GRID_GUTTER_ID,
            reorderable: false,
            resizable: false,
            width: CHART_GRID_GUTTER_WIDTH
        });
        const rows = [
            ...headerRows,
            ...data.rows.map((row, ix)=>({
                    rowId: row.id,
                    reorderable: true,
                    height: 40,
                    cells: [
                        {
                            type: "gutter",
                            text: "".concat(ix + headerRows.length)
                        },
                        ...data.columns.map((col)=>{
                            const cell = data.getCell({
                                row: row.id,
                                column: col.id
                            });
                            if (!cell) {
                                console.error("no cell found", row, col);
                                throw new Error("no cell found");
                            }
                            return {
                                type: "delegate",
                                cell
                            };
                        })
                    ]
                }))
        ];
        return {
            columns,
            rows
        };
    }
};
function incrementLetteredLabel(arr, ix) {
    const a = 65 // ASCII A
    ;
    const z = a + 25 // ASCII Z
    ;
    if (ix === undefined) {
        return incrementLetteredLabel(arr, arr.length - 1);
    }
    if (ix < 0) {
        arr.push(a);
        return;
    }
    if (arr[ix] === z) {
        arr[ix] = a;
        return incrementLetteredLabel(arr, ix - 1);
    }
    arr[ix]++;
}

// EXTERNAL MODULE: ./src/utils/types.ts
var types = __webpack_require__(68951);
;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/functions.ts







const handleGridKeyDown = (reactGridRef, focusRef)=>(ev)=>{
        if (ev.target === focusRef.current) {
            return;
        }
        const key = ev.key;
        switch(key){
            case "Escape":
                {
                    var _focusRef_current;
                    // We only want to handle this when the focus is not on the cell editor.
                    if (!isHiddenFocusElement(reactGridRef.current, ev.target)) {
                        return;
                    }
                    if (reactGridRef.current && !shouldLoseGridFocus(reactGridRef.current)) {
                        return;
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    (_focusRef_current = focusRef.current) === null || _focusRef_current === void 0 ? void 0 : _focusRef_current.focus();
                    break;
                }
        }
    };
function isHiddenFocusElement(reactGridObject, element) {
    var _reactGridObject_state;
    const focusElement = reactGridObject === null || reactGridObject === void 0 ? void 0 : (_reactGridObject_state = reactGridObject.state) === null || _reactGridObject_state === void 0 ? void 0 : _reactGridObject_state.hiddenFocusElement;
    return !!element && element === focusElement;
}
function shouldLoseGridFocus(reactGridObject) {
    const state = reactGridObject.state;
    switch(state.selectionMode){
        case "range":
            {
                if (!state.selectedRanges) {
                    return true;
                }
                const firstRange = state.selectedRanges[0];
                // Only a single cell is selected. Lose focus.
                if (state.selectedRanges.length === 1 && firstRange.columns.length == 1 && firstRange.rows.length == 1) {
                    return true;
                }
                selectCell(reactGridObject, {
                    position: state.focusedLocation ? {
                        column: state.focusedLocation.column.columnId,
                        row: state.focusedLocation.row.rowId
                    } : {
                        column: firstRange.first.column.columnId,
                        row: firstRange.first.row.rowId
                    }
                });
                return false;
            }
        case "column":
        case "row":
            {
                selectCell(reactGridObject, state.focusedLocation && {
                    position: {
                        column: state.focusedLocation.column.columnId,
                        row: state.focusedLocation.row.rowId
                    }
                });
                return false;
            }
    }
    return true;
}
function deleteLinesAndChangeFocus(lineType, linesToDelete, data, reactGridObject) {
    let focusColIx = data.getLines(lineType).findIndex((line)=>line.id === linesToDelete[0]);
    data.deleteLines(lineType, linesToDelete);
    if (focusColIx >= data.getLines(lineType).length) {
        focusColIx--;
    }
    if (focusColIx < 0) {
        focusColIx = 0;
    }
    const position = {
        [lineType]: data.getLines(lineType)[focusColIx].id,
        [(0,utils/* getLineAnalogue */.v5)(lineType)]: lineType === "column" ? CHART_GRID_HEADER_ROW_ID : data["".concat((0,utils/* getLineAnalogue */.v5)(lineType), "s")][0].id
    };
    // Seems like state updates in the grid don't happen syncronously so updates
    // we send right before updating the data get lost.
    // TODO (javier): Get rid of all these fragile `setTimeout`s.
    setTimeout(()=>{
        selectCell(reactGridObject, {
            position
        });
    }, 0);
}
function applyChangeset(changeset, data, reactGridObject) {
    const columnsToDelete = shouldDeleteColumns(changeset, data);
    if (columnsToDelete) {
        deleteLinesAndChangeFocus("column", columnsToDelete, data, reactGridObject);
        return true;
    }
    const rowsToDelete = shouldDeleteRows(changeset, data);
    if (rowsToDelete) {
        deleteLinesAndChangeFocus("row", rowsToDelete, data, reactGridObject);
        return true;
    }
    const changesetApplied = changeset.reduce((applied, change)=>{
        const changeApplied = applyDataChangeInPlace(change, data, reactGridObject);
        return changeApplied || applied;
    }, false);
    return changesetApplied;
}
function applyDataChangeInPlace(change, data, _reactGridObject) {
    const { rowId, columnId, newCell } = change;
    if (rowId === CHART_GRID_HEADER_ROW_ID) {
        const newHeaderCell = newCell;
        const column = data.getColumn("".concat(columnId));
        if (!column) {
            return false;
        }
        column.label = newHeaderCell.text || "";
        return true;
    }
    if (columnId == CHART_GRID_GUTTER_ID || rowId === CHART_GRID_GUTTER_ID) {
        // gutters are immutable
        return false;
    }
    const cell = data.getCell({
        row: "".concat(rowId),
        column: "".concat(columnId)
    });
    if (!cell) {
        // Should we throw here? How do we do error handling?
        console.warn("no cell", change);
        return false;
    }
    cell.textValue = "".concat(newCell.text);
    (0,utils/* updateColumnTypeFromCell */.Tx)(cell, data);
    return true;
}
function getFocusLocation(reactGridObject) {
    const focus = reactGridObject.state.focusedLocation;
    if (!focus) {
        return null;
    }
    return {
        rowId: focus.row.rowId,
        columnId: focus.column.columnId
    };
}
function isHeaderRow(id) {
    return [
        CHART_GRID_HEADER_ROW_ID,
        // Gutter row shouldn't be selectable but better safe.
        CHART_GRID_GUTTER_ID
    ].includes(id);
}
function getSelection(reactGridObject, data) {
    const { selectionMode, selectedRanges, selectedIndexes, cellMatrix } = reactGridObject.state;
    switch(selectionMode){
        case "range":
            {
                // If more than one ranges are selected... ignore all but the first one.
                const range = selectedRanges[0];
                const includesLabels = isHeaderRow(range.first.row.rowId);
                if (includesLabels && isHeaderRow(range.last.row.rowId)) {
                    console.log("header only");
                    return new ChartRange/* ChartRange */.r(data, {
                        column: range.first.column.columnId
                    }, {
                        column: range.last.column.columnId
                    }, true);
                }
                return new ChartRange/* ChartRange */.r(data, {
                    column: range.first.column.columnId,
                    row: includesLabels ? cellMatrix.rows[2].rowId : range.first.row.rowId
                }, {
                    column: range.last.column.columnId,
                    row: range.last.row.rowId
                }, includesLabels);
            }
        case "row":
            {
                const sortedIndices = [
                    ...selectedIndexes
                ];
                sortedIndices.sort((a, b)=>a - b);
                let fromRow = cellMatrix.rows[sortedIndices[0]].rowId;
                const toRow = cellMatrix.rows[sortedIndices[sortedIndices.length - 1]].rowId;
                // Column with index 0 is the gutter column.
                const fromColumn = cellMatrix.columns[1].columnId;
                const toColumn = cellMatrix.columns[cellMatrix.columns.length - 1].columnId;
                if (isHeaderRow(toRow)) {
                    return new ChartRange/* ChartRange */.r(data, {
                        column: fromColumn
                    }, {
                        column: toColumn
                    }, true);
                }
                let includeLabels = false;
                if (isHeaderRow(fromRow)) {
                    fromRow = cellMatrix.rows[sortedIndices[1]].rowId;
                    includeLabels = true;
                }
                return new ChartRange/* ChartRange */.r(data, {
                    row: fromRow,
                    column: fromColumn
                }, {
                    row: toRow,
                    column: toColumn
                }, includeLabels);
            }
        case "column":
            {
                return new ChartRange/* ChartRange */.r(data, {
                    // Row with index 0 is the gutter row. index 1, the label row.
                    row: cellMatrix.rows[2].rowId,
                    column: cellMatrix.columns[Math.min(...selectedIndexes)].columnId
                }, {
                    row: cellMatrix.rows[cellMatrix.rows.length - 1].rowId,
                    column: cellMatrix.columns[Math.max(...selectedIndexes)].columnId
                }, true);
            }
    }
    throw new Error("Unexpected selection mode: ".concat(selectionMode));
}
const { onSelectionChanged, fireSelectionChanged } = (()=>{
    const listeners = new Set();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const onSelectionChanged = (cb)=>{
        listeners.add(cb);
        return ()=>listeners.delete(cb);
    };
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fireSelectionChanged = ()=>{
        listeners.forEach((cb)=>cb());
    };
    return {
        fireSelectionChanged,
        onSelectionChanged
    };
})();
function selectRow(reactGridObject, rowId, data) {
    const column = data.columns[0];
    // const focusLocation = {rowId: row.id, columnId: column.id }
    const updateState = getUpdateState(reactGridObject);
    updateState((state)=>{
        const location = state.cellMatrix.getLocationById(rowId, column.id);
        return {
            ...state,
            focusedLocation: location,
            selectionMode: "row",
            selectedRanges: [],
            selectedIds: [
                location.row.rowId
            ],
            selectedIndexes: [
                location.row.idx
            ]
        };
    });
}
function selectColumn(reactGridObject, colId, data) {
    const column = data.getColumn(colId);
    const colIx = data.columns.findIndex((target)=>column === target);
    if (!column) {
        console.error("Column not found");
        return;
    }
    const updateState = getUpdateState(reactGridObject);
    updateState((state)=>{
        const location = state.cellMatrix.getLocationById(CHART_GRID_HEADER_ROW_ID, column.id);
        return {
            ...state,
            focusedLocation: location,
            selectionMode: "column",
            selectedRanges: [],
            selectedIds: [
                column.id
            ],
            selectedIndexes: [
                colIx
            ]
        };
    });
}
function selectRange(reactGridObject, range) {
    const updateState = getUpdateState(reactGridObject);
    updateState((state)=>{
        const fromLocation = state.cellMatrix.getLocationById(// non-null assertion because if `includesLabels` is false `row` must be
        // set.
        range.includesLabels ? CHART_GRID_HEADER_ROW_ID : range.from.row, range.from.column);
        var _range_to_row;
        const toLocation = state.cellMatrix.getLocationById((_range_to_row = range.to.row) !== null && _range_to_row !== void 0 ? _range_to_row : CHART_GRID_HEADER_ROW_ID, range.to.column);
        const gridRange = state.cellMatrix.getRange(fromLocation, toLocation);
        return {
            ...state,
            // @see https://github.com/silevis/reactgrid/blob/develop/src/lib/Functions/selectRange.ts#L5
            focusedLocation: fromLocation,
            selectionMode: "range",
            selectedRanges: [
                gridRange
            ],
            selectedIds: [],
            selectedIndexes: [],
            activeSelectedRangeIdx: 0
        };
    });
}
function focusGrid(reactGridObject, cell) {
    const { state } = reactGridObject;
    const { hiddenFocusElement: focusElement } = state;
    if (!focusElement) {
        return false;
    }
    selectCell(reactGridObject, cell);
    focusElement.focus();
    return true;
}
/**
 * Selects a row/column/whole table if the position is a gutter cell, otherwise
 * selects the corresponding cell.
 */ function selectCellOrRange(reactGridObject, data, param) {
    let { column, row } = param, skipSelectCell = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if (column === CHART_GRID_GUTTER_ID && row === CHART_GRID_GUTTER_ID) {
        setTimeout(()=>{
            selectRange(reactGridObject, new ChartRange/* ChartRange */.r(data, {
                row: data.rows[0].id,
                column: data.columns[0].id
            }, {
                row: data.rows[data.rows.length - 1].id,
                column: data.columns[data.columns.length - 1].id
            }, true));
        }, 0);
        return false;
    }
    if (column === CHART_GRID_GUTTER_ID) {
        setTimeout(()=>{
            selectRow(reactGridObject, row, data);
        }, 0);
        return false;
    }
    if (row === CHART_GRID_GUTTER_ID) {
        setTimeout(()=>{
            selectColumn(reactGridObject, column, data);
        }, 0);
        return false;
    }
    if (skipSelectCell) {
        return true;
    }
    selectCell(reactGridObject, {
        position: {
            row,
            column
        }
    });
    return false;
}
function selectCell(reactGridObject, cell) {
    const { focusedLocation, cellMatrix } = reactGridObject.state;
    const location = cell ? cellMatrix.getLocationById(cell.position.row, cell.position.column) : cellMatrix.getLocation(1, 1);
    if (location !== focusedLocation) {
        const updateState = getUpdateState(reactGridObject);
        updateState((currentState)=>{
            const newRange = currentState.cellMatrix.getRange(location, location);
            return {
                ...currentState,
                // @see https://github.com/silevis/reactgrid/blob/develop/src/lib/Functions/selectRange.ts#L5
                activeSelectedRangeIdx: 0,
                selectedRanges: [
                    newRange
                ],
                selectedIndexes: [],
                selectedIds: [],
                selectionMode: "range",
                // @see https://github.com/silevis/reactgrid/blob/develop/src/lib/Functions/focusLocation.ts#L64
                focusedLocation: location,
                contextMenuPosition: {
                    top: -1,
                    left: -1
                },
                currentlyEditedCell: undefined
            };
        });
    }
}
function getUpdateState(reactGridObject) {
    // updateState is a private property so we have to ts-ignore
    // @ts-ignore
    const updateState = reactGridObject.updateState;
    return (cb)=>{
        return updateState((state)=>{
            const newState = cb(state);
            // Always call the "onFocusLocationChanged" callback when changing focus
            // manually.
            if (newState.focusedLocation !== state.focusedLocation) {
                const location = newState.focusedLocation;
                if (location) {
                    var _state_props_onFocusLocationChanged, _state_props;
                    (_state_props = state.props) === null || _state_props === void 0 ? void 0 : (_state_props_onFocusLocationChanged = _state_props.onFocusLocationChanged) === null || _state_props_onFocusLocationChanged === void 0 ? void 0 : _state_props_onFocusLocationChanged.call(_state_props, {
                        rowId: location.row.rowId,
                        columnId: location.column.columnId
                    });
                }
                if (newState.selectionMode !== state.selectionMode || newState.selectedIds !== state.selectedIds || newState.selectedRanges !== state.selectedRanges) {
                    var _state_props_onSelectionChanged, _state_props1;
                    (_state_props1 = state.props) === null || _state_props1 === void 0 ? void 0 : (_state_props_onSelectionChanged = _state_props1.onSelectionChanged) === null || _state_props_onSelectionChanged === void 0 ? void 0 : _state_props_onSelectionChanged.call(_state_props1, state.selectedRanges);
                }
            }
            return newState;
        });
    };
}
function shouldDeleteColumns(changeset, data) {
    return shouldDeleteLines(changeset, "column", data);
}
function shouldDeleteRows(changeset, data) {
    return shouldDeleteLines(changeset, "row", data);
}
function shouldDeleteLines(changeset, lineType, data) {
    const lineChangeId = "".concat(lineType, "Id");
    // Count gutter for columns and header and gutter for rows
    const lineSize = data.getLines((0,utils/* getLineAnalogue */.v5)(lineType)).length + (lineType === "row" ? 1 : 2);
    // Blame Jordan for the variable name
    const doodadChangesIx = {};
    for (const change of changeset){
        const { previousCell, newCell } = change;
        const id = change[lineChangeId];
        switch(newCell.type){
            case "delegate":
            case "gamma-header":
                if (previousCell.text !== "" || newCell.text !== "") {
                    return false;
                }
                break;
            case "gutter":
                break;
            default:
                // we don't know what's going on so be a coward and don't delete
                return false;
        }
        doodadChangesIx[id] = doodadChangesIx[id] || 0;
        doodadChangesIx[id]++;
    }
    const fewerChanges = Object.values(doodadChangesIx).find((n)=>n !== lineSize);
    // Not every referenced line has changes to all its cells
    if (fewerChanges) {
        return false;
    }
    return Object.keys(doodadChangesIx);
}
function distributeColumnWidthInPlace(availableWidth, columns, minWidth) {
    if (!availableWidth) {
        return;
    }
    const gutter = columns.find((param)=>{
        let { columnId } = param;
        return columnId === CHART_GRID_GUTTER_ID;
    });
    const equal = (availableWidth - (gutter ? gutter.width || CHART_GRID_GUTTER_WIDTH : 0)) / (columns.length - (gutter ? 1 : 0));
    const cellWidth = minWidth && minWidth > equal ? minWidth : equal;
    columns.forEach((column)=>{
        if (column.columnId === CHART_GRID_GUTTER_ID) {
            return;
        }
        column.width = cellWidth;
    });
}
/**
 * Sorts `ids` in place based on the position of the lines and returns an index
 * of lineId -> position
 */ function sortLineIds(data, lineType, ids) {
    const ix = new Map(data.getLines(lineType).map((line, i)=>[
            line.id,
            i
        ]));
    ids.sort((a, b)=>ix.get(a) - ix.get(b));
    return ix;
}
function reorderLines(data, lineType, targetLineId, lineIdsToMove) {
    const ix = sortLineIds(data, lineType, lineIdsToMove);
    var _ix_get;
    const sourceIx = (_ix_get = ix.get(lineIdsToMove[0])) !== null && _ix_get !== void 0 ? _ix_get : -1;
    var _ix_get1;
    const targetIx = (_ix_get1 = ix.get(targetLineId)) !== null && _ix_get1 !== void 0 ? _ix_get1 : -1;
    if (targetIx === -1 || sourceIx === -1) {
        return;
    }
    const count = lineIdsToMove.length;
    if (targetIx > sourceIx && targetIx < sourceIx + count) {
        console.log("dropping inside range");
        return;
    }
    const dropIx = targetIx > sourceIx ? targetIx - count + 1 : targetIx;
    switch(lineType){
        case "row":
            data.moveRows(lineIdsToMove, dropIx);
            break;
        case "column":
            data.moveColumns(lineIdsToMove, dropIx);
            break;
    }
}
const getContextMenuOptions = (data, reactGridObject, onChange)=>{
    const { selectionMode, selectedIds, selectedRanges } = reactGridObject.state;
    const options = [];
    if (selectionMode === "row") {
        options.push({
            key: "add-row-before",
            label: core_dist/* i18n */.ag._({
                id: "tT/bSk"
            }),
            disabled: !data.canAddRow() || isHeaderRow(selectedIds[0]),
            onClick: ()=>addLineAt(data, onChange, "row", selectedIds, "before"),
            icon: pro_regular_svg_icons/* faPlus */.r8p
        });
        options.push({
            key: "add-row-after",
            label: core_dist/* i18n */.ag._({
                id: "6QCZMo"
            }),
            disabled: !data.canAddRow(),
            onClick: ()=>addLineAt(data, onChange, "row", selectedIds, "after"),
            icon: pro_regular_svg_icons/* faPlus */.r8p
        });
        if (!isHeaderRow(selectedIds[0]) || selectedIds.length > 1) {
            options.push({
                key: "delete-rows",
                label: core_dist/* i18n */.ag._({
                    id: "gJlU2T",
                    values: {
                        0: selectedIds.length
                    }
                }),
                onClick: ()=>{
                    deleteLinesAndChangeFocus("row", selectedIds, data, reactGridObject);
                    onChange(data);
                },
                color: "red.500",
                icon: pro_regular_svg_icons/* faTrash */.XAH
            });
        }
    }
    if (selectionMode === "column" && selectedIds.length) {
        options.push({
            key: "add-column-before",
            label: core_dist/* i18n */.ag._({
                id: "bZ9ges"
            }),
            disabled: !data.canAddColumn(),
            onClick: ()=>addLineAt(data, onChange, "column", selectedIds, "before"),
            icon: pro_regular_svg_icons/* faPlus */.r8p
        }, {
            key: "add-column-after",
            label: core_dist/* i18n */.ag._({
                id: "7ibPpM"
            }),
            disabled: !data.canAddColumn(),
            onClick: ()=>addLineAt(data, onChange, "column", selectedIds, "after"),
            icon: pro_regular_svg_icons/* faPlus */.r8p
        });
        const columns = selectedIds.map((id)=>data.getColumn(id));
        const formats = [
            ...new Set(columns.map((c)=>(c === null || c === void 0 ? void 0 : c.type) === "label" ? "label" : c === null || c === void 0 ? void 0 : c.format))
        ];
        const fixedColumns = columns.filter((c)=>c === null || c === void 0 ? void 0 : c.fixedType);
        const autoCheck = fixedColumns.length > 0 ? fixedColumns.length === columns.length ? false : "multiple" : true;
        options.push({
            key: "format",
            label: core_dist/* i18n */.ag._({
                id: "YOWGJ9"
            }),
            icon: pro_regular_svg_icons/* faWandMagicSparkles */.Z30,
            items: [
                {
                    key: "auto-format",
                    onClick: ()=>{
                        const fixedType = autoCheck === true ? true : false;
                        columns.forEach((c)=>{
                            if (!c) {
                                return;
                            }
                            c.fixedType = fixedType;
                            if (!fixedType) {
                                (0,utils/* updateColumnTypeFromCell */.Tx)(c.getCells(data)[0], data);
                            }
                        }), onChange(data);
                    },
                    label: core_dist/* i18n */.ag._({
                        id: "Dnn2XG"
                    }),
                    check: autoCheck,
                    icon: pro_regular_svg_icons/* faSparkles */.JyM
                },
                {
                    divider: true
                },
                ...(0,types/* objectEntries */.q)(availableColumnTypes).map((param)=>{
                    let [f, { label, icon }] = param;
                    return {
                        key: "format-".concat(f),
                        onClick: ()=>{
                            columns.forEach((c)=>{
                                if (!c) {
                                    return;
                                }
                                c.fixedType = true;
                                c.updateType(data, {
                                    type: f === "label" ? "label" : "data",
                                    format: f === "label" ? "raw" : f
                                });
                            });
                            onChange(data);
                        },
                        label: label(),
                        icon,
                        check: formats.includes(f) ? formats.length > 1 || autoCheck ? "multiple" : true : false
                    };
                })
            ]
        });
        options.push({
            divider: true
        }, {
            key: "delete-columns",
            label: core_dist/* i18n */.ag._({
                id: "6Aby61",
                values: {
                    0: selectedIds.length
                }
            }),
            onClick: ()=>{
                deleteLinesAndChangeFocus("column", selectedIds, data, reactGridObject);
                onChange(data);
            },
            color: "red.500",
            icon: pro_regular_svg_icons/* faTrash */.XAH
        });
    }
    if (selectionMode === "range" && selectedRanges.length) {
        options.push({
            key: "clear-cells",
            label: core_dist/* i18n */.ag._({
                id: "R7WiZ0"
            }),
            onClick: ()=>{
                getSelection(reactGridObject, data).clear();
                onChange(data);
            },
            color: "red.500",
            icon: pro_regular_svg_icons/* faX */.EOp
        });
    }
    return options;
};
function addLineAt(data, onChange, lineType, selectedLines, target, columnType) {
    const ids = selectedLines.map((l)=>"".concat(l));
    const ix = sortLineIds(data, lineType, ids);
    const dropPosition = target === "before" ? ix.get(ids[0]) : ix.get(ids[ids.length - 1]) + 1;
    if (lineType === "column") {
        data.addEmptyColumn({
            type: columnType
        }, dropPosition);
    } else {
        data.addEmptyRow(dropPosition);
    }
    onChange(data);
}

// EXTERNAL MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/scss/data-grid.scss
var data_grid = __webpack_require__(91971);
;// CONCATENATED MODULE: ./src/modules/tiptap_editor/extensions/Chart/reactGrid/DataEditor.tsx




















const DataEditor = (param)=>{
    let { onChange, data, selectedCell } = param;
    const { state, dispatch } = (0,react.useContext)(context/* ChartContext */._M);
    const { columns, rows } = chartReactGridSerializer.serialize(data);
    const ref = (0,react.useRef)(undefined);
    const focusRef = (0,react.useRef)(null);
    const [contextMenuItems, setContextMenuItems] = (0,react.useState)([]);
    var _state_contextMenu;
    const { isOpen: contextMenuOpen, position: contextMenuPosition } = (_state_contextMenu = state.contextMenu) !== null && _state_contextMenu !== void 0 ? _state_contextMenu : {
        isOpen: false,
        position: {
            x: -1000,
            y: -1000
        }
    };
    const onContextMenu = (0,react.useCallback)((ev)=>{
        var _ev_target, _data_rows_, _data_columns_;
        const pos = {
            x: ev.clientX,
            y: ev.clientY
        };
        const cellElement = (_ev_target = ev.target) === null || _ev_target === void 0 ? void 0 : _ev_target.closest("[data-cell-colidx]");
        var _cellElement_getAttribute;
        const colIx = Number.parseInt((_cellElement_getAttribute = cellElement === null || cellElement === void 0 ? void 0 : cellElement.getAttribute("data-cell-colidx")) !== null && _cellElement_getAttribute !== void 0 ? _cellElement_getAttribute : "");
        var _cellElement_getAttribute1;
        const rowIx = Number.parseInt((_cellElement_getAttribute1 = cellElement === null || cellElement === void 0 ? void 0 : cellElement.getAttribute("data-cell-rowidx")) !== null && _cellElement_getAttribute1 !== void 0 ? _cellElement_getAttribute1 : "");
        if (!cellElement || isNaN(colIx) || isNaN(rowIx)) {
            return;
        }
        ev.stopPropagation();
        ev.preventDefault();
        const row = rowIx === 0 ? CHART_GRID_GUTTER_ID : rowIx === 1 ? CHART_GRID_HEADER_ROW_ID : (_data_rows_ = data.rows[rowIx - 2]) === null || _data_rows_ === void 0 ? void 0 : _data_rows_.id;
        const column = colIx === 0 ? CHART_GRID_GUTTER_ID : (_data_columns_ = data.columns[colIx - 1]) === null || _data_columns_ === void 0 ? void 0 : _data_columns_.id;
        if (!row || !column) {
            console.error("[CONTEXT_MENU] Cell not found", {
                colIx,
                rowIx,
                row,
                column
            });
            return;
        }
        const range = getSelection(ref.current, data);
        const inRange = range.includes(row === CHART_GRID_HEADER_ROW_ID ? {
            column,
            isLabel: true
        } : {
            row,
            column
        });
        if (!inRange) {
            const clearListener = onSelectionChanged(()=>{
                clearListener();
                dispatch((0,actions/* openContextMenuAction */.oV)(pos));
            });
            selectCellOrRange(ref.current, data, {
                row,
                column
            });
            return;
        }
        dispatch((0,actions/* openContextMenuAction */.oV)(pos));
    }, [
        dispatch,
        data
    ]);
    (0,react.useEffect)(()=>{
        if (ref.current) {
            focusGrid(ref.current, selectedCell);
        }
    }, [
        selectedCell
    ]);
    (0,react.useEffect)(()=>{
        dispatch({
            type: "setGridFunctions",
            payload: {
                selectColumn: (columnId)=>selectColumn(ref.current, columnId, data)
            }
        });
    }, [
        data,
        dispatch
    ]);
    (0,react.useEffect)(()=>{
        setContextMenuItems(contextMenuOpen ? getContextMenuOptions(data, ref.current, onChange) : []);
    }, [
        contextMenuOpen,
        data,
        onChange,
        contextMenuPosition.x,
        contextMenuPosition.y
    ]);
    const columnsIdHash = data.columns.map((param)=>{
        let { id } = param;
        return id;
    }).join(",");
    const inactiveColumnsIndices = (0,react.useMemo)(()=>{
        if (!state.activeColumns) {
            return [];
        }
        const activeIds = state.activeColumns;
        return data.columns.map((param, ix)=>{
            let { id } = param;
            return activeIds.includes(id) ? null : ix + 1 /* to account for the gutter */ ;
        }).filter((i)=>i !== null);
    // We use the columns hash because the columns array can change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.activeColumns,
        columnsIdHash
    ]);
    const [focusedPosition, setFocusedPosition] = (0,react.useState)(undefined);
    var _focusedPosition_row, _focusedPosition_column;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_KRPLQIP4/* Flex */.k, {
                "data-active-row": (_focusedPosition_row = focusedPosition === null || focusedPosition === void 0 ? void 0 : focusedPosition.row) !== null && _focusedPosition_row !== void 0 ? _focusedPosition_row : -1,
                "data-active-column": (_focusedPosition_column = focusedPosition === null || focusedPosition === void 0 ? void 0 : focusedPosition.column) !== null && _focusedPosition_column !== void 0 ? _focusedPosition_column : -1,
                "data-ignored-columns": inactiveColumnsIndices.join(" "),
                onPasteCapture: (ev)=>{
                    if (!isHiddenFocusElement(ref.current, ev.target)) {
                        return;
                    }
                    const { clipboardData } = ev;
                    const focus = getFocusLocation(ref.current);
                    const selection = getSelection(ref.current, data);
                    const pasteFeedback = handlePastedData(data, clipboardData, focus, selection);
                    if (pasteFeedback) {
                        ev.stopPropagation();
                        if (pasteFeedback.messages.length) {
                            pasteFeedback.messages.forEach((param)=>{
                                let { message, severity } = param;
                                dispatch((0,actions/* addFeedbackAction */.Yr)(message, {
                                    severity,
                                    dismissable: "auto"
                                }));
                            });
                        }
                        onChange(data);
                        if (pasteFeedback.pastedRange) {
                            selectRange(ref.current, pasteFeedback.pastedRange);
                        }
                    }
                },
                onCopyCapture: (ev)=>{
                    if (!isHiddenFocusElement(ref.current, ev.target)) {
                        return;
                    }
                    ev.stopPropagation();
                    ev.preventDefault();
                    const selection = getSelection(ref.current, data);
                    handleCopyData(ev.clipboardData, selection);
                },
                onCutCapture: (ev)=>{
                    if (!isHiddenFocusElement(ref.current, ev.target)) {
                        return;
                    }
                    ev.stopPropagation();
                    ev.preventDefault();
                    const selection = getSelection(ref.current, data);
                    handleCopyData(ev.clipboardData, selection);
                    selection.clear();
                    onChange(data);
                },
                onKeyDownCapture: handleGridKeyDown(ref, focusRef),
                onContextMenu: onContextMenu,
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ParentSize/* default */.Z, {
                    children: (param)=>{
                        let { width } = param;
                        // TODO (javier): Change this hardcoded 50 for an `em` value.
                        distributeColumnWidthInPlace(width - 50, columns, 150);
                        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_KRPLQIP4/* Flex */.k, {
                            direction: "row",
                            width: width,
                            gap: 2,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_KRPLQIP4/* Flex */.k, {
                                    direction: "column",
                                    gap: 2,
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(handleStateUpdate_7fc017d9.p, {
                                            ref: (o)=>{
                                                ref.current = o;
                                            },
                                            customCellTemplates: {
                                                delegate: new DelegateCellTemplate(),
                                                "gamma-header": new GammaHeaderCellTemplate(),
                                                gutter: new GutterCellTemplate()
                                            },
                                            columns: columns,
                                            rows: rows,
                                            stickyTopRows: 2,
                                            // having sticky columns causes a layout bug on certain
                                            // sizes.
                                            stickyLeftColumns: 0,
                                            enableRangeSelection: true,
                                            enableRowSelection: true,
                                            enableColumnSelection: true,
                                            onFocusLocationChanging: (loc)=>selectCellOrRange(ref.current, data, {
                                                    row: "".concat(loc.rowId),
                                                    column: "".concat(loc.columnId)
                                                }, true),
                                            onFocusLocationChanged: (loc)=>{
                                                const rowId = loc.rowId === CHART_GRID_HEADER_ROW_ID ? data.rows[0].id : loc.rowId;
                                                const focusedCell = data.getCell({
                                                    row: rowId,
                                                    column: loc.columnId
                                                });
                                                if (!focusedCell) {
                                                    setFocusedPosition(undefined);
                                                    return;
                                                }
                                                const position = data.findCellIndex(focusedCell);
                                                if (!position) {
                                                    setFocusedPosition(undefined);
                                                    return;
                                                }
                                                position.row += loc.rowId === CHART_GRID_HEADER_ROW_ID ? 1 : 2;
                                                position.column += 1;
                                                setFocusedPosition(position);
                                            },
                                            onCellsChanged: (changeset)=>{
                                                const applied = applyChangeset(// `as unknown` because the listener type does not
                                                // consider the registered `CellTemplate`s
                                                changeset, data, ref.current);
                                                applied && onChange(data);
                                            },
                                            onSelectionChanged: fireSelectionChanged,
                                            onRowsReordered: (targetLineId, lineIdsToMove)=>{
                                                reorderLines(data, "row", "".concat(targetLineId), lineIdsToMove.map((i)=>"".concat(i)));
                                                onChange(data);
                                            },
                                            canReorderRows: (targetRowId, _rowIds, dropPosition)=>{
                                                if (targetRowId === CHART_GRID_HEADER_ROW_ID && dropPosition === "before") {
                                                    return false;
                                                }
                                                return true;
                                            },
                                            onColumnsReordered: (targetLineId, lineIdsToMove)=>{
                                                reorderLines(data, "column", "".concat(targetLineId), lineIdsToMove.map((i)=>"".concat(i)));
                                                onChange(data);
                                            },
                                            canReorderColumns: (targetColumnId, _columnIds, dropPosition)=>{
                                                if (targetColumnId === CHART_GRID_GUTTER_ID && dropPosition === "before") {
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_PULVB27S/* Box */.xu, {
                                            as: "span",
                                            ref: focusRef,
                                            tabIndex: -1,
                                            // For an element to be focusable it needs to have its
                                            // visibility compute to `visible` so we hide it like this
                                            // instead.
                                            position: "absolute",
                                            width: 1,
                                            height: 1,
                                            opacity: 0
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(AddRowColumnButton, {
                                            direction: "horizontal",
                                            isDisabled: !data.canAddRow(),
                                            onClick: (ev)=>{
                                                data.addEmptyRow();
                                                onChange(data);
                                                selectRow(ref.current, data.rows[data.rows.length - 1].id, data);
                                                ev.preventDefault();
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(AddRowColumnButton, {
                                    minW: "40px",
                                    mb: 12,
                                    isDisabled: !data.canAddColumn(),
                                    onClick: (ev)=>{
                                        data.addEmptyColumn();
                                        onChange(data);
                                        selectColumn(ref.current, data.columns[data.columns.length - 1].id, data);
                                        ev.preventDefault();
                                        focusGrid(ref.current);
                                    }
                                })
                            ]
                        });
                    }
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ContextMenu, {
                menuItems: contextMenuItems,
                isOpen: contextMenuOpen,
                position: contextMenuPosition,
                onClose: ()=>{
                    dispatch((0,actions/* closeContextMenuAction */.Hc)());
                }
            })
        ]
    });
};
const AddRowColumnButton = (param)=>{
    let { direction = "vertical", ...props } = param;
    if (direction === "vertical") {
        props.height = "auto";
    }
    const label = direction === "horizontal" ? core_dist/* i18n */.ag._({
        id: "AgvHni"
    }) : core_dist/* i18n */.ag._({
        id: "qZd/ph"
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* GammaTooltip */.kH, {
        label: label,
        placement: direction === "vertical" ? "left" : "bottom",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_6QYXN73V/* IconButton */.h, {
            minW: "1em",
            minH: "1em",
            "aria-label": label,
            icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.G, {
                icon: pro_regular_svg_icons/* faPlus */.r8p
            }),
            shadow: "none",
            ...props
        })
    });
};


/***/ }),

/***/ 91971:
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=5614.fa5a284d2537ef00.js.map