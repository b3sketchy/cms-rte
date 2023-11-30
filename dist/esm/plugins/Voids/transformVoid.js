import { insertNodes, removeNodes } from '../../internal/transforms';
/**
 * Re-creates a void node with valid children.
 */ export const transformVoid = (editor, [node, path])=>{
    const validVoid = {
        ...node,
        children: [
            {
                text: ''
            }
        ]
    };
    // A workaround because Slate doesn't allow adjusting void nodes children
    removeNodes(editor, {
        at: path
    });
    insertNodes(editor, [
        validVoid
    ], {
        at: path
    });
};
