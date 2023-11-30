(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./createCommandPalettePlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./createCommandPalettePlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.createCommandPalettePlugin);
})(this, function(exports, _createCommandPalettePlugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createCommandPalettePlugin", {
        enumerable: true,
        get: function() {
            return _createCommandPalettePlugin.createCommandPalettePlugin;
        }
    });
});
