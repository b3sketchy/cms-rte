(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./indifferent_space.json"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./indifferent_space.json"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.indifferentSpaceJson);
})(this, function(exports, _indifferent_spacejson) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "indifferent", {
        enumerable: true,
        get: function() {
            return _indifferent_spacejson.default;
        }
    });
    _indifferent_spacejson = /*#__PURE__*/ _interop_require_default(_indifferent_spacejson);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
});
