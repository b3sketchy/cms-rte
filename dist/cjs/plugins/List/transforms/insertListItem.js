"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "insertListItem", {
    enumerable: true,
    get: function() {
        return insertListItem;
    }
});
const _richtexttypes = require("@contentful/rich-text-types");
const _internal = require("../../../internal");
const _queries = require("../../../internal/queries");
const _transforms = require("../../../internal/transforms");
/**
 * Build a new list item node while preserving marks
 */ const emptyListItemNode = (editor, withChildren = false)=>{
    let children = [];
    if (withChildren) {
        const marks = (0, _queries.getMarks)(editor) || {};
        children = [
            {
                type: _richtexttypes.BLOCKS.PARAGRAPH,
                data: {},
                children: [
                    {
                        text: '',
                        ...marks
                    }
                ]
            }
        ];
    }
    return {
        type: _richtexttypes.BLOCKS.LIST_ITEM,
        data: {},
        children
    };
};
const insertListItem = (editor)=>{
    if (!editor.selection) {
        return false;
    }
    // Naming it paragraph for simplicity but can be a heading as well
    const paragraph = (0, _queries.getAboveNode)(editor, {
        match: {
            type: _richtexttypes.TEXT_CONTAINERS
        }
    });
    if (!paragraph) {
        return false;
    }
    const [, paragraphPath] = paragraph;
    const listItem = (0, _queries.getParentNode)(editor, paragraphPath);
    if (!listItem) {
        return false;
    }
    const [listItemNode, listItemPath] = listItem;
    if (listItemNode.type !== _richtexttypes.BLOCKS.LIST_ITEM) {
        return false;
    }
    // We are in a li>p (or heading)
    (0, _internal.withoutNormalizing)(editor, ()=>{
        if (!editor.selection) {
            return;
        }
        // Check the cursor position in the current paragraph
        const isAtStart = (0, _queries.isSelectionAtBlockStart)(editor);
        const isAtEnd = (0, _queries.isSelectionAtBlockEnd)(editor);
        const isAtStartOfListItem = isAtStart && (0, _queries.isFirstChildPath)(paragraphPath);
        const shouldSplit = !isAtStart && !isAtEnd;
        // Split the current paragraph content if necessary
        if (shouldSplit) {
            (0, _transforms.splitNodes)(editor);
        }
        // Insert the new li
        const newListItemPath = isAtStartOfListItem ? listItemPath : (0, _queries.getNextPath)(listItemPath);
        (0, _transforms.insertNodes)(editor, // Add an empty paragraph to the new li if We will not move some
        // paragraphs over there.
        emptyListItemNode(editor, !shouldSplit), {
            at: newListItemPath
        });
        // Move children *after* selection to the new li
        const fromPath = isAtStart ? paragraphPath : (0, _queries.getNextPath)(paragraphPath);
        const fromStartIndex = fromPath[fromPath.length - 1] || 0;
        // On split we don't add paragraph to the new li so we move
        // content to the very beginning. Otherwise, account for the empty
        // paragraph at the beginning by moving the content after
        const toPath = newListItemPath.concat([
            shouldSplit ? 0 : 1
        ]);
        if (!isAtStartOfListItem) {
            (0, _transforms.moveChildren)(editor, {
                at: listItemPath,
                to: toPath,
                fromStartIndex
            });
        }
        // Move cursor to the start of the new li
        (0, _transforms.select)(editor, newListItemPath);
        (0, _transforms.collapseSelection)(editor, {
            edge: 'start'
        });
    });
    // Returning True skips processing other editor.insertBreak handlers
    return true;
};
