/** @jsx jsx */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../../test-utils"), require("../helpers"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../../test-utils",
        "../helpers"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.helpersTest = {}, global.testUtils, global.helpers);
})(this, function(exports, _testutils, _helpers) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    test('insertTableAndFocusFirstCell', ()=>{
        const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null), /*#__PURE__*/ (0, _testutils.jsx)("cursor", null)), /*#__PURE__*/ (0, _testutils.jsx)("hp", null));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _helpers.insertTableAndFocusFirstCell)(editor);
        const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("htable", null, /*#__PURE__*/ (0, _testutils.jsx)("htr", null, /*#__PURE__*/ (0, _testutils.jsx)("hth", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null), /*#__PURE__*/ (0, _testutils.jsx)("cursor", null))), /*#__PURE__*/ (0, _testutils.jsx)("hth", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)))), /*#__PURE__*/ (0, _testutils.jsx)("htr", null, /*#__PURE__*/ (0, _testutils.jsx)("htd", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null))), /*#__PURE__*/ (0, _testutils.jsx)("htd", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null))))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
        (0, _testutils.assertOutput)({
            input,
            expected
        });
    });
});
