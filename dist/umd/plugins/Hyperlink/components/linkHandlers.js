(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/f36-components"), require("../../../helpers/editor"), require("../HyperlinkModal"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/f36-components",
        "../../../helpers/editor",
        "../HyperlinkModal"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.linkHandlers = {}, global.f36Components, global.editor, global.hyperlinkModal);
})(this, function(exports, _f36components, _editor, _HyperlinkModal) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports, {
        handleCopyLink: function() {
            return handleCopyLink;
        },
        handleEditLink: function() {
            return handleEditLink;
        },
        handleRemoveLink: function() {
            return handleRemoveLink;
        }
    });
    const handleEditLink = (editor, sdk, pathToElement)=>{
        if (!editor || !pathToElement) return;
        (0, _HyperlinkModal.addOrEditLink)(editor, sdk, editor.tracking.onViewportAction, pathToElement);
    };
    const handleRemoveLink = (editor)=>{
        (0, _editor.unwrapLink)(editor);
    };
    const handleCopyLink = async (uri)=>{
        if (uri) {
            try {
                await navigator.clipboard.writeText(uri);
                _f36components.Notification.success('Successfully copied URL to clipboard');
            } catch (error) {
                _f36components.Notification.error('Failed to copy URL to clipboard');
            }
        }
    };
});
