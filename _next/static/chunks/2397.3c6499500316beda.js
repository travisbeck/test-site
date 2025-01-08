"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[2397],{

/***/ 22397:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tiktoken: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.Tiktoken; },
/* harmony export */   __wbg_parse_3ac95b51fc312db8: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbg_parse_3ac95b51fc312db8; },
/* harmony export */   __wbg_set_wasm: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_wasm; },
/* harmony export */   __wbg_stringify_029a979dfb73aa17: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbg_stringify_029a979dfb73aa17; },
/* harmony export */   __wbindgen_error_new: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_error_new; },
/* harmony export */   __wbindgen_is_undefined: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_is_undefined; },
/* harmony export */   __wbindgen_object_drop_ref: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_object_drop_ref; },
/* harmony export */   __wbindgen_string_get: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_string_get; },
/* harmony export */   __wbindgen_throw: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_throw; },
/* harmony export */   encoding_for_model: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.encoding_for_model; },
/* harmony export */   get_encoding: function() { return /* reexport safe */ _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.get_encoding; },
/* harmony export */   init: function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31367);
// @ts-expect-error

let isInitialized = false;
async function init(callback) {
    if (isInitialized)
        return _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__;
    const result = await callback({ "./tiktoken_bg.js": _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__ });
    const instance = "instance" in result && result.instance instanceof WebAssembly.Instance
        ? result.instance
        : result instanceof WebAssembly.Instance
            ? result
            : null;
    if (instance == null)
        throw new Error("Missing instance");
    _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_wasm(instance.exports);
    isInitialized = true;
    return _tiktoken_bg__WEBPACK_IMPORTED_MODULE_0__;
}
// @ts-expect-error



/***/ }),

/***/ 31367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tiktoken: function() { return /* binding */ Tiktoken; },
/* harmony export */   __wbg_parse_3ac95b51fc312db8: function() { return /* binding */ __wbg_parse_3ac95b51fc312db8; },
/* harmony export */   __wbg_set_wasm: function() { return /* binding */ __wbg_set_wasm; },
/* harmony export */   __wbg_stringify_029a979dfb73aa17: function() { return /* binding */ __wbg_stringify_029a979dfb73aa17; },
/* harmony export */   __wbindgen_error_new: function() { return /* binding */ __wbindgen_error_new; },
/* harmony export */   __wbindgen_is_undefined: function() { return /* binding */ __wbindgen_is_undefined; },
/* harmony export */   __wbindgen_object_drop_ref: function() { return /* binding */ __wbindgen_object_drop_ref; },
/* harmony export */   __wbindgen_string_get: function() { return /* binding */ __wbindgen_string_get; },
/* harmony export */   __wbindgen_throw: function() { return /* binding */ __wbindgen_throw; },
/* harmony export */   encoding_for_model: function() { return /* binding */ encoding_for_model; },
/* harmony export */   get_encoding: function() { return /* binding */ get_encoding; }
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
let wasm;
function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getArrayU32FromWasm0(ptr, len) {
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {string} encoding
* @param {any} extend_special_tokens
* @returns {Tiktoken}
*/
function get_encoding(encoding, extend_special_tokens) {
    if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(encoding, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        wasm.get_encoding(retptr, ptr0, len0, addHeapObject(extend_special_tokens));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return Tiktoken.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* @param {string} model
* @param {any} extend_special_tokens
* @returns {Tiktoken}
*/
function encoding_for_model(model, extend_special_tokens) {
    if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(model, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        wasm.encoding_for_model(retptr, ptr0, len0, addHeapObject(extend_special_tokens));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return Tiktoken.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export_3(addHeapObject(e));
    }
}
/**
*/
class Tiktoken {

    static __wrap(ptr) {
        const obj = Object.create(Tiktoken.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tiktoken_free(ptr);
    }
    /**
    * @param {string} tiktoken_bfe
    * @param {any} special_tokens
    * @param {string} pat_str
    */
    constructor(tiktoken_bfe, special_tokens, pat_str) {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        const ptr0 = passStringToWasm0(tiktoken_bfe, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(pat_str, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.tiktoken_new(ptr0, len0, addHeapObject(special_tokens), ptr1, len1);
        return Tiktoken.__wrap(ret);
    }
    /**
    * @returns {string | undefined}
    */
    get name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tiktoken_name(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v0;
            if (r0 !== 0) {
                v0 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_export_2(r0, r1 * 1);
            }
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} text
    * @param {any} allowed_special
    * @param {any} disallowed_special
    * @returns {Uint32Array}
    */
    encode(text, allowed_special, disallowed_special) {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            const len0 = WASM_VECTOR_LEN;
            wasm.tiktoken_encode(retptr, this.ptr, ptr0, len0, addHeapObject(allowed_special), addHeapObject(disallowed_special));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} text
    * @returns {Uint32Array}
    */
    encode_ordinary(text) {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            const len0 = WASM_VECTOR_LEN;
            wasm.tiktoken_encode_ordinary(retptr, this.ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} text
    * @param {any} allowed_special
    * @param {any} disallowed_special
    * @returns {any}
    */
    encode_with_unstable(text, allowed_special, disallowed_special) {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            const len0 = WASM_VECTOR_LEN;
            wasm.tiktoken_encode_with_unstable(retptr, this.ptr, ptr0, len0, addHeapObject(allowed_special), addHeapObject(disallowed_special));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {number}
    */
    encode_single_token(bytes) {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export_0);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.tiktoken_encode_single_token(this.ptr, ptr0, len0);
        return ret >>> 0;
    }
    /**
    * @param {Uint32Array} tokens
    * @returns {Uint8Array}
    */
    decode(tokens) {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray32ToWasm0(tokens, wasm.__wbindgen_export_0);
            const len0 = WASM_VECTOR_LEN;
            wasm.tiktoken_decode(retptr, this.ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} token
    * @returns {Uint8Array}
    */
    decode_single_token_bytes(token) {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tiktoken_decode_single_token_bytes(retptr, this.ptr, token);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    token_byte_values() {
        if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
        const ret = wasm.tiktoken_token_byte_values(this.ptr);
        return takeObject(ret);
    }
}

function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

function __wbg_stringify_029a979dfb73aa17() { return handleError(function (arg0) {
    const ret = JSON.stringify(getObject(arg0));
    return addHeapObject(ret);
}, arguments) };

function __wbindgen_string_get(arg0, arg1) {
    if (wasm == null) throw new Error("@dqbd/tiktoken: WASM binary has not been propery initialized.");
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbindgen_error_new(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

function __wbg_parse_3ac95b51fc312db8() { return handleError(function (arg0, arg1) {
    const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
}, arguments) };

function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};



/***/ })

}]);
//# sourceMappingURL=2397.3c6499500316beda.js.map