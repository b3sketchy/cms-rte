(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.schema = {}, global.richTextTypes);
})(this, function(exports, _richtexttypes) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "default", {
        enumerable: true,
        get: function() {
            return _default;
        }
    });
    const inlines = Object.values(_richtexttypes.INLINES).map((type)=>({
            type
        }));
    const _default = {
        document: {
            nodes: [
                {
                    types: _richtexttypes.TOP_LEVEL_BLOCKS.map((type)=>({
                            type
                        }))
                }
            ]
        },
        blocks: {
            [_richtexttypes.BLOCKS.PARAGRAPH]: {
                nodes: [
                    {
                        match: [
                            ...inlines,
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.BLOCKS.HEADING_1]: {
                nodes: [
                    {
                        match: [
                            ...inlines,
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.BLOCKS.HEADING_2]: {
                nodes: [
                    {
                        match: [
                            ...inlines,
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.BLOCKS.HEADING_3]: {
                nodes: [
                    {
                        match: [
                            ...inlines,
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.BLOCKS.HEADING_4]: {
                nodes: [
                    {
                        match: [
                            ...inlines,
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.BLOCKS.HEADING_5]: {
                nodes: [
                    {
                        match: [
                            ...inlines,
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.BLOCKS.HEADING_6]: {
                nodes: [
                    {
                        match: [
                            ...inlines,
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            ..._richtexttypes.VOID_BLOCKS.reduce((blocks, nodeType)=>({
                    ...blocks,
                    [nodeType]: {
                        isVoid: true
                    }
                }), {}),
            // TODO: add list schema
            [_richtexttypes.BLOCKS.QUOTE]: {
                nodes: [
                    {
                        match: [
                            _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.QUOTE].map((type)=>({
                                    type
                                }))
                        ],
                        min: 1
                    }
                ],
                normalize: (editor, error)=>{
                    if (error.code === 'child_type_invalid') {
                        return editor.unwrapBlockByKey(error.node.key, _richtexttypes.BLOCKS.QUOTE);
                    }
                }
            }
        },
        inlines: {
            [_richtexttypes.INLINES.HYPERLINK]: {
                nodes: [
                    {
                        match: [
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.INLINES.ENTRY_HYPERLINK]: {
                nodes: [
                    {
                        match: [
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.INLINES.RESOURCE_HYPERLINK]: {
                nodes: [
                    {
                        match: [
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.INLINES.ASSET_HYPERLINK]: {
                nodes: [
                    {
                        match: [
                            {
                                object: 'text'
                            }
                        ]
                    }
                ]
            },
            [_richtexttypes.INLINES.EMBEDDED_ENTRY]: {
                isVoid: true
            },
            [_richtexttypes.INLINES.EMBEDDED_RESOURCE]: {
                isVoid: true
            }
        }
    };
});
