(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/f36-tokens"), require("emotion"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/f36-tokens",
        "emotion"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.styles = {}, global.f36Tokens, global.emotion);
})(this, function(exports, _f36tokens, _emotion) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "styles", {
        enumerable: true,
        get: function() {
            return styles;
        }
    });
    _f36tokens = /*#__PURE__*/ _interop_require_default(_f36tokens);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const styles = {
        hyperlinkWrapper: (0, _emotion.css)({
            display: 'inline',
            position: 'static',
            a: {
                fontSize: 'inherit !important'
            }
        }),
        iconButton: (0, _emotion.css)({
            padding: `${_f36tokens.default.spacing2Xs} ${_f36tokens.default.spacingXs}`
        }),
        openLink: (0, _emotion.css)({
            display: 'inline-block',
            marginLeft: _f36tokens.default.spacingXs,
            marginRight: _f36tokens.default.spacingXs,
            maxWidth: '22ch',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }),
        popover: (0, _emotion.css)({
            zIndex: _f36tokens.default.zIndexModal
        }),
        hyperlink: (0, _emotion.css)({
            fontSize: 'inherit !important',
            display: 'inline !important',
            '&:hover': {
                fill: _f36tokens.default.gray900,
                textDecoration: 'none'
            },
            '&:focus': {
                fill: _f36tokens.default.gray900
            },
            span: {
                display: 'inline'
            }
        })
    };
});
