(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../../helpers/editor"), require("../../../internal/queries"), require("../../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../../helpers/editor",
        "../../../internal/queries",
        "../../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.insertBlock = {}, global.editor, global.queries, global.transforms);
})(this, function(exports, _editor, _queries, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "insertBlock", {
        enumerable: true,
        get: function() {
            return insertBlock;
        }
    });
    const createNode = (nodeType, entity)=>({
            type: nodeType,
            data: {
                target: {
                    sys: {
                        id: entity.sys.id,
                        type: 'Link',
                        linkType: entity.sys.type
                    }
                }
            },
            children: [
                {
                    text: ''
                }
            ],
            isVoid: true
        });
    function insertBlock(editor, nodeType, entity) {
        if (!editor?.selection) return;
        const linkedEntityBlock = createNode(nodeType, entity);
        const hasText = editor.selection && !!(0, _queries.getText)(editor, editor.selection.focus.path);
        if (hasText) {
            (0, _transforms.insertNodes)(editor, linkedEntityBlock);
        } else {
            (0, _transforms.setNodes)(editor, linkedEntityBlock);
        }
        (0, _editor.focus)(editor);
    }
});
