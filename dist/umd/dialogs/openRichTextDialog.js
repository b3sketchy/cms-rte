(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/field-editor-shared"), require("./HypelinkDialog/HyperlinkDialog"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/field-editor-shared",
        "./HypelinkDialog/HyperlinkDialog"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.openRichTextDialog = {}, global.react, global.fieldEditorShared, global.hyperlinkDialog);
})(this, function(exports, _react, _fieldeditorshared, _HyperlinkDialog) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "openRichTextDialog", {
        enumerable: true,
        get: function() {
            return openRichTextDialog;
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
    const openRichTextDialog = (sdk)=>(options)=>{
            if (options.parameters?.type === 'rich-text-hyperlink-dialog') {
                return _fieldeditorshared.ModalDialogLauncher.openDialog(options, ({ onClose })=>{
                    return /*#__PURE__*/ _react.createElement(_HyperlinkDialog.HyperlinkDialog, {
                        ...options.parameters,
                        onClose: onClose,
                        sdk: sdk
                    });
                });
            }
            return Promise.reject();
        };
});
