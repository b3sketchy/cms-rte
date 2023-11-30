(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@udecode/plate-break"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@udecode/plate-break"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createExitBreakPlugin = {}, global.plateBreak);
})(this, function(exports, _platebreak) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createExitBreakPlugin", {
        enumerable: true,
        get: function() {
            return createExitBreakPlugin;
        }
    });
    const createExitBreakPlugin = ()=>(0, _platebreak.createExitBreakPlugin)({
            options: {
                rules: []
            },
            then: (editor)=>{
                const rules = editor.plugins.flatMap((p)=>{
                    return p.exitBreak || [];
                });
                return {
                    options: {
                        rules
                    }
                };
            }
        });
});
