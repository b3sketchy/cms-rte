(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.nodeFactory = {});
})(this, function(exports) {
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
        block: function() {
            return block;
        },
        document: function() {
            return document;
        },
        inline: function() {
            return inline;
        },
        mark: function() {
            return mark;
        },
        text: function() {
            return text;
        }
    });
    const document = (...content)=>({
            nodeType: 'document',
            content,
            data: {}
        });
    const block = (nodeType, data, ...content)=>({
            nodeType,
            content,
            data
        });
    const inline = (nodeType, data, ...content)=>({
            nodeType,
            content,
            data
        });
    const text = (value = '', marks = [])=>({
            nodeType: 'text',
            value,
            marks,
            data: {}
        });
    const mark = (type)=>({
            type
        });
});
