(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./changed_asset.json"), require("./created_asset.json"), require("./empty_asset.json"), require("./invalid_asset.json"), require("./published_asset.json"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./changed_asset.json",
        "./created_asset.json",
        "./empty_asset.json",
        "./invalid_asset.json",
        "./published_asset.json"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.changedAssetJson, global.createdAssetJson, global.emptyAssetJson, global.invalidAssetJson, global.publishedAssetJson);
})(this, function(exports, _changed_assetjson, _created_assetjson, _empty_assetjson, _invalid_assetjson, _published_assetjson) {
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
        changed: function() {
            return _changed_assetjson.default;
        },
        created: function() {
            return _created_assetjson.default;
        },
        empty: function() {
            return _empty_assetjson.default;
        },
        invalid: function() {
            return _invalid_assetjson.default;
        },
        published: function() {
            return _published_assetjson.default;
        }
    });
    _changed_assetjson = /*#__PURE__*/ _interop_require_default(_changed_assetjson);
    _created_assetjson = /*#__PURE__*/ _interop_require_default(_created_assetjson);
    _empty_assetjson = /*#__PURE__*/ _interop_require_default(_empty_assetjson);
    _invalid_assetjson = /*#__PURE__*/ _interop_require_default(_invalid_assetjson);
    _published_assetjson = /*#__PURE__*/ _interop_require_default(_published_assetjson);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
});
