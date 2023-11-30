(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-icons"), require("@contentful/rich-text-types"), require("@udecode/plate-basic-marks"), require("../../internal/queries"), require("./components/MarkToolbarButton"), require("./helpers"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-icons",
        "@contentful/rich-text-types",
        "@udecode/plate-basic-marks",
        "../../internal/queries",
        "./components/MarkToolbarButton",
        "./helpers"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.underline = {}, global.react, global.f36Icons, global.richTextTypes, global.plateBasicMarks, global.queries, global.markToolbarButton, global.helpers);
})(this, function(exports, _react, _f36icons, _richtexttypes, _platebasicmarks, _queries, _MarkToolbarButton, _helpers) {
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
        ToolbarUnderlineButton: function() {
            return ToolbarUnderlineButton;
        },
        Underline: function() {
            return Underline;
        },
        createUnderlinePlugin: function() {
            return createUnderlinePlugin;
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
    const ToolbarUnderlineButton = (0, _MarkToolbarButton.createMarkToolbarButton)({
        title: 'Underline',
        mark: _richtexttypes.MARKS.UNDERLINE,
        icon: /*#__PURE__*/ _react.createElement(_f36icons.FormatUnderlinedIcon, null)
    });
    function Underline(props) {
        return /*#__PURE__*/ _react.createElement("u", props.attributes, props.children);
    }
    const createUnderlinePlugin = ()=>(0, _platebasicmarks.createUnderlinePlugin)({
            type: _richtexttypes.MARKS.UNDERLINE,
            component: Underline,
            options: {
                hotkey: [
                    'mod+u'
                ]
            },
            handlers: {
                onKeyDown: (0, _helpers.buildMarkEventHandler)(_richtexttypes.MARKS.UNDERLINE)
            },
            deserializeHtml: {
                rules: [
                    {
                        validNodeName: [
                            'U'
                        ]
                    },
                    {
                        validStyle: {
                            textDecoration: [
                                'underline'
                            ]
                        }
                    }
                ],
                query: (el)=>{
                    return !(0, _queries.someHtmlElement)(el, (node)=>node.style.textDecoration === 'none');
                }
            }
        });
});
