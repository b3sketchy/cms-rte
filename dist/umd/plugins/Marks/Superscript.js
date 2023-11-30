(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-icons"), require("@contentful/rich-text-types"), require("@udecode/plate-basic-marks"), require("emotion"), require("./components/MarkToolbarButton"), require("./helpers"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-icons",
        "@contentful/rich-text-types",
        "@udecode/plate-basic-marks",
        "emotion",
        "./components/MarkToolbarButton",
        "./helpers"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.superscript = {}, global.react, global.f36Icons, global.richTextTypes, global.plateBasicMarks, global.emotion, global.markToolbarButton, global.helpers);
})(this, function(exports, _react, _f36icons, _richtexttypes, _platebasicmarks, _emotion, _MarkToolbarButton, _helpers) {
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
        Superscript: function() {
            return Superscript;
        },
        ToolbarDropdownSuperscriptButton: function() {
            return ToolbarDropdownSuperscriptButton;
        },
        ToolbarSuperscriptButton: function() {
            return ToolbarSuperscriptButton;
        },
        createSuperscriptPlugin: function() {
            return createSuperscriptPlugin;
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
    const styles = {
        superscript: (0, _emotion.css)({
            verticalAlign: 'super',
            fontSize: 'smaller'
        })
    };
    const ToolbarSuperscriptButton = (0, _MarkToolbarButton.createMarkToolbarButton)({
        title: 'Superscript',
        mark: _richtexttypes.MARKS.SUPERSCRIPT,
        icon: /*#__PURE__*/ _react.createElement(_f36icons.SuperscriptIcon, null)
    });
    const ToolbarDropdownSuperscriptButton = (0, _MarkToolbarButton.createMarkToolbarButton)({
        title: 'Superscript',
        mark: _richtexttypes.MARKS.SUPERSCRIPT
    });
    function Superscript(props) {
        return /*#__PURE__*/ _react.createElement("sup", {
            ...props.attributes,
            className: styles.superscript
        }, props.children);
    }
    const createSuperscriptPlugin = ()=>(0, _platebasicmarks.createSuperscriptPlugin)({
            type: _richtexttypes.MARKS.SUPERSCRIPT,
            component: Superscript,
            handlers: {
                onKeyDown: (0, _helpers.buildMarkEventHandler)(_richtexttypes.MARKS.SUPERSCRIPT)
            },
            deserializeHtml: {
                rules: [
                    {
                        validNodeName: [
                            'SUP'
                        ]
                    }
                ]
            }
        });
});
