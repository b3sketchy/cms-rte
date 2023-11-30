(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-components"), require("../../../ContentfulEditorProvider"), require("../../../internal/queries"), require("../../../SdkProvider"), require("../../links-tracking"), require("../useResourceEntityInfo"), require("./linkHandlers"), require("./LinkPopover"), require("./styles"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-components",
        "../../../ContentfulEditorProvider",
        "../../../internal/queries",
        "../../../SdkProvider",
        "../../links-tracking",
        "../useResourceEntityInfo",
        "./linkHandlers",
        "./LinkPopover",
        "./styles"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.resourceHyperlink = {}, global.react, global.f36Components, global.contentfulEditorProvider, global.queries, global.sdkProvider, global.linksTracking, global.useResourceEntityInfo, global.linkHandlers, global.linkPopover, global.styles);
})(this, function(exports, _react, _f36components, _ContentfulEditorProvider, _queries, _SdkProvider, _linkstracking, _useResourceEntityInfo, _linkHandlers, _LinkPopover, _styles) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ResourceHyperlink", {
        enumerable: true,
        get: function() {
            return ResourceHyperlink;
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
    function ResourceHyperlink(props) {
        const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
        const sdk = (0, _SdkProvider.useSdkContext)();
        const focus = editor.selection?.focus;
        const { target } = props.element.data;
        const { onEntityFetchComplete } = (0, _linkstracking.useLinkTracking)();
        const pathToElement = (0, _queries.findNodePath)(editor, props.element);
        const isLinkFocused = pathToElement && focus && (0, _queries.isChildPath)(focus.path, pathToElement);
        const tooltipContent = (0, _useResourceEntityInfo.useResourceEntityInfo)({
            target,
            onEntityFetchComplete
        });
        if (!target) {
            return null;
        }
        const popoverText = /*#__PURE__*/ _react.createElement(_f36components.Text, {
            fontColor: "blue600",
            fontWeight: "fontWeightMedium",
            className: _styles.styles.openLink
        }, tooltipContent);
        return /*#__PURE__*/ _react.createElement(_LinkPopover.LinkPopover, {
            isLinkFocused: isLinkFocused,
            handleEditLink: ()=>(0, _linkHandlers.handleEditLink)(editor, sdk, pathToElement),
            handleRemoveLink: ()=>(0, _linkHandlers.handleRemoveLink)(editor),
            popoverText: popoverText
        }, /*#__PURE__*/ _react.createElement(_f36components.Text, {
            testId: "cf-ui-text-link",
            fontColor: "blue600",
            fontWeight: "fontWeightMedium",
            className: _styles.styles.hyperlink,
            "data-resource-link-type": target.sys.linkType,
            "data-resource-link-urn": target.sys.urn
        }, props.children));
    }
});
