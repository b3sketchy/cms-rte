(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./createTextPlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./createTextPlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.createTextPlugin);
})(this, function(exports, _createTextPlugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_createTextPlugin, exports);
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
