(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./createListPlugin"), require("./components/ToolbarListButton"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./createListPlugin",
        "./components/ToolbarListButton"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.createListPlugin, global.toolbarListButton);
})(this, function(exports, _createListPlugin, _ToolbarListButton) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_createListPlugin, exports);
    _export_star(_ToolbarListButton, exports);
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
