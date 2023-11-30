(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("../ContentfulEditorProvider"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "../ContentfulEditorProvider"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.linksTracking = {}, global.react, global.contentfulEditorProvider);
})(this, function(exports, _react, _ContentfulEditorProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useLinkTracking", {
        enumerable: true,
        get: function() {
            return useLinkTracking;
        }
    });
    function useLinkTracking() {
        const editor = (0, _ContentfulEditorProvider.useContentfulEditorRef)();
        return {
            onEntityFetchComplete: (0, _react.useCallback)(()=>editor?.tracking.onViewportAction('linkRendered'), [
                editor
            ])
        };
    }
});
