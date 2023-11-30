(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./published_content_type.json"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./published_content_type.json"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.publishedContentTypeJson);
})(this, function(exports, _published_content_typejson) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "published", {
        enumerable: true,
        get: function() {
            return _published_content_typejson.default;
        }
    });
    _published_content_typejson = /*#__PURE__*/ _interop_require_default(_published_content_typejson);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
});
