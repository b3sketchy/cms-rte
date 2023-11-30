(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createInlineEntryNode = {}, global.richTextTypes);
})(this, function(exports, _richtexttypes) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createInlineEntryNode", {
        enumerable: true,
        get: function() {
            return createInlineEntryNode;
        }
    });
    function createInlineEntryNode(id) {
        return {
            type: _richtexttypes.INLINES.EMBEDDED_ENTRY,
            children: [
                {
                    text: ''
                }
            ],
            data: {
                target: {
                    sys: {
                        id,
                        type: 'Link',
                        linkType: 'Entry'
                    }
                }
            }
        };
    }
});
