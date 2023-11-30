(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/field-editor-reference"), require("@contentful/field-editor-shared"), require("@contentful/rich-text-types"), require("@udecode/plate-common"), require("emotion"), require("fast-deep-equal"), require("lodash/noop"), require("./ContentfulEditorProvider"), require("./helpers/toSlateValue"), require("./internal/misc"), require("./plugins"), require("./RichTextEditor.styles"), require("./SdkProvider"), require("./SyncEditorChanges"), require("./Toolbar"), require("./Toolbar/components/StickyToolbarWrapper"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/field-editor-reference",
        "@contentful/field-editor-shared",
        "@contentful/rich-text-types",
        "@udecode/plate-common",
        "emotion",
        "fast-deep-equal",
        "lodash/noop",
        "./ContentfulEditorProvider",
        "./helpers/toSlateValue",
        "./internal/misc",
        "./plugins",
        "./RichTextEditor.styles",
        "./SdkProvider",
        "./SyncEditorChanges",
        "./Toolbar",
        "./Toolbar/components/StickyToolbarWrapper"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.richTextEditor = {}, global.react, global.fieldEditorReference, global.fieldEditorShared, global.richTextTypes, global.plateCommon, global.emotion, global.fastDeepEqual, global.noop, global.contentfulEditorProvider, global.toSlateValue, global.misc, global.plugins, global.richTextEditorStyles, global.sdkProvider, global.syncEditorChanges, global.toolbar, global.stickyToolbarWrapper);
})(this, function(exports, _react, _fieldeditorreference, _fieldeditorshared, _richtexttypes, _platecommon, _emotion, _fastdeepequal, _noop, _ContentfulEditorProvider, _toSlateValue, _misc, _plugins, _RichTextEditorstyles, _SdkProvider, _SyncEditorChanges, _Toolbar, _StickyToolbarWrapper) {
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
        ConnectedRichTextEditor: function() {
            return ConnectedRichTextEditor;
        },
        default: function() {
            return _default;
        }
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
    _richtexttypes = /*#__PURE__*/ _interop_require_wildcard(_richtexttypes);
    _fastdeepequal = /*#__PURE__*/ _interop_require_default(_fastdeepequal);
    _noop = /*#__PURE__*/ _interop_require_default(_noop);
    _Toolbar = /*#__PURE__*/ _interop_require_default(_Toolbar);
    _StickyToolbarWrapper = /*#__PURE__*/ _interop_require_default(_StickyToolbarWrapper);
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
    const ConnectedRichTextEditor = (props)=>{
        const { sdk, onAction, restrictedMarks } = props;
        const id = (0, _ContentfulEditorProvider.getContentfulEditorId)(sdk);
        const plugins = _react.useMemo(()=>(0, _plugins.getPlugins)(sdk, onAction ?? _noop.default, restrictedMarks), [
            sdk,
            onAction,
            restrictedMarks
        ]);
        const initialValue = _react.useMemo(()=>{
            return (0, _misc.normalizeInitialValue)({
                plugins,
                disableCorePlugins: _plugins.disableCorePlugins
            }, (0, _toSlateValue.toSlateValue)(props.value));
        }, [
            props.value,
            plugins
        ]);
        const classNames = (0, _emotion.cx)(_RichTextEditorstyles.styles.editor, props.minHeight !== undefined ? (0, _emotion.css)({
            minHeight: props.minHeight
        }) : undefined, props.maxHeight !== undefined ? (0, _emotion.css)({
            maxHeight: props.maxHeight
        }) : undefined, props.isDisabled ? _RichTextEditorstyles.styles.disabled : _RichTextEditorstyles.styles.enabled, props.isToolbarHidden && _RichTextEditorstyles.styles.hiddenToolbar);
        return /*#__PURE__*/ _react.createElement(_SdkProvider.SdkProvider, {
            sdk: sdk
        }, /*#__PURE__*/ _react.createElement(_ContentfulEditorProvider.ContentfulEditorIdProvider, {
            value: id
        }, /*#__PURE__*/ _react.createElement("div", {
            className: _RichTextEditorstyles.styles.root,
            "data-test-id": "rich-text-editor"
        }, /*#__PURE__*/ _react.createElement(_platecommon.PlateProvider, {
            id: id,
            initialValue: initialValue,
            plugins: plugins,
            disableCorePlugins: _plugins.disableCorePlugins
        }, !props.isToolbarHidden && /*#__PURE__*/ _react.createElement(_StickyToolbarWrapper.default, {
            isDisabled: props.isDisabled
        }, /*#__PURE__*/ _react.createElement(_Toolbar.default, {
            isDisabled: props.isDisabled
        })), /*#__PURE__*/ _react.createElement(_SyncEditorChanges.SyncEditorChanges, {
            incomingValue: initialValue,
            onChange: props.onChange
        }), /*#__PURE__*/ _react.createElement(_platecommon.Plate, {
            id: id,
            editableProps: {
                className: classNames,
                readOnly: props.isDisabled
            }
        })))));
    };
    const RichTextEditor = (props)=>{
        const { sdk, isInitiallyDisabled, onAction, restrictedMarks, ...otherProps } = props;
        const isEmptyValue = _react.useCallback((value)=>!value || (0, _fastdeepequal.default)(value, _richtexttypes.EMPTY_DOCUMENT), []);
        const id = (0, _ContentfulEditorProvider.getContentfulEditorId)(props.sdk);
        return /*#__PURE__*/ _react.createElement(_fieldeditorreference.EntityProvider, {
            sdk: sdk
        }, /*#__PURE__*/ _react.createElement(_fieldeditorshared.FieldConnector, {
            debounce: 0,
            field: sdk.field,
            isInitiallyDisabled: isInitiallyDisabled,
            isEmptyValue: isEmptyValue,
            isEqualValues: _fastdeepequal.default
        }, ({ lastRemoteValue, disabled, setValue })=>/*#__PURE__*/ _react.createElement(ConnectedRichTextEditor, {
                ...otherProps,
                key: `rich-text-editor-${id}`,
                value: lastRemoteValue,
                sdk: sdk,
                onAction: onAction,
                isDisabled: disabled,
                onChange: setValue,
                restrictedMarks: restrictedMarks
            })));
    };
    const _default = RichTextEditor;
});
