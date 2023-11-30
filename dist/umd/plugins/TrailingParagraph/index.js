(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-trailing-block"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-trailing-block"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.richTextTypes, global.plateTrailingBlock);
})(this, function(exports, _richtexttypes, _platetrailingblock) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createTrailingParagraphPlugin", {
        enumerable: true,
        get: function() {
            return createTrailingParagraphPlugin;
        }
    });
    const createTrailingParagraphPlugin = ()=>{
        return (0, _platetrailingblock.createTrailingBlockPlugin)({
            options: {
                type: _richtexttypes.BLOCKS.PARAGRAPH,
                level: 0
            }
        });
    };
});
