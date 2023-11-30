/**
 * Trim leading slash character if found. Bails otherwise.
 *
 * @example
 * trimLeadingSlash("/my query") // --> "my query"
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.trimLeadingSlash = {});
})(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "trimLeadingSlash", {
        enumerable: true,
        get: function() {
            return trimLeadingSlash;
        }
    });
    function trimLeadingSlash(text) {
        if (!text.startsWith('/')) {
            return text;
        }
        return text.slice(1);
    }
});
