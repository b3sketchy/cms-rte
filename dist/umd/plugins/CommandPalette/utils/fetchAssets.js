(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/field-editor-shared"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/field-editor-shared"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.fetchAssets = {}, global.fieldEditorShared);
})(this, function(exports, _fieldeditorshared) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "fetchAssets", {
        enumerable: true,
        get: function() {
            return fetchAssets;
        }
    });
    async function fetchAssets(sdk, query) {
        const assets = await sdk.space.getAssets({
            query
        });
        return assets.items.map((asset)=>{
            const displayTitle = _fieldeditorshared.entityHelpers.getAssetTitle({
                asset,
                localeCode: sdk.field.locale,
                defaultLocaleCode: sdk.locales.default,
                defaultTitle: 'Untitled'
            });
            return {
                contentTypeName: 'Asset',
                displayTitle,
                id: asset.sys.id,
                entity: asset,
                thumbnail: asset.fields.file && asset.fields.file[sdk.field.locale] && `${asset.fields.file[sdk.field.locale].url}?h=30`
            };
        });
    }
});
