/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ import { TEXT_CONTAINERS, BLOCKS } from '@contentful/rich-text-types';
import { findNode } from '@udecode/plate-common';
import { isBlockNode, isAncestorPath, getCommonNode, getNodeTexts, getParentPath, getDescendantNodeByPath } from '../../internal/queries';
import { insertNodes } from '../../internal/transforms';
const getFirstAncestorOfType = (root, entry)=>{
    let ancestor = getParentPath(entry[1]);
    while(getDescendantNodeByPath(root, ancestor).type !== BLOCKS.LIST_ITEM){
        ancestor = getParentPath(ancestor);
    }
    return [
        getDescendantNodeByPath(root, ancestor),
        ancestor
    ];
};
const isListRoot = (node)=>[
        BLOCKS.UL_LIST,
        BLOCKS.OL_LIST
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
    const textEntries = Array.from(getNodeTexts(listRoot));
    const commonAncestorEntry = textEntries.reduce((commonAncestor, textEntry)=>isAncestorPath(commonAncestor[1], textEntry[1]) ? commonAncestor : getCommonNode(listRoot, textEntry[1], commonAncestor[1]), // any list item would do, we grab the first one
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
    if (node.type !== BLOCKS.LIST_ITEM || node.children.length !== 1) {
        return nodes;
    }
    return node.children;
};
const unwrapTextContainerAtStart = (nodes)=>{
    const node = nodes[0];
    if (TEXT_CONTAINERS.includes(node.type)) {
        return [
            ...node.children,
            ...nodes.slice(1)
        ];
    }
    return nodes;
};
export const insertListFragment = (editor)=>{
    const { insertFragment } = editor;
    return (fragment)=>{
        if (!editor.selection) {
            return;
        }
        const liEntry = findNode(editor, {
            match: {
                type: BLOCKS.LIST_ITEM
            },
            mode: 'lowest'
        });
        if (liEntry) {
            const nodes = unwrapTextContainerAtStart(trimLiWrapper(fragment.flatMap((node)=>trimList(node))));
            let firstBlockIndex = nodes.findIndex((node)=>isBlockNode(editor, node));
            if (firstBlockIndex < 0) {
                firstBlockIndex = nodes.length;
            }
            const inlines = nodes.slice(0, firstBlockIndex);
            const blocks = nodes.slice(firstBlockIndex);
            // Two calls to insertNodes are required here. Otherwise, all blocks
            // after a text or inline element occurrence will be unwrapped for
            // some reason.
            insertNodes(editor, inlines, {
                at: editor.selection,
                select: true
            });
            return insertNodes(editor, blocks, {
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
