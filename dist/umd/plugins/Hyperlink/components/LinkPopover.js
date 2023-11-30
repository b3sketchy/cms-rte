(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-components"), require("@contentful/f36-icons"), require("../../../internal/hooks"), require("./styles"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-components",
        "@contentful/f36-icons",
        "../../../internal/hooks",
        "./styles"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.linkPopover = {}, global.react, global.f36Components, global.f36Icons, global.hooks, global.styles);
})(this, function(exports, _react, _f36components, _f36icons, _hooks, _styles) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "LinkPopover", {
        enumerable: true,
        get: function() {
            return LinkPopover;
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
    const LinkPopover = ({ isLinkFocused, popoverText, handleEditLink, handleRemoveLink, children, handleCopyLink })=>{
        const isEditorFocused = (0, _hooks.useFocused)();
        const popoverContent = _react.useRef(null);
        const [isPopoverContentClicked, setIsPopoverContentClicked] = _react.useState(false);
        _react.useEffect(()=>{
            const handleMouseDown = (event)=>{
                if (popoverContent.current && popoverContent.current.contains(event.target)) {
                    setIsPopoverContentClicked(true);
                } else {
                    setIsPopoverContentClicked(false);
                }
            };
            document.addEventListener('mousedown', handleMouseDown);
            return ()=>{
                document.removeEventListener('mousedown', handleMouseDown);
            };
        }, []);
        const isOpen = isLinkFocused && isEditorFocused || isPopoverContentClicked;
        // Important to render this component in a portal
        // Otherwise the content of the popover will get copied over when users copy text from the rich text editor
        return(// eslint-disable-next-line jsx-a11y/no-autofocus -- we don't want to autofocus the popover
        /*#__PURE__*/ _react.createElement(_f36components.Popover, {
            renderOnlyWhenOpen: false,
            usePortal: true,
            autoFocus: false,
            isOpen: isOpen
        }, /*#__PURE__*/ _react.createElement(_f36components.Popover.Trigger, null, children), /*#__PURE__*/ _react.createElement(_f36components.Popover.Content, {
            className: _styles.styles.popover
        }, /*#__PURE__*/ _react.createElement(_f36components.Flex, {
            ref: popoverContent,
            alignItems: "center",
            paddingTop: "spacing2Xs",
            paddingBottom: "spacing2Xs",
            paddingRight: "spacing2Xs",
            paddingLeft: "spacingXs"
        }, popoverText, handleCopyLink && /*#__PURE__*/ _react.createElement(_f36components.Tooltip, {
            placement: "bottom",
            content: "Copy link",
            usePortal: true
        }, /*#__PURE__*/ _react.createElement(_f36components.IconButton, {
            className: _styles.styles.iconButton,
            onClick: handleCopyLink,
            size: "small",
            variant: "transparent",
            "aria-label": "Copy link",
            icon: /*#__PURE__*/ _react.createElement(_f36icons.CopyIcon, {
                size: "tiny"
            })
        })), /*#__PURE__*/ _react.createElement(_f36components.Tooltip, {
            placement: "bottom",
            content: "Edit link",
            usePortal: true
        }, /*#__PURE__*/ _react.createElement(_f36components.IconButton, {
            className: _styles.styles.iconButton,
            onClick: handleEditLink,
            size: "small",
            variant: "transparent",
            "aria-label": "Edit link",
            icon: /*#__PURE__*/ _react.createElement(_f36icons.EditIcon, {
                size: "tiny"
            })
        })), /*#__PURE__*/ _react.createElement(_f36components.Tooltip, {
            placement: "bottom",
            content: "Remove link",
            usePortal: true
        }, /*#__PURE__*/ _react.createElement(_f36components.IconButton, {
            onClick: handleRemoveLink,
            className: _styles.styles.iconButton,
            size: "small",
            variant: "transparent",
            "aria-label": "Remove link",
            icon: //@TODO: Replace icon when available in f36
            /*#__PURE__*/ _react.createElement("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, /*#__PURE__*/ _react.createElement("path", {
                d: "M1.75 8C1.75 8.59674 1.98705 9.16903 2.40901 9.59099C2.83097 10.0129 3.40326 10.25 4 10.25H6.5C6.69891 10.25 6.88968 10.329 7.03033 10.4697C7.17098 10.6103 7.25 10.8011 7.25 11C7.25 11.1989 7.17098 11.3897 7.03033 11.5303C6.88968 11.671 6.69891 11.75 6.5 11.75H4C3.00544 11.75 2.05161 11.3549 1.34835 10.6517C0.645088 9.94839 0.25 8.99456 0.25 8C0.25 7.00544 0.645088 6.05161 1.34835 5.34835C2.05161 4.64509 3.00544 4.25 4 4.25H6.5C6.69891 4.25 6.88968 4.32902 7.03033 4.46967C7.17098 4.61032 7.25 4.80109 7.25 5C7.25 5.19891 7.17098 5.38968 7.03033 5.53033C6.88968 5.67098 6.69891 5.75 6.5 5.75H4C3.40326 5.75 2.83097 5.98705 2.40901 6.40901C1.98705 6.83097 1.75 7.40326 1.75 8ZM12 4.25H9.5C9.30109 4.25 9.11032 4.32902 8.96967 4.46967C8.82902 4.61032 8.75 4.80109 8.75 5C8.75 5.19891 8.82902 5.38968 8.96967 5.53033C9.11032 5.67098 9.30109 5.75 9.5 5.75H12C12.5967 5.75 13.169 5.98705 13.591 6.40901C14.0129 6.83097 14.25 7.40326 14.25 8C14.25 8.59674 14.0129 9.16903 13.591 9.59099C13.169 10.0129 12.5967 10.25 12 10.25H9.5C9.30109 10.25 9.11032 10.329 8.96967 10.4697C8.82902 10.6103 8.75 10.8011 8.75 11C8.75 11.1989 8.82902 11.3897 8.96967 11.5303C9.11032 11.671 9.30109 11.75 9.5 11.75H12C12.9946 11.75 13.9484 11.3549 14.6517 10.6517C15.3549 9.94839 15.75 8.99456 15.75 8C15.75 7.00544 15.3549 6.05161 14.6517 5.34835C13.9484 4.64509 12.9946 4.25 12 4.25Z",
                fill: "black"
            }))
        }))))));
    };
});
