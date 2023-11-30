(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./components/ToolbarHeadingButton"), require("./createHeadingPlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./components/ToolbarHeadingButton",
        "./createHeadingPlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.toolbarHeadingButton, global.createHeadingPlugin);
})(this, function(exports, _ToolbarHeadingButton, _createHeadingPlugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_ToolbarHeadingButton, exports);
    _export_star(_createHeadingPlugin, exports);
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
