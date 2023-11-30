(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./createVoidsPlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./createVoidsPlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.createVoidsPlugin);
})(this, function(exports, _createVoidsPlugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_createVoidsPlugin, exports);
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
