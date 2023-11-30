(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/f36-components"), require("@contentful/f36-icons"), require("@contentful/f36-tokens"), require("@contentful/rich-text-types"), require("emotion"), require("../../../ContentfulEditorProvider"), require("../../../helpers/editor"), require("../../../helpers/validations"), require("../../../SdkProvider"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/f36-components",
        "@contentful/f36-icons",
        "@contentful/f36-tokens",
        "@contentful/rich-text-types",
        "emotion",
        "../../../ContentfulEditorProvider",
        "../../../helpers/editor",
        "../../../helpers/validations",
        "../../../SdkProvider"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.toolbarHeadingButton = {}, global.react, global.f36Components, global.f36Icons, global.f36Tokens, global.richTextTypes, global.emotion, global.contentfulEditorProvider, global.editor, global.validations, global.sdkProvider);
})(this, function(exports, _react, _f36components, _f36icons, _f36tokens, _richtexttypes, _emotion, _ContentfulEditorProvider, _editor, _validations, _SdkProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ToolbarHeadingButton", {
        enumerable: true,
        get: function() {
            return ToolbarHeadingButton;
        }
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
    _f36tokens = /*#__PURE__*/ _interop_require_default(_f36tokens);
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
        dropdown: {
            root: (0, _emotion.css)`
      font-weight: ${_f36tokens.default.fontWeightDemiBold};
    `,
            [_richtexttypes.BLOCKS.PARAGRAPH]: (0, _emotion.css)`
      font-size: ${_f36tokens.default.fontSizeL};
    `,
            [_richtexttypes.BLOCKS.HEADING_1]: (0, _emotion.css)`
      font-size: 1.625rem;
    `,
            [_richtexttypes.BLOCKS.HEADING_2]: (0, _emotion.css)`
      font-size: 1.4375rem;
    `,
            [_richtexttypes.BLOCKS.HEADING_3]: (0, _emotion.css)`
      font-size: 1.25rem;
    `,
            [_richtexttypes.BLOCKS.HEADING_4]: (0, _emotion.css)`
      font-size: 1.125rem;
    `,
            [_richtexttypes.BLOCKS.HEADING_5]: (0, _emotion.css)`
      font-size: 1rem;
    `,
            [_richtexttypes.BLOCKS.HEADING_6]: (0, _emotion.css)`
      font-size: 0.875rem;
    `
        }
    };
    const LABELS = {
        [_richtexttypes.BLOCKS.PARAGRAPH]: 'Normal text',
        [_richtexttypes.BLOCKS.HEADING_1]: 'Heading 1',
        [_richtexttypes.BLOCKS.HEADING_2]: 'Heading 2',
        [_richtexttypes.BLOCKS.HEADING_3]: 'Heading 3',
        [_richtexttypes.BLOCKS.HEADING_4]: 'Heading 4',
        [_richtexttypes.BLOCKS.HEADING_5]: 'Heading 5',
        [_richtexttypes.BLOCKS.HEADING_6]: 'Heading 6'
    };
    function ToolbarHeadingButton(props) {
        const sdk = (0, _SdkProvider.useSdkContext)();
        const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
        const [isOpen, setOpen] = _react.useState(false);
        const [selected, setSelected] = _react.useState(_richtexttypes.BLOCKS.PARAGRAPH);
        _react.useEffect(()=>{
            if (!editor?.selection) return;
            const [element] = (0, _editor.getElementFromCurrentSelection)(editor);
            const type = element.type;
            setSelected(LABELS[type] ? type : _richtexttypes.BLOCKS.PARAGRAPH);
        }, [
            editor?.operations,
            editor?.selection
        ]); // eslint-disable-line -- TODO: explain this disable
        const [nodeTypesByEnablement, someHeadingsEnabled] = _react.useMemo(()=>{
            const nodeTypesByEnablement = Object.fromEntries(Object.keys(LABELS).map((nodeType)=>[
                    nodeType,
                    (0, _validations.isNodeTypeEnabled)(sdk.field, nodeType)
                ]));
            const someHeadingsEnabled = Object.values(nodeTypesByEnablement).filter(Boolean).length > 0;
            return [
                nodeTypesByEnablement,
                someHeadingsEnabled
            ];
        }, [
            sdk.field
        ]);
        function handleOnSelectItem(type) {
            return (event)=>{
                event.preventDefault();
                if (!editor?.selection) return;
                setSelected(type);
                setOpen(false);
                const prevOnChange = editor.onChange;
                /*
       The focus might happen at point in time when
       `toggleElement` (helper for toggleNodeType) changes aren't rendered yet, causing the browser
       to place the cursor at the start of the text.
       We wait for the change event before focusing
       the editor again. This ensures the cursor is back at the previous
       position.*/ editor.onChange = (...args)=>{
                    (0, _editor.focus)(editor);
                    editor.onChange = prevOnChange;
                    prevOnChange(...args);
                };
                const isActive = (0, _editor.isBlockSelected)(editor, type);
                editor.tracking.onToolbarAction(isActive ? 'remove' : 'insert', {
                    nodeType: type
                });
                (0, _editor.toggleElement)(editor, {
                    activeType: type,
                    inactiveType: type
                });
            };
        }
        if (!editor) return null;
        return /*#__PURE__*/ _react.createElement(_f36components.Menu, {
            isOpen: isOpen,
            onClose: ()=>setOpen(false)
        }, /*#__PURE__*/ _react.createElement(_f36components.Menu.Trigger, null, /*#__PURE__*/ _react.createElement(_f36components.Button, {
            size: "small",
            testId: "toolbar-heading-toggle",
            variant: "transparent",
            endIcon: /*#__PURE__*/ _react.createElement(_f36icons.ChevronDownIcon, null),
            isDisabled: props.isDisabled,
            onClick: ()=>someHeadingsEnabled && setOpen(!isOpen)
        }, LABELS[selected])), /*#__PURE__*/ _react.createElement(_f36components.Menu.List, {
            testId: "dropdown-heading-list"
        }, ' ', Object.keys(LABELS).map((nodeType)=>nodeTypesByEnablement[nodeType] && /*#__PURE__*/ _react.createElement(_f36components.Menu.Item, {
                key: nodeType,
                isInitiallyFocused: selected === nodeType,
                onClick: handleOnSelectItem(nodeType),
                testId: `dropdown-option-${nodeType}`,
                disabled: props.isDisabled
            }, /*#__PURE__*/ _react.createElement("span", {
                className: (0, _emotion.cx)(styles.dropdown.root, styles.dropdown[nodeType])
            }, LABELS[nodeType]))).filter(Boolean)));
    }
});
