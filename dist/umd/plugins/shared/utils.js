(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.utils = {});
})(this, function(exports) {
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
        getLinkEntityId: function() {
            return getLinkEntityId;
        },
        truncateTitle: function() {
            return truncateTitle;
        }
    });
    const isResourceLink = (link)=>!!link.sys.urn;
    const getLinkEntityId = (link)=>isResourceLink(link) ? link.sys.urn : link.sys.id;
    function truncateTitle(str, length) {
        if (typeof str === 'string' && str.length > length) {
            return str && str.substr(0, length + 1) // +1 to look ahead and be replaced below.
            // Get rid of orphan letters but not one letter words (I, a, 2).
            // Try to not have “.” as last character to avoid awkward “....”.
            .replace(/(\s+\S(?=\S)|\s*)\.?.$/, '…');
        }
        return str;
    }
});
