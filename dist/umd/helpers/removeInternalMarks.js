(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../plugins/CommandPalette/constants"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../plugins/CommandPalette/constants"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.removeInternalMarks = {}, global.constants);
})(this, function(exports, _constants) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "removeInternalMarks", {
        enumerable: true,
        get: function() {
            return removeInternalMarks;
        }
    });
    const internalMarks = [
        _constants.COMMAND_PROMPT
    ];
    const removeInternalMarks = (document)=>{
        return {
            ...document,
            content: document.content.map((node)=>{
                if (node.nodeType === 'text') {
                    node.marks = node.marks.filter((mark)=>!internalMarks.includes(mark.type));
                    return node;
                }
                return removeInternalMarks(node);
            })
        };
    };
});
