/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("is-hotkey"), require("lodash/castArray"), require("../../internal/queries"), require("./transforms/moveListItems"), require("./transforms/toggleList"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "is-hotkey",
        "lodash/castArray",
        "../../internal/queries",
        "./transforms/moveListItems",
        "./transforms/toggleList"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.onKeyDownList = {}, global.isHotkey, global.castArray, global.queries, global.moveListItems, global.toggleList);
})(this, function(exports, _ishotkey, _castArray, _queries, _moveListItems, _toggleList) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "onKeyDownList", {
        enumerable: true,
        get: function() {
            return onKeyDownList;
        }
    });
    _ishotkey = /*#__PURE__*/ _interop_require_default(_ishotkey);
    _castArray = /*#__PURE__*/ _interop_require_default(_castArray);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const onKeyDownList = (editor, { type, options: { hotkey } })=>(e)=>{
            if (e.key === 'Tab' && editor.selection) {
                const listSelected = (0, _queries.getAboveNode)(editor, {
                    at: editor.selection,
                    match: {
                        type
                    }
                });
                if (listSelected) {
                    e.preventDefault();
                    (0, _moveListItems.moveListItems)(editor, {
                        increase: !e.shiftKey
                    });
                    return;
                }
            }
            if (!hotkey) return;
            const hotkeys = (0, _castArray.default)(hotkey);
            for (const _hotkey of hotkeys){
                if ((0, _ishotkey.default)(_hotkey)(e)) {
                    (0, _toggleList.toggleList)(editor, {
                        type
                    });
                }
            }
        };
});
