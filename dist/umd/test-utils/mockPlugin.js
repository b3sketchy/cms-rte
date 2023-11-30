(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@udecode/plate-common"), require("./randomId"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@udecode/plate-common",
        "./randomId"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.mockPlugin = {}, global.plateCommon, global.randomId);
})(this, function(exports, _platecommon, _randomId) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "mockPlugin", {
        enumerable: true,
        get: function() {
            return mockPlugin;
        }
    });
    const mockPlugin = (p)=>(0, _platecommon.mockPlugin)({
            ...p,
            key: p.key || (0, _randomId.randomId)('plugin')
        });
});
