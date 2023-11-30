(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../../helpers/editor"), require("../../helpers/transformers"), require("../../internal/queries"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../../helpers/editor",
        "../../helpers/transformers",
        "../../internal/queries"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.baseRules = {}, global.richTextTypes, global.editor, global.transformers, global.queries);
})(this, function(exports, _richtexttypes, _editor, _transformers, _queries) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "baseRules", {
        enumerable: true,
        get: function() {
            return baseRules;
        }
    });
    const isInline = (node)=>_editor.INLINE_TYPES.includes(node.type);
    const isTextContainer = (node)=>_richtexttypes.TEXT_CONTAINERS.includes(node.type);
    const baseRules = [
        {
            // Wrap orphaned text nodes in a paragraph
            match: _queries.isText,
            validNode: (editor, [, path])=>{
                const parent = (0, _queries.getParentNode)(editor, path)?.[0];
                return !!parent && (isTextContainer(parent) || isInline(parent) || editor.isVoid(parent));
            },
            transform: (editor, entry)=>{
                return (0, _transformers.transformWrapIn)(_richtexttypes.BLOCKS.PARAGRAPH)(editor, entry);
            }
        },
        {
            // Wrap orphaned inline nodes in a paragraph,
            match: {
                type: _editor.INLINE_TYPES
            },
            validNode: (editor, [, path])=>{
                const parent = (0, _queries.getParentNode)(editor, path)?.[0];
                return !!parent && isTextContainer(parent);
            },
            transform: (0, _transformers.transformWrapIn)(_richtexttypes.BLOCKS.PARAGRAPH)
        }
    ];
});
