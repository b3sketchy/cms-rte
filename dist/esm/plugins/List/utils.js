import { BLOCKS } from '@contentful/rich-text-types';
import { isText, getCommonNode, isRangeExpanded, getRangeEdges, getChildren, getAboveNode, getBlockAbove, getParentNode } from '../../internal/queries';
import { insertNodes, removeNodes, wrapNodes } from '../../internal/transforms';
const isList = (node)=>[
        BLOCKS.OL_LIST,
        BLOCKS.UL_LIST
    ].includes(node.type);
export const hasListAsDirectParent = (editor, [, path])=>{
    const [parentNode] = getParentNode(editor, path) || [];
    return isList(parentNode);
};
const getNearestListAncestor = (editor, path)=>{
    return getAboveNode(editor, {
        at: path,
        mode: 'lowest',
        match: isList
    }) || [];
};
/**
 * Places orphaned list items in a list. If there's a list somewhere
 * in the node's ancestors, defaults to that list type, else places
 * the list item in an unordered list.
 */ export const normalizeOrphanedListItem = (editor, [, path])=>{
    const [parentList] = getNearestListAncestor(editor, path);
    const parentListType = parentList?.type;
    wrapNodes(editor, {
        type: parentListType || BLOCKS.UL_LIST,
        children: [],
        data: {}
    }, {
        at: path
    });
};
export const isNonEmptyListItem = (_, entry)=>{
    const listItemChildren = getChildren(entry);
    return listItemChildren.length !== 0;
};
export const firstNodeIsNotList = (_editor, [node])=>{
    if (node.children.length === 1) {
        const firstNode = node.children[0];
        return !isText(firstNode) && !isList(firstNode);
    }
    return true;
};
export const insertParagraphAsChild = (editor, [, path])=>{
    insertNodes(editor, [
        {
            type: BLOCKS.PARAGRAPH,
            data: {},
            children: [
                {
                    text: ''
                }
            ]
        }
    ], {
        at: path.concat([
            0
        ])
    });
};
export const replaceNodeWithListItems = (editor, entry)=>{
    const [node, path] = entry;
    removeNodes(editor, {
        at: path
    });
    insertNodes(editor, node.children[0].children, {
        at: path
    });
};
export const isListTypeActive = (editor, type)=>{
    const { selection } = editor;
    if (!selection) {
        return false;
    }
    if (isRangeExpanded(selection)) {
        const [start, end] = getRangeEdges(selection);
        const node = getCommonNode(editor, start.path, end.path);
        if (node[0].type === type) {
            return true;
        }
    }
    // Lists can be nested. Here, we take the list type at the lowest level
    const listNode = getBlockAbove(editor, {
        match: {
            type: [
                BLOCKS.OL_LIST,
                BLOCKS.UL_LIST
            ]
        },
        mode: 'lowest'
    });
    return listNode?.[0].type === type;
};
