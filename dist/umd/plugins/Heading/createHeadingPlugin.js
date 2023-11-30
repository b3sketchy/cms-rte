(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("is-hotkey"), require("../../helpers/editor"), require("../../helpers/transformers"), require("../../internal/queries"), require("../CommandPalette/constants"), require("./components/Heading"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "is-hotkey",
        "../../helpers/editor",
        "../../helpers/transformers",
        "../../internal/queries",
        "../CommandPalette/constants",
        "./components/Heading"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createHeadingPlugin = {}, global.richTextTypes, global.isHotkey, global.editor, global.transformers, global.queries, global.constants, global.heading);
})(this, function(exports, _richtexttypes, _ishotkey, _editor, _transformers, _queries, _constants, _Heading) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createHeadingPlugin", {
        enumerable: true,
        get: function() {
            return createHeadingPlugin;
        }
    });
    _ishotkey = /*#__PURE__*/ _interop_require_default(_ishotkey);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const buildHeadingEventHandler = (type)=>(editor, { options: { hotkey } })=>(event)=>{
                if (editor.selection && hotkey && (0, _ishotkey.default)(hotkey, event)) {
                    const isActive = (0, _editor.isBlockSelected)(editor, type);
                    editor.tracking.onShortcutAction(isActive ? 'remove' : 'insert', {
                        nodeType: type
                    });
                    (0, _editor.toggleElement)(editor, {
                        activeType: type,
                        inactiveType: _richtexttypes.BLOCKS.PARAGRAPH
                    });
                }
            };
    const createHeadingPlugin = ()=>({
            key: 'HeadingPlugin',
            softBreak: [
                // create a new line with SHIFT+Enter inside a heading
                {
                    hotkey: 'shift+enter',
                    query: {
                        allow: _richtexttypes.HEADINGS
                    }
                }
            ],
            normalizer: [
                {
                    match: {
                        type: _richtexttypes.HEADINGS
                    },
                    validChildren: (_, [node])=>(0, _editor.isInlineOrText)(node),
                    transform: {
                        [_richtexttypes.BLOCKS.PARAGRAPH]: _transformers.transformUnwrap,
                        default: _transformers.transformLift
                    }
                }
            ],
            then: (editor)=>{
                return {
                    exitBreak: [
                        // Pressing ENTER at the start or end of a heading text inserts a
                        // normal paragraph.
                        {
                            hotkey: 'enter',
                            query: {
                                allow: _richtexttypes.HEADINGS,
                                end: true,
                                start: true,
                                // Exclude headings inside lists as it interferes with the list's
                                // insertBreak implementation
                                filter: ([, path])=>!(0, _queries.getAboveNode)(editor, {
                                        at: path,
                                        match: {
                                            type: _richtexttypes.BLOCKS.LIST_ITEM
                                        }
                                    }) && !(0, _queries.isMarkActive)(editor, _constants.COMMAND_PROMPT)
                            }
                        }
                    ]
                };
            },
            plugins: _richtexttypes.HEADINGS.map((nodeType, idx)=>{
                const level = idx + 1;
                const tagName = `h${level}`;
                return {
                    key: nodeType,
                    type: nodeType,
                    isElement: true,
                    component: _Heading.HeadingComponents[nodeType],
                    options: {
                        hotkey: [
                            `mod+alt+${level}`
                        ]
                    },
                    handlers: {
                        onKeyDown: buildHeadingEventHandler(nodeType)
                    },
                    deserializeHtml: {
                        rules: [
                            {
                                validNodeName: tagName.toUpperCase()
                            }
                        ]
                    }
                };
            })
        });
});
