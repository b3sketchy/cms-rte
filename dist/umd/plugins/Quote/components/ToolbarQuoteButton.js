(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-icons"), require("@contentful/rich-text-types"), require("../../../ContentfulEditorProvider"), require("../../../helpers/editor"), require("../../shared/ToolbarButton"), require("../toggleQuote"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-icons",
        "@contentful/rich-text-types",
        "../../../ContentfulEditorProvider",
        "../../../helpers/editor",
        "../../shared/ToolbarButton",
        "../toggleQuote"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.toolbarQuoteButton = {}, global.react, global.f36Icons, global.richTextTypes, global.contentfulEditorProvider, global.editor, global.toolbarButton, global.toggleQuote);
})(this, function(exports, _react, _f36icons, _richtexttypes, _ContentfulEditorProvider, _editor, _ToolbarButton, _toggleQuote) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ToolbarQuoteButton", {
        enumerable: true,
        get: function() {
            return ToolbarQuoteButton;
        }
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
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
    function ToolbarQuoteButton(props) {
        const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
        function handleOnClick() {
            if (!editor) return;
            (0, _toggleQuote.toggleQuote)(editor, editor.tracking.onToolbarAction);
            (0, _editor.focus)(editor);
        }
        if (!editor) return null;
        return /*#__PURE__*/ _react.createElement(_ToolbarButton.ToolbarButton, {
            title: "Blockquote",
            onClick: handleOnClick,
            testId: "quote-toolbar-button",
            isDisabled: props.isDisabled,
            isActive: (0, _editor.isBlockSelected)(editor, _richtexttypes.BLOCKS.QUOTE)
        }, /*#__PURE__*/ _react.createElement(_f36icons.QuoteIcon, null));
    }
});
