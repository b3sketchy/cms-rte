(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../shared/EmbeddedBlockUtil"), require("./LinkedResourceBlock"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../shared/EmbeddedBlockUtil",
        "./LinkedResourceBlock"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.richTextTypes, global.embeddedBlockUtil, global.linkedResourceBlock);
})(this, function(exports, _richtexttypes, _EmbeddedBlockUtil, _LinkedResourceBlock) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createEmbeddedResourceBlockPlugin", {
        enumerable: true,
        get: function() {
            return createEmbeddedResourceBlockPlugin;
        }
    });
    const createEmbeddedResourcePlugin = (nodeType, hotkey)=>(sdk)=>({
                key: nodeType,
                type: nodeType,
                isElement: true,
                isVoid: true,
                component: _LinkedResourceBlock.LinkedResourceBlock,
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
                                'data-entity-type': 'Contentful:Entry'
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
                                        urn: el.getAttribute('data-entity-id'),
                                        linkType: el.getAttribute('data-entity-type'),
                                        type: 'ResourceLink'
                                    }
                                }
                            }
                        })
                }
            });
    const createEmbeddedResourceBlockPlugin = createEmbeddedResourcePlugin(_richtexttypes.BLOCKS.EMBEDDED_RESOURCE, 'mod+shift+s');
});
