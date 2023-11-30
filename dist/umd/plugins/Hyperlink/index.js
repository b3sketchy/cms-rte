(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./components/ToolbarHyperlinkButton"), require("./createHyperlinkPlugin"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./components/ToolbarHyperlinkButton",
        "./createHyperlinkPlugin"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.toolbarHyperlinkButton, global.createHyperlinkPlugin);
})(this, function(exports, _ToolbarHyperlinkButton, _createHyperlinkPlugin) {
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
        ToolbarHyperlinkButton: function() {
            return _ToolbarHyperlinkButton.ToolbarHyperlinkButton;
        },
        createHyperlinkPlugin: function() {
            return _createHyperlinkPlugin.createHyperlinkPlugin;
        }
    });
});
