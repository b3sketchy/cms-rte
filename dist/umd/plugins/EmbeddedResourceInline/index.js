(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../shared/EmbeddedInlineUtil"), require("./LinkedResourceInline"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../shared/EmbeddedInlineUtil",
        "./LinkedResourceInline"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.richTextTypes, global.embeddedInlineUtil, global.linkedResourceInline);
})(this, function(exports, _richtexttypes, _EmbeddedInlineUtil, _LinkedResourceInline) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createEmbeddedResourceInlinePlugin", {
        enumerable: true,
        get: function() {
            return createEmbeddedResourceInlinePlugin;
        }
    });
    function createEmbeddedResourceInlinePlugin(sdk) {
        const htmlAttributeName = 'data-embedded-resource-inline-id';
        const nodeType = _richtexttypes.INLINES.EMBEDDED_RESOURCE;
        return {
            key: nodeType,
            type: nodeType,
            isElement: true,
            isInline: true,
            isVoid: true,
            component: _LinkedResourceInline.LinkedResourceInline,
            options: {
                hotkey: 'mod+shift+p'
            },
            handlers: {
                onKeyDown: (0, _EmbeddedInlineUtil.getWithEmbeddedEntryInlineEvents)(nodeType, sdk)
            },
            deserializeHtml: {
                rules: [
                    {
                        validAttribute: htmlAttributeName
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
        };
    }
});
