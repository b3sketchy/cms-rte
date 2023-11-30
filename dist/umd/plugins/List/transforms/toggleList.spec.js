/** @jsx jsx */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../../../test-utils"), require("./toggleList"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../../../test-utils",
        "./toggleList"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.toggleListSpec = {}, global.richTextTypes, global.testUtils, global.toggleList);
})(this, function(exports, _richtexttypes, _testutils, _toggleList) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    describe('toggle on', ()=>{
        it('should turn a p to list', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null)));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null)))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.UL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
        it('should turn a p with a selection to list', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "Planetas ", /*#__PURE__*/ (0, _testutils.jsx)("anchor", null), "mori in", /*#__PURE__*/ (0, _testutils.jsx)("focus", null), " gandavum!"));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "Planetas ", /*#__PURE__*/ (0, _testutils.jsx)("anchor", null), "mori in", /*#__PURE__*/ (0, _testutils.jsx)("focus", null), " gandavum!"))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.UL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
        it('should turn multiple p to list', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("anchor", null), "1"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "2"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "3", /*#__PURE__*/ (0, _testutils.jsx)("focus", null)));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("anchor", null), "1")), /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "2")), /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "3", /*#__PURE__*/ (0, _testutils.jsx)("focus", null)))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.UL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
    });
    describe('toggle off', ()=>{
        it('should split a simple list to two', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1")), /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "2", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null))), /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "3"))));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1"))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "2", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null)), /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "3"))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.UL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
        it('should split a nested list', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1"), /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "11")), /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "12", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null))), /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "13"))))));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1"), /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "11"))))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "12", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null)), /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "13"))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.UL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
        it('should turn a list to multiple p', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("anchor", null), "1")), /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "2")), /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "3", /*#__PURE__*/ (0, _testutils.jsx)("focus", null)))));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("anchor", null), "1"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "2"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "3", /*#__PURE__*/ (0, _testutils.jsx)("focus", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.UL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
    });
    describe('toggle over', ()=>{
        it('should toggle different list types', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null)))));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hol", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1"))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.OL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
        it('should only toggle the nested list', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1"), /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "11", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null)))))));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "1"), /*#__PURE__*/ (0, _testutils.jsx)("hol", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "11", /*#__PURE__*/ (0, _testutils.jsx)("cursor", null)))))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.OL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
        it('should only toggle everything that is selected', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("anchor", null), "1"), /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "11", /*#__PURE__*/ (0, _testutils.jsx)("focus", null)))))));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hol", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("anchor", null), "1"), /*#__PURE__*/ (0, _testutils.jsx)("hol", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "11", /*#__PURE__*/ (0, _testutils.jsx)("focus", null)))))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            const { editor } = (0, _testutils.createTestEditor)({
                input
            });
            (0, _toggleList.toggleList)(editor, {
                type: _richtexttypes.BLOCKS.OL_LIST
            });
            (0, _testutils.assertOutput)({
                editor,
                expected
            });
        });
    });
});
