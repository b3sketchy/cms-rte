(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../internal/transforms"), require("../../test-utils"), require("./constants"), require("./onKeyDown"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../internal/transforms",
        "../../test-utils",
        "./constants",
        "./onKeyDown"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.onKeyDownSpec = {}, global.transforms, global.testUtils, global.constants, global.onKeyDown);
})(this, function(exports, _transforms, _testutils, _constants, _onKeyDown) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _transforms = /*#__PURE__*/ _interop_require_wildcard(_transforms);
    function _getRequireWildcardCache(nodeInterop) {
        if (typeof WeakMap !== "function") return null;
        var cacheBabelInterop = new WeakMap();
        var cacheNodeInterop = new WeakMap();
        return (_getRequireWildcardCache = function(nodeInterop) {
            return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
    }
    function _interop_require_wildcard(obj, nodeInterop) {
        if (!nodeInterop && obj && obj.__esModule) {
            return obj;
        }
        if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
            return {
                default: obj
            };
        }
        var cache = _getRequireWildcardCache(nodeInterop);
        if (cache && cache.has(obj)) {
            return cache.get(obj);
        }
        var newObj = {
            __proto__: null
        };
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for(var key in obj){
            if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                    Object.defineProperty(newObj, key, desc);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }
        newObj.default = obj;
        if (cache) {
            cache.set(obj, newObj);
        }
        return newObj;
    }
    jest.mock('../../internal/transforms', ()=>{
        return {
            __esModule: true,
            ...jest.requireActual('../../internal/transforms')
        };
    });
    describe('onKeyDown', ()=>{
        const { editor } = (0, _testutils.createTestEditor)({});
        const addMark = jest.spyOn(_transforms, 'addMark');
        const onCommandPaletteAction = jest.spyOn(editor.tracking, 'onCommandPaletteAction');
        afterEach(()=>{
            jest.resetAllMocks();
        });
        test.each`
    layout      | key
    ${'QUERTY'} | ${{
            key: '/',
            which: 191,
            shiftKey: false
        }}
    ${'QWERTZ'} | ${{
            key: '/',
            which: 55,
            shiftKey: true
        }}
  `('supports hotKeys for every keyboard layout #{layout}', ({ key })=>{
            (0, _onKeyDown.createOnKeyDown)()(editor, {})({
                type: 'keydown',
                ...key
            });
            expect(addMark).toHaveBeenCalledTimes(1);
            expect(addMark).toHaveBeenCalledWith(editor, _constants.COMMAND_PROMPT);
            expect(onCommandPaletteAction).toHaveBeenCalledTimes(1);
            expect(onCommandPaletteAction).toHaveBeenCalledWith('openRichTextCommandPalette');
        });
    });
});
