(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-icons"), require("@contentful/f36-tokens"), require("@contentful/rich-text-types"), require("emotion"), require("slate-react"), require("../../ContentfulEditorProvider"), require("../../helpers/editor"), require("../../internal/queries"), require("../../internal/transforms"), require("../shared/ToolbarButton"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-icons",
        "@contentful/f36-tokens",
        "@contentful/rich-text-types",
        "emotion",
        "slate-react",
        "../../ContentfulEditorProvider",
        "../../helpers/editor",
        "../../internal/queries",
        "../../internal/transforms",
        "../shared/ToolbarButton"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.react, global.f36Icons, global.f36Tokens, global.richTextTypes, global.emotion, global.slateReact, global.contentfulEditorProvider, global.editor, global.queries, global.transforms, global.toolbarButton);
})(this, function(exports, _react, _f36icons, _f36tokens, _richtexttypes, _emotion, _slatereact, _ContentfulEditorProvider, _editor, _queries, _transforms, _ToolbarButton) {
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
        Hr: function() {
            return Hr;
        },
        ToolbarHrButton: function() {
            return ToolbarHrButton;
        },
        createHrPlugin: function() {
            return createHrPlugin;
        },
        withHrEvents: function() {
            return withHrEvents;
        }
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
    _f36tokens = /*#__PURE__*/ _interop_require_default(_f36tokens);
    _slatereact = /*#__PURE__*/ _interop_require_wildcard(_slatereact);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
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
        container: (0, _emotion.css)`
    margin: 0 0 ${_f36tokens.default.spacingL};
  `,
        hr: (0, _emotion.css)`
    margin: 0;
    height: ${_f36tokens.default.spacingM};
    background: transparent;
    position: relative;
    border: 0;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background: ${_f36tokens.default.gray300};
      top: 50%;
    }
  `,
        hrSelected: (0, _emotion.css)`
    &::after {
      background: ${_f36tokens.default.colorPrimary};
      -webkit-box-shadow: 0px 0px 5px ${_f36tokens.default.colorPrimary};
      box-shadow: 0px 0px 5px ${_f36tokens.default.colorPrimary};
    }
  `
    };
    function withHrEvents(editor) {
        return (event)=>{
            if (!editor) return;
            const [, pathToSelectedHr] = (0, _editor.getNodeEntryFromSelection)(editor, _richtexttypes.BLOCKS.HR);
            if (pathToSelectedHr) {
                const isBackspace = event.key === 'Backspace';
                const isDelete = event.key === 'Delete';
                if (isBackspace || isDelete) {
                    event.preventDefault();
                    (0, _transforms.removeNodes)(editor, {
                        at: pathToSelectedHr
                    });
                }
            }
        };
    }
    function ToolbarHrButton(props) {
        const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
        function handleOnClick() {
            if (!editor?.selection) return;
            const hr = {
                type: _richtexttypes.BLOCKS.HR,
                data: {},
                children: [
                    {
                        text: ''
                    }
                ],
                isVoid: true
            };
            const hasText = !!(0, _queries.getText)(editor, editor.selection.focus.path);
            hasText ? (0, _transforms.insertNodes)(editor, hr) : (0, _transforms.setNodes)(editor, hr);
            // Move focus to the next paragraph (added by TrailingParagraph plugin)
            (0, _editor.moveToTheNextLine)(editor);
            (0, _editor.focus)(editor);
        }
        if (!editor) return null;
        return /*#__PURE__*/ _react.createElement(_ToolbarButton.ToolbarButton, {
            title: "HR",
            isDisabled: props.isDisabled,
            onClick: handleOnClick,
            testId: "hr-toolbar-button",
            isActive: (0, _editor.isBlockSelected)(editor, _richtexttypes.BLOCKS.HR)
        }, /*#__PURE__*/ _react.createElement(_f36icons.HorizontalRuleIcon, null));
    }
    function Hr(props) {
        const isSelected = _slatereact.useSelected();
        const isFocused = _slatereact.useFocused();
        return /*#__PURE__*/ _react.createElement("div", {
            ...props.attributes,
            className: styles.container,
            // COMPAT: To make HR copyable in Safari, we verify this attribute below on `deserialize`
            "data-void-element": _richtexttypes.BLOCKS.HR
        }, /*#__PURE__*/ _react.createElement("div", {
            draggable: true,
            // Moving `contentEditable` to this div makes it to be selectable when being the first void element, e.g pressing ctrl + a to select everything
            contentEditable: false
        }, /*#__PURE__*/ _react.createElement("hr", {
            className: (0, _emotion.cx)(styles.hr, isSelected && isFocused ? styles.hrSelected : undefined)
        })), props.children);
    }
    const createHrPlugin = ()=>({
            key: _richtexttypes.BLOCKS.HR,
            type: _richtexttypes.BLOCKS.HR,
            isVoid: true,
            isElement: true,
            component: Hr,
            handlers: {
                onKeyDown: withHrEvents
            },
            deserializeHtml: {
                rules: [
                    {
                        validNodeName: [
                            'HR'
                        ]
                    },
                    {
                        validAttribute: {
                            'data-void-element': _richtexttypes.BLOCKS.HR
                        }
                    }
                ],
                withoutChildren: true
            }
        });
});