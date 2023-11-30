/** @jsx jsx */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@udecode/plate-break"), require("../../test-utils"), require("./createExitBreakPlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@udecode/plate-break",
        "../../test-utils",
        "./createExitBreakPlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createExitBreakPluginTest = {}, global.plateBreak, global.testUtils, global.createExitBreakPlugin);
})(this, function(exports, _platebreak, _testutils, _createExitBreakPlugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    describe('Exit Break', ()=>{
        // https://slate-js.slack.com/archives/C013QHXSCG1/p1640853996467300
        it('derives its config from other plugins', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const rules = [
                {
                    hotkey: 'enter',
                    query: {
                        allow: 'h1',
                        end: true,
                        start: true
                    }
                }
            ];
            const { editor } = (0, _testutils.createTestEditor)({
                input,
                plugins: [
                    (0, _testutils.mockPlugin)({}),
                    (0, _testutils.mockPlugin)({
                        exitBreak: rules
                    }),
                    (0, _createExitBreakPlugin.createExitBreakPlugin)()
                ]
            });
            const outPlugin = editor.pluginsByKey[_platebreak.KEY_EXIT_BREAK];
            expect(outPlugin.options).toEqual({
                rules: expect.arrayContaining(rules)
            });
        });
    });
});
