/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../../../internal"), require("../../../internal/queries"), require("../../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../../../internal",
        "../../../internal/queries",
        "../../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.unwrapList = {}, global.richTextTypes, global.internal, global.queries, global.transforms);
})(this, function(exports, _richtexttypes, _internal, _queries, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "unwrapList", {
        enumerable: true,
        get: function() {
            return unwrapList;
        }
    });
    function hasUnliftedListItems(editor, at) {
        return (0, _queries.getNodeEntries)(editor, {
            at,
            match: (node, path)=>(0, _queries.isElement)(node) && node.type === _richtexttypes.BLOCKS.LIST_ITEM && path.length >= 2
        }).next().done;
    }
    const unwrapList = (editor, { at } = {})=>{
        (0, _internal.withoutNormalizing)(editor, ()=>{
            do {
                // lift list items to the root level
                (0, _transforms.liftNodes)(editor, {
                    at,
                    match: (node)=>(0, _queries.isElement)(node) && node.type === _richtexttypes.BLOCKS.LIST_ITEM,
                    mode: 'lowest'
                });
            }while (!hasUnliftedListItems(editor, at))
            // finally unwrap all lifted items
            (0, _transforms.unwrapNodes)(editor, {
                at,
                match: {
                    type: _richtexttypes.BLOCKS.LIST_ITEM
                },
                split: false
            });
        });
    };
});
