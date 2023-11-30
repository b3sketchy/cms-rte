(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("emotion"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "emotion"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.stickyToolbarWrapper = {}, global.react, global.emotion);
})(this, function(exports, _react, _emotion) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "default", {
        enumerable: true,
        get: function() {
            return _default;
        }
    });
    _react = /*#__PURE__*/ _interop_require_default(_react);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const styles = {
        nativeSticky: (0, _emotion.css)`
    position: -webkit-sticky;
    position: sticky;
    top: -1px;
    z-index: 2;
  `
    };
    const StickyToolbarWrapper = ({ isDisabled, children })=>/*#__PURE__*/ _react.default.createElement("div", {
            className: isDisabled ? '' : styles.nativeSticky
        }, children);
    const _default = StickyToolbarWrapper;
});
