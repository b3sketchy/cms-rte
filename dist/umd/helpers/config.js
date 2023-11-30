(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./getAllowedResourcesForNodeType"), require("./getLinkedContentTypeIdsForNodeType"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./getAllowedResourcesForNodeType",
        "./getLinkedContentTypeIdsForNodeType"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.config = {}, global.getAllowedResourcesForNodeType, global.getLinkedContentTypeIdsForNodeType);
})(this, function(exports, _getAllowedResourcesForNodeType, _getLinkedContentTypeIdsForNodeType) {
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
        newEntitySelectorConfigFromRichTextField: function() {
            return newEntitySelectorConfigFromRichTextField;
        },
        newResourceEntitySelectorConfigFromRichTextField: function() {
            return newResourceEntitySelectorConfigFromRichTextField;
        }
    });
    _getAllowedResourcesForNodeType = /*#__PURE__*/ _interop_require_default(_getAllowedResourcesForNodeType);
    _getLinkedContentTypeIdsForNodeType = /*#__PURE__*/ _interop_require_default(_getLinkedContentTypeIdsForNodeType);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const newEntitySelectorConfigFromRichTextField = (field, nodeType)=>{
        return {
            entityType: getEntityTypeFromRichTextNode(nodeType),
            locale: field.locale || null,
            contentTypes: (0, _getLinkedContentTypeIdsForNodeType.default)(field, nodeType)
        };
    };
    function getEntityTypeFromRichTextNode(nodeType) {
        const words = nodeType.split('-');
        if (words.indexOf('entry') !== -1) {
            return 'Entry';
        }
        if (words.indexOf('asset') !== -1) {
            return 'Asset';
        }
        throw new Error(`RichText node type \`${nodeType}\` has no associated \`entityType\``);
    }
    const newResourceEntitySelectorConfigFromRichTextField = (field, nodeType)=>{
        return {
            allowedResources: (0, _getAllowedResourcesForNodeType.default)(field, nodeType)
        };
    };
});
