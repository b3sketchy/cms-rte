(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-components"), require("@contentful/f36-tokens"), require("emotion"), require("../../../ContentfulEditorProvider"), require("../../../helpers/editor"), require("../../../internal/queries"), require("../../shared/ToolbarButton"), require("../helpers"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-components",
        "@contentful/f36-tokens",
        "emotion",
        "../../../ContentfulEditorProvider",
        "../../../helpers/editor",
        "../../../internal/queries",
        "../../shared/ToolbarButton",
        "../helpers"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.markToolbarButton = {}, global.react, global.f36Components, global.f36Tokens, global.emotion, global.contentfulEditorProvider, global.editor, global.queries, global.toolbarButton, global.helpers);
})(this, function(exports, _react, _f36components, _f36tokens, _emotion, _ContentfulEditorProvider, _editor, _queries, _ToolbarButton, _helpers) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createMarkToolbarButton", {
        enumerable: true,
        get: function() {
            return createMarkToolbarButton;
        }
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
    _f36tokens = /*#__PURE__*/ _interop_require_default(_f36tokens);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
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
    const styles = {
        isActive: (0, _emotion.css)({
            backgroundColor: _f36tokens.default.blue100,
            color: _f36tokens.default.blue600
        })
    };
    const createMarkToolbarButton = ({ mark, title, icon })=>{
        const Mark = ({ isDisabled })=>{
            const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
            const handleClick = _react.useCallback(()=>{
                if (!editor?.selection) return;
                const isActive = (0, _queries.isMarkActive)(editor, mark);
                editor.tracking.onToolbarAction(isActive ? 'unmark' : 'mark', {
                    markType: mark
                });
                (0, _helpers.toggleMarkAndDeactivateConflictingMarks)(editor, mark);
                (0, _editor.focus)(editor);
            }, [
                editor
            ]);
            if (!editor) return null;
            if (!icon) {
                return /*#__PURE__*/ _react.createElement(_f36components.Menu.Item, {
                    onClick: handleClick,
                    disabled: isDisabled,
                    className: (0, _emotion.cx)({
                        [styles.isActive]: (0, _queries.isMarkActive)(editor, mark)
                    }),
                    testId: `${mark}-toolbar-button`
                }, title);
            }
            return /*#__PURE__*/ _react.createElement(_ToolbarButton.ToolbarButton, {
                title: title,
                testId: `${mark}-toolbar-button`,
                onClick: handleClick,
                isActive: (0, _queries.isMarkActive)(editor, mark),
                isDisabled: isDisabled
            }, icon);
        };
        Mark.displayName = mark;
        return Mark;
    };
});
