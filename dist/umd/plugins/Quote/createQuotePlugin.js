(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../../helpers/transformers"), require("./components/Quote"), require("./shouldResetQuote"), require("./toggleQuote"), require("./withQuote"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../../helpers/transformers",
        "./components/Quote",
        "./shouldResetQuote",
        "./toggleQuote",
        "./withQuote"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createQuotePlugin = {}, global.richTextTypes, global.transformers, global.quote, global.shouldResetQuote, global.toggleQuote, global.withQuote);
})(this, function(exports, _richtexttypes, _transformers, _Quote, _shouldResetQuote, _toggleQuote, _withQuote) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createQuotePlugin", {
        enumerable: true,
        get: function() {
            return createQuotePlugin;
        }
    });
    function createQuotePlugin() {
        return {
            key: _richtexttypes.BLOCKS.QUOTE,
            type: _richtexttypes.BLOCKS.QUOTE,
            isElement: true,
            component: _Quote.Quote,
            options: {
                hotkey: 'mod+shift+1'
            },
            handlers: {
                onKeyDown: _toggleQuote.onKeyDownToggleQuote
            },
            deserializeHtml: {
                rules: [
                    {
                        validNodeName: 'BLOCKQUOTE'
                    }
                ]
            },
            resetNode: [
                {
                    // toggle off blockquote on backspace when it's empty
                    hotkey: 'backspace',
                    types: [
                        _richtexttypes.BLOCKS.QUOTE
                    ],
                    predicate: _shouldResetQuote.shouldResetQuoteOnBackspace,
                    onReset: _toggleQuote.toggleQuote
                }
            ],
            normalizer: [
                {
                    validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.QUOTE],
                    transform: {
                        [_richtexttypes.BLOCKS.QUOTE]: _transformers.transformUnwrap,
                        default: _transformers.transformLift
                    }
                }
            ],
            withOverrides: _withQuote.withQuote
        };
    }
});
