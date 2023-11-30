/** @jsx jsx */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@udecode/plate-break"), require("../../test-utils"), require("./createSoftBreakPlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@udecode/plate-break",
        "../../test-utils",
        "./createSoftBreakPlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createSoftBreakPluginTest = {}, global.plateBreak, global.testUtils, global.createSoftBreakPlugin);
})(this, function(exports, _platebreak, _testutils, _createSoftBreakPlugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    describe('Soft Break', ()=>{
        it('derives its config from other plugins', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const rules = [
                {
                    hotkey: 'ctrl+enter',
                    query: {
                        allow: 'p'
                    }
                },
                {
                    hotkey: 'ctrl+enter',
                    query: {
                        allow: 'h1'
                    }
                }
            ];
            const { editor } = (0, _testutils.createTestEditor)({
                input,
                plugins: [
                    (0, _testutils.mockPlugin)({
                        softBreak: [
                            rules[0]
                        ]
                    }),
                    (0, _testutils.mockPlugin)({}),
                    (0, _testutils.mockPlugin)({
                        softBreak: [
                            rules[1]
                        ]
                    }),
                    (0, _createSoftBreakPlugin.createSoftBreakPlugin)()
                ]
            });
            const outPlugin = editor.pluginsByKey[_platebreak.KEY_SOFT_BREAK];
            expect(outPlugin.options).toEqual({
                rules
            });
        });
    });
});
