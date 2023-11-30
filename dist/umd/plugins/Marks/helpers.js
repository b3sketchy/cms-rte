(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("is-hotkey"), require("../../internal/queries"), require("../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "is-hotkey",
        "../../internal/queries",
        "../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.helpers = {}, global.richTextTypes, global.isHotkey, global.queries, global.transforms);
})(this, function(exports, _richtexttypes, _ishotkey, _queries, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports, {
        buildMarkEventHandler: function() {
            return buildMarkEventHandler;
        },
        toggleMarkAndDeactivateConflictingMarks: function() {
            return toggleMarkAndDeactivateConflictingMarks;
        }
    });
    _ishotkey = /*#__PURE__*/ _interop_require_default(_ishotkey);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const toggleMarkAndDeactivateConflictingMarks = (editor, mark)=>{
        const subs = [
            _richtexttypes.MARKS.SUPERSCRIPT,
            _richtexttypes.MARKS.SUBSCRIPT
        ];
        const clear = subs.includes(mark) ? subs : [];
        (0, _transforms.toggleMark)(editor, {
            key: mark,
            clear
        });
    };
    const buildMarkEventHandler = (type)=>(editor, { options: { hotkey } })=>(event)=>{
                if (editor.selection && hotkey && (0, _ishotkey.default)(hotkey, event)) {
                    event.preventDefault();
                    const isActive = (0, _queries.isMarkActive)(editor, type);
                    editor.tracking.onShortcutAction(isActive ? 'unmark' : 'mark', {
                        markType: type
                    });
                    toggleMarkAndDeactivateConflictingMarks(editor, type);
                }
            };
});
