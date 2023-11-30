"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "onKeyDownTable", {
    enumerable: true,
    get: function() {
        return onKeyDownTable;
    }
});
const _richtexttypes = require("@contentful/rich-text-types");
const _platetable = require("@udecode/plate-table");
const _editor = require("../../helpers/editor");
const _misc = require("../../internal/misc");
const _queries = require("../../internal/queries");
const _actions = require("./actions");
const onKeyDownTable = (editor, plugin)=>{
    const defaultHandler = (0, _platetable.onKeyDownTable)(editor, plugin);
    return (event)=>{
        // This fixes `Cannot resolve a Slate point from DOM point:
        // [object HTMLDivElement]` when typing while the cursor is before table
        const windowSelection = window.getSelection();
        if (windowSelection) {
            // @ts-expect-error
            // this attribute comes from `plugins/Table/components/Table.tsx`
            const blockType = windowSelection.anchorNode.attributes?.['data-block-type']?.value;
            const isBeforeTable = blockType === _richtexttypes.BLOCKS.TABLE;
            if (isBeforeTable) {
                if (event.key === 'Enter') {
                    const above = (0, _queries.getAboveNode)(editor, {
                        match: {
                            type: _richtexttypes.BLOCKS.TABLE
                        }
                    });
                    if (!above) return;
                    const [, tablePath] = above;
                    (0, _editor.insertEmptyParagraph)(editor, {
                        at: tablePath,
                        select: true
                    });
                }
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
        // TODO clean this up
        if (event.key === 'Backspace') {
            const entry = (0, _platetable.getTableEntries)(editor, {});
            if (entry) {
                const { table, row, cell } = entry;
                const cellText = (0, _queries.getText)(editor, cell[1]);
                const isFirstCell = (0, _queries.isFirstChild)(row[1]);
                const isFirstRow = (0, _queries.isFirstChild)(table[1]);
                if (isFirstCell && isFirstRow && !cellText) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }
            }
        }
        // Pressing Tab on the last cell creates a new row
        // Otherwise, jumping between cells is handled in the defaultKeyDownTable
        if (event.key === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            const entry = (0, _platetable.getTableEntries)(editor, {});
            if (entry) {
                const { table, row, cell } = entry;
                const isLastCell = (0, _queries.isLastChildPath)(row, cell[1]);
                const isLastRow = (0, _queries.isLastChildPath)(table, row[1]);
                if (isLastRow && isLastCell) {
                    (0, _actions.addRowBelow)(editor);
                    // skip default handler
                    return;
                } else {
                    defaultHandler(event);
                }
            }
        }
        if (event.key === 'Escape') {
            (0, _misc.blurEditor)(editor);
        }
    };
};
