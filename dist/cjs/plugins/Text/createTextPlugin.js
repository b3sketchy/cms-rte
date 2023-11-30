"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createTextPlugin", {
    enumerable: true,
    get: function() {
        return createTextPlugin;
    }
});
const _richtexttypes = require("@contentful/rich-text-types");
const _queries = require("../../internal/queries");
const _transforms = require("../../internal/transforms");
function createTextPlugin(restrictedMarks = []) {
    return {
        key: 'TextPlugin',
        handlers: {
            // Triple selection in a non-Firefox browser undesirably selects
            // the start of the next block. Editor.unhangRange helps removing
            // the extra block at the end.
            onMouseUp: (editor)=>()=>{
                    if (!editor.selection) {
                        return;
                    }
                    (0, _transforms.setSelection)(editor, (0, _transforms.unhangRange)(editor, editor.selection));
                }
        },
        withOverrides: (editor)=>{
            // Reverts the change made upstream that caused the cursor
            // to be trapped inside inline elements.
            //
            // Reverts https://github.com/ianstormtaylor/slate/pull/4578/
            // Related https://github.com/ianstormtaylor/slate/issues/4704
            const { insertText } = editor;
            editor.insertText = (text)=>{
                const { selection } = editor;
                // If the cursor is at the end of an inline, move it outside
                // before inserting
                if (selection && (0, _queries.isRangeCollapsed)(selection)) {
                    const inlinePath = (0, _queries.getAboveNode)(editor, {
                        match: (n)=>(0, _queries.isInline)(editor, n),
                        mode: 'highest'
                    })?.[1];
                    if (inlinePath && (0, _queries.isEndPoint)(editor, selection.anchor, inlinePath)) {
                        const point = (0, _queries.getPointAfter)(editor, inlinePath);
                        (0, _transforms.setSelection)(editor, {
                            anchor: point,
                            focus: point
                        });
                    }
                }
                return insertText(text);
            };
            // When pressing delete instead of backspace
            const { deleteForward, deleteBackward } = editor;
            editor.deleteBackward = (unit)=>{
                deleteEmptyParagraph(unit, editor, deleteBackward);
            };
            editor.deleteForward = (unit)=>{
                deleteEmptyParagraph(unit, editor, deleteForward);
            };
            fixPasteAsPlainText(editor);
            return editor;
        },
        normalizer: [
            {
                match: _queries.isText,
                transform: (editor, [, path])=>{
                    (0, _transforms.unsetNodes)(editor, restrictedMarks, {
                        at: path
                    });
                },
                validNode: (_editor, [node])=>{
                    return !restrictedMarks.some((mark)=>{
                        return mark in node;
                    });
                }
            }
        ]
    };
}
function deleteEmptyParagraph(unit, editor, deleteFunction) {
    const entry = (0, _queries.getAboveNode)(editor, {
        match: {
            type: _richtexttypes.TEXT_CONTAINERS
        }
    });
    if (entry) {
        const [paragraphOrHeading, path] = entry;
        const isTextEmpty = (0, _queries.isAncestorEmpty)(editor, paragraphOrHeading);
        // We ignore paragraphs/headings that are children of ul, ol, blockquote, tables, etc
        const isRootLevel = path.length === 1;
        const hasSiblings = editor.children.length > 1; // prevent editor from losing focus
        if (isTextEmpty && isRootLevel && hasSiblings) {
            (0, _transforms.removeNodes)(editor, {
                at: path
            });
            const prevNode = (0, _queries.getPointBefore)(editor, editor.selection, {
                unit
            });
            if (prevNode) {
                const [prevCell] = (0, _queries.getNodeEntries)(editor, {
                    match: (node)=>(0, _queries.queryNode)([
                            node,
                            prevNode.path
                        ], {
                            allow: [
                                _richtexttypes.BLOCKS.EMBEDDED_ASSET,
                                _richtexttypes.BLOCKS.EMBEDDED_ENTRY,
                                _richtexttypes.BLOCKS.EMBEDDED_RESOURCE,
                                _richtexttypes.BLOCKS.HR
                            ]
                        }),
                    at: prevNode
                });
                if (prevCell) {
                    (0, _transforms.select)(editor, prevNode);
                }
            }
        } else {
            deleteFunction(unit);
        }
    } else {
        deleteFunction(unit);
    }
}
/**
 * To be compatible with the old behavior we need to treat each 2 consecutive
 * line breaks as a new paragraph when pasting as plain text (also known as
 * paste and match style in macOS)
 */ function fixPasteAsPlainText(editor) {
    editor.insertTextData = (data)=>{
        const text = data.getData('text/plain');
        if (!text) {
            return false;
        }
        const lines = text.split(/\n{2}/);
        let split = false;
        for (const line of lines){
            // empty lines
            if (/^(\r\n?|\n)$/.test(line)) {
                continue;
            }
            if (split) {
                (0, _transforms.splitNodes)(editor, {
                    always: true
                });
            }
            editor.insertText(line);
            split = true;
        }
        return true;
    };
}
