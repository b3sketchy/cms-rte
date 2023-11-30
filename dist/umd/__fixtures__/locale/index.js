(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./english_default_locale.json"), require("./german_locale.json"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./english_default_locale.json",
        "./german_locale.json"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.englishDefaultLocaleJson, global.germanLocaleJson);
})(this, function(exports, _english_default_localejson, _german_localejson) {
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
        englishDefault: function() {
            return _english_default_localejson.default;
        },
        german: function() {
            return _german_localejson.default;
        },
        list: function() {
            return list;
        }
    });
    _english_default_localejson = /*#__PURE__*/ _interop_require_default(_english_default_localejson);
    _german_localejson = /*#__PURE__*/ _interop_require_default(_german_localejson);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const list = {
        sys: {
            type: 'Array'
        },
        total: 2,
        skip: 0,
        limit: 100,
        items: [
            _english_default_localejson.default,
            _german_localejson.default
        ]
    };
});
