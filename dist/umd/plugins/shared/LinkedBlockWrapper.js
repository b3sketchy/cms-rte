(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("emotion"), require("../../helpers/environment"), require("./utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "emotion",
        "../../helpers/environment",
        "./utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.linkedBlockWrapper = {}, global.react, global.emotion, global.environment, global.utils);
})(this, function(exports, _react, _emotion, _environment, _utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "LinkedBlockWrapper", {
        enumerable: true,
        get: function() {
            return LinkedBlockWrapper;
        }
    });
    _react = /*#__PURE__*/ _interop_require_default(_react);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const styles = {
        root: (0, _emotion.css)({
            marginBottom: '1.25rem !important',
            display: 'block'
        }),
        container: (0, _emotion.css)({
            // The next 2 properties ensure Entity card won't be aligned above
            // a list item marker (i.e. bullet)
            display: 'inline-block',
            verticalAlign: 'text-top',
            width: '100%'
        })
    };
    function LinkedBlockWrapper({ attributes, card, children, link }) {
        return /*#__PURE__*/ _react.default.createElement("div", {
            ...attributes,
            className: styles.root,
            "data-entity-type": link.sys.linkType,
            "data-entity-id": (0, _utils.getLinkEntityId)(link),
            // COMPAT: This makes copy & paste work for Firefox
            contentEditable: _environment.IS_CHROME ? undefined : false,
            draggable: _environment.IS_CHROME ? true : undefined
        }, /*#__PURE__*/ _react.default.createElement("div", {
            // COMPAT: This makes copy & paste work for Chromium/Blink browsers and Safari
            contentEditable: _environment.IS_CHROME ? false : undefined,
            draggable: _environment.IS_CHROME ? true : undefined,
            className: styles.container
        }, card), children);
    }
});
