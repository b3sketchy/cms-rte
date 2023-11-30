/* eslint-disable react/no-unknown-property */ /** @jsx jsx */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../../test-utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../../test-utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createHyperlinkPluginTest = {}, global.testUtils);
})(this, function(exports, _testutils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    describe('normalization', ()=>{
        it('removes empty links from the document structure', ()=>{
            const input = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "link"), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                uri: "https://link.com"
            })), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "asset"), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                asset: "asset-id"
            })), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "entry"), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                entry: "entry-id"
            })), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "resource"), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                resource: "resource-urn"
            })), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "explicit empty link"), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                uri: "https://link.com"
            }, '')), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "link with empty space"), /*#__PURE__*/ (0, _testutils.jsx)("hlink", {
                uri: "https://link.com"
            }, " ")));
            const expected = /*#__PURE__*/ (0, _testutils.jsx)("editor", null, /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "link")), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "asset")), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "entry")), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "resource")), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "explicit empty link")), /*#__PURE__*/ (0, _testutils.jsx)("hp", null, /*#__PURE__*/ (0, _testutils.jsx)("htext", null, "link with empty space")));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
    });
});
