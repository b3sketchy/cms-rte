/* eslint-disable react/no-unknown-property */ /** @jsx jsx */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/contentful-slatejs-adapter"), require("../../plugins/CommandPalette/constants"), require("../../test-utils"), require("../removeInternalMarks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/contentful-slatejs-adapter",
        "../../plugins/CommandPalette/constants",
        "../../test-utils",
        "../removeInternalMarks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.removeInternalMarksTest = {}, global.contentfulSlatejsAdapter, global.constants, global.testUtils, global.removeInternalMarks);
})(this, function(exports, _contentfulslatejsadapter, _constants, _testutils, _removeInternalMarks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    describe('internal mark', ()=>{
        describe('First level nodes', ()=>{
            const data = [
                {
                    title: 'Paragraph mark is removed',
                    input: (0, _contentfulslatejsadapter.toContentfulDocument)({
                        document: /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", {
                            [_constants.COMMAND_PROMPT]: true
                        }))).children
                    }),
                    expected: (0, _contentfulslatejsadapter.toContentfulDocument)({
                        document: /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null))).children
                    })
                },
                {
                    title: 'Heading mark is removed',
                    input: (0, _contentfulslatejsadapter.toContentfulDocument)({
                        document: /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hh1", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", {
                            [_constants.COMMAND_PROMPT]: true
                        }))).children
                    }),
                    expected: (0, _contentfulslatejsadapter.toContentfulDocument)({
                        document: /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hh1", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null))).children
                    })
                },
                {
                    title: 'Block quote mark is removed',
                    input: (0, _contentfulslatejsadapter.toContentfulDocument)({
                        document: /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hquote", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", {
                            [_constants.COMMAND_PROMPT]: true
                        })))).children
                    }),
                    expected: (0, _contentfulslatejsadapter.toContentfulDocument)({
                        document: /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hquote", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null)))).children
                    })
                },
                {
                    title: 'Other marks are not removed',
                    input: (0, _contentfulslatejsadapter.toContentfulDocument)({
                        document: /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hquote", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", {
                            bold: true,
                            underline: true,
                            [_constants.COMMAND_PROMPT]: true
                        })))).children
                    }),
                    expected: (0, _contentfulslatejsadapter.toContentfulDocument)({
                        document: /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hquote", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", {
                            bold: true,
                            underline: true
                        })))).children
                    })
                }
            ];
            for (const { input, expected, title } of data){
                it(`${title}`, ()=>{
                    expect((0, _removeInternalMarks.removeInternalMarks)(input)).toEqual(expected);
                });
            }
        });
    });
});
