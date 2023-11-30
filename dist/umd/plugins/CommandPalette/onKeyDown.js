(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("is-hotkey"), require("../../internal"), require("../../internal/misc"), require("./constants"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "is-hotkey",
        "../../internal",
        "../../internal/misc",
        "./constants"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.onKeyDown = {}, global.isHotkey, global.internal, global.misc, global.constants);
})(this, function(exports, _ishotkey, _internal, _misc, _constants) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createOnKeyDown", {
        enumerable: true,
        get: function() {
            return createOnKeyDown;
        }
    });
    _ishotkey = /*#__PURE__*/ _interop_require_default(_ishotkey);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const createOnKeyDown = ()=>{
        return (editor)=>{
            return (event)=>{
                // Support for different keyboard layouts:
                // `isHotKey` uses by default `event.which`, which will never generates a match for all layouts (QWERTY: `/`, QWERTZ: `shift+7`)
                // with `byKey: true` `isHotKey` uses `event.key` which will return the interpreted key '/'
                // It would still fail without the the optional `shift?` param, as it first checks the modKeys (`shiftKey` would be true on QWERTZ)
                if ((0, _ishotkey.default)('shift?+/', {
                    byKey: true
                }, event)) {
                    (0, _internal.addMark)(editor, _constants.COMMAND_PROMPT);
                    editor.tracking.onCommandPaletteAction('openRichTextCommandPalette');
                }
                const isActive = (0, _internal.isMarkActive)(editor, _constants.COMMAND_PROMPT);
                if (!isActive) {
                    return;
                }
                if ((0, _ishotkey.default)('enter', event)) {
                    return event.preventDefault();
                }
                const [, path] = (0, _internal.getAboveNode)(editor);
                const range = (0, _internal.getRange)(editor, path);
                if ((0, _ishotkey.default)('backspace', event)) {
                    // if it is the last character in the command string
                    if (range.focus.offset - range.anchor.offset === 1) {
                        (0, _internal.removeMark)(editor, _constants.COMMAND_PROMPT, range);
                    }
                }
                if ((0, _ishotkey.default)('escape', event)) {
                    event.stopPropagation();
                    (0, _internal.removeMark)(editor, _constants.COMMAND_PROMPT, range);
                    editor.tracking.onCommandPaletteAction('cancelRichTextCommandPalette');
                    (0, _misc.focusEditor)(editor);
                }
            };
        };
    };
});