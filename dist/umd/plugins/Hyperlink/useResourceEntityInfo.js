(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/field-editor-reference"), require("../../plugins/shared/utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/field-editor-reference",
        "../../plugins/shared/utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useResourceEntityInfo = {}, global.react, global.fieldEditorReference, global.utils);
})(this, function(exports, _react, _fieldeditorreference, _utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useResourceEntityInfo", {
        enumerable: true,
        get: function() {
            return useResourceEntityInfo;
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
    function useResourceEntityInfo({ onEntityFetchComplete, target }) {
        const { data, error, status } = (0, _fieldeditorreference.useResource)(target.sys.linkType, target.sys.urn);
        _react.useEffect(()=>{
            if (status === 'success') {
                onEntityFetchComplete?.();
            }
        }, [
            status,
            onEntityFetchComplete
        ]);
        if (status === 'loading') {
            return `Loading entry...`;
        }
        if (!data || error) {
            return `Entry missing or inaccessible`;
        }
        const title = (0, _utils.truncateTitle)(data.resource.fields[data.contentType.displayField]?.[data.defaultLocaleCode], 40) || 'Untitled';
        return `${data.contentType.name}: ${title} (Space: ${data.space.name} – Env.: ${data.resource.sys.environment.sys.id})`;
    }
});
