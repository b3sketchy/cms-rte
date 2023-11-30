(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/field-editor-test-utils"), require("@contentful/rich-text-types"), require("../validations"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/field-editor-test-utils",
        "@contentful/rich-text-types",
        "../validations"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.validationsTest = {}, global.fieldEditorTestUtils, global.richTextTypes, global.validations);
})(this, function(exports, _fieldeditortestutils, _richtexttypes, _validations) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    describe('validations', ()=>{
        describe('isMarkEnabled', ()=>{
            [
                _richtexttypes.MARKS.BOLD,
                _richtexttypes.MARKS.CODE,
                _richtexttypes.MARKS.ITALIC,
                _richtexttypes.MARKS.UNDERLINE
            ].forEach((mark)=>{
                it(`returns true for ${mark} mark when no validation explicity set`, ()=>{
                    const [field] = (0, _fieldeditortestutils.createFakeFieldAPI)();
                    const actual = (0, _validations.isMarkEnabled)(field, mark);
                    expect(actual).toBe(true);
                });
                it(`returns false for ${mark} mark when validation explicity set without it`, ()=>{
                    const [field] = (0, _fieldeditortestutils.createFakeFieldAPI)((field)=>{
                        field.validations = [
                            {
                                enabledMarks: Object.values(_richtexttypes.MARKS).filter((markDefintion)=>markDefintion !== mark)
                            }
                        ];
                        return field;
                    });
                    const actual = (0, _validations.isMarkEnabled)(field, mark);
                    expect(actual).toBe(false);
                });
                it(`returns true for ${mark} mark when validation explicity set with it`, ()=>{
                    const [field] = (0, _fieldeditortestutils.createFakeFieldAPI)((field)=>{
                        field.validations = [
                            {
                                enabledMarks: [
                                    mark
                                ]
                            }
                        ];
                        return field;
                    });
                    const actual = (0, _validations.isMarkEnabled)(field, mark);
                    expect(actual).toBe(true);
                });
            });
        });
    });
});
