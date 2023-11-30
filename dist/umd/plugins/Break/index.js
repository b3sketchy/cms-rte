(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./createSoftBreakPlugin"), require("./createExitBreakPlugin"), require("./createResetNodePlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./createSoftBreakPlugin",
        "./createExitBreakPlugin",
        "./createResetNodePlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.createSoftBreakPlugin, global.createExitBreakPlugin, global.createResetNodePlugin);
})(this, function(exports, _createSoftBreakPlugin, _createExitBreakPlugin, _createResetNodePlugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_createSoftBreakPlugin, exports);
    _export_star(_createExitBreakPlugin, exports);
    _export_star(_createResetNodePlugin, exports);
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
