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
const _editor = require("../../helpers/editor");
const _queries = require("../../internal/queries");
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
