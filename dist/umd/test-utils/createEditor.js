(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../internal"), require("../plugins"), require("./randomId"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../internal",
        "../plugins",
        "./randomId"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createEditor = {}, global.internal, global.plugins, global.randomId);
})(this, function(exports, _internal, _plugins, _randomId) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createTestEditor", {
        enumerable: true,
        get: function() {
            return createTestEditor;
        }
    });
    const createTestEditor = (options)=>{
        const trackingHandler = options.trackingHandler ?? jest.fn();
        const sdk = options.sdk ?? {
            field: {
                validation: []
            }
        };
        const editor = (0, _internal.createPlateEditor)({
            id: (0, _randomId.randomId)('editor'),
            editor: options.input,
            plugins: options.plugins || (0, _plugins.getPlugins)(sdk, trackingHandler),
            normalizeInitialValue: false
        });
        return {
            editor,
            normalize: ()=>(0, _internal.normalize)(editor)
        };
    };
});
