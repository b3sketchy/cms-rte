(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./createTablePlugin"), require("./components/ToolbarButton"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./createTablePlugin",
        "./components/ToolbarButton"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.createTablePlugin, global.toolbarButton);
})(this, function(exports, _createTablePlugin, _ToolbarButton) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_createTablePlugin, exports);
    _export_star(_ToolbarButton, exports);
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
