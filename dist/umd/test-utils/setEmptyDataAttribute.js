(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@udecode/plate-common"), require("slate"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@udecode/plate-common",
        "slate"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.setEmptyDataAttribute = {}, global.plateCommon, global.slate);
})(this, function(exports, _platecommon, _slate) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "setEmptyDataAttribute", {
        enumerable: true,
        get: function() {
            return setEmptyDataAttribute;
        }
    });
    const setEmptyDataAttribute = (root)=>{
        (0, _platecommon.setNodes)(root, {
            data: {}
        }, {
            at: [],
            match: (node)=>_slate.Element.isElement(node) && !node.data,
            mode: 'all'
        });
    };
});
