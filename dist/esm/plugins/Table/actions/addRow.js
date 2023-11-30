import { BLOCKS } from '@contentful/rich-text-types';
import { getEmptyRowNode } from '@udecode/plate-table';
import { getAboveNode, someNode, getStartPoint, getNextPath } from '../../../internal/queries';
import { select, insertNodes } from '../../../internal/transforms';
const addRow = (editor, getNextRowPath)=>{
    if (someNode(editor, {
        match: {
            type: BLOCKS.TABLE
        }
    })) {
        const currentRowItem = getAboveNode(editor, {
            match: {
                type: BLOCKS.TABLE_ROW
            }
        });
        if (currentRowItem) {
            const [currentRowElem, currentRowPath] = currentRowItem;
            const nextRowPath = getNextRowPath(currentRowPath);
            insertNodes(editor, getEmptyRowNode(editor, {
                header: false,
                colCount: currentRowElem.children.length
            }), {
                at: nextRowPath,
                // Note: this selects the last cell of the new row
                select: true
            });
            // Select the first cell in the current row
            select(editor, getStartPoint(editor, nextRowPath));
        }
    }
};
export const addRowBelow = (editor)=>{
    addRow(editor, (currentRowPath)=>{
        return getNextPath(currentRowPath);
    });
};
export const addRowAbove = (editor)=>{
    addRow(editor, (currentRowPath)=>{
        // The new row will be in in-place of the old row
        return currentRowPath;
    });
};
