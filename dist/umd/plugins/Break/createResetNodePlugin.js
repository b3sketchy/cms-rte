(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-reset-node"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-reset-node"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createResetNodePlugin = {}, global.richTextTypes, global.plateResetNode);
})(this, function(exports, _richtexttypes, _plateresetnode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createResetNodePlugin", {
        enumerable: true,
        get: function() {
            return createResetNodePlugin;
        }
    });
    const createResetNodePlugin = ()=>(0, _plateresetnode.createResetNodePlugin)({
            options: {
                rules: []
            },
            then: (editor)=>{
                const rules = editor.plugins.flatMap((p)=>{
                    return p.resetNode || [];
                });
                // set defaultType to Paragraph if not set
                for (const rule of rules){
                    if (!rule.defaultType) {
                        rule.defaultType = _richtexttypes.BLOCKS.PARAGRAPH;
                    }
                }
                return {
                    options: {
                        rules
                    }
                };
            }
        });
});
