(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./addRow"), require("./addColumn"), require("./setHeader"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./addRow",
        "./addColumn",
        "./setHeader"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.addRow, global.addColumn, global.setHeader);
})(this, function(exports, _addRow, _addColumn, _setHeader) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_addRow, exports);
    _export_star(_addColumn, exports);
    _export_star(_setHeader, exports);
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
