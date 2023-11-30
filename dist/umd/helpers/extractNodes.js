(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../internal/queries"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../internal/queries"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.extractNodes = {}, global.richTextTypes, global.queries);
})(this, function(exports, _richtexttypes, _queries) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "extractParagraphs", {
        enumerable: true,
        get: function() {
            return extractParagraphs;
        }
    });
    function extractNodes(editor, path, match) {
        return Array.from((0, _queries.getNodeEntries)(editor, {
            match,
            at: path,
            mode: 'lowest'
        })).map(([node])=>node);
    }
    function extractParagraphs(editor, path) {
        return extractNodes(editor, path, {
            type: _richtexttypes.TEXT_CONTAINERS
        }).map((node)=>({
                ...node,
                type: _richtexttypes.BLOCKS.PARAGRAPH
            }));
    }
});
