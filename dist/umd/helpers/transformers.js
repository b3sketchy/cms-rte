(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../internal/transforms"), require("./extractNodes"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../internal/transforms",
        "./extractNodes"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.transformers = {}, global.transforms, global.extractNodes);
})(this, function(exports, _transforms, _extractNodes) {
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
        transformLift: function() {
            return transformLift;
        },
        transformParagraphs: function() {
            return transformParagraphs;
        },
        transformRemove: function() {
            return transformRemove;
        },
        transformUnwrap: function() {
            return transformUnwrap;
        },
        transformWrapIn: function() {
            return transformWrapIn;
        }
    });
    const transformRemove = (editor, [, path])=>{
        (0, _transforms.removeNodes)(editor, {
            at: path
        });
    };
    const transformParagraphs = (editor, entry)=>{
        const path = entry[1];
        const nodes = (0, _extractNodes.extractParagraphs)(editor, path);
        transformRemove(editor, entry);
        (0, _transforms.insertNodes)(editor, nodes, {
            at: path
        });
    };
    const transformUnwrap = (editor, [, path])=>{
        (0, _transforms.unwrapNodes)(editor, {
            at: path
        });
    };
    const transformWrapIn = (type)=>(editor, [, path])=>{
            (0, _transforms.wrapNodes)(editor, {
                type,
                data: {},
                children: []
            }, {
                at: path
            });
        };
    const transformLift = (editor, [, path])=>{
        (0, _transforms.liftNodes)(editor, {
            at: path
        });
    };
});
