/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-common"), require("../../internal/queries"), require("../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-common",
        "../../internal/queries",
        "../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.insertListFragment = {}, global.richTextTypes, global.plateCommon, global.queries, global.transforms);
})(this, function(exports, _richtexttypes, _platecommon, _queries, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "insertListFragment", {
        enumerable: true,
        get: function() {
            return insertListFragment;
        }
    });
    const getFirstAncestorOfType = (root, entry)=>{
        let ancestor = (0, _queries.getParentPath)(entry[1]);
        while((0, _queries.getDescendantNodeByPath)(root, ancestor).type !== _richtexttypes.BLOCKS.LIST_ITEM){
            ancestor = (0, _queries.getParentPath)(ancestor);
        }
        return [
            (0, _queries.getDescendantNodeByPath)(root, ancestor),
            ancestor
        ];
    };
    const isListRoot = (node)=>[
            _richtexttypes.BLOCKS.UL_LIST,
            _richtexttypes.BLOCKS.OL_LIST
        ].includes(node.type);
    /**
 * Removes the "empty" leading lis. Empty in this context means lis only with other lis as children.
 *
 * @returns If argument is not a list root, returns it, otherwise returns ul[] or li[].
 */ const trimList = (listRoot)=>{
        if (!isListRoot(listRoot)) {
            return [
                listRoot
            ];
        }
        const textEntries = Array.from((0, _queries.getNodeTexts)(listRoot));
        const commonAncestorEntry = textEntries.reduce((commonAncestor, textEntry)=>(0, _queries.isAncestorPath)(commonAncestor[1], textEntry[1]) ? commonAncestor : (0, _queries.getCommonNode)(listRoot, textEntry[1], commonAncestor[1]), // any list item would do, we grab the first one
        getFirstAncestorOfType(listRoot, textEntries[0]));
        return isListRoot(commonAncestorEntry[0]) ? commonAncestorEntry[0].children : [
            commonAncestorEntry[0]
        ];
    };
    /**
 * Removes leading li when pasting a single li with a single child.
 */ const trimLiWrapper = (nodes)=>{
        if (nodes.length !== 1) {
            return nodes;
        }
        const node = nodes[0];
        if (node.type !== _richtexttypes.BLOCKS.LIST_ITEM || node.children.length !== 1) {
            return nodes;
        }
        return node.children;
    };
    const unwrapTextContainerAtStart = (nodes)=>{
        const node = nodes[0];
        if (_richtexttypes.TEXT_CONTAINERS.includes(node.type)) {
            return [
                ...node.children,
                ...nodes.slice(1)
            ];
        }
        return nodes;
    };
    const insertListFragment = (editor)=>{
        const { insertFragment } = editor;
        return (fragment)=>{
            if (!editor.selection) {
                return;
            }
            const liEntry = (0, _platecommon.findNode)(editor, {
                match: {
                    type: _richtexttypes.BLOCKS.LIST_ITEM
                },
                mode: 'lowest'
            });
            if (liEntry) {
                const nodes = unwrapTextContainerAtStart(trimLiWrapper(fragment.flatMap((node)=>trimList(node))));
                let firstBlockIndex = nodes.findIndex((node)=>(0, _queries.isBlockNode)(editor, node));
                if (firstBlockIndex < 0) {
                    firstBlockIndex = nodes.length;
                }
                const inlines = nodes.slice(0, firstBlockIndex);
                const blocks = nodes.slice(firstBlockIndex);
                // Two calls to insertNodes are required here. Otherwise, all blocks
                // after a text or inline element occurrence will be unwrapped for
                // some reason.
                (0, _transforms.insertNodes)(editor, inlines, {
                    at: editor.selection,
                    select: true
                });
                return (0, _transforms.insertNodes)(editor, blocks, {
                    at: editor.selection,
                    select: true
                });
            }
            const filtered = isListRoot(fragment[0]) ? [
                {
                    text: ''
                },
                ...fragment
            ] : fragment;
            return insertFragment(filtered);
        };
    };
});
