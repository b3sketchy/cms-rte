(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./createQuotePlugin"), require("./components/ToolbarQuoteButton"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./createQuotePlugin",
        "./components/ToolbarQuoteButton"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.createQuotePlugin, global.toolbarQuoteButton);
})(this, function(exports, _createQuotePlugin, _ToolbarQuoteButton) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_createQuotePlugin, exports);
    _export_star(_ToolbarQuoteButton, exports);
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
