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
    disableCorePlugins: function() {
        return disableCorePlugins;
    },
    getPlugins: function() {
        return getPlugins;
    }
});
const _plateserializerdocx = require("@udecode/plate-serializer-docx");
const _Break = require("./Break");
const _CommandPalette = require("./CommandPalette");
const _useCommands = require("./CommandPalette/useCommands");
const _DragAndDrop = require("./DragAndDrop");
const _EmbeddedEntityBlock = require("./EmbeddedEntityBlock");
const _EmbeddedEntityInline = require("./EmbeddedEntityInline");
const _EmbeddedResourceBlock = require("./EmbeddedResourceBlock");
const _EmbeddedResourceInline = require("./EmbeddedResourceInline");
const _Heading = require("./Heading");
const _Hr = require("./Hr");
const _Hyperlink = require("./Hyperlink");
const _List = require("./List");
const _Marks = require("./Marks");
const _Normalizer = require("./Normalizer");
const _Paragraph = require("./Paragraph");
const _PasteHTML = require("./PasteHTML");
const _Quote = require("./Quote");
const _SelectOnBackspace = require("./SelectOnBackspace");
const _Table = require("./Table");
const _Text = require("./Text");
const _Tracking = require("./Tracking");
const _TrailingParagraph = require("./TrailingParagraph");
const _Voids = require("./Voids");
const getPlugins = (sdk, onAction, restrictedMarks)=>[
        (0, _plateserializerdocx.createDeserializeDocxPlugin)(),
        // Tracking - This should come first so all plugins below will have access to `editor.tracking`
        (0, _Tracking.createTrackingPlugin)(onAction),
        // Global / Global shortcuts
        (0, _DragAndDrop.createDragAndDropPlugin)(),
        // Enable command palette plugin only, if at least action type is allowed
        ...Object.values((0, _useCommands.isCommandPromptPluginEnabled)(sdk)).some(Boolean) ? [
            (0, _CommandPalette.createCommandPalettePlugin)()
        ] : [],
        // Block Elements
        (0, _Paragraph.createParagraphPlugin)(),
        (0, _List.createListPlugin)(),
        (0, _Hr.createHrPlugin)(),
        (0, _Heading.createHeadingPlugin)(),
        (0, _Quote.createQuotePlugin)(),
        (0, _Table.createTablePlugin)(),
        (0, _EmbeddedEntityBlock.createEmbeddedEntryBlockPlugin)(sdk),
        (0, _EmbeddedEntityBlock.createEmbeddedAssetBlockPlugin)(sdk),
        (0, _EmbeddedResourceBlock.createEmbeddedResourceBlockPlugin)(sdk),
        // Inline elements
        (0, _Hyperlink.createHyperlinkPlugin)(sdk),
        (0, _EmbeddedEntityInline.createEmbeddedEntityInlinePlugin)(sdk),
        (0, _EmbeddedResourceInline.createEmbeddedResourceInlinePlugin)(sdk),
        // Marks
        (0, _Marks.createMarksPlugin)(),
        // Other
        (0, _TrailingParagraph.createTrailingParagraphPlugin)(),
        (0, _Text.createTextPlugin)(restrictedMarks),
        (0, _Voids.createVoidsPlugin)(),
        (0, _SelectOnBackspace.createSelectOnBackspacePlugin)(),
        // Pasting content from other sources
        (0, _PasteHTML.createPasteHTMLPlugin)(),
        // These plugins drive their configurations from the list of plugins
        // above. They MUST come last.
        (0, _Break.createSoftBreakPlugin)(),
        (0, _Break.createExitBreakPlugin)(),
        (0, _Break.createResetNodePlugin)(),
        (0, _Normalizer.createNormalizerPlugin)()
    ];
const disableCorePlugins = {
    // Note: Enabled by default since v9.0.0 but it causes Cypress's
    // .click() command to fail
    eventEditor: true
};
