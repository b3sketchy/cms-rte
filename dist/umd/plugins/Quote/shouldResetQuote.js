(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-common"), require("../../internal/queries"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-common",
        "../../internal/queries"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.shouldResetQuote = {}, global.richTextTypes, global.plateCommon, global.queries);
})(this, function(exports, _richtexttypes, _platecommon, _queries) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "shouldResetQuoteOnBackspace", {
        enumerable: true,
        get: function() {
            return shouldResetQuoteOnBackspace;
        }
    });
    const shouldResetQuoteOnBackspace = (editor)=>{
        const container = (0, _queries.getAboveNode)(editor, {
            match: {
                type: _richtexttypes.TEXT_CONTAINERS
            },
            mode: 'lowest'
        });
        if (!container) {
            return false;
        }
        if (!(0, _queries.isAncestorEmpty)(editor, container[0])) {
            return false;
        }
        const quote = (0, _queries.getBlockAbove)(editor, {
            match: {
                type: _richtexttypes.BLOCKS.QUOTE
            },
            mode: 'lowest'
        });
        if (!quote) {
            return false;
        }
        if ((0, _platecommon.hasSingleChild)(quote[0]) && (0, _platecommon.isLastChild)(quote, container[1])) {
            return true;
        }
        return false;
    };
});
