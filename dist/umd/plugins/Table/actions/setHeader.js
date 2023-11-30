(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../../../internal/queries"), require("../../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../../../internal/queries",
        "../../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.setHeader = {}, global.richTextTypes, global.queries, global.transforms);
})(this, function(exports, _richtexttypes, _queries, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "setHeader", {
        enumerable: true,
        get: function() {
            return setHeader;
        }
    });
    const setHeader = (editor, enable)=>{
        const tableItem = (0, _queries.getAboveNode)(editor, {
            match: {
                type: _richtexttypes.BLOCKS.TABLE
            }
        });
        if (!tableItem) {
            return;
        }
        const firstRow = (0, _queries.getChildren)(tableItem)[0];
        if (!firstRow) {
            return;
        }
        (0, _queries.getChildren)(firstRow).forEach(([, path])=>{
            (0, _transforms.setNodes)(editor, {
                type: enable ? _richtexttypes.BLOCKS.TABLE_HEADER_CELL : _richtexttypes.BLOCKS.TABLE_CELL
            }, {
                at: path
            });
        });
    };
});
