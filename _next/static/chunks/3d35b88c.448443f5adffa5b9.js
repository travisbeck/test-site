"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[3016],{

/***/ 62564:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyDevTools: function() { return /* binding */ applyDevTools; },
/* harmony export */   removeDevTools: function() { return /* binding */ removeDevTools; }
/* harmony export */ });
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30764);
/* harmony import */ var html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43781);
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52518);




/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/** @returns {void} */
function noop() {}
/**
 * @template T
 * @template S
 * @param {T} tar
 * @param {S} src
 * @returns {T & S}
 */
function assign(tar, src) {
  // @ts-ignore
  for (const k in src) tar[k] = src[k];
  return /** @type {T & S} */tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
  fns.forEach(run);
}
/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
  return typeof thing === 'function';
}
/** @returns {boolean} */
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
}
/** @returns {boolean} */
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store) {
  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }
  if (store == null) {
    for (const callback of callbacks) {
      callback(undefined);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
/**
 * Get the current value from a store by subscribing and immediately unsubscribing.
 *
 * https://svelte.dev/docs/svelte-store#get
 * @template T
 * @param {import('../store/public.js').Readable<T>} store
 * @returns {T}
 */
function get_store_value(store) {
  let value;
  subscribe(store, _ => value = _)();
  return value;
}
/** @returns {void} */
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === undefined) {
      return lets;
    }
    if (typeof lets === 'object') {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
/** @returns {void} */
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
/** @returns {any[] | -1} */
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
/** @returns {{}} */
function exclude_internal_props(props) {
  const result = {};
  for (const k in props) if (k[0] !== '$') result[k] = props[k];
  return result;
}
function null_to_empty(value) {
  return value == null ? '' : value;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
  target.appendChild(node);
}
/**
 * @param {Node} target
 * @param {string} style_sheet_id
 * @param {string} styles
 * @returns {void}
 */
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element('style');
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
/**
 * @param {Node} node
 * @returns {ShadowRoot | Document}
 */
function get_root_for_style(node) {
  if (!node) return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */root.host) {
    return /** @type {ShadowRoot} */root;
  }
  return node.ownerDocument;
}
/**
 * @param {ShadowRoot | Document} node
 * @param {HTMLStyleElement} style
 * @returns {CSSStyleSheet}
 */
function append_stylesheet(node, style) {
  append( /** @type {Document} */node.head || node, style);
  return style.sheet;
}
/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}
/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
  return document.createElement(name);
}
/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} name
 * @returns {SVGElement}
 */
function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}
/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
  return document.createTextNode(data);
}
/**
 * @returns {Text} */
function space() {
  return text(' ');
}
/**
 * @returns {Text} */
function empty() {
  return text('');
}
/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
/**
 * @returns {(event: any) => any} */
function prevent_default(fn) {
  return function (event) {
    event.preventDefault();
    // @ts-ignore
    return fn.call(this, event);
  };
}
/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
/**
 * @returns {void}
 */
function xlink_attr(node, attribute, value) {
  node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
  return Array.from(element.childNodes);
}
/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data(text, data) {
  data = '' + data;
  if (text.data === data) return;
  text.data = /** @type {string} */data;
}
/**
 * @returns {void} */
function set_input_value(input, value) {
  input.value = value == null ? '' : value;
}
/**
 * @returns {void} */
function set_style(node, key, value, important) {
  {
    node.style.setProperty(key, value, '');
  }
}
/**
 * @returns {void} */
function toggle_class(element, name, toggle) {
  // The `!!` is required because an `undefined` flag means flipping the current state.
  element.classList.toggle(name, !!toggle);
}
/**
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
 * @returns {CustomEvent<T>}
 */
function custom_event(type, detail) {
  let {
    bubbles = false,
    cancelable = false
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new CustomEvent(type, {
    detail,
    bubbles,
    cancelable
  });
}
function construct_svelte_component(component, props) {
  return new component(props);
}
/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */
/** @typedef {ChildNode & NodeEx} ChildNodeEx */
/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */
/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

let current_component;
/** @returns {void} */
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error('Function called outside component initialization');
  return current_component;
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](https://svelte.dev/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs/svelte#ondestroy
 * @param {() => any} fn
 * @returns {void}
 */
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](https://svelte.dev/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
 * ```ts
 * const dispatch = createEventDispatcher<{
 *  loaded: never; // does not take a detail argument
 *  change: string; // takes a detail argument of type string, which is required
 *  optional: number | null; // takes an optional detail argument of type number
 * }>();
 * ```
 *
 * https://svelte.dev/docs/svelte#createeventdispatcher
 * @template {Record<string, any>} [EventMap=any]
 * @returns {import('./public.js').EventDispatcher<EventMap>}
 */
function createEventDispatcher() {
  const component = get_current_component();
  return function (type, detail) {
    let {
      cancelable = false
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      const event = custom_event( /** @type {string} */type, detail, {
        cancelable
      });
      callbacks.slice().forEach(fn => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
/**
 * Associates an arbitrary `context` object with the current component and the specified `key`
 * and returns that object. The context is then available to children of the component
 * (including slotted content) with `getContext`.
 *
 * Like lifecycle functions, this must be called during component initialisation.
 *
 * https://svelte.dev/docs/svelte#setcontext
 * @template T
 * @param {any} key
 * @param {T} context
 * @returns {T}
 */
function setContext$1(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs/svelte#getcontext
 * @template T
 * @param {any} key
 * @returns {T}
 */
function getContext$1(key) {
  return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
/**
 * @param component
 * @param event
 * @returns {void}
 */
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    // @ts-ignore
    callbacks.slice().forEach(fn => fn.call(this, event));
  }
}

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */Promise.resolve();
let update_scheduled = false;
/** @returns {void} */
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
/** @returns {void} */
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
/** @returns {void} */
function flush() {
  // Do not reenter flush while dirty components are updated, as this can
  // result in an infinite loop. Instead, let the inner flush handle it.
  // Reentrancy is ok afterwards for bindings etc.
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    // first, call beforeUpdate functions
    // and update components
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      // reset dirty state to not end up in a deadlocked state and then rethrow
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
/** @returns {void} */
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach(c => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach(c => c());
  render_callbacks = filtered;
}

const outroing = new Set();
/**
 * @type {Outro}
 */
let outros;
/**
 * @returns {void} */
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group
  };
}
/**
 * @returns {void} */
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} local
 * @param {0 | 1} [detach]
 * @param {() => void} [callback]
 * @returns {void}
 */
function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */
/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */
/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */
/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

// general each functions:
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator === null || array_like_or_iterator === void 0 ? void 0 : array_like_or_iterator.length) !== undefined ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
// keyed each functions:
/** @returns {void} */
function destroy_block(block, lookup) {
  block.d(1);
  lookup.delete(block.key);
}
/** @returns {any[]} */
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--) old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = new Map();
  const deltas = new Map();
  const updates = [];
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else {
      // defer updates until all the DOM shuffling is done
      updates.push(() => block.p(child_ctx, dirty));
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = new Set();
  const did_move = new Set();
  /** @returns {void} */
  function insert(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      // do nothing
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      // remove old block
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
  }
  while (n) insert(new_blocks[n - 1]);
  run_all(updates);
  return new_blocks;
}

/** @returns {void} */
function create_component(block) {
  block && block.c();
}
/** @returns {void} */
function mount_component(component, target, anchor) {
  const {
    fragment,
    after_update
  } = component.$$;
  fragment && fragment.m(target, anchor);
  // onMount happens before the initial afterUpdate
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    // if the component was destroyed immediately
    // it will update the `$$.on_destroy` reference to `null`.
    // the destructured on_destroy may still reference to the old array
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
/** @returns {void} */
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
/** @returns {void} */
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
// TODO: Document the other params
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */
function init(component, options, instance, create_fragment, not_equal, props) {
  let append_styles = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  let dirty = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [-1];
  const parent_component = current_component;
  set_current_component(component);
  /** @type {import('./private.js').T$$} */
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, function (i, ret) {
    const value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  // `false` as a special case of no DOM component
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      // TODO: what is the correct type here?
      // @ts-expect-error
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    this.$$ = undefined;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    this.$$set = undefined;
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify
/**
 * The current version, as set in package.json.
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-version
 * @type {string}
 */
const PUBLIC_VERSION = '4';

if (typeof window !== 'undefined')
  // @ts-ignore
  (window.__svelte || (window.__svelte = {
    v: new Set()
  })).v.add(PUBLIC_VERSION);

const setContext = (ctx, val) => setContext$1(ctx, val);
const getContext = (ctx) => getContext$1(ctx);

/* src/components/FloatingBtn.svelte generated by Svelte v4.2.15 */
function add_css$k(target) {
  append_styles(target, "svelte-1lt2k10", ".floating-btn.svelte-1lt2k10.svelte-1lt2k10{background:#363755;border:0;border-radius:50%;box-shadow:0 0 30px rgba(34, 34, 34, 0.3);cursor:pointer;position:fixed;padding:6px;transition:opacity 0.3s;-webkit-transition:opacity 0.3s;z-index:99999}.floating-btn.bottom-right.svelte-1lt2k10.svelte-1lt2k10{bottom:16px;right:16px}.floating-btn.bottom-left.svelte-1lt2k10.svelte-1lt2k10{bottom:16px;left:16px}.floating-btn.top-right.svelte-1lt2k10.svelte-1lt2k10{top:16px;right:16px}.floating-btn.top-left.svelte-1lt2k10.svelte-1lt2k10{top:16px;left:16px}.floating-btn.svelte-1lt2k10.svelte-1lt2k10:hover{opacity:0.7}.floating-btn.svelte-1lt2k10>svg.svelte-1lt2k10{display:block;width:34px;height:34px;position:relative}");
}
function create_fragment$k(ctx) {
  let button;
  let svg;
  let title;
  let t0;
  let desc;
  let t1;
  let use0;
  let use1;
  let use2;
  let use3;
  let use4;
  let use5;
  let use6;
  let defs;
  let path0;
  let path1;
  let path2;
  let path3;
  let path4;
  let path5;
  let path6;
  let button_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      svg = svg_element("svg");
      title = svg_element("title");
      t0 = text("prosemirror");
      desc = svg_element("desc");
      t1 = text("Created using Figma");
      use0 = svg_element("use");
      use1 = svg_element("use");
      use2 = svg_element("use");
      use3 = svg_element("use");
      use4 = svg_element("use");
      use5 = svg_element("use");
      use6 = svg_element("use");
      defs = svg_element("defs");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      path3 = svg_element("path");
      path4 = svg_element("path");
      path5 = svg_element("path");
      path6 = svg_element("path");
      xlink_attr(use0, "xlink:href", "#a");
      attr(use0, "transform", "matrix(2 0 0 2 118 116)");
      attr(use0, "fill", "#FFF");
      xlink_attr(use1, "xlink:href", "#b");
      attr(use1, "transform", "rotate(16 59.054 420.192) scale(2)");
      attr(use1, "fill", "#FFF");
      xlink_attr(use2, "xlink:href", "#c");
      attr(use2, "transform", "matrix(2 0 0 2 154.024 141.58)");
      attr(use2, "fill", "#363755");
      xlink_attr(use3, "xlink:href", "#d");
      attr(use3, "transform", "matrix(2 0 0 2 220 334.8)");
      attr(use3, "fill", "#FFF");
      xlink_attr(use4, "xlink:href", "#e");
      attr(use4, "transform", "matrix(2 0 0 2 218.826 262.052)");
      attr(use4, "fill", "#363755");
      xlink_attr(use5, "xlink:href", "#f");
      attr(use5, "transform", "matrix(2 0 0 2 197.108 184.998)");
      attr(use5, "fill", "#FFF");
      xlink_attr(use6, "xlink:href", "#g");
      attr(use6, "transform", "matrix(2 0 0 2 221.8 216)");
      attr(use6, "fill", "#363755");
      attr(path0, "id", "a");
      attr(path0, "d", "M73.5 0C32.859 0 0 32.859 0 73.5S32.859 147 73.5 147 147 114.141 147 73.5 114.069 0 73.5\n        0z");
      attr(path1, "id", "b");
      attr(path1, "d", "M193.601 107.116c0-13.376 8.238-23.91\n        20.619-31.153-2.244-7.447-5.19-14.6-8.824-21.32-13.886\n        3.633-25.12-1.799-34.568-11.26-9.449-9.437-12.344-20.672-8.709-34.571A111.362 111.362 0 0 0\n        140.799 0c-7.243 12.37-20.339 20.594-33.689 20.594-13.363\n        0-26.446-8.225-33.701-20.594A110.888 110.888 0 0 0 52.1 8.812c3.634 13.9.753 25.134-8.721\n        34.57-9.436 9.462-20.67 14.894-34.569 11.26A112.178 112.178 0 0 0 0 75.963c12.369 7.243\n        20.593 17.777 20.593 31.153 0 13.352-8.224 26.448-20.593 33.704a113.338 113.338 0 0 0 8.811\n        21.321c13.899-3.634 25.133-.752 34.569 8.697 9.448 9.462 12.355 20.696 8.721 34.57a112.653\n        112.653 0 0 0 21.32 8.837c7.243-12.407 20.338-20.619 33.702-20.619 13.35 0 26.446 8.225\n        33.701 20.619a114.22 114.22 0 0 0 21.32-8.837c-3.634-13.874-.752-25.108 8.709-34.57\n        9.449-9.437 20.683-14.869 34.569-11.26a112.343 112.343 0 0 0\n        8.823-21.321c-12.406-7.256-20.644-17.789-20.644-31.141zm-86.491 46.57c-25.732\n        0-46.58-20.849-46.58-46.57 0-25.733 20.86-46.595 46.58-46.595 25.732 0 46.567 20.875 46.567\n        46.595 0 25.734-20.835 46.57-46.567 46.57z");
      attr(path2, "id", "c");
      attr(path2, "d", "M98.088 49.91c-6.9 83.9 10.8 103.401 10.8 103.401s-55.1\n        5.499-82.7-13.401c-30.5-20.9-26-67.5-25.9-94.6.1-28.4 25.6-45.8 49.9-45.3 29.1.5 50.2 21.6\n        47.9 49.9z");
      attr(path3, "id", "d");
      attr(path3, "d", "M.1.1c12.2 33.3 22.5 42.7 40 55.2 25.3 18 36.6 17.5 76.3 41C78.1 60.3 30.8 45.7 0 0l.1.1z");
      attr(path4, "id", "e");
      attr(path4, "d", "M.687 36.474c3 13.3 17.9 29.9 30.4 41.6 24.8 23.2 42 22.4 86\n        54.7-18.2-51.8-18.8-62-43.5-106.1-24.7-44-67.6-20.3-67.6-20.3s-8.4 16.6-5.3 29.9v.2z");
      attr(path5, "id", "f");
      attr(path5, "d", "M38.346 11.5s-4-11.6-18-11.5c-30 .2-28.8 52.1 16.9 52 39.6-.1 39.2-49.4\n        16.1-49.6-10.2-.2-15 9.1-15 9.1z");
      attr(path6, "id", "g");
      attr(path6, "d", "M26.5 15c10.8 0 2 14.9-.6 20.9-1.8-8.4-10.2-20.9.6-20.9zM10.2.1C4.6.1 0 4.6 0 10.3c0 5.6\n        4.5 10.2 10.2 10.2 5.6 0 10.2-4.5 10.2-10.2C20.4 4.7 15.9.1 10.2.1zM40.7 0c-4.8 0-8.8\n        4.5-8.8 10.2 0 5.6 3.9 10.2 8.8 10.2 4.8 0 8.8-4.5 8.8-10.2C49.5 4.6 45.6 0 40.7 0z");
      attr(svg, "width", "530");
      attr(svg, "height", "530");
      attr(svg, "viewBox", "0 0 530 530");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
      attr(svg, "class", "svelte-1lt2k10");
      attr(button, "class", button_class_value = "" + (null_to_empty("floating-btn ".concat( /*buttonPosition*/ctx[0])) + " svelte-1lt2k10"));
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, svg);
      append(svg, title);
      append(title, t0);
      append(svg, desc);
      append(desc, t1);
      append(svg, use0);
      append(svg, use1);
      append(svg, use2);
      append(svg, use3);
      append(svg, use4);
      append(svg, use5);
      append(svg, use6);
      append(svg, defs);
      append(defs, path0);
      append(defs, path1);
      append(defs, path2);
      append(defs, path3);
      append(defs, path4);
      append(defs, path5);
      append(defs, path6);
      if (!mounted) {
        dispose = listen(button, "click", /*click_handler*/ctx[1]);
        mounted = true;
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (dirty & /*buttonPosition*/1 && button_class_value !== (button_class_value = "" + (null_to_empty("floating-btn ".concat( /*buttonPosition*/ctx[0])) + " svelte-1lt2k10"))) {
        attr(button, "class", button_class_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$k($$self, $$props, $$invalidate) {
  let {
    buttonPosition
  } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = $$props => {
    if ('buttonPosition' in $$props) $$invalidate(0, buttonPosition = $$props.buttonPosition);
  };
  return [buttonPosition, click_handler];
}
class FloatingBtn extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$k, safe_not_equal, {
      buttonPosition: 0
    }, add_css$k);
  }
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#readable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Readable<T>}
 */
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#writable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Writable<T>}
 */
function writable(value) {
  let start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  /** @type {import('./public.js').Unsubscriber} */
  let stop;
  /** @type {Set<import('./private.js').SubscribeInvalidateTuple<T>>} */
  const subscribers = new Set();
  /** @param {T} new_value
   * @returns {void}
   */
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        // store is ready
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  /**
   * @param {import('./public.js').Updater<T>} fn
   * @returns {void}
   */
  function update(fn) {
    set(fn(value));
  }
  /**
   * @param {import('./public.js').Subscriber<T>} run
   * @param {import('./private.js').Invalidator<T>} [invalidate]
   * @returns {import('./public.js').Unsubscriber}
   */
  function subscribe(run) {
    let invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    /** @type {import('./private.js').SubscribeInvalidateTuple<T>} */
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return {
    set,
    update,
    subscribe
  };
}
/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * https://svelte.dev/docs/svelte-store#derived
 * @template {import('./private.js').Stores} S
 * @template T
 * @overload
 * @param {S} stores - input stores
 * @param {(values: import('./private.js').StoresValues<S>, set: (value: T) => void, update: (fn: import('./public.js').Updater<T>) => void) => import('./public.js').Unsubscriber | void} fn - function callback that aggregates the values
 * @param {T} [initial_value] - initial value
 * @returns {import('./public.js').Readable<T>}
 */
/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * https://svelte.dev/docs/svelte-store#derived
 * @template {import('./private.js').Stores} S
 * @template T
 * @overload
 * @param {S} stores - input stores
 * @param {(values: import('./private.js').StoresValues<S>) => T} fn - function callback that aggregates the values
 * @param {T} [initial_value] - initial value
 * @returns {import('./public.js').Readable<T>}
 */
/**
 * @template {import('./private.js').Stores} S
 * @template T
 * @param {S} stores
 * @param {Function} fn
 * @param {T} [initial_value]
 * @returns {import('./public.js').Readable<T>}
 */
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  /** @type {Array<import('./public.js').Readable<any>>} */
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error('derived() expects stores as input, got a falsy value');
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, value => {
      values[i] = value;
      pending &= ~(1 << i);
      if (started) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      // We need to set this to false because callbacks can still happen despite having unsubscribed:
      // Callbacks might already be placed in the queue which doesn't know it should no longer
      // invoke this derived store.
      started = false;
    };
  });
}

const SNAPSHOTS_KEY = '__prosemirror-dev-toolkit__snapshots';
const snapshots = writable([]);
const selectedSnapshot = writable();
const previousEditorState = writable();
let canAccessLocalStorage = true;
function hydrate() {
    let persisted = null;
    try {
        persisted = localStorage.getItem(SNAPSHOTS_KEY);
    }
    catch (err) {
        // Will crash when window is undefined, eg in server-side rendering
        // but also in a codesandbox where you are denied access to localStorage
        canAccessLocalStorage = false;
    }
    if (persisted && persisted.length > 0) {
        try {
            const parsed = JSON.parse(persisted);
            snapshots.set(parsed);
        }
        catch (err) {
            console.error('Corrupted snapshots values in localStorage', err);
        }
    }
}
hydrate();
snapshots.subscribe(val => {
    if (canAccessLocalStorage) {
        localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(val));
    }
});
function setEditorDoc(view, doc) {
    const node = view.state.schema.nodeFromJSON(doc);
    const tr = view.state.tr;
    tr.replaceWith(0, view.state.doc.nodeSize - 2, node.content);
    view.dispatch(tr);
}
function saveSnapshot(snapshotName, doc) {
    const snap = {
        name: snapshotName,
        timestamp: Date.now(),
        doc
    };
    snapshots.update(val => [snap, ...val]);
    return snap;
}
function importSnapshot(snapshotName, json, schema) {
    const doc = schema.nodeFromJSON(json);
    const snap = {
        name: snapshotName,
        timestamp: Date.now(),
        doc: doc.toJSON()
    };
    snapshots.update(val => [snap, ...val]);
    return snap;
}
function updateSnapshot(snapshot) {
    snapshots.update(val => val.map(s => {
        if (s.timestamp === snapshot.timestamp) {
            return snapshot;
        }
        return s;
    }));
}
function toggleViewSnapshot(view, snap) {
    if (snap) {
        const prevState = get_store_value(previousEditorState);
        if (!prevState)
            previousEditorState.set(view.state);
        setEditorDoc(view, snap.doc);
    }
    else {
        const prevState = get_store_value(previousEditorState);
        if (!prevState) {
            console.error('No previous state to restore!');
        }
        else {
            view.updateState(prevState);
        }
        previousEditorState.set(undefined);
    }
    selectedSnapshot.set(snap);
}
function restoreSnapshot(view, snap) {
    setEditorDoc(view, snap.doc);
    previousEditorState.set(undefined);
    selectedSnapshot.set(undefined);
}
function exportSnapshot(snapshot) {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(snapshot.doc)], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = `${snapshot.name}.json`;
    a.click();
}
function deleteSnapshot(snapshot) {
    snapshots.update(val => val.filter(s => s.timestamp !== snapshot.timestamp));
    const selected = get_store_value(selectedSnapshot);
    if ((selected === null || selected === void 0 ? void 0 : selected.timestamp) === snapshot.timestamp) {
        selectedSnapshot.set(undefined);
    }
}

function clickOutside(el, onClickOutside) {
    const onClick = (event) => {
        el && !event.composedPath().includes(el) && !event.defaultPrevented && onClickOutside();
    };
    document.addEventListener('click', onClick, true);
    return {
        destroy() {
            document.removeEventListener('click', onClick, true);
        }
    };
}

/* src/components/PasteModal.svelte generated by Svelte v4.2.15 */
function add_css$j(target) {
  append_styles(target, "svelte-19h7j7n", ".paste-modal.svelte-19h7j7n.svelte-19h7j7n{font-size:15px;height:100%;left:0;position:fixed;top:0;width:100%;z-index:1000}.paste-modal.svelte-19h7j7n>form.svelte-19h7j7n{display:flex;height:100%;justify-content:center;padding:64px}.modal-bg.svelte-19h7j7n.svelte-19h7j7n{background:#000;height:100%;left:0;opacity:0.8;position:absolute;top:0;width:100%;z-index:-1}fieldset.svelte-19h7j7n.svelte-19h7j7n{border-color:transparent;width:100%;max-width:800px}.submit-container.svelte-19h7j7n.svelte-19h7j7n{position:relative;width:100%}button.svelte-19h7j7n.svelte-19h7j7n{cursor:pointer;padding:4px 8px;position:absolute;right:-6px;top:-32px}legend.svelte-19h7j7n.svelte-19h7j7n{color:white}textarea.svelte-19h7j7n.svelte-19h7j7n{background:#fefcfc;height:calc(100vh - 128px);width:100%}");
}
function create_fragment$j(ctx) {
  let div2;
  let div0;
  let t0;
  let form;
  let fieldset;
  let div1;
  let t2;
  let legend;
  let t4;
  let textarea;
  let mounted;
  let dispose;
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      t0 = space();
      form = element("form");
      fieldset = element("fieldset");
      div1 = element("div");
      div1.innerHTML = "<button class=\"svelte-19h7j7n\">Submit</button>";
      t2 = space();
      legend = element("legend");
      legend.textContent = "Doc";
      t4 = space();
      textarea = element("textarea");
      attr(div0, "class", "modal-bg svelte-19h7j7n");
      attr(div1, "class", "submit-container svelte-19h7j7n");
      attr(legend, "class", "svelte-19h7j7n");
      attr(textarea, "class", "svelte-19h7j7n");
      attr(fieldset, "class", "svelte-19h7j7n");
      attr(form, "class", "paste-content svelte-19h7j7n");
      attr(div2, "class", "paste-modal svelte-19h7j7n");
      toggle_class(div2, "hidden", ! /*isOpen*/ctx[0]);
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div2, t0);
      append(div2, form);
      append(form, fieldset);
      append(fieldset, div1);
      append(fieldset, t2);
      append(fieldset, legend);
      append(fieldset, t4);
      append(fieldset, textarea);
      set_input_value(textarea, /*doc*/ctx[1]);
      if (!mounted) {
        dispose = [listen(textarea, "input", /*textarea_input_handler*/ctx[4]), action_destroyer(clickOutside.call(null, fieldset, /*handleClickOutside*/ctx[2])), listen(form, "submit", prevent_default( /*handleSubmit*/ctx[3]))];
        mounted = true;
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (dirty & /*doc*/2) {
        set_input_value(textarea, /*doc*/ctx[1]);
      }
      if (dirty & /*isOpen*/1) {
        toggle_class(div2, "hidden", ! /*isOpen*/ctx[0]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$j($$self, $$props, $$invalidate) {
  let {
    isOpen
  } = $$props;
  let doc;
  const dispatch = createEventDispatcher();
  function handleClickOutside() {
    dispatch('close');
  }
  function handleSubmit() {
    try {
      dispatch('submit', {
        doc: JSON.parse(doc)
      });
    } catch (err) {}
  }
  function textarea_input_handler() {
    doc = this.value;
    $$invalidate(1, doc);
  }
  $$self.$$set = $$props => {
    if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
  };
  return [isOpen, doc, handleClickOutside, handleSubmit, textarea_input_handler];
}
class PasteModal extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$j, safe_not_equal, {
      isOpen: 0
    }, add_css$j);
  }
}

/* src/tabs/TabsMenu.svelte generated by Svelte v4.2.15 */
function add_css$i(target) {
  append_styles(target, "svelte-10notzq", "ul.svelte-10notzq{display:flex;list-style:none;margin:0;overflow-x:scroll;padding:0}button.svelte-10notzq{background:transparent;border:0;border-bottom:2px solid transparent;color:#fff;cursor:pointer;height:100%;font-size:var(--font-medium);font-weight:400;padding:1em}button.svelte-10notzq:hover{background:rgba(255, 255, 255, 0.05)}button.active.svelte-10notzq{border-bottom:2px solid rgb(255, 162, 177)}");
}
function create_fragment$i(ctx) {
  let ul;
  let li0;
  let button0;
  let t1;
  let li1;
  let button1;
  let t3;
  let li2;
  let button2;
  let t5;
  let li3;
  let button3;
  let t7;
  let li4;
  let button4;
  let t9;
  let li5;
  let button5;
  let mounted;
  let dispose;
  return {
    c() {
      ul = element("ul");
      li0 = element("li");
      button0 = element("button");
      button0.textContent = "STATE";
      t1 = space();
      li1 = element("li");
      button1 = element("button");
      button1.textContent = "HISTORY";
      t3 = space();
      li2 = element("li");
      button2 = element("button");
      button2.textContent = "PLUGINS";
      t5 = space();
      li3 = element("li");
      button3 = element("button");
      button3.textContent = "SCHEMA";
      t7 = space();
      li4 = element("li");
      button4 = element("button");
      button4.textContent = "STRUCTURE";
      t9 = space();
      li5 = element("li");
      button5 = element("button");
      button5.textContent = "SNAPSHOTS";
      attr(button0, "class", "svelte-10notzq");
      toggle_class(button0, "active", /*active*/ctx[0] === 'state');
      attr(button1, "class", "svelte-10notzq");
      toggle_class(button1, "active", /*active*/ctx[0] === 'history');
      attr(button2, "class", "svelte-10notzq");
      toggle_class(button2, "active", /*active*/ctx[0] === 'plugins');
      attr(button3, "class", "svelte-10notzq");
      toggle_class(button3, "active", /*active*/ctx[0] === 'schema');
      attr(button4, "class", "svelte-10notzq");
      toggle_class(button4, "active", /*active*/ctx[0] === 'structure');
      attr(button5, "class", "svelte-10notzq");
      toggle_class(button5, "active", /*active*/ctx[0] === 'snapshots');
      attr(ul, "class", "tabs-menu svelte-10notzq");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li0);
      append(li0, button0);
      append(ul, t1);
      append(ul, li1);
      append(li1, button1);
      append(ul, t3);
      append(ul, li2);
      append(li2, button2);
      append(ul, t5);
      append(ul, li3);
      append(li3, button3);
      append(ul, t7);
      append(ul, li4);
      append(li4, button4);
      append(ul, t9);
      append(ul, li5);
      append(li5, button5);
      if (!mounted) {
        dispose = [listen(button0, "click", /*click_handler*/ctx[2]), listen(button1, "click", /*click_handler_1*/ctx[3]), listen(button2, "click", /*click_handler_2*/ctx[4]), listen(button3, "click", /*click_handler_3*/ctx[5]), listen(button4, "click", /*click_handler_4*/ctx[6]), listen(button5, "click", /*click_handler_5*/ctx[7])];
        mounted = true;
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (dirty & /*active*/1) {
        toggle_class(button0, "active", /*active*/ctx[0] === 'state');
      }
      if (dirty & /*active*/1) {
        toggle_class(button1, "active", /*active*/ctx[0] === 'history');
      }
      if (dirty & /*active*/1) {
        toggle_class(button2, "active", /*active*/ctx[0] === 'plugins');
      }
      if (dirty & /*active*/1) {
        toggle_class(button3, "active", /*active*/ctx[0] === 'schema');
      }
      if (dirty & /*active*/1) {
        toggle_class(button4, "active", /*active*/ctx[0] === 'structure');
      }
      if (dirty & /*active*/1) {
        toggle_class(button5, "active", /*active*/ctx[0] === 'snapshots');
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$i($$self, $$props, $$invalidate) {
  let {
    active,
    onClickTab
  } = $$props;
  const click_handler = () => onClickTab('state');
  const click_handler_1 = () => onClickTab('history');
  const click_handler_2 = () => onClickTab('plugins');
  const click_handler_3 = () => onClickTab('schema');
  const click_handler_4 = () => onClickTab('structure');
  const click_handler_5 = () => onClickTab('snapshots');
  $$self.$$set = $$props => {
    if ('active' in $$props) $$invalidate(0, active = $$props.active);
    if ('onClickTab' in $$props) $$invalidate(1, onClickTab = $$props.onClickTab);
  };
  return [active, onClickTab, click_handler, click_handler_1, click_handler_2, click_handler_3, click_handler_4, click_handler_5];
}
class TabsMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$i, safe_not_equal, {
      active: 0,
      onClickTab: 1
    }, add_css$i);
  }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var diffMatchPatch = {exports: {}};

/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function (module) {
  /**
   * @fileoverview Computes the difference between two texts to create a patch.
   * Applies the patch onto another text, allowing for errors.
   * @author fraser@google.com (Neil Fraser)
   */
  /**
   * Class containing the diff, match and patch methods.
   * @constructor
   */
  var diff_match_patch = function () {
    // Defaults.
    // Redefine these in your program to override the defaults.
    // Number of seconds to map a diff before giving up (0 for infinity).
    this.Diff_Timeout = 1.0;
    // Cost of an empty edit operation in terms of edit characters.
    this.Diff_EditCost = 4;
    // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
    this.Match_Threshold = 0.5;
    // How far to search for a match (0 = exact location, 1000+ = broad match).
    // A match this many characters away from the expected location will add
    // 1.0 to the score (0.0 is a perfect match).
    this.Match_Distance = 1000;
    // When deleting a large block of text (over ~64 characters), how close do
    // the contents have to be to match the expected contents. (0.0 = perfection,
    // 1.0 = very loose).  Note that Match_Threshold controls how closely the
    // end points of a delete need to match.
    this.Patch_DeleteThreshold = 0.5;
    // Chunk size for context length.
    this.Patch_Margin = 4;
    // The number of bits in an int.
    this.Match_MaxBits = 32;
  };
  //  DIFF FUNCTIONS
  /**
   * The data structure representing a diff is an array of tuples:
   * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
   * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
   */
  var DIFF_DELETE = -1;
  var DIFF_INSERT = 1;
  var DIFF_EQUAL = 0;
  /**
   * Class representing one diff tuple.
   * ~Attempts to look like a two-element array (which is what this used to be).~
   * Constructor returns an actual two-element array, to allow destructing @JackuB
   * See https://github.com/JackuB/diff-match-patch/issues/14 for details
   * @param {number} op Operation, one of: DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL.
   * @param {string} text Text to be deleted, inserted, or retained.
   * @constructor
   */
  diff_match_patch.Diff = function (op, text) {
    return [op, text];
  };
  /**
   * Find the differences between two texts.  Simplifies the problem by stripping
   * any common prefix or suffix off the texts before diffing.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
   *     then don't run a line-level diff first to identify the changed areas.
   *     Defaults to true, which does a faster, slightly less optimal diff.
   * @param {number=} opt_deadline Optional time when the diff should be complete
   *     by.  Used internally for recursive calls.  Users should set DiffTimeout
   *     instead.
   * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
   */
  diff_match_patch.prototype.diff_main = function (text1, text2, opt_checklines, opt_deadline) {
    // Set a deadline by which time the diff must be complete.
    if (typeof opt_deadline == 'undefined') {
      if (this.Diff_Timeout <= 0) {
        opt_deadline = Number.MAX_VALUE;
      } else {
        opt_deadline = new Date().getTime() + this.Diff_Timeout * 1000;
      }
    }
    var deadline = opt_deadline;
    // Check for null inputs.
    if (text1 == null || text2 == null) {
      throw new Error('Null input. (diff_main)');
    }
    // Check for equality (speedup).
    if (text1 == text2) {
      if (text1) {
        return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
      }
      return [];
    }
    if (typeof opt_checklines == 'undefined') {
      opt_checklines = true;
    }
    var checklines = opt_checklines;
    // Trim off common prefix (speedup).
    var commonlength = this.diff_commonPrefix(text1, text2);
    var commonprefix = text1.substring(0, commonlength);
    text1 = text1.substring(commonlength);
    text2 = text2.substring(commonlength);
    // Trim off common suffix (speedup).
    commonlength = this.diff_commonSuffix(text1, text2);
    var commonsuffix = text1.substring(text1.length - commonlength);
    text1 = text1.substring(0, text1.length - commonlength);
    text2 = text2.substring(0, text2.length - commonlength);
    // Compute the diff on the middle block.
    var diffs = this.diff_compute_(text1, text2, checklines, deadline);
    // Restore the prefix and suffix.
    if (commonprefix) {
      diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
    }
    if (commonsuffix) {
      diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
    }
    this.diff_cleanupMerge(diffs);
    return diffs;
  };
  /**
   * Find the differences between two texts.  Assumes that the texts do not
   * have any common prefix or suffix.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {boolean} checklines Speedup flag.  If false, then don't run a
   *     line-level diff first to identify the changed areas.
   *     If true, then run a faster, slightly less optimal diff.
   * @param {number} deadline Time when the diff should be complete by.
   * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
   * @private
   */
  diff_match_patch.prototype.diff_compute_ = function (text1, text2, checklines, deadline) {
    var diffs;
    if (!text1) {
      // Just add some text (speedup).
      return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
    }
    if (!text2) {
      // Just delete some text (speedup).
      return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
    }
    var longtext = text1.length > text2.length ? text1 : text2;
    var shorttext = text1.length > text2.length ? text2 : text1;
    var i = longtext.indexOf(shorttext);
    if (i != -1) {
      // Shorter text is inside the longer text (speedup).
      diffs = [new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i)), new diff_match_patch.Diff(DIFF_EQUAL, shorttext), new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(i + shorttext.length))];
      // Swap insertions for deletions if diff is reversed.
      if (text1.length > text2.length) {
        diffs[0][0] = diffs[2][0] = DIFF_DELETE;
      }
      return diffs;
    }
    if (shorttext.length == 1) {
      // Single character string.
      // After the previous speedup, the character can't be an equality.
      return [new diff_match_patch.Diff(DIFF_DELETE, text1), new diff_match_patch.Diff(DIFF_INSERT, text2)];
    }
    // Check to see if the problem can be split in two.
    var hm = this.diff_halfMatch_(text1, text2);
    if (hm) {
      // A half-match was found, sort out the return data.
      var text1_a = hm[0];
      var text1_b = hm[1];
      var text2_a = hm[2];
      var text2_b = hm[3];
      var mid_common = hm[4];
      // Send both pairs off for separate processing.
      var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
      var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
      // Merge the results.
      return diffs_a.concat([new diff_match_patch.Diff(DIFF_EQUAL, mid_common)], diffs_b);
    }
    if (checklines && text1.length > 100 && text2.length > 100) {
      return this.diff_lineMode_(text1, text2, deadline);
    }
    return this.diff_bisect_(text1, text2, deadline);
  };
  /**
   * Do a quick line-level diff on both strings, then rediff the parts for
   * greater accuracy.
   * This speedup can produce non-minimal diffs.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} deadline Time when the diff should be complete by.
   * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
   * @private
   */
  diff_match_patch.prototype.diff_lineMode_ = function (text1, text2, deadline) {
    // Scan the text on a line-by-line basis first.
    var a = this.diff_linesToChars_(text1, text2);
    text1 = a.chars1;
    text2 = a.chars2;
    var linearray = a.lineArray;
    var diffs = this.diff_main(text1, text2, false, deadline);
    // Convert the diff back to original text.
    this.diff_charsToLines_(diffs, linearray);
    // Eliminate freak matches (e.g. blank lines)
    this.diff_cleanupSemantic(diffs);
    // Rediff any replacement blocks, this time character-by-character.
    // Add a dummy entry at the end.
    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
    var pointer = 0;
    var count_delete = 0;
    var count_insert = 0;
    var text_delete = '';
    var text_insert = '';
    while (pointer < diffs.length) {
      switch (diffs[pointer][0]) {
        case DIFF_INSERT:
          count_insert++;
          text_insert += diffs[pointer][1];
          break;
        case DIFF_DELETE:
          count_delete++;
          text_delete += diffs[pointer][1];
          break;
        case DIFF_EQUAL:
          // Upon reaching an equality, check for prior redundancies.
          if (count_delete >= 1 && count_insert >= 1) {
            // Delete the offending records and add the merged ones.
            diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert);
            pointer = pointer - count_delete - count_insert;
            var subDiff = this.diff_main(text_delete, text_insert, false, deadline);
            for (var j = subDiff.length - 1; j >= 0; j--) {
              diffs.splice(pointer, 0, subDiff[j]);
            }
            pointer = pointer + subDiff.length;
          }
          count_insert = 0;
          count_delete = 0;
          text_delete = '';
          text_insert = '';
          break;
      }
      pointer++;
    }
    diffs.pop(); // Remove the dummy entry at the end.
    return diffs;
  };
  /**
   * Find the 'middle snake' of a diff, split the problem in two
   * and return the recursively constructed diff.
   * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} deadline Time at which to bail if not yet complete.
   * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
   * @private
   */
  diff_match_patch.prototype.diff_bisect_ = function (text1, text2, deadline) {
    // Cache the text lengths to prevent multiple calls.
    var text1_length = text1.length;
    var text2_length = text2.length;
    var max_d = Math.ceil((text1_length + text2_length) / 2);
    var v_offset = max_d;
    var v_length = 2 * max_d;
    var v1 = new Array(v_length);
    var v2 = new Array(v_length);
    // Setting all elements to -1 is faster in Chrome & Firefox than mixing
    // integers and undefined.
    for (var x = 0; x < v_length; x++) {
      v1[x] = -1;
      v2[x] = -1;
    }
    v1[v_offset + 1] = 0;
    v2[v_offset + 1] = 0;
    var delta = text1_length - text2_length;
    // If the total number of characters is odd, then the front path will collide
    // with the reverse path.
    var front = delta % 2 != 0;
    // Offsets for start and end of k loop.
    // Prevents mapping of space beyond the grid.
    var k1start = 0;
    var k1end = 0;
    var k2start = 0;
    var k2end = 0;
    for (var d = 0; d < max_d; d++) {
      // Bail out if deadline is reached.
      if (new Date().getTime() > deadline) {
        break;
      }
      // Walk the front path one step.
      for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
        var k1_offset = v_offset + k1;
        var x1;
        if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
          x1 = v1[k1_offset + 1];
        } else {
          x1 = v1[k1_offset - 1] + 1;
        }
        var y1 = x1 - k1;
        while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
          x1++;
          y1++;
        }
        v1[k1_offset] = x1;
        if (x1 > text1_length) {
          // Ran off the right of the graph.
          k1end += 2;
        } else if (y1 > text2_length) {
          // Ran off the bottom of the graph.
          k1start += 2;
        } else if (front) {
          var k2_offset = v_offset + delta - k1;
          if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
            // Mirror x2 onto top-left coordinate system.
            var x2 = text1_length - v2[k2_offset];
            if (x1 >= x2) {
              // Overlap detected.
              return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
            }
          }
        }
      }
      // Walk the reverse path one step.
      for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
        var k2_offset = v_offset + k2;
        var x2;
        if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
          x2 = v2[k2_offset + 1];
        } else {
          x2 = v2[k2_offset - 1] + 1;
        }
        var y2 = x2 - k2;
        while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
          x2++;
          y2++;
        }
        v2[k2_offset] = x2;
        if (x2 > text1_length) {
          // Ran off the left of the graph.
          k2end += 2;
        } else if (y2 > text2_length) {
          // Ran off the top of the graph.
          k2start += 2;
        } else if (!front) {
          var k1_offset = v_offset + delta - k2;
          if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
            var x1 = v1[k1_offset];
            var y1 = v_offset + x1 - k1_offset;
            // Mirror x2 onto top-left coordinate system.
            x2 = text1_length - x2;
            if (x1 >= x2) {
              // Overlap detected.
              return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
            }
          }
        }
      }
    }
    // Diff took too long and hit the deadline or
    // number of diffs equals number of characters, no commonality at all.
    return [new diff_match_patch.Diff(DIFF_DELETE, text1), new diff_match_patch.Diff(DIFF_INSERT, text2)];
  };
  /**
   * Given the location of the 'middle snake', split the diff in two parts
   * and recurse.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} x Index of split point in text1.
   * @param {number} y Index of split point in text2.
   * @param {number} deadline Time at which to bail if not yet complete.
   * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
   * @private
   */
  diff_match_patch.prototype.diff_bisectSplit_ = function (text1, text2, x, y, deadline) {
    var text1a = text1.substring(0, x);
    var text2a = text2.substring(0, y);
    var text1b = text1.substring(x);
    var text2b = text2.substring(y);
    // Compute both diffs serially.
    var diffs = this.diff_main(text1a, text2a, false, deadline);
    var diffsb = this.diff_main(text1b, text2b, false, deadline);
    return diffs.concat(diffsb);
  };
  /**
   * Split two texts into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
   *     An object containing the encoded text1, the encoded text2 and
   *     the array of unique strings.
   *     The zeroth element of the array of unique strings is intentionally blank.
   * @private
   */
  diff_match_patch.prototype.diff_linesToChars_ = function (text1, text2) {
    var lineArray = []; // e.g. lineArray[4] == 'Hello\n'
    var lineHash = {}; // e.g. lineHash['Hello\n'] == 4
    // '\x00' is a valid character, but various debuggers don't like it.
    // So we'll insert a junk entry to avoid generating a null character.
    lineArray[0] = '';
    /**
     * Split a text into an array of strings.  Reduce the texts to a string of
     * hashes where each Unicode character represents one line.
     * Modifies linearray and linehash through being a closure.
     * @param {string} text String to encode.
     * @return {string} Encoded string.
     * @private
     */
    function diff_linesToCharsMunge_(text) {
      var chars = '';
      // Walk the text, pulling out a substring for each line.
      // text.split('\n') would would temporarily double our memory footprint.
      // Modifying text would create many large strings to garbage collect.
      var lineStart = 0;
      var lineEnd = -1;
      // Keeping our own length variable is faster than looking it up.
      var lineArrayLength = lineArray.length;
      while (lineEnd < text.length - 1) {
        lineEnd = text.indexOf('\n', lineStart);
        if (lineEnd == -1) {
          lineEnd = text.length - 1;
        }
        var line = text.substring(lineStart, lineEnd + 1);
        if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== undefined) {
          chars += String.fromCharCode(lineHash[line]);
        } else {
          if (lineArrayLength == maxLines) {
            // Bail out at 65535 because
            // String.fromCharCode(65536) == String.fromCharCode(0)
            line = text.substring(lineStart);
            lineEnd = text.length;
          }
          chars += String.fromCharCode(lineArrayLength);
          lineHash[line] = lineArrayLength;
          lineArray[lineArrayLength++] = line;
        }
        lineStart = lineEnd + 1;
      }
      return chars;
    }
    // Allocate 2/3rds of the space for text1, the rest for text2.
    var maxLines = 40000;
    var chars1 = diff_linesToCharsMunge_(text1);
    maxLines = 65535;
    var chars2 = diff_linesToCharsMunge_(text2);
    return {
      chars1: chars1,
      chars2: chars2,
      lineArray: lineArray
    };
  };
  /**
   * Rehydrate the text in a diff from a string of line hashes to real lines of
   * text.
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   * @param {!Array.<string>} lineArray Array of unique strings.
   * @private
   */
  diff_match_patch.prototype.diff_charsToLines_ = function (diffs, lineArray) {
    for (var i = 0; i < diffs.length; i++) {
      var chars = diffs[i][1];
      var text = [];
      for (var j = 0; j < chars.length; j++) {
        text[j] = lineArray[chars.charCodeAt(j)];
      }
      diffs[i][1] = text.join('');
    }
  };
  /**
   * Determine the common prefix of two strings.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the start of each
   *     string.
   */
  diff_match_patch.prototype.diff_commonPrefix = function (text1, text2) {
    // Quick check for common null cases.
    if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
      return 0;
    }
    // Binary search.
    // Performance analysis: https://neil.fraser.name/news/2007/10/09/
    var pointermin = 0;
    var pointermax = Math.min(text1.length, text2.length);
    var pointermid = pointermax;
    var pointerstart = 0;
    while (pointermin < pointermid) {
      if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
        pointermin = pointermid;
        pointerstart = pointermin;
      } else {
        pointermax = pointermid;
      }
      pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
    }
    return pointermid;
  };
  /**
   * Determine the common suffix of two strings.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the end of each string.
   */
  diff_match_patch.prototype.diff_commonSuffix = function (text1, text2) {
    // Quick check for common null cases.
    if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
      return 0;
    }
    // Binary search.
    // Performance analysis: https://neil.fraser.name/news/2007/10/09/
    var pointermin = 0;
    var pointermax = Math.min(text1.length, text2.length);
    var pointermid = pointermax;
    var pointerend = 0;
    while (pointermin < pointermid) {
      if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
        pointermin = pointermid;
        pointerend = pointermin;
      } else {
        pointermax = pointermid;
      }
      pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
    }
    return pointermid;
  };
  /**
   * Determine if the suffix of one string is the prefix of another.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the end of the first
   *     string and the start of the second string.
   * @private
   */
  diff_match_patch.prototype.diff_commonOverlap_ = function (text1, text2) {
    // Cache the text lengths to prevent multiple calls.
    var text1_length = text1.length;
    var text2_length = text2.length;
    // Eliminate the null case.
    if (text1_length == 0 || text2_length == 0) {
      return 0;
    }
    // Truncate the longer string.
    if (text1_length > text2_length) {
      text1 = text1.substring(text1_length - text2_length);
    } else if (text1_length < text2_length) {
      text2 = text2.substring(0, text1_length);
    }
    var text_length = Math.min(text1_length, text2_length);
    // Quick check for the worst case.
    if (text1 == text2) {
      return text_length;
    }
    // Start by looking for a single character match
    // and increase length until no match is found.
    // Performance analysis: https://neil.fraser.name/news/2010/11/04/
    var best = 0;
    var length = 1;
    while (true) {
      var pattern = text1.substring(text_length - length);
      var found = text2.indexOf(pattern);
      if (found == -1) {
        return best;
      }
      length += found;
      if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
        best = length;
        length++;
      }
    }
  };
  /**
   * Do the two texts share a substring which is at least half the length of the
   * longer text?
   * This speedup can produce non-minimal diffs.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     text1, the suffix of text1, the prefix of text2, the suffix of
   *     text2 and the common middle.  Or null if there was no match.
   * @private
   */
  diff_match_patch.prototype.diff_halfMatch_ = function (text1, text2) {
    if (this.Diff_Timeout <= 0) {
      // Don't risk returning a non-optimal diff if we have unlimited time.
      return null;
    }
    var longtext = text1.length > text2.length ? text1 : text2;
    var shorttext = text1.length > text2.length ? text2 : text1;
    if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
      return null; // Pointless.
    }
    var dmp = this; // 'this' becomes 'window' in a closure.
    /**
     * Does a substring of shorttext exist within longtext such that the substring
     * is at least half the length of longtext?
     * Closure, but does not reference any external variables.
     * @param {string} longtext Longer string.
     * @param {string} shorttext Shorter string.
     * @param {number} i Start index of quarter length substring within longtext.
     * @return {Array.<string>} Five element Array, containing the prefix of
     *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
     *     of shorttext and the common middle.  Or null if there was no match.
     * @private
     */
    function diff_halfMatchI_(longtext, shorttext, i) {
      // Start with a 1/4 length substring at position i as a seed.
      var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
      var j = -1;
      var best_common = '';
      var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
      while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
        var prefixLength = dmp.diff_commonPrefix(longtext.substring(i), shorttext.substring(j));
        var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i), shorttext.substring(0, j));
        if (best_common.length < suffixLength + prefixLength) {
          best_common = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
          best_longtext_a = longtext.substring(0, i - suffixLength);
          best_longtext_b = longtext.substring(i + prefixLength);
          best_shorttext_a = shorttext.substring(0, j - suffixLength);
          best_shorttext_b = shorttext.substring(j + prefixLength);
        }
      }
      if (best_common.length * 2 >= longtext.length) {
        return [best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b, best_common];
      } else {
        return null;
      }
    }
    // First check if the second quarter is the seed for a half-match.
    var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
    // Check again based on the third quarter.
    var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
    var hm;
    if (!hm1 && !hm2) {
      return null;
    } else if (!hm2) {
      hm = hm1;
    } else if (!hm1) {
      hm = hm2;
    } else {
      // Both matched.  Select the longest.
      hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
    }
    // A half-match was found, sort out the return data.
    var text1_a, text1_b, text2_a, text2_b;
    if (text1.length > text2.length) {
      text1_a = hm[0];
      text1_b = hm[1];
      text2_a = hm[2];
      text2_b = hm[3];
    } else {
      text2_a = hm[0];
      text2_b = hm[1];
      text1_a = hm[2];
      text1_b = hm[3];
    }
    var mid_common = hm[4];
    return [text1_a, text1_b, text2_a, text2_b, mid_common];
  };
  /**
   * Reduce the number of edits by eliminating semantically trivial equalities.
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   */
  diff_match_patch.prototype.diff_cleanupSemantic = function (diffs) {
    var changes = false;
    var equalities = []; // Stack of indices where equalities are found.
    var equalitiesLength = 0; // Keeping our own length var is faster in JS.
    /** @type {?string} */
    var lastEquality = null;
    // Always equal to diffs[equalities[equalitiesLength - 1]][1]
    var pointer = 0; // Index of current position.
    // Number of characters that changed prior to the equality.
    var length_insertions1 = 0;
    var length_deletions1 = 0;
    // Number of characters that changed after the equality.
    var length_insertions2 = 0;
    var length_deletions2 = 0;
    while (pointer < diffs.length) {
      if (diffs[pointer][0] == DIFF_EQUAL) {
        // Equality found.
        equalities[equalitiesLength++] = pointer;
        length_insertions1 = length_insertions2;
        length_deletions1 = length_deletions2;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastEquality = diffs[pointer][1];
      } else {
        // An insertion or deletion.
        if (diffs[pointer][0] == DIFF_INSERT) {
          length_insertions2 += diffs[pointer][1].length;
        } else {
          length_deletions2 += diffs[pointer][1].length;
        }
        // Eliminate an equality that is smaller or equal to the edits on both
        // sides of it.
        if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(length_insertions2, length_deletions2)) {
          // Duplicate record.
          diffs.splice(equalities[equalitiesLength - 1], 0, new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
          // Change second copy to insert.
          diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
          // Throw away the equality we just deleted.
          equalitiesLength--;
          // Throw away the previous equality (it needs to be reevaluated).
          equalitiesLength--;
          pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
          length_insertions1 = 0; // Reset the counters.
          length_deletions1 = 0;
          length_insertions2 = 0;
          length_deletions2 = 0;
          lastEquality = null;
          changes = true;
        }
      }
      pointer++;
    }
    // Normalize the diff.
    if (changes) {
      this.diff_cleanupMerge(diffs);
    }
    this.diff_cleanupSemanticLossless(diffs);
    // Find any overlaps between deletions and insertions.
    // e.g: <del>abcxxx</del><ins>xxxdef</ins>
    //   -> <del>abc</del>xxx<ins>def</ins>
    // e.g: <del>xxxabc</del><ins>defxxx</ins>
    //   -> <ins>def</ins>xxx<del>abc</del>
    // Only extract an overlap if it is as big as the edit ahead or behind it.
    pointer = 1;
    while (pointer < diffs.length) {
      if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
        var deletion = diffs[pointer - 1][1];
        var insertion = diffs[pointer][1];
        var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
        var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
        if (overlap_length1 >= overlap_length2) {
          if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
            // Overlap found.  Insert an equality and trim the surrounding edits.
            diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL, insertion.substring(0, overlap_length1)));
            diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
            diffs[pointer + 1][1] = insertion.substring(overlap_length1);
            pointer++;
          }
        } else {
          if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
            // Reverse overlap found.
            // Insert an equality and swap and trim the surrounding edits.
            diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL, deletion.substring(0, overlap_length2)));
            diffs[pointer - 1][0] = DIFF_INSERT;
            diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
            diffs[pointer + 1][0] = DIFF_DELETE;
            diffs[pointer + 1][1] = deletion.substring(overlap_length2);
            pointer++;
          }
        }
        pointer++;
      }
      pointer++;
    }
  };
  /**
   * Look for single edits surrounded on both sides by equalities
   * which can be shifted sideways to align the edit to a word boundary.
   * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   */
  diff_match_patch.prototype.diff_cleanupSemanticLossless = function (diffs) {
    /**
     * Given two strings, compute a score representing whether the internal
     * boundary falls on logical boundaries.
     * Scores range from 6 (best) to 0 (worst).
     * Closure, but does not reference any external variables.
     * @param {string} one First string.
     * @param {string} two Second string.
     * @return {number} The score.
     * @private
     */
    function diff_cleanupSemanticScore_(one, two) {
      if (!one || !two) {
        // Edges are the best.
        return 6;
      }
      // Each port of this function behaves slightly differently due to
      // subtle differences in each language's definition of things like
      // 'whitespace'.  Since this function's purpose is largely cosmetic,
      // the choice has been made to use each language's native features
      // rather than force total conformity.
      var char1 = one.charAt(one.length - 1);
      var char2 = two.charAt(0);
      var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
      var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
      var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch.whitespaceRegex_);
      var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch.whitespaceRegex_);
      var lineBreak1 = whitespace1 && char1.match(diff_match_patch.linebreakRegex_);
      var lineBreak2 = whitespace2 && char2.match(diff_match_patch.linebreakRegex_);
      var blankLine1 = lineBreak1 && one.match(diff_match_patch.blanklineEndRegex_);
      var blankLine2 = lineBreak2 && two.match(diff_match_patch.blanklineStartRegex_);
      if (blankLine1 || blankLine2) {
        // Five points for blank lines.
        return 5;
      } else if (lineBreak1 || lineBreak2) {
        // Four points for line breaks.
        return 4;
      } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
        // Three points for end of sentences.
        return 3;
      } else if (whitespace1 || whitespace2) {
        // Two points for whitespace.
        return 2;
      } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
        // One point for non-alphanumeric.
        return 1;
      }
      return 0;
    }
    var pointer = 1;
    // Intentionally ignore the first and last element (don't need checking).
    while (pointer < diffs.length - 1) {
      if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
        // This is a single edit surrounded by equalities.
        var equality1 = diffs[pointer - 1][1];
        var edit = diffs[pointer][1];
        var equality2 = diffs[pointer + 1][1];
        // First, shift the edit as far left as possible.
        var commonOffset = this.diff_commonSuffix(equality1, edit);
        if (commonOffset) {
          var commonString = edit.substring(edit.length - commonOffset);
          equality1 = equality1.substring(0, equality1.length - commonOffset);
          edit = commonString + edit.substring(0, edit.length - commonOffset);
          equality2 = commonString + equality2;
        }
        // Second, step character by character right, looking for the best fit.
        var bestEquality1 = equality1;
        var bestEdit = edit;
        var bestEquality2 = equality2;
        var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
        while (edit.charAt(0) === equality2.charAt(0)) {
          equality1 += edit.charAt(0);
          edit = edit.substring(1) + equality2.charAt(0);
          equality2 = equality2.substring(1);
          var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
          // The >= encourages trailing rather than leading whitespace on edits.
          if (score >= bestScore) {
            bestScore = score;
            bestEquality1 = equality1;
            bestEdit = edit;
            bestEquality2 = equality2;
          }
        }
        if (diffs[pointer - 1][1] != bestEquality1) {
          // We have an improvement, save it back to the diff.
          if (bestEquality1) {
            diffs[pointer - 1][1] = bestEquality1;
          } else {
            diffs.splice(pointer - 1, 1);
            pointer--;
          }
          diffs[pointer][1] = bestEdit;
          if (bestEquality2) {
            diffs[pointer + 1][1] = bestEquality2;
          } else {
            diffs.splice(pointer + 1, 1);
            pointer--;
          }
        }
      }
      pointer++;
    }
  };
  // Define some regex patterns for matching boundaries.
  diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
  diff_match_patch.whitespaceRegex_ = /\s/;
  diff_match_patch.linebreakRegex_ = /[\r\n]/;
  diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
  diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;
  /**
   * Reduce the number of edits by eliminating operationally trivial equalities.
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   */
  diff_match_patch.prototype.diff_cleanupEfficiency = function (diffs) {
    var changes = false;
    var equalities = []; // Stack of indices where equalities are found.
    var equalitiesLength = 0; // Keeping our own length var is faster in JS.
    /** @type {?string} */
    var lastEquality = null;
    // Always equal to diffs[equalities[equalitiesLength - 1]][1]
    var pointer = 0; // Index of current position.
    // Is there an insertion operation before the last equality.
    var pre_ins = false;
    // Is there a deletion operation before the last equality.
    var pre_del = false;
    // Is there an insertion operation after the last equality.
    var post_ins = false;
    // Is there a deletion operation after the last equality.
    var post_del = false;
    while (pointer < diffs.length) {
      if (diffs[pointer][0] == DIFF_EQUAL) {
        // Equality found.
        if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
          // Candidate found.
          equalities[equalitiesLength++] = pointer;
          pre_ins = post_ins;
          pre_del = post_del;
          lastEquality = diffs[pointer][1];
        } else {
          // Not a candidate, and can never become one.
          equalitiesLength = 0;
          lastEquality = null;
        }
        post_ins = post_del = false;
      } else {
        // An insertion or deletion.
        if (diffs[pointer][0] == DIFF_DELETE) {
          post_del = true;
        } else {
          post_ins = true;
        }
        /*
         * Five types to be split:
         * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
         * <ins>A</ins>X<ins>C</ins><del>D</del>
         * <ins>A</ins><del>B</del>X<ins>C</ins>
         * <ins>A</del>X<ins>C</ins><del>D</del>
         * <ins>A</ins><del>B</del>X<del>C</del>
         */
        if (lastEquality && (pre_ins && pre_del && post_ins && post_del || lastEquality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
          // Duplicate record.
          diffs.splice(equalities[equalitiesLength - 1], 0, new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
          // Change second copy to insert.
          diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
          equalitiesLength--; // Throw away the equality we just deleted;
          lastEquality = null;
          if (pre_ins && pre_del) {
            // No changes made which could affect previous entry, keep going.
            post_ins = post_del = true;
            equalitiesLength = 0;
          } else {
            equalitiesLength--; // Throw away the previous equality.
            pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
            post_ins = post_del = false;
          }
          changes = true;
        }
      }
      pointer++;
    }
    if (changes) {
      this.diff_cleanupMerge(diffs);
    }
  };
  /**
   * Reorder and merge like edit sections.  Merge equalities.
   * Any edit section can move as long as it doesn't cross an equality.
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   */
  diff_match_patch.prototype.diff_cleanupMerge = function (diffs) {
    // Add a dummy entry at the end.
    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
    var pointer = 0;
    var count_delete = 0;
    var count_insert = 0;
    var text_delete = '';
    var text_insert = '';
    var commonlength;
    while (pointer < diffs.length) {
      switch (diffs[pointer][0]) {
        case DIFF_INSERT:
          count_insert++;
          text_insert += diffs[pointer][1];
          pointer++;
          break;
        case DIFF_DELETE:
          count_delete++;
          text_delete += diffs[pointer][1];
          pointer++;
          break;
        case DIFF_EQUAL:
          // Upon reaching an equality, check for prior redundancies.
          if (count_delete + count_insert > 1) {
            if (count_delete !== 0 && count_insert !== 0) {
              // Factor out any common prefixies.
              commonlength = this.diff_commonPrefix(text_insert, text_delete);
              if (commonlength !== 0) {
                if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                  diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                } else {
                  diffs.splice(0, 0, new diff_match_patch.Diff(DIFF_EQUAL, text_insert.substring(0, commonlength)));
                  pointer++;
                }
                text_insert = text_insert.substring(commonlength);
                text_delete = text_delete.substring(commonlength);
              }
              // Factor out any common suffixies.
              commonlength = this.diff_commonSuffix(text_insert, text_delete);
              if (commonlength !== 0) {
                diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                text_insert = text_insert.substring(0, text_insert.length - commonlength);
                text_delete = text_delete.substring(0, text_delete.length - commonlength);
              }
            }
            // Delete the offending records and add the merged ones.
            pointer -= count_delete + count_insert;
            diffs.splice(pointer, count_delete + count_insert);
            if (text_delete.length) {
              diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_DELETE, text_delete));
              pointer++;
            }
            if (text_insert.length) {
              diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_INSERT, text_insert));
              pointer++;
            }
            pointer++;
          } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
            // Merge this equality with the previous one.
            diffs[pointer - 1][1] += diffs[pointer][1];
            diffs.splice(pointer, 1);
          } else {
            pointer++;
          }
          count_insert = 0;
          count_delete = 0;
          text_delete = '';
          text_insert = '';
          break;
      }
    }
    if (diffs[diffs.length - 1][1] === '') {
      diffs.pop(); // Remove the dummy entry at the end.
    }
    // Second pass: look for single edits surrounded on both sides by equalities
    // which can be shifted sideways to eliminate an equality.
    // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
    var changes = false;
    pointer = 1;
    // Intentionally ignore the first and last element (don't need checking).
    while (pointer < diffs.length - 1) {
      if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
        // This is a single edit surrounded by equalities.
        if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
          // Shift the edit over the previous equality.
          diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
          diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
          diffs.splice(pointer - 1, 1);
          changes = true;
        } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
          // Shift the edit over the next equality.
          diffs[pointer - 1][1] += diffs[pointer + 1][1];
          diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
          diffs.splice(pointer + 1, 1);
          changes = true;
        }
      }
      pointer++;
    }
    // If shifts were made, the diff needs reordering and another shift sweep.
    if (changes) {
      this.diff_cleanupMerge(diffs);
    }
  };
  /**
   * loc is a location in text1, compute and return the equivalent location in
   * text2.
   * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   * @param {number} loc Location within text1.
   * @return {number} Location within text2.
   */
  diff_match_patch.prototype.diff_xIndex = function (diffs, loc) {
    var chars1 = 0;
    var chars2 = 0;
    var last_chars1 = 0;
    var last_chars2 = 0;
    var x;
    for (x = 0; x < diffs.length; x++) {
      if (diffs[x][0] !== DIFF_INSERT) {
        // Equality or deletion.
        chars1 += diffs[x][1].length;
      }
      if (diffs[x][0] !== DIFF_DELETE) {
        // Equality or insertion.
        chars2 += diffs[x][1].length;
      }
      if (chars1 > loc) {
        // Overshot the location.
        break;
      }
      last_chars1 = chars1;
      last_chars2 = chars2;
    }
    // Was the location was deleted?
    if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
      return last_chars2;
    }
    // Add the remaining character length.
    return last_chars2 + (loc - last_chars1);
  };
  /**
   * Convert a diff array into a pretty HTML report.
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   * @return {string} HTML representation.
   */
  diff_match_patch.prototype.diff_prettyHtml = function (diffs) {
    var html = [];
    var pattern_amp = /&/g;
    var pattern_lt = /</g;
    var pattern_gt = />/g;
    var pattern_para = /\n/g;
    for (var x = 0; x < diffs.length; x++) {
      var op = diffs[x][0]; // Operation (insert, delete, equal)
      var data = diffs[x][1]; // Text of change.
      var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;').replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
      switch (op) {
        case DIFF_INSERT:
          html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
          break;
        case DIFF_DELETE:
          html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
          break;
        case DIFF_EQUAL:
          html[x] = '<span>' + text + '</span>';
          break;
      }
    }
    return html.join('');
  };
  /**
   * Compute and return the source text (all equalities and deletions).
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   * @return {string} Source text.
   */
  diff_match_patch.prototype.diff_text1 = function (diffs) {
    var text = [];
    for (var x = 0; x < diffs.length; x++) {
      if (diffs[x][0] !== DIFF_INSERT) {
        text[x] = diffs[x][1];
      }
    }
    return text.join('');
  };
  /**
   * Compute and return the destination text (all equalities and insertions).
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   * @return {string} Destination text.
   */
  diff_match_patch.prototype.diff_text2 = function (diffs) {
    var text = [];
    for (var x = 0; x < diffs.length; x++) {
      if (diffs[x][0] !== DIFF_DELETE) {
        text[x] = diffs[x][1];
      }
    }
    return text.join('');
  };
  /**
   * Compute the Levenshtein distance; the number of inserted, deleted or
   * substituted characters.
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   * @return {number} Number of changes.
   */
  diff_match_patch.prototype.diff_levenshtein = function (diffs) {
    var levenshtein = 0;
    var insertions = 0;
    var deletions = 0;
    for (var x = 0; x < diffs.length; x++) {
      var op = diffs[x][0];
      var data = diffs[x][1];
      switch (op) {
        case DIFF_INSERT:
          insertions += data.length;
          break;
        case DIFF_DELETE:
          deletions += data.length;
          break;
        case DIFF_EQUAL:
          // A deletion and an insertion is one substitution.
          levenshtein += Math.max(insertions, deletions);
          insertions = 0;
          deletions = 0;
          break;
      }
    }
    levenshtein += Math.max(insertions, deletions);
    return levenshtein;
  };
  /**
   * Crush the diff into an encoded string which describes the operations
   * required to transform text1 into text2.
   * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
   * Operations are tab-separated.  Inserted text is escaped using %xx notation.
   * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
   * @return {string} Delta text.
   */
  diff_match_patch.prototype.diff_toDelta = function (diffs) {
    var text = [];
    for (var x = 0; x < diffs.length; x++) {
      switch (diffs[x][0]) {
        case DIFF_INSERT:
          text[x] = '+' + encodeURI(diffs[x][1]);
          break;
        case DIFF_DELETE:
          text[x] = '-' + diffs[x][1].length;
          break;
        case DIFF_EQUAL:
          text[x] = '=' + diffs[x][1].length;
          break;
      }
    }
    return text.join('\t').replace(/%20/g, ' ');
  };
  /**
   * Given the original text1, and an encoded string which describes the
   * operations required to transform text1 into text2, compute the full diff.
   * @param {string} text1 Source string for the diff.
   * @param {string} delta Delta text.
   * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
   * @throws {!Error} If invalid input.
   */
  diff_match_patch.prototype.diff_fromDelta = function (text1, delta) {
    var diffs = [];
    var diffsLength = 0; // Keeping our own length var is faster in JS.
    var pointer = 0; // Cursor in text1
    var tokens = delta.split(/\t/g);
    for (var x = 0; x < tokens.length; x++) {
      // Each token begins with a one character parameter which specifies the
      // operation of this token (delete, insert, equality).
      var param = tokens[x].substring(1);
      switch (tokens[x].charAt(0)) {
        case '+':
          try {
            diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
          } catch (ex) {
            // Malformed URI sequence.
            throw new Error('Illegal escape in diff_fromDelta: ' + param);
          }
          break;
        case '-':
        // Fall through.
        case '=':
          var n = parseInt(param, 10);
          if (isNaN(n) || n < 0) {
            throw new Error('Invalid number in diff_fromDelta: ' + param);
          }
          var text = text1.substring(pointer, pointer += n);
          if (tokens[x].charAt(0) == '=') {
            diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
          } else {
            diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
          }
          break;
        default:
          // Blank tokens are ok (from a trailing \t).
          // Anything else is an error.
          if (tokens[x]) {
            throw new Error('Invalid diff operation in diff_fromDelta: ' + tokens[x]);
          }
      }
    }
    if (pointer != text1.length) {
      throw new Error('Delta length (' + pointer + ') does not equal source text length (' + text1.length + ').');
    }
    return diffs;
  };
  //  MATCH FUNCTIONS
  /**
   * Locate the best instance of 'pattern' in 'text' near 'loc'.
   * @param {string} text The text to search.
   * @param {string} pattern The pattern to search for.
   * @param {number} loc The location to search around.
   * @return {number} Best match index or -1.
   */
  diff_match_patch.prototype.match_main = function (text, pattern, loc) {
    // Check for null inputs.
    if (text == null || pattern == null || loc == null) {
      throw new Error('Null input. (match_main)');
    }
    loc = Math.max(0, Math.min(loc, text.length));
    if (text == pattern) {
      // Shortcut (potentially not guaranteed by the algorithm)
      return 0;
    } else if (!text.length) {
      // Nothing to match.
      return -1;
    } else if (text.substring(loc, loc + pattern.length) == pattern) {
      // Perfect match at the perfect spot!  (Includes case of null pattern)
      return loc;
    } else {
      // Do a fuzzy compare.
      return this.match_bitap_(text, pattern, loc);
    }
  };
  /**
   * Locate the best instance of 'pattern' in 'text' near 'loc' using the
   * Bitap algorithm.
   * @param {string} text The text to search.
   * @param {string} pattern The pattern to search for.
   * @param {number} loc The location to search around.
   * @return {number} Best match index or -1.
   * @private
   */
  diff_match_patch.prototype.match_bitap_ = function (text, pattern, loc) {
    if (pattern.length > this.Match_MaxBits) {
      throw new Error('Pattern too long for this browser.');
    }
    // Initialise the alphabet.
    var s = this.match_alphabet_(pattern);
    var dmp = this; // 'this' becomes 'window' in a closure.
    /**
     * Compute and return the score for a match with e errors and x location.
     * Accesses loc and pattern through being a closure.
     * @param {number} e Number of errors in match.
     * @param {number} x Location of match.
     * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
     * @private
     */
    function match_bitapScore_(e, x) {
      var accuracy = e / pattern.length;
      var proximity = Math.abs(loc - x);
      if (!dmp.Match_Distance) {
        // Dodge divide by zero error.
        return proximity ? 1.0 : accuracy;
      }
      return accuracy + proximity / dmp.Match_Distance;
    }
    // Highest score beyond which we give up.
    var score_threshold = this.Match_Threshold;
    // Is there a nearby exact match? (speedup)
    var best_loc = text.indexOf(pattern, loc);
    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      // What about in the other direction? (speedup)
      best_loc = text.lastIndexOf(pattern, loc + pattern.length);
      if (best_loc != -1) {
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      }
    }
    // Initialise the bit arrays.
    var matchmask = 1 << pattern.length - 1;
    best_loc = -1;
    var bin_min, bin_mid;
    var bin_max = pattern.length + text.length;
    var last_rd;
    for (var d = 0; d < pattern.length; d++) {
      // Scan for the best match; each iteration allows for one more error.
      // Run a binary search to determine how far from 'loc' we can stray at this
      // error level.
      bin_min = 0;
      bin_mid = bin_max;
      while (bin_min < bin_mid) {
        if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
          bin_min = bin_mid;
        } else {
          bin_max = bin_mid;
        }
        bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
      }
      // Use the result from this iteration as the maximum for the next.
      bin_max = bin_mid;
      var start = Math.max(1, loc - bin_mid + 1);
      var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
      var rd = Array(finish + 2);
      rd[finish + 1] = (1 << d) - 1;
      for (var j = finish; j >= start; j--) {
        // The alphabet (s) is a sparse hash, so the following line generates
        // warnings.
        var charMatch = s[text.charAt(j - 1)];
        if (d === 0) {
          // First pass: exact match.
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
        } else {
          // Subsequent passes: fuzzy match.
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
        }
        if (rd[j] & matchmask) {
          var score = match_bitapScore_(d, j - 1);
          // This match will almost certainly be better than any existing match.
          // But check anyway.
          if (score <= score_threshold) {
            // Told you so.
            score_threshold = score;
            best_loc = j - 1;
            if (best_loc > loc) {
              // When passing loc, don't exceed our current distance from loc.
              start = Math.max(1, 2 * loc - best_loc);
            } else {
              // Already passed loc, downhill from here on in.
              break;
            }
          }
        }
      }
      // No hope for a (better) match at greater error levels.
      if (match_bitapScore_(d + 1, loc) > score_threshold) {
        break;
      }
      last_rd = rd;
    }
    return best_loc;
  };
  /**
   * Initialise the alphabet for the Bitap algorithm.
   * @param {string} pattern The text to encode.
   * @return {!Object} Hash of character locations.
   * @private
   */
  diff_match_patch.prototype.match_alphabet_ = function (pattern) {
    var s = {};
    for (var i = 0; i < pattern.length; i++) {
      s[pattern.charAt(i)] = 0;
    }
    for (var i = 0; i < pattern.length; i++) {
      s[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
    }
    return s;
  };
  //  PATCH FUNCTIONS
  /**
   * Increase the context until it is unique,
   * but don't let the pattern expand beyond Match_MaxBits.
   * @param {!diff_match_patch.patch_obj} patch The patch to grow.
   * @param {string} text Source text.
   * @private
   */
  diff_match_patch.prototype.patch_addContext_ = function (patch, text) {
    if (text.length == 0) {
      return;
    }
    if (patch.start2 === null) {
      throw Error('patch not initialized');
    }
    var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
    var padding = 0;
    // Look for the first and last matches of pattern in text.  If two different
    // matches are found, increase the pattern length.
    while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
      padding += this.Patch_Margin;
      pattern = text.substring(patch.start2 - padding, patch.start2 + patch.length1 + padding);
    }
    // Add one chunk for good luck.
    padding += this.Patch_Margin;
    // Add the prefix.
    var prefix = text.substring(patch.start2 - padding, patch.start2);
    if (prefix) {
      patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
    }
    // Add the suffix.
    var suffix = text.substring(patch.start2 + patch.length1, patch.start2 + patch.length1 + padding);
    if (suffix) {
      patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
    }
    // Roll back the start points.
    patch.start1 -= prefix.length;
    patch.start2 -= prefix.length;
    // Extend the lengths.
    patch.length1 += prefix.length + suffix.length;
    patch.length2 += prefix.length + suffix.length;
  };
  /**
   * Compute a list of patches to turn text1 into text2.
   * Use diffs if provided, otherwise compute it ourselves.
   * There are four ways to call this function, depending on what data is
   * available to the caller:
   * Method 1:
   * a = text1, b = text2
   * Method 2:
   * a = diffs
   * Method 3 (optimal):
   * a = text1, b = diffs
   * Method 4 (deprecated, use method 3):
   * a = text1, b = text2, c = diffs
   *
   * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
   * Array of diff tuples for text1 to text2 (method 2).
   * @param {string|!Array.<!diff_match_patch.Diff>=} opt_b text2 (methods 1,4) or
   * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
   * @param {string|!Array.<!diff_match_patch.Diff>=} opt_c Array of diff tuples
   * for text1 to text2 (method 4) or undefined (methods 1,2,3).
   * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
   */
  diff_match_patch.prototype.patch_make = function (a, opt_b, opt_c) {
    var text1, diffs;
    if (typeof a == 'string' && typeof opt_b == 'string' && typeof opt_c == 'undefined') {
      // Method 1: text1, text2
      // Compute diffs from text1 and text2.
      text1 = /** @type {string} */a;
      diffs = this.diff_main(text1, /** @type {string} */opt_b, true);
      if (diffs.length > 2) {
        this.diff_cleanupSemantic(diffs);
        this.diff_cleanupEfficiency(diffs);
      }
    } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' && typeof opt_c == 'undefined') {
      // Method 2: diffs
      // Compute text1 from diffs.
      diffs = /** @type {!Array.<!diff_match_patch.Diff>} */a;
      text1 = this.diff_text1(diffs);
    } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' && typeof opt_c == 'undefined') {
      // Method 3: text1, diffs
      text1 = /** @type {string} */a;
      diffs = /** @type {!Array.<!diff_match_patch.Diff>} */opt_b;
    } else if (typeof a == 'string' && typeof opt_b == 'string' && opt_c && typeof opt_c == 'object') {
      // Method 4: text1, text2, diffs
      // text2 is not used.
      text1 = /** @type {string} */a;
      diffs = /** @type {!Array.<!diff_match_patch.Diff>} */opt_c;
    } else {
      throw new Error('Unknown call format to patch_make.');
    }
    if (diffs.length === 0) {
      return []; // Get rid of the null case.
    }
    var patches = [];
    var patch = new diff_match_patch.patch_obj();
    var patchDiffLength = 0; // Keeping our own length var is faster in JS.
    var char_count1 = 0; // Number of characters into the text1 string.
    var char_count2 = 0; // Number of characters into the text2 string.
    // Start with text1 (prepatch_text) and apply the diffs until we arrive at
    // text2 (postpatch_text).  We recreate the patches one by one to determine
    // context info.
    var prepatch_text = text1;
    var postpatch_text = text1;
    for (var x = 0; x < diffs.length; x++) {
      var diff_type = diffs[x][0];
      var diff_text = diffs[x][1];
      if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
        // A new patch starts here.
        patch.start1 = char_count1;
        patch.start2 = char_count2;
      }
      switch (diff_type) {
        case DIFF_INSERT:
          patch.diffs[patchDiffLength++] = diffs[x];
          patch.length2 += diff_text.length;
          postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
          break;
        case DIFF_DELETE:
          patch.length1 += diff_text.length;
          patch.diffs[patchDiffLength++] = diffs[x];
          postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
          break;
        case DIFF_EQUAL:
          if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x + 1) {
            // Small equality inside a patch.
            patch.diffs[patchDiffLength++] = diffs[x];
            patch.length1 += diff_text.length;
            patch.length2 += diff_text.length;
          } else if (diff_text.length >= 2 * this.Patch_Margin) {
            // Time for a new patch.
            if (patchDiffLength) {
              this.patch_addContext_(patch, prepatch_text);
              patches.push(patch);
              patch = new diff_match_patch.patch_obj();
              patchDiffLength = 0;
              // Unlike Unidiff, our patch lists have a rolling context.
              // https://github.com/google/diff-match-patch/wiki/Unidiff
              // Update prepatch text & pos to reflect the application of the
              // just completed patch.
              prepatch_text = postpatch_text;
              char_count1 = char_count2;
            }
          }
          break;
      }
      // Update the current character count.
      if (diff_type !== DIFF_INSERT) {
        char_count1 += diff_text.length;
      }
      if (diff_type !== DIFF_DELETE) {
        char_count2 += diff_text.length;
      }
    }
    // Pick up the leftover patch if not empty.
    if (patchDiffLength) {
      this.patch_addContext_(patch, prepatch_text);
      patches.push(patch);
    }
    return patches;
  };
  /**
   * Given an array of patches, return another array that is identical.
   * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
   * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
   */
  diff_match_patch.prototype.patch_deepCopy = function (patches) {
    // Making deep copies is hard in JavaScript.
    var patchesCopy = [];
    for (var x = 0; x < patches.length; x++) {
      var patch = patches[x];
      var patchCopy = new diff_match_patch.patch_obj();
      patchCopy.diffs = [];
      for (var y = 0; y < patch.diffs.length; y++) {
        patchCopy.diffs[y] = new diff_match_patch.Diff(patch.diffs[y][0], patch.diffs[y][1]);
      }
      patchCopy.start1 = patch.start1;
      patchCopy.start2 = patch.start2;
      patchCopy.length1 = patch.length1;
      patchCopy.length2 = patch.length2;
      patchesCopy[x] = patchCopy;
    }
    return patchesCopy;
  };
  /**
   * Merge a set of patches onto the text.  Return a patched text, as well
   * as a list of true/false values indicating which patches were applied.
   * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
   * @param {string} text Old text.
   * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
   *      new text and an array of boolean values.
   */
  diff_match_patch.prototype.patch_apply = function (patches, text) {
    if (patches.length == 0) {
      return [text, []];
    }
    // Deep copy the patches so that no changes are made to originals.
    patches = this.patch_deepCopy(patches);
    var nullPadding = this.patch_addPadding(patches);
    text = nullPadding + text + nullPadding;
    this.patch_splitMax(patches);
    // delta keeps track of the offset between the expected and actual location
    // of the previous patch.  If there are patches expected at positions 10 and
    // 20, but the first patch was found at 12, delta is 2 and the second patch
    // has an effective expected position of 22.
    var delta = 0;
    var results = [];
    for (var x = 0; x < patches.length; x++) {
      var expected_loc = patches[x].start2 + delta;
      var text1 = this.diff_text1(patches[x].diffs);
      var start_loc;
      var end_loc = -1;
      if (text1.length > this.Match_MaxBits) {
        // patch_splitMax will only provide an oversized pattern in the case of
        // a monster delete.
        start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits), expected_loc);
        if (start_loc != -1) {
          end_loc = this.match_main(text, text1.substring(text1.length - this.Match_MaxBits), expected_loc + text1.length - this.Match_MaxBits);
          if (end_loc == -1 || start_loc >= end_loc) {
            // Can't find valid trailing context.  Drop this patch.
            start_loc = -1;
          }
        }
      } else {
        start_loc = this.match_main(text, text1, expected_loc);
      }
      if (start_loc == -1) {
        // No match found.  :(
        results[x] = false;
        // Subtract the delta for this failed patch from subsequent patches.
        delta -= patches[x].length2 - patches[x].length1;
      } else {
        // Found a match.  :)
        results[x] = true;
        delta = start_loc - expected_loc;
        var text2;
        if (end_loc == -1) {
          text2 = text.substring(start_loc, start_loc + text1.length);
        } else {
          text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
        }
        if (text1 == text2) {
          // Perfect match, just shove the replacement text in.
          text = text.substring(0, start_loc) + this.diff_text2(patches[x].diffs) + text.substring(start_loc + text1.length);
        } else {
          // Imperfect match.  Run a diff to get a framework of equivalent
          // indices.
          var diffs = this.diff_main(text1, text2, false);
          if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
            // The end points match, but the content is unacceptably bad.
            results[x] = false;
          } else {
            this.diff_cleanupSemanticLossless(diffs);
            var index1 = 0;
            var index2;
            for (var y = 0; y < patches[x].diffs.length; y++) {
              var mod = patches[x].diffs[y];
              if (mod[0] !== DIFF_EQUAL) {
                index2 = this.diff_xIndex(diffs, index1);
              }
              if (mod[0] === DIFF_INSERT) {
                // Insertion
                text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
              } else if (mod[0] === DIFF_DELETE) {
                // Deletion
                text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(diffs, index1 + mod[1].length));
              }
              if (mod[0] !== DIFF_DELETE) {
                index1 += mod[1].length;
              }
            }
          }
        }
      }
    }
    // Strip the padding off.
    text = text.substring(nullPadding.length, text.length - nullPadding.length);
    return [text, results];
  };
  /**
   * Add some padding on text start and end so that edges can match something.
   * Intended to be called only from within patch_apply.
   * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
   * @return {string} The padding string added to each side.
   */
  diff_match_patch.prototype.patch_addPadding = function (patches) {
    var paddingLength = this.Patch_Margin;
    var nullPadding = '';
    for (var x = 1; x <= paddingLength; x++) {
      nullPadding += String.fromCharCode(x);
    }
    // Bump all the patches forward.
    for (var x = 0; x < patches.length; x++) {
      patches[x].start1 += paddingLength;
      patches[x].start2 += paddingLength;
    }
    // Add some padding on start of first diff.
    var patch = patches[0];
    var diffs = patch.diffs;
    if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
      // Add nullPadding equality.
      diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
      patch.start1 -= paddingLength; // Should be 0.
      patch.start2 -= paddingLength; // Should be 0.
      patch.length1 += paddingLength;
      patch.length2 += paddingLength;
    } else if (paddingLength > diffs[0][1].length) {
      // Grow first equality.
      var extraLength = paddingLength - diffs[0][1].length;
      diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
      patch.start1 -= extraLength;
      patch.start2 -= extraLength;
      patch.length1 += extraLength;
      patch.length2 += extraLength;
    }
    // Add some padding on end of last diff.
    patch = patches[patches.length - 1];
    diffs = patch.diffs;
    if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
      // Add nullPadding equality.
      diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
      patch.length1 += paddingLength;
      patch.length2 += paddingLength;
    } else if (paddingLength > diffs[diffs.length - 1][1].length) {
      // Grow last equality.
      var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
      diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
      patch.length1 += extraLength;
      patch.length2 += extraLength;
    }
    return nullPadding;
  };
  /**
   * Look through the patches and break up any which are longer than the maximum
   * limit of the match algorithm.
   * Intended to be called only from within patch_apply.
   * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
   */
  diff_match_patch.prototype.patch_splitMax = function (patches) {
    var patch_size = this.Match_MaxBits;
    for (var x = 0; x < patches.length; x++) {
      if (patches[x].length1 <= patch_size) {
        continue;
      }
      var bigpatch = patches[x];
      // Remove the big old patch.
      patches.splice(x--, 1);
      var start1 = bigpatch.start1;
      var start2 = bigpatch.start2;
      var precontext = '';
      while (bigpatch.diffs.length !== 0) {
        // Create one of several smaller patches.
        var patch = new diff_match_patch.patch_obj();
        var empty = true;
        patch.start1 = start1 - precontext.length;
        patch.start2 = start2 - precontext.length;
        if (precontext !== '') {
          patch.length1 = patch.length2 = precontext.length;
          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
        }
        while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
          var diff_type = bigpatch.diffs[0][0];
          var diff_text = bigpatch.diffs[0][1];
          if (diff_type === DIFF_INSERT) {
            // Insertions are harmless.
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
            patch.diffs.push(bigpatch.diffs.shift());
            empty = false;
          } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
            // This is a large deletion.  Let it pass in one chunk.
            patch.length1 += diff_text.length;
            start1 += diff_text.length;
            empty = false;
            patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
            bigpatch.diffs.shift();
          } else {
            // Deletion or equality.  Only take as much as we can stomach.
            diff_text = diff_text.substring(0, patch_size - patch.length1 - this.Patch_Margin);
            patch.length1 += diff_text.length;
            start1 += diff_text.length;
            if (diff_type === DIFF_EQUAL) {
              patch.length2 += diff_text.length;
              start2 += diff_text.length;
            } else {
              empty = false;
            }
            patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
            if (diff_text == bigpatch.diffs[0][1]) {
              bigpatch.diffs.shift();
            } else {
              bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
            }
          }
        }
        // Compute the head context for the next patch.
        precontext = this.diff_text2(patch.diffs);
        precontext = precontext.substring(precontext.length - this.Patch_Margin);
        // Append the end context for this patch.
        var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
        if (postcontext !== '') {
          patch.length1 += postcontext.length;
          patch.length2 += postcontext.length;
          if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
            patch.diffs[patch.diffs.length - 1][1] += postcontext;
          } else {
            patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
          }
        }
        if (!empty) {
          patches.splice(++x, 0, patch);
        }
      }
    }
  };
  /**
   * Take a list of patches and return a textual representation.
   * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
   * @return {string} Text representation of patches.
   */
  diff_match_patch.prototype.patch_toText = function (patches) {
    var text = [];
    for (var x = 0; x < patches.length; x++) {
      text[x] = patches[x];
    }
    return text.join('');
  };
  /**
   * Parse a textual representation of patches and return a list of Patch objects.
   * @param {string} textline Text representation of patches.
   * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
   * @throws {!Error} If invalid input.
   */
  diff_match_patch.prototype.patch_fromText = function (textline) {
    var patches = [];
    if (!textline) {
      return patches;
    }
    var text = textline.split('\n');
    var textPointer = 0;
    var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
    while (textPointer < text.length) {
      var m = text[textPointer].match(patchHeader);
      if (!m) {
        throw new Error('Invalid patch string: ' + text[textPointer]);
      }
      var patch = new diff_match_patch.patch_obj();
      patches.push(patch);
      patch.start1 = parseInt(m[1], 10);
      if (m[2] === '') {
        patch.start1--;
        patch.length1 = 1;
      } else if (m[2] == '0') {
        patch.length1 = 0;
      } else {
        patch.start1--;
        patch.length1 = parseInt(m[2], 10);
      }
      patch.start2 = parseInt(m[3], 10);
      if (m[4] === '') {
        patch.start2--;
        patch.length2 = 1;
      } else if (m[4] == '0') {
        patch.length2 = 0;
      } else {
        patch.start2--;
        patch.length2 = parseInt(m[4], 10);
      }
      textPointer++;
      while (textPointer < text.length) {
        var sign = text[textPointer].charAt(0);
        try {
          var line = decodeURI(text[textPointer].substring(1));
        } catch (ex) {
          // Malformed URI sequence.
          throw new Error('Illegal escape in patch_fromText: ' + line);
        }
        if (sign == '-') {
          // Deletion.
          patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
        } else if (sign == '+') {
          // Insertion.
          patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
        } else if (sign == ' ') {
          // Minor equality.
          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
        } else if (sign == '@') {
          // Start of next patch.
          break;
        } else if (sign === '') ; else {
          // WTF?
          throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
        }
        textPointer++;
      }
    }
    return patches;
  };
  /**
   * Class representing one patch operation.
   * @constructor
   */
  diff_match_patch.patch_obj = function () {
    /** @type {!Array.<!diff_match_patch.Diff>} */
    this.diffs = [];
    /** @type {?number} */
    this.start1 = null;
    /** @type {?number} */
    this.start2 = null;
    /** @type {number} */
    this.length1 = 0;
    /** @type {number} */
    this.length2 = 0;
  };
  /**
   * Emulate GNU diff's format.
   * Header: @@ -382,8 +481,9 @@
   * Indices are printed as 1-based, not 0-based.
   * @return {string} The GNU diff string.
   */
  diff_match_patch.patch_obj.prototype.toString = function () {
    var coords1, coords2;
    if (this.length1 === 0) {
      coords1 = this.start1 + ',0';
    } else if (this.length1 == 1) {
      coords1 = this.start1 + 1;
    } else {
      coords1 = this.start1 + 1 + ',' + this.length1;
    }
    if (this.length2 === 0) {
      coords2 = this.start2 + ',0';
    } else if (this.length2 == 1) {
      coords2 = this.start2 + 1;
    } else {
      coords2 = this.start2 + 1 + ',' + this.length2;
    }
    var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
    var op;
    // Escape the body of the patch with %xx notation.
    for (var x = 0; x < this.diffs.length; x++) {
      switch (this.diffs[x][0]) {
        case DIFF_INSERT:
          op = '+';
          break;
        case DIFF_DELETE:
          op = '-';
          break;
        case DIFF_EQUAL:
          op = ' ';
          break;
      }
      text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
    }
    return text.join('').replace(/%20/g, ' ');
  };
  // The following export code was added by @ForbesLindesay
  module.exports = diff_match_patch;
  module.exports['diff_match_patch'] = diff_match_patch;
  module.exports['DIFF_DELETE'] = DIFF_DELETE;
  module.exports['DIFF_INSERT'] = DIFF_INSERT;
  module.exports['DIFF_EQUAL'] = DIFF_EQUAL;
})(diffMatchPatch);
var diffMatchPatchExports = diffMatchPatch.exports;
var dmp = /*@__PURE__*/getDefaultExportFromCjs(diffMatchPatchExports);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};
var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};
var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};
var Processor = function () {
  function Processor(options) {
    classCallCheck(this, Processor);
    this.selfOptions = options || {};
    this.pipes = {};
  }
  createClass(Processor, [{
    key: 'options',
    value: function options(_options) {
      if (_options) {
        this.selfOptions = _options;
      }
      return this.selfOptions;
    }
  }, {
    key: 'pipe',
    value: function pipe(name, pipeArg) {
      var pipe = pipeArg;
      if (typeof name === 'string') {
        if (typeof pipe === 'undefined') {
          return this.pipes[name];
        } else {
          this.pipes[name] = pipe;
        }
      }
      if (name && name.name) {
        pipe = name;
        if (pipe.processor === this) {
          return pipe;
        }
        this.pipes[pipe.name] = pipe;
      }
      pipe.processor = this;
      return pipe;
    }
  }, {
    key: 'process',
    value: function process(input, pipe) {
      var context = input;
      context.options = this.options();
      var nextPipe = pipe || input.pipe || 'default';
      var lastPipe = void 0;
      var lastContext = void 0;
      while (nextPipe) {
        if (typeof context.nextAfterChildren !== 'undefined') {
          // children processed and coming back to parent
          context.next = context.nextAfterChildren;
          context.nextAfterChildren = null;
        }
        if (typeof nextPipe === 'string') {
          nextPipe = this.pipe(nextPipe);
        }
        nextPipe.process(context);
        lastContext = context;
        lastPipe = nextPipe;
        nextPipe = null;
        if (context) {
          if (context.next) {
            context = context.next;
            nextPipe = lastContext.nextPipe || context.pipe || lastPipe;
          }
        }
      }
      return context.hasResult ? context.result : undefined;
    }
  }]);
  return Processor;
}();
var Pipe = function () {
  function Pipe(name) {
    classCallCheck(this, Pipe);
    this.name = name;
    this.filters = [];
  }
  createClass(Pipe, [{
    key: 'process',
    value: function process(input) {
      if (!this.processor) {
        throw new Error('add this pipe to a processor before using it');
      }
      var debug = this.debug;
      var length = this.filters.length;
      var context = input;
      for (var index = 0; index < length; index++) {
        var filter = this.filters[index];
        if (debug) {
          this.log('filter: ' + filter.filterName);
        }
        filter(context);
        if ((typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object' && context.exiting) {
          context.exiting = false;
          break;
        }
      }
      if (!context.next && this.resultCheck) {
        this.resultCheck(context);
      }
    }
  }, {
    key: 'log',
    value: function log(msg) {
      console.log('[jsondiffpatch] ' + this.name + ' pipe, ' + msg);
    }
  }, {
    key: 'append',
    value: function append() {
      var _filters;
      (_filters = this.filters).push.apply(_filters, arguments);
      return this;
    }
  }, {
    key: 'prepend',
    value: function prepend() {
      var _filters2;
      (_filters2 = this.filters).unshift.apply(_filters2, arguments);
      return this;
    }
  }, {
    key: 'indexOf',
    value: function indexOf(filterName) {
      if (!filterName) {
        throw new Error('a filter name is required');
      }
      for (var index = 0; index < this.filters.length; index++) {
        var filter = this.filters[index];
        if (filter.filterName === filterName) {
          return index;
        }
      }
      throw new Error('filter not found: ' + filterName);
    }
  }, {
    key: 'list',
    value: function list() {
      return this.filters.map(function (f) {
        return f.filterName;
      });
    }
  }, {
    key: 'after',
    value: function after(filterName) {
      var index = this.indexOf(filterName);
      var params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index + 1, 0);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
  }, {
    key: 'before',
    value: function before(filterName) {
      var index = this.indexOf(filterName);
      var params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index, 0);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
  }, {
    key: 'replace',
    value: function replace(filterName) {
      var index = this.indexOf(filterName);
      var params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index, 1);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
  }, {
    key: 'remove',
    value: function remove(filterName) {
      var index = this.indexOf(filterName);
      this.filters.splice(index, 1);
      return this;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.filters.length = 0;
      return this;
    }
  }, {
    key: 'shouldHaveResult',
    value: function shouldHaveResult(should) {
      if (should === false) {
        this.resultCheck = null;
        return;
      }
      if (this.resultCheck) {
        return;
      }
      var pipe = this;
      this.resultCheck = function (context) {
        if (!context.hasResult) {
          console.log(context);
          var error = new Error(pipe.name + ' failed');
          error.noResult = true;
          throw error;
        }
      };
      return this;
    }
  }]);
  return Pipe;
}();
var Context = function () {
  function Context() {
    classCallCheck(this, Context);
  }
  createClass(Context, [{
    key: 'setResult',
    value: function setResult(result) {
      this.result = result;
      this.hasResult = true;
      return this;
    }
  }, {
    key: 'exit',
    value: function exit() {
      this.exiting = true;
      return this;
    }
  }, {
    key: 'switchTo',
    value: function switchTo(next, pipe) {
      if (typeof next === 'string' || next instanceof Pipe) {
        this.nextPipe = next;
      } else {
        this.next = next;
        if (pipe) {
          this.nextPipe = pipe;
        }
      }
      return this;
    }
  }, {
    key: 'push',
    value: function push(child, name) {
      child.parent = this;
      if (typeof name !== 'undefined') {
        child.childName = name;
      }
      child.root = this.root || this;
      child.options = child.options || this.options;
      if (!this.children) {
        this.children = [child];
        this.nextAfterChildren = this.next || null;
        this.next = child;
      } else {
        this.children[this.children.length - 1].next = child;
        this.children.push(child);
      }
      child.next = this;
      return this;
    }
  }]);
  return Context;
}();
var isArray = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return a instanceof Array;
};
function cloneRegExp(re) {
  var regexMatch = /^\/(.*)\/([gimyu]*)$/.exec(re.toString());
  return new RegExp(regexMatch[1], regexMatch[2]);
}
function clone(arg) {
  if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) !== 'object') {
    return arg;
  }
  if (arg === null) {
    return null;
  }
  if (isArray(arg)) {
    return arg.map(clone);
  }
  if (arg instanceof Date) {
    return new Date(arg.getTime());
  }
  if (arg instanceof RegExp) {
    return cloneRegExp(arg);
  }
  var cloned = {};
  for (var name in arg) {
    if (Object.prototype.hasOwnProperty.call(arg, name)) {
      cloned[name] = clone(arg[name]);
    }
  }
  return cloned;
}
var DiffContext = function (_Context) {
  inherits(DiffContext, _Context);
  function DiffContext(left, right) {
    classCallCheck(this, DiffContext);
    var _this = possibleConstructorReturn(this, (DiffContext.__proto__ || Object.getPrototypeOf(DiffContext)).call(this));
    _this.left = left;
    _this.right = right;
    _this.pipe = 'diff';
    return _this;
  }
  createClass(DiffContext, [{
    key: 'setResult',
    value: function setResult(result) {
      if (this.options.cloneDiffValues && (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
        var clone$$1 = typeof this.options.cloneDiffValues === 'function' ? this.options.cloneDiffValues : clone;
        if (_typeof(result[0]) === 'object') {
          result[0] = clone$$1(result[0]);
        }
        if (_typeof(result[1]) === 'object') {
          result[1] = clone$$1(result[1]);
        }
      }
      return Context.prototype.setResult.apply(this, arguments);
    }
  }]);
  return DiffContext;
}(Context);
var PatchContext = function (_Context) {
  inherits(PatchContext, _Context);
  function PatchContext(left, delta) {
    classCallCheck(this, PatchContext);
    var _this = possibleConstructorReturn(this, (PatchContext.__proto__ || Object.getPrototypeOf(PatchContext)).call(this));
    _this.left = left;
    _this.delta = delta;
    _this.pipe = 'patch';
    return _this;
  }
  return PatchContext;
}(Context);
var ReverseContext = function (_Context) {
  inherits(ReverseContext, _Context);
  function ReverseContext(delta) {
    classCallCheck(this, ReverseContext);
    var _this = possibleConstructorReturn(this, (ReverseContext.__proto__ || Object.getPrototypeOf(ReverseContext)).call(this));
    _this.delta = delta;
    _this.pipe = 'reverse';
    return _this;
  }
  return ReverseContext;
}(Context);
var isArray$1 = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return a instanceof Array;
};
var diffFilter = function trivialMatchesDiffFilter(context) {
  if (context.left === context.right) {
    context.setResult(undefined).exit();
    return;
  }
  if (typeof context.left === 'undefined') {
    if (typeof context.right === 'function') {
      throw new Error('functions are not supported');
    }
    context.setResult([context.right]).exit();
    return;
  }
  if (typeof context.right === 'undefined') {
    context.setResult([context.left, 0, 0]).exit();
    return;
  }
  if (typeof context.left === 'function' || typeof context.right === 'function') {
    throw new Error('functions are not supported');
  }
  context.leftType = context.left === null ? 'null' : _typeof(context.left);
  context.rightType = context.right === null ? 'null' : _typeof(context.right);
  if (context.leftType !== context.rightType) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.leftType === 'boolean' || context.leftType === 'number') {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.leftType === 'object') {
    context.leftIsArray = isArray$1(context.left);
  }
  if (context.rightType === 'object') {
    context.rightIsArray = isArray$1(context.right);
  }
  if (context.leftIsArray !== context.rightIsArray) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.left instanceof RegExp) {
    if (context.right instanceof RegExp) {
      context.setResult([context.left.toString(), context.right.toString()]).exit();
    } else {
      context.setResult([context.left, context.right]).exit();
    }
  }
};
diffFilter.filterName = 'trivial';
var patchFilter = function trivialMatchesPatchFilter(context) {
  if (typeof context.delta === 'undefined') {
    context.setResult(context.left).exit();
    return;
  }
  context.nested = !isArray$1(context.delta);
  if (context.nested) {
    return;
  }
  if (context.delta.length === 1) {
    context.setResult(context.delta[0]).exit();
    return;
  }
  if (context.delta.length === 2) {
    if (context.left instanceof RegExp) {
      var regexArgs = /^\/(.*)\/([gimyu]+)$/.exec(context.delta[1]);
      if (regexArgs) {
        context.setResult(new RegExp(regexArgs[1], regexArgs[2])).exit();
        return;
      }
    }
    context.setResult(context.delta[1]).exit();
    return;
  }
  if (context.delta.length === 3 && context.delta[2] === 0) {
    context.setResult(undefined).exit();
  }
};
patchFilter.filterName = 'trivial';
var reverseFilter = function trivialReferseFilter(context) {
  if (typeof context.delta === 'undefined') {
    context.setResult(context.delta).exit();
    return;
  }
  context.nested = !isArray$1(context.delta);
  if (context.nested) {
    return;
  }
  if (context.delta.length === 1) {
    context.setResult([context.delta[0], 0, 0]).exit();
    return;
  }
  if (context.delta.length === 2) {
    context.setResult([context.delta[1], context.delta[0]]).exit();
    return;
  }
  if (context.delta.length === 3 && context.delta[2] === 0) {
    context.setResult([context.delta[0]]).exit();
  }
};
reverseFilter.filterName = 'trivial';
function collectChildrenDiffFilter(context) {
  if (!context || !context.children) {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  var result = context.result;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (typeof child.result === 'undefined') {
      continue;
    }
    result = result || {};
    result[child.childName] = child.result;
  }
  if (result && context.leftIsArray) {
    result._t = 'a';
  }
  context.setResult(result).exit();
}
collectChildrenDiffFilter.filterName = 'collectChildren';
function objectsDiffFilter(context) {
  if (context.leftIsArray || context.leftType !== 'object') {
    return;
  }
  var name = void 0;
  var child = void 0;
  var propertyFilter = context.options.propertyFilter;
  for (name in context.left) {
    if (!Object.prototype.hasOwnProperty.call(context.left, name)) {
      continue;
    }
    if (propertyFilter && !propertyFilter(name, context)) {
      continue;
    }
    child = new DiffContext(context.left[name], context.right[name]);
    context.push(child, name);
  }
  for (name in context.right) {
    if (!Object.prototype.hasOwnProperty.call(context.right, name)) {
      continue;
    }
    if (propertyFilter && !propertyFilter(name, context)) {
      continue;
    }
    if (typeof context.left[name] === 'undefined') {
      child = new DiffContext(undefined, context.right[name]);
      context.push(child, name);
    }
  }
  if (!context.children || context.children.length === 0) {
    context.setResult(undefined).exit();
    return;
  }
  context.exit();
}
objectsDiffFilter.filterName = 'objects';
var patchFilter$1 = function nestedPatchFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name = void 0;
  var child = void 0;
  for (name in context.delta) {
    child = new PatchContext(context.left[name], context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
patchFilter$1.filterName = 'objects';
var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (Object.prototype.hasOwnProperty.call(context.left, child.childName) && child.result === undefined) {
      delete context.left[child.childName];
    } else if (context.left[child.childName] !== child.result) {
      context.left[child.childName] = child.result;
    }
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'collectChildren';
var reverseFilter$1 = function nestedReverseFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name = void 0;
  var child = void 0;
  for (name in context.delta) {
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter$1.filterName = 'objects';
function collectChildrenReverseFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  var delta = {};
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (delta[child.childName] !== child.result) {
      delta[child.childName] = child.result;
    }
  }
  context.setResult(delta).exit();
}
collectChildrenReverseFilter.filterName = 'collectChildren';
/*

LCS implementation that supports arrays or strings

reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem

*/
var defaultMatch = function defaultMatch(array1, array2, index1, index2) {
  return array1[index1] === array2[index2];
};
var lengthMatrix = function lengthMatrix(array1, array2, match, context) {
  var len1 = array1.length;
  var len2 = array2.length;
  var x = void 0,
    y = void 0;
  // initialize empty matrix of len1+1 x len2+1
  var matrix = [len1 + 1];
  for (x = 0; x < len1 + 1; x++) {
    matrix[x] = [len2 + 1];
    for (y = 0; y < len2 + 1; y++) {
      matrix[x][y] = 0;
    }
  }
  matrix.match = match;
  // save sequence lengths for each coordinate
  for (x = 1; x < len1 + 1; x++) {
    for (y = 1; y < len2 + 1; y++) {
      if (match(array1, array2, x - 1, y - 1, context)) {
        matrix[x][y] = matrix[x - 1][y - 1] + 1;
      } else {
        matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);
      }
    }
  }
  return matrix;
};
var backtrack = function backtrack(matrix, array1, array2, context) {
  var index1 = array1.length;
  var index2 = array2.length;
  var subsequence = {
    sequence: [],
    indices1: [],
    indices2: []
  };
  while (index1 !== 0 && index2 !== 0) {
    var sameLetter = matrix.match(array1, array2, index1 - 1, index2 - 1, context);
    if (sameLetter) {
      subsequence.sequence.unshift(array1[index1 - 1]);
      subsequence.indices1.unshift(index1 - 1);
      subsequence.indices2.unshift(index2 - 1);
      --index1;
      --index2;
    } else {
      var valueAtMatrixAbove = matrix[index1][index2 - 1];
      var valueAtMatrixLeft = matrix[index1 - 1][index2];
      if (valueAtMatrixAbove > valueAtMatrixLeft) {
        --index2;
      } else {
        --index1;
      }
    }
  }
  return subsequence;
};
var get$1 = function get(array1, array2, match, context) {
  var innerContext = context || {};
  var matrix = lengthMatrix(array1, array2, match || defaultMatch, innerContext);
  var result = backtrack(matrix, array1, array2, innerContext);
  if (typeof array1 === 'string' && typeof array2 === 'string') {
    result.sequence = result.sequence.join('');
  }
  return result;
};
var lcs = {
  get: get$1
};
var ARRAY_MOVE = 3;
var isArray$2 = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return a instanceof Array;
};
var arrayIndexOf = typeof Array.prototype.indexOf === 'function' ? function (array, item) {
  return array.indexOf(item);
} : function (array, item) {
  var length = array.length;
  for (var i = 0; i < length; i++) {
    if (array[i] === item) {
      return i;
    }
  }
  return -1;
};
function arraysHaveMatchByRef(array1, array2, len1, len2) {
  for (var index1 = 0; index1 < len1; index1++) {
    var val1 = array1[index1];
    for (var index2 = 0; index2 < len2; index2++) {
      var val2 = array2[index2];
      if (index1 !== index2 && val1 === val2) {
        return true;
      }
    }
  }
}
function matchItems(array1, array2, index1, index2, context) {
  var value1 = array1[index1];
  var value2 = array2[index2];
  if (value1 === value2) {
    return true;
  }
  if ((typeof value1 === 'undefined' ? 'undefined' : _typeof(value1)) !== 'object' || (typeof value2 === 'undefined' ? 'undefined' : _typeof(value2)) !== 'object') {
    return false;
  }
  var objectHash = context.objectHash;
  if (!objectHash) {
    // no way to match objects was provided, try match by position
    return context.matchByPosition && index1 === index2;
  }
  var hash1 = void 0;
  var hash2 = void 0;
  if (typeof index1 === 'number') {
    context.hashCache1 = context.hashCache1 || [];
    hash1 = context.hashCache1[index1];
    if (typeof hash1 === 'undefined') {
      context.hashCache1[index1] = hash1 = objectHash(value1, index1);
    }
  } else {
    hash1 = objectHash(value1);
  }
  if (typeof hash1 === 'undefined') {
    return false;
  }
  if (typeof index2 === 'number') {
    context.hashCache2 = context.hashCache2 || [];
    hash2 = context.hashCache2[index2];
    if (typeof hash2 === 'undefined') {
      context.hashCache2[index2] = hash2 = objectHash(value2, index2);
    }
  } else {
    hash2 = objectHash(value2);
  }
  if (typeof hash2 === 'undefined') {
    return false;
  }
  return hash1 === hash2;
}
var diffFilter$1 = function arraysDiffFilter(context) {
  if (!context.leftIsArray) {
    return;
  }
  var matchContext = {
    objectHash: context.options && context.options.objectHash,
    matchByPosition: context.options && context.options.matchByPosition
  };
  var commonHead = 0;
  var commonTail = 0;
  var index = void 0;
  var index1 = void 0;
  var index2 = void 0;
  var array1 = context.left;
  var array2 = context.right;
  var len1 = array1.length;
  var len2 = array2.length;
  var child = void 0;
  if (len1 > 0 && len2 > 0 && !matchContext.objectHash && typeof matchContext.matchByPosition !== 'boolean') {
    matchContext.matchByPosition = !arraysHaveMatchByRef(array1, array2, len1, len2);
  }
  // separate common head
  while (commonHead < len1 && commonHead < len2 && matchItems(array1, array2, commonHead, commonHead, matchContext)) {
    index = commonHead;
    child = new DiffContext(context.left[index], context.right[index]);
    context.push(child, index);
    commonHead++;
  }
  // separate common tail
  while (commonTail + commonHead < len1 && commonTail + commonHead < len2 && matchItems(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext)) {
    index1 = len1 - 1 - commonTail;
    index2 = len2 - 1 - commonTail;
    child = new DiffContext(context.left[index1], context.right[index2]);
    context.push(child, index2);
    commonTail++;
  }
  var result = void 0;
  if (commonHead + commonTail === len1) {
    if (len1 === len2) {
      // arrays are identical
      context.setResult(undefined).exit();
      return;
    }
    // trivial case, a block (1 or more consecutive items) was added
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len2 - commonTail; index++) {
      result[index] = [array2[index]];
    }
    context.setResult(result).exit();
    return;
  }
  if (commonHead + commonTail === len2) {
    // trivial case, a block (1 or more consecutive items) was removed
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len1 - commonTail; index++) {
      result['_' + index] = [array1[index], 0, 0];
    }
    context.setResult(result).exit();
    return;
  }
  // reset hash cache
  delete matchContext.hashCache1;
  delete matchContext.hashCache2;
  // diff is not trivial, find the LCS (Longest Common Subsequence)
  var trimmed1 = array1.slice(commonHead, len1 - commonTail);
  var trimmed2 = array2.slice(commonHead, len2 - commonTail);
  var seq = lcs.get(trimmed1, trimmed2, matchItems, matchContext);
  var removedItems = [];
  result = result || {
    _t: 'a'
  };
  for (index = commonHead; index < len1 - commonTail; index++) {
    if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {
      // removed
      result['_' + index] = [array1[index], 0, 0];
      removedItems.push(index);
    }
  }
  var detectMove = true;
  if (context.options && context.options.arrays && context.options.arrays.detectMove === false) {
    detectMove = false;
  }
  var includeValueOnMove = false;
  if (context.options && context.options.arrays && context.options.arrays.includeValueOnMove) {
    includeValueOnMove = true;
  }
  var removedItemsLength = removedItems.length;
  for (index = commonHead; index < len2 - commonTail; index++) {
    var indexOnArray2 = arrayIndexOf(seq.indices2, index - commonHead);
    if (indexOnArray2 < 0) {
      // added, try to match with a removed item and register as position move
      var isMove = false;
      if (detectMove && removedItemsLength > 0) {
        for (var removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {
          index1 = removedItems[removeItemIndex1];
          if (matchItems(trimmed1, trimmed2, index1 - commonHead, index - commonHead, matchContext)) {
            // store position move as: [originalValue, newPosition, ARRAY_MOVE]
            result['_' + index1].splice(1, 2, index, ARRAY_MOVE);
            if (!includeValueOnMove) {
              // don't include moved value on diff, to save bytes
              result['_' + index1][0] = '';
            }
            index2 = index;
            child = new DiffContext(context.left[index1], context.right[index2]);
            context.push(child, index2);
            removedItems.splice(removeItemIndex1, 1);
            isMove = true;
            break;
          }
        }
      }
      if (!isMove) {
        // added
        result[index] = [array2[index]];
      }
    } else {
      // match, do inner diff
      index1 = seq.indices1[indexOnArray2] + commonHead;
      index2 = seq.indices2[indexOnArray2] + commonHead;
      child = new DiffContext(context.left[index1], context.right[index2]);
      context.push(child, index2);
    }
  }
  context.setResult(result).exit();
};
diffFilter$1.filterName = 'arrays';
var compare = {
  numerically: function numerically(a, b) {
    return a - b;
  },
  numericallyBy: function numericallyBy(name) {
    return function (a, b) {
      return a[name] - b[name];
    };
  }
};
var patchFilter$2 = function nestedPatchFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var index = void 0;
  var index1 = void 0;
  var delta = context.delta;
  var array = context.left;
  // first, separate removals, insertions and modifications
  var toRemove = [];
  var toInsert = [];
  var toModify = [];
  for (index in delta) {
    if (index !== '_t') {
      if (index[0] === '_') {
        // removed item from original array
        if (delta[index][2] === 0 || delta[index][2] === ARRAY_MOVE) {
          toRemove.push(parseInt(index.slice(1), 10));
        } else {
          throw new Error('only removal or move can be applied at original array indices,' + (' invalid diff type: ' + delta[index][2]));
        }
      } else {
        if (delta[index].length === 1) {
          // added item at new array
          toInsert.push({
            index: parseInt(index, 10),
            value: delta[index][0]
          });
        } else {
          // modified item at new array
          toModify.push({
            index: parseInt(index, 10),
            delta: delta[index]
          });
        }
      }
    }
  }
  // remove items, in reverse order to avoid sawing our own floor
  toRemove = toRemove.sort(compare.numerically);
  for (index = toRemove.length - 1; index >= 0; index--) {
    index1 = toRemove[index];
    var indexDiff = delta['_' + index1];
    var removedValue = array.splice(index1, 1)[0];
    if (indexDiff[2] === ARRAY_MOVE) {
      // reinsert later
      toInsert.push({
        index: indexDiff[1],
        value: removedValue
      });
    }
  }
  // insert items, in reverse order to avoid moving our own floor
  toInsert = toInsert.sort(compare.numericallyBy('index'));
  var toInsertLength = toInsert.length;
  for (index = 0; index < toInsertLength; index++) {
    var insertion = toInsert[index];
    array.splice(insertion.index, 0, insertion.value);
  }
  // apply modifications
  var toModifyLength = toModify.length;
  var child = void 0;
  if (toModifyLength > 0) {
    for (index = 0; index < toModifyLength; index++) {
      var modification = toModify[index];
      child = new PatchContext(context.left[modification.index], modification.delta);
      context.push(child, modification.index);
    }
  }
  if (!context.children) {
    context.setResult(context.left).exit();
    return;
  }
  context.exit();
};
patchFilter$2.filterName = 'arrays';
var collectChildrenPatchFilter$1 = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    context.left[child.childName] = child.result;
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter$1.filterName = 'arraysCollectChildren';
var reverseFilter$2 = function arraysReverseFilter(context) {
  if (!context.nested) {
    if (context.delta[2] === ARRAY_MOVE) {
      context.newName = '_' + context.delta[1];
      context.setResult([context.delta[0], parseInt(context.childName.substr(1), 10), ARRAY_MOVE]).exit();
    }
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var name = void 0;
  var child = void 0;
  for (name in context.delta) {
    if (name === '_t') {
      continue;
    }
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter$2.filterName = 'arrays';
var reverseArrayDeltaIndex = function reverseArrayDeltaIndex(delta, index, itemDelta) {
  if (typeof index === 'string' && index[0] === '_') {
    return parseInt(index.substr(1), 10);
  } else if (isArray$2(itemDelta) && itemDelta[2] === 0) {
    return '_' + index;
  }
  var reverseIndex = +index;
  for (var deltaIndex in delta) {
    var deltaItem = delta[deltaIndex];
    if (isArray$2(deltaItem)) {
      if (deltaItem[2] === ARRAY_MOVE) {
        var moveFromIndex = parseInt(deltaIndex.substr(1), 10);
        var moveToIndex = deltaItem[1];
        if (moveToIndex === +index) {
          return moveFromIndex;
        }
        if (moveFromIndex <= reverseIndex && moveToIndex > reverseIndex) {
          reverseIndex++;
        } else if (moveFromIndex >= reverseIndex && moveToIndex < reverseIndex) {
          reverseIndex--;
        }
      } else if (deltaItem[2] === 0) {
        var deleteIndex = parseInt(deltaIndex.substr(1), 10);
        if (deleteIndex <= reverseIndex) {
          reverseIndex++;
        }
      } else if (deltaItem.length === 1 && deltaIndex <= reverseIndex) {
        reverseIndex--;
      }
    }
  }
  return reverseIndex;
};
function collectChildrenReverseFilter$1(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  var delta = {
    _t: 'a'
  };
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    var name = child.newName;
    if (typeof name === 'undefined') {
      name = reverseArrayDeltaIndex(context.delta, child.childName, child.result);
    }
    if (delta[name] !== child.result) {
      delta[name] = child.result;
    }
  }
  context.setResult(delta).exit();
}
collectChildrenReverseFilter$1.filterName = 'arraysCollectChildren';
var diffFilter$2 = function datesDiffFilter(context) {
  if (context.left instanceof Date) {
    if (context.right instanceof Date) {
      if (context.left.getTime() !== context.right.getTime()) {
        context.setResult([context.left, context.right]);
      } else {
        context.setResult(undefined);
      }
    } else {
      context.setResult([context.left, context.right]);
    }
    context.exit();
  } else if (context.right instanceof Date) {
    context.setResult([context.left, context.right]).exit();
  }
};
diffFilter$2.filterName = 'dates';
/* global diff_match_patch */
var TEXT_DIFF = 2;
var DEFAULT_MIN_LENGTH = 60;
var cachedDiffPatch = null;
var getDiffMatchPatch = function getDiffMatchPatch(required) {
  /* jshint camelcase: false */
  if (!cachedDiffPatch) {
    var instance = void 0;
    /* eslint-disable camelcase, new-cap */
    if (typeof diff_match_patch !== 'undefined') {
      // already loaded, probably a browser
      instance = typeof diff_match_patch === 'function' ? new diff_match_patch() : new diff_match_patch.diff_match_patch();
    } else if (dmp) {
      try {
        instance = dmp && new dmp();
      } catch (err) {
        instance = null;
      }
    }
    /* eslint-enable camelcase, new-cap */
    if (!instance) {
      if (!required) {
        return null;
      }
      var error = new Error('text diff_match_patch library not found');
      // eslint-disable-next-line camelcase
      error.diff_match_patch_not_found = true;
      throw error;
    }
    cachedDiffPatch = {
      diff: function diff(txt1, txt2) {
        return instance.patch_toText(instance.patch_make(txt1, txt2));
      },
      patch: function patch(txt1, _patch) {
        var results = instance.patch_apply(instance.patch_fromText(_patch), txt1);
        for (var i = 0; i < results[1].length; i++) {
          if (!results[1][i]) {
            var _error = new Error('text patch failed');
            _error.textPatchFailed = true;
          }
        }
        return results[0];
      }
    };
  }
  return cachedDiffPatch;
};
var diffFilter$3 = function textsDiffFilter(context) {
  if (context.leftType !== 'string') {
    return;
  }
  var minLength = context.options && context.options.textDiff && context.options.textDiff.minLength || DEFAULT_MIN_LENGTH;
  if (context.left.length < minLength || context.right.length < minLength) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  // large text, try to use a text-diff algorithm
  var diffMatchPatch = getDiffMatchPatch();
  if (!diffMatchPatch) {
    // diff-match-patch library not available,
    // fallback to regular string replace
    context.setResult([context.left, context.right]).exit();
    return;
  }
  var diff = diffMatchPatch.diff;
  context.setResult([diff(context.left, context.right), 0, TEXT_DIFF]).exit();
};
diffFilter$3.filterName = 'texts';
var patchFilter$3 = function textsPatchFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }
  // text-diff, use a text-patch algorithm
  var patch = getDiffMatchPatch(true).patch;
  context.setResult(patch(context.left, context.delta[0])).exit();
};
patchFilter$3.filterName = 'texts';
var textDeltaReverse = function textDeltaReverse(delta) {
  var i = void 0;
  var l = void 0;
  var lines = void 0;
  var line = void 0;
  var lineTmp = void 0;
  var header = null;
  var headerRegex = /^@@ +-(\d+),(\d+) +\+(\d+),(\d+) +@@$/;
  var lineHeader = void 0;
  lines = delta.split('\n');
  for (i = 0, l = lines.length; i < l; i++) {
    line = lines[i];
    var lineStart = line.slice(0, 1);
    if (lineStart === '@') {
      header = headerRegex.exec(line);
      lineHeader = i;
      // fix header
      lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';
    } else if (lineStart === '+') {
      lines[i] = '-' + lines[i].slice(1);
      if (lines[i - 1].slice(0, 1) === '+') {
        // swap lines to keep default order (-+)
        lineTmp = lines[i];
        lines[i] = lines[i - 1];
        lines[i - 1] = lineTmp;
      }
    } else if (lineStart === '-') {
      lines[i] = '+' + lines[i].slice(1);
    }
  }
  return lines.join('\n');
};
var reverseFilter$3 = function textsReverseFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }
  // text-diff, use a text-diff algorithm
  context.setResult([textDeltaReverse(context.delta[0]), 0, TEXT_DIFF]).exit();
};
reverseFilter$3.filterName = 'texts';
var DiffPatcher = function () {
  function DiffPatcher(options) {
    classCallCheck(this, DiffPatcher);
    this.processor = new Processor(options);
    this.processor.pipe(new Pipe('diff').append(collectChildrenDiffFilter, diffFilter, diffFilter$2, diffFilter$3, objectsDiffFilter, diffFilter$1).shouldHaveResult());
    this.processor.pipe(new Pipe('patch').append(collectChildrenPatchFilter, collectChildrenPatchFilter$1, patchFilter, patchFilter$3, patchFilter$1, patchFilter$2).shouldHaveResult());
    this.processor.pipe(new Pipe('reverse').append(collectChildrenReverseFilter, collectChildrenReverseFilter$1, reverseFilter, reverseFilter$3, reverseFilter$1, reverseFilter$2).shouldHaveResult());
  }
  createClass(DiffPatcher, [{
    key: 'options',
    value: function options() {
      var _processor;
      return (_processor = this.processor).options.apply(_processor, arguments);
    }
  }, {
    key: 'diff',
    value: function diff(left, right) {
      return this.processor.process(new DiffContext(left, right));
    }
  }, {
    key: 'patch',
    value: function patch(left, delta) {
      return this.processor.process(new PatchContext(left, delta));
    }
  }, {
    key: 'reverse',
    value: function reverse(delta) {
      return this.processor.process(new ReverseContext(delta));
    }
  }, {
    key: 'unpatch',
    value: function unpatch(right, delta) {
      return this.patch(right, this.reverse(delta));
    }
  }, {
    key: 'clone',
    value: function clone$$1(value) {
      return clone(value);
    }
  }]);
  return DiffPatcher;
}();
var isArray$3 = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return a instanceof Array;
};
var getObjectKeys = typeof Object.keys === 'function' ? function (obj) {
  return Object.keys(obj);
} : function (obj) {
  var names = [];
  for (var property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      names.push(property);
    }
  }
  return names;
};
var trimUnderscore = function trimUnderscore(str) {
  if (str.substr(0, 1) === '_') {
    return str.slice(1);
  }
  return str;
};
var arrayKeyToSortNumber = function arrayKeyToSortNumber(key) {
  if (key === '_t') {
    return -1;
  } else {
    if (key.substr(0, 1) === '_') {
      return parseInt(key.slice(1), 10);
    } else {
      return parseInt(key, 10) + 0.1;
    }
  }
};
var arrayKeyComparer = function arrayKeyComparer(key1, key2) {
  return arrayKeyToSortNumber(key1) - arrayKeyToSortNumber(key2);
};
var BaseFormatter = function () {
  function BaseFormatter() {
    classCallCheck(this, BaseFormatter);
  }
  createClass(BaseFormatter, [{
    key: 'format',
    value: function format(delta, left) {
      var context = {};
      this.prepareContext(context);
      this.recurse(context, delta, left);
      return this.finalize(context);
    }
  }, {
    key: 'prepareContext',
    value: function prepareContext(context) {
      context.buffer = [];
      context.out = function () {
        var _buffer;
        (_buffer = this.buffer).push.apply(_buffer, arguments);
      };
    }
  }, {
    key: 'typeFormattterNotFound',
    value: function typeFormattterNotFound(context, deltaType) {
      throw new Error('cannot format delta type: ' + deltaType);
    }
  }, {
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      return err.toString();
    }
  }, {
    key: 'finalize',
    value: function finalize(_ref) {
      var buffer = _ref.buffer;
      if (isArray$3(buffer)) {
        return buffer.join('');
      }
    }
  }, {
    key: 'recurse',
    value: function recurse(context, delta, left, key, leftKey, movedFrom, isLast) {
      var useMoveOriginHere = delta && movedFrom;
      var leftValue = useMoveOriginHere ? movedFrom.value : left;
      if (typeof delta === 'undefined' && typeof key === 'undefined') {
        return undefined;
      }
      var type = this.getDeltaType(delta, movedFrom);
      var nodeType = type === 'node' ? delta._t === 'a' ? 'array' : 'object' : '';
      if (typeof key !== 'undefined') {
        this.nodeBegin(context, key, leftKey, type, nodeType, isLast);
      } else {
        this.rootBegin(context, type, nodeType);
      }
      var typeFormattter = void 0;
      try {
        typeFormattter = this['format_' + type] || this.typeFormattterNotFound(context, type);
        typeFormattter.call(this, context, delta, leftValue, key, leftKey, movedFrom);
      } catch (err) {
        this.typeFormattterErrorFormatter(context, err, delta, leftValue, key, leftKey, movedFrom);
        if (typeof console !== 'undefined' && console.error) {
          console.error(err.stack);
        }
      }
      if (typeof key !== 'undefined') {
        this.nodeEnd(context, key, leftKey, type, nodeType, isLast);
      } else {
        this.rootEnd(context, type, nodeType);
      }
    }
  }, {
    key: 'formatDeltaChildren',
    value: function formatDeltaChildren(context, delta, left) {
      var self = this;
      this.forEachDeltaKey(delta, left, function (key, leftKey, movedFrom, isLast) {
        self.recurse(context, delta[key], left ? left[leftKey] : undefined, key, leftKey, movedFrom, isLast);
      });
    }
  }, {
    key: 'forEachDeltaKey',
    value: function forEachDeltaKey(delta, left, fn) {
      var keys = getObjectKeys(delta);
      var arrayKeys = delta._t === 'a';
      var moveDestinations = {};
      var name = void 0;
      if (typeof left !== 'undefined') {
        for (name in left) {
          if (Object.prototype.hasOwnProperty.call(left, name)) {
            if (typeof delta[name] === 'undefined' && (!arrayKeys || typeof delta['_' + name] === 'undefined')) {
              keys.push(name);
            }
          }
        }
      }
      // look for move destinations
      for (name in delta) {
        if (Object.prototype.hasOwnProperty.call(delta, name)) {
          var value = delta[name];
          if (isArray$3(value) && value[2] === 3) {
            moveDestinations[value[1].toString()] = {
              key: name,
              value: left && left[parseInt(name.substr(1))]
            };
            if (this.includeMoveDestinations !== false) {
              if (typeof left === 'undefined' && typeof delta[value[1]] === 'undefined') {
                keys.push(value[1].toString());
              }
            }
          }
        }
      }
      if (arrayKeys) {
        keys.sort(arrayKeyComparer);
      } else {
        keys.sort();
      }
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        if (arrayKeys && key === '_t') {
          continue;
        }
        var leftKey = arrayKeys ? typeof key === 'number' ? key : parseInt(trimUnderscore(key), 10) : key;
        var isLast = index === length - 1;
        fn(key, leftKey, moveDestinations[leftKey], isLast);
      }
    }
  }, {
    key: 'getDeltaType',
    value: function getDeltaType(delta, movedFrom) {
      if (typeof delta === 'undefined') {
        if (typeof movedFrom !== 'undefined') {
          return 'movedestination';
        }
        return 'unchanged';
      }
      if (isArray$3(delta)) {
        if (delta.length === 1) {
          return 'added';
        }
        if (delta.length === 2) {
          return 'modified';
        }
        if (delta.length === 3 && delta[2] === 0) {
          return 'deleted';
        }
        if (delta.length === 3 && delta[2] === 2) {
          return 'textdiff';
        }
        if (delta.length === 3 && delta[2] === 3) {
          return 'moved';
        }
      } else if ((typeof delta === 'undefined' ? 'undefined' : _typeof(delta)) === 'object') {
        return 'node';
      }
      return 'unknown';
    }
  }, {
    key: 'parseTextDiff',
    value: function parseTextDiff(value) {
      var output = [];
      var lines = value.split('\n@@ ');
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        var lineOutput = {
          pieces: []
        };
        var location = /^(?:@@ )?[-+]?(\d+),(\d+)/.exec(line).slice(1);
        lineOutput.location = {
          line: location[0],
          chr: location[1]
        };
        var pieces = line.split('\n').slice(1);
        for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = pieces[pieceIndex];
          if (!piece.length) {
            continue;
          }
          var pieceOutput = {
            type: 'context'
          };
          if (piece.substr(0, 1) === '+') {
            pieceOutput.type = 'added';
          } else if (piece.substr(0, 1) === '-') {
            pieceOutput.type = 'deleted';
          }
          pieceOutput.text = piece.slice(1);
          lineOutput.pieces.push(pieceOutput);
        }
        output.push(lineOutput);
      }
      return output;
    }
  }]);
  return BaseFormatter;
}();
(function (_BaseFormatter) {
  inherits(HtmlFormatter, _BaseFormatter);
  function HtmlFormatter() {
    classCallCheck(this, HtmlFormatter);
    return possibleConstructorReturn(this, (HtmlFormatter.__proto__ || Object.getPrototypeOf(HtmlFormatter)).apply(this, arguments));
  }
  createClass(HtmlFormatter, [{
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      context.out('<pre class="jsondiffpatch-error">' + err + '</pre>');
    }
  }, {
    key: 'formatValue',
    value: function formatValue(context, value) {
      context.out('<pre>' + htmlEscape(JSON.stringify(value, null, 2)) + '</pre>');
    }
  }, {
    key: 'formatTextDiffString',
    value: function formatTextDiffString(context, value) {
      var lines = this.parseTextDiff(value);
      context.out('<ul class="jsondiffpatch-textdiff">');
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        context.out('<li><div class="jsondiffpatch-textdiff-location">' + ('<span class="jsondiffpatch-textdiff-line-number">' + line.location.line + '</span><span class="jsondiffpatch-textdiff-char">' + line.location.chr + '</span></div><div class="jsondiffpatch-textdiff-line">'));
        var pieces = line.pieces;
        for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          /* global decodeURI */
          var piece = pieces[pieceIndex];
          context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' + htmlEscape(decodeURI(piece.text)) + '</span>');
        }
        context.out('</div></li>');
      }
      context.out('</ul>');
    }
  }, {
    key: 'rootBegin',
    value: function rootBegin(context, type, nodeType) {
      var nodeClass = 'jsondiffpatch-' + type + (nodeType ? ' jsondiffpatch-child-node-type-' + nodeType : '');
      context.out('<div class="jsondiffpatch-delta ' + nodeClass + '">');
    }
  }, {
    key: 'rootEnd',
    value: function rootEnd(context) {
      context.out('</div>' + (context.hasArrows ? '<script type="text/javascript">setTimeout(' + (adjustArrows.toString() + ',10);</script>') : ''));
    }
  }, {
    key: 'nodeBegin',
    value: function nodeBegin(context, key, leftKey, type, nodeType) {
      var nodeClass = 'jsondiffpatch-' + type + (nodeType ? ' jsondiffpatch-child-node-type-' + nodeType : '');
      context.out('<li class="' + nodeClass + '" data-key="' + leftKey + '">' + ('<div class="jsondiffpatch-property-name">' + leftKey + '</div>'));
    }
  }, {
    key: 'nodeEnd',
    value: function nodeEnd(context) {
      context.out('</li>');
    }
    /* jshint camelcase: false */
    /* eslint-disable camelcase */
  }, {
    key: 'format_unchanged',
    value: function format_unchanged(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, left);
      context.out('</div>');
    }
  }, {
    key: 'format_movedestination',
    value: function format_movedestination(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, left);
      context.out('</div>');
    }
  }, {
    key: 'format_node',
    value: function format_node(context, delta, left) {
      // recurse
      var nodeType = delta._t === 'a' ? 'array' : 'object';
      context.out('<ul class="jsondiffpatch-node jsondiffpatch-node-type-' + nodeType + '">');
      this.formatDeltaChildren(context, delta, left);
      context.out('</ul>');
    }
  }, {
    key: 'format_added',
    value: function format_added(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>');
    }
  }, {
    key: 'format_modified',
    value: function format_modified(context, delta) {
      context.out('<div class="jsondiffpatch-value jsondiffpatch-left-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>' + '<div class="jsondiffpatch-value jsondiffpatch-right-value">');
      this.formatValue(context, delta[1]);
      context.out('</div>');
    }
  }, {
    key: 'format_deleted',
    value: function format_deleted(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>');
    }
  }, {
    key: 'format_moved',
    value: function format_moved(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out('</div><div class="jsondiffpatch-moved-destination">' + delta[1] + '</div>');
      // draw an SVG arrow from here to move destination
      context.out( /* jshint multistr: true */
      '<div class="jsondiffpatch-arrow" ' + 'style="position: relative; left: -34px;">\n          <svg width="30" height="60" ' + 'style="position: absolute; display: none;">\n          <defs>\n              <marker id="markerArrow" markerWidth="8" markerHeight="8"\n                 refx="2" refy="4"\n                     orient="auto" markerUnits="userSpaceOnUse">\n                  <path d="M1,1 L1,7 L7,4 L1,1" style="fill: #339;" />\n              </marker>\n          </defs>\n          <path d="M30,0 Q-10,25 26,50"\n            style="stroke: #88f; stroke-width: 2px; fill: none; ' + 'stroke-opacity: 0.5; marker-end: url(#markerArrow);"\n          ></path>\n          </svg>\n      </div>');
      context.hasArrows = true;
    }
  }, {
    key: 'format_textdiff',
    value: function format_textdiff(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatTextDiffString(context, delta[0]);
      context.out('</div>');
    }
  }]);
  return HtmlFormatter;
})(BaseFormatter);
function htmlEscape(text) {
  var html = text;
  var replacements = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/'/g, '&apos;'], [/"/g, '&quot;']];
  for (var i = 0; i < replacements.length; i++) {
    html = html.replace(replacements[i][0], replacements[i][1]);
  }
  return html;
}
var adjustArrows = function jsondiffpatchHtmlFormatterAdjustArrows(nodeArg) {
  var node = nodeArg || document;
  var getElementText = function getElementText(_ref) {
    var textContent = _ref.textContent,
      innerText = _ref.innerText;
    return textContent || innerText;
  };
  var eachByQuery = function eachByQuery(el, query, fn) {
    var elems = el.querySelectorAll(query);
    for (var i = 0, l = elems.length; i < l; i++) {
      fn(elems[i]);
    }
  };
  var eachChildren = function eachChildren(_ref2, fn) {
    var children = _ref2.children;
    for (var i = 0, l = children.length; i < l; i++) {
      fn(children[i], i);
    }
  };
  eachByQuery(node, '.jsondiffpatch-arrow', function (_ref3) {
    var parentNode = _ref3.parentNode,
      children = _ref3.children,
      style = _ref3.style;
    var arrowParent = parentNode;
    var svg = children[0];
    var path = svg.children[1];
    svg.style.display = 'none';
    var destination = getElementText(arrowParent.querySelector('.jsondiffpatch-moved-destination'));
    var container = arrowParent.parentNode;
    var destinationElem = void 0;
    eachChildren(container, function (child) {
      if (child.getAttribute('data-key') === destination) {
        destinationElem = child;
      }
    });
    if (!destinationElem) {
      return;
    }
    try {
      var distance = destinationElem.offsetTop - arrowParent.offsetTop;
      svg.setAttribute('height', Math.abs(distance) + 6);
      style.top = -8 + (distance > 0 ? 0 : distance) + 'px';
      var curve = distance > 0 ? 'M30,0 Q-10,' + Math.round(distance / 2) + ' 26,' + (distance - 4) : 'M30,' + -distance + ' Q-10,' + Math.round(-distance / 2) + ' 26,4';
      path.setAttribute('d', curve);
      svg.style.display = '';
    } catch (err) {}
  });
};
var AnnotatedFormatter = function (_BaseFormatter) {
  inherits(AnnotatedFormatter, _BaseFormatter);
  function AnnotatedFormatter() {
    classCallCheck(this, AnnotatedFormatter);
    var _this = possibleConstructorReturn(this, (AnnotatedFormatter.__proto__ || Object.getPrototypeOf(AnnotatedFormatter)).call(this));
    _this.includeMoveDestinations = false;
    return _this;
  }
  createClass(AnnotatedFormatter, [{
    key: 'prepareContext',
    value: function prepareContext(context) {
      get(AnnotatedFormatter.prototype.__proto__ || Object.getPrototypeOf(AnnotatedFormatter.prototype), 'prepareContext', this).call(this, context);
      context.indent = function (levels) {
        this.indentLevel = (this.indentLevel || 0) + (typeof levels === 'undefined' ? 1 : levels);
        this.indentPad = new Array(this.indentLevel + 1).join('&nbsp;&nbsp;');
      };
      context.row = function (json, htmlNote) {
        context.out('<tr><td style="white-space: nowrap;">' + '<pre class="jsondiffpatch-annotated-indent"' + ' style="display: inline-block">');
        context.out(context.indentPad);
        context.out('</pre><pre style="display: inline-block">');
        context.out(json);
        context.out('</pre></td><td class="jsondiffpatch-delta-note"><div>');
        context.out(htmlNote);
        context.out('</div></td></tr>');
      };
    }
  }, {
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      context.row('', '<pre class="jsondiffpatch-error">' + err + '</pre>');
    }
  }, {
    key: 'formatTextDiffString',
    value: function formatTextDiffString(context, value) {
      var lines = this.parseTextDiff(value);
      context.out('<ul class="jsondiffpatch-textdiff">');
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        context.out('<li><div class="jsondiffpatch-textdiff-location">' + ('<span class="jsondiffpatch-textdiff-line-number">' + line.location.line + '</span><span class="jsondiffpatch-textdiff-char">' + line.location.chr + '</span></div><div class="jsondiffpatch-textdiff-line">'));
        var pieces = line.pieces;
        for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = pieces[pieceIndex];
          context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' + piece.text + '</span>');
        }
        context.out('</div></li>');
      }
      context.out('</ul>');
    }
  }, {
    key: 'rootBegin',
    value: function rootBegin(context, type, nodeType) {
      context.out('<table class="jsondiffpatch-annotated-delta">');
      if (type === 'node') {
        context.row('{');
        context.indent();
      }
      if (nodeType === 'array') {
        context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
      }
    }
  }, {
    key: 'rootEnd',
    value: function rootEnd(context, type) {
      if (type === 'node') {
        context.indent(-1);
        context.row('}');
      }
      context.out('</table>');
    }
  }, {
    key: 'nodeBegin',
    value: function nodeBegin(context, key, leftKey, type, nodeType) {
      context.row('&quot;' + key + '&quot;: {');
      if (type === 'node') {
        context.indent();
      }
      if (nodeType === 'array') {
        context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
      }
    }
  }, {
    key: 'nodeEnd',
    value: function nodeEnd(context, key, leftKey, type, nodeType, isLast) {
      if (type === 'node') {
        context.indent(-1);
      }
      context.row('}' + (isLast ? '' : ','));
    }
    /* jshint camelcase: false */
    /* eslint-disable camelcase */
  }, {
    key: 'format_unchanged',
    value: function format_unchanged() {}
  }, {
    key: 'format_movedestination',
    value: function format_movedestination() {}
  }, {
    key: 'format_node',
    value: function format_node(context, delta, left) {
      // recurse
      this.formatDeltaChildren(context, delta, left);
    }
  }]);
  return AnnotatedFormatter;
}(BaseFormatter);
/* eslint-enable camelcase */
var wrapPropertyName = function wrapPropertyName(name) {
  return '<pre style="display:inline-block">&quot;' + name + '&quot;</pre>';
};
var deltaAnnotations = {
  added: function added(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([newValue])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'new value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'insert at index ' + leftKey + formatLegend;
    }
    return 'add property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  modified: function modified(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([previousValue, newValue])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'modify value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'modify at index ' + leftKey + formatLegend;
    }
    return 'modify property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  deleted: function deleted(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([previousValue, 0, 0])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'delete value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'remove index ' + leftKey + formatLegend;
    }
    return 'delete property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  moved: function moved(delta, left, key, leftKey) {
    return 'move from <span title="(position to remove at original state)">' + ('index ' + leftKey + '</span> to <span title="(position to insert at final') + (' state)">index ' + delta[1] + '</span>');
  },
  textdiff: function textdiff(delta, left, key, leftKey) {
    var location = typeof leftKey === 'undefined' ? '' : typeof leftKey === 'number' ? ' at index ' + leftKey : ' at property ' + wrapPropertyName(leftKey);
    return 'text diff' + location + ', format is <a href="https://code.google.com/' + 'p/google-diff-match-patch/wiki/Unidiff">a variation of Unidiff</a>';
  }
};
var formatAnyChange = function formatAnyChange(context, delta) {
  var deltaType = this.getDeltaType(delta);
  var annotator = deltaAnnotations[deltaType];
  var htmlNote = annotator && annotator.apply(annotator, Array.prototype.slice.call(arguments, 1));
  var json = JSON.stringify(delta, null, 2);
  if (deltaType === 'textdiff') {
    // split text diffs lines
    json = json.split('\\n').join('\\n"+\n   "');
  }
  context.indent();
  context.row(json, htmlNote);
  context.indent(-1);
};
/* eslint-disable camelcase */
AnnotatedFormatter.prototype.format_added = formatAnyChange;
AnnotatedFormatter.prototype.format_modified = formatAnyChange;
AnnotatedFormatter.prototype.format_deleted = formatAnyChange;
AnnotatedFormatter.prototype.format_moved = formatAnyChange;
AnnotatedFormatter.prototype.format_textdiff = formatAnyChange;
var OPERATIONS = {
  add: 'add',
  remove: 'remove',
  replace: 'replace',
  move: 'move'
};
(function (_BaseFormatter) {
  inherits(JSONFormatter, _BaseFormatter);
  function JSONFormatter() {
    classCallCheck(this, JSONFormatter);
    var _this = possibleConstructorReturn(this, (JSONFormatter.__proto__ || Object.getPrototypeOf(JSONFormatter)).call(this));
    _this.includeMoveDestinations = true;
    return _this;
  }
  createClass(JSONFormatter, [{
    key: 'prepareContext',
    value: function prepareContext(context) {
      get(JSONFormatter.prototype.__proto__ || Object.getPrototypeOf(JSONFormatter.prototype), 'prepareContext', this).call(this, context);
      context.result = [];
      context.path = [];
      context.pushCurrentOp = function (obj) {
        var op = obj.op,
          value = obj.value;
        var val = {
          op: op,
          path: this.currentPath()
        };
        if (typeof value !== 'undefined') {
          val.value = value;
        }
        this.result.push(val);
      };
      context.pushMoveOp = function (to) {
        var from = this.currentPath();
        this.result.push({
          op: OPERATIONS.move,
          from: from,
          path: this.toPath(to)
        });
      };
      context.currentPath = function () {
        return '/' + this.path.join('/');
      };
      context.toPath = function (toPath) {
        var to = this.path.slice();
        to[to.length - 1] = toPath;
        return '/' + to.join('/');
      };
    }
  }, {
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      context.out('[ERROR] ' + err);
    }
  }, {
    key: 'rootBegin',
    value: function rootBegin() {}
  }, {
    key: 'rootEnd',
    value: function rootEnd() {}
  }, {
    key: 'nodeBegin',
    value: function nodeBegin(_ref, key, leftKey) {
      var path = _ref.path;
      path.push(leftKey);
    }
  }, {
    key: 'nodeEnd',
    value: function nodeEnd(_ref2) {
      var path = _ref2.path;
      path.pop();
    }
    /* jshint camelcase: false */
    /* eslint-disable camelcase */
  }, {
    key: 'format_unchanged',
    value: function format_unchanged() {}
  }, {
    key: 'format_movedestination',
    value: function format_movedestination() {}
  }, {
    key: 'format_node',
    value: function format_node(context, delta, left) {
      this.formatDeltaChildren(context, delta, left);
    }
  }, {
    key: 'format_added',
    value: function format_added(context, delta) {
      context.pushCurrentOp({
        op: OPERATIONS.add,
        value: delta[0]
      });
    }
  }, {
    key: 'format_modified',
    value: function format_modified(context, delta) {
      context.pushCurrentOp({
        op: OPERATIONS.replace,
        value: delta[1]
      });
    }
  }, {
    key: 'format_deleted',
    value: function format_deleted(context) {
      context.pushCurrentOp({
        op: OPERATIONS.remove
      });
    }
  }, {
    key: 'format_moved',
    value: function format_moved(context, delta) {
      var to = delta[1];
      context.pushMoveOp(to);
    }
  }, {
    key: 'format_textdiff',
    value: function format_textdiff() {
      throw new Error('Not implemented');
    }
  }, {
    key: 'format',
    value: function format(delta, left) {
      var context = {};
      this.prepareContext(context);
      this.recurse(context, delta, left);
      return context.result;
    }
  }]);
  return JSONFormatter;
})(BaseFormatter);
function chalkColor(name) {
  return _empty_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z && _empty_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z[name] || function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args;
  };
}
var colors = {
  added: chalkColor('green'),
  deleted: chalkColor('red'),
  movedestination: chalkColor('gray'),
  moved: chalkColor('yellow'),
  unchanged: chalkColor('gray'),
  error: chalkColor('white.bgRed'),
  textDiffLine: chalkColor('gray')
};
(function (_BaseFormatter) {
  inherits(ConsoleFormatter, _BaseFormatter);
  function ConsoleFormatter() {
    classCallCheck(this, ConsoleFormatter);
    var _this = possibleConstructorReturn(this, (ConsoleFormatter.__proto__ || Object.getPrototypeOf(ConsoleFormatter)).call(this));
    _this.includeMoveDestinations = false;
    return _this;
  }
  createClass(ConsoleFormatter, [{
    key: 'prepareContext',
    value: function prepareContext(context) {
      get(ConsoleFormatter.prototype.__proto__ || Object.getPrototypeOf(ConsoleFormatter.prototype), 'prepareContext', this).call(this, context);
      context.indent = function (levels) {
        this.indentLevel = (this.indentLevel || 0) + (typeof levels === 'undefined' ? 1 : levels);
        this.indentPad = new Array(this.indentLevel + 1).join('  ');
        this.outLine();
      };
      context.outLine = function () {
        this.buffer.push('\n' + (this.indentPad || ''));
      };
      context.out = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        for (var i = 0, l = args.length; i < l; i++) {
          var lines = args[i].split('\n');
          var text = lines.join('\n' + (this.indentPad || ''));
          if (this.color && this.color[0]) {
            text = this.color[0](text);
          }
          this.buffer.push(text);
        }
      };
      context.pushColor = function (color) {
        this.color = this.color || [];
        this.color.unshift(color);
      };
      context.popColor = function () {
        this.color = this.color || [];
        this.color.shift();
      };
    }
  }, {
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      context.pushColor(colors.error);
      context.out('[ERROR]' + err);
      context.popColor();
    }
  }, {
    key: 'formatValue',
    value: function formatValue(context, value) {
      context.out(JSON.stringify(value, null, 2));
    }
  }, {
    key: 'formatTextDiffString',
    value: function formatTextDiffString(context, value) {
      var lines = this.parseTextDiff(value);
      context.indent();
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        context.pushColor(colors.textDiffLine);
        context.out(line.location.line + ',' + line.location.chr + ' ');
        context.popColor();
        var pieces = line.pieces;
        for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = pieces[pieceIndex];
          context.pushColor(colors[piece.type]);
          context.out(piece.text);
          context.popColor();
        }
        if (i < l - 1) {
          context.outLine();
        }
      }
      context.indent(-1);
    }
  }, {
    key: 'rootBegin',
    value: function rootBegin(context, type, nodeType) {
      context.pushColor(colors[type]);
      if (type === 'node') {
        context.out(nodeType === 'array' ? '[' : '{');
        context.indent();
      }
    }
  }, {
    key: 'rootEnd',
    value: function rootEnd(context, type, nodeType) {
      if (type === 'node') {
        context.indent(-1);
        context.out(nodeType === 'array' ? ']' : '}');
      }
      context.popColor();
    }
  }, {
    key: 'nodeBegin',
    value: function nodeBegin(context, key, leftKey, type, nodeType) {
      context.pushColor(colors[type]);
      context.out(leftKey + ': ');
      if (type === 'node') {
        context.out(nodeType === 'array' ? '[' : '{');
        context.indent();
      }
    }
  }, {
    key: 'nodeEnd',
    value: function nodeEnd(context, key, leftKey, type, nodeType, isLast) {
      if (type === 'node') {
        context.indent(-1);
        context.out(nodeType === 'array' ? ']' : '}' + (isLast ? '' : ','));
      }
      if (!isLast) {
        context.outLine();
      }
      context.popColor();
    }
    /* jshint camelcase: false */
    /* eslint-disable camelcase */
  }, {
    key: 'format_unchanged',
    value: function format_unchanged(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      this.formatValue(context, left);
    }
  }, {
    key: 'format_movedestination',
    value: function format_movedestination(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      this.formatValue(context, left);
    }
  }, {
    key: 'format_node',
    value: function format_node(context, delta, left) {
      // recurse
      this.formatDeltaChildren(context, delta, left);
    }
  }, {
    key: 'format_added',
    value: function format_added(context, delta) {
      this.formatValue(context, delta[0]);
    }
  }, {
    key: 'format_modified',
    value: function format_modified(context, delta) {
      context.pushColor(colors.deleted);
      this.formatValue(context, delta[0]);
      context.popColor();
      context.out(' => ');
      context.pushColor(colors.added);
      this.formatValue(context, delta[1]);
      context.popColor();
    }
  }, {
    key: 'format_deleted',
    value: function format_deleted(context, delta) {
      this.formatValue(context, delta[0]);
    }
  }, {
    key: 'format_moved',
    value: function format_moved(context, delta) {
      context.out('==> ' + delta[1]);
    }
  }, {
    key: 'format_textdiff',
    value: function format_textdiff(context, delta) {
      this.formatTextDiffString(context, delta[0]);
    }
  }]);
  return ConsoleFormatter;
})(BaseFormatter);

const diffPatcher = new DiffPatcher({
    arrays: { detectMove: false, includeValueOnMove: false },
    textDiff: { minLength: 1 }
});
function diff(inputA, inputB) {
    return diffPatcher.diff(inputA, inputB);
}

const addedProperties = [
    'docChanged',
    'isGeneric',
    'scrolledIntoView',
    'selectionSet',
    'storedMarksSet'
];
function addPropertiesToTransaction(tr) {
    return Object.keys(tr)
        .concat(addedProperties)
        .reduce((acc, key) => {
        // @ts-ignore
        acc[key] = tr[key];
        return acc;
    }, {});
}

function buildSelection(selection) {
    return {
        // @ts-ignore
        type: selection.type,
        empty: selection.empty,
        anchor: selection.anchor,
        head: selection.head,
        from: selection.from,
        to: selection.to
    };
}
function pad(num) {
    return ('00' + num).slice(-2);
}
function pad3(num) {
    return ('000' + num).slice(-3);
}
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds()),
        pad3(date.getMilliseconds())
    ].join(':');
};
const regexp = /(&lt;\/?[\w\d\s="']+&gt;)/gim;
const highlightHtmlString = (html) => html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(regexp, "<span style='color: cadetblue;'>$&</span>");
function createHistoryEntry(trs, state, stateBeforeDispatch, oldEntry) {
    const serializer = prosemirror_model__WEBPACK_IMPORTED_MODULE_2__/* .DOMSerializer */ .PW.fromSchema(state.schema);
    const selection = state.selection;
    const domFragment = serializer.serializeFragment(selection.content().content);
    const selectedElementsAsHtml = [];
    if (domFragment) {
        let child = domFragment.firstChild;
        while (child) {
            selectedElementsAsHtml.push(child.outerHTML);
            child = child.nextSibling;
        }
    }
    // As described in stateHistory.ts the first entry is a special exception
    const prevState = oldEntry ? oldEntry.state : stateBeforeDispatch;
    const contentDiff = diff(prevState.doc.toJSON(), state.doc.toJSON());
    const selectionDiff = diff(buildSelection(prevState.selection), buildSelection(state.selection));
    return {
        id: Math.random().toString() + Math.random().toString(),
        state,
        trs: trs.map(tr => addPropertiesToTransaction(tr)),
        timestamp: trs[0].time,
        timeStr: formatTimestamp(trs[0].time),
        contentDiff,
        selectionDiff,
        selectionHtml: highlightHtmlString((0,html__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(selectedElementsAsHtml.join('\n'), {
            max_char: 60,
            indent_size: 2
        }))
    };
}

const stateHistory = writable(new Map());
const shownHistoryGroups = writable([]);
const latestEntry = writable(undefined);
const nextId = writable(0);
function appendNewHistoryEntry(trs, state, stateBeforeDispatch) {
    const entryMap = get_store_value(stateHistory);
    const prevGroup = get_store_value(shownHistoryGroups)[0];
    const oldEntry = entryMap.get((prevGroup === null || prevGroup === void 0 ? void 0 : prevGroup.topEntryId) || '');
    // In the case of first entry there aren't oldEntries to diff against, therefore we have to use the state
    // before the transaction. We can't use it for the next entries because it will always be one state behind,
    // as the current state is the one _after_ the dispatch. You can observe this in the old dev-tools.
    const newEntry = createHistoryEntry(trs, state, stateBeforeDispatch, oldEntry);
    stateHistory.update(val => new Map(val.set(newEntry.id, newEntry)));
    latestEntry.set(newEntry);
    // Groups are subsequent transactions where the doc hasn't changed (eg selection was set) OR the diff was equal
    // Haven't seen necessary to differentiate between selection-only vs equal diffs
    const isGroup = !newEntry.contentDiff;
    if ((prevGroup === null || prevGroup === void 0 ? void 0 : prevGroup.isGroup) && isGroup) {
        const newGroup = {
            id: prevGroup.id,
            isGroup,
            entryIds: [newEntry.id, ...prevGroup.entryIds],
            topEntryId: newEntry.id,
            expanded: prevGroup.expanded
        };
        shownHistoryGroups.update(val => [newGroup, ...val.slice(1)]);
    }
    else {
        const id = get_store_value(nextId) + 1;
        const newGroup = {
            id,
            isGroup,
            entryIds: [newEntry.id],
            topEntryId: newEntry.id,
            expanded: false
        };
        shownHistoryGroups.update(val => [newGroup, ...val]);
        nextId.set(id);
    }
}
function resetHistory() {
    stateHistory.set(new Map());
    shownHistoryGroups.set([]);
    latestEntry.set(undefined);
}

// From https://github.com/PierBover/prosemirror-cookbook
function getActiveMarks(state) {
    if (state.selection.empty) {
        const $from = state.selection.$from;
        const storedMarks = state.storedMarks;
        // Return either the stored marks, or the marks at the cursor position.
        // Stored marks are the marks that are going to be applied to the next input
        // if you dispatched a mark toggle with an empty cursor.
        if (storedMarks) {
            return storedMarks.map(mark => mark.type.name);
        }
        else {
            return $from.marks().map(mark => mark.type.name);
        }
    }
    else {
        const $head = state.selection.$head;
        const $anchor = state.selection.$anchor;
        // We're using a Set to not get duplicate values
        const activeMarks = new Set();
        // Here we're getting the marks at the head and anchor of the selection
        $head.marks().forEach(mark => activeMarks.add(mark.type.name));
        $anchor.marks().forEach(mark => activeMarks.add(mark.type.name));
        return Array.from(activeMarks);
    }
}

const defaultProperties = ['jsonID', 'empty', 'anchor', 'from', 'head', 'to'];
const resolvedPosProperties = ['$anchor', '$head', '$cursor', '$to', '$from'];
const resolvedPosSubProperties = ['nodeAfter', 'nodeBefore', 'textOffset'];
function createSelection(selection) {
    return defaultProperties.reduce((acc, key) => {
        // @ts-ignore
        acc[key] = selection[key];
        return acc;
    }, {});
}
function createFullSelection(selection) {
    return defaultProperties.concat(resolvedPosProperties).reduce((acc, key) => {
        // @ts-ignore
        let val = selection[key];
        if (val && resolvedPosProperties.includes(key)) {
            const additionalProperties = {};
            resolvedPosSubProperties.forEach(subKey => {
                // @ts-ignore
                additionalProperties[subKey] = val[subKey];
            });
            val = Object.assign(Object.assign({}, val), additionalProperties);
        }
        acc[key] = val;
        return acc;
    }, {});
}

function createNode(index, key, value, depth, parent) {
  const path = parent ? [...parent.path, index] : [];
  return {
    id: "[".concat(path.join(','), "]"),
    index,
    key,
    value,
    depth,
    collapsed: true,
    type: getValueType(value),
    path,
    parentId: parent ? parent.id : null,
    circularOfId: null,
    children: []
  };
}
function getValueType(value) {
  if (Array.isArray(value)) {
    return 'array';
  } else if (value instanceof Map) {
    return 'map';
  } else if (value instanceof Set) {
    return 'set';
  } else if (value instanceof Date) {
    return 'date';
  } else if (value === null) {
    return 'null';
  } else {
    return typeof value;
  }
}
// From redux-dev-tools
// case 'Object':
//   case 'Error':
//   case 'Array':
//   case 'Iterable':
//   case 'Map':
//   case 'Set':
//   case 'MapEntry':
//   case 'Number':
//     return undefined;
//   case 'String':
//     return raw => `"${raw}"`;
//   case 'Boolean':
//     return raw => (raw ? 'true' : 'false');
//   case 'Date':
//     return raw => raw.toISOString();
//   case 'Null':
//     return () => 'null';
//   case 'Undefined':
//     return () => 'undefined';
//   case 'Function':
//   case 'Symbol':
// export function objType(obj: any) {
//   const type = Object.prototype.toString.call(obj).slice(8, -1)
//   if (type === 'Object') {
//     if (typeof obj[Symbol.iterator] === 'function') {
//       return 'Iterable'
//     }
//     return obj.constructor.name
//   }
//   return type
// }
function getChildren(value, type) {
  switch (type) {
    case 'array':
      return value.map((v, i) => [i.toString(), v]);
    case 'map':
      // eslint-disable-next-line no-case-declarations
      const entries = Array.from(value.entries());
      return entries.map((_ref, i) => {
        let [key, value] = _ref;
        return ["[map entry ".concat(i, "]"), {
          '[key]': key,
          '[value]': value
        }];
      });
    case 'set':
      return Array.from(value.values()).map((v, i) => ["[set entry ".concat(i, "]"), v]);
    case 'object':
      return Object.entries(value);
    default:
      return [];
  }
}
function shouldRecurseChildren(node, parent, iteratedValues, opts) {
  if (!parent) {
    // The root node's children should always be recursed
    return true;
  } else if (node.collapsed && (parent === null || parent === void 0 ? void 0 : parent.collapsed)) {
    // If the node's parent is uncollapsed the node's children should still be recursed
    // in order to compute its value properly eg "{} 4 keys" and to place clickable arrow caret.
    // Only when the node is completely hidden it should not be recursed
    return false;
  } else if (!opts.stopCircularRecursion) {
    return true;
  } else if (opts.isCircularNode) {
    return opts.isCircularNode(node, iteratedValues);
  } else if (node.type === 'object' || node.type === 'array') {
    const existingNodeWithValue = iteratedValues.get(node.value);
    if (existingNodeWithValue && node.id !== existingNodeWithValue.id) {
      node.circularOfId = existingNodeWithValue.id;
      return false;
    }
    iteratedValues.set(node.value, node);
  }
  return true;
}
function recurseObjectProperties(index, key, value, depth, ensureNotCollapsed, parent, treeMap, oldTreeMap, iteratedValues, recomputeExpandNode, opts) {
  var _a;
  if (((_a = opts.omitKeys) === null || _a === void 0 ? void 0 : _a.includes(key)) || opts.maxDepth && depth > opts.maxDepth) {
    return null;
  }
  const node = createNode(index, key, value, depth, parent);
  const oldNode = oldTreeMap.get(node.id);
  if (ensureNotCollapsed) {
    // Used to ensure that either root node is always uncollapsed or when uncollapsing new nodes
    // with expandNodeChildren the node children are recursed (if applicable) with mapChildren
    node.collapsed = false;
  } else if (oldNode && !recomputeExpandNode) {
    // Maintain the same expanded/collapsed toggle for a node in this path/id
    // EXCEPT when the shouldExpandNode prop is changed...
    node.collapsed = oldNode.collapsed;
  } else if (opts.shouldExpandNode) {
    node.collapsed = !opts.shouldExpandNode(node);
  }
  treeMap.set(node.id, node);
  if (shouldRecurseChildren(node, parent, iteratedValues, opts)) {
    const mappedChildren = opts.mapChildren && opts.mapChildren(value, getValueType(value), node);
    const children = mappedChildren !== null && mappedChildren !== void 0 ? mappedChildren : getChildren(value, getValueType(value));
    node.children = children.map((_ref2, idx) => {
      let [key, val] = _ref2;
      return recurseObjectProperties(idx, key, val, depth + 1, false, node, treeMap, oldTreeMap, iteratedValues, recomputeExpandNode, opts);
    }).filter(n => n !== null);
  }
  return node;
}
function recomputeTree(data, oldTreeMap, recursionOpts, recomputeExpandNode) {
  const treeMap = new Map();
  const iteratedValues = new Map();
  const newTree = recurseObjectProperties(-1, 'root', data, 0, true, null, treeMap, oldTreeMap, iteratedValues, recomputeExpandNode, recursionOpts);
  return {
    treeMap,
    tree: newTree,
    iteratedValues
  };
}

const createPropsStore = initialProps => {
  const props = writable(initialProps);
  const recursionOpts = derived(props, p => p.recursionOpts);
  return {
    props,
    recursionOpts,
    setProps(newProps) {
      props.set(newProps);
    },
    formatValue(val, node) {
      const {
        valueFormatter
      } = get_store_value(props);
      const customFormat = valueFormatter ? valueFormatter(val, node) : undefined;
      if (customFormat) {
        return customFormat;
      }
      switch (node.type) {
        case 'array':
          return "".concat(node.circularOfId ? 'circular' : '', " [] ").concat(val.length, " items");
        case 'object':
          return "".concat(node.circularOfId ? 'circular' : '', " {} ").concat(Object.keys(val).length, " keys");
        case 'map':
        case 'set':
          return "".concat(node.circularOfId ? 'circular' : '', " () ").concat(val.size, " entries");
        case 'date':
          return "".concat(val.toISOString());
        case 'string':
          return "\"".concat(val, "\"");
        case 'boolean':
          return val ? 'true' : 'false';
        case 'symbol':
          return String(val);
        default:
          return val;
      }
    }
  };
};

const createRootElementStore = () => {
  const rootElementStore = writable(null);
  return {
    set: rootElementStore.set,
    subscribe: rootElementStore.subscribe
  };
};

const createTreeStore = propsStore => {
  const defaultRootNode = createNode(0, 'root', [], 0, null);
  const tree = writable(defaultRootNode);
  const treeMap = writable(new Map());
  const iteratedValues = writable(new Map());
  return {
    tree,
    treeMap,
    defaultRootNode,
    init(newTree, newTreeMap, iterated) {
      if (newTree) {
        tree.set(newTree);
      } else {
        tree.set(defaultRootNode);
      }
      treeMap.set(newTreeMap);
      iteratedValues.set(iterated);
    },
    getNode(id) {
      return get_store_value(treeMap).get(id);
    },
    toggleCollapse(id) {
      const node = get_store_value(treeMap).get(id);
      if (!node) {
        console.warn("Attempted to collapse non-existent node: ".concat(id));
        return;
      }
      const updatedNode = Object.assign(Object.assign({}, node), {
        collapsed: !node.collapsed
      });
      treeMap.update(m => new Map(m.set(node.id, updatedNode)));
      const recursionOpts = get_store_value(propsStore.recursionOpts);
      if (recursionOpts) {
        this.expandNodeChildren(updatedNode, recursionOpts);
      }
    },
    expandNodeChildren(node, recursionOpts) {
      const parent = this.getNode((node === null || node === void 0 ? void 0 : node.parentId) || '') || null;
      if (!parent) {
        // Only root node has no parent and it should not be expandable
        throw Error('No parent in expandNodeChildren for node: ' + node);
      }
      const newTreeMap = new Map(get_store_value(treeMap));
      const oldTreeMap = get_store_value(treeMap);
      const previouslyIterated = get_store_value(iteratedValues);
      const nodeWithUpdatedChildren = recurseObjectProperties(node.index, node.key, node.value, node.depth, !node.collapsed,
      // Ensure that when uncollapsed the node's children are always recursed
      parent, newTreeMap, oldTreeMap, previouslyIterated, false,
      // Never recompute shouldExpandNode since it may override the collapsing of this node
      recursionOpts);
      if (!nodeWithUpdatedChildren) return;
      parent.children = parent.children.map(c => c.id === nodeWithUpdatedChildren.id ? nodeWithUpdatedChildren : c);
      newTreeMap.set(nodeWithUpdatedChildren.id, nodeWithUpdatedChildren);
      newTreeMap.set(parent.id, parent);
      treeMap.set(newTreeMap);
      iteratedValues.set(previouslyIterated);
    },
    expandAllNodesToNode(id) {
      function recurseNodeUpwards(updated, node) {
        if (!node) return;
        updated.set(node.id, Object.assign(Object.assign({}, node), {
          collapsed: false
        }));
        if (node.parentId) {
          recurseNodeUpwards(updated, updated.get(node.parentId));
        }
      }
      const updated = new Map(get_store_value(treeMap));
      recurseNodeUpwards(updated, updated.get(id));
      treeMap.set(updated);
    }
  };
};

/* ../../node_modules/.pnpm/svelte-tree-view@1.4.2_svelte@4.2.15/node_modules/svelte-tree-view/pkg/TreeViewNode.svelte generated by Svelte v4.2.15 */
function add_css$h(target) {
  append_styles(target, "svelte-ngcjq5", "ul.svelte-ngcjq5.svelte-ngcjq5{display:flex;flex-direction:column;height:max-content;list-style:none;padding:0;padding-left:var(--tree-view-left-indent);margin:0;width:100%}li.svelte-ngcjq5.svelte-ngcjq5{align-items:baseline;display:flex;height:max-content;line-height:var(--tree-view-line-height);list-style:none;width:100%}li.svelte-ngcjq5+li.svelte-ngcjq5{margin-top:0.25em}.empty-block.svelte-ngcjq5.svelte-ngcjq5{visibility:hidden}.node-key.svelte-ngcjq5.svelte-ngcjq5{color:var(--tree-view-base0D);margin-right:var(--tree-view-key-margin-right)}.node-key.has-children.svelte-ngcjq5.svelte-ngcjq5{cursor:pointer}.node-key.p-left.svelte-ngcjq5.svelte-ngcjq5{padding-left:1.1em}.node-value.svelte-ngcjq5.svelte-ngcjq5{color:var(--tree-view-base0B);margin-right:0.5em;word-break:break-all}.node-value[data-type=number].svelte-ngcjq5.svelte-ngcjq5,.node-value[data-type=boolean].svelte-ngcjq5.svelte-ngcjq5{color:var(--tree-view-base09)}.node-value[data-type=null].svelte-ngcjq5.svelte-ngcjq5,.node-value[data-type=undefined].svelte-ngcjq5.svelte-ngcjq5{color:var(--tree-view-base08)}.node-value.expanded.svelte-ngcjq5.svelte-ngcjq5{color:var(--tree-view-base03)}.node-value.has-children.svelte-ngcjq5.svelte-ngcjq5{cursor:pointer}.arrow-btn.svelte-ngcjq5.svelte-ngcjq5{background:transparent;border:0;color:var(--tree-view-base0D);cursor:pointer;margin-right:0.7em;padding:0;transition:all 150ms ease 0s;transform:rotateZ(90deg);transform-origin:47% 43%;position:relative;line-height:1.1em;font-size:0.75em}.arrow-btn.collapsed.svelte-ngcjq5.svelte-ngcjq5{transform:rotateZ(0deg)}.buttons.svelte-ngcjq5.svelte-ngcjq5{display:flex;flex-wrap:wrap}.log-copy-button.svelte-ngcjq5.svelte-ngcjq5{background:transparent;border:0;color:var(--tree-view-base0D);cursor:pointer;margin:0;padding:0 0.5em}.log-copy-button.svelte-ngcjq5.svelte-ngcjq5:hover{background:rgba(255, 162, 177, 0.4);border-radius:2px;color:var(--tree-view-base07)}");
}
function get_each_context$7(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}

// (60:2) {#if hasChildren}
function create_if_block_4$3(ctx) {
  let button;
  let t;
  let button_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      t = text("▶");
      attr(button, "class", button_class_value = "" + (null_to_empty("arrow-btn ".concat( /*node*/ctx[0].collapsed ? 'collapsed' : '')) + " svelte-ngcjq5"));
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t);
      if (!mounted) {
        dispose = listen(button, "click", /*handleToggleCollapse*/ctx[9]);
        mounted = true;
      }
    },
    p(ctx, dirty) {
      if (dirty & /*node*/1 && button_class_value !== (button_class_value = "" + (null_to_empty("arrow-btn ".concat( /*node*/ctx[0].collapsed ? 'collapsed' : '')) + " svelte-ngcjq5"))) {
        attr(button, "class", button_class_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}

// (92:4) {:else}
function create_else_block$8(ctx) {
  let t_value = /*propsStore*/ctx[5].formatValue( /*node*/ctx[0].value, /*node*/ctx[0]) + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*node*/1 && t_value !== (t_value = /*propsStore*/ctx[5].formatValue( /*node*/ctx[0].value, /*node*/ctx[0]) + "")) set_data(t, t_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (85:4) {#if valueComponent}
function create_if_block_3$4(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = /*valueComponent*/ctx[3];
  function switch_props(ctx, dirty) {
    return {
      props: {
        value: /*node*/ctx[0].value,
        node: /*node*/ctx[0],
        defaultFormatter: /*valueComponentDefaultFormatter*/ctx[10]
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx, dirty) {
      if (dirty & /*valueComponent*/8 && switch_value !== (switch_value = /*valueComponent*/ctx[3])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*node*/1) switch_instance_changes.value = /*node*/ctx[0].value;
        if (dirty & /*node*/1) switch_instance_changes.node = /*node*/ctx[0];
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
}

// (97:4) {#if $props.showLogButton}
function create_if_block_2$5(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "log";
      attr(button, "class", "log-copy-button svelte-ngcjq5");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", /*handleLogNode*/ctx[7]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}

// (100:4) {#if $props.showCopyButton}
function create_if_block_1$6(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "copy";
      attr(button, "class", "log-copy-button svelte-ngcjq5");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", /*handleCopyNodeToClipboard*/ctx[8]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}

// (105:0) {#if !node.collapsed && hasChildren}
function create_if_block$9(ctx) {
  let li;
  let ul;
  let current;
  let each_value = ensure_array_like( /*node*/ctx[0].children);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
  }
  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      li = element("li");
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "class", "svelte-ngcjq5");
      attr(li, "class", "row svelte-ngcjq5");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      current = true;
    },
    p(ctx, dirty) {
      if (dirty & /*node*/1) {
        each_value = ensure_array_like( /*node*/ctx[0].children);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$7(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$7(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}

// (108:6) {#each node.children as child}
function create_each_block$7(ctx) {
  let treeviewnode;
  let current;
  treeviewnode = new TreeViewNode({
    props: {
      id: /*child*/ctx[14].id
    }
  });
  return {
    c() {
      create_component(treeviewnode.$$.fragment);
    },
    m(target, anchor) {
      mount_component(treeviewnode, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const treeviewnode_changes = {};
      if (dirty & /*node*/1) treeviewnode_changes.id = /*child*/ctx[14].id;
      treeviewnode.$set(treeviewnode_changes);
    },
    i(local) {
      if (current) return;
      transition_in(treeviewnode.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(treeviewnode.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(treeviewnode, detaching);
    }
  };
}
function create_fragment$h(ctx) {
  let li;
  let t0;
  let div0;
  let t1_value = /*node*/ctx[0].key + "";
  let t1;
  let t2;
  let t3;
  let div1;
  let current_block_type_index;
  let if_block1;
  let div1_data_type_value;
  let t4;
  let div2;
  let t5;
  let li_data_tree_id_value;
  let t6;
  let if_block4_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block0 = /*hasChildren*/ctx[2] && create_if_block_4$3(ctx);
  const if_block_creators = [create_if_block_3$4, create_else_block$8];
  const if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*valueComponent*/ctx[3]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block2 = /*$props*/ctx[1].showLogButton && create_if_block_2$5(ctx);
  let if_block3 = /*$props*/ctx[1].showCopyButton && create_if_block_1$6(ctx);
  let if_block4 = ! /*node*/ctx[0].collapsed && /*hasChildren*/ctx[2] && create_if_block$9(ctx);
  return {
    c() {
      li = element("li");
      if (if_block0) if_block0.c();
      t0 = space();
      div0 = element("div");
      t1 = text(t1_value);
      t2 = text(":");
      t3 = space();
      div1 = element("div");
      if_block1.c();
      t4 = space();
      div2 = element("div");
      if (if_block2) if_block2.c();
      t5 = space();
      if (if_block3) if_block3.c();
      t6 = space();
      if (if_block4) if_block4.c();
      if_block4_anchor = empty();
      attr(div0, "class", "node-key svelte-ngcjq5");
      attr(div0, "role", "presentation");
      toggle_class(div0, "has-children", /*hasChildren*/ctx[2]);
      toggle_class(div0, "p-left", ! /*hasChildren*/ctx[2]);
      attr(div1, "class", "node-value svelte-ngcjq5");
      attr(div1, "data-type", div1_data_type_value = /*node*/ctx[0].type);
      attr(div1, "role", "presentation");
      toggle_class(div1, "expanded", ! /*node*/ctx[0].collapsed && /*hasChildren*/ctx[2]);
      toggle_class(div1, "has-children", /*hasChildren*/ctx[2]);
      attr(div2, "class", "buttons svelte-ngcjq5");
      attr(li, "class", "row svelte-ngcjq5");
      attr(li, "data-tree-id", li_data_tree_id_value = /*node*/ctx[0].id);
      toggle_class(li, "collapsed", /*node*/ctx[0].collapsed && /*hasChildren*/ctx[2]);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      if (if_block0) if_block0.m(li, null);
      append(li, t0);
      append(li, div0);
      append(div0, t1);
      append(div0, t2);
      append(li, t3);
      append(li, div1);
      if_blocks[current_block_type_index].m(div1, null);
      append(li, t4);
      append(li, div2);
      if (if_block2) if_block2.m(div2, null);
      append(div2, t5);
      if (if_block3) if_block3.m(div2, null);
      insert(target, t6, anchor);
      if (if_block4) if_block4.m(target, anchor);
      insert(target, if_block4_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [listen(div0, "click", /*handleToggleCollapse*/ctx[9]), listen(div1, "click", /*handleToggleCollapse*/ctx[9])];
        mounted = true;
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if ( /*hasChildren*/ctx[2]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_4$3(ctx);
          if_block0.c();
          if_block0.m(li, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if ((!current || dirty & /*node*/1) && t1_value !== (t1_value = /*node*/ctx[0].key + "")) set_data(t1, t1_value);
      if (!current || dirty & /*hasChildren*/4) {
        toggle_class(div0, "has-children", /*hasChildren*/ctx[2]);
      }
      if (!current || dirty & /*hasChildren*/4) {
        toggle_class(div0, "p-left", ! /*hasChildren*/ctx[2]);
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        } else {
          if_block1.p(ctx, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(div1, null);
      }
      if (!current || dirty & /*node*/1 && div1_data_type_value !== (div1_data_type_value = /*node*/ctx[0].type)) {
        attr(div1, "data-type", div1_data_type_value);
      }
      if (!current || dirty & /*node, hasChildren*/5) {
        toggle_class(div1, "expanded", ! /*node*/ctx[0].collapsed && /*hasChildren*/ctx[2]);
      }
      if (!current || dirty & /*hasChildren*/4) {
        toggle_class(div1, "has-children", /*hasChildren*/ctx[2]);
      }
      if ( /*$props*/ctx[1].showLogButton) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_2$5(ctx);
          if_block2.c();
          if_block2.m(div2, t5);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if ( /*$props*/ctx[1].showCopyButton) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_1$6(ctx);
          if_block3.c();
          if_block3.m(div2, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (!current || dirty & /*node*/1 && li_data_tree_id_value !== (li_data_tree_id_value = /*node*/ctx[0].id)) {
        attr(li, "data-tree-id", li_data_tree_id_value);
      }
      if (!current || dirty & /*node, hasChildren*/5) {
        toggle_class(li, "collapsed", /*node*/ctx[0].collapsed && /*hasChildren*/ctx[2]);
      }
      if (! /*node*/ctx[0].collapsed && /*hasChildren*/ctx[2]) {
        if (if_block4) {
          if_block4.p(ctx, dirty);
          if (dirty & /*node, hasChildren*/5) {
            transition_in(if_block4, 1);
          }
        } else {
          if_block4 = create_if_block$9(ctx);
          if_block4.c();
          transition_in(if_block4, 1);
          if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
        }
      } else if (if_block4) {
        group_outros();
        transition_out(if_block4, 1, 1, () => {
          if_block4 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block1);
      transition_in(if_block4);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      transition_out(if_block4);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(li);
        detach(t6);
        detach(if_block4_anchor);
      }
      if (if_block0) if_block0.d();
      if_blocks[current_block_type_index].d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      if (if_block4) if_block4.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$h($$self, $$props, $$invalidate) {
  let hasChildren;
  let props;
  let valueComponent;
  let $rootElementStore;
  let $props,
    $$unsubscribe_props = noop,
    $$subscribe_props = () => ($$unsubscribe_props(), $$unsubscribe_props = subscribe(props, $$value => $$invalidate(1, $props = $$value)), props);
  $$self.$$.on_destroy.push(() => $$unsubscribe_props());
  let {
    id
  } = $$props;
  const {
    treeStore,
    propsStore,
    rootElementStore
  } = getContext$1('svelte-tree-view');
  component_subscribe($$self, rootElementStore, value => $$invalidate(12, $rootElementStore = value));
  let node;
  treeStore.treeMap.subscribe(value => {
    const n = value.get(id);
    if (n && node !== n) {
      $$invalidate(0, node = n);
    }
  });
  function handleLogNode() {
    // eslint-disable-next-line no-console
    console.info('%c [svelte-tree-view]: Property added to window._node', 'color: #b8e248');

    // eslint-disable-next-line no-console
    console.log(node.value);
    try {
      if (typeof window !== 'undefined') window._node = node.value;
    } catch (err) {
      console.error('Failed to set _node, window was undefined');
    }
  }
  function handleCopyNodeToClipboard() {
    try {
      navigator.clipboard.writeText(JSON.stringify(node.value));
    } catch (err) {
      console.error('Copying node to clipboard failed: ', err);
    }
  }
  function handleToggleCollapse() {
    var _a;
    if (hasChildren) {
      treeStore.toggleCollapse(node.id);
    } else if (node.circularOfId) {
      treeStore.expandAllNodesToNode(node.circularOfId);
      (_a = $rootElementStore === null || $rootElementStore === void 0 ? void 0 : $rootElementStore.querySelector("li[data-tree-id=\"".concat(node.circularOfId, "\"]"))) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
    }
  }
  function valueComponentDefaultFormatter(val) {
    return propsStore.formatValue(val, node);
  }
  $$self.$$set = $$props => {
    if ('id' in $$props) $$invalidate(11, id = $$props.id);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*id*/2048) {
      {
        let found = treeStore.getNode(id);

        // Should explode rather than have logic written around undefinedness
        // as this component should be unmounted if it's undefined.
        if (!found) {
          throw Error('[svelte-tree-view] TreeViewNode.svelte received undefined node from treeMapStore whereas it should be already unmounted!');
        }
        $$invalidate(0, node = found);
      }
    }
    if ($$self.$$.dirty & /*node*/1) {
      $$invalidate(2, hasChildren = node && node.children.length > 0);
    }
    if ($$self.$$.dirty & /*$props*/2) {
      $$invalidate(3, valueComponent = $props.valueComponent);
    }
  };
  $$subscribe_props($$invalidate(4, props = propsStore.props));
  return [node, $props, hasChildren, valueComponent, props, propsStore, rootElementStore, handleLogNode, handleCopyNodeToClipboard, handleToggleCollapse, valueComponentDefaultFormatter, id];
}
class TreeViewNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$h, safe_not_equal, {
      id: 11
    }, add_css$h);
  }
}

/* ../../node_modules/.pnpm/svelte-tree-view@1.4.2_svelte@4.2.15/node_modules/svelte-tree-view/pkg/TreeView.svelte generated by Svelte v4.2.15 */
function add_css$g(target) {
  append_styles(target, "svelte-167awo5", ":root{--tree-view-font-family:'Helvetica Neue', 'Calibri Light', Roboto, sans-serif;--tree-view-font-size:13px;--tree-view-left-indent:0.875em;--tree-view-line-height:1.1;--tree-view-key-margin-right:0.5em}ul.svelte-167awo5{background:var(--tree-view-base00);font-family:var(--tree-view-font-family);font-size:var(--tree-view-font-size);height:max-content;list-style:none;margin:0;padding:0;width:max-content}");
}
function get_each_context$6(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  return child_ctx;
}

// (79:2) {#each $rootNode.children as child}
function create_each_block$6(ctx) {
  let treeviewnode;
  let current;
  treeviewnode = new TreeViewNode({
    props: {
      id: /*child*/ctx[18].id
    }
  });
  return {
    c() {
      create_component(treeviewnode.$$.fragment);
    },
    m(target, anchor) {
      mount_component(treeviewnode, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const treeviewnode_changes = {};
      if (dirty & /*$rootNode*/4) treeviewnode_changes.id = /*child*/ctx[18].id;
      treeviewnode.$set(treeviewnode_changes);
    },
    i(local) {
      if (current) return;
      transition_in(treeviewnode.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(treeviewnode.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(treeviewnode, detaching);
    }
  };
}
function create_fragment$g(ctx) {
  let ul;
  let ul_class_value;
  let current;
  let each_value = ensure_array_like( /*$rootNode*/ctx[2].children);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
  }
  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "class", ul_class_value = "" + (null_to_empty("".concat( /*$$props*/ctx[3].class || '', " svelte-tree-view")) + " svelte-167awo5"));
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }

      /*ul_binding*/
      ctx[13](ul);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (dirty & /*$rootNode*/4) {
        each_value = ensure_array_like( /*$rootNode*/ctx[2].children);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$6(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$6(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!current || dirty & /*$$props*/8 && ul_class_value !== (ul_class_value = "" + (null_to_empty("".concat( /*$$props*/ctx[3].class || '', " svelte-tree-view")) + " svelte-167awo5"))) {
        attr(ul, "class", ul_class_value);
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      destroy_each(each_blocks, detaching);
      /*ul_binding*/
      ctx[13](null);
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  let rootNode;
  let $rootNode,
    $$unsubscribe_rootNode = noop,
    $$subscribe_rootNode = () => ($$unsubscribe_rootNode(), $$unsubscribe_rootNode = subscribe(rootNode, $$value => $$invalidate(2, $rootNode = $$value)), rootNode);
  $$self.$$.on_destroy.push(() => $$unsubscribe_rootNode());
  var _a;
  let {
    data,
    theme = undefined,
    showLogButton = false,
    showCopyButton = false,
    valueComponent = undefined,
    recursionOpts = {},
    valueFormatter = undefined
  } = $$props;
  let rootElement = null;
  const defaultRecursionOpts = {
    maxDepth: 16,
    omitKeys: [],
    stopCircularRecursion: false,
    shouldExpandNode: () => false
  };
  let props = {
    showLogButton,
    showCopyButton,
    valueComponent,
    recursionOpts: {
      ...defaultRecursionOpts,
      ...recursionOpts
    },
    valueFormatter
  };
  const propsStore = createPropsStore(props);
  const rootElementStore = createRootElementStore();
  const treeStore = createTreeStore(propsStore);
  setContext$1('svelte-tree-view', {
    propsStore,
    rootElementStore,
    treeStore
  });
  onMount(() => {
    rootElementStore.set(rootElement);
  });
  function ul_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      rootElement = $$value;
      $$invalidate(0, rootElement);
    });
  }
  $$self.$$set = $$new_props => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ('data' in $$new_props) $$invalidate(4, data = $$new_props.data);
    if ('theme' in $$new_props) $$invalidate(5, theme = $$new_props.theme);
    if ('showLogButton' in $$new_props) $$invalidate(6, showLogButton = $$new_props.showLogButton);
    if ('showCopyButton' in $$new_props) $$invalidate(7, showCopyButton = $$new_props.showCopyButton);
    if ('valueComponent' in $$new_props) $$invalidate(8, valueComponent = $$new_props.valueComponent);
    if ('recursionOpts' in $$new_props) $$invalidate(9, recursionOpts = $$new_props.recursionOpts);
    if ('valueFormatter' in $$new_props) $$invalidate(10, valueFormatter = $$new_props.valueFormatter);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*showLogButton, showCopyButton, valueComponent, valueFormatter, props*/5568) {
      {
        // To keep things less messy all props are joined to one object _except_ the recursionOpts
        // which is picked from the old props. This is to allow checking between the old and new recursionOpts
        // in the recomputeTree.
        $$invalidate(12, props = {
          showLogButton,
          showCopyButton,
          valueComponent,
          valueFormatter,
          recursionOpts: props.recursionOpts
        });
      }
    }
    if ($$self.$$.dirty & /*recursionOpts, props, _a, data*/6672) {
      {
        // Combine the defaultProps with the possible new recursion opts
        const newRecursionOpts = {
          ...defaultRecursionOpts,
          ...recursionOpts
        };

        // Compare the old shouldExpandNode option with the possible new shouldExpandNode
        // to know whether to whole tree should be recomputed.
        const recomputeExpandNode = ($$invalidate(11, _a = props === null || props === void 0 ? void 0 : props.recursionOpts) === null || _a === void 0 ? void 0 : _a.shouldExpandNode) !== newRecursionOpts.shouldExpandNode;
        const oldTreeMap = get_store_value(treeStore.treeMap);
        const {
          treeMap,
          tree,
          iteratedValues
        } = recomputeTree(data, oldTreeMap, newRecursionOpts, recomputeExpandNode);
        treeStore.init(tree, treeMap, iteratedValues);
        $$invalidate(12, props.recursionOpts = newRecursionOpts, props);
        propsStore.setProps(props);
      }
    }
    if ($$self.$$.dirty & /*theme, rootElement*/33) {
      {
        if (theme && rootElement) {
          let key;
          for (key in theme) {
            // This ridiculous thing is for TypeScript type inference. Yey..?
            const value = theme[key];
            if (rootElement && key.includes('base') && value) {
              rootElement.style.setProperty("--tree-view-".concat(key), value);
            }
          }
        }
      }
    }
  };
  $$subscribe_rootNode($$invalidate(1, rootNode = treeStore.tree));
  $$props = exclude_internal_props($$props);
  return [rootElement, rootNode, $rootNode, $$props, data, theme, showLogButton, showCopyButton, valueComponent, recursionOpts, valueFormatter, _a, props, ul_binding];
}
class TreeView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$g, safe_not_equal, {
      data: 4,
      theme: 5,
      showLogButton: 6,
      showCopyButton: 7,
      valueComponent: 8,
      recursionOpts: 9,
      valueFormatter: 10
    }, add_css$g);
  }
}

/* src/tabs/SplitView.svelte generated by Svelte v4.2.15 */
function add_css$f(target) {
  append_styles(target, "svelte-fdudio", ".split-view.svelte-fdudio{border-top:1px solid rgba(255, 162, 177, 0.2);color:#fff;display:flex;height:calc(100% - var(--height-tabs-menu));width:100%}.split-view h2{color:rgb(187, 145, 163);font-family:var(--font-sans);font-size:var(--font-medium);font-weight:400;letter-spacing:1px;margin:0;text-transform:uppercase}.split-view > .left-panel{display:flex;flex-direction:column;flex-grow:1;overflow:scroll;padding:1em}.split-view > .right-panel{border-left:1px solid rgba(255, 162, 177, 0.2);display:flex;flex-direction:column;flex-grow:1;overflow:scroll;padding:1em}.split-view .hidden{visibility:hidden}");
}
const get_right_slot_changes = dirty => ({});
const get_right_slot_context = ctx => ({
  class: "right-panel"
});
const get_left_slot_changes = dirty => ({});
const get_left_slot_context = ctx => ({
  class: "left-panel"
});
function create_fragment$f(ctx) {
  let section;
  let t;
  let current;
  const left_slot_template = /*#slots*/ctx[1].left;
  const left_slot = create_slot(left_slot_template, ctx, /*$$scope*/ctx[0], get_left_slot_context);
  const right_slot_template = /*#slots*/ctx[1].right;
  const right_slot = create_slot(right_slot_template, ctx, /*$$scope*/ctx[0], get_right_slot_context);
  return {
    c() {
      section = element("section");
      if (left_slot) left_slot.c();
      t = space();
      if (right_slot) right_slot.c();
      attr(section, "class", "split-view svelte-fdudio");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (left_slot) {
        left_slot.m(section, null);
      }
      append(section, t);
      if (right_slot) {
        right_slot.m(section, null);
      }
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (left_slot) {
        if (left_slot.p && (!current || dirty & /*$$scope*/1)) {
          update_slot_base(left_slot, left_slot_template, ctx, /*$$scope*/ctx[0], !current ? get_all_dirty_from_scope( /*$$scope*/ctx[0]) : get_slot_changes(left_slot_template, /*$$scope*/ctx[0], dirty, get_left_slot_changes), get_left_slot_context);
        }
      }
      if (right_slot) {
        if (right_slot.p && (!current || dirty & /*$$scope*/1)) {
          update_slot_base(right_slot, right_slot_template, ctx, /*$$scope*/ctx[0], !current ? get_all_dirty_from_scope( /*$$scope*/ctx[0]) : get_slot_changes(right_slot_template, /*$$scope*/ctx[0], dirty, get_right_slot_changes), get_right_slot_context);
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(left_slot, local);
      transition_in(right_slot, local);
      current = true;
    },
    o(local) {
      transition_out(left_slot, local);
      transition_out(right_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (left_slot) left_slot.d(detaching);
      if (right_slot) right_slot.d(detaching);
    }
  };
}
function instance$f($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  $$self.$$set = $$props => {
    if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
  };
  return [$$scope, slots];
}
class SplitView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$f, safe_not_equal, {}, add_css$f);
  }
}

/* src/components/Button.svelte generated by Svelte v4.2.15 */
function add_css$e(target) {
  append_styles(target, "svelte-it3v6s", "button.svelte-it3v6s{background:transparent;border:0;border-radius:2px;color:#d3d3d9;cursor:pointer;font-family:var(--font-family);font-size:var(--font-small);font-weight:400;padding:6px 10px;text-transform:uppercase}button.svelte-it3v6s:hover{background:rgba(255, 162, 177, 0.4);color:#fff}button.selected.svelte-it3v6s{background:rgba(255, 162, 177, 0.4)}");
}
function create_fragment$e(ctx) {
  let button;
  let button_class_value;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = /*#slots*/ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ctx[2], null);
  return {
    c() {
      button = element("button");
      if (default_slot) default_slot.c();
      attr(button, "class", button_class_value = "" + (null_to_empty("".concat( /*$$props*/ctx[1].class || '')) + " svelte-it3v6s"));
      toggle_class(button, "selected", /*selected*/ctx[0]);
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (default_slot) {
        default_slot.m(button, null);
      }
      current = true;
      if (!mounted) {
        dispose = [listen(button, "click", /*click_handler*/ctx[4]), listen(button, "mouseover", /*mouseover_handler*/ctx[5]), listen(button, "mouseenter", /*mouseenter_handler*/ctx[6]), listen(button, "mouseleave", /*mouseleave_handler*/ctx[7]), listen(button, "focus", /*focus_handler*/ctx[8])];
        mounted = true;
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/4)) {
          update_slot_base(default_slot, default_slot_template, ctx, /*$$scope*/ctx[2], !current ? get_all_dirty_from_scope( /*$$scope*/ctx[2]) : get_slot_changes(default_slot_template, /*$$scope*/ctx[2], dirty, null), null);
        }
      }
      if (!current || dirty & /*$$props*/2 && button_class_value !== (button_class_value = "" + (null_to_empty("".concat( /*$$props*/ctx[1].class || '')) + " svelte-it3v6s"))) {
        attr(button, "class", button_class_value);
      }
      if (!current || dirty & /*$$props, selected*/3) {
        toggle_class(button, "selected", /*selected*/ctx[0]);
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  let {
    selected = false
  } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseover_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseenter_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseleave_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = $$new_props => {
    $$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ('selected' in $$new_props) $$invalidate(0, selected = $$new_props.selected);
    if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
  };
  $$props = exclude_internal_props($$props);
  return [selected, $$props, $$scope, slots, click_handler, mouseover_handler, mouseenter_handler, mouseleave_handler, focus_handler];
}
class Button extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$e, safe_not_equal, {
      selected: 0
    }, add_css$e);
  }
}

/* src/tabs/state/StateTab.svelte generated by Svelte v4.2.15 */
function add_css$d(target) {
  append_styles(target, "svelte-8c7oqn", "@charset \"UTF-8\";.top-row.svelte-8c7oqn{align-items:center;display:flex;justify-content:space-between}.left-panel[slot=left].svelte-8c7oqn{overflow:scroll}.right-panel[slot=right].svelte-8c7oqn{border-left:1px solid rgba(255, 162, 177, 0.2);flex-grow:0;min-width:200px;width:200px}.split-view .selection-btn{height:24px;width:35px}.caret-icon.svelte-8c7oqn::before{content:\"▶\"}.caret-icon.expanded.svelte-8c7oqn::before{content:\"▼\"}.no-marks.svelte-8c7oqn{color:#85d9ef;margin:0.5em 0 1.25em 1em}.split-view .tree-view{margin:0.5em 0 1.25em 0}");
}

// (53:6) <Button on:click={handleClickLogDoc}>
function create_default_slot_1$4(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (50:2) 
function create_left_slot$4(ctx) {
  let div1;
  let div0;
  let h2;
  let t1;
  let button;
  let t2;
  let treeview;
  let current;
  button = new Button({
    props: {
      $$slots: {
        default: [create_default_slot_1$4]
      },
      $$scope: {
        ctx
      }
    }
  });
  button.$on("click", /*handleClickLogDoc*/ctx[6]);
  treeview = new TreeView({
    props: {
      class: "tree-view",
      data: /*doc*/ctx[0],
      showLogButton: true,
      showCopyButton: true,
      valueFormatter: formatDocNodeValue
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h2 = element("h2");
      h2.textContent = "Current doc";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      create_component(treeview.$$.fragment);
      attr(div0, "class", "top-row svelte-8c7oqn");
      attr(div1, "slot", "left");
      attr(div1, "class", "left-panel svelte-8c7oqn");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h2);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div1, t2);
      mount_component(treeview, div1, null);
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/1024) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
      const treeview_changes = {};
      if (dirty & /*doc*/1) treeview_changes.data = /*doc*/ctx[0];
      treeview.$set(treeview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button);
      destroy_component(treeview);
    }
  };
}

// (66:6) <Button class="selection-btn" on:click={handleExpandSelection}         >
function create_default_slot$4(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      attr(span, "class", "caret-icon svelte-8c7oqn");
      toggle_class(span, "expanded", /*expandedSelection*/ctx[5]);
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*expandedSelection*/32) {
        toggle_class(span, "expanded", /*expandedSelection*/ctx[5]);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}

// (75:6) {:else}
function create_else_block$7(ctx) {
  let treeview;
  let current;
  treeview = new TreeView({
    props: {
      class: "tree-view",
      data: /*activeMarks*/ctx[2]
    }
  });
  return {
    c() {
      create_component(treeview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(treeview, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const treeview_changes = {};
      if (dirty & /*activeMarks*/4) treeview_changes.data = /*activeMarks*/ctx[2];
      treeview.$set(treeview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(treeview, detaching);
    }
  };
}

// (73:6) {#if activeMarks.length === 0}
function create_if_block$8(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "No active marks";
      attr(div, "class", "no-marks svelte-8c7oqn");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

// (63:2) 
function create_right_slot$5(ctx) {
  let div3;
  let div0;
  let h20;
  let t1;
  let button;
  let t2;
  let treeview0;
  let t3;
  let div1;
  let h21;
  let t5;
  let current_block_type_index;
  let if_block;
  let t6;
  let div2;
  let h22;
  let t8;
  let treeview1;
  let current;
  button = new Button({
    props: {
      class: "selection-btn",
      $$slots: {
        default: [create_default_slot$4]
      },
      $$scope: {
        ctx
      }
    }
  });
  button.$on("click", /*handleExpandSelection*/ctx[7]);
  treeview0 = new TreeView({
    props: {
      class: "tree-view",
      data: /*selection*/ctx[1]
    }
  });
  const if_block_creators = [create_if_block$8, create_else_block$7];
  const if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*activeMarks*/ctx[2].length === 0) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  treeview1 = new TreeView({
    props: {
      class: "tree-view",
      data: {
        nodeSize: /*nodeSize*/ctx[3],
        childCount: /*childCount*/ctx[4]
      }
    }
  });
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      h20 = element("h2");
      h20.textContent = "Selection";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      create_component(treeview0.$$.fragment);
      t3 = space();
      div1 = element("div");
      h21 = element("h2");
      h21.textContent = "Active marks";
      t5 = space();
      if_block.c();
      t6 = space();
      div2 = element("div");
      h22 = element("h2");
      h22.textContent = "Document stats";
      t8 = space();
      create_component(treeview1.$$.fragment);
      attr(div0, "class", "top-row svelte-8c7oqn");
      attr(div3, "slot", "right");
      attr(div3, "class", "right-panel svelte-8c7oqn");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, h20);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div3, t2);
      mount_component(treeview0, div3, null);
      append(div3, t3);
      append(div3, div1);
      append(div1, h21);
      append(div1, t5);
      if_blocks[current_block_type_index].m(div1, null);
      append(div3, t6);
      append(div3, div2);
      append(div2, h22);
      append(div2, t8);
      mount_component(treeview1, div2, null);
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope, expandedSelection*/1056) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
      const treeview0_changes = {};
      if (dirty & /*selection*/2) treeview0_changes.data = /*selection*/ctx[1];
      treeview0.$set(treeview0_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div1, null);
      }
      const treeview1_changes = {};
      if (dirty & /*nodeSize, childCount*/24) treeview1_changes.data = {
        nodeSize: /*nodeSize*/ctx[3],
        childCount: /*childCount*/ctx[4]
      };
      treeview1.$set(treeview1_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(treeview0.$$.fragment, local);
      transition_in(if_block);
      transition_in(treeview1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      transition_out(treeview0.$$.fragment, local);
      transition_out(if_block);
      transition_out(treeview1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      destroy_component(button);
      destroy_component(treeview0);
      if_blocks[current_block_type_index].d();
      destroy_component(treeview1);
    }
  };
}
function create_fragment$d(ctx) {
  let splitview;
  let current;
  splitview = new SplitView({
    props: {
      $$slots: {
        right: [create_right_slot$5],
        left: [create_left_slot$4]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(splitview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(splitview, target, anchor);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      const splitview_changes = {};
      if (dirty & /*$$scope, nodeSize, childCount, activeMarks, selection, expandedSelection, doc*/1087) {
        splitview_changes.$$scope = {
          dirty,
          ctx
        };
      }
      splitview.$set(splitview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(splitview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(splitview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(splitview, detaching);
    }
  };
}
function formatDocNodeValue(val, n) {
  if (n.type === 'object' && val.type) {
    return "{} ".concat(val.type);
  }
}
function instance$d($$self, $$props, $$invalidate) {
  const {
    view
  } = getContext('editor-view');
  let doc = view.state.doc.toJSON();
  let selection = createSelection(view.state.selection);
  let currentState = view.state;
  let activeMarks = [];
  let nodeSize = view.state.doc.nodeSize;
  let childCount = view.state.doc.childCount;
  let expandedSelection = false;
  latestEntry.subscribe(e => {
    if (!e) return;
    const {
      state
    } = e;
    currentState = state;
    $$invalidate(0, doc = state.doc.toJSON());
    $$invalidate(1, selection = expandedSelection ? createFullSelection(state.selection) : createSelection(state.selection));
    $$invalidate(2, activeMarks = getActiveMarks(state));
    $$invalidate(3, nodeSize = state.doc.nodeSize);
    $$invalidate(4, childCount = state.doc.childCount);
  });
  function handleClickLogDoc() {
    console.log(doc);
    window._doc = doc;
  }
  function handleExpandSelection() {
    $$invalidate(5, expandedSelection = !expandedSelection);
    if (expandedSelection) {
      $$invalidate(1, selection = createFullSelection(currentState.selection));
    } else {
      $$invalidate(1, selection = createSelection(currentState.selection));
    }
  }
  return [doc, selection, activeMarks, nodeSize, childCount, expandedSelection, handleClickLogDoc, handleExpandSelection];
}
class StateTab extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$d, safe_not_equal, {}, add_css$d);
  }
}

// function postprocessValue(value: any) {
//   if (value && value._t === 'a') {
//     const res: { [key: string]: string | string[] } = {}
//     for (const key in value) {
//       if (key !== '_t') {
//         if (key[0] === '_' && !value[key.substr(1)]) {
//           res[key.substr(1)] = value[key]
//         } else if (value['_' + key]) {
//           res[key] = [value['_' + key][0], value[key][0]]
//         } else if (!value['_' + key] && key[0] !== '_') {
//           res[key] = value[key]
//         }
//       }
//     }
//     return res
//   }
//   return value
// }
function mapSelectionDeltaChildren(_val, type, _parent) {
    if (type !== 'array')
        return;
    return [];
}
/**
 * Magic function to transform jsondiffpatch array deltas
 * https://github.com/benjamine/jsondiffpatch/blob/master/docs/deltas.md
 * https://benjamine.github.io/jsondiffpatch/demo/index.html
 */
function mapDocDeltaChildren(delta, type) {
    // So due to the way the tree-view works, it will automatically map the children of an array
    // to their own nodes. For diff deltas, however, we want to omit those children and just show
    // a value wrapped with <span> to show either deleted or inserted content
    if (type === 'array' && delta[1] === 0 && delta[2] === 0) {
        // Remove operation is defined by two 0s in its delta [{ <deleted> }, 0, 0]
        return [];
        // } else if (type === 'array' && typeof delta[0] === 'string' && typeof delta[1] === 'number' && delta[2] === 3) {
        // Move operation is almost the same as remove, except its value is empty and the second number
        // points to the moved index eg ["", 6, 3] AND the third value is always '3'
        // But since these seem to never occur (and they weren't handled in the previous version) we are not doing anything
        // with them for now.
    }
    else if (type === 'array' && typeof delta[0] === 'string' && delta[1] === 0 && delta[2] === 2) {
        // If a diff between two strings gets too long, a text diff algorithm is used which produces an array
        // with unidiff as the first value, 0 as the second and 2 as third.
        // Eg ["@@ -1,4 +1,9 @@\n-text\n+paragraph\n", 0, 2]
        return [];
    }
    else if (type === 'array' && delta.length === 1 && typeof delta[0] === 'object') {
        // Insert operations do not have indexes (it's already indexed in the array) and carry
        // only an object payload eg [{ <inserted> }]
        return [];
    }
    // The main delta objects are objects denoted by key '_t' with 'a' value which we shall omit.
    // DiffValue component handles the text diffs otherwise.
    if (type !== 'object' || delta._t !== 'a')
        return;
    // We shall remap the values to omit '_t' and remove underscores from the keys
    const transformed = [];
    for (const key in delta) {
        if (key === '_t')
            continue;
        // Remove or move operation is indicated by an underscore before the index eg '_2'
        if (key.charAt(0) === '_') {
            transformed.push([key.substr(1), delta[key]]);
        }
        else {
            transformed.push([key, delta[key]]);
        }
    }
    return transformed;
}

/* src/tabs/history/HistoryList.svelte generated by Svelte v4.2.15 */
function add_css$c(target) {
  append_styles(target, "svelte-vbjxb8", "@charset \"UTF-8\";ul.svelte-vbjxb8.svelte-vbjxb8{color:#fff;list-style:none;margin:0;padding:0;height:100%;width:100%}li.svelte-vbjxb8.svelte-vbjxb8{transition:background 0.7s ease}li.svelte-vbjxb8.svelte-vbjxb8:hover{background:rgba(255, 162, 177, 0.4);color:#fff}li.selected.svelte-vbjxb8.svelte-vbjxb8{background:rgba(255, 162, 177, 0.4)}li.svelte-vbjxb8+li.svelte-vbjxb8{border-top:1px solid rgb(96, 76, 104)}button.svelte-vbjxb8.svelte-vbjxb8{background:transparent;border:0;color:#d3d3d9;cursor:pointer;display:flex;font-family:monospace;font-size:var(--font-medium);justify-content:space-between;padding:6px 18px;text-transform:uppercase;width:100%}button.p-left.svelte-vbjxb8.svelte-vbjxb8{margin-left:1em}.caret-icon.svelte-vbjxb8.svelte-vbjxb8::before{content:\"▶\"}.caret-icon.expanded.svelte-vbjxb8.svelte-vbjxb8::before{content:\"▼\"}");
}
function get_each_context$5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  child_ctx[8] = i;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i];
  return child_ctx;
}

// (17:10) {#if group.isGroup}
function create_if_block_3$3(ctx) {
  let t0;
  let t1_value = /*group*/ctx[6].entries.length + "";
  let t1;
  let t2;
  return {
    c() {
      t0 = text("[");
      t1 = text(t1_value);
      t2 = text("]");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      insert(target, t2, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*listItems*/1 && t1_value !== (t1_value = /*group*/ctx[6].entries.length + "")) set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
      }
    }
  };
}

// (20:10) {#if group.topEntry && group.topEntry.trs.length > 1}
function create_if_block_2$4(ctx) {
  let t0;
  let t1_value = /*group*/ctx[6].topEntry.trs.length - 1 + "";
  let t1;
  return {
    c() {
      t0 = text("+");
      t1 = text(t1_value);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*listItems*/1 && t1_value !== (t1_value = /*group*/ctx[6].topEntry.trs.length - 1 + "")) set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
    }
  };
}

// (24:8) {#if group.isGroup && group.entries.length > 1}
function create_if_block_1$5(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      attr(span, "class", "caret-icon svelte-vbjxb8");
      toggle_class(span, "expanded", /*group*/ctx[6].expanded);
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*listItems*/1) {
        toggle_class(span, "expanded", /*group*/ctx[6].expanded);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}

// (29:4) {#if group.isGroup && group.expanded}
function create_if_block$7(ctx) {
  let each_blocks = [];
  let each_1_lookup = new Map();
  let each_1_anchor;
  let each_value_1 = ensure_array_like( /*group*/ctx[6].entries);
  const get_key = ctx => {
    var _ctx$;
    return /*subEntry*/(_ctx$ = ctx[9]) === null || _ctx$ === void 0 ? void 0 : _ctx$.id;
  };
  for (let i = 0; i < each_value_1.length; i += 1) {
    let child_ctx = get_each_context_1(ctx, each_value_1, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*selectedId, listItems, dispatchEvent*/7) {
        each_value_1 = ensure_array_like( /*group*/ctx[6].entries);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, each_1_anchor.parentNode, destroy_block, create_each_block_1, each_1_anchor, get_each_context_1);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
    }
  };
}

// (30:6) {#each group.entries as subEntry (subEntry?.id)}
function create_each_block_1(key_1, ctx) {
  var _ctx$2;
  let li;
  let button;
  let t0_value = /*subEntry*/((_ctx$2 = ctx[9]) === null || _ctx$2 === void 0 ? void 0 : _ctx$2.timeStr) + "";
  let t0;
  let t1;
  let mounted;
  let dispose;
  function click_handler_1() {
    return /*click_handler_1*/ctx[5]( /*subEntry*/ctx[9], /*groupIdx*/ctx[8]);
  }
  return {
    key: key_1,
    first: null,
    c() {
      var _ctx$3;
      li = element("li");
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "p-left svelte-vbjxb8");
      attr(li, "class", "svelte-vbjxb8");
      toggle_class(li, "selected", /*selectedId*/ctx[1] === ( /*subEntry*/(_ctx$3 = ctx[9]) === null || _ctx$3 === void 0 ? void 0 : _ctx$3.id));
      this.first = li;
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, button);
      append(button, t0);
      append(li, t1);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      var _ctx$4;
      ctx = new_ctx;
      if (dirty & /*listItems*/1 && t0_value !== (t0_value = /*subEntry*/((_ctx$4 = ctx[9]) === null || _ctx$4 === void 0 ? void 0 : _ctx$4.timeStr) + "")) set_data(t0, t0_value);
      if (dirty & /*selectedId, listItems*/3) {
        var _ctx$5;
        toggle_class(li, "selected", /*selectedId*/ctx[1] === ( /*subEntry*/(_ctx$5 = ctx[9]) === null || _ctx$5 === void 0 ? void 0 : _ctx$5.id));
      }
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      mounted = false;
      dispose();
    }
  };
}

// (7:2) {#each listItems as group, groupIdx (group.id)}
function create_each_block$5(key_1, ctx) {
  var _ctx$6;
  let li;
  let button;
  let span;
  let t0_value = /*group*/((_ctx$6 = ctx[6]) === null || _ctx$6 === void 0 || (_ctx$6 = _ctx$6.topEntry) === null || _ctx$6 === void 0 ? void 0 : _ctx$6.timeStr) + "";
  let t0;
  let t1;
  let t2;
  let t3;
  let t4;
  let if_block3_anchor;
  let mounted;
  let dispose;
  let if_block0 = /*group*/ctx[6].isGroup && create_if_block_3$3(ctx);
  let if_block1 = /*group*/ctx[6].topEntry && /*group*/ctx[6].topEntry.trs.length > 1 && create_if_block_2$4(ctx);
  let if_block2 = /*group*/ctx[6].isGroup && /*group*/ctx[6].entries.length > 1 && create_if_block_1$5(ctx);
  function click_handler() {
    return /*click_handler*/ctx[3]( /*group*/ctx[6], /*groupIdx*/ctx[8]);
  }
  function dblclick_handler() {
    return /*dblclick_handler*/ctx[4]( /*group*/ctx[6]);
  }
  let if_block3 = /*group*/ctx[6].isGroup && /*group*/ctx[6].expanded && create_if_block$7(ctx);
  return {
    key: key_1,
    first: null,
    c() {
      var _ctx$7;
      li = element("li");
      button = element("button");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      if (if_block2) if_block2.c();
      t4 = space();
      if (if_block3) if_block3.c();
      if_block3_anchor = empty();
      attr(button, "class", "svelte-vbjxb8");
      toggle_class(button, "is-group", /*group*/ctx[6].isGroup);
      attr(li, "class", "svelte-vbjxb8");
      toggle_class(li, "selected", ! /*group*/ctx[6].expanded && /*selectedId*/ctx[1] === ( /*group*/(_ctx$7 = ctx[6]) === null || _ctx$7 === void 0 || (_ctx$7 = _ctx$7.topEntry) === null || _ctx$7 === void 0 ? void 0 : _ctx$7.id));
      this.first = li;
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, button);
      append(button, span);
      append(span, t0);
      append(span, t1);
      if (if_block0) if_block0.m(span, null);
      append(span, t2);
      if (if_block1) if_block1.m(span, null);
      append(button, t3);
      if (if_block2) if_block2.m(button, null);
      insert(target, t4, anchor);
      if (if_block3) if_block3.m(target, anchor);
      insert(target, if_block3_anchor, anchor);
      if (!mounted) {
        dispose = [listen(button, "click", click_handler), listen(button, "dblclick", dblclick_handler)];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      var _ctx$8;
      ctx = new_ctx;
      if (dirty & /*listItems*/1 && t0_value !== (t0_value = /*group*/((_ctx$8 = ctx[6]) === null || _ctx$8 === void 0 || (_ctx$8 = _ctx$8.topEntry) === null || _ctx$8 === void 0 ? void 0 : _ctx$8.timeStr) + "")) set_data(t0, t0_value);
      if ( /*group*/ctx[6].isGroup) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3$3(ctx);
          if_block0.c();
          if_block0.m(span, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if ( /*group*/ctx[6].topEntry && /*group*/ctx[6].topEntry.trs.length > 1) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$4(ctx);
          if_block1.c();
          if_block1.m(span, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if ( /*group*/ctx[6].isGroup && /*group*/ctx[6].entries.length > 1) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_1$5(ctx);
          if_block2.c();
          if_block2.m(button, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty & /*listItems*/1) {
        toggle_class(button, "is-group", /*group*/ctx[6].isGroup);
      }
      if (dirty & /*listItems, selectedId*/3) {
        var _ctx$9;
        toggle_class(li, "selected", ! /*group*/ctx[6].expanded && /*selectedId*/ctx[1] === ( /*group*/(_ctx$9 = ctx[6]) === null || _ctx$9 === void 0 || (_ctx$9 = _ctx$9.topEntry) === null || _ctx$9 === void 0 ? void 0 : _ctx$9.id));
      }
      if ( /*group*/ctx[6].isGroup && /*group*/ctx[6].expanded) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block$7(ctx);
          if_block3.c();
          if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(li);
        detach(t4);
        detach(if_block3_anchor);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$c(ctx) {
  let ul;
  let each_blocks = [];
  let each_1_lookup = new Map();
  let each_value = ensure_array_like( /*listItems*/ctx[0]);
  const get_key = ctx => /*group*/ctx[6].id;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$5(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$5(key, child_ctx));
  }
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "class", "svelte-vbjxb8");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (dirty & /*listItems, selectedId, dispatchEvent*/7) {
        each_value = ensure_array_like( /*listItems*/ctx[0]);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul, destroy_block, create_each_block$5, null, get_each_context$5);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function instance$c($$self, $$props, $$invalidate) {
  let {
    listItems = [],
    selectedId
  } = $$props;
  const dispatchEvent = createEventDispatcher();
  const click_handler = (group, groupIdx) => {
    var _group$topEntry;
    return dispatchEvent('click-item', {
      id: group === null || group === void 0 || (_group$topEntry = group.topEntry) === null || _group$topEntry === void 0 ? void 0 : _group$topEntry.id,
      groupIdx,
      wasTopNode: true
    });
  };
  const dblclick_handler = group => {
    var _group$topEntry2;
    return dispatchEvent('dblclick-item', {
      id: group === null || group === void 0 || (_group$topEntry2 = group.topEntry) === null || _group$topEntry2 === void 0 ? void 0 : _group$topEntry2.id
    });
  };
  const click_handler_1 = (subEntry, groupIdx) => dispatchEvent('click-item', {
    id: subEntry === null || subEntry === void 0 ? void 0 : subEntry.id,
    groupIdx,
    wasTopNode: false
  });
  $$self.$$set = $$props => {
    if ('listItems' in $$props) $$invalidate(0, listItems = $$props.listItems);
    if ('selectedId' in $$props) $$invalidate(1, selectedId = $$props.selectedId);
  };
  return [listItems, selectedId, dispatchEvent, click_handler, dblclick_handler, click_handler_1];
}
class HistoryList extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$c, safe_not_equal, {
      listItems: 0,
      selectedId: 1
    }, add_css$c);
  }
}

/* src/tabs/history/DiffValue.svelte generated by Svelte v4.2.15 */
function add_css$b(target) {
  append_styles(target, "svelte-1a1oqej", ".added.svelte-1a1oqej.svelte-1a1oqej{display:inline-block;background:#87cc86;border-radius:1px;color:green;padding:1px 2px;text-indent:0;min-height:1ex}.deleted.svelte-1a1oqej.svelte-1a1oqej{display:inline-block;background:#d66363;border-radius:1px;color:#222;padding:1px 2px;text-decoration:line-through;text-indent:0;min-height:1ex}.updated.svelte-1a1oqej.svelte-1a1oqej{word-break:break-all}.updated.svelte-1a1oqej .added.svelte-1a1oqej{background:#eaea37}.arrow.svelte-1a1oqej.svelte-1a1oqej{color:#87cc86}");
}
function get_each_context$4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}

// (56:0) {:else}
function create_else_block_1$1(ctx) {
  let t_value = /*defaultFormatter*/ctx[0]( /*value*/ctx[1]) + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*defaultFormatter, value*/3 && t_value !== (t_value = /*defaultFormatter*/ctx[0]( /*value*/ctx[1]) + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (31:0) {#if Array.isArray(value)}
function create_if_block$6(ctx) {
  let if_block_anchor;
  function select_block_type_1(ctx, dirty) {
    if ( /*value*/ctx[1].length === 1) return create_if_block_1$4;
    if ( /*value*/ctx[1].length === 2) return create_if_block_2$3;
    if ( /*value*/ctx[1].length === 3 && /*value*/ctx[1][1] === 0 && /*value*/ctx[1][2] === 0) return create_if_block_3$2;
    if ( /*value*/ctx[1].length === 3 && /*value*/ctx[1][2] === 2) return create_if_block_4$2;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if (if_block) if_block.d(1);
        if_block = current_block_type && current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) {
        if_block.d(detaching);
      }
    }
  };
}

// (43:49) 
function create_if_block_4$2(ctx) {
  let span;
  let each_value = ensure_array_like(parseTextDiff( /*value*/ctx[1][0]));
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }
  return {
    c() {
      span = element("span");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span, "class", "updated svelte-1a1oqej");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(span, null);
        }
      }
    },
    p(ctx, dirty) {
      if (dirty & /*parseTextDiff, value*/2) {
        each_value = ensure_array_like(parseTextDiff( /*value*/ctx[1][0]));
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$4(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$4(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(span, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}

// (41:67) 
function create_if_block_3$2(ctx) {
  let span;
  let t_value = getValueString( /*value*/ctx[1][0]) + "";
  let t;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      attr(span, "class", "deleted svelte-1a1oqej");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx, dirty) {
      if (dirty & /*value*/2 && t_value !== (t_value = getValueString( /*value*/ctx[1][0]) + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}

// (35:31) 
function create_if_block_2$3(ctx) {
  let span3;
  let span0;
  let t0_value = getValueString( /*value*/ctx[1][0]) + "";
  let t0;
  let t1;
  let span1;
  let t3;
  let span2;
  let t4_value = getValueString( /*value*/ctx[1][1]) + "";
  let t4;
  return {
    c() {
      span3 = element("span");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = space();
      span1 = element("span");
      span1.textContent = "=>";
      t3 = space();
      span2 = element("span");
      t4 = text(t4_value);
      attr(span0, "class", "deleted svelte-1a1oqej");
      attr(span1, "class", "arrow svelte-1a1oqej");
      attr(span2, "class", "added svelte-1a1oqej");
      attr(span3, "class", "updated svelte-1a1oqej");
    },
    m(target, anchor) {
      insert(target, span3, anchor);
      append(span3, span0);
      append(span0, t0);
      append(span3, t1);
      append(span3, span1);
      append(span3, t3);
      append(span3, span2);
      append(span2, t4);
    },
    p(ctx, dirty) {
      if (dirty & /*value*/2 && t0_value !== (t0_value = getValueString( /*value*/ctx[1][0]) + "")) set_data(t0, t0_value);
      if (dirty & /*value*/2 && t4_value !== (t4_value = getValueString( /*value*/ctx[1][1]) + "")) set_data(t4, t4_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span3);
      }
    }
  };
}

// (33:2) {#if value.length === 1}
function create_if_block_1$4(ctx) {
  let span;
  let t_value = getValueString( /*value*/ctx[1][0]) + "";
  let t;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      attr(span, "class", "added svelte-1a1oqej");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx, dirty) {
      if (dirty & /*value*/2 && t_value !== (t_value = getValueString( /*value*/ctx[1][0]) + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}

// (50:8) {:else}
function create_else_block$6(ctx) {
  let span;
  let t_value = /*item*/ctx[3].raw + "";
  let t;
  return {
    c() {
      span = element("span");
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx, dirty) {
      if (dirty & /*value*/2 && t_value !== (t_value = /*item*/ctx[3].raw + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}

// (48:27) 
function create_if_block_6(ctx) {
  let span;
  let t_value = /*item*/ctx[3].add + "";
  let t;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      attr(span, "class", "added svelte-1a1oqej");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx, dirty) {
      if (dirty & /*value*/2 && t_value !== (t_value = /*item*/ctx[3].add + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}

// (46:8) {#if item.delete}
function create_if_block_5$2(ctx) {
  let span;
  let t_value = /*item*/ctx[3].delete + "";
  let t;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      attr(span, "class", "deleted svelte-1a1oqej");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx, dirty) {
      if (dirty & /*value*/2 && t_value !== (t_value = /*item*/ctx[3].delete + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}

// (45:6) {#each parseTextDiff(value[0]) as item}
function create_each_block$4(ctx) {
  let if_block_anchor;
  function select_block_type_2(ctx, dirty) {
    if ( /*item*/ctx[3].delete) return create_if_block_5$2;
    if ( /*item*/ctx[3].add) return create_if_block_6;
    return create_else_block$6;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_block.d(detaching);
    }
  };
}
function create_fragment$b(ctx) {
  let show_if;
  let if_block_anchor;
  function select_block_type(ctx, dirty) {
    if (dirty & /*value*/2) show_if = null;
    if (show_if == null) show_if = !!Array.isArray( /*value*/ctx[1]);
    if (show_if) return create_if_block$6;
    return create_else_block_1$1;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_block.d(detaching);
    }
  };
}
function replaceSpacesWithNonBreakingSpace(str) {
  return str.replace(/\s/gm, ' ');
}
function parseTextDiff(textDiff) {
  const diffByLines = textDiff.split(/\n/gm).slice(1);
  return diffByLines.map(line => {
    const type = line.startsWith('-') ? 'delete' : line.startsWith('+') ? 'add' : 'raw';
    return {
      [type]: replaceSpacesWithNonBreakingSpace(line.slice(1))
    };
  });
}
function stringifyAndShrink(v) {
  if (v === null) {
    return 'null';
  }
  const str = JSON.stringify(v);
  if (typeof str === 'undefined') {
    return 'undefined';
  }
  return str.length > 22 ? "".concat(str.slice(0, 15), "\u2026").concat(str.slice(-5)) : str;
}
function getValueString(raw) {
  if (typeof raw === 'string') {
    return raw;
  }
  return stringifyAndShrink(raw);
}
function instance$b($$self, $$props, $$invalidate) {
  let value;
  let {
    node,
    defaultFormatter
  } = $$props;
  $$self.$$set = $$props => {
    if ('node' in $$props) $$invalidate(2, node = $$props.node);
    if ('defaultFormatter' in $$props) $$invalidate(0, defaultFormatter = $$props.defaultFormatter);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*node*/4) {
      $$invalidate(1, value = node.value);
    }
  };
  return [defaultFormatter, value, node];
}
class DiffValue extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, safe_not_equal, {
      node: 2,
      defaultFormatter: 0
    }, add_css$b);
  }
}

/* src/tabs/history/HistoryTab.svelte generated by Svelte v4.2.15 */
function add_css$a(target) {
  append_styles(target, "svelte-r7zw98", ".left-panel.svelte-r7zw98.svelte-r7zw98{flex-grow:0;padding:0;min-width:190px;width:190px}.title-container.svelte-r7zw98.svelte-r7zw98{align-items:center;display:flex}.transaction-buttons.svelte-r7zw98.svelte-r7zw98{margin-left:2rem}.entry-row.svelte-r7zw98+.entry-row.svelte-r7zw98{margin-top:1em}.selection-html.svelte-r7zw98.svelte-r7zw98{font-weight:100;margin:0.5em 0 0 0;padding:0}.equal-diff.svelte-r7zw98.svelte-r7zw98{align-items:center;color:rgb(255, 162, 177);display:flex;font-size:14px;height:100%;justify-content:center;width:100%}");
}
function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
}

// (67:2) 
function create_left_slot$3(ctx) {
  var _ctx$;
  let div;
  let historylist;
  let current;
  historylist = new HistoryList({
    props: {
      listItems: /*listItems*/ctx[4],
      selectedId: /*selectedEntry*/((_ctx$ = ctx[0]) === null || _ctx$ === void 0 ? void 0 : _ctx$.id) || ''
    }
  });
  historylist.$on("click-item", /*handleEntrySelect*/ctx[7]);
  historylist.$on("dblclick-item", /*handleEntryDblClick*/ctx[8]);
  return {
    c() {
      div = element("div");
      create_component(historylist.$$.fragment);
      attr(div, "slot", "left");
      attr(div, "class", "left-panel svelte-r7zw98");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(historylist, div, null);
      current = true;
    },
    p(ctx, dirty) {
      var _ctx$2;
      const historylist_changes = {};
      if (dirty & /*listItems*/16) historylist_changes.listItems = /*listItems*/ctx[4];
      if (dirty & /*selectedEntry*/1) historylist_changes.selectedId = /*selectedEntry*/((_ctx$2 = ctx[0]) === null || _ctx$2 === void 0 ? void 0 : _ctx$2.id) || '';
      historylist.$set(historylist_changes);
    },
    i(local) {
      if (current) return;
      transition_in(historylist.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(historylist.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(historylist);
    }
  };
}

// (152:4) {:else}
function create_else_block$5(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "Docs are equal.";
      attr(div, "class", "equal-diff svelte-r7zw98");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

// (76:4) {#if selectedEntry}
function create_if_block$5(ctx) {
  let div3;
  let t0;
  let t1;
  let t2;
  let div2;
  let div1;
  let h2;
  let t4;
  let div0;
  let t5;
  let button;
  let t6;
  let current;
  let if_block0 = /*selectedEntry*/ctx[0].contentDiff && create_if_block_5$1(ctx);
  let if_block1 = /*selectedEntry*/ctx[0].selectionDiff && create_if_block_4$1(ctx);
  let if_block2 = /*selectedEntry*/ctx[0].selectionHtml.length > 0 && create_if_block_3$1(ctx);
  let if_block3 = /*showTr*/ctx[1] && create_if_block_2$2(ctx);
  button = new Button({
    props: {
      $$slots: {
        default: [create_default_slot$3]
      },
      $$scope: {
        ctx
      }
    }
  });
  button.$on("click", /*toggleShowTr*/ctx[5]);
  let if_block4 = /*showTr*/ctx[1] && create_if_block_1$3(ctx);
  return {
    c() {
      div3 = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      t2 = space();
      div2 = element("div");
      div1 = element("div");
      h2 = element("h2");
      h2.textContent = "Transactions";
      t4 = space();
      div0 = element("div");
      if (if_block3) if_block3.c();
      t5 = space();
      create_component(button.$$.fragment);
      t6 = space();
      if (if_block4) if_block4.c();
      attr(div0, "class", "transaction-buttons svelte-r7zw98");
      attr(div1, "class", "title-container svelte-r7zw98");
      attr(div2, "class", "entry-row svelte-r7zw98");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      if (if_block0) if_block0.m(div3, null);
      append(div3, t0);
      if (if_block1) if_block1.m(div3, null);
      append(div3, t1);
      if (if_block2) if_block2.m(div3, null);
      append(div3, t2);
      append(div3, div2);
      append(div2, div1);
      append(div1, h2);
      append(div1, t4);
      append(div1, div0);
      if (if_block3) if_block3.m(div0, null);
      append(div0, t5);
      mount_component(button, div0, null);
      append(div2, t6);
      if (if_block4) if_block4.m(div2, null);
      current = true;
    },
    p(ctx, dirty) {
      if ( /*selectedEntry*/ctx[0].contentDiff) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*selectedEntry*/1) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_5$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div3, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if ( /*selectedEntry*/ctx[0].selectionDiff) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*selectedEntry*/1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_4$1(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div3, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if ( /*selectedEntry*/ctx[0].selectionHtml.length > 0) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
          if (dirty & /*selectedEntry*/1) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_3$1(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div3, t2);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if ( /*showTr*/ctx[1]) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
          if (dirty & /*showTr*/2) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block_2$2(ctx);
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(div0, t5);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
      const button_changes = {};
      if (dirty & /*$$scope, showTr*/65538) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
      if ( /*showTr*/ctx[1]) {
        if (if_block4) {
          if_block4.p(ctx, dirty);
          if (dirty & /*showTr*/2) {
            transition_in(if_block4, 1);
          }
        } else {
          if_block4 = create_if_block_1$3(ctx);
          if_block4.c();
          transition_in(if_block4, 1);
          if_block4.m(div2, null);
        }
      } else if (if_block4) {
        group_outros();
        transition_out(if_block4, 1, 1, () => {
          if_block4 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(if_block3);
      transition_in(button.$$.fragment, local);
      transition_in(if_block4);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(if_block3);
      transition_out(button.$$.fragment, local);
      transition_out(if_block4);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      destroy_component(button);
      if (if_block4) if_block4.d();
    }
  };
}

// (78:8) {#if selectedEntry.contentDiff}
function create_if_block_5$1(ctx) {
  let div1;
  let div0;
  let h2;
  let t1;
  let button;
  let t2;
  let treeview;
  let current;
  button = new Button({
    props: {
      class: "hidden",
      $$slots: {
        default: [create_default_slot_5]
      },
      $$scope: {
        ctx
      }
    }
  });
  treeview = new TreeView({
    props: {
      class: "tree-view",
      data: /*selectedEntry*/ctx[0].contentDiff,
      showLogButton: true,
      showCopyButton: true,
      valueComponent: DiffValue,
      recursionOpts: {
        maxDepth: 12,
        mapChildren: mapDocDeltaChildren,
        shouldExpandNode: func$1
      }
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h2 = element("h2");
      h2.textContent = "Doc diff";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      create_component(treeview.$$.fragment);
      attr(div0, "class", "title-container svelte-r7zw98");
      attr(div1, "class", "entry-row svelte-r7zw98");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h2);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div1, t2);
      mount_component(treeview, div1, null);
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/65536) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
      const treeview_changes = {};
      if (dirty & /*selectedEntry*/1) treeview_changes.data = /*selectedEntry*/ctx[0].contentDiff;
      treeview.$set(treeview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button);
      destroy_component(treeview);
    }
  };
}

// (82:14) <Button class="hidden">
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (98:8) {#if selectedEntry.selectionDiff}
function create_if_block_4$1(ctx) {
  let div1;
  let div0;
  let h2;
  let t1;
  let button;
  let t2;
  let treeview;
  let current;
  button = new Button({
    props: {
      class: "hidden",
      $$slots: {
        default: [create_default_slot_4]
      },
      $$scope: {
        ctx
      }
    }
  });
  treeview = new TreeView({
    props: {
      class: "tree-view",
      data: /*selectedEntry*/ctx[0].selectionDiff,
      valueComponent: DiffValue,
      recursionOpts: {
        mapChildren: mapSelectionDeltaChildren,
        shouldExpandNode: func_1
      }
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h2 = element("h2");
      h2.textContent = "Selection diff";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      create_component(treeview.$$.fragment);
      attr(div0, "class", "title-container svelte-r7zw98");
      attr(div1, "class", "entry-row svelte-r7zw98");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h2);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div1, t2);
      mount_component(treeview, div1, null);
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/65536) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
      const treeview_changes = {};
      if (dirty & /*selectedEntry*/1) treeview_changes.data = /*selectedEntry*/ctx[0].selectionDiff;
      treeview.$set(treeview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button);
      destroy_component(treeview);
    }
  };
}

// (102:14) <Button class="hidden">
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (115:8) {#if selectedEntry.selectionHtml.length > 0}
function create_if_block_3$1(ctx) {
  let div1;
  let div0;
  let h2;
  let t1;
  let button;
  let t2;
  let pre;
  let code;
  let raw_value = /*selectedEntry*/ctx[0].selectionHtml + "";
  let current;
  button = new Button({
    props: {
      class: "hidden",
      $$slots: {
        default: [create_default_slot_3]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h2 = element("h2");
      h2.textContent = "Selection content";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      pre = element("pre");
      code = element("code");
      attr(div0, "class", "title-container svelte-r7zw98");
      attr(pre, "class", "selection-html svelte-r7zw98");
      attr(div1, "class", "entry-row svelte-r7zw98");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h2);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div1, t2);
      append(div1, pre);
      append(pre, code);
      code.innerHTML = raw_value;
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/65536) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
      if ((!current || dirty & /*selectedEntry*/1) && raw_value !== (raw_value = /*selectedEntry*/ctx[0].selectionHtml + "")) code.innerHTML = raw_value;
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button);
    }
  };
}

// (119:14) <Button class="hidden">
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (128:14) {#if showTr}
function create_if_block_2$2(ctx) {
  let button0;
  let t;
  let button1;
  let current;
  button0 = new Button({
    props: {
      $$slots: {
        default: [create_default_slot_2]
      },
      $$scope: {
        ctx
      }
    }
  });
  button0.$on("click", /*handleToggleExpandTrTreeView*/ctx[9]);
  button1 = new Button({
    props: {
      $$slots: {
        default: [create_default_slot_1$3]
      },
      $$scope: {
        ctx
      }
    }
  });
  button1.$on("click", /*handleLogTr*/ctx[6]);
  return {
    c() {
      create_component(button0.$$.fragment);
      t = space();
      create_component(button1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(button0, target, anchor);
      insert(target, t, anchor);
      mount_component(button1, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const button0_changes = {};
      if (dirty & /*$$scope, expandTrTreeView*/65540) {
        button0_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty & /*$$scope*/65536) {
        button1_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button1.$set(button1_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button0.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(button0, detaching);
      destroy_component(button1, detaching);
    }
  };
}

// (129:16) <Button on:click={handleToggleExpandTrTreeView}>
function create_default_slot_2(ctx) {
  let t_value = ( /*expandTrTreeView*/ctx[2] ? 'collapse' : 'expand') + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*expandTrTreeView*/4 && t_value !== (t_value = ( /*expandTrTreeView*/ctx[2] ? 'collapse' : 'expand') + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (132:16) <Button on:click={handleLogTr}>
function create_default_slot_1$3(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (134:14) <Button on:click={toggleShowTr}>
function create_default_slot$3(ctx) {
  let t_value = ( /*showTr*/ctx[1] ? 'hide' : 'show') + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*showTr*/2 && t_value !== (t_value = ( /*showTr*/ctx[1] ? 'hide' : 'show') + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (139:10) {#if showTr}
function create_if_block_1$3(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like( /*selectedEntry*/ctx[0].trs);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }
  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx, dirty) {
      if (dirty & /*selectedEntry, transactionRecursionOpts*/9) {
        each_value = ensure_array_like( /*selectedEntry*/ctx[0].trs);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$3(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$3(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}

// (140:12) {#each selectedEntry.trs as tr}
function create_each_block$3(ctx) {
  let treeview;
  let current;
  treeview = new TreeView({
    props: {
      class: "tree-view",
      data: /*tr*/ctx[13],
      showLogButton: true,
      showCopyButton: true,
      recursionOpts: /*transactionRecursionOpts*/ctx[3]
    }
  });
  return {
    c() {
      create_component(treeview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(treeview, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const treeview_changes = {};
      if (dirty & /*selectedEntry*/1) treeview_changes.data = /*tr*/ctx[13];
      if (dirty & /*transactionRecursionOpts*/8) treeview_changes.recursionOpts = /*transactionRecursionOpts*/ctx[3];
      treeview.$set(treeview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(treeview, detaching);
    }
  };
}

// (75:2) 
function create_right_slot$4(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block$5, create_else_block$5];
  const if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*selectedEntry*/ctx[0]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "slot", "right");
      attr(div, "class", "right-panel");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_blocks[current_block_type_index].d();
    }
  };
}
function create_fragment$a(ctx) {
  let splitview;
  let current;
  splitview = new SplitView({
    props: {
      $$slots: {
        right: [create_right_slot$4],
        left: [create_left_slot$3]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(splitview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(splitview, target, anchor);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      const splitview_changes = {};
      if (dirty & /*$$scope, selectedEntry, transactionRecursionOpts, showTr, expandTrTreeView, listItems*/65567) {
        splitview_changes.$$scope = {
          dirty,
          ctx
        };
      }
      splitview.$set(splitview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(splitview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(splitview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(splitview, detaching);
    }
  };
}
const func$1 = () => true;
const func_1 = () => true;
function instance$a($$self, $$props, $$invalidate) {
  let listItems;
  let $stateHistory;
  let $shownHistoryGroups;
  component_subscribe($$self, stateHistory, $$value => $$invalidate(10, $stateHistory = $$value));
  component_subscribe($$self, shownHistoryGroups, $$value => $$invalidate(11, $shownHistoryGroups = $$value));
  let selectedEntry = undefined,
    showTr = false;
  const {
    replaceEditorContent
  } = getContext('editor-view');
  let expandTrTreeView = false;
  let transactionRecursionOpts = {
    maxDepth: 24,
    stopCircularRecursion: true,
    omitKeys: ['schema'],
    shouldExpandNode: () => expandTrTreeView
  };
  latestEntry.subscribe(v => {
    if (v) $$invalidate(0, selectedEntry = v);
  });
  function toggleShowTr() {
    $$invalidate(1, showTr = !showTr);
  }
  function handleLogTr() {
    console.info('%c [prosemirror-dev-toolkit]: Property added to window._trs', 'color: #b8e248');
    console.log(selectedEntry === null || selectedEntry === void 0 ? void 0 : selectedEntry.trs);
    window._trs = selectedEntry === null || selectedEntry === void 0 ? void 0 : selectedEntry.trs;
  }

  /**
  * Handles the clicks of the history entries.
  *
  * Sets the clicked entry as the selectedEntry but in the case of topNode, meaning
  * in a selection group (shown with [x] number) the entry has a sublist of entries
  * where the previous is duplicated as the first entry. Therefore on expanding the group
  * selecting the first sub-entry, otherwise collapsing but still keeping the topNode selected.
  * Kinda confusing but eh.
  */
  function handleEntrySelect(e) {
    const {
      id = '',
      groupIdx,
      wasTopNode
    } = e.detail;
    $$invalidate(0, selectedEntry = $stateHistory.get(id));
    if (!selectedEntry) return;
    const group = listItems[groupIdx];
    if (group.isGroup && group.entries.length > 1 && wasTopNode) {
      shownHistoryGroups.update(val => val.map((g, idx) => idx !== groupIdx ? g : Object.assign(Object.assign({}, g), {
        expanded: !g.expanded
      })));
    }
  }
  function handleEntryDblClick(e) {
    $$invalidate(0, selectedEntry = $stateHistory.get(e.detail.id || ''));
    selectedEntry && replaceEditorContent(selectedEntry.state);
  }
  function handleToggleExpandTrTreeView() {
    $$invalidate(2, expandTrTreeView = !expandTrTreeView);
    $$invalidate(3, transactionRecursionOpts = Object.assign(Object.assign({}, transactionRecursionOpts), {
      shouldExpandNode: () => expandTrTreeView
    }));
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$shownHistoryGroups, $stateHistory*/3072) {
      $$invalidate(4, listItems = $shownHistoryGroups.map(g => ({
        id: g.id,
        isGroup: g.isGroup,
        topEntry: $stateHistory.get(g.topEntryId),
        entries: g.entryIds.map(id => $stateHistory.get(id)),
        expanded: g.expanded
      })));
    }
  };
  return [selectedEntry, showTr, expandTrTreeView, transactionRecursionOpts, listItems, toggleShowTr, handleLogTr, handleEntrySelect, handleEntryDblClick, handleToggleExpandTrTreeView, $stateHistory, $shownHistoryGroups];
}
class HistoryTab extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, {}, add_css$a);
  }
}

/* src/tabs/List.svelte generated by Svelte v4.2.15 */
function add_css$9(target) {
  append_styles(target, "svelte-1fq2hhi", "ul.svelte-1fq2hhi.svelte-1fq2hhi{color:#fff;list-style:none;margin:0;padding:0;height:100%;width:100%}li.svelte-1fq2hhi+li.svelte-1fq2hhi{border-top:1px solid rgb(96, 76, 104)}button.svelte-1fq2hhi.svelte-1fq2hhi{background:transparent;border:0;color:#d3d3d9;cursor:pointer;display:flex;font-family:monospace;font-size:var(--font-medium);font-weight:100;padding:6px 18px;text-transform:uppercase;width:100%}button.svelte-1fq2hhi.svelte-1fq2hhi:hover{background:rgba(255, 162, 177, 0.4);color:#fff}button:hover.empty.svelte-1fq2hhi.svelte-1fq2hhi{background:rgb(80, 68, 93)}button.selected.svelte-1fq2hhi.svelte-1fq2hhi{background:rgba(255, 162, 177, 0.4)}button.selected.empty.svelte-1fq2hhi.svelte-1fq2hhi{background:rgb(80, 68, 93)}button.empty.svelte-1fq2hhi.svelte-1fq2hhi{color:#727288}");
}
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
}

// (5:2) {#each listItems as item}
function create_each_block$2(ctx) {
  let li;
  let button;
  let t0_value = /*item*/ctx[4].value + "";
  let t0;
  let t1;
  let mounted;
  let dispose;
  function click_handler() {
    return /*click_handler*/ctx[3]( /*item*/ctx[4]);
  }
  return {
    c() {
      li = element("li");
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "svelte-1fq2hhi");
      toggle_class(button, "selected", /*selectedKey*/ctx[1] === /*item*/ctx[4].key);
      toggle_class(button, "empty", /*item*/ctx[4].empty);
      attr(li, "class", "svelte-1fq2hhi");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, button);
      append(button, t0);
      append(li, t1);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*listItems*/1 && t0_value !== (t0_value = /*item*/ctx[4].value + "")) set_data(t0, t0_value);
      if (dirty & /*selectedKey, listItems*/3) {
        toggle_class(button, "selected", /*selectedKey*/ctx[1] === /*item*/ctx[4].key);
      }
      if (dirty & /*listItems*/1) {
        toggle_class(button, "empty", /*item*/ctx[4].empty);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$9(ctx) {
  let ul;
  let each_value = ensure_array_like( /*listItems*/ctx[0]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "class", "svelte-1fq2hhi");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (dirty & /*selectedKey, listItems, onSelect*/7) {
        each_value = ensure_array_like( /*listItems*/ctx[0]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  let {
    listItems = [],
    selectedKey,
    onSelect
  } = $$props;
  const click_handler = item => onSelect(item);
  $$self.$$set = $$props => {
    if ('listItems' in $$props) $$invalidate(0, listItems = $$props.listItems);
    if ('selectedKey' in $$props) $$invalidate(1, selectedKey = $$props.selectedKey);
    if ('onSelect' in $$props) $$invalidate(2, onSelect = $$props.onSelect);
  };
  return [listItems, selectedKey, onSelect, click_handler];
}
class List extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, {
      listItems: 0,
      selectedKey: 1,
      onSelect: 2
    }, add_css$9);
  }
}

/* src/tabs/PluginsTab.svelte generated by Svelte v4.2.15 */
function add_css$8(target) {
  append_styles(target, "svelte-9l897d", ".top-row.svelte-9l897d{align-items:center;display:flex;justify-content:space-between;margin-bottom:0.5em}.left-panel[slot=left].svelte-9l897d{flex-grow:0;overflow:scroll;padding:0;min-width:190px;width:190px}.right-panel[slot=right].svelte-9l897d{border-left:1px solid rgba(255, 162, 177, 0.2)}.empty-state.svelte-9l897d{align-items:center;color:rgb(255, 162, 177);display:flex;font-size:14px;height:100%;justify-content:center;width:100%}");
}

// (49:2) 
function create_left_slot$2(ctx) {
  var _ctx$;
  let div;
  let list;
  let current;
  list = new List({
    props: {
      listItems: /*listItems*/ctx[4],
      selectedKey: /*selectedPlugin*/(_ctx$ = ctx[0]) === null || _ctx$ === void 0 ? void 0 : _ctx$.key,
      onSelect: /*handlePluginSelect*/ctx[5]
    }
  });
  return {
    c() {
      div = element("div");
      create_component(list.$$.fragment);
      attr(div, "slot", "left");
      attr(div, "class", "left-panel svelte-9l897d");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(list, div, null);
      current = true;
    },
    p(ctx, dirty) {
      var _ctx$2;
      const list_changes = {};
      if (dirty & /*listItems*/16) list_changes.listItems = /*listItems*/ctx[4];
      if (dirty & /*selectedPlugin*/1) list_changes.selectedKey = /*selectedPlugin*/(_ctx$2 = ctx[0]) === null || _ctx$2 === void 0 ? void 0 : _ctx$2.key;
      list.$set(list_changes);
    },
    i(local) {
      if (current) return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(list);
    }
  };
}

// (53:4) {#if pluginState}
function create_if_block_1$2(ctx) {
  let div1;
  let h2;
  let t1;
  let div0;
  let button0;
  let t2;
  let button1;
  let current;
  button0 = new Button({
    props: {
      $$slots: {
        default: [create_default_slot_1$2]
      },
      $$scope: {
        ctx
      }
    }
  });
  button0.$on("click", /*handleToggleExpand*/ctx[6]);
  button1 = new Button({
    props: {
      $$slots: {
        default: [create_default_slot$2]
      },
      $$scope: {
        ctx
      }
    }
  });
  button1.$on("click", /*handleLogState*/ctx[7]);
  return {
    c() {
      div1 = element("div");
      h2 = element("h2");
      h2.textContent = "Plugin state";
      t1 = space();
      div0 = element("div");
      create_component(button0.$$.fragment);
      t2 = space();
      create_component(button1.$$.fragment);
      attr(div1, "class", "top-row svelte-9l897d");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, h2);
      append(div1, t1);
      append(div1, div0);
      mount_component(button0, div0, null);
      append(div0, t2);
      mount_component(button1, div0, null);
      current = true;
    },
    p(ctx, dirty) {
      const button0_changes = {};
      if (dirty & /*$$scope, expandPluginState*/2050) {
        button0_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty & /*$$scope*/2048) {
        button1_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button1.$set(button1_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button0.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button0);
      destroy_component(button1);
    }
  };
}

// (57:10) <Button on:click={handleToggleExpand}>
function create_default_slot_1$2(ctx) {
  let t_value = ( /*expandPluginState*/ctx[1] ? 'collapse' : 'expand') + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx, dirty) {
      if (dirty & /*expandPluginState*/2 && t_value !== (t_value = ( /*expandPluginState*/ctx[1] ? 'collapse' : 'expand') + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (60:10) <Button on:click={handleLogState}>
function create_default_slot$2(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (66:4) {:else}
function create_else_block$4(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "Plugin has no state";
      attr(div, "class", "empty-state svelte-9l897d");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

// (64:4) {#if pluginState}
function create_if_block$4(ctx) {
  let treeview;
  let current;
  treeview = new TreeView({
    props: {
      data: /*pluginState*/ctx[3],
      showLogButton: true,
      showCopyButton: true,
      recursionOpts: /*recursionOpts*/ctx[2]
    }
  });
  return {
    c() {
      create_component(treeview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(treeview, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const treeview_changes = {};
      if (dirty & /*pluginState*/8) treeview_changes.data = /*pluginState*/ctx[3];
      if (dirty & /*recursionOpts*/4) treeview_changes.recursionOpts = /*recursionOpts*/ctx[2];
      treeview.$set(treeview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(treeview, detaching);
    }
  };
}

// (52:2) 
function create_right_slot$3(ctx) {
  let div;
  let t;
  let current_block_type_index;
  let if_block1;
  let current;
  let if_block0 = /*pluginState*/ctx[3] && create_if_block_1$2(ctx);
  const if_block_creators = [create_if_block$4, create_else_block$4];
  const if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*pluginState*/ctx[3]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      if_block1.c();
      attr(div, "slot", "right");
      attr(div, "class", "right-panel svelte-9l897d");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append(div, t);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx, dirty) {
      if ( /*pluginState*/ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*pluginState*/8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$2(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        } else {
          if_block1.p(ctx, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(div, null);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0) if_block0.d();
      if_blocks[current_block_type_index].d();
    }
  };
}
function create_fragment$8(ctx) {
  let splitview;
  let current;
  splitview = new SplitView({
    props: {
      $$slots: {
        right: [create_right_slot$3],
        left: [create_left_slot$2]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(splitview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(splitview, target, anchor);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      const splitview_changes = {};
      if (dirty & /*$$scope, pluginState, recursionOpts, expandPluginState, listItems, selectedPlugin*/2079) {
        splitview_changes.$$scope = {
          dirty,
          ctx
        };
      }
      splitview.$set(splitview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(splitview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(splitview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(splitview, detaching);
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let pluginState;
  let listItems;
  const {
    view
  } = getContext('editor-view');
  let expandPluginState = false;
  let recursionOpts = {
    maxDepth: 10,
    stopCircularRecursion: true,
    shouldExpandNode: () => expandPluginState
  };
  let editorState = view.state;
  let plugins = editorState.plugins;
  let selectedPlugin = plugins[0];
  latestEntry.subscribe(e => {
    if (!e) return;
    $$invalidate(8, editorState = e.state);
    $$invalidate(9, plugins = editorState.plugins);
    $$invalidate(0, selectedPlugin = plugins.find(p => p.key === (selectedPlugin === null || selectedPlugin === void 0 ? void 0 : selectedPlugin.key)));
  });
  function handlePluginSelect(item) {
    $$invalidate(0, selectedPlugin = plugins.find(p => p.key === item.key));
  }
  function handleToggleExpand() {
    $$invalidate(1, expandPluginState = !expandPluginState);
    $$invalidate(2, recursionOpts = Object.assign(Object.assign({}, recursionOpts), {
      shouldExpandNode: () => expandPluginState
    }));
  }
  function handleLogState() {
    window._plugin = [selectedPlugin, pluginState];
    console.info('%c [prosemirror-dev-toolkit]: Property added to window._plugin', 'color: #b8e248');
    console.log(selectedPlugin);
    console.log(pluginState);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*selectedPlugin, editorState*/257) {
      // I don't know how, but I've found in one editor plugin did not have getState method
      $$invalidate(3, pluginState = (selectedPlugin === null || selectedPlugin === void 0 ? void 0 : selectedPlugin.getState) ? selectedPlugin.getState(editorState) : undefined);
    }
    if ($$self.$$.dirty & /*plugins, editorState*/768) {
      $$invalidate(4, listItems = plugins.map(p => ({
        key: p.key,
        value: p.key.toUpperCase(),
        empty: !(p.getState && p.getState(editorState))
      })));
    }
  };
  return [selectedPlugin, expandPluginState, recursionOpts, pluginState, listItems, handlePluginSelect, handleToggleExpand, handleLogState, editorState, plugins];
}
class PluginsTab extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {}, add_css$8);
  }
}

/* src/tabs/SchemaTab.svelte generated by Svelte v4.2.15 */
function add_css$7(target) {
  append_styles(target, "svelte-1u2reu1", ".top-row.svelte-1u2reu1{align-items:center;display:flex;justify-content:space-between}.left-panel[slot=left].svelte-1u2reu1{overflow:scroll;padding:1em}.right-panel[slot=right].svelte-1u2reu1{border-left:1px solid rgba(255, 162, 177, 0.2);overflow:scroll;padding:1em}");
}

// (14:6) <Button class="hidden">
function create_default_slot_1$1(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (11:2) 
function create_left_slot$1(ctx) {
  let div1;
  let div0;
  let h2;
  let t1;
  let button;
  let t2;
  let treeview;
  let current;
  button = new Button({
    props: {
      class: "hidden",
      $$slots: {
        default: [create_default_slot_1$1]
      },
      $$scope: {
        ctx
      }
    }
  });
  treeview = new TreeView({
    props: {
      class: "tree-view",
      data: /*nodes*/ctx[0],
      showLogButton: true,
      showCopyButton: true,
      recursionOpts: {
        stopCircularRecursion: true
      }
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h2 = element("h2");
      h2.textContent = "Nodes";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      create_component(treeview.$$.fragment);
      attr(div0, "class", "top-row svelte-1u2reu1");
      attr(div1, "slot", "left");
      attr(div1, "class", "left-panel svelte-1u2reu1");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h2);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div1, t2);
      mount_component(treeview, div1, null);
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/8) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button);
      destroy_component(treeview);
    }
  };
}

// (29:6) <Button class="hidden">
function create_default_slot$1(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (26:2) 
function create_right_slot$2(ctx) {
  let div1;
  let div0;
  let h2;
  let t1;
  let button;
  let t2;
  let treeview;
  let current;
  button = new Button({
    props: {
      class: "hidden",
      $$slots: {
        default: [create_default_slot$1]
      },
      $$scope: {
        ctx
      }
    }
  });
  treeview = new TreeView({
    props: {
      class: "tree-view",
      data: /*marks*/ctx[1],
      showLogButton: true,
      showCopyButton: true,
      recursionOpts: {
        stopCircularRecursion: true
      }
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h2 = element("h2");
      h2.textContent = "Marks";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      create_component(treeview.$$.fragment);
      attr(div0, "class", "top-row svelte-1u2reu1");
      attr(div1, "slot", "right");
      attr(div1, "class", "right-panel svelte-1u2reu1");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h2);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div1, t2);
      mount_component(treeview, div1, null);
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/8) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button);
      destroy_component(treeview);
    }
  };
}
function create_fragment$7(ctx) {
  let splitview;
  let current;
  splitview = new SplitView({
    props: {
      $$slots: {
        right: [create_right_slot$2],
        left: [create_left_slot$1]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(splitview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(splitview, target, anchor);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      const splitview_changes = {};
      if (dirty & /*$$scope*/8) {
        splitview_changes.$$scope = {
          dirty,
          ctx
        };
      }
      splitview.$set(splitview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(splitview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(splitview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(splitview, detaching);
    }
  };
}
function instance$7($$self) {
  const {
    view
  } = getContext('editor-view');
  let nodes = view.state.schema.nodes;
  let marks = view.state.schema.marks;
  return [nodes, marks];
}
class SchemaTab extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {}, add_css$7);
  }
}

/* src/tabs/structure/DocNode.svelte generated by Svelte v4.2.15 */
function add_css$6(target) {
  append_styles(target, "svelte-1un819s", ".doc-node.svelte-1un819s{border-left:1px solid #363755;border-right:1px solid #363755;display:flex;flex-direction:column;padding:0 12px}.doc-node.root.svelte-1un819s{border:0;padding:0}.doc-node-body.svelte-1un819s{background:#363755;color:#222;display:flex;font-size:13px;margin-top:3px}.number-box.svelte-1un819s{padding:3px 6px;background:rgba(255, 255, 255, 0.3)}.node-name.svelte-1un819s{width:100%}button.svelte-1un819s{align-items:center;background:transparent;border:0;color:#222;cursor:pointer;display:flex;height:100%;white-space:pre;width:100%}button.svelte-1un819s:hover{background:rgba(255, 162, 177, 0.4);color:#fff}button.selected.svelte-1un819s{background:rgba(255, 162, 177, 0.4)}ul.svelte-1un819s{list-style:none;margin:0;padding:0}ul.show-borders.svelte-1un819s{border-left:1px solid rgb(96, 76, 104);border-right:1px solid rgb(96, 76, 104)}.inline-children.svelte-1un819s{border-left:1px solid rgb(96, 76, 104);border-right:1px solid rgb(96, 76, 104);display:flex;flex-wrap:wrap;padding:0 12px}.inline-children.svelte-1un819s>.doc-node{flex-grow:1;padding:0}");
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  child_ctx[17] = i;
  return child_ctx;
}

// (45:4) {#each fragment.content as child, i}
function create_each_block$1(ctx) {
  let docnode;
  let current;
  docnode = new DocNode({
    props: {
      node: /*child*/ctx[15],
      startPos: /*startPositions*/ctx[5][/*i*/ctx[17]],
      depth: /*depth*/ctx[1] + 1
    }
  });
  return {
    c() {
      create_component(docnode.$$.fragment);
    },
    m(target, anchor) {
      mount_component(docnode, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const docnode_changes = {};
      if (dirty & /*fragment*/4) docnode_changes.node = /*child*/ctx[15];
      if (dirty & /*startPositions*/32) docnode_changes.startPos = /*startPositions*/ctx[5][/*i*/ctx[17]];
      if (dirty & /*depth*/2) docnode_changes.depth = /*depth*/ctx[1] + 1;
      docnode.$set(docnode_changes);
    },
    i(local) {
      if (current) return;
      transition_in(docnode.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(docnode.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(docnode, detaching);
    }
  };
}
function create_fragment$6(ctx) {
  let li;
  let div3;
  let div0;
  let t0;
  let t1;
  let div1;
  let button;
  let t2;
  let t3;
  let div2;
  let t4;
  let div3_style_value;
  let t5;
  let ul;
  let li_class_value;
  let current;
  let mounted;
  let dispose;
  let each_value = ensure_array_like( /*fragment*/ctx[2].content);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      li = element("li");
      div3 = element("div");
      div0 = element("div");
      t0 = text( /*startPos*/ctx[0]);
      t1 = space();
      div1 = element("div");
      button = element("button");
      t2 = text( /*name*/ctx[6]);
      t3 = space();
      div2 = element("div");
      t4 = text( /*endPos*/ctx[4]);
      t5 = space();
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "number-box svelte-1un819s");
      attr(button, "aria-label", "Show node info button");
      attr(button, "class", "svelte-1un819s");
      toggle_class(button, "selected", false);
      attr(div1, "class", "node-name svelte-1un819s");
      attr(div2, "class", "number-box svelte-1un819s");
      attr(div3, "class", "doc-node-body svelte-1un819s");
      attr(div3, "style", div3_style_value = "background: ".concat( /*color*/ctx[7]));
      attr(ul, "class", "svelte-1un819s");
      toggle_class(ul, "inline-children", /*inlineChildren*/ctx[3]);
      toggle_class(ul, "show-borders", /*depth*/ctx[1] >= 1);
      attr(li, "class", li_class_value = "" + (null_to_empty("".concat( /*$$props*/ctx[11].class || '', " doc-node")) + " svelte-1un819s"));
      toggle_class(li, "root", /*isRoot*/ctx[8]);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, div3);
      append(div3, div0);
      append(div0, t0);
      append(div3, t1);
      append(div3, div1);
      append(div1, button);
      append(button, t2);
      append(div3, t3);
      append(div3, div2);
      append(div2, t4);
      append(li, t5);
      append(li, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      current = true;
      if (!mounted) {
        dispose = [listen(button, "click", /*handleNameClick*/ctx[9]), listen(button, "dblclick", /*handleNameDblClick*/ctx[10])];
        mounted = true;
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (!current || dirty & /*startPos*/1) set_data(t0, /*startPos*/ctx[0]);
      if (!current || dirty & /*name*/64) set_data(t2, /*name*/ctx[6]);
      if (!current || dirty & /*endPos*/16) set_data(t4, /*endPos*/ctx[4]);
      if (!current || dirty & /*color*/128 && div3_style_value !== (div3_style_value = "background: ".concat( /*color*/ctx[7]))) {
        attr(div3, "style", div3_style_value);
      }
      if (dirty & /*fragment, startPositions, depth*/38) {
        each_value = ensure_array_like( /*fragment*/ctx[2].content);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!current || dirty & /*inlineChildren*/8) {
        toggle_class(ul, "inline-children", /*inlineChildren*/ctx[3]);
      }
      if (!current || dirty & /*depth*/2) {
        toggle_class(ul, "show-borders", /*depth*/ctx[1] >= 1);
      }
      if (!current || dirty & /*$$props*/2048 && li_class_value !== (li_class_value = "" + (null_to_empty("".concat( /*$$props*/ctx[11].class || '', " doc-node")) + " svelte-1un819s"))) {
        attr(li, "class", li_class_value);
      }
      if (!current || dirty & /*$$props, isRoot*/2304) {
        toggle_class(li, "root", /*isRoot*/ctx[8]);
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let fragment;
  let color;
  let name;
  let startPositions;
  let endPos;
  let inlineChildren;
  const {
    colors,
    handleNodeClick
  } = getContext('doc-view');
  let {
    node,
    startPos,
    depth
  } = $$props;
  const isRoot = depth === 0;
  function handleNameClick() {
    handleNodeClick(node, startPos);
  }
  function handleNameDblClick() {
    handleNodeClick(node, startPos, true);
  }
  $$self.$$set = $$new_props => {
    $$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ('node' in $$new_props) $$invalidate(12, node = $$new_props.node);
    if ('startPos' in $$new_props) $$invalidate(0, startPos = $$new_props.startPos);
    if ('depth' in $$new_props) $$invalidate(1, depth = $$new_props.depth);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*node*/4096) {
      $$invalidate(2, fragment = node.content);
    }
    if ($$self.$$.dirty & /*node*/4096) {
      $$invalidate(7, color = colors[node.type.name]);
    }
    if ($$self.$$.dirty & /*node*/4096) {
      $$invalidate(6, name = node.isText && node.marks.length > 0 ? "".concat(node.type.name, " - [").concat(node.marks.map(m => m.type.name).join(', '), "]") : node.type.name);
    }
    if ($$self.$$.dirty & /*node, startPos*/4097) {
      $$invalidate(5, startPositions = Array(node.childCount).fill(undefined).reduce((acc, _, idx) => {
        if (idx === 0) {
          return [isRoot ? 0 : startPos + 1];
        }
        let prev = acc[idx - 1];
        let cur = node.child(idx - 1);
        return [...acc, prev + cur.nodeSize];
      }, []));
    }
    if ($$self.$$.dirty & /*startPos, node*/4097) {
      $$invalidate(4, endPos = startPos + node.nodeSize);
    }
    if ($$self.$$.dirty & /*fragment*/4) {
      $$invalidate(3, inlineChildren = fragment.content.every(n => n.isInline));
    }
  };
  $$props = exclude_internal_props($$props);
  return [startPos, depth, fragment, inlineChildren, endPos, startPositions, name, color, isRoot, handleNameClick, handleNameDblClick, $$props, node];
}
class DocNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      node: 12,
      startPos: 0,
      depth: 1
    }, add_css$6);
  }
}

const nodeColors = [
    '#EA7C7F', // red
    '#67B0C6', // cyan 400
    '#94BB7F', // green
    '#CA9EDB', // deep purple
    '#DCDC5D', // lime
    '#B9CC7C', // light green
    '#DD97D8', // purple
    '#FFB761', // orange
    '#4D8FD1', // light blue
    '#F36E98', // pink
    '#E45F44', // deep orange
    '#A6A4AE', // blue grey
    '#FCC047', // yellow
    '#FFC129', // amber
    '#D3929C', // can can
    '#4CBCD4', // cyan
    '#8D7BC0' // indigo
];
function calculateSafeIndex(index, total) {
    const quotient = index / total;
    return Math.round(total * (quotient - Math.floor(quotient)));
}
function buildColors(schema) {
    return Object.keys(schema.nodes).reduce((acc, node, index) => {
        const safeIndex = index >= nodeColors.length ? calculateSafeIndex(index, nodeColors.length) : index;
        acc[node] = nodeColors[safeIndex];
        return acc;
    }, {});
}

/* src/tabs/structure/DocView.svelte generated by Svelte v4.2.15 */
function add_css$5(target) {
  append_styles(target, "svelte-is7zuw", "ul.svelte-is7zuw{list-style:none;margin:0;padding:0}");
}
function create_fragment$5(ctx) {
  let ul;
  let docnode;
  let current;
  docnode = new DocNode({
    props: {
      class: /*$$props*/ctx[1].class,
      node: /*doc*/ctx[0],
      startPos: 0,
      depth: 0
    }
  });
  return {
    c() {
      ul = element("ul");
      create_component(docnode.$$.fragment);
      attr(ul, "class", "svelte-is7zuw");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      mount_component(docnode, ul, null);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      const docnode_changes = {};
      if (dirty & /*$$props*/2) docnode_changes.class = /*$$props*/ctx[1].class;
      if (dirty & /*doc*/1) docnode_changes.node = /*doc*/ctx[0];
      docnode.$set(docnode_changes);
    },
    i(local) {
      if (current) return;
      transition_in(docnode.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(docnode.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      destroy_component(docnode);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let {
    doc,
    schema,
    selected = {
      type: '',
      start: 0,
      end: 0
    },
    handleNodeSelect
  } = $$props;
  setContext('doc-view', {
    selected,
    colors: buildColors(schema),
    handleNodeClick: handleNodeSelect
  });
  $$self.$$set = $$new_props => {
    $$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ('doc' in $$new_props) $$invalidate(0, doc = $$new_props.doc);
    if ('schema' in $$new_props) $$invalidate(2, schema = $$new_props.schema);
    if ('selected' in $$new_props) $$invalidate(3, selected = $$new_props.selected);
    if ('handleNodeSelect' in $$new_props) $$invalidate(4, handleNodeSelect = $$new_props.handleNodeSelect);
  };
  $$props = exclude_internal_props($$props);
  return [doc, $$props, schema, selected, handleNodeSelect];
}
class DocView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      doc: 0,
      schema: 2,
      selected: 3,
      handleNodeSelect: 4
    }, add_css$5);
  }
}

/* src/tabs/structure/StructureTab.svelte generated by Svelte v4.2.15 */
function add_css$4(target) {
  append_styles(target, "svelte-15i66m0", ".top-row.svelte-15i66m0{align-items:center;display:flex;justify-content:space-between}.right-panel[slot=right].svelte-15i66m0{border-left:1px solid rgba(255, 162, 177, 0.2);flex-grow:0;min-width:220px;width:220px}.split-view .m-top{margin-top:0.75em}");
}

// (99:6) <Button class="hidden">
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (96:2) 
function create_left_slot(ctx) {
  let div1;
  let div0;
  let h2;
  let t1;
  let button;
  let t2;
  let docview;
  let current;
  button = new Button({
    props: {
      class: "hidden",
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx
      }
    }
  });
  docview = new DocView({
    props: {
      class: "m-top",
      doc: /*doc*/ctx[0],
      schema: /*schema*/ctx[2],
      handleNodeSelect: /*handleNodeSelect*/ctx[3]
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h2 = element("h2");
      h2.textContent = "Current doc";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      create_component(docview.$$.fragment);
      attr(div0, "class", "top-row svelte-15i66m0");
      attr(div1, "slot", "left");
      attr(div1, "class", "left-panel");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h2);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div1, t2);
      mount_component(docview, div1, null);
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/256) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
      const docview_changes = {};
      if (dirty & /*doc*/1) docview_changes.doc = /*doc*/ctx[0];
      docview.$set(docview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(docview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      transition_out(docview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button);
      destroy_component(docview);
    }
  };
}

// (106:6) <Button on:click={handleClickLogNode}>
function create_default_slot(ctx) {
  let t;
  return {
    c() {
      t = text("log");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (103:2) 
function create_right_slot$1(ctx) {
  let div1;
  let div0;
  let h2;
  let t1;
  let button;
  let t2;
  let treeview;
  let current;
  button = new Button({
    props: {
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx
      }
    }
  });
  button.$on("click", /*handleClickLogNode*/ctx[4]);
  treeview = new TreeView({
    props: {
      class: "m-top",
      data: /*jsonNode*/ctx[1],
      recursionOpts: {
        shouldExpandNode: func
      }
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h2 = element("h2");
      h2.textContent = "Node info";
      t1 = space();
      create_component(button.$$.fragment);
      t2 = space();
      create_component(treeview.$$.fragment);
      attr(div0, "class", "top-row svelte-15i66m0");
      attr(div1, "slot", "right");
      attr(div1, "class", "right-panel svelte-15i66m0");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h2);
      append(div0, t1);
      mount_component(button, div0, null);
      append(div1, t2);
      mount_component(treeview, div1, null);
      current = true;
    },
    p(ctx, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/256) {
        button_changes.$$scope = {
          dirty,
          ctx
        };
      }
      button.$set(button_changes);
      const treeview_changes = {};
      if (dirty & /*jsonNode*/2) treeview_changes.data = /*jsonNode*/ctx[1];
      treeview.$set(treeview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(button);
      destroy_component(treeview);
    }
  };
}
function create_fragment$4(ctx) {
  let splitview;
  let current;
  splitview = new SplitView({
    props: {
      $$slots: {
        right: [create_right_slot$1],
        left: [create_left_slot]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(splitview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(splitview, target, anchor);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      const splitview_changes = {};
      if (dirty & /*$$scope, jsonNode, doc*/259) {
        splitview_changes.$$scope = {
          dirty,
          ctx
        };
      }
      splitview.$set(splitview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(splitview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(splitview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(splitview, detaching);
    }
  };
}
function getScrollableParent(el) {
  if (!el || el === document.body) return undefined;else if (el.scrollHeight !== el.clientHeight) return el;
  return getScrollableParent(el.parentElement);
}
const func = n => n.type !== 'array' || n.value.length <= 50;
function instance$4($$self, $$props, $$invalidate) {
  let jsonNode;
  const {
    view
  } = getContext('editor-view');
  let doc = view.state.doc;
  let selected = {
    node: view.state.doc,
    pos: 0
  };
  let schema = view.state.schema;
  let timer;
  latestEntry.subscribe(e => {
    if (!e) return;
    e.trs.forEach(tr => {
      $$invalidate(5, selected.pos = tr.mapping.map(selected.pos), selected);
    });
    clearTimeout(timer);
    timer = setTimeout(() => {
      $$invalidate(0, doc = e.state.doc);
      const pos = selected.pos;
      try {
        // Must try-catch incase dev-tools is unmounted and editorView destroyed
        const node = doc.nodeAt(pos);
        $$invalidate(5, selected = {
          node: node || doc,
          pos: node ? pos : 0
        });
      } catch (err) {}
    }, 100);
  });
  function handleNodeSelect(node, startPos) {
    let scroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var _a;
    $$invalidate(5, selected = {
      node,
      pos: startPos
    });
    if (!scroll) return;

    /**
    * Some high order black magic right here for scrolling the node into view.
    *
    * First, we need to ensure the node is visible within a scrollable element.
    * Meaning that if there's a parent element with overflow: scroll/auto we have to
    * scroll the element into view.
    */
    let nodeDom = view.nodeDOM(startPos);

    // Text nodes don't have offsetTop property so we have to find a parent which has
    while (nodeDom && !(nodeDom instanceof HTMLElement)) {
      nodeDom = nodeDom.parentElement;
    }

    // We'll omit hidden nodes since it might be more obvious that there's nothing to scroll into
    if (!nodeDom || getComputedStyle(nodeDom).display === 'none') return;
    const parentWithScrollbar = getScrollableParent(view.dom);
    if (parentWithScrollbar) {
      const alreadyScrolled = parentWithScrollbar.scrollTop;

      // So this is probably the most magic part. Basically if the parent has been scrolled over
      // in the viewport (meaning it's below the absolute position of the current viewport top),
      // we must offset the boundingRect's top as they are calculated from the viewport's top,
      // not where the parent element actually is. Otherwise we would scroll downwards even though
      // the node's top would already be enough to be shown. Real PITA to wrap your head around.
      // Hopefully nobody has to ever fix this 😅
      const parentOffset = parentWithScrollbar.offsetTop - window.scrollY;
      const parentTop = parentWithScrollbar.getBoundingClientRect().top - parentOffset;
      const nodeTop = nodeDom.getBoundingClientRect().top - parentOffset;

      // clientHeight / 2 seems to work as a carefully crafted heurestic..
      const halfwayParent = parentWithScrollbar.clientHeight / 2;
      parentWithScrollbar.scroll(0, alreadyScrolled + parentTop + nodeTop - halfwayParent);
    }

    /**
    * After that, incase the window has a scrollbar as well we want to scroll the
    * element just above the dock
    */
    const nodeTop = view.coordsAtPos(startPos).top;
    const dockHeight = ((_a = document.querySelector('.floating-dock')) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0;
    window.scroll(0, nodeTop - dockHeight + nodeDom.clientHeight + window.scrollY);
  }
  function handleClickLogNode() {
    console.log(selected);
    window._node = selected;
    console.info('%c [prosemirror-dev-toolkit]: Property added to window._node', 'color: #b8e248');
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*selected*/32) {
      $$invalidate(1, jsonNode = selected.node.toJSON());
    }
  };
  return [doc, jsonNode, schema, handleNodeSelect, handleClickLogNode, selected];
}
class StructureTab extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {}, add_css$4);
  }
}

/* src/tabs/snapshots/SnapshotsList.svelte generated by Svelte v4.2.15 */
function add_css$3(target) {
  append_styles(target, "svelte-969ox4", "ul.svelte-969ox4.svelte-969ox4{color:#fff;list-style:none;margin:0;padding:0;height:100%;width:100%}li.svelte-969ox4+li.svelte-969ox4{border-top:1px solid rgb(96, 76, 104)}li.svelte-969ox4.svelte-969ox4{align-items:center;display:flex;font-family:monospace;padding:6px 18px}input.svelte-969ox4.svelte-969ox4{background:transparent;border:0;color:#fff;height:100%;margin:0;padding:2px;width:100%}.unstyled-btn.svelte-969ox4.svelte-969ox4{background:transparent;border:0;color:#fff;cursor:pointer;display:block;font-family:monospace;margin:0;padding:0;text-align:start;width:100%}.snapshot-btn.svelte-969ox4.svelte-969ox4{background:transparent;border:0;border-radius:3px;color:#d3d3d9;cursor:pointer;display:flex;font-size:11px;padding:6px 18px;text-transform:uppercase}.snapshot-btn.svelte-969ox4.svelte-969ox4:hover{background:rgba(255, 162, 177, 0.4);color:#fff}.ml-2.svelte-969ox4.svelte-969ox4{margin-left:1rem}");
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[23] = list[i];
  return child_ctx;
}

// (66:6) {:else}
function create_else_block_2(ctx) {
  let button;
  let t_value = /*snap*/ctx[23].name + "";
  let t;
  let mounted;
  let dispose;
  function dblclick_handler() {
    return /*dblclick_handler*/ctx[16]( /*snap*/ctx[23]);
  }
  return {
    c() {
      button = element("button");
      t = text(t_value);
      attr(button, "class", "unstyled-btn svelte-969ox4");
      attr(button, "aria-label", "Edit snapshot name button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t);
      if (!mounted) {
        dispose = listen(button, "dblclick", dblclick_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*snapshots*/1 && t_value !== (t_value = /*snap*/ctx[23].name + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}

// (60:6) {#if editedSnap && editedSnap.timestamp === snap.timestamp}
function create_if_block_2$1(ctx) {
  let input;
  let input_value_value;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      input.value = input_value_value = /*editedSnap*/ctx[2].name;
      attr(input, "class", "svelte-969ox4");
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (!mounted) {
        dispose = [listen(input, "input", /*handleNameChange*/ctx[5]), listen(input, "keypress", /*handleNameKeyPress*/ctx[6])];
        mounted = true;
      }
    },
    p(ctx, dirty) {
      if (dirty & /*editedSnap*/4 && input_value_value !== (input_value_value = /*editedSnap*/ctx[2].name) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(input);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}

// (76:8) {:else}
function create_else_block_1(ctx) {
  let t;
  return {
    c() {
      t = text("Show");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (74:8) {#if selectedSnapshot?.timestamp === snap.timestamp}
function create_if_block_1$1(ctx) {
  let t;
  return {
    c() {
      t = text("Hide");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (85:8) {:else}
function create_else_block$3(ctx) {
  let t;
  return {
    c() {
      t = text("Delete");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (83:8) {#if deleteSnap?.timestamp === snap.timestamp}
function create_if_block$3(ctx) {
  let t;
  return {
    c() {
      t = text("Confirm Delete");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}

// (58:2) {#each snapshots as snap}
function create_each_block(ctx) {
  let li;
  let t0;
  let button0;
  let t1;
  let button1;
  let t3;
  let button2;
  let t5;
  let button3;
  let t6;
  let mounted;
  let dispose;
  function select_block_type(ctx, dirty) {
    if ( /*editedSnap*/ctx[2] && /*editedSnap*/ctx[2].timestamp === /*snap*/ctx[23].timestamp) return create_if_block_2$1;
    return create_else_block_2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  function select_block_type_1(ctx, dirty) {
    var _ctx$;
    if ( /*selectedSnapshot*/((_ctx$ = ctx[1]) === null || _ctx$ === void 0 ? void 0 : _ctx$.timestamp) === /*snap*/ctx[23].timestamp) return create_if_block_1$1;
    return create_else_block_1;
  }
  let current_block_type_1 = select_block_type_1(ctx);
  let if_block1 = current_block_type_1(ctx);
  function click_handler() {
    return /*click_handler*/ctx[17]( /*snap*/ctx[23]);
  }
  function click_handler_1() {
    return /*click_handler_1*/ctx[18]( /*snap*/ctx[23]);
  }
  function click_handler_2() {
    return /*click_handler_2*/ctx[19]( /*snap*/ctx[23]);
  }
  function select_block_type_2(ctx, dirty) {
    var _ctx$2;
    if ( /*deleteSnap*/((_ctx$2 = ctx[3]) === null || _ctx$2 === void 0 ? void 0 : _ctx$2.timestamp) === /*snap*/ctx[23].timestamp) return create_if_block$3;
    return create_else_block$3;
  }
  let current_block_type_2 = select_block_type_2(ctx);
  let if_block2 = current_block_type_2(ctx);
  function click_handler_3() {
    return /*click_handler_3*/ctx[20]( /*snap*/ctx[23]);
  }
  return {
    c() {
      li = element("li");
      if_block0.c();
      t0 = space();
      button0 = element("button");
      if_block1.c();
      t1 = space();
      button1 = element("button");
      button1.textContent = "Restore";
      t3 = space();
      button2 = element("button");
      button2.textContent = "Export";
      t5 = space();
      button3 = element("button");
      if_block2.c();
      t6 = space();
      attr(button0, "class", "snapshot-btn ml-2 svelte-969ox4");
      attr(button1, "class", "snapshot-btn svelte-969ox4");
      attr(button2, "class", "snapshot-btn svelte-969ox4");
      attr(button3, "class", "snapshot-btn svelte-969ox4");
      attr(li, "class", "svelte-969ox4");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      if_block0.m(li, null);
      append(li, t0);
      append(li, button0);
      if_block1.m(button0, null);
      append(li, t1);
      append(li, button1);
      append(li, t3);
      append(li, button2);
      append(li, t5);
      append(li, button3);
      if_block2.m(button3, null);
      append(li, t6);
      if (!mounted) {
        dispose = [listen(button0, "click", click_handler), listen(button1, "click", click_handler_1), listen(button2, "click", click_handler_2), listen(button3, "click", click_handler_3)];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);
        if (if_block0) {
          if_block0.c();
          if_block0.m(li, t0);
        }
      }
      if (current_block_type_1 !== (current_block_type_1 = select_block_type_1(ctx))) {
        if_block1.d(1);
        if_block1 = current_block_type_1(ctx);
        if (if_block1) {
          if_block1.c();
          if_block1.m(button0, null);
        }
      }
      if (current_block_type_2 !== (current_block_type_2 = select_block_type_2(ctx))) {
        if_block2.d(1);
        if_block2 = current_block_type_2(ctx);
        if (if_block2) {
          if_block2.c();
          if_block2.m(button3, null);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      if_block0.d();
      if_block1.d();
      if_block2.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$3(ctx) {
  let ul;
  let each_value = ensure_array_like( /*snapshots*/ctx[0]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "class", "svelte-969ox4");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      if (dirty & /*handleClickDelete, snapshots, deleteSnap, handleExportClick, handleRestoreClick, handleClickView, selectedSnapshot, editedSnap, handleNameChange, handleNameKeyPress, handleSnapDoubleclick*/2047) {
        each_value = ensure_array_like( /*snapshots*/ctx[0]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let {
    snapshots = [],
    selectedSnapshot = undefined,
    onUpdate,
    onView,
    onRestore,
    onExport,
    onDelete
  } = $$props;
  let editedSnap;
  let deleteSnap;
  let timer;
  const debounceUpdate = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      onUpdate(editedSnap);
    }, 150);
  };
  function handleSnapDoubleclick(snap) {
    $$invalidate(2, editedSnap = snap);
    $$invalidate(3, deleteSnap = undefined);
  }
  function handleNameChange(evt) {
    if (editedSnap) {
      $$invalidate(2, editedSnap.name = evt.currentTarget.value, editedSnap);
      debounceUpdate();
    }
  }
  function handleNameKeyPress(evt) {
    if (evt.key === 'Enter' && editedSnap) {
      onUpdate(editedSnap);
      clearTimeout(timer);
      $$invalidate(2, editedSnap = undefined);
      $$invalidate(3, deleteSnap = undefined);
    }
  }
  function handleClickView(snap) {
    if ((selectedSnapshot === null || selectedSnapshot === void 0 ? void 0 : selectedSnapshot.timestamp) === snap.timestamp) {
      onView();
    } else {
      onView(snap);
    }
    $$invalidate(3, deleteSnap = undefined);
  }
  function handleRestoreClick(snap) {
    onRestore(snap);
    $$invalidate(3, deleteSnap = undefined);
  }
  function handleExportClick(snap) {
    onExport(snap);
    $$invalidate(3, deleteSnap = undefined);
  }
  function handleClickDelete(snap) {
    if (!deleteSnap || deleteSnap.timestamp !== snap.timestamp) {
      $$invalidate(3, deleteSnap = snap);
    } else {
      onDelete(snap);
      $$invalidate(3, deleteSnap = undefined);
    }
  }
  const dblclick_handler = snap => handleSnapDoubleclick(snap);
  const click_handler = snap => handleClickView(snap);
  const click_handler_1 = snap => handleRestoreClick(snap);
  const click_handler_2 = snap => handleExportClick(snap);
  const click_handler_3 = snap => handleClickDelete(snap);
  $$self.$$set = $$props => {
    if ('snapshots' in $$props) $$invalidate(0, snapshots = $$props.snapshots);
    if ('selectedSnapshot' in $$props) $$invalidate(1, selectedSnapshot = $$props.selectedSnapshot);
    if ('onUpdate' in $$props) $$invalidate(11, onUpdate = $$props.onUpdate);
    if ('onView' in $$props) $$invalidate(12, onView = $$props.onView);
    if ('onRestore' in $$props) $$invalidate(13, onRestore = $$props.onRestore);
    if ('onExport' in $$props) $$invalidate(14, onExport = $$props.onExport);
    if ('onDelete' in $$props) $$invalidate(15, onDelete = $$props.onDelete);
  };
  return [snapshots, selectedSnapshot, editedSnap, deleteSnap, handleSnapDoubleclick, handleNameChange, handleNameKeyPress, handleClickView, handleRestoreClick, handleExportClick, handleClickDelete, onUpdate, onView, onRestore, onExport, onDelete, dblclick_handler, click_handler, click_handler_1, click_handler_2, click_handler_3];
}
class SnapshotsList extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      snapshots: 0,
      selectedSnapshot: 1,
      onUpdate: 11,
      onView: 12,
      onRestore: 13,
      onExport: 14,
      onDelete: 15
    }, add_css$3);
  }
}

/* src/tabs/snapshots/SnapshotsTab.svelte generated by Svelte v4.2.15 */
function add_css$2(target) {
  append_styles(target, "svelte-3jdj5c", ".right-panel[slot=right].svelte-3jdj5c{padding:0}.no-snapshots.svelte-3jdj5c{align-items:center;color:rgb(255, 162, 177);display:flex;font-size:14px;height:100%;justify-content:center;width:100%}");
}

// (17:4) {:else}
function create_else_block$2(ctx) {
  let snapshotslist;
  let current;
  snapshotslist = new SnapshotsList({
    props: {
      snapshots: /*$snapshots*/ctx[0],
      selectedSnapshot: /*$selectedSnapshot*/ctx[1],
      onUpdate: updateSnapshot,
      onView: /*func*/ctx[4],
      onRestore: /*handleRestoreSnapshot*/ctx[3],
      onExport: exportSnapshot,
      onDelete: deleteSnapshot
    }
  });
  return {
    c() {
      create_component(snapshotslist.$$.fragment);
    },
    m(target, anchor) {
      mount_component(snapshotslist, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const snapshotslist_changes = {};
      if (dirty & /*$snapshots*/1) snapshotslist_changes.snapshots = /*$snapshots*/ctx[0];
      if (dirty & /*$selectedSnapshot*/2) snapshotslist_changes.selectedSnapshot = /*$selectedSnapshot*/ctx[1];
      snapshotslist.$set(snapshotslist_changes);
    },
    i(local) {
      if (current) return;
      transition_in(snapshotslist.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(snapshotslist.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(snapshotslist, detaching);
    }
  };
}

// (15:4) {#if $snapshots.length === 0}
function create_if_block$2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "Save snapshots by clicking \"Save\" button.";
      attr(div, "class", "no-snapshots svelte-3jdj5c");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

// (14:2) 
function create_right_slot(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block$2, create_else_block$2];
  const if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*$snapshots*/ctx[0].length === 0) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "slot", "right");
      attr(div, "class", "right-panel svelte-3jdj5c");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_blocks[current_block_type_index].d();
    }
  };
}
function create_fragment$2(ctx) {
  let splitview;
  let current;
  splitview = new SplitView({
    props: {
      $$slots: {
        right: [create_right_slot]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(splitview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(splitview, target, anchor);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      const splitview_changes = {};
      if (dirty & /*$$scope, $snapshots, $selectedSnapshot*/35) {
        splitview_changes.$$scope = {
          dirty,
          ctx
        };
      }
      splitview.$set(splitview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(splitview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(splitview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(splitview, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $snapshots;
  let $selectedSnapshot;
  component_subscribe($$self, snapshots, $$value => $$invalidate(0, $snapshots = $$value));
  component_subscribe($$self, selectedSnapshot, $$value => $$invalidate(1, $selectedSnapshot = $$value));
  const {
    view
  } = getContext('editor-view');
  function handleRestoreSnapshot(snapshot) {
    restoreSnapshot(view, snapshot);
    resetHistory();
  }
  const func = snap => toggleViewSnapshot(view, snap);
  return [$snapshots, $selectedSnapshot, view, handleRestoreSnapshot, func];
}
class SnapshotsTab extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {}, add_css$2);
  }
}

/* src/components/FloatingDock.svelte generated by Svelte v4.2.15 */
function add_css$1(target) {
  append_styles(target, "svelte-1quf800", ".floating-dock-wrapper.svelte-1quf800{position:fixed;width:0px;height:0px;top:0px;left:0px;z-index:99999999}.floating-dock.svelte-1quf800{background-color:#363755;position:fixed;z-index:1;box-shadow:rgba(34, 34, 34, 0.3) 0px 0px 4px 0px;left:0px;top:50%;width:100%;height:50%}.resizing-div.svelte-1quf800{position:absolute;z-index:2;opacity:0;top:-5px;height:10px;left:0px;width:100%;cursor:row-resize}.floating-dock-body.svelte-1quf800{height:100%}button.svelte-1quf800{background:rgba(255, 162, 177, 0.6);border:0;border-radius:3px;color:#fff;cursor:pointer;font-size:12px;height:24px;line-height:25px;padding:0 6px;position:absolute}button.svelte-1quf800:hover{background:rgba(255, 162, 177, 0.8)}.copy-btn.svelte-1quf800{right:173px;top:-28px}.save-btn.svelte-1quf800{right:129px;top:-28px}.import-btn.svelte-1quf800{right:79px;top:-28px}.paste-btn.svelte-1quf800{right:32px;top:-28px}.close-btn.svelte-1quf800{font-size:var(--font-medium);right:4px;top:-28px;width:24px}");
}

// (116:6) {:else}
function create_else_block$1(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "nuting here";
    },
    m(target, anchor) {
      insert(target, p, anchor);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}

// (114:40) 
function create_if_block_5(ctx) {
  let snapshotstab;
  let current;
  snapshotstab = new SnapshotsTab({});
  return {
    c() {
      create_component(snapshotstab.$$.fragment);
    },
    m(target, anchor) {
      mount_component(snapshotstab, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(snapshotstab.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(snapshotstab.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(snapshotstab, detaching);
    }
  };
}

// (112:40) 
function create_if_block_4(ctx) {
  let structuretab;
  let current;
  structuretab = new StructureTab({});
  return {
    c() {
      create_component(structuretab.$$.fragment);
    },
    m(target, anchor) {
      mount_component(structuretab, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(structuretab.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(structuretab.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(structuretab, detaching);
    }
  };
}

// (110:37) 
function create_if_block_3(ctx) {
  let schematab;
  let current;
  schematab = new SchemaTab({});
  return {
    c() {
      create_component(schematab.$$.fragment);
    },
    m(target, anchor) {
      mount_component(schematab, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(schematab.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(schematab.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(schematab, detaching);
    }
  };
}

// (108:38) 
function create_if_block_2(ctx) {
  let pluginstab;
  let current;
  pluginstab = new PluginsTab({});
  return {
    c() {
      create_component(pluginstab.$$.fragment);
    },
    m(target, anchor) {
      mount_component(pluginstab, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(pluginstab.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pluginstab.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pluginstab, detaching);
    }
  };
}

// (106:38) 
function create_if_block_1(ctx) {
  let historytab;
  let current;
  historytab = new HistoryTab({});
  return {
    c() {
      create_component(historytab.$$.fragment);
    },
    m(target, anchor) {
      mount_component(historytab, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(historytab.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(historytab.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(historytab, detaching);
    }
  };
}

// (104:6) {#if openTab === 'state'}
function create_if_block$1(ctx) {
  let statetab;
  let current;
  statetab = new StateTab({});
  return {
    c() {
      create_component(statetab.$$.fragment);
    },
    m(target, anchor) {
      mount_component(statetab, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(statetab.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(statetab.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(statetab, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let div4;
  let pastemodal;
  let t0;
  let div3;
  let div0;
  let t1;
  let div2;
  let div1;
  let button0;
  let t3;
  let button1;
  let t5;
  let button2;
  let t7;
  let button3;
  let t9;
  let button4;
  let t11;
  let input;
  let t12;
  let tabsmenu;
  let t13;
  let current_block_type_index;
  let if_block;
  let div3_style_value;
  let current;
  let mounted;
  let dispose;
  pastemodal = new PasteModal({
    props: {
      isOpen: /*modalOpen*/ctx[5]
    }
  });
  pastemodal.$on("submit", /*handlePasteSubmit*/ctx[12]);
  pastemodal.$on("close", /*handleCloseModal*/ctx[11]);
  tabsmenu = new TabsMenu({
    props: {
      onClickTab: /*handleClickTab*/ctx[14],
      active: /*openTab*/ctx[1]
    }
  });
  const if_block_creators = [create_if_block$1, create_if_block_1, create_if_block_2, create_if_block_3, create_if_block_4, create_if_block_5, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*openTab*/ctx[1] === 'state') return 0;
    if ( /*openTab*/ctx[1] === 'history') return 1;
    if ( /*openTab*/ctx[1] === 'plugins') return 2;
    if ( /*openTab*/ctx[1] === 'schema') return 3;
    if ( /*openTab*/ctx[1] === 'structure') return 4;
    if ( /*openTab*/ctx[1] === 'snapshots') return 5;
    return 6;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div4 = element("div");
      create_component(pastemodal.$$.fragment);
      t0 = space();
      div3 = element("div");
      div0 = element("div");
      t1 = space();
      div2 = element("div");
      div1 = element("div");
      button0 = element("button");
      button0.textContent = "Copy";
      t3 = space();
      button1 = element("button");
      button1.textContent = "Save";
      t5 = space();
      button2 = element("button");
      button2.textContent = "Import";
      t7 = space();
      button3 = element("button");
      button3.textContent = "Paste";
      t9 = space();
      button4 = element("button");
      button4.textContent = "X";
      t11 = space();
      input = element("input");
      t12 = space();
      create_component(tabsmenu.$$.fragment);
      t13 = space();
      if_block.c();
      attr(div0, "class", "resizing-div svelte-1quf800");
      attr(div0, "role", "button");
      attr(div0, "tabindex", "-1");
      attr(button0, "class", "copy-btn svelte-1quf800");
      attr(button1, "class", "save-btn svelte-1quf800");
      attr(button2, "class", "import-btn svelte-1quf800");
      attr(button3, "class", "paste-btn svelte-1quf800");
      attr(button4, "class", "close-btn svelte-1quf800");
      attr(button4, "aria-label", "Close dev-toolkit");
      set_style(input, "display", "none");
      attr(input, "type", "file");
      attr(input, "accept", ".json");
      input.multiple = true;
      attr(div2, "class", "floating-dock-body svelte-1quf800");
      attr(div3, "class", "floating-dock svelte-1quf800");
      attr(div3, "style", div3_style_value = "top: ".concat( /*dockTop*/ctx[2], "%; height: ").concat( /*dockHeight*/ctx[3], "%;"));
      attr(div4, "class", "floating-dock-wrapper svelte-1quf800");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      mount_component(pastemodal, div4, null);
      append(div4, t0);
      append(div4, div3);
      append(div3, div0);
      append(div3, t1);
      append(div3, div2);
      append(div2, div1);
      append(div1, button0);
      append(div1, t3);
      append(div1, button1);
      append(div1, t5);
      append(div1, button2);
      append(div1, t7);
      append(div1, button3);
      append(div1, t9);
      append(div1, button4);
      append(div2, t11);
      append(div2, input);
      /*input_binding*/
      ctx[15](input);
      append(div2, t12);
      mount_component(tabsmenu, div2, null);
      append(div2, t13);
      if_blocks[current_block_type_index].m(div2, null);
      current = true;
      if (!mounted) {
        dispose = [listen(div0, "mousedown", /*handleResizeMouseDown*/ctx[6]), listen(button0, "click", /*handleCopyDoc*/ctx[7]), listen(button1, "click", /*handleSaveSnapshot*/ctx[8]), listen(button2, "click", /*handleImportSnapshot*/ctx[9]), listen(button3, "click", /*handlePasteSnapshot*/ctx[10]), listen(button4, "click", function () {
          if (is_function( /*onClose*/ctx[0])) /*onClose*/ctx[0].apply(this, arguments);
        }), listen(input, "change", /*handleFileSelected*/ctx[13])];
        mounted = true;
      }
    },
    p(new_ctx, _ref) {
      let [dirty] = _ref;
      ctx = new_ctx;
      const pastemodal_changes = {};
      if (dirty & /*modalOpen*/32) pastemodal_changes.isOpen = /*modalOpen*/ctx[5];
      pastemodal.$set(pastemodal_changes);
      const tabsmenu_changes = {};
      if (dirty & /*openTab*/2) tabsmenu_changes.active = /*openTab*/ctx[1];
      tabsmenu.$set(tabsmenu_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index !== previous_block_index) {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }
        transition_in(if_block, 1);
        if_block.m(div2, null);
      }
      if (!current || dirty & /*dockTop, dockHeight*/12 && div3_style_value !== (div3_style_value = "top: ".concat( /*dockTop*/ctx[2], "%; height: ").concat( /*dockHeight*/ctx[3], "%;"))) {
        attr(div3, "style", div3_style_value);
      }
    },
    i(local) {
      if (current) return;
      transition_in(pastemodal.$$.fragment, local);
      transition_in(tabsmenu.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(pastemodal.$$.fragment, local);
      transition_out(tabsmenu.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
      }
      destroy_component(pastemodal);
      /*input_binding*/
      ctx[15](null);
      destroy_component(tabsmenu);
      if_blocks[current_block_type_index].d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let {
    onClose
  } = $$props;
  const {
    view
  } = getContext('editor-view');
  let openTab = 'state',
    dockTop = 50,
    dockHeight = 50,
    fileinput,
    modalOpen = false;
  onDestroy(() => {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
  });
  function handleResizeMouseDown() {
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
  }
  function dragMove(evt) {
    evt.preventDefault();
    $$invalidate(2, dockTop = 100 * evt.clientY / window.innerHeight);
    $$invalidate(3, dockHeight = 100 * (1 - evt.clientY / window.innerHeight));
  }
  function dragEnd(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
  }
  function handleCopyDoc() {
    navigator.clipboard.writeText(JSON.stringify(view.state.doc.toJSON()));
  }
  function handleSaveSnapshot() {
    const defaultName = new Date().toLocaleString('sv');
    const snapshotName = prompt('Enter snapshot name', defaultName);
    if (snapshotName) {
      saveSnapshot(snapshotName, view.state.doc.toJSON());
    }
  }
  function handleImportSnapshot() {
    fileinput.click();
  }
  function handlePasteSnapshot() {
    $$invalidate(5, modalOpen = !modalOpen);
  }
  function handleCloseModal() {
    $$invalidate(5, modalOpen = false);
  }
  function handlePasteSubmit(e) {
    const snap = saveSnapshot(new Date().toLocaleString('sv'), e.detail.doc);
    restoreSnapshot(view, snap);
    $$invalidate(5, modalOpen = false);
  }
  function handleFileSelected(e) {
    Array.from(e.currentTarget.files || []).forEach(file => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        var _a, _b;
        const data = typeof ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) === 'string' ? (_b = e.target) === null || _b === void 0 ? void 0 : _b.result : '';
        try {
          const json = JSON.parse(data);
          if (!json || typeof json !== 'object') {
            throw Error('Imported snapshot was not a JSON object' + json);
          }
          const name = file.name.slice(0, file.name.lastIndexOf('.'));
          importSnapshot(name, json, view.state.schema);
        } catch (err) {
          console.error('Failed to import snapshot: ' + err);
        }
      };
    });
  }
  function handleClickTab(tab) {
    $$invalidate(1, openTab = tab);
  }
  function input_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      fileinput = $$value;
      $$invalidate(4, fileinput);
    });
  }
  $$self.$$set = $$props => {
    if ('onClose' in $$props) $$invalidate(0, onClose = $$props.onClose);
  };
  return [onClose, openTab, dockTop, dockHeight, fileinput, modalOpen, handleResizeMouseDown, handleCopyDoc, handleSaveSnapshot, handleImportSnapshot, handlePasteSnapshot, handleCloseModal, handlePasteSubmit, handleFileSelected, handleClickTab, input_binding];
}
class FloatingDock extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      onClose: 0
    }, add_css$1);
  }
}

/* src/components/DevTools.svelte generated by Svelte v4.2.15 */
function add_css(target) {
  append_styles(target, "svelte-pr6kw9", ".dev-tools.svelte-pr6kw9{font-family:var(--font-sans);font-size:var(--font-medium);font-weight:400;--font-sans:Helvetica Neue, Calibri Light, Roboto, sans-serif;--font-small:11px;--font-medium:13px;--font-large:16px;--height-tabs-menu:48px;--tree-view-font-family:\"Helvetica Neue\", \"Calibri Light\", Roboto, sans-serif;--tree-view-font-size:13px;--tree-view-left-indent:0.875em;--tree-view-line-height:1.1;--tree-view-key-margin-right:0.5em;--tree-view-base00:#363755;--tree-view-base01:#604d49;--tree-view-base02:#6d5a55;--tree-view-base03:#d1929b;--tree-view-base04:#b79f8d;--tree-view-base05:#f9f8f2;--tree-view-base06:#f7f4f1;--tree-view-base07:#faf8f5;--tree-view-base08:#fa3e7e;--tree-view-base09:#fd993c;--tree-view-base0A:#f6bf81;--tree-view-base0B:#b8e248;--tree-view-base0C:#b4efe4;--tree-view-base0D:#85d9ef;--tree-view-base0E:#be87ff;--tree-view-base0F:#d6724c}.dev-tools.svelte-pr6kw9 .svelte-tree-view *{box-sizing:border-box}.dev-tools.svelte-pr6kw9 .hidden{opacity:0;visibility:hidden}");
}

// (42:2) {:else}
function create_else_block(ctx) {
  let floatingbtn;
  let current;
  floatingbtn = new FloatingBtn({
    props: {
      buttonPosition: /*buttonPosition*/ctx[1]
    }
  });
  floatingbtn.$on("click", /*handleFloatingBtnClick*/ctx[2]);
  return {
    c() {
      create_component(floatingbtn.$$.fragment);
    },
    m(target, anchor) {
      mount_component(floatingbtn, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const floatingbtn_changes = {};
      if (dirty & /*buttonPosition*/2) floatingbtn_changes.buttonPosition = /*buttonPosition*/ctx[1];
      floatingbtn.$set(floatingbtn_changes);
    },
    i(local) {
      if (current) return;
      transition_in(floatingbtn.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(floatingbtn.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(floatingbtn, detaching);
    }
  };
}

// (40:2) {#if devToolsExpanded}
function create_if_block(ctx) {
  let floatingdock;
  let current;
  floatingdock = new FloatingDock({
    props: {
      onClose: /*handleFloatingDockClose*/ctx[3]
    }
  });
  return {
    c() {
      create_component(floatingdock.$$.fragment);
    },
    m(target, anchor) {
      mount_component(floatingdock, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(floatingdock.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(floatingdock.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(floatingdock, detaching);
    }
  };
}
function create_fragment(ctx) {
  let section;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*devToolsExpanded*/ctx[0]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      section = element("section");
      if_block.c();
      attr(section, "class", "dev-tools svelte-pr6kw9");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;
    },
    p(ctx, _ref) {
      let [dirty] = _ref;
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(section, null);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if_blocks[current_block_type_index].d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let {
    view,
    devToolsExpanded = false,
    buttonPosition = 'bottom-right'
  } = $$props;
  setContext('editor-view', {
    view,
    execCmd(cmd) {
      cmd(view.state, view.dispatch);
    },
    replaceEditorContent(state) {
      const tr = view.state.tr;
      tr.replaceWith(0, view.state.doc.nodeSize - 2, state.doc.content);
      view.dispatch(tr);
    }
  });
  onMount(() => {
    const html = document && document.querySelector('html');
    if (devToolsExpanded && html) {
      html.style.paddingBottom = '341px';
    }
  });
  function handleFloatingBtnClick() {
    $$invalidate(0, devToolsExpanded = true);
    const html = document && document.querySelector('html');
    if (html) {
      html.style.paddingBottom = '341px';
    }
  }
  function handleFloatingDockClose() {
    $$invalidate(0, devToolsExpanded = false);
    const html = document && document.querySelector('html');
    if (html) {
      html.style.paddingBottom = '';
    }
  }
  $$self.$$set = $$props => {
    if ('view' in $$props) $$invalidate(4, view = $$props.view);
    if ('devToolsExpanded' in $$props) $$invalidate(0, devToolsExpanded = $$props.devToolsExpanded);
    if ('buttonPosition' in $$props) $$invalidate(1, buttonPosition = $$props.buttonPosition);
  };
  return [devToolsExpanded, buttonPosition, handleFloatingBtnClick, handleFloatingDockClose, view];
}
class DevTools extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      view: 4,
      devToolsExpanded: 0,
      buttonPosition: 1
    }, add_css);
  }
}

let active = false, resetDispatch = undefined;
/**
 * Handler for dispatchTransaction that pushes trs to history and monkey patches applyTransaction
 *
 * Incase the editor already has a `dispatchTransaction` prop, oldDispatchFn is called but because
 * that function would also call state.apply we'd run apply multiple times, causing plugins to see
 * transactions often twice. So we monkey patch the `applyTransaction` method and apply some reflection
 * magic to maintain this-context as well as remove the patch if the transaction is somehow different
 * from the original.
 *
 * Why we have to monkey patch the method here and not once globally, is because the method is reset
 * to the original by ProseMirror at times so the function would not get called. Proxying `view.state.applyTransaction`
 * didn't also work.
 *
 * The other option is to use Plugins to store the transactions https://github.com/TeemuKoivisto/prosemirror-dev-toolkit/pull/15
 * which we'll revert to incase this one doesn't cover all the cases.
 * @param view
 * @param oldDispatchFn
 * @returns
 */
const handleDispatch = (view, oldDispatchFn) => (tr) => {
    const stateBeforeDispatch = view.state;
    const applied = view.state.applyTransaction(tr);
    if (oldDispatchFn) {
        const oldFn = view.state.applyTransaction.bind(view.state);
        view.state.applyTransaction = function (trr) {
            if (trr !== tr) {
                view.state.applyTransaction = oldFn;
                return Reflect.apply(oldFn, view.state, arguments);
            }
            return applied;
        };
        oldDispatchFn(tr);
    }
    else {
        view.updateState(applied.state);
    }
    // If a plugin filtered a transaction, this would be an empty array
    if (active && applied.transactions.length > 0) {
        appendNewHistoryEntry(applied.transactions, view.state, stateBeforeDispatch);
    }
};
function subscribeToDispatchTransaction(view) {
    var _a;
    active = true;
    // People at times do all kinds of crazy things with EditorView eg extending it with a custom class.
    // This can cause various bugs, for example it can override props setter. Because I don't get points from
    // being right I'll just save them from their own silliness by checking also private _props
    // @ts-ignore
    const oldDispatchFn = (_a = (view.props || view._props).dispatchTransaction) === null || _a === void 0 ? void 0 : _a.bind(view);
    view.setProps({
        dispatchTransaction: handleDispatch(view, oldDispatchFn)
    });
    resetDispatch = () => view.setProps({ dispatchTransaction: oldDispatchFn });
}
function unsubscribeDispatchTransaction() {
    active = false;
    resetDispatch && resetDispatch();
    resetDispatch = undefined;
}

const DEVTOOLS_CSS_CLASS = '__prosemirror-dev-toolkit__';
function createOrFindPlace() {
    let place = document.querySelector(`.${DEVTOOLS_CSS_CLASS}`);
    if (!place) {
        place = document.createElement('div');
        place.className = DEVTOOLS_CSS_CLASS;
        document.body.appendChild(place);
    }
    return place;
}

// Inspired by https://www.colorglare.com/svelte-components-as-web-components-b400d1253504
// Using a web component allows toolkit to encapsulate its DOM and CSS styles without affecting
// the site or being affected by its global stylesheets
class ProseMirrorDevToolkit extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.addEventListener('init-dev-toolkit', (event) => {
            const { detail: { view, opts } } = event;
            this.component = new DevTools({
                target: shadowRoot,
                props: Object.assign({ view }, opts)
            });
        });
    }
    disconnectedCallback() {
        var _a;
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.$destroy();
    }
}

// Register the fancy web component wrapper but don't crash if it's already defined
if (!customElements.get('prosemirror-dev-toolkit')) {
    customElements.define('prosemirror-dev-toolkit', ProseMirrorDevToolkit);
}
// Make the dev tools available globally for testing and other use
if (typeof window !== 'undefined')
    window.applyDevTools = applyDevTools;
let removeCallback;
/**
 * Applies devTools to the given EditorView.
 *
 * Will remove previous devTools instance first, then subscribes to the view's
 * transactions by adding a dispatchTransaction prop. If previous dispatchTransaction
 * prop exists, passes the transaction to it. Otherwise updates the state as normal.
 * Will destroy itself whenever view is destroyed or removeDevTools() is called.
 * @param view
 * @param opts
 */
function applyDevTools(view, opts = {}) {
    const place = createOrFindPlace();
    removeDevTools();
    // Sometimes when applyDevTools is run with hot module reload, it's accidentally executed on already destroyed EditorViews
    if (view.isDestroyed)
        return;
    let comp;
    const { disableWebComponent } = opts, filteredOpts = __rest(opts, ["disableWebComponent"]);
    if (disableWebComponent) {
        // Mainly for testing purposes since shadow DOM quite annoyingly hides all of its contents in the test snapshots
        comp = new DevTools({
            target: place,
            props: Object.assign({ view }, filteredOpts)
        });
    }
    else {
        const newTools = document.createElement('prosemirror-dev-toolkit');
        newTools.dispatchEvent(new CustomEvent('init-dev-toolkit', {
            detail: { view, opts: filteredOpts }
        }));
        place.appendChild(newTools);
    }
    if (typeof window !== 'undefined') {
        // Add editorView to the window for testing and debugging purposes
        window.editorView = view;
        // Also a helper method to execute commands
        window.pmCmd = (cmd) => {
            const state = view.state;
            return cmd(state, view.dispatch, view);
        };
    }
    // Bind the component's life-cycle to the editorView to automatically unmount the devTools
    const oldDestroyFn = view.destroy.bind(view);
    view.destroy = () => {
        // DevTools must always be removed before view as the resetDispatch requires view to be still present
        removeDevTools();
        oldDestroyFn();
    };
    subscribeToDispatchTransaction(view);
    removeCallback = () => {
        resetHistory();
        unsubscribeDispatchTransaction();
        comp === null || comp === void 0 ? void 0 : comp.$destroy();
        const el = place.firstChild;
        el && place.removeChild(el);
    };
}
function removeDevTools() {
    removeCallback && removeCallback();
    removeCallback = undefined;
}


//# sourceMappingURL=index.js.map


/***/ })

}]);
//# sourceMappingURL=3d35b88c.448443f5adffa5b9.js.map