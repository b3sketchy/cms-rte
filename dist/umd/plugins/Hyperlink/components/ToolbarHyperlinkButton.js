(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-icons"), require("../../../ContentfulEditorProvider"), require("../../../helpers/editor"), require("../../../SdkProvider"), require("../../shared/ToolbarButton"), require("../HyperlinkModal"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-icons",
        "../../../ContentfulEditorProvider",
        "../../../helpers/editor",
        "../../../SdkProvider",
        "../../shared/ToolbarButton",
        "../HyperlinkModal"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.toolbarHyperlinkButton = {}, global.react, global.f36Icons, global.contentfulEditorProvider, global.editor, global.sdkProvider, global.toolbarButton, global.hyperlinkModal);
})(this, function(exports, _react, _f36icons, _ContentfulEditorProvider, _editor, _SdkProvider, _ToolbarButton, _HyperlinkModal) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ToolbarHyperlinkButton", {
        enumerable: true,
        get: function() {
            return ToolbarHyperlinkButton;
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
    function ToolbarHyperlinkButton(props) {
        const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
        const isActive = !!(editor && (0, _editor.isLinkActive)(editor));
        const sdk = (0, _SdkProvider.useSdkContext)();
        async function handleClick() {
            if (!editor) return;
            if (isActive) {
                (0, _editor.unwrapLink)(editor);
                editor.tracking.onToolbarAction('unlinkHyperlinks');
            } else {
                (0, _HyperlinkModal.addOrEditLink)(editor, sdk, editor.tracking.onToolbarAction);
            }
        }
        if (!editor) return null;
        return /*#__PURE__*/ _react.createElement(_ToolbarButton.ToolbarButton, {
            title: "Hyperlink",
            testId: "hyperlink-toolbar-button",
            onClick: handleClick,
            isActive: isActive,
            isDisabled: props.isDisabled
        }, /*#__PURE__*/ _react.createElement(_f36icons.LinkIcon, null));
    }
});
