/**
 * Credit: Copied & modified version from Plate's list plugin to support
 * list items with multiple children.
 *
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ import { TEXT_CONTAINERS } from '@contentful/rich-text-types';
import { ELEMENT_DEFAULT, getPluginType, isBlockAboveEmpty, mockPlugin } from '@udecode/plate-common';
import { getListItemEntry, moveListItemUp, unwrapList, ELEMENT_LI } from '@udecode/plate-list';
import { onKeyDownResetNode, SIMULATE_BACKSPACE } from '@udecode/plate-reset-node';
import { insertListItem } from './transforms/insertListItem';
const listBreak = (editor)=>{
    if (!editor.selection) return false;
    const res = getListItemEntry(editor, {});
    let moved;
    // If selection is in a li
    if (res) {
        const { list, listItem } = res;
        const childNode = listItem[0].children[0];
        // If selected li is empty, move it up.
        if (isBlockAboveEmpty(editor) && listItem[0].children.length === 1 && TEXT_CONTAINERS.includes(childNode.type)) {
            moved = moveListItemUp(editor, {
                list,
                listItem
            });
            if (moved) return true;
        }
    }
    const didReset = onKeyDownResetNode(editor, mockPlugin({
        options: {
            rules: [
                {
                    types: [
                        getPluginType(editor, ELEMENT_LI)
                    ],
                    defaultType: getPluginType(editor, ELEMENT_DEFAULT),
                    predicate: ()=>!moved && isBlockAboveEmpty(editor),
                    onReset: (_editor)=>unwrapList(_editor)
                }
            ]
        }
    }))(SIMULATE_BACKSPACE);
    if (didReset) {
        return true;
    }
    /**
   * If selection is in li > p, insert li.
   */ if (!moved) {
        const inserted = insertListItem(editor);
        if (inserted) return true;
    }
    return false;
};
export const insertListBreak = (editor)=>{
    const { insertBreak } = editor;
    return ()=>{
        if (listBreak(editor)) return;
        insertBreak();
    };
};
