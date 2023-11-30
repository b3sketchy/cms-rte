import { BLOCKS, TEXT_CONTAINERS } from '@contentful/rich-text-types';
import { Element, Point } from 'slate';
import { getAboveNode, getText } from '../../internal/queries';
import { deleteText, insertNodes } from '../../internal/transforms';
export const withQuote = (editor)=>{
    const { insertFragment } = editor;
    editor.insertFragment = (fragment)=>{
        const startingNode = fragment.length && fragment[0];
        const startsWithBlockquote = Element.isElement(startingNode) && startingNode.type === BLOCKS.QUOTE;
        const containerEntry = getAboveNode(editor, {
            match: {
                type: TEXT_CONTAINERS
            }
        });
        const containerIsNotEmpty = containerEntry && getText(editor, containerEntry[1]) !== '';
        if (startsWithBlockquote && containerIsNotEmpty) {
            const { selection } = editor;
            const isContentSelected = (selection)=>!!selection && Point.compare(selection.anchor, selection.focus) !== 0;
            // if something is selected (highlighted) we replace the selection
            if (isContentSelected(selection)) {
                deleteText(editor, {
                    at: selection
                });
            }
            // get the cursor entry again, it may be different after deletion
            const containerEntry = getAboveNode(editor, {
                match: {
                    type: TEXT_CONTAINERS
                }
            });
            const containerIsNotEmpty = containerEntry && getText(editor, containerEntry[1]) !== '';
            if (containerIsNotEmpty) {
                insertNodes(editor, fragment);
                return;
            }
        }
        insertFragment(fragment);
    };
    return editor;
};
