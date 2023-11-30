(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./changed_entry.json"), require("./empty_entry.json"), require("./invalid_entry.json"), require("./published_entry.json"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./changed_entry.json",
        "./empty_entry.json",
        "./invalid_entry.json",
        "./published_entry.json"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.changedEntryJson, global.emptyEntryJson, global.invalidEntryJson, global.publishedEntryJson);
})(this, function(exports, _changed_entryjson, _empty_entryjson, _invalid_entryjson, _published_entryjson) {
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
            return _changed_entryjson.default;
        },
        empty: function() {
            return _empty_entryjson.default;
        },
        invalid: function() {
            return _invalid_entryjson.default;
        },
        published: function() {
            return _published_entryjson.default;
        }
    });
    _changed_entryjson = /*#__PURE__*/ _interop_require_default(_changed_entryjson);
    _empty_entryjson = /*#__PURE__*/ _interop_require_default(_empty_entryjson);
    _invalid_entryjson = /*#__PURE__*/ _interop_require_default(_invalid_entryjson);
    _published_entryjson = /*#__PURE__*/ _interop_require_default(_published_entryjson);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
});
