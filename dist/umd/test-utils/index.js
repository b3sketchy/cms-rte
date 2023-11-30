(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./jsx"), require("./createEditor"), require("./mockPlugin"), require("./assertOutput"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./jsx",
        "./createEditor",
        "./mockPlugin",
        "./assertOutput"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.jsx, global.createEditor, global.mockPlugin, global.assertOutput);
})(this, function(exports, _jsx, _createEditor, _mockPlugin, _assertOutput) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_jsx, exports);
    _export_star(_createEditor, exports);
    _export_star(_mockPlugin, exports);
    _export_star(_assertOutput, exports);
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
