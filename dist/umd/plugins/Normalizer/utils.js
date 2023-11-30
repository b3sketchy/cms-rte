(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../internal/queries"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../internal/queries"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.utils = {}, global.queries);
})(this, function(exports, _queries) {
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
        NormalizerError: function() {
            return NormalizerError;
        },
        createTransformerFromObject: function() {
            return createTransformerFromObject;
        },
        createValidatorFromTypes: function() {
            return createValidatorFromTypes;
        }
    });
    class NormalizerError extends Error {
    }
    const createValidatorFromTypes = (types)=>(_, [node])=>{
            return (0, _queries.isElement)(node) && types.includes(node.type);
        };
    const createTransformerFromObject = (transforms)=>{
        // A default transformer must always be provided
        const fallback = transforms['default'];
        if (!fallback) {
            throw new NormalizerError('A default transformer MUST be provided');
        }
        return (editor, entry)=>{
            const [node] = entry;
            const key = (0, _queries.isElement)(node) ? node.type : 'default';
            const transformer = transforms[key] || fallback;
            return transformer(editor, entry);
        };
    };
});
