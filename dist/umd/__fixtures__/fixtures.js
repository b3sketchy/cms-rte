(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./asset"), require("./content-type"), require("./entry"), require("./locale"), require("./space"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./asset",
        "./content-type",
        "./entry",
        "./locale",
        "./space"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.fixtures = {}, global.asset, global.contentType, global.entry, global.locale, global.space);
})(this, function(exports, _asset, _contenttype, _entry, _locale, _space) {
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
        assets: function() {
            return _asset;
        },
        contentTypes: function() {
            return _contenttype;
        },
        entries: function() {
            return _entry;
        },
        locales: function() {
            return _locale;
        },
        spaces: function() {
            return _space;
        }
    });
    _asset = /*#__PURE__*/ _interop_require_wildcard(_asset);
    _contenttype = /*#__PURE__*/ _interop_require_wildcard(_contenttype);
    _entry = /*#__PURE__*/ _interop_require_wildcard(_entry);
    _locale = /*#__PURE__*/ _interop_require_wildcard(_locale);
    _space = /*#__PURE__*/ _interop_require_wildcard(_space);
    function _getRequireWildcardCache(nodeInterop) {
        if (typeof WeakMap !== "function") return null;
        var cacheBabelInterop = new WeakMap();
        var cacheNodeInterop = new WeakMap();
        return (_getRequireWildcardCache = function(nodeInterop) {
            return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
    }
    function _interop_require_wildcard(obj, nodeInterop) {
        if (!nodeInterop && obj && obj.__esModule) {
            return obj;
        }
        if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
            return {
                default: obj
            };
        }
        var cache = _getRequireWildcardCache(nodeInterop);
        if (cache && cache.has(obj)) {
            return cache.get(obj);
        }
        var newObj = {
            __proto__: null
        };
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for(var key in obj){
            if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                    Object.defineProperty(newObj, key, desc);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }
        newObj.default = obj;
        if (cache) {
            cache.set(obj, newObj);
        }
        return newObj;
    }
});
