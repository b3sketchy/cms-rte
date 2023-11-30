(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("is-hotkey"), require("../../helpers/config"), require("../../helpers/editor"), require("../../helpers/sdkNavigatorSlideIn"), require("../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "is-hotkey",
        "../../helpers/config",
        "../../helpers/editor",
        "../../helpers/sdkNavigatorSlideIn",
        "../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.embeddedInlineUtil = {}, global.richTextTypes, global.isHotkey, global.config, global.editor, global.sdkNavigatorSlideIn, global.transforms);
})(this, function(exports, _richtexttypes, _ishotkey, _config, _editor, _sdkNavigatorSlideIn, _transforms) {
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
        getWithEmbeddedEntryInlineEvents: function() {
            return getWithEmbeddedEntryInlineEvents;
        },
        selectEntityAndInsert: function() {
            return selectEntityAndInsert;
        },
        selectResourceEntityAndInsert: function() {
            return selectResourceEntityAndInsert;
        }
    });
    _ishotkey = /*#__PURE__*/ _interop_require_default(_ishotkey);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function getWithEmbeddedEntryInlineEvents(nodeType, sdk) {
        return function withEmbeddedEntryInlineEvents(editor, { options: { hotkey } }) {
            return function handleEvent(event) {
                if (!editor) return;
                if (hotkey && (0, _ishotkey.default)(hotkey, event)) {
                    if (nodeType === _richtexttypes.INLINES.EMBEDDED_RESOURCE) {
                        selectResourceEntityAndInsert(editor, sdk, editor.tracking.onShortcutAction);
                    } else {
                        selectEntityAndInsert(editor, sdk, editor.tracking.onShortcutAction);
                    }
                }
            };
        };
    }
    const getLink = (nodeType, entity)=>{
        if (nodeType === _richtexttypes.INLINES.EMBEDDED_RESOURCE) {
            return {
                urn: entity.sys.urn,
                type: 'ResourceLink',
                linkType: 'Contentful:Entry'
            };
        }
        return {
            id: entity.sys.id,
            type: 'Link',
            linkType: entity.sys.type
        };
    };
    const createInlineEntryNode = (nodeType, entity)=>{
        return {
            type: nodeType,
            children: [
                {
                    text: ''
                }
            ],
            data: {
                target: {
                    sys: getLink(nodeType, entity)
                }
            }
        };
    };
    async function selectEntityAndInsert(editor, sdk, logAction) {
        const nodeType = _richtexttypes.INLINES.EMBEDDED_ENTRY;
        logAction('openCreateEmbedDialog', {
            nodeType
        });
        const config = {
            ...(0, _config.newEntitySelectorConfigFromRichTextField)(sdk.field, nodeType),
            withCreate: true
        };
        const { selection } = editor;
        const rteSlide = (0, _sdkNavigatorSlideIn.watchCurrentSlide)(sdk.navigator);
        const entry = await sdk.dialogs.selectSingleEntry(config);
        if (!entry) {
            logAction('cancelCreateEmbedDialog', {
                nodeType
            });
        } else {
            // Selection prevents incorrect position of inserted ref when RTE doesn't have focus
            // (i.e. when using hotkeys and slide-in)
            (0, _transforms.select)(editor, selection);
            (0, _transforms.insertNodes)(editor, createInlineEntryNode(nodeType, entry));
            logAction('insert', {
                nodeType
            });
        }
        rteSlide.onActive(()=>{
            rteSlide.unwatch();
            (0, _editor.focus)(editor);
        });
    }
    async function selectResourceEntityAndInsert(editor, sdk, logAction) {
        const nodeType = _richtexttypes.INLINES.EMBEDDED_RESOURCE;
        logAction('openCreateEmbedDialog', {
            nodeType
        });
        const { dialogs, field } = sdk;
        const config = {
            ...(0, _config.newResourceEntitySelectorConfigFromRichTextField)(field, nodeType),
            withCreate: true
        };
        const { selection } = editor;
        const entry = await dialogs.selectSingleResourceEntry(config);
        if (!entry) {
            logAction('cancelCreateEmbedDialog', {
                nodeType
            });
        } else {
            // Selection prevents incorrect position of inserted ref when RTE doesn't have focus
            // (i.e. when using hotkeys and slide-in)
            (0, _transforms.select)(editor, selection);
            (0, _transforms.insertNodes)(editor, createInlineEntryNode(nodeType, entry));
            logAction('insert', {
                nodeType
            });
        }
    }
});
