/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ import { getListTypes } from '@udecode/plate-list';
import { withoutNormalizing } from '../../../internal';
import { getNodeEntry, getNodeChildren, getNextPath, getPreviousPath, getLastChildPath, match } from '../../../internal/queries';
import { wrapNodes, moveNodes } from '../../../internal/transforms';
export const moveListItemDown = (editor, { list, listItem })=>{
    const [listNode] = list;
    const [, listItemPath] = listItem;
    let previousListItemPath;
    try {
        previousListItemPath = getPreviousPath(listItemPath);
    } catch (e) {
        return;
    }
    // Previous sibling is the new parent
    const previousSiblingItem = getNodeEntry(editor, previousListItemPath);
    if (previousSiblingItem) {
        const [, previousPath] = previousSiblingItem;
        const subList = Array.from(getNodeChildren(editor, previousPath)).find(([n, path])=>match(n, path, {
                type: getListTypes(editor)
            }));
        const newPath = getNextPath(getLastChildPath(subList ?? previousSiblingItem));
        withoutNormalizing(editor, ()=>{
            if (!subList) {
                // Create new sub-list
                wrapNodes(editor, {
                    type: listNode.type,
                    children: [],
                    data: {}
                }, {
                    at: listItemPath
                });
            }
            // Move the current item to the sub-list
            moveNodes(editor, {
                at: listItemPath,
                to: newPath
            });
        });
    }
};
