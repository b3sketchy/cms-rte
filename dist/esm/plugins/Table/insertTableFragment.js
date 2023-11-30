import { BLOCKS } from '@contentful/rich-text-types';
import { insertEmptyParagraph } from '../../helpers/editor';
import { getText, isElement } from '../../internal/queries';
import { isTable } from './helpers';
/**
 * Removes table wrappers when pasting a single table cell
 *
 * In Plate/Slate, copying the content of a table cell wraps
 * it in a <table><tr><td>{content}</td></tr></table> even
 * when copying partial cell content.
 *
 * That's really annoying as there is no way to remove the table
 * wrappers in that case.
 */ const trimUnnecessaryTableWrapper = (node)=>{
    if (!isElement(node)) {
        return [
            node
        ];
    }
    // must be a table with a single row
    if (node.type !== BLOCKS.TABLE || node.children?.length !== 1) {
        return [
            node
        ];
    }
    const row = node.children[0];
    // the row must contain a single cell
    if (row?.children?.length !== 1) {
        return [
            node
        ];
    }
    const cell = row.children[0];
    return cell.children;
};
export const insertTableFragment = (editor)=>{
    const { insertFragment } = editor;
    return (fragments)=>{
        if (!editor.selection) {
            return;
        }
        fragments = fragments.flatMap(trimUnnecessaryTableWrapper);
        // We need to make sure we have a new, empty and clean paragraph in order to paste tables as-is due to how Slate behaves
        // More info: https://github.com/ianstormtaylor/slate/pull/4489 and https://github.com/ianstormtaylor/slate/issues/4542
        const isInsertingTable = fragments.some((fragment)=>isTable(fragment));
        const isTableFirstFragment = fragments.findIndex((fragment)=>isTable(fragment)) === 0;
        const currentLineHasText = getText(editor, editor.selection?.focus.path) !== '';
        if (isInsertingTable && isTableFirstFragment && currentLineHasText) {
            insertEmptyParagraph(editor);
        }
        return insertFragment(fragments);
    };
};