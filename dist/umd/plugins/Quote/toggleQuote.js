(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("is-hotkey"), require("../../helpers/editor"), require("../../internal"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "is-hotkey",
        "../../helpers/editor",
        "../../internal"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.toggleQuote = {}, global.richTextTypes, global.isHotkey, global.editor, global.internal);
})(this, function(exports, _richtexttypes, _ishotkey, _editor, _internal) {
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
        onKeyDownToggleQuote: function() {
            return onKeyDownToggleQuote;
        },
        toggleQuote: function() {
            return toggleQuote;
        }
    });
    _ishotkey = /*#__PURE__*/ _interop_require_default(_ishotkey);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function toggleQuote(editor, logAction) {
        if (!editor.selection) return;
        const isActive = (0, _editor.isBlockSelected)(editor, _richtexttypes.BLOCKS.QUOTE);
        logAction?.(isActive ? 'remove' : 'insert', {
            nodeType: _richtexttypes.BLOCKS.QUOTE
        });
        (0, _internal.withoutNormalizing)(editor, ()=>{
            if (!editor.selection) return;
            (0, _internal.unwrapNodes)(editor, {
                match: (node)=>(0, _internal.isElement)(node) && node.type === _richtexttypes.BLOCKS.QUOTE,
                split: true
            });
            if (!isActive) {
                const quote = {
                    type: _richtexttypes.BLOCKS.QUOTE,
                    data: {},
                    children: []
                };
                (0, _internal.wrapNodes)(editor, quote);
            }
        });
    }
    const onKeyDownToggleQuote = (editor, plugin)=>(event)=>{
            const { hotkey } = plugin.options;
            if (hotkey && (0, _ishotkey.default)(hotkey, event)) {
                event.preventDefault();
                toggleQuote(editor, editor.tracking.onShortcutAction);
            }
        };
});
