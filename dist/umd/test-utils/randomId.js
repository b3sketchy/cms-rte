/**
 * Used to guarantee a unique editor and plugin keys for tests.
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.randomId = {});
})(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "randomId", {
        enumerable: true,
        get: function() {
            return randomId;
        }
    });
    const randomId = (prefix = '')=>{
        return `${prefix}-${(Math.random() + 1).toString(36).substring(10)}`;
    };
});
