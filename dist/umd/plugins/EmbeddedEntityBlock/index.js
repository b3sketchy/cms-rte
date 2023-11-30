(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../shared/EmbeddedBlockUtil"), require("./LinkedEntityBlock"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../shared/EmbeddedBlockUtil",
        "./LinkedEntityBlock"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.richTextTypes, global.embeddedBlockUtil, global.linkedEntityBlock);
})(this, function(exports, _richtexttypes, _EmbeddedBlockUtil, _LinkedEntityBlock) {
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
        createEmbeddedAssetBlockPlugin: function() {
            return createEmbeddedAssetBlockPlugin;
        },
        createEmbeddedEntryBlockPlugin: function() {
            return createEmbeddedEntryBlockPlugin;
        }
    });
    const entityTypes = {
        [_richtexttypes.BLOCKS.EMBEDDED_ENTRY]: 'Entry',
        [_richtexttypes.BLOCKS.EMBEDDED_ASSET]: 'Asset'
    };
    const createEmbeddedEntityPlugin = (nodeType, hotkey)=>(sdk)=>({
                key: nodeType,
                type: nodeType,
                isElement: true,
                isVoid: true,
                component: _LinkedEntityBlock.LinkedEntityBlock,
                options: {
                    hotkey
                },
                handlers: {
                    onKeyDown: (0, _EmbeddedBlockUtil.getWithEmbeddedBlockEvents)(nodeType, sdk)
                },
                deserializeHtml: {
                    rules: [
                        {
                            validAttribute: {
                                'data-entity-type': entityTypes[nodeType]
                            }
                        }
                    ],
                    withoutChildren: true,
                    getNode: (el)=>({
                            type: nodeType,
                            children: [
                                {
                                    text: ''
                                }
                            ],
                            isVoid: true,
                            data: {
                                target: {
                                    sys: {
                                        id: el.getAttribute('data-entity-id'),
                                        linkType: el.getAttribute('data-entity-type'),
                                        type: 'Link'
                                    }
                                }
                            }
                        })
                }
            });
    const createEmbeddedEntryBlockPlugin = createEmbeddedEntityPlugin(_richtexttypes.BLOCKS.EMBEDDED_ENTRY, 'mod+shift+e');
    const createEmbeddedAssetBlockPlugin = createEmbeddedEntityPlugin(_richtexttypes.BLOCKS.EMBEDDED_ASSET, 'mod+shift+a');
});
