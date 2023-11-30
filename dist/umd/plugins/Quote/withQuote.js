(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("slate"), require("../../internal/queries"), require("../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "slate",
        "../../internal/queries",
        "../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.withQuote = {}, global.richTextTypes, global.slate, global.queries, global.transforms);
})(this, function(exports, _richtexttypes, _slate, _queries, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "withQuote", {
        enumerable: true,
        get: function() {
            return withQuote;
        }
    });
    const withQuote = (editor)=>{
        const { insertFragment } = editor;
        editor.insertFragment = (fragment)=>{
            const startingNode = fragment.length && fragment[0];
            const startsWithBlockquote = _slate.Element.isElement(startingNode) && startingNode.type === _richtexttypes.BLOCKS.QUOTE;
            const containerEntry = (0, _queries.getAboveNode)(editor, {
                match: {
                    type: _richtexttypes.TEXT_CONTAINERS
                }
            });
            const containerIsNotEmpty = containerEntry && (0, _queries.getText)(editor, containerEntry[1]) !== '';
            if (startsWithBlockquote && containerIsNotEmpty) {
                const { selection } = editor;
                const isContentSelected = (selection)=>!!selection && _slate.Point.compare(selection.anchor, selection.focus) !== 0;
                // if something is selected (highlighted) we replace the selection
                if (isContentSelected(selection)) {
                    (0, _transforms.deleteText)(editor, {
                        at: selection
                    });
                }
                // get the cursor entry again, it may be different after deletion
                const containerEntry = (0, _queries.getAboveNode)(editor, {
                    match: {
                        type: _richtexttypes.TEXT_CONTAINERS
                    }
                });
                const containerIsNotEmpty = containerEntry && (0, _queries.getText)(editor, containerEntry[1]) !== '';
                if (containerIsNotEmpty) {
                    (0, _transforms.insertNodes)(editor, fragment);
                    return;
                }
            }
            insertFragment(fragment);
        };
        return editor;
    };
});
