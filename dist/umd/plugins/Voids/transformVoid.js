(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.transformVoid = {}, global.transforms);
})(this, function(exports, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "transformVoid", {
        enumerable: true,
        get: function() {
            return transformVoid;
        }
    });
    const transformVoid = (editor, [node, path])=>{
        const validVoid = {
            ...node,
            children: [
                {
                    text: ''
                }
            ]
        };
        // A workaround because Slate doesn't allow adjusting void nodes children
        (0, _transforms.removeNodes)(editor, {
            at: path
        });
        (0, _transforms.insertNodes)(editor, [
            validVoid
        ], {
            at: path
        });
    };
});
