(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-paragraph"), require("is-hotkey"), require("../../helpers/editor"), require("../../helpers/transformers"), require("./Paragraph"), require("./utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-paragraph",
        "is-hotkey",
        "../../helpers/editor",
        "../../helpers/transformers",
        "./Paragraph",
        "./utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createParagraphPlugin = {}, global.richTextTypes, global.plateParagraph, global.isHotkey, global.editor, global.transformers, global.paragraph, global.utils);
})(this, function(exports, _richtexttypes, _plateparagraph, _ishotkey, _editor, _transformers, _Paragraph, _utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createParagraphPlugin", {
        enumerable: true,
        get: function() {
            return createParagraphPlugin;
        }
    });
    _ishotkey = /*#__PURE__*/ _interop_require_default(_ishotkey);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const buildParagraphKeyDownHandler = (editor, { options: { hotkey } })=>(event)=>{
            if (editor.selection && hotkey && (0, _ishotkey.default)(hotkey, event)) {
                (0, _editor.toggleElement)(editor, {
                    activeType: _richtexttypes.BLOCKS.PARAGRAPH,
                    inactiveType: _richtexttypes.BLOCKS.PARAGRAPH
                });
            }
        };
    const createParagraphPlugin = ()=>{
        const config = {
            type: _richtexttypes.BLOCKS.PARAGRAPH,
            component: _Paragraph.Paragraph,
            options: {
                hotkey: [
                    'mod+opt+0'
                ]
            },
            handlers: {
                onKeyDown: buildParagraphKeyDownHandler
            },
            softBreak: [
                // create a new line with SHIFT+Enter inside a paragraph
                {
                    hotkey: 'shift+enter',
                    query: {
                        allow: _richtexttypes.BLOCKS.PARAGRAPH
                    }
                }
            ],
            deserializeHtml: {
                rules: [
                    {
                        validNodeName: [
                            'P',
                            'DIV'
                        ]
                    }
                ],
                query: (el)=>!(0, _utils.isEmptyElement)(el) && !(0, _utils.isEmbedElement)(el)
            },
            normalizer: [
                {
                    validChildren: (_, [node])=>(0, _editor.isInlineOrText)(node),
                    transform: {
                        [_richtexttypes.BLOCKS.PARAGRAPH]: _transformers.transformUnwrap,
                        default: _transformers.transformLift
                    }
                }
            ]
        };
        return (0, _plateparagraph.createParagraphPlugin)(config);
    };
});
