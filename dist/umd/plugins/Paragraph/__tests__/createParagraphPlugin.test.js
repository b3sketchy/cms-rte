/* eslint-disable react/no-unknown-property */ /** @jsx jsx */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../../test-utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../../test-utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createParagraphPluginTest = {}, global.testUtils);
})(this, function(exports, _testutils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    describe('normalization', ()=>{
        it('can contain inline entries & hyperlinks', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some text before", /*#__PURE__*/ (0, _testutils.jsx)("hinline", {
                type: "Entry",
                id: "inline-entry"
            }), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                uri: "https://contentful.com"
            }), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                entry: "entry-id"
            }), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                resource: "resource-urn"
            }), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                asset: "asset-id"
            }), "some text after"));
            (0, _testutils.assertOutput)({
                input,
                expected: input
            });
        });
        it('wraps orphaned text nodes in a paragraph', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "valid text"), /*#__PURE__*/ (0, _testutils.jsx)("hh1", null, "valid text"), /*#__PURE__*/ (0, _testutils.jsx)("htable", null, /*#__PURE__*/ (0, _testutils.jsx)("htr", null, /*#__PURE__*/ (0, _testutils.jsx)("htd", null, "invalid text"))));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "valid text"), /*#__PURE__*/ (0, _testutils.jsx)("hh1", null, "valid text"), /*#__PURE__*/ (0, _testutils.jsx)("htable", null, /*#__PURE__*/ (0, _testutils.jsx)("htr", null, /*#__PURE__*/ (0, _testutils.jsx)("htd", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "invalid text")))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('unwraps nested paragraphs', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some", /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "paragraph")), "text"));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some", /*#__PURE__*/ (0, _testutils.jsx)("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "paragraph"), "text"));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        describe('lifts other invalid children', ()=>{
            it('block void elements', ()=>{
                const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Asset",
                    id: "1"
                }), " start"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "end ", /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Asset",
                    id: "2"
                })), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "in ", /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Asset",
                    id: "3"
                }), " between"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Entry",
                    id: "1"
                }), " start"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "end ", /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Entry",
                    id: "2"
                })), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "in ", /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Entry",
                    id: "3"
                }), " between"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("hhr", null), " start"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "end ", /*#__PURE__*/ (0, _testutils.jsx)("hhr", null)), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "in ", /*#__PURE__*/ (0, _testutils.jsx)("hhr", null), " between"));
                const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Asset",
                    id: "1"
                }), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, " start"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "end "), /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Asset",
                    id: "2"
                }), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "in "), /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Asset",
                    id: "3"
                }), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, " between"), /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Entry",
                    id: "1"
                }), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, " start"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "end "), /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Entry",
                    id: "2"
                }), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "in "), /*#__PURE__*/ (0, _testutils.jsx)("hembed", {
                    type: "Entry",
                    id: "3"
                }), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, " between"), /*#__PURE__*/ (0, _testutils.jsx)("hhr", null), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, " start"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "end "), /*#__PURE__*/ (0, _testutils.jsx)("hhr", null), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "in "), /*#__PURE__*/ (0, _testutils.jsx)("hhr", null), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, " between"));
                (0, _testutils.assertOutput)({
                    input,
                    expected
                });
            });
            it('handles heading', ()=>{
                const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some", /*#__PURE__*/ (0, _testutils.jsx)("hh1", null, "heading"), "text"));
                const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some"), /*#__PURE__*/ (0, _testutils.jsx)("hh1", null, "heading"), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "text"));
                (0, _testutils.assertOutput)({
                    input,
                    expected
                });
            });
            it('handles quotes', ()=>{
                const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some", /*#__PURE__*/ (0, _testutils.jsx)("hquote", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "quote")), "text"));
                const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some"), /*#__PURE__*/ (0, _testutils.jsx)("hquote", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "quote")), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "text"));
                (0, _testutils.assertOutput)({
                    input,
                    expected
                });
            });
            it('handles lists', ()=>{
                const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some", /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "list item"))), "text"));
                const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some"), /*#__PURE__*/ (0, _testutils.jsx)("hul", null, /*#__PURE__*/ (0, _testutils.jsx)("hli", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "list item"))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "text"));
                (0, _testutils.assertOutput)({
                    input,
                    expected
                });
            });
            it('handles tables', ()=>{
                const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some", /*#__PURE__*/ (0, _testutils.jsx)("htable", null, /*#__PURE__*/ (0, _testutils.jsx)("htr", null, /*#__PURE__*/ (0, _testutils.jsx)("htd", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "cell 1")), /*#__PURE__*/ (0, _testutils.jsx)("htd", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "cell 2")))), "text"));
                const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "some"), /*#__PURE__*/ (0, _testutils.jsx)("htable", null, /*#__PURE__*/ (0, _testutils.jsx)("htr", null, /*#__PURE__*/ (0, _testutils.jsx)("htd", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "cell 1")), /*#__PURE__*/ (0, _testutils.jsx)("htd", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "cell 2")))), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, "text"));
                (0, _testutils.assertOutput)({
                    input,
                    expected
                });
            });
        });
    });
});
