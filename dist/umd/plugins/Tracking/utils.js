(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/contentful-slatejs-adapter"), require("@contentful/rich-text-plain-text-renderer"), require("../../constants/Schema"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/contentful-slatejs-adapter",
        "@contentful/rich-text-plain-text-renderer",
        "../../constants/Schema"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.utils = {}, global.contentfulSlatejsAdapter, global.richTextPlainTextRenderer, global.schema);
})(this, function(exports, _contentfulslatejsadapter, _richtextplaintextrenderer, _Schema) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "getCharacterCount", {
        enumerable: true,
        get: function() {
            return getCharacterCount;
        }
    });
    _contentfulslatejsadapter = /*#__PURE__*/ _interop_require_wildcard(_contentfulslatejsadapter);
    _Schema = /*#__PURE__*/ _interop_require_default(_Schema);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _getRequireWildcardCache(nodeInterop) {
        if (typeof WeakMap !== "function") return null;
        var cacheBabelInterop = new WeakMap();
        var cacheNodeInterop = new WeakMap();
        return (_getRequireWildcardCache = function(nodeInterop) {
            return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
    }
    function _interop_require_wildcard(obj, nodeInterop) {
        if (!nodeInterop && obj && obj.__esModule) {
            return obj;
        }
        if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
            return {
                default: obj
            };
        }
        var cache = _getRequireWildcardCache(nodeInterop);
        if (cache && cache.has(obj)) {
            return cache.get(obj);
        }
        var newObj = {
            __proto__: null
        };
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for(var key in obj){
            if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                    Object.defineProperty(newObj, key, desc);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }
        newObj.default = obj;
        if (cache) {
            cache.set(obj, newObj);
        }
        return newObj;
    }
    function getCharacterCount(editor) {
        const document = _contentfulslatejsadapter.toContentfulDocument({
            // eslint-disable-next-line -- parameter type is not exported @typescript-eslint/no-explicit-any
            document: editor.children,
            schema: _Schema.default
        });
        return (0, _richtextplaintextrenderer.documentToPlainTextString)(document).length;
    }
});
