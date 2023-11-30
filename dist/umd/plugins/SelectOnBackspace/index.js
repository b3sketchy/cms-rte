(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./createSelectOnBackspacePlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./createSelectOnBackspacePlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.createSelectOnBackspacePlugin);
})(this, function(exports, _createSelectOnBackspacePlugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_createSelectOnBackspacePlugin, exports);
    function _export_star(from, to) {
        Object.keys(from).forEach(function(k) {
            if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
                Object.defineProperty(to, k, {
                    enumerable: true,
                    get: function() {
                        return from[k];
                    }
                });
            }
        });
        return from;
    }
});
