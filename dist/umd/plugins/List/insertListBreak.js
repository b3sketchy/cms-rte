/**
 * Credit: Copied & modified version from Plate's list plugin to support
 * list items with multiple children.
 *
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-common"), require("@udecode/plate-list"), require("@udecode/plate-reset-node"), require("./transforms/insertListItem"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-common",
        "@udecode/plate-list",
        "@udecode/plate-reset-node",
        "./transforms/insertListItem"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.insertListBreak = {}, global.richTextTypes, global.plateCommon, global.plateList, global.plateResetNode, global.insertListItem);
})(this, function(exports, _richtexttypes, _platecommon, _platelist, _plateresetnode, _insertListItem) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "insertListBreak", {
        enumerable: true,
        get: function() {
            return insertListBreak;
        }
    });
    const listBreak = (editor)=>{
        if (!editor.selection) return false;
        const res = (0, _platelist.getListItemEntry)(editor, {});
        let moved;
        // If selection is in a li
        if (res) {
            const { list, listItem } = res;
            const childNode = listItem[0].children[0];
            // If selected li is empty, move it up.
            if ((0, _platecommon.isBlockAboveEmpty)(editor) && listItem[0].children.length === 1 && _richtexttypes.TEXT_CONTAINERS.includes(childNode.type)) {
                moved = (0, _platelist.moveListItemUp)(editor, {
                    list,
                    listItem
                });
                if (moved) return true;
            }
        }
        const didReset = (0, _plateresetnode.onKeyDownResetNode)(editor, (0, _platecommon.mockPlugin)({
            options: {
                rules: [
                    {
                        types: [
                            (0, _platecommon.getPluginType)(editor, _platelist.ELEMENT_LI)
                        ],
                        defaultType: (0, _platecommon.getPluginType)(editor, _platecommon.ELEMENT_DEFAULT),
                        predicate: ()=>!moved && (0, _platecommon.isBlockAboveEmpty)(editor),
                        onReset: (_editor)=>(0, _platelist.unwrapList)(_editor)
                    }
                ]
            }
        }))(_plateresetnode.SIMULATE_BACKSPACE);
        if (didReset) {
            return true;
        }
        /**
   * If selection is in li > p, insert li.
   */ if (!moved) {
            const inserted = (0, _insertListItem.insertListItem)(editor);
            if (inserted) return true;
        }
        return false;
    };
    const insertListBreak = (editor)=>{
        const { insertBreak } = editor;
        return ()=>{
            if (listBreak(editor)) return;
            insertBreak();
        };
    };
});
