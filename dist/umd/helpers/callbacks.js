/* eslint-disable @typescript-eslint/no-explicit-any */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/contentful-slatejs-adapter"), require("lodash/debounce"), require("../constants/Schema"), require("./removeInternalMarks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/contentful-slatejs-adapter",
        "lodash/debounce",
        "../constants/Schema",
        "./removeInternalMarks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.callbacks = {}, global.contentfulSlatejsAdapter, global.debounce, global.schema, global.removeInternalMarks);
})(this, function(exports, _contentfulslatejsadapter, _debounce, _Schema, _removeInternalMarks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createOnChangeCallback", {
        enumerable: true,
        get: function() {
            return createOnChangeCallback;
        }
    });
    _debounce = /*#__PURE__*/ _interop_require_default(_debounce);
    _Schema = /*#__PURE__*/ _interop_require_default(_Schema);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const createOnChangeCallback = (handler)=>(0, _debounce.default)((document)=>{
            const doc = (0, _removeInternalMarks.removeInternalMarks)((0, _contentfulslatejsadapter.toContentfulDocument)({
                document: document,
                schema: _Schema.default
            }));
            const cleanedDocument = (0, _removeInternalMarks.removeInternalMarks)(doc);
            handler?.(cleanedDocument);
        }, 500);
});
