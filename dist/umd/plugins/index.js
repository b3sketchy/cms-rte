(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@udecode/plate-serializer-docx"), require("./Break"), require("./CommandPalette"), require("./CommandPalette/useCommands"), require("./DragAndDrop"), require("./EmbeddedEntityBlock"), require("./EmbeddedEntityInline"), require("./EmbeddedResourceBlock"), require("./EmbeddedResourceInline"), require("./Heading"), require("./Hr"), require("./Hyperlink"), require("./List"), require("./Marks"), require("./Normalizer"), require("./Paragraph"), require("./PasteHTML"), require("./Quote"), require("./SelectOnBackspace"), require("./Table"), require("./Text"), require("./Tracking"), require("./TrailingParagraph"), require("./Voids"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@udecode/plate-serializer-docx",
        "./Break",
        "./CommandPalette",
        "./CommandPalette/useCommands",
        "./DragAndDrop",
        "./EmbeddedEntityBlock",
        "./EmbeddedEntityInline",
        "./EmbeddedResourceBlock",
        "./EmbeddedResourceInline",
        "./Heading",
        "./Hr",
        "./Hyperlink",
        "./List",
        "./Marks",
        "./Normalizer",
        "./Paragraph",
        "./PasteHTML",
        "./Quote",
        "./SelectOnBackspace",
        "./Table",
        "./Text",
        "./Tracking",
        "./TrailingParagraph",
        "./Voids"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.plateSerializerDocx, global.break, global.commandPalette, global.useCommands, global.dragAndDrop, global.embeddedEntityBlock, global.embeddedEntityInline, global.embeddedResourceBlock, global.embeddedResourceInline, global.heading, global.hr, global.hyperlink, global.list, global.marks, global.normalizer, global.paragraph, global.pasteHTML, global.quote, global.selectOnBackspace, global.table, global.text, global.tracking, global.trailingParagraph, global.voids);
})(this, function(exports, _plateserializerdocx, _Break, _CommandPalette, _useCommands, _DragAndDrop, _EmbeddedEntityBlock, _EmbeddedEntityInline, _EmbeddedResourceBlock, _EmbeddedResourceInline, _Heading, _Hr, _Hyperlink, _List, _Marks, _Normalizer, _Paragraph, _PasteHTML, _Quote, _SelectOnBackspace, _Table, _Text, _Tracking, _TrailingParagraph, _Voids) {
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
});
