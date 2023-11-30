(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./withNormalizer"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./withNormalizer"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createNormalizerPlugin = {}, global.withNormalizer);
})(this, function(exports, _withNormalizer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createNormalizerPlugin", {
        enumerable: true,
        get: function() {
            return createNormalizerPlugin;
        }
    });
    const createNormalizerPlugin = ()=>({
            key: 'NormalizerPlugin',
            withOverrides: _withNormalizer.withNormalizer
        });
});
