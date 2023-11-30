(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("slate-react"), require("../../ContentfulEditorProvider"), require("../../internal"), require("../../SdkProvider"), require("../links-tracking"), require("../shared/LinkedInlineWrapper"), require("./FetchingWrappedResourceInlineCard"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "slate-react",
        "../../ContentfulEditorProvider",
        "../../internal",
        "../../SdkProvider",
        "../links-tracking",
        "../shared/LinkedInlineWrapper",
        "./FetchingWrappedResourceInlineCard"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.linkedResourceInline = {}, global.react, global.slateReact, global.contentfulEditorProvider, global.internal, global.sdkProvider, global.linksTracking, global.linkedInlineWrapper, global.fetchingWrappedResourceInlineCard);
})(this, function(exports, _react, _slatereact, _ContentfulEditorProvider, _internal, _SdkProvider, _linkstracking, _LinkedInlineWrapper, _FetchingWrappedResourceInlineCard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "LinkedResourceInline", {
        enumerable: true,
        get: function() {
            return LinkedResourceInline;
        }
    });
    _react = /*#__PURE__*/ _interop_require_default(_react);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function LinkedResourceInline(props) {
        const { attributes, children, element } = props;
        const { onEntityFetchComplete } = (0, _linkstracking.useLinkTracking)();
        const isSelected = (0, _slatereact.useSelected)();
        const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
        const sdk = (0, _SdkProvider.useSdkContext)();
        const isDisabled = (0, _slatereact.useReadOnly)();
        const link = element.data.target.sys;
        function handleRemoveClick() {
            if (!editor) return;
            const pathToElement = (0, _internal.findNodePath)(editor, element);
            (0, _internal.removeNodes)(editor, {
                at: pathToElement
            });
        }
        return /*#__PURE__*/ _react.default.createElement(_LinkedInlineWrapper.LinkedInlineWrapper, {
            attributes: attributes,
            link: element.data.target,
            card: /*#__PURE__*/ _react.default.createElement(_FetchingWrappedResourceInlineCard.FetchingWrappedResourceInlineCard, {
                sdk: sdk,
                link: link,
                isDisabled: isDisabled,
                isSelected: isSelected,
                onRemove: handleRemoveClick,
                onEntityFetchComplete: onEntityFetchComplete
            })
        }, children);
    }
});
