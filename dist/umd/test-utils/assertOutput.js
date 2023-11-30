(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../internal"), require("./createEditor"), require("./setEmptyDataAttribute"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../internal",
        "./createEditor",
        "./setEmptyDataAttribute"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.assertOutput = {}, global.internal, global.createEditor, global.setEmptyDataAttribute);
})(this, function(exports, _internal, _createEditor, _setEmptyDataAttribute) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "assertOutput", {
        enumerable: true,
        get: function() {
            return assertOutput;
        }
    });
    const assertOutput = (options)=>{
        const editor = options.editor ?? (0, _createEditor.createTestEditor)({
            input: options.input
        }).editor;
        (0, _internal.normalize)(editor);
        (0, _setEmptyDataAttribute.setEmptyDataAttribute)(editor);
        if (options.log) {
            console.log(JSON.stringify({
                expected: options.expected,
                actual: editor.children,
                actualSelection: editor.selection
            }, null, 2));
        }
        expect(editor.children).toEqual(options.expected.children);
        if (options.expected.selection !== null) {
            // Assert cursor position
            expect(editor.selection).toEqual(options.expected.selection);
        }
    };
});
