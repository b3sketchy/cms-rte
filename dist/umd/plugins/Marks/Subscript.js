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
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.subscript = {}, global.react, global.f36Icons, global.richTextTypes, global.plateBasicMarks, global.emotion, global.markToolbarButton, global.helpers);
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
        Subscript: function() {
            return Subscript;
        },
        ToolbarDropdownSubscriptButton: function() {
            return ToolbarDropdownSubscriptButton;
        },
        ToolbarSubscriptButton: function() {
            return ToolbarSubscriptButton;
        },
        createSubscriptPlugin: function() {
            return createSubscriptPlugin;
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
        subscript: (0, _emotion.css)({
            verticalAlign: 'sub',
            fontSize: 'smaller'
        })
    };
    const ToolbarSubscriptButton = (0, _MarkToolbarButton.createMarkToolbarButton)({
        title: 'Subscript',
        mark: _richtexttypes.MARKS.SUBSCRIPT,
        icon: /*#__PURE__*/ _react.createElement(_f36icons.SubscriptIcon, {
            viewBox: "0 0 23 18"
        })
    });
    const ToolbarDropdownSubscriptButton = (0, _MarkToolbarButton.createMarkToolbarButton)({
        title: 'Subscript',
        mark: _richtexttypes.MARKS.SUBSCRIPT
    });
    function Subscript(props) {
        return /*#__PURE__*/ _react.createElement("sub", {
            ...props.attributes,
            className: styles.subscript
        }, props.children);
    }
    const createSubscriptPlugin = ()=>(0, _platebasicmarks.createSubscriptPlugin)({
            type: _richtexttypes.MARKS.SUBSCRIPT,
            component: Subscript,
            handlers: {
                onKeyDown: (0, _helpers.buildMarkEventHandler)(_richtexttypes.MARKS.SUBSCRIPT)
            },
            deserializeHtml: {
                rules: [
                    {
                        validNodeName: [
                            'SUB'
                        ]
                    }
                ]
            }
        });
});
