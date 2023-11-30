(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-components"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-components"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.resourceNewBadge = {}, global.react, global.f36Components);
})(this, function(exports, _react, _f36components) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ResourceNewBadge", {
        enumerable: true,
        get: function() {
            return ResourceNewBadge;
        }
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
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
    const ResourceNewBadge = ()=>{
        return /*#__PURE__*/ _react.createElement(_react.Fragment, null, ' ', "(different space)", ' ', /*#__PURE__*/ _react.createElement(_f36components.Badge, {
            variant: "primary-filled",
            size: "small"
        }, "new"));
    };
});
