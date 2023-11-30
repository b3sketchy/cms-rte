(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/rich-text-types"), require("../../ContentfulEditorProvider"), require("../../helpers/editor"), require("../../helpers/validations"), require("../../plugins/shared/EmbeddedBlockToolbarIcon"), require("../../plugins/shared/EmbeddedInlineToolbarIcon"), require("../../SdkProvider"), require("./EmbeddedEntityDropdownButton"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/rich-text-types",
        "../../ContentfulEditorProvider",
        "../../helpers/editor",
        "../../helpers/validations",
        "../../plugins/shared/EmbeddedBlockToolbarIcon",
        "../../plugins/shared/EmbeddedInlineToolbarIcon",
        "../../SdkProvider",
        "./EmbeddedEntityDropdownButton"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.embedEntityWidget = {}, global.react, global.richTextTypes, global.contentfulEditorProvider, global.editor, global.validations, global.embeddedBlockToolbarIcon, global.embeddedInlineToolbarIcon, global.sdkProvider, global.embeddedEntityDropdownButton);
})(this, function(exports, _react, _richtexttypes, _ContentfulEditorProvider, _editor, _validations, _EmbeddedBlockToolbarIcon, _EmbeddedInlineToolbarIcon, _SdkProvider, _EmbeddedEntityDropdownButton) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "EmbedEntityWidget", {
        enumerable: true,
        get: function() {
            return EmbedEntityWidget;
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
    const EmbedEntityWidget = ({ isDisabled, canInsertBlocks })=>{
        const sdk = (0, _SdkProvider.useSdkContext)();
        const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
        const [isEmbedDropdownOpen, setEmbedDropdownOpen] = (0, _react.useState)(false);
        const onCloseEntityDropdown = ()=>setEmbedDropdownOpen(false);
        const onToggleEntityDropdown = ()=>setEmbedDropdownOpen(!isEmbedDropdownOpen);
        const inlineEntryEmbedEnabled = (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.INLINES.EMBEDDED_ENTRY);
        const inlineResourceEmbedEnabled = (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.INLINES.EMBEDDED_RESOURCE);
        const blockEntryEmbedEnabled = (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.BLOCKS.EMBEDDED_ENTRY) && canInsertBlocks;
        const blockResourceEmbedEnabled = (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.BLOCKS.EMBEDDED_RESOURCE) && canInsertBlocks;
        // Removed access check following https://contentful.atlassian.net/browse/DANTE-486
        // TODO: refine permissions check in order to account for tags in rules and then readd access.can('read', 'Asset')
        const blockAssetEmbedEnabled = (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.BLOCKS.EMBEDDED_ASSET) && canInsertBlocks;
        const actions = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, blockEntryEmbedEnabled && /*#__PURE__*/ _react.default.createElement(_EmbeddedBlockToolbarIcon.EmbeddedBlockToolbarIcon, {
            isDisabled: !!isDisabled,
            nodeType: _richtexttypes.BLOCKS.EMBEDDED_ENTRY,
            onClose: onCloseEntityDropdown
        }), blockResourceEmbedEnabled && /*#__PURE__*/ _react.default.createElement(_EmbeddedBlockToolbarIcon.EmbeddedBlockToolbarIcon, {
            isDisabled: !!isDisabled,
            nodeType: _richtexttypes.BLOCKS.EMBEDDED_RESOURCE,
            onClose: onCloseEntityDropdown
        }), inlineEntryEmbedEnabled && /*#__PURE__*/ _react.default.createElement(_EmbeddedInlineToolbarIcon.EmbeddedInlineToolbarIcon, {
            nodeType: _richtexttypes.INLINES.EMBEDDED_ENTRY,
            isDisabled: !!isDisabled || (0, _editor.isLinkActive)(editor),
            onClose: onCloseEntityDropdown
        }), inlineResourceEmbedEnabled && /*#__PURE__*/ _react.default.createElement(_EmbeddedInlineToolbarIcon.EmbeddedInlineToolbarIcon, {
            nodeType: _richtexttypes.INLINES.EMBEDDED_RESOURCE,
            isDisabled: !!isDisabled || (0, _editor.isLinkActive)(editor),
            onClose: onCloseEntityDropdown
        }), blockAssetEmbedEnabled && /*#__PURE__*/ _react.default.createElement(_EmbeddedBlockToolbarIcon.EmbeddedBlockToolbarIcon, {
            isDisabled: !!isDisabled,
            nodeType: _richtexttypes.BLOCKS.EMBEDDED_ASSET,
            onClose: onCloseEntityDropdown
        }));
        const showEmbedButton = blockEntryEmbedEnabled || blockResourceEmbedEnabled || inlineEntryEmbedEnabled || inlineResourceEmbedEnabled || blockAssetEmbedEnabled;
        return showEmbedButton ? /*#__PURE__*/ _react.default.createElement(_EmbeddedEntityDropdownButton.EmbeddedEntityDropdownButton, {
            isDisabled: isDisabled,
            onClose: onCloseEntityDropdown,
            onToggle: onToggleEntityDropdown,
            isOpen: isEmbedDropdownOpen
        }, actions) : null;
    };
});
