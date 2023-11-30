/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-list"), require("./insertListBreak"), require("./insertListFragment"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-list",
        "./insertListBreak",
        "./insertListFragment"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.withList = {}, global.richTextTypes, global.plateList, global.insertListBreak, global.insertListFragment);
})(this, function(exports, _richtexttypes, _platelist, _insertListBreak, _insertListFragment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "withList", {
        enumerable: true,
        get: function() {
            return withList;
        }
    });
    const validLiChildrenTypes = _richtexttypes.LIST_ITEM_BLOCKS;
    const withList = (editor)=>{
        const { deleteForward, deleteFragment } = editor;
        editor.deleteForward = (unit)=>{
            if ((0, _platelist.deleteForwardList)(editor)) return;
            deleteForward(unit);
        };
        editor.deleteFragment = ()=>{
            if ((0, _platelist.deleteFragmentList)(editor)) return;
            deleteFragment();
        };
        editor.insertBreak = (0, _insertListBreak.insertListBreak)(editor);
        editor.insertFragment = (0, _insertListFragment.insertListFragment)(editor);
        // TODO: replace with our own Normalizer rules
        editor.normalizeNode = (0, _platelist.normalizeList)(editor, {
            validLiChildrenTypes
        });
        return editor;
    };
});
