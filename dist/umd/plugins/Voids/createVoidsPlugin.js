(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../helpers/editor"), require("../../internal/queries"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../helpers/editor",
        "../../internal/queries"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createVoidsPlugin = {}, global.editor, global.queries);
})(this, function(exports, _editor, _queries) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createVoidsPlugin", {
        enumerable: true,
        get: function() {
            return createVoidsPlugin;
        }
    });
    const createVoidsPlugin = ()=>({
            key: 'VoidsPlugin',
            exitBreak: [
                {
                    // Inserts a new paragraph *before* a void element if it's the very first
                    // node on the editor
                    hotkey: 'enter',
                    before: true,
                    query: {
                        filter: ([node, path])=>(0, _editor.isRootLevel)(path) && (0, _queries.isFirstChildPath)(path) && !!node.isVoid
                    }
                },
                {
                    // Inserts a new paragraph on enter when a void element is focused
                    hotkey: 'enter',
                    // exploit the internal use of Array.slice(0, level + 1) by the exitBreak plugin
                    // to stay in the parent element
                    level: -2,
                    query: {
                        filter: ([node, path])=>!((0, _editor.isRootLevel)(path) && (0, _queries.isFirstChildPath)(path)) && !!node.isVoid
                    }
                }
            ]
        });
});
