(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-select"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-select"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createSelectOnBackspacePlugin = {}, global.richTextTypes, global.plateSelect);
})(this, function(exports, _richtexttypes, _plateselect) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createSelectOnBackspacePlugin", {
        enumerable: true,
        get: function() {
            return createSelectOnBackspacePlugin;
        }
    });
    const createSelectOnBackspacePlugin = ()=>(0, _plateselect.createSelectOnBackspacePlugin)({
            options: {
                query: {
                    // `createTextPlugin` is taking care of block elements
                    allow: [
                        _richtexttypes.INLINES.EMBEDDED_ENTRY
                    ]
                }
            }
        });
});
