(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./queries"), require("./types"), require("./misc"), require("./transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./queries",
        "./types",
        "./misc",
        "./transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.queries, global.types, global.misc, global.transforms);
})(this, function(exports, _queries, _types, _misc, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _export_star(_queries, exports);
    _export_star(_types, exports);
    _export_star(_misc, exports);
    _export_star(_transforms, exports);
    function _export_star(from, to) {
        Object.keys(from).forEach(function(k) {
            if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
                Object.defineProperty(to, k, {
                    enumerable: true,
                    get: function() {
                        return from[k];
                    }
                });
            }
        });
        return from;
    }
});
