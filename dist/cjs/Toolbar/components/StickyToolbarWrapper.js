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
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _emotion = require("emotion");
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
