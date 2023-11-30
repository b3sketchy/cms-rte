(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./components/CommandPrompt"), require("./constants"), require("./onKeyDown"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./components/CommandPrompt",
        "./constants",
        "./onKeyDown"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createCommandPalettePlugin = {}, global.commandPrompt, global.constants, global.onKeyDown);
})(this, function(exports, _CommandPrompt, _constants, _onKeyDown) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createCommandPalettePlugin", {
        enumerable: true,
        get: function() {
            return createCommandPalettePlugin;
        }
    });
    const createCommandPalettePlugin = ()=>{
        return {
            key: _constants.COMMAND_PROMPT,
            type: _constants.COMMAND_PROMPT,
            isLeaf: true,
            component: _CommandPrompt.CommandPrompt,
            handlers: {
                onKeyDown: (0, _onKeyDown.createOnKeyDown)()
            }
        };
    };
});
