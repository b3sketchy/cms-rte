(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../shared/EmbeddedInlineUtil"), require("./LinkedEntityInline"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../shared/EmbeddedInlineUtil",
        "./LinkedEntityInline"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.richTextTypes, global.embeddedInlineUtil, global.linkedEntityInline);
})(this, function(exports, _richtexttypes, _EmbeddedInlineUtil, _LinkedEntityInline) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createEmbeddedEntityInlinePlugin", {
        enumerable: true,
        get: function() {
            return createEmbeddedEntityInlinePlugin;
        }
    });
    function createEmbeddedEntityInlinePlugin(sdk) {
        const htmlAttributeName = 'data-embedded-entity-inline-id';
        const nodeType = _richtexttypes.INLINES.EMBEDDED_ENTRY;
        return {
            key: nodeType,
            type: nodeType,
            isElement: true,
            isInline: true,
            isVoid: true,
            component: _LinkedEntityInline.LinkedEntityInline,
            options: {
                hotkey: 'mod+shift+2'
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
                                    id: el.getAttribute('data-entity-id'),
                                    type: 'Link',
                                    linkType: el.getAttribute('data-entity-type')
                                }
                            }
                        }
                    })
            }
        };
    }
});
