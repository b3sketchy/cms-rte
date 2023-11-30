(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-icons"), require("@contentful/rich-text-types"), require("../../../ContentfulEditorProvider"), require("../../../helpers/editor"), require("../../../helpers/validations"), require("../../../SdkProvider"), require("../../shared/ToolbarButton"), require("../transforms/toggleList"), require("../utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-icons",
        "@contentful/rich-text-types",
        "../../../ContentfulEditorProvider",
        "../../../helpers/editor",
        "../../../helpers/validations",
        "../../../SdkProvider",
        "../../shared/ToolbarButton",
        "../transforms/toggleList",
        "../utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.toolbarListButton = {}, global.react, global.f36Icons, global.richTextTypes, global.contentfulEditorProvider, global.editor, global.validations, global.sdkProvider, global.toolbarButton, global.toggleList, global.utils);
})(this, function(exports, _react, _f36icons, _richtexttypes, _ContentfulEditorProvider, _editor, _validations, _SdkProvider, _ToolbarButton, _toggleList, _utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ToolbarListButton", {
        enumerable: true,
        get: function() {
            return ToolbarListButton;
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
    function ToolbarListButton(props) {
        const sdk = (0, _SdkProvider.useSdkContext)();
        const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
        function handleClick(type) {
            return ()=>{
                if (!editor?.selection) return;
                (0, _toggleList.toggleList)(editor, {
                    type
                });
                (0, _editor.focus)(editor);
            };
        }
        if (!editor) return null;
        return /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.BLOCKS.UL_LIST) && /*#__PURE__*/ _react.createElement(_ToolbarButton.ToolbarButton, {
            title: "UL",
            testId: "ul-toolbar-button",
            onClick: handleClick(_richtexttypes.BLOCKS.UL_LIST),
            isActive: (0, _utils.isListTypeActive)(editor, _richtexttypes.BLOCKS.UL_LIST),
            isDisabled: props.isDisabled
        }, /*#__PURE__*/ _react.createElement(_f36icons.ListBulletedIcon, null)), (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.BLOCKS.OL_LIST) && /*#__PURE__*/ _react.createElement(_ToolbarButton.ToolbarButton, {
            title: "OL",
            testId: "ol-toolbar-button",
            onClick: handleClick(_richtexttypes.BLOCKS.OL_LIST),
            isActive: (0, _utils.isListTypeActive)(editor, _richtexttypes.BLOCKS.OL_LIST),
            isDisabled: props.isDisabled
        }, /*#__PURE__*/ _react.createElement(_f36icons.ListNumberedIcon, null)));
    }
});
